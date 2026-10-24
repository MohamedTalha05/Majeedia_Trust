import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { Seo } from '../components/Seo.jsx';
import PageHero from '../components/ui/PageHero.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import DonateCard from '../components/ui/DonateCard.jsx';
import { DonateLink } from '../components/ui/Button.jsx';
import { GENERAL_CAUSES, SPONSORSHIP_CAUSES } from '../data/causes.js';
import { DONATION_URLS, DONATION_PROVIDER } from '../data/donations.js';
import { SITE } from '../data/site.js';

export default function Donate() {
  return (
    <>
      <Seo
        path="/donate/"
        title="Donate"
        description="Donate to Majeedia Trust: support education, maintenance, sponsorship of widows and people in need, medical needs or girls’ Hifz education."
      />
      <PageHero
        eyebrow="Support Our Work"
        title="Donate to Majeedia Trust"
        lead="Every contribution helps make a difference. Choose a cause that matters to you, or give to all of our causes at once."
        image="banner-donations"
        imageAlt="A volunteer handing a parcel to an elderly couple outside their home"
      >
        <div className="btn-row">
          <DonateLink href={DONATION_URLS.multi} label="choose one or more causes">Donate Now</DonateLink>
        </div>
      </PageHero>

      <section className="section" aria-labelledby="general">
        <div className="container">
          <SectionHeading
            id="general"
            eyebrow="General Donations"
            title="Support Education and Essential Facilities"
            intro="Support education and help maintain the resources our community depends on."
          />
          <div className="donate-grid cols-2">
            {GENERAL_CAUSES.map((cause) => <DonateCard key={cause.id} cause={cause} />)}
          </div>
          <p className="center-link"><Link to="/general-donation/" className="text-link">More about General Donations</Link></p>
        </div>
      </section>

      <section className="section section-cream" aria-labelledby="sponsorship">
        <div className="container">
          <SectionHeading
            id="sponsorship"
            eyebrow="Sponsorship – 2026"
            title="Sponsor Someone’s Journey"
            intro="Help individuals facing hardship, support essential medical needs, and encourage girls to continue their Hifz education."
          />
          <div className="donate-grid">
            {SPONSORSHIP_CAUSES.map((cause) => <DonateCard key={cause.id} cause={cause} />)}
          </div>
          <p className="center-link"><Link to="/sponsorship/" className="text-link">More about Sponsorship – 2026</Link></p>
        </div>
      </section>

      <section className="section" aria-labelledby="how-it-works">
        <div className="container narrow">
          <div className="info-panel">
            <ShieldCheck aria-hidden="true" size={32} className="info-panel-icon" />
            <div>
              <h2 id="how-it-works">How Donating Works</h2>
              <p>
                When you select a Donate button, you are taken to our secure donation page on {DONATION_PROVIDER}, where you
                choose your amount and complete the payment. Payment details are entered on that page only – this website
                never sees or stores your card or bank details.
              </p>
              <p>
                If you have a question about a donation, a receipt, or a payment, please contact us at{' '}
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. See our{' '}
                <Link to="/term-conditions/">Terms &amp; Conditions</Link> and <Link to="/privacy-policy/">Privacy Policy</Link>{' '}
                for more information.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
