import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { DONATION_PROVIDER } from '../../data/donations.js';

// variant: 'primary' (green) | 'secondary' (outlined) | 'light' (for dark backgrounds)
// context: extra words for screen readers, e.g. "about Education" after "Learn More"
export function ButtonLink({ to, href, variant = 'primary', arrow = false, context, children, className = '', ...rest }) {
  const cls = `btn btn-${variant} ${className}`.trim();
  const content = (
    <>
      {children}
      {context && <span className="visually-hidden"> {context}</span>}
      {arrow && <ArrowRight aria-hidden="true" size={18} />}
    </>
  );
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link to={to} className={cls} {...rest}>
      {content}
    </Link>
  );
}

// Link to an external MYFUNDBOX donation page. Opens in the same tab
// (no iframe, no payment data handled by this site).
export function DonateLink({ href, children = 'Donate Now', variant = 'primary', label, className }) {
  return (
    <a href={href} className={`btn btn-${variant} ${className || ''}`.trim()} rel="noopener">
      {children}
      <ExternalLink aria-hidden="true" size={16} />
      <span className="visually-hidden">
        {label ? ` – ${label}` : ''} (secure donation page on {DONATION_PROVIDER})
      </span>
    </a>
  );
}
