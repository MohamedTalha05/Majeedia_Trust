import PageHero from '../components/ui/PageHero.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import CauseRow from '../components/ui/CauseRow.jsx';
import CtaBand from '../components/ui/CtaBand.jsx';
import { ButtonLink } from '../components/ui/Button.jsx';

// Shared layout for /general-donation/ and /sponsorship/.
export default function CauseGroupPage({ eyebrow, title, lead, causes, listHeading, ctaHeading, ctaText }) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        image="banner-donations"
        imageAlt="A volunteer handing a parcel to an elderly couple outside their home"
      />
      <section className="section" aria-labelledby="causes">
        <div className="container">
          <SectionHeading id="causes" title={listHeading} />
          <div className="cause-list">
            {causes.map((cause, i) => (
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
      <CtaBand eyebrow="Be a Part of Change" heading={ctaHeading} text={ctaText} />
    </>
  );
}
