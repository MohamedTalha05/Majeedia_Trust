import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import type { Lang, PublicContent, SiteConfig } from '../shared/types';
import { App } from './App';
import { buildHead, headToHtml } from './seo/head';

// Used by scripts/prerender.mjs to build the static site.
export { sitemapPaths } from '../shared/routes';
export { STATIC_CONTENT } from './lib/static-content';

export function render(url: string, content: PublicContent, config: SiteConfig): { html: string; head: string; lang: Lang; status: number } {
  // DISABLED for the static GitHub Pages build: the admin panel needs the server and its JSON data store.
  // if (url === '/admin' || url.startsWith('/admin/') || url.startsWith('/admin?')) {
  //   // The admin panel is rendered on the client only and is never indexed.
  //   return { html: '', head: '<title>Admin | Majeedia Trust</title>\n    <meta name="robots" content="noindex, nofollow">', lang: 'en', status: 200 };
  // }
  const head = buildHead(url, content, config);
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App content={content} config={config} />
      </StaticRouter>
    </StrictMode>,
  );
  return { html, head: headToHtml(head), lang: head.lang, status: head.status };
}
