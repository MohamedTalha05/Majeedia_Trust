import './index.css';
import { StrictMode } from 'react';
// import { lazy, Suspense } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import type { PublicContent, SiteConfig } from '../shared/types';
import { App } from './App';

const root = document.getElementById('root')!;
const embedded = document.getElementById('__DATA__');

// DISABLED for the static GitHub Pages build: the admin panel needs the server and its JSON data store.
// if (location.pathname === '/admin' || location.pathname.startsWith('/admin/')) {
//   // Admin is loaded as a separate chunk so it never weighs on the public site.
//   const AdminApp = lazy(() => import('./admin/AdminApp'));
//   createRoot(root).render(
//     <StrictMode>
//       <Suspense fallback={null}>
//         <AdminApp />
//       </Suspense>
//     </StrictMode>,
//   );
// } else {

if (embedded) {
  // Pre-rendered page: the content it was built with is embedded in the HTML.
  const { content, config } = JSON.parse(embedded.textContent!) as { content: PublicContent; config: SiteConfig };
  hydrateRoot(
    root,
    <StrictMode>
      <BrowserRouter>
        <App content={content} config={config} />
      </BrowserRouter>
    </StrictMode>,
  );
} else {
  // `npm run dev` (plain Vite, nothing pre-rendered): load the content from data/*.json directly.
  import('./lib/static-content').then(({ STATIC_CONTENT }) => {
    createRoot(root).render(
      <StrictMode>
        <BrowserRouter>
          <App content={STATIC_CONTENT} config={{ siteUrl: location.origin }} />
        </BrowserRouter>
      </StrictMode>,
    );
  });
}
