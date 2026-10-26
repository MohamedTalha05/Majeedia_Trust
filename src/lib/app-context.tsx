import { createContext, useContext, type ReactNode } from 'react';
import type { RouteMatch } from '../../shared/routes';
import type { I18n, Lang, PublicContent, SiteConfig } from '../../shared/types';
import { en, type Dict } from '../i18n/en';

export const DICTS: Record<Lang, Dict> = { en };

interface AppState {
  lang: Lang;
  t: Dict;
  match: RouteMatch;
  content: PublicContent;
  config: SiteConfig;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ value, children }: { value: Omit<AppState, 't'>; children: ReactNode }) {
  return <AppContext.Provider value={{ ...value, t: DICTS[value.lang] }}>{children}</AppContext.Provider>;
}

export function useApp(): AppState {
  const state = useContext(AppContext);
  if (!state) throw new Error('useApp must be used inside <AppProvider>');
  return state;
}

/** Pick the text for the current language. */
export function tx(value: I18n | undefined, lang: Lang): string {
  return value?.[lang] ?? '';
}

export function formatAmount(amount: number, _lang: Lang): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(iso: string, _lang: Lang): string {
  if (!iso) return '';
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' }).format(date);
}

/** Split CMS text into paragraphs on blank lines. */
export const paragraphs = (text: string) => text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
