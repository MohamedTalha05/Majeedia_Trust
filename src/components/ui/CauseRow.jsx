import Img from '../Img.jsx';

// Alternating image + text row used for causes and areas of work.
export default function CauseRow({ number, title, paragraphs, image, imageAlt, reverse = false, level = 3, children }) {
  const H = `h${level}`;
  return (
    <article className={`cause-row${reverse ? ' reverse' : ''}`}>
      <div className="cause-row-media">
        <Img name={image} alt={imageAlt} sizes="(min-width: 960px) 45vw, 100vw" />
      </div>
      <div className="cause-row-body">
        {number && <p className="cause-number" aria-hidden="true">{number}</p>}
        <H>{title}</H>
        {paragraphs.map((p) => <p key={p}>{p}</p>)}
        {children && <div className="btn-row">{children}</div>}
      </div>
    </article>
  );
}
