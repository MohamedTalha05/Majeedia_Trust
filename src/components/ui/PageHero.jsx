import Img from '../Img.jsx';

// Page header.
// - `image`: wide banner photo on the right that fades into the cream
//   background, where the text sits (as on the original site).
// - `sideImage`: an ordinary photo shown beside the text.
export default function PageHero({ eyebrow, title, lead, image, imageAlt = '', sideImage, sideImageAlt = '', children }) {
  const variant = image ? ' has-image' : sideImage ? ' has-side-image' : '';
  return (
    <section className={`page-hero${variant}`}>
      {image && (
        <div className="page-hero-media">
          <Img name={image} alt={imageAlt} sizes="100vw" priority />
        </div>
      )}
      <div className="container page-hero-inner">
        <div className="page-hero-content">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1>{title}</h1>
          {lead && (Array.isArray(lead) ? lead : [lead]).map((p) => <p key={p} className="lead">{p}</p>)}
          {children}
        </div>
        {sideImage && (
          <div className="page-hero-side">
            <Img name={sideImage} alt={sideImageAlt} sizes="(min-width: 960px) 45vw, 100vw" priority />
          </div>
        )}
      </div>
    </section>
  );
}
