// Site content for the static (GitHub Pages) build, read from data/*.json at build time.
// The JSON data store, admin panel and API in server/ are disabled for now; this mirrors
// getPublicContent() in server/store.ts so the public site shows exactly the same content.
import categories from '../../data/categories.json';
import faqs from '../../data/faqs.json';
import ledger from '../../data/ledger.json';
import legal from '../../data/legal.json';
import projects from '../../data/projects.json';
import reports from '../../data/reports.json';
import settings from '../../data/settings.json';
import stats from '../../data/stats.json';
import updates from '../../data/updates.json';
import type { PublicContent } from '../../shared/types';

type Doc = Record<string, any>;
const list = (value: unknown) => value as Doc[];
const byOrder = (a: Doc, b: Doc) => (a.order ?? 0) - (b.order ?? 0);
const byDateDesc = (a: Doc, b: Doc) => String(b.date ?? '').localeCompare(String(a.date ?? ''));

/** The public view of the content: unpublished items, unverified figures and non-consented photos are removed. */
export const STATIC_CONTENT = {
  categories: list(categories).filter((c) => c.published).sort(byOrder),
  projects: list(projects)
    .filter((p) => p.published)
    .map((p) => (p.photoConsent ? p : { ...p, photos: [] }))
    .sort((a, b) => byOrder(a, b) || String(b.year).localeCompare(String(a.year))),
  stats: list(stats)
    .map((s) => (s.verified && s.value ? s : { ...s, value: '', note: { en: '' } }))
    .sort(byOrder),
  reports: list(reports).filter((r) => r.published).sort((a, b) => String(b.year).localeCompare(String(a.year))),
  updates: list(updates)
    .filter((u) => u.published)
    .map((u) => (u.photoConsent ? u : { ...u, image: '' }))
    .sort(byDateDesc),
  faqs: list(faqs).filter((f) => f.published).sort(byOrder),
  ledger: list(ledger)
    .filter((e) => e.verified && e.public)
    .map(({ note: _note, ...entry }) => ({ ...entry, note: { en: '' } })),
  legal,
  settings,
} as unknown as PublicContent;
