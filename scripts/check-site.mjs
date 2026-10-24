/**
 * Quality checks on the production build (run `npm run build` first).
 *
 *   npm run check                # pages, SEO tags, images, internal links
 *   npm run check -- --external  # also request every external link
 *
 * Serves dist/ like Apache does on Hostinger (folder index.html, 404.html for
 * unknown URLs) and crawls every page in sitemap.xml plus every internal link.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createServer, resolveFile, DIST } from './serve-dist.mjs';

const SITE_URL = 'https://majeedia.org';
const CHECK_EXTERNAL = process.argv.includes('--external');

const server = createServer();
await new Promise((r) => server.listen(0, r));
const BASE = `http://localhost:${server.address().port}`;

const problems = [];
const fail = (page, msg) => problems.push(`${page}: ${msg}`);
const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];

const sitemap = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
const sitemapPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE_URL, ''));
const queue = [...sitemapPaths];
const seen = new Set();
const external = new Map();
const titles = new Map();
const descriptions = new Map();

while (queue.length) {
  const page = queue.shift();
  if (seen.has(page)) continue;
  seen.add(page);

  const res = await fetch(BASE + page);
  if (res.status !== 200) {
    fail(page, `HTTP ${res.status} (linked internal page is missing)`);
    continue;
  }
  const html = await res.text();

  const h1s = html.match(/<h1[\s>]/g) || [];
  if (h1s.length !== 1) fail(page, `${h1s.length} <h1> elements (expected 1)`);
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  if (!title) fail(page, 'missing <title>');
  else if (titles.has(title)) fail(page, `duplicate title with ${titles.get(title)}`);
  else titles.set(title, page);
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!desc) fail(page, 'missing meta description');
  else if (desc.length < 70 || desc.length > 170) fail(page, `meta description length ${desc.length} (aim for 70–170)`);
  else if (descriptions.has(desc)) fail(page, `duplicate description with ${descriptions.get(desc)}`);
  else descriptions.set(desc, page);
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  if (canonical !== SITE_URL + page) fail(page, `canonical is ${canonical}`);
  for (const p of ['og:title', 'og:description', 'og:image', 'og:url']) {
    if (!html.includes(`property="${p}"`)) fail(page, `missing ${p}`);
  }
  if (/lorem ipsum|placeholder|logoipsum|TODO/i.test(html.replace(/<script[\s\S]*?<\/script>/g, ''))) {
    fail(page, 'contains placeholder text');
  }

  for (const [tag] of html.matchAll(/<img\s[^>]*>/g)) {
    if (attr(tag, 'alt') === undefined) fail(page, `<img> without alt: ${tag.slice(0, 80)}`);
    const urls = [attr(tag, 'src'), ...(attr(tag, 'srcset') || '').split(',').map((s) => s.trim().split(' ')[0])];
    for (const u of urls.filter(Boolean)) if (!resolveFile(u)) fail(page, `missing image ${u}`);
  }
  for (const [, href] of html.matchAll(/<link[^>]+href="(\/[^"]+)"/g)) {
    if (!resolveFile(href)) fail(page, `missing asset ${href}`);
  }
  for (const [, src] of html.matchAll(/<script[^>]+src="(\/[^"]+)"/g)) {
    if (!resolveFile(src)) fail(page, `missing script ${src}`);
  }

  for (const [, href] of html.matchAll(/<a\s[^>]*href="([^"]*)"/g)) {
    if (href.startsWith('/') && !href.startsWith('//')) {
      const target = href.split('#')[0];
      if (!target.endsWith('/') && !path.extname(target)) fail(page, `internal link without trailing slash: ${href}`);
      queue.push(target);
    } else if (/^https?:/.test(href)) {
      const url = href.replace(/&amp;/g, '&');
      if (!external.has(url)) external.set(url, page);
    } else if (!/^(mailto:|tel:|#)/.test(href)) {
      fail(page, `unexpected link ${href}`);
    }
  }
}

// Unknown URLs must return the 404 page with a 404 status
const notFound = await fetch(`${BASE}/this-page-does-not-exist/`);
const notFoundHtml = await notFound.text();
if (notFound.status !== 404 || !notFoundHtml.includes('Page Not Found') || !notFoundHtml.includes('noindex')) {
  fail('/this-page-does-not-exist/', '404 page not served correctly');
}

for (const p of sitemapPaths) if (!seen.has(p)) fail(p, 'in sitemap but not crawled');
const orphanCheck = [...seen].filter((p) => !sitemapPaths.includes(p));
for (const p of orphanCheck) fail(p, 'linked internally but not in sitemap.xml');

console.log(`Pages checked: ${seen.size}`);
console.log(`External links found: ${external.size}`);

if (CHECK_EXTERNAL) {
  console.log('\nExternal links:');
  for (const [url, page] of external) {
    try {
      const r = await fetch(url, {
        redirect: 'follow',
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36' },
        signal: AbortSignal.timeout(20000),
      });
      // Social networks often answer scripts with 4xx/999 even though the page exists
      const botBlocked = [403, 429, 999].includes(r.status) || (url.includes('facebook.com') && r.status === 400);
      const note = r.ok ? 'ok' : botBlocked ? 'blocked for scripts (check manually)' : 'FAILED';
      console.log(`  ${r.status} ${note.padEnd(34)} ${url}`);
      if (note === 'FAILED') fail(page, `external link ${url} returned ${r.status}`);
    } catch (e) {
      console.log(`  ERR ${e.message.padEnd(30)} ${url}`);
      fail(page, `external link ${url}: ${e.message}`);
    }
  }
}

server.close();
if (problems.length) {
  console.log(`\n${problems.length} problem(s):`);
  for (const p of problems) console.log('  - ' + p);
  process.exit(1);
}
console.log('\nAll checks passed.');
