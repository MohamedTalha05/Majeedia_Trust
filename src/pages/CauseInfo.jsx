import { Seo } from '../components/Seo.jsx';
import Img from '../components/Img.jsx';
import PageHero from '../components/ui/PageHero.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import FeatureGrid from '../components/ui/FeatureGrid.jsx';
import CtaBand from '../components/ui/CtaBand.jsx';
import { DonateLink } from '../components/ui/Button.jsx';
import { donateUrlFor } from '../data/causes.js';

// Template for the five cause pages ("Learn More").
export default function CauseInfo({ cause }) {
  const { info } = cause;
  const donateUrl = donateUrlFor(cause);
  const title = cause.cardTitle || cause.title;

  return (
    <>
      <Seo path={cause.infoPath} title={info.seoTitle} description={info.description} />
      <PageHero eyebrow="Our Projects" title={info.h1} />

      <section className="section" aria-labelledby="intro">
        <div className="container split">
          <Img name={cause.image} alt={cause.imageAlt} className="rounded-media" priority />
          <div>
            <h2 id="intro">{title}</h2>
            <div className="prose">
              {cause.summary.map((p) => <p key={p}>{p}</p>)}
            </div>
            <div className="btn-row">
              <DonateLink href={donateUrl} label={cause.title} />
            </div>
          </div>
        </div>
      </section>

      <section className="section section-cream" aria-labelledby="focus">
        <div className="container">
          <SectionHeading id="focus" title={info.focus.heading} />
          {info.focus.image ? (
            <div className="split align-start">
              <Img name={info.focus.image} alt={info.focus.imageAlt} className="rounded-media" />
              <FeatureGrid items={info.focus.items} columns={2} />
            </div>
          ) : (
            <FeatureGrid items={info.focus.items} />
          )}
        </div>
      </section>

      {info.help && (
        <section className="section" aria-labelledby="help">
          <div className="container split align-start">
            <div>
              <SectionHeading id="help" title={info.help.heading} intro={info.help.intro} align="left" />
              <dl className="help-list">
                {info.help.items.map((item) => (
                  <div key={item.title}>
                    <dt>{item.title}</dt>
                    <dd>{item.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="image-pair">
              {info.help.images.map((img) => (
                <Img key={img.name} name={img.name} alt={img.alt} sizes="(min-width: 960px) 22vw, 50vw" />
              ))}
            </div>
          </div>
        </section>
      )}

      {info.stories.map((story, i) => (
        <section key={story.heading} className={`section${info.help || i % 2 === 1 ? ' section-cream' : ''}`} aria-labelledby={`story-${i}`}>
          <div className={`container ${story.images ? 'split align-start' : 'narrow'}`}>
            <div>
              <h2 id={`story-${i}`}>{story.heading}</h2>
              <div className="prose">
                {story.paragraphs.map((p) => <p key={p}>{p}</p>)}
              </div>
            </div>
            {story.images && (
              <div className="image-pair">
                {story.images.map((img) => (
                  <Img key={img.name} name={img.name} alt={img.alt} sizes="(min-width: 960px) 22vw, 50vw" />
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      {info.cta ? (
        <CtaBand eyebrow={info.cta.eyebrow} heading={info.cta.heading} text={info.cta.text}>
          <DonateLink href={donateUrl} variant="light" label={cause.title} />
        </CtaBand>
      ) : (
        <CtaBand />
      )}
    </>
  );
}
