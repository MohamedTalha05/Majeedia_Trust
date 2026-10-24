import { HandHeart, Handshake, Users } from 'lucide-react';
import { Seo } from '../components/Seo.jsx';
import PageHero from '../components/ui/PageHero.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import FeatureGrid from '../components/ui/FeatureGrid.jsx';
import CtaBand from '../components/ui/CtaBand.jsx';
import VolunteerForm from '../components/forms/VolunteerForm.jsx';

const WAYS = [
  { title: 'Support Our Work', icon: HandHeart, text: 'Your contribution can help us continue supporting people and communities through our initiatives.' },
  { title: 'Volunteer', icon: Users, text: 'Give your time, knowledge, or skills to support meaningful activities.' },
  { title: 'Partner With Us', icon: Handshake, text: 'If you represent an organization, business, institution, or community group, we welcome opportunities to work together.' },
];

export default function GetInvolved() {
  return (
    <>
      <Seo
        path="/get-involved/"
        title="Get Involved – Volunteer or Partner With Us"
        description="Volunteer with Majeedia Trust, partner with us, or support our work. Send us your volunteer application and we will be in touch."
      />
      <PageHero
        eyebrow="Get Involved"
        title="Be Part of Something Meaningful"
        lead="Whether you have a question, want to learn more about our work, or would like to get involved, we are here to listen."
        image="banner-get-involved"
        imageAlt="Volunteers gardening together in a community green space"
      />

      <section className="section" aria-labelledby="ways">
        <div className="container">
          <SectionHeading id="ways" title="Ways to Help" />
          <FeatureGrid items={WAYS} />
        </div>
      </section>

      <section className="section section-cream" aria-labelledby="apply">
        <div className="container narrow">
          <div className="card form-card">
            <SectionHeading
              id="apply"
              eyebrow="Volunteer Application"
              title="Send Us a Message"
              align="left"
              intro="Have a question or want to learn more about Majeedia Trust? Send us a message and let us know how we can connect with you."
            />
            <VolunteerForm />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
