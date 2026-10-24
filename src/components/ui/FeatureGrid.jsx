import { CircleCheck } from 'lucide-react';

// Grid of small cards: [{ title, text, icon? }]
export default function FeatureGrid({ items, level = 3, columns = 3 }) {
  const H = `h${level}`;
  return (
    <ul className={`feature-grid cols-${columns}`}>
      {items.map(({ title, text, icon: Icon = CircleCheck }) => (
        <li key={title} className="feature-card">
          <span className="feature-icon" aria-hidden="true">
            <Icon size={22} />
          </span>
          <H>{title}</H>
          <p>{text}</p>
        </li>
      ))}
    </ul>
  );
}
