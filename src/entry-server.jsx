// Used only at build time by scripts/prerender.mjs to render each page to HTML.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App.jsx';
import { HeadContext, headToHtml } from './components/Seo.jsx';

export { ROUTES } from './routes.jsx';
export { SITE } from './data/site.js';

export function render(url) {
  const head = {};
  const html = renderToString(
    <StrictMode>
      <HeadContext.Provider value={head}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HeadContext.Provider>
    </StrictMode>,
  );
  return { html, head: headToHtml(head), noindex: Boolean(head.noindex) };
}
