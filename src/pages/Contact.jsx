import { Mail, MapPin, Phone } from 'lucide-react';
import { Seo } from '../components/Seo.jsx';
import PageHero from '../components/ui/PageHero.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import ContactForm from '../components/forms/ContactForm.jsx';
import { SITE } from '../data/site.js';

export default function Contact() {
  return (
    <>
      <Seo
        path="/contact/"
        title="Contact Us"
        description="Contact Majeedia Trust in T. Nagar, Chennai. Call +91 9444135055 or 044 – 24348300, email support@majeedia.org, or send us a message."
      />
      <PageHero
        eyebrow="Get in Touch"
        title="Contact"
        lead="Whether you have a question, want to learn more about our work, or would like to get involved, we are here to listen. Feel free to reach out to us, and our team will get back to you."
        image="banner-contact"
        imageAlt="A volunteer handing out food supplies to a group of women and children"
      />

      <section className="section" aria-labelledby="details">
        <div className="container contact-grid">
          <div>
            <SectionHeading id="details" eyebrow="We’d Love to Hear From You" title="Contact Details" align="left" />
            <ul className="contact-list">
              <li>
                <span className="contact-icon" aria-hidden="true"><MapPin size={22} /></span>
                <div>
                  <h3>Address</h3>
                  <address>{SITE.address.lines.map((l) => <span key={l} className="line">{l}</span>)}</address>
                  <a href={SITE.mapUrl} target="_blank" rel="noopener noreferrer" className="text-link">
                    View on Google Maps<span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </div>
              </li>
              <li>
                <span className="contact-icon" aria-hidden="true"><Phone size={22} /></span>
                <div>
                  <h3>Phone Numbers</h3>
                  {SITE.phones.map((p) => (
                    <p key={p.href}><a href={p.href}>{p.label}</a></p>
                  ))}
                </div>
              </li>
              <li>
                <span className="contact-icon" aria-hidden="true"><Mail size={22} /></span>
                <div>
                  <h3>Email</h3>
                  <p><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
                </div>
              </li>
            </ul>
            <h3 className="follow-heading">Follow Us</h3>
            <ul className="follow-list">
              {SITE.social.map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.name}<span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="card form-card">
            <SectionHeading
              eyebrow="Contact Us"
              title="Send Us a Message"
              level={2}
              align="left"
              intro="Have a question or want to learn more about Majeedia Trust? Send us a message and let us know how we can connect with you."
            />
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
