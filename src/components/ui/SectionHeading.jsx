// Small uppercase eyebrow, heading and optional intro text.
export default function SectionHeading({ eyebrow, title, intro, level = 2, align = 'center', id }) {
  const H = `h${level}`;
  return (
    <div className={`section-heading align-${align}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <H id={id}>{title}</H>
      {intro && (Array.isArray(intro) ? intro : [intro]).map((p) => <p key={p} className="lead">{p}</p>)}
    </div>
  );
}
