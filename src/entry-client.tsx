import './index.css';
import { lazy, StrictMode, Suspense } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import type { PublicContent, SiteConfig } from '../shared/types';
import { App } from './App';

const root = document.getElementById('root')!;
const { content, config } = JSON.parse(document.getElementById('__DATA__')!.textContent!) as {
  content: PublicContent;
  config: SiteConfig;
};

if (location.pathname === '/admin' || location.pathname.startsWith('/admin/')) {
  // Admin is loaded as a separate chunk so it never weighs on the public site.
  const AdminApp = lazy(() => import('./admin/AdminApp'));
  createRoot(root).render(
    <StrictMode>
      <Suspense fallback={null}>
        <AdminApp />
      </Suspense>
    </StrictMode>,
  );
} else {
  hydrateRoot(
    root,
    <StrictMode>
      <BrowserRouter>
        <App content={content} config={config} />
      </BrowserRouter>
    </StrictMode>,
  );
}
