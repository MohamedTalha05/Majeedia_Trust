import { useEffect, useRef, type ComponentType } from 'react';
import { useLocation } from 'react-router-dom';
import { matchRoute, type PageKey, type RouteMatch } from '../shared/routes';
import type { PublicContent, SiteConfig } from '../shared/types';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { AppProvider, DICTS } from './lib/app-context';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Faq, NotFound } from './pages/Faq';
import { Fund } from './pages/Fund';
import { Home } from './pages/Home';
import { Impact } from './pages/Impact';
import { Imprint, LegalStatus, Privacy } from './pages/Legal';
import { Projects } from './pages/Projects';
import { Story } from './pages/Story';
import { Support, SupportDetail } from './pages/Support';
import { UpdateDetail, Updates } from './pages/Updates';
import { Vision } from './pages/Vision';
import { applyHead, buildHead, findDetail } from './seo/head';

const PAGES: Record<PageKey | 'notFound', ComponentType> = {
  home: Home,
  about: About,
  story: Story,
  support: Support,
  supportDetail: SupportDetail,
  projects: Projects,
  impact: Impact,
  fund: Fund,
  vision: Vision,
  updates: Updates,
  updateDetail: UpdateDetail,
  faq: Faq,
  contact: Contact,
  legal: LegalStatus,
  privacy: Privacy,
  imprint: Imprint,
  notFound: NotFound,
};

export function resolveMatch(pathname: string, content: PublicContent): RouteMatch {
  const match = matchRoute(pathname) ?? { lang: 'en', key: 'notFound' };
  const needsDetail = match.key === 'supportDetail' || match.key === 'updateDetail';
  return needsDetail && !findDetail(match, content) ? { lang: match.lang, key: 'notFound' } : match;
}

/** After client-side navigation: update <head>, scroll to top and move focus to the main content. */
function NavigationEffects({ content, config }: { content: PublicContent; config: SiteConfig }) {
  const location = useLocation();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    applyHead(buildHead(location.pathname + location.search, content, config));
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [location.pathname]);
  return null;
}

export function App({ content, config }: { content: PublicContent; config: SiteConfig }) {
  const location = useLocation();
  const match = resolveMatch(location.pathname, content);
  const Page = PAGES[match.key];
  const t = DICTS[match.lang];

  return (
    <AppProvider value={{ lang: match.lang, match, content, config }}>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-ink px-5 py-3 text-ivory focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {t.skip}
      </a>
      <NavigationEffects content={content} config={config} />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Page key={location.pathname} />
      </main>
      <Footer />
    </AppProvider>
  );
}
