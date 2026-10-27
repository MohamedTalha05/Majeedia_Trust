import { Link } from 'react-router-dom';
import { href, type NavKey } from '../../shared/routes';
import { useApp } from '../lib/app-context';
import { GeometricPattern } from './Geometric';
import { Logo } from './Header';
import { SocialLinks } from './SocialLinks';

export function Footer() {
  const { lang, t } = useApp();

  const groups: { title: string; items: NavKey[] }[] = [
    { title: t.common.footerExplore, items: ['support', 'projects', 'impact', 'fund', 'vision', 'updates'] },
    { title: t.common.footerTrust, items: ['about', 'story', 'faq', 'contact', 'legal'] },
  ];
  const legal = [
    { label: t.nav.privacy, to: href(lang, 'privacy'), hrefLang: lang },
    { label: t.nav.imprint, to: href(lang, 'imprint'), hrefLang: lang },
    { label: t.nav.terms, to: href(lang, 'terms'), hrefLang: lang },
  ];
  return (
    <footer className="relative overflow-hidden bg-deep text-ivory/75">
      <GeometricPattern className="absolute inset-0 h-full w-full text-ivory/[0.035]" size={72} />
      <div className="container-site relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo light />
            <p className="mt-6 max-w-md leading-relaxed">{t.common.statement}</p>
            <p className="mt-6 font-serif text-lg text-brass-soft italic">{t.home.motto.join(' ')}</p>
            <div className="mt-6">
              <SocialLinks label={t.common.social} linkClassName="border border-ivory/20 text-ivory/75 hover:border-ivory/60 hover:text-ivory" />
            </div>
          </div>
          {groups.map((g) => (
            <nav key={g.title} aria-label={g.title} className="lg:col-span-2">
              <h2 className="font-sans text-xs font-semibold tracking-[0.16em] text-brass uppercase">{g.title}</h2>
              <ul className="mt-5 space-y-3 text-[0.95rem]">
                {g.items.map((key) => (
                  <li key={key}>
                    <Link to={href(lang, key)} className="hover:text-ivory underline-offset-4 hover:underline">
                      {t.nav[key]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <nav aria-label={t.common.footerLegal} className="lg:col-span-3">
            <h2 className="font-sans text-xs font-semibold tracking-[0.16em] text-brass uppercase">{t.common.footerLegal}</h2>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              {legal.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} hrefLang={l.hrefLang} className="hover:text-ivory underline-offset-4 hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-ivory/10 pt-8 text-sm text-ivory/55 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {t.brand}. {t.common.rights}
          </p>
          <p>{t.common.poweredBy}</p>
        </div>
      </div>
    </footer>
  );
}
