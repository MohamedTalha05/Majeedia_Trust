import { ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { href, type NavKey } from '../../shared/routes';
import { tx, useApp } from '../lib/app-context';

/** Top-level menus; each opens the pages that belong to it, starting with its own page. */
export const NAV_GROUPS: { key: NavKey; items: NavKey[] }[] = [
  { key: 'about', items: ['about', 'story', 'vision', 'legal'] },
  { key: 'support', items: ['support', 'projects'] },
  { key: 'impact', items: ['impact', 'fund', 'updates'] },
  { key: 'contact', items: ['contact', 'faq'] },
];

function useGroupActive(items: NavKey[]) {
  const { lang } = useApp();
  const { pathname } = useLocation();
  return items.some((key) => pathname === href(lang, key) || pathname.startsWith(`${href(lang, key)}/`));
}

export function Logo({ light = false }: { light?: boolean }) {
  const { lang, t } = useApp();
  return (
    <Link to={href(lang, 'home')} className="flex shrink-0 items-center" aria-label={`${t.brand} – ${t.nav.home}`}>
      <img src={light ? '/logo-light.webp' : '/logo.webp'} alt={t.brand} width={223} height={61} className="h-11 w-auto sm:h-12" />
    </Link>
  );
}

function SupportButton({ className = 'hidden sm:inline-flex' }: { className?: string }) {
  const { lang, content } = useApp();
  const s = content.settings;
  if (!s.supportButtonEnabled || !s.supportButtonUrl) return null;
  return (
    <a
      href={s.supportButtonUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`rounded-full border border-brass px-4 py-2 text-sm font-semibold text-brass-deep transition-colors hover:bg-brass hover:text-white ${className}`}
    >
      {tx(s.supportButtonLabel, lang)}
    </a>
  );
}

function NavMenu({ group }: { group: (typeof NAV_GROUPS)[number] }) {
  const { lang, t } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const id = useId();
  const { pathname } = useLocation();
  const active = useGroupActive(group.items);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onClick = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => !ref.current?.contains(e.relatedTarget as Node) && setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className={`relative flex items-center gap-1 py-3 text-[0.9rem] font-medium whitespace-nowrap transition-colors after:absolute after:inset-x-0 after:bottom-1.5 after:h-px after:origin-left after:bg-brass after:transition-transform ${
          active ? 'text-ink after:scale-x-100' : 'text-ink-soft hover:text-ink after:scale-x-0 hover:after:scale-x-100'
        }`}
      >
        {t.nav[group.key]}
        <ChevronDown aria-hidden className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-1/2 z-50 -translate-x-1/2 pt-2">
          <ul id={id} className="min-w-60 rounded-2xl border border-line bg-white p-2 shadow-lift">
            {group.items.map((key) => (
              <li key={key}>
                <NavLink
                  to={href(lang, key)}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-2.5 text-[0.95rem] whitespace-nowrap transition-colors ${
                      isActive ? 'bg-brass-soft/60 font-semibold text-brass-deep' : 'text-ink-soft hover:bg-sand hover:text-ink'
                    }`
                  }
                >
                  {t.nav[key]}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export function Header() {
  const { lang, t } = useApp();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  // The mobile menu is rendered outside <header>: its backdrop-blur would otherwise
  // confine the fixed-position menu to the header's own box.
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line/80 bg-ivory/90 backdrop-blur-md">
        <div className="container-site flex h-[4.5rem] items-center justify-between gap-4">
          <Logo />
          <nav aria-label={t.nav.menu} className="hidden min-[1100px]:block">
            <ul className="flex items-center gap-8">
              {NAV_GROUPS.map((group) => (
                <NavMenu key={group.key} group={group} />
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <SupportButton />
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex size-10 items-center justify-center rounded-full border border-line bg-white text-ink min-[1100px]:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              <Menu className="size-5" aria-hidden />
              <span className="sr-only">{t.nav.menu}</span>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div id="mobile-nav" role="dialog" aria-modal="true" aria-label={t.nav.menu} className="fixed inset-0 z-50 min-[1100px]:hidden">
          <button type="button" aria-label={t.nav.close} className="absolute inset-0 bg-deep/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto bg-ivory shadow-lift">
            <div className="flex h-[4.5rem] items-center justify-between border-b border-line px-4 sm:px-6">
              <span className="font-serif text-lg text-ink">{t.nav.menu}</span>
              <button
                type="button"
                autoFocus
                onClick={() => setOpen(false)}
                className="inline-flex size-10 items-center justify-center rounded-full border border-line bg-white text-ink"
              >
                <X className="size-5" aria-hidden />
                <span className="sr-only">{t.nav.close}</span>
              </button>
            </div>
            <nav aria-label={t.nav.menu} className="flex flex-col gap-6 px-4 py-5 sm:px-6">
              <NavLink to={href(lang, 'home')} end className={({ isActive }) => `font-serif text-xl ${isActive ? 'font-semibold text-brass-deep' : 'text-ink'}`}>
                {t.nav.home}
              </NavLink>
              {NAV_GROUPS.map((group) => (
                <section key={group.key}>
                  <h2 className="font-sans text-xs font-semibold tracking-[0.16em] text-muted uppercase">{t.nav[group.key]}</h2>
                  <ul className="mt-1">
                    {group.items.map((key) => (
                      <li key={key}>
                        <NavLink
                          to={href(lang, key)}
                          className={({ isActive }) =>
                            `block border-b border-line/70 py-3 font-serif text-lg ${isActive ? 'font-semibold text-brass-deep' : 'text-ink'}`
                          }
                        >
                          {t.nav[key]}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </nav>
            <div className="px-4 pb-6 sm:hidden">
              <SupportButton className="flex w-full justify-center py-3 text-base" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
