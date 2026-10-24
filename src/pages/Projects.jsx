import { Seo } from '../components/Seo.jsx';
import PageHero from '../components/ui/PageHero.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import CauseRow from '../components/ui/CauseRow.jsx';
import CtaBand from '../components/ui/CtaBand.jsx';
import { ButtonLink } from '../components/ui/Button.jsx';
import { CAUSES } from '../data/causes.js';

export default function Projects() {
  return (
    <>
      <Seo
        path="/your-donations/"
        title="Our Projects"
        description="Our projects turn commitment into practical action: education, maintenance, individual sponsorship, medical needs and girls’ Hifz sponsorship."
      />
      <PageHero
        eyebrow="Our Projects"
        title="Projects That Create Meaningful Change"
        lead="Our projects turn our commitment into practical action. We support initiatives that respond to real needs, create opportunities, and help people and communities move forward."
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

      <section className="section section-cream" aria-labelledby="projects">
        <div className="container">
          <SectionHeading
            id="projects"
            title="Projects You Can Support"
            intro="We focus on practical support that helps people, families, and communities move forward."
          />
          <div className="cause-list">
            {CAUSES.map((cause, i) => (
              <CauseRow
                key={cause.id}
                title={cause.cardTitle || cause.title}
                paragraphs={cause.summary}
                image={cause.image}
                imageAlt={cause.imageAlt}
                reverse={i % 2 === 1}
              >
                <ButtonLink to={cause.infoPath} variant="secondary" context={`about ${cause.cardTitle || cause.title}`}>
                  Learn More
                </ButtonLink>
                <ButtonLink to={cause.donatePath} context={`to ${cause.title}`}>Donate Now</ButtonLink>
              </CauseRow>
            ))}
          </div>
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
