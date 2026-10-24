import { createContext, useContext, useEffect } from 'react';
import { SITE } from '../data/site.js';

// During pre-rendering a plain object is provided here and Seo writes into it;
// in the browser there is no provider and Seo updates document.head instead.
export const HeadContext = createContext(null);

const DEFAULT_IMAGE = '/og-image.jpg';

function buildHead({ title, description, path, image, type, jsonLd, noindex, preload }) {
  const fullTitle = path === '/' ? title : `${title} | ${SITE.name}`;
  return {
    title: fullTitle,
    description,
    canonical: `${SITE.url}${path}`,
    image: `${SITE.url}${image || DEFAULT_IMAGE}`,
    type: type || 'website',
    jsonLd: [].concat(jsonLd || []),
    noindex,
    preload,
  };
}

export function Seo(props) {
  const ctx = useContext(HeadContext);
  const head = buildHead(props);
  if (ctx) Object.assign(ctx, head);

  const key = JSON.stringify(head);
  useEffect(() => {
    applyHead(JSON.parse(key));
  }, [key]);

  return null;
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function metaTags(h) {
  return [
    ['name', 'description', h.description],
    ['name', 'robots', h.noindex ? 'noindex, follow' : 'index, follow'],
    ['property', 'og:site_name', SITE.name],
    ['property', 'og:locale', 'en_IN'],
    ['property', 'og:type', h.type],
    ['property', 'og:title', h.title],
    ['property', 'og:description', h.description],
    ['property', 'og:url', h.canonical],
    ['property', 'og:image', h.image],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:site', '@MajeediaTrusts'],
    ['name', 'twitter:title', h.title],
    ['name', 'twitter:description', h.description],
    ['name', 'twitter:image', h.image],
  ];
}

// Server: serialise the collected head into HTML for the page template.
export function headToHtml(h) {
  if (!h.title) return '';
  const out = [`<title>${esc(h.title)}</title>`];
  for (const [attr, key, value] of metaTags(h)) {
    out.push(`<meta ${attr}="${key}" content="${esc(value)}" />`);
  }
  if (!h.noindex) out.push(`<link rel="canonical" href="${esc(h.canonical)}" />`);
  if (h.preload) {
    out.push(
      `<link rel="preload" as="image" type="image/webp" imagesrcset="${esc(h.preload.srcSet)}" imagesizes="${esc(h.preload.sizes)}" fetchpriority="high" />`,
    );
  }
  for (const data of h.jsonLd) {
    out.push(`<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`);
  }
  return out.join('\n    ');
}

// Browser: keep the head in sync after client-side navigation.
function applyHead(h) {
  document.title = h.title;
  for (const [attr, key, value] of metaTags(h)) {
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', value);
  }
  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (h.noindex) {
    canonical?.remove();
  } else {
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = h.canonical;
  }
  document.head.querySelectorAll('script[type="application/ld+json"]').forEach((el) => el.remove());
  for (const data of h.jsonLd) {
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.textContent = JSON.stringify(data);
    document.head.appendChild(el);
  }
}
