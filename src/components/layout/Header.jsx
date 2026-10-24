import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { NAV } from '../../data/site.js';
import { DONATION_URLS } from '../../data/donations.js';
import Logo from '../ui/Logo.jsx';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSub, setOpenSub] = useState(null);
  const { pathname } = useLocation();
  const headerRef = useRef(null);

  // Close menus after navigating
  useEffect(() => {
    setMenuOpen(false);
    setOpenSub(null);
  }, [pathname]);

  // Close on Escape or when clicking outside the header
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpenSub(null);
        setMenuOpen(false);
      }
    };
    const onClick = (e) => {
      if (!headerRef.current?.contains(e.target)) setOpenSub(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, []);

  const isSectionActive = (item) => item.children?.some((c) => c.to === pathname);

  return (
    <header className="site-header" ref={headerRef}>
      <div className="container header-inner">
        <Link to="/" className="header-logo" aria-label="Majeedia Trust – home">
          <Logo priority />
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          <span className="visually-hidden">{menuOpen ? 'Close menu' : 'Open menu'}</span>
        </button>

        <nav id="site-nav" className={`site-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main">
          <ul className="nav-list">
            {NAV.map((item) =>
              item.children ? (
                <li key={item.to} className={`nav-item has-sub${openSub === item.to ? ' sub-open' : ''}`}>
                  <div className="nav-sub-row">
                    <NavLink
                      to={item.to}
                      end
                      className={({ isActive }) => `nav-link${isActive || isSectionActive(item) ? ' active' : ''}`}
                    >
                      {item.label}
                    </NavLink>
                    <button
                      type="button"
                      className="sub-toggle"
                      aria-expanded={openSub === item.to}
                      aria-controls={`sub-${item.label}`}
                      onClick={() => setOpenSub((s) => (s === item.to ? null : item.to))}
                    >
                      <ChevronDown aria-hidden="true" size={18} />
                      <span className="visually-hidden">{item.label} submenu</span>
                    </button>
                  </div>
                  <ul id={`sub-${item.label}`} className="sub-list">
                    {item.children.map((child) => (
                      <li key={child.to}>
                        <NavLink to={child.to} end className="sub-link">
                          {child.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.to} className="nav-item">
                  <NavLink to={item.to} end className="nav-link">
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
          <a className="btn btn-primary header-donate" href={DONATION_URLS.multi} rel="noopener">
            Donate now
          </a>
        </nav>
      </div>
    </header>
  );
}
