import { Seo } from '../components/Seo.jsx';
import CauseGroupPage from './CauseGroupPage.jsx';
import { SPONSORSHIP_CAUSES } from '../data/causes.js';

export default function Sponsorship() {
  return (
    <>
      <Seo
        path="/sponsorship/"
        title="Sponsorship – 2026"
        description="Help individuals facing hardship, support essential medical needs, and encourage girls to continue their Hifz education through Majeedia Trust sponsorship."
      />
      <CauseGroupPage
        eyebrow="Sponsorship – 2026"
        title="Your Support Can Change Someone’s Journey"
        lead="Help individuals facing hardship, support essential medical needs, and encourage girls to continue their Hifz education."
        causes={SPONSORSHIP_CAUSES}
        listHeading="Explore Our Sponsorship Causes"
        ctaHeading="Your Support Can Bring Hope and Care"
        ctaText="Your support can help individuals facing financial hardship, contribute towards essential medical needs, and encourage girls to continue their Hifz education. Choose a sponsorship cause and make a meaningful contribution."
      />
    </>
  );
}
