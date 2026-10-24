import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { Seo } from '../components/Seo.jsx';
import Img from '../components/Img.jsx';
import PageHero from '../components/ui/PageHero.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import FeatureGrid from '../components/ui/FeatureGrid.jsx';
import CtaBand from '../components/ui/CtaBand.jsx';
import { DonateLink } from '../components/ui/Button.jsx';
import { donateUrlFor } from '../data/causes.js';
import { DONATION_PROVIDER } from '../data/donations.js';

function SecureNote() {
  return (
    <p className="secure-note">
      <ShieldCheck aria-hidden="true" size={18} />
      You will be taken to our secure donation page on {DONATION_PROVIDER} to choose your amount and complete your donation.
    </p>
  );
}

// Template for the five cause donation pages. The original pages embedded the
// MYFUNDBOX form in an iframe; here the button links to it instead.
export default function CauseDonate({ cause }) {
  const { donate } = cause;
  const donateUrl = donateUrlFor(cause);

  return (
    <>
      <Seo path={cause.donatePath} title={donate.seoTitle} description={donate.description} />
      <PageHero eyebrow="Donate" title={donate.h1}>
        <div className="btn-row">
          <DonateLink href={donateUrl} label={cause.title}>Donate Now</DonateLink>
          <Link to={cause.infoPath} className="text-link">Learn more about this cause</Link>
        </div>
        <SecureNote />
      </PageHero>

      <section className="section" aria-labelledby="why">
        <div className="container split align-start">
          <Img name={donate.image} alt={donate.imageAlt} className="rounded-media" priority />
          <div>
            <SectionHeading id="why" eyebrow={donate.eyebrow} title={donate.heading} align="left" />
            <div className="prose">
              {donate.body.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
        </div>
      </section>

      {donate.extra && (
        <section className="section pt-0" aria-labelledby="extra">
          <div className="container narrow">
            <h2 id="extra">{donate.extraHeading}</h2>
            <div className="prose">
              {donate.extra.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
        </section>
      )}

      <section className="section section-cream" aria-labelledby="focus">
        <div className="container">
          <SectionHeading id="focus" title={donate.focusHeading} />
          <FeatureGrid items={donate.focus} columns={2} />
        </div>
      </section>

      <section className="section" aria-labelledby="appeal">
        <div className="container narrow">
          <div className="appeal-card">
            <SectionHeading id="appeal" eyebrow={donate.appealEyebrow} title={donate.appealHeading} />
            <div className="prose center">
              {donate.appeal.map((p) => <p key={p}>{p}</p>)}
            </div>
            <div className="btn-row center">
              <DonateLink href={donateUrl} label={cause.title}>Donate Now</DonateLink>
            </div>
            <SecureNote />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
