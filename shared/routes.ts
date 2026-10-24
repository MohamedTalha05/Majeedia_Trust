// Route table: one page key, one SEO-friendly path per language (the site is English-only).
import { LANGS, type Lang, type PublicContent } from './types';

export type PageKey =
  | 'home'
  | 'about'
  | 'story'
  | 'support'
  | 'supportDetail'
  | 'projects'
  | 'impact'
  | 'fund'
  | 'vision'
  | 'updates'
  | 'updateDetail'
  | 'faq'
  | 'contact'
  | 'legal'
  | 'privacy'
  | 'imprint';

/** Pages that have a fixed nav label (everything except detail pages). */
export type NavKey = Exclude<PageKey, 'supportDetail' | 'updateDetail'>;

export const PATHS: Record<PageKey, Record<Lang, string>> = {
  home: { en: '' },
  about: { en: 'about' },
  story: { en: 'our-story' },
  support: { en: 'what-we-support' },
  supportDetail: { en: 'what-we-support/:slug' },
  projects: { en: 'projects' },
  impact: { en: 'impact-transparency' },
  fund: { en: 'family-fund' },
  vision: { en: 'long-term-vision' },
  updates: { en: 'updates' },
  updateDetail: { en: 'updates/:slug' },
  faq: { en: 'faq' },
  contact: { en: 'contact' },
  legal: { en: 'legal-status-governance' },
  privacy: { en: 'privacy-policy' },
  imprint: { en: 'imprint' },
};

/** The parent page shown in breadcrumbs (home is always the root). */
export const PARENT: Partial<Record<PageKey, PageKey>> = {
  story: 'about',
  supportDetail: 'support',
  updateDetail: 'updates',
};

export function href(lang: Lang, key: PageKey, slug?: string): string {
  const path = PATHS[key][lang].replace(':slug', encodeURIComponent(slug ?? ''));
  return path ? `/${lang}/${path}` : `/${lang}`;
}

export interface RouteMatch {
  lang: Lang;
  key: PageKey | 'notFound';
  slug?: string;
}

export function matchRoute(pathname: string): RouteMatch | null {
  const parts = pathname.replace(/\/+$/, '').split('/').filter(Boolean);
  const lang = parts[0] as Lang;
  if (!LANGS.includes(lang)) return null;
  const rest = parts.slice(1);
  for (const key of Object.keys(PATHS) as PageKey[]) {
    const pattern = PATHS[key][lang].split('/').filter(Boolean);
    if (pattern.length !== rest.length) continue;
    let slug: string | undefined;
    const ok = pattern.every((seg, i) => {
      if (seg === ':slug') {
        slug = safeDecode(rest[i]);
        return true;
      }
      return seg === rest[i];
    });
    if (ok) return { lang, key, slug };
  }
  return { lang, key: 'notFound' };
}

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

/** Path of the same page in another language, resolving per-language slugs from content. */
export function alternatePath(match: RouteMatch, target: Lang, content: PublicContent): string | null {
  if (match.key === 'notFound') return `/${target}`;
  if (match.key === 'supportDetail') {
    const item = content.categories.find((c) => c.slug[match.lang] === match.slug);
    return item ? href(target, 'supportDetail', item.slug[target]) : null;
  }
  if (match.key === 'updateDetail') {
    const item = content.updates.find((u) => u.slug[match.lang] === match.slug);
    return item ? href(target, 'updateDetail', item.slug[target]) : null;
  }
  return href(target, match.key);
}

/** All indexable paths, for the XML sitemap. */
export function sitemapPaths(content: PublicContent): string[] {
  const paths: string[] = [];
  for (const key of Object.keys(PATHS) as PageKey[]) {
    if (key === 'supportDetail' || key === 'updateDetail') continue;
    paths.push(href('en', key));
  }
  for (const c of content.categories) paths.push(href('en', 'supportDetail', c.slug.en));
  for (const u of content.updates) paths.push(href('en', 'updateDetail', u.slug.en));
  return paths;
}
