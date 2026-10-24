import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { SITE, FOOTER_INFO, FOOTER_QUICK } from '../../data/site.js';
import Logo from '../ui/Logo.jsx';

const SOCIAL_ICONS = { Facebook, X: Twitter, LinkedIn: Linkedin, Instagram };

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="footer-logo" aria-label="Majeedia Trust – home">
            <Logo />
          </Link>
          <p>{SITE.footerText}</p>
          <ul className="social-list" aria-label="Majeedia Trust on social media">
            {SITE.social.map(({ name, href }) => {
              const Icon = SOCIAL_ICONS[name];
              return (
                <li key={name}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="social-link">
                    <Icon aria-hidden="true" size={18} />
                    <span className="visually-hidden">{name} (opens in a new tab)</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <nav className="footer-col" aria-labelledby="footer-info">
          <h2 id="footer-info" className="footer-heading">Information</h2>
          <ul>
            {FOOTER_INFO.map((l) => (
              <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <nav className="footer-col" aria-labelledby="footer-quick">
          <h2 id="footer-quick" className="footer-heading">Quick Links</h2>
          <ul>
            {FOOTER_QUICK.map((l) => (
              <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div className="footer-col">
          <h2 className="footer-heading">Contact Info</h2>
          <address className="footer-contact">
            <p>
              <MapPin aria-hidden="true" size={18} />
              <span>{SITE.address.lines.map((l) => <span key={l} className="line">{l}</span>)}</span>
            </p>
            {SITE.phones.map((p) => (
              <p key={p.href}>
                <Phone aria-hidden="true" size={18} />
                <a href={p.href}>{p.label}</a>
              </p>
            ))}
            <p>
              <Mail aria-hidden="true" size={18} />
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
          </address>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p suppressHydrationWarning>Copyright © {new Date().getFullYear()} {SITE.name}</p>
        </div>
      </div>
    </footer>
  );
}
