// Builds the <head> (title, meta, canonical, Open Graph, JSON-LD) for any URL.
// Used by the server for the initial HTML and by the client after in-app navigation.
import { alternatePath, href, matchRoute, PARENT, type PageKey, type RouteMatch } from '../../shared/routes';
import type { Lang, PublicContent, SiteConfig } from '../../shared/types';
import { DICTS, tx } from '../lib/app-context';

export interface Crumb {
  name: string;
  path: string;
}

export interface Head {
  lang: Lang;
  status: number;
  title: string;
  description: string;
  canonical: string;
  robots: string;
  ogType: 'website' | 'article';
  ogImage: string;
  ogImageAlt: string;
  ogLocale: string;
  jsonLd: Record<string, unknown>[];
}

const NAV_LABEL: Record<PageKey, keyof (typeof DICTS)['en']['nav']> = {
  home: 'home',
  about: 'about',
  story: 'story',
  support: 'support',
  supportDetail: 'support',
  projects: 'projects',
  impact: 'impact',
  fund: 'fund',
  vision: 'vision',
  updates: 'updates',
  updateDetail: 'updates',
  faq: 'faq',
  contact: 'contact',
  legal: 'legal',
  privacy: 'privacy',
  imprint: 'imprint',
  terms: 'terms',
};

/** Resolve the detail item (support area or update) a URL refers to. */
export function findDetail(match: RouteMatch, content: PublicContent) {
  if (match.key === 'supportDetail') return content.categories.find((c) => c.slug[match.lang] === match.slug);
  if (match.key === 'updateDetail') return content.updates.find((u) => u.slug[match.lang] === match.slug);
  return undefined;
}

export function getCrumbs(match: RouteMatch, content: PublicContent): Crumb[] {
  const t = DICTS[match.lang];
  const crumbs: Crumb[] = [{ name: t.nav.home, path: href(match.lang, 'home') }];
  if (match.key === 'home' || match.key === 'notFound') return crumbs;
  const parent = PARENT[match.key];
  if (parent) crumbs.push({ name: t.nav[NAV_LABEL[parent]], path: href(match.lang, parent) });
  const detail = findDetail(match, content);
  const name = detail ? tx(detail.title, match.lang) : t.nav[NAV_LABEL[match.key]];
  crumbs.push({ name, path: alternatePath(match, match.lang, content) ?? '' });
  return crumbs;
}

