import { Seo } from '../components/Seo.jsx';
import PageHero from '../components/ui/PageHero.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import CauseRow from '../components/ui/CauseRow.jsx';
import CtaBand from '../components/ui/CtaBand.jsx';
import { ButtonLink, DonateLink } from '../components/ui/Button.jsx';
import { AREAS } from '../data/areas.js';
import { DONATION_URLS } from '../data/donations.js';

export default function OurWork() {
  return (
    <>
      <Seo
        path="/our-work/"
        title="Our Work"
        description="Education, food and basic support, orphan care, healthcare, emergency relief and community development – the areas where Majeedia Trust turns care into action."
      />
      <PageHero
        eyebrow="Our Work"
        title="Our Areas of Work"
        lead="We focus on practical support that helps people, families, and communities move forward."
        sideImage="volunteers-team"
        sideImageAlt="A group of volunteers joining hands at a community event"
      />

      <section className="section" aria-labelledby="in-action">
        <div className="container narrow">
          <SectionHeading id="in-action" eyebrow="Our Work in Action" title="Turning Care Into Action" />
          <div className="prose center">
            <p>Every community has different needs, and every person has a different story. Our projects are shaped around those needs, with a focus on practical support, opportunity, and long-term wellbeing.</p>
            <p>From education and basic support to healthcare, child care, emergency relief, and community development, we work to create meaningful opportunities where support can make a difference.</p>
          </div>
        </div>
      </section>

      <section className="section pt-0" aria-label="Areas of work">
        <div className="container cause-list">
          {AREAS.map((area, i) => (
            <CauseRow
              key={area.id}
              level={2}
              title={area.longTitle || area.title}
              paragraphs={area.long}
              image={area.image}
              imageAlt={area.imageAlt}
              reverse={i % 2 === 1}
            >
              {area.link && (
                <ButtonLink to={area.link} variant="secondary" context={`about ${area.title}`}>
                  Learn More
                </ButtonLink>
              )}
              <DonateLink href={DONATION_URLS.multi} label={area.title} />
            </CauseRow>
          ))}
        </div>
      </section>

      <CtaBand
        eyebrow="Stay Connected"
        heading="Be Part of the Journey"
        text="Positive change becomes stronger when people come together. You can support our work, volunteer your time, share your skills, partner with us, or simply help spread awareness."
      />
    </>
  );
}
