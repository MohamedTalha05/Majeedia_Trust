import { useLocation } from 'react-router-dom';
import { Seo } from '../components/Seo.jsx';
import PageHero from '../components/ui/PageHero.jsx';
import { ButtonLink } from '../components/ui/Button.jsx';

export default function NotFound() {
  const { pathname } = useLocation();
  return (
    <>
      <Seo
        path={pathname}
        title="Page Not Found"
        description="The page you are looking for could not be found on the Majeedia Trust website."
        noindex
      />
      <PageHero
        eyebrow="Error 404"
        title="Page Not Found"
        lead="Sorry, we couldn’t find the page you were looking for. It may have moved, or the address may be incorrect."
      >
        <div className="btn-row">
          <ButtonLink to="/">Go to the Homepage</ButtonLink>
          <ButtonLink to="/donate/" variant="secondary">Ways to Donate</ButtonLink>
          <ButtonLink to="/contact/" variant="secondary">Contact Us</ButtonLink>
        </div>
      </PageHero>
    </>
  );
}