export function buildHead(url: string, content: PublicContent, config: SiteConfig): Head {
  const pathname = url.split(/[?#]/)[0];
  const abs = (p: string) => `${config.siteUrl}${p}`;
  let match: RouteMatch = matchRoute(pathname) ?? { lang: 'en', key: 'notFound' };
  const detail = findDetail(match, content);
  if ((match.key === 'supportDetail' || match.key === 'updateDetail') && !detail) match = { lang: match.lang, key: 'notFound' };

  const { lang } = match;
  const t = DICTS[lang];
  const settings = content.settings;
  const orgId = `${config.siteUrl}/#organization`;

  let title: string;
  let description: string;
  if (match.key === 'notFound') {
    ({ title, description } = t.meta.notFound);
  } else if (detail) {
    title = `${tx(detail.title, lang)} | ${t.brand}`;
    description = 'summary' in detail ? tx(detail.summary, lang) : tx(detail.excerpt, lang);
  } else {
    ({ title, description } = t.meta[match.key as Exclude<PageKey, 'supportDetail' | 'updateDetail'>]);
  }

  const canonical = match.key === 'notFound' ? abs(`/${lang}`) : abs(alternatePath(match, lang, content) ?? `/${lang}`);
  const updateImage = match.key === 'updateDetail' && detail && 'image' in detail && detail.image ? detail.image : '';
  const ogImage = abs(updateImage && updateImage.startsWith('/') ? updateImage : '/og-image.jpg');

  const sameAs = [settings.facebookUrl, settings.instagramUrl, settings.linkedinUrl, settings.youtubeUrl, settings.xUrl].filter(Boolean);
  const organization: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': orgId,
    name: t.brand,
    url: config.siteUrl,
    logo: abs('/logo-512.png'),
    description: t.common.statement,
    slogan: t.home.motto.join(' '),
    knowsAbout: [
      'Family philanthropy',
      'Sustainable giving',
      'Education support',
      'Girls’ education',
      'Madrasa education',
      'Widow support',
      'Disability support',
      'Community welfare',
      'Zakat',
    ],
  };
  if (settings.contactEmail) organization.email = settings.contactEmail;
  if (sameAs.length) organization.sameAs = sameAs;
  if (content.legal.legalName?.[lang]) organization.legalName = content.legal.legalName[lang];

  const jsonLd: Record<string, unknown>[] = [organization];
  if (match.key !== 'notFound') {
    const crumbs = getCrumbs(match, content);
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': match.key === 'faq' ? 'FAQPage' : match.key === 'about' || match.key === 'story' ? 'AboutPage' : match.key === 'contact' ? 'ContactPage' : 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: title,
      description,
      inLanguage: lang,
      isPartOf: { '@type': 'WebSite', '@id': `${config.siteUrl}/#website`, name: t.brand, url: config.siteUrl, publisher: { '@id': orgId } },
      about: { '@id': orgId },
      ...(match.key === 'faq' && {
        mainEntity: content.faqs.map((f) => ({
          '@type': 'Question',
          name: tx(f.question, lang),
          acceptedAnswer: { '@type': 'Answer', text: tx(f.answer, lang) },
        })),
      }),
    });
    if (crumbs.length > 1) {
      jsonLd.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.path) })),
      });
    }
    if (match.key === 'updateDetail' && detail && 'date' in detail) {
      jsonLd.push({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: tx(detail.title, lang),
        description,
        datePublished: detail.date || undefined,
        inLanguage: lang,
        image: ogImage,
        author: { '@id': orgId },
        publisher: { '@id': orgId },
        mainEntityOfPage: canonical,
      });
    }
  }

  return {
    lang,
    status: match.key === 'notFound' ? 404 : 200,
    title,
    description,
    canonical,
    robots: match.key === 'notFound' ? 'noindex, follow' : 'index, follow, max-image-preview:large',
    ogType: match.key === 'updateDetail' ? 'article' : 'website',
    ogImage,
    ogImageAlt: t.meta.home.title,
    ogLocale: 'en_GB',
    jsonLd,
  };
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function headToHtml(head: Head): string {
  const t = DICTS[head.lang];
  return [
    `<title>${esc(head.title)}</title>`,
    `<meta name="description" content="${esc(head.description)}">`,
    `<meta name="robots" content="${head.robots}">`,
    `<link rel="canonical" href="${esc(head.canonical)}">`,
    `<meta property="og:site_name" content="${esc(t.brand)}">`,
    `<meta property="og:type" content="${head.ogType}">`,
    `<meta property="og:title" content="${esc(head.title)}">`,
    `<meta property="og:description" content="${esc(head.description)}">`,
    `<meta property="og:url" content="${esc(head.canonical)}">`,
    `<meta property="og:image" content="${esc(head.ogImage)}">`,
    `<meta property="og:image:alt" content="${esc(head.ogImageAlt)}">`,
    `<meta property="og:locale" content="${head.ogLocale}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    ...head.jsonLd.map((d) => `<script type="application/ld+json">${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`),
  ].join('\n    ');
}

/** Client-side: replace the managed head tags after navigation. */
export function applyHead(head: Head): void {
  document.documentElement.lang = head.lang;
  document.title = head.title;
  const managed = document.head.querySelectorAll(
    'meta[name="description"], meta[name="robots"], link[rel="canonical"], link[rel="alternate"][hreflang], meta[property^="og:"], meta[name^="twitter:"], script[type="application/ld+json"]',
  );
  managed.forEach((el) => el.remove());
  const template = document.createElement('template');
  template.innerHTML = headToHtml(head).replace(/<title>.*?<\/title>/, '');
  document.head.append(template.content);
}
