/**
 * Runs after `vite build` (client) and `vite build --ssr` (server bundle).
 * Renders every route in src/routes.jsx to dist/<path>/index.html with its
 * own <title>, meta description, canonical and Open Graph tags, writes
 * dist/404.html and dist/sitemap.xml. The temporary server bundle lives in
 * node_modules/.ssr-build and is not deployed.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SSR_DIR = path.join(ROOT, 'node_modules', '.ssr-build');

const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
const { render, ROUTES, SITE } = await import(pathToFileURL(path.join(SSR_DIR, 'entry-server.js')).href);

function writePage(urlPath, file) {
  const { html, head } = render(urlPath);
  if (!head.includes('<title>')) throw new Error(`No <Seo> on ${urlPath}`);
  const page = template.replace('<!--app-head-->', head).replace('<!--app-html-->', html);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page);
  return head.match(/<title>(.*?)<\/title>/)[1];
}

const titles = new Map();
for (const { path: urlPath } of ROUTES) {
  const file = path.join(DIST, urlPath, 'index.html');
  const title = writePage(urlPath, file);
  if (titles.has(title)) throw new Error(`Duplicate title "${title}" on ${urlPath} and ${titles.get(title)}`);
  titles.set(title, urlPath);
  console.log(`  ${urlPath.padEnd(40)} ${title}`);
}
writePage('/404/', path.join(DIST, '404.html'));
console.log(`  ${'404.html'.padEnd(40)} (not-found page)`);

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (r) => `  <url>
    <loc>${SITE.url}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${r.priority}</priority>
  </url>`,
).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap);

console.log(`\nPre-rendered ${ROUTES.length} pages + 404.html, wrote sitemap.xml`);
