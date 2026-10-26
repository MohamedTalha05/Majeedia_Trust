// Pre-renders every public page into static HTML for GitHub Pages (run by `npm run build`).
// Each page is written as <path>/index.html, plus 404.html, a redirect from / to /en/, sitemap.xml and robots.txt.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const OUT = path.resolve('dist');
const SSR = path.resolve('dist-ssr');
const siteUrl = (process.env.SITE_URL ?? 'https://web.majeedia.org').replace(/\/+$/, '');
const config = { siteUrl };

const { render, STATIC_CONTENT: content, sitemapPaths } = await import(pathToFileURL(path.join(SSR, 'entry-server.js')).href);
const template = await readFile(path.join(OUT, 'index.html'), 'utf8');
// Embed JSON safely inside a <script type="application/json"> tag.
const safeJson = (value) => JSON.stringify(value).replace(/</g, '\\u003c');

function page(url) {
  const rendered = render(url, content, config);
  return template
    .replace('<!--app-lang-->', rendered.lang)
    .replace('<!--app-head-->', rendered.head)
    .replace('<!--app-html-->', rendered.html)
    .replace('<!--app-data-->', `<script type="application/json" id="__DATA__">${safeJson({ content, config })}</script>`);
}

async function write(file, html) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html);
}

const redirect = (to) =>
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Majeedia Trust</title><meta name="robots" content="noindex"><link rel="canonical" href="${siteUrl}${to}"><meta http-equiv="refresh" content="0; url=${to}"></head><body><a href="${to}">Continue to Majeedia Trust</a></body></html>\n`;

const paths = sitemapPaths(content);
for (const url of paths) await write(path.join(OUT, url, 'index.html'), page(url));
// GitHub Pages serves 404.html for any unknown path; old German links (/de/...) are sent to the English site.
await write(
  path.join(OUT, '404.html'),
  page('/en/page-not-found').replace('<head>', `<head>\n    <script>if (/^\\/de(\\/|$)/.test(location.pathname)) location.replace('/en/');</script>`),
);
await write(path.join(OUT, 'index.html'), redirect('/en/'));
// The German version has been retired; old /de links land on the English site.
await write(path.join(OUT, 'de', 'index.html'), redirect('/en/'));
await write(
  path.join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
    .map((p) => `  <url>\n    <loc>${siteUrl}${p === '/en' ? '/en/' : `${p}/`}</loc>\n  </url>`)
    .join('\n')}\n</urlset>\n`,
);
await write(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
await rm(SSR, { recursive: true, force: true });
console.log(`Pre-rendered ${paths.length} pages + 404 into dist/ for ${siteUrl}`);
