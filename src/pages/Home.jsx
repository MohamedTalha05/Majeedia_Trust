import { Link } from 'react-router-dom';
import { ArrowRight, Check, HeartHandshake, ShieldCheck, Sprout } from 'lucide-react';
import { Seo } from '../components/Seo.jsx';
import Img, { imageSources } from '../components/Img.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import CauseRow from '../components/ui/CauseRow.jsx';
import FeatureGrid from '../components/ui/FeatureGrid.jsx';
import CtaBand from '../components/ui/CtaBand.jsx';
import { ButtonLink, DonateLink } from '../components/ui/Button.jsx';
import ContactForm from '../components/forms/ContactForm.jsx';
import { CAUSES, donateUrlFor } from '../data/causes.js';
import { AREAS } from '../data/areas.js';
import { DONATION_URLS } from '../data/donations.js';
import { SITE } from '../data/site.js';

const HERO_SIZES = '100vw';

const PRINCIPLES = [
  { title: 'People First', icon: HeartHandshake, text: 'Every person has a different story and different needs. We approach our work with care, dignity, and respect for every individual.' },
  { title: 'Responsible Action', icon: ShieldCheck, text: 'Good intentions matter, but meaningful change also requires thoughtful action, accountability, and a genuine commitment to doing what we can.' },
  { title: 'Long-Term Commitment', icon: Sprout, text: 'We believe lasting value comes from consistency. We aim to build support and opportunities that can make a meaningful difference over time.' },
];

const ORGANIZATION_LD = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  url: `${SITE.url}/`,
  logo: `${SITE.url}/images/logo.png`,
  email: SITE.email,
  telephone: ['+91 94441 35055', '+91 44 2434 8300'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  sameAs: SITE.social.map((s) => s.href),
};

const WEBSITE_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  name: SITE.name,
  url: `${SITE.url}/`,
  description: SITE.tagline,
  publisher: { '@id': `${SITE.url}/#organization` },
  inLanguage: 'en-IN',
};

export default function Home() {
  const hero = imageSources('hero-home');
  return (
    <>
      <Seo
        path="/"
        title="Majeedia Trust – Creating Opportunities. Strengthening Communities."
        description="Majeedia Trust supports people and communities through education, sponsorship, medical support and community initiatives. Learn about our work or donate."
        jsonLd={[ORGANIZATION_LD, WEBSITE_LD]}
        preload={{ srcSet: hero.srcSet, sizes: HERO_SIZES }}
      />

      <section className="home-hero">
        <div className="home-hero-media">
          <Img name="hero-home" alt="A volunteer reading with two children outside a village home" sizes={HERO_SIZES} priority />
        </div>
        <div className="container home-hero-content">
          <h1>Creating Opportunities. Strengthening Communities.</h1>
          <p className="hero-sub">Supporting People. Building Possibilities.</p>
          <p className="lead">
            Majeedia Trust works to support people and communities through meaningful initiatives focused on education,
            wellbeing, opportunity, and social development.
          </p>
          <div className="btn-row">
            <ButtonLink to="/about/" variant="secondary">Learn About Us</ButtonLink>
            <DonateLink href={DONATION_URLS.multi} label="all causes" />
          </div>
          <ul className="hero-ticks">
            {['Community', 'Care', 'Opportunity'].map((t) => (
              <li key={t}><Check aria-hidden="true" size={16} /> {t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="what-we-do">
        <div className="container">
          <SectionHeading
            id="what-we-do"
            eyebrow="Our Focus"
            title="What We Do"
            intro="We work alongside people and communities to create meaningful opportunities, offer support, and contribute to a better future."
          />
          <div className="cause-list">
            {CAUSES.map((cause, i) => (
              <CauseRow
                key={cause.id}
                number={String(i + 1).padStart(2, '0') + '.'}
                title={cause.cardTitle || cause.title}
                paragraphs={cause.summary}
                image={cause.image}
                imageAlt={cause.imageAlt}
                reverse={i % 2 === 1}
              >
                <ButtonLink to={cause.infoPath} variant="secondary" context={`about ${cause.cardTitle || cause.title}`}>
                  Learn More
                </ButtonLink>
                <DonateLink href={donateUrlFor(cause)} label={cause.title} variant="primary">Donate</DonateLink>
              </CauseRow>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-cream" aria-labelledby="areas">
        <div className="container">
          <SectionHeading
            id="areas"
            eyebrow="What We Care About"
            title="Our Areas of Work"
            intro="We focus on practical support that helps people, families, and communities move forward."
          />
          <FeatureGrid items={AREAS.map((a) => ({ title: a.title, text: a.short, icon: a.icon }))} />
          <p className="center-link">
            <Link to="/our-work/" className="text-link">
              Explore our work <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="approach">
        <div className="container">
          <SectionHeading id="approach" eyebrow="Our Approach" title="What Guides Our Work" />
          <FeatureGrid items={PRINCIPLES} />
        </div>
      </section>

      <CtaBand
        eyebrow="Be a Part of Change"
        heading="Every Contribution Helps Make a Difference"
        text="Choose a cause that matters to you and help Majeedia Trust continue supporting the community."
      >
        <ButtonLink to="/donate/" variant="light">Choose a Cause</ButtonLink>
        <DonateLink href={DONATION_URLS.multi} variant="outline-light" label="all causes" />
      </CtaBand>

      <section className="section" aria-labelledby="get-involved">
        <div className="container split">
          <div className="split-text">
            <SectionHeading
              id="get-involved"
              eyebrow="Get Involved"
              title="Be Part of the Journey"
              align="left"
              intro="Every contribution can make a difference. Whether you want to volunteer, support an initiative, partner with us, or simply learn more about our work, we’d be happy to hear from you."
            />
            <Img name="girl-with-books" alt="A young girl holding a stack of books" sizes="(min-width: 960px) 30vw, 70vw" className="split-illustration" />
          </div>
          <div className="card form-card">
            <h3>Send Us a Message</h3>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
