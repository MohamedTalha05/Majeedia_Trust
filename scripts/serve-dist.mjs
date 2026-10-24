/**
 * Serves dist/ the way Apache/LiteSpeed does on Hostinger:
 * folder URLs load their index.html, "/about" redirects to "/about/",
 * and unknown URLs get 404.html with a 404 status.
 *
 *   npm run preview        → http://localhost:4173
 */
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import zlib from 'node:zlib';

export const DIST = path.resolve(import.meta.dirname, '..', 'dist');
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.xml': 'application/xml', '.txt': 'text/plain',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.json': 'application/json',
};

export function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split(/[?#]/)[0]);
  let file = path.join(DIST, clean);
  if (!file.startsWith(DIST)) return null;
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  return fs.existsSync(file) && fs.statSync(file).isFile() ? file : null;
}

export function createServer() {
  return http.createServer((req, res) => {
    const urlPath = req.url.split(/[?#]/)[0];
    const dir = path.join(DIST, decodeURIComponent(urlPath));
    if (!urlPath.endsWith('/') && fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
      res.writeHead(301, { Location: urlPath + '/' });
      return res.end();
    }
    const file = resolveFile(req.url);
    if (!file) {
      res.writeHead(404, { 'Content-Type': TYPES['.html'] });
      return res.end(fs.readFileSync(path.join(DIST, '404.html')));
    }
    // Same compression and caching as public/.htaccess on Hostinger
    const ext = path.extname(file);
    const headers = { 'Content-Type': TYPES[ext] || 'application/octet-stream' };
    if (['.js', '.css', '.woff2', '.woff'].includes(ext)) headers['Cache-Control'] = 'public, max-age=31536000, immutable';
    else if (['.webp', '.png', '.jpg'].includes(ext)) headers['Cache-Control'] = 'public, max-age=2592000';
    else headers['Cache-Control'] = 'no-cache';
    let body = fs.readFileSync(file);
    if (['.html', '.js', '.css', '.xml', '.txt', '.json'].includes(ext) && /gzip/.test(req.headers['accept-encoding'] || '')) {
      body = zlib.gzipSync(body);
      headers['Content-Encoding'] = 'gzip';
    }
    res.writeHead(200, headers);
    res.end(body);
  });
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const port = Number(process.env.PORT) || 4173;
  createServer().listen(port, () => console.log(`Serving dist/ at http://localhost:${port}`));
}
