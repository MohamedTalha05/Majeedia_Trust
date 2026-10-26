// DISABLED: not used by the static GitHub Pages build (see README "Static deployment").
// Kept so the admin panel, contact API and JSON data store can be switched back on later.
// Express server: API, uploads, sitemap/robots and server-side rendering of the React site.
import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import type { ViteDevServer } from 'vite';
import { sitemapPaths } from '../shared/routes';
import { DEFAULT_LANG, type Lang, type PublicContent, type SiteConfig } from '../shared/types';
import { api, UPLOAD_DIR } from './api';
import { ROOT } from './paths';
import { getPublicContent, initStore } from './store';

const isProd = process.env.NODE_ENV === 'production';
const port = Number(process.env.PORT ?? 3000);
const config: SiteConfig = { siteUrl: (process.env.SITE_URL ?? `http://localhost:${port}`).replace(/\/+$/, '') };

type RenderFn = (url: string, content: PublicContent, config: SiteConfig) => {
  html: string;
  head: string;
  lang: Lang;
  status: number;
};

await initStore();
const app = express();
app.disable('x-powered-by');
if (process.env.TRUST_PROXY) app.set('trust proxy', process.env.TRUST_PROXY);

app.use(
  helmet({
    contentSecurityPolicy: isProd
      ? {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", 'data:', 'https:'],
            fontSrc: ["'self'"],
            connectSrc: ["'self'"],
            frameAncestors: ["'none'"],
            formAction: ["'self'"],
            objectSrc: ["'none'"],
            baseUri: ["'self'"],
          },
        }
      : false,
    crossOriginEmbedderPolicy: false,
  }),
);
app.use(compression());

app.use('/api', api);
app.use('/uploads', express.static(UPLOAD_DIR, { maxAge: '30d', immutable: true, index: false }));

// ---------- SEO files ----------

app.get('/robots.txt', (_req, res) => {
  res.type('text/plain').send(`User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\n\nSitemap: ${config.siteUrl}/sitemap.xml\n`);
});

app.get('/sitemap.xml', (_req, res) => {
  const abs = (p: string) => `${config.siteUrl}${p}`;
  const urls = sitemapPaths(getPublicContent())
    .map((p) => `  <url>\n    <loc>${abs(p)}</loc>\n  </url>`)
    .join('\n');
  res
    .type('application/xml')
    .send(
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    );
});

// ---------- Rendering ----------

let vite: ViteDevServer | undefined;
let prodTemplate = '';
let prodRender: RenderFn | undefined;

if (isProd) {
  const clientDir = path.join(ROOT, 'dist', 'client');
  prodTemplate = await readFile(path.join(clientDir, 'index.html'), 'utf8');
  const serverEntry = path.join(ROOT, 'dist', 'server', 'entry-server.js');
  prodRender = (await import(/* @vite-ignore */ `file://${serverEntry.replace(/\\/g, '/')}`)).render;
  app.use('/assets', express.static(path.join(clientDir, 'assets'), { maxAge: '1y', immutable: true }));
  app.use(express.static(clientDir, { index: false, maxAge: '7d' }));
} else {
  const { createServer } = await import('vite');
  vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
  app.use(vite.middlewares);
}

// Embed JSON safely inside a <script type="application/json"> tag.
const safeJson = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');

app.get('*', async (req, res, next) => {
  const url = req.originalUrl;
  try {
    if (req.path === '/') return res.redirect(302, `/${DEFAULT_LANG}`);
    // The German version has been retired; send old links to the English site.
    if (req.path === '/de' || req.path.startsWith('/de/')) return res.redirect(301, `/${DEFAULT_LANG}`);
    if (req.path.length > 1 && req.path.endsWith('/')) {
      const query = url.slice(req.path.length);
      return res.redirect(301, req.path.replace(/\/+$/, '') + query);
    }

    let template: string;
    let render: RenderFn;
    if (vite) {
      template = await vite.transformIndexHtml(url, await readFile(path.join(ROOT, 'index.html'), 'utf8'));
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
    } else {
      template = prodTemplate;
      render = prodRender!;
    }

    const content = getPublicContent();
    const rendered = render(url, content, config);
    const html = template
      .replace('<!--app-lang-->', rendered.lang)
      .replace('<!--app-head-->', rendered.head)
      .replace('<!--app-html-->', rendered.html)
      .replace(
        '<!--app-data-->',
        `<script type="application/json" id="__DATA__">${safeJson({ content, config })}</script>`,
      );
    res.status(rendered.status).set('Content-Type', 'text/html; charset=utf-8').send(html);
  } catch (err) {
    vite?.ssrFixStacktrace(err as Error);
    next(err);
  }
});

app.listen(port, () => {
  console.log(`Majeedia Trust running at http://localhost:${port} (${isProd ? 'production' : 'development'})`);
  if (!process.env.ADMIN_PASSWORD) console.log('Admin panel disabled: set ADMIN_PASSWORD in .env to enable /admin');
});
