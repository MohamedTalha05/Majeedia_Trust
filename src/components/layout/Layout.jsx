import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default function Layout({ children }) {
  const { pathname, hash } = useLocation();
  const mainRef = useRef(null);
  const firstRender = useRef(true);

  // On client-side navigation: start at the top and move keyboard/screen-reader
  // focus to the new page content, as a full page load would.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (hash) return;
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname, hash]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Header />
      <main id="main" ref={mainRef} tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}
