import { Seo } from '../components/Seo.jsx';
import CauseGroupPage from './CauseGroupPage.jsx';
import { GENERAL_CAUSES } from '../data/causes.js';

export default function GeneralDonation() {
  return (
    <>
      <Seo
        path="/general-donation/"
        title="General Donations"
        description="Support education and help maintain the resources our community depends on. Choose a cause to support with Majeedia Trust."
      />
      <CauseGroupPage
        eyebrow="General Donations"
        title="Every Contribution Helps Make a Difference"
        lead="Support education and help maintain the resources our community depends on."
        causes={GENERAL_CAUSES}
        listHeading="Choose a Cause to Support"
        ctaHeading="Your Support Can Make a Difference"
        ctaText="Your contribution can help support education and maintain essential facilities and resources. Choose a cause that matters to you and help Majeedia Trust continue supporting the community."
      />
    </>
  );
}
