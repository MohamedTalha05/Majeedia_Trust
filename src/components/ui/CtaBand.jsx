import { DONATION_URLS } from '../../data/donations.js';
import { DonateLink } from './Button.jsx';

// Closing call-to-action band. Defaults to the site-wide "Be Part of the Journey" text.
export default function CtaBand({
  eyebrow = 'Be Part of the Journey',
  heading = 'Together, We Can Create More Possibilities.',
  text = [
    'Positive change becomes stronger when people come together.',
    'Whether you want to support an initiative, volunteer your time, share your skills, partner with us, or simply learn more about our work, there is a place for you in this journey.',
  ],
  children,
}) {
  return (
    <section className="cta-band" aria-labelledby="cta-heading">
      <div className="container cta-inner">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id="cta-heading">{heading}</h2>
        {[].concat(text).map((p) => <p key={p}>{p}</p>)}
        <div className="btn-row center">
          {children || (
            <DonateLink href={DONATION_URLS.multi} variant="light" label="all causes">
              Support Our Work
            </DonateLink>
          )}
        </div>
      </div>
    </section>
  );
}
