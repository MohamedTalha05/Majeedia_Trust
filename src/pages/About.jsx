import { Seo } from '../components/Seo.jsx';
import Img from '../components/Img.jsx';
import PageHero from '../components/ui/PageHero.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import FeatureGrid from '../components/ui/FeatureGrid.jsx';
import CtaBand from '../components/ui/CtaBand.jsx';
import { AREAS } from '../data/areas.js';

const TRUST_PHOTOS = [
  { name: 'trust-girls-gathering', alt: 'Girls and young women seated together in a hall' },
  { name: 'trust-computer-room', alt: 'Women working at computers in a small training room' },
  { name: 'trust-prayer-hall', alt: 'The interior of a prayer hall with ceiling fans and tiled walls' },
];

export default function About() {
  return (
    <>
      <Seo
        path="/about/"
        title="About Us"
        description="Majeedia Trust exists to respond to people’s needs with compassion and create opportunities that help individuals and communities move forward."
      />
      <PageHero
        eyebrow="A Few Words"
        title="About Majeedia Trust"
        image="banner-about"
        imageAlt="Volunteers planting seedlings together in a community garden"
      />

      <section className="section" aria-labelledby="purpose">
        <div className="container split">
          <div>
            <SectionHeading id="purpose" eyebrow="Our Purpose" title="Why Majeedia Trust Exists" align="left" />
            <div className="prose">
              <p>Life can take unexpected turns. Sometimes people need support, sometimes they need an opportunity, and sometimes they simply need someone to stand beside them.</p>
              <p><strong>Majeedia Trust exists to be part of that support.</strong></p>
              <p>Through our initiatives, we aim to respond to people’s needs with compassion and create opportunities that can help individuals and communities move forward.</p>
              <p>We don’t believe in simply helping for a moment. We believe in creating meaningful opportunities for people to move forward.</p>
            </div>
          </div>
          <Img name="community-charity" alt="A group of smiling volunteers holding up a banner reading “Charity”" className="rounded-media" />
        </div>
      </section>

      <section className="section section-cream" aria-labelledby="areas">
        <div className="container">
          <SectionHeading id="areas" eyebrow="What We Care About" title="Our Areas of Work" />
          <FeatureGrid items={AREAS.map((a) => ({ title: a.title, text: a.short, icon: a.icon }))} />
        </div>
      </section>

      <section className="section" aria-labelledby="moments">
        <div className="container">
          <SectionHeading
            id="moments"
            eyebrow="Our Journey"
            title="A Look at the Work We Do"
            intro="These photographs offer a glimpse into the people, activities, and experiences that shape our work. We believe that real stories are best shared through real moments."
          />
          <ul className="photo-strip">
            {TRUST_PHOTOS.map((p) => (
              <li key={p.name}>
                <Img name={p.name} alt={p.alt} sizes="(min-width: 960px) 33vw, 100vw" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
