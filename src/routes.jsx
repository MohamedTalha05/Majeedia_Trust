// Every page of the site. The build pre-renders each path and lists it in
// sitemap.xml, so a new page only needs to be added here.
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import OurWork from './pages/OurWork.jsx';
import Projects from './pages/Projects.jsx';
import Donate from './pages/Donate.jsx';
import GeneralDonation from './pages/GeneralDonation.jsx';
import Sponsorship from './pages/Sponsorship.jsx';
import CauseInfo from './pages/CauseInfo.jsx';
import CauseDonate from './pages/CauseDonate.jsx';
import Contact from './pages/Contact.jsx';
import GetInvolved from './pages/GetInvolved.jsx';
import { Imprint, Terms, Privacy } from './pages/Legal.jsx';
import { CAUSES } from './data/causes.js';

export const ROUTES = [
  { path: '/', element: <Home />, priority: '1.0' },
  { path: '/about/', element: <About />, priority: '0.8' },
  { path: '/our-work/', element: <OurWork />, priority: '0.8' },
  { path: '/your-donations/', element: <Projects />, priority: '0.8' },
  { path: '/donate/', element: <Donate />, priority: '0.9' },
  { path: '/general-donation/', element: <GeneralDonation />, priority: '0.8' },
  { path: '/sponsorship/', element: <Sponsorship />, priority: '0.8' },
  ...CAUSES.flatMap((cause) => [
    { path: cause.infoPath, element: <CauseInfo cause={cause} />, priority: '0.7' },
    { path: cause.donatePath, element: <CauseDonate cause={cause} />, priority: '0.7' },
  ]),
  { path: '/get-involved/', element: <GetInvolved />, priority: '0.6' },
  { path: '/contact/', element: <Contact />, priority: '0.7' },
  { path: '/imprint/', element: <Imprint />, priority: '0.3' },
  { path: '/term-conditions/', element: <Terms />, priority: '0.3' },
  { path: '/privacy-policy/', element: <Privacy />, priority: '0.3' },
];
