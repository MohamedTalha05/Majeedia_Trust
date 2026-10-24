import { Link } from 'react-router-dom';
import Img from '../Img.jsx';
import { DonateLink } from './Button.jsx';
import { donateUrlFor } from '../../data/causes.js';

export default function DonateCard({ cause, level = 3 }) {
  const H = `h${level}`;
  const title = cause.cardTitle || cause.title;
  return (
    <article className="donate-card">
      <Img name={cause.image} alt={cause.imageAlt} sizes="(min-width: 960px) 33vw, (min-width: 640px) 50vw, 100vw" />
      <div className="donate-card-body">
        <H>{title}</H>
        <p>{cause.summary[0]}</p>
        <div className="btn-row">
          <DonateLink href={donateUrlFor(cause)} label={cause.title} />
          <Link to={cause.infoPath} className="text-link">
            Learn more<span className="visually-hidden"> about {title}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
