import { Seo } from '../components/Seo.jsx';
import PageHero from '../components/ui/PageHero.jsx';
import RichText from '../components/ui/RichText.jsx';
import { IMPRINT, PRIVACY, TERMS } from '../data/legal.js';

function LegalPage({ path, title, h1, description, doc }) {
  return (
    <>
      <Seo path={path} title={title} description={description} />
      <PageHero eyebrow="Information" title={h1} lead={doc.lastUpdated ? `Last updated: ${doc.lastUpdated}` : undefined} />
      <section className="section">
        <div className="container narrow legal">
          {doc.sections.map((s) => (
            <section key={s.heading} aria-label={s.heading}>
              <h2>{s.heading}</h2>
              {s.content.map((item, i) => {
                if (typeof item === 'string') return <p key={i}><RichText text={item} /></p>;
                if (item.subheading) return <h3 key={i}>{item.subheading}</h3>;
                return (
                  <ul key={i}>
                    {item.list.map((li) => <li key={li}>{li}</li>)}
                  </ul>
                );
              })}
            </section>
          ))}
        </div>
      </section>
    </>
  );
}

export function Imprint() {
  return (
    <LegalPage
      path="/imprint/"
      title="Imprint"
      h1="Imprint"
      description="Imprint of Majeedia Trust: organisation information, contact details and legal disclaimers."
      doc={IMPRINT}
    />
  );
}

export function Terms() {
  return (
    <LegalPage
      path="/term-conditions/"
      title="Terms & Conditions"
      h1="Terms & Conditions"
      description="Terms & Conditions for using the Majeedia Trust website and making donations through our online donation facilities."
      doc={TERMS}
    />
  );
}

export function Privacy() {
  return (
    <LegalPage
      path="/privacy-policy/"
      title="Privacy Policy"
      h1="Privacy Policy"
      description="How Majeedia Trust collects, uses, stores and protects personal information when you visit our website, contact us or donate."
      doc={PRIVACY}
    />
  );
}
