// Renders plain text, turning email addresses and https:// URLs into links
// and line breaks (\n) into <br>.
const TOKEN = /([\w.+-]+@[\w-]+\.[\w.]+|https?:\/\/[^\s,]+)/g;

export default function RichText({ text }) {
  const lines = text.split('\n');
  return lines.map((line, i) => (
    <span key={i}>
      {line.split(TOKEN).map((part, j) => {
        if (!part) return null;
        if (part.includes('@') && !part.startsWith('http')) {
          const clean = part.replace(/\.$/, '');
          return (
            <span key={j}>
              <a href={`mailto:${clean}`}>{clean}</a>
              {part.endsWith('.') ? '.' : ''}
            </span>
          );
        }
        if (part.startsWith('http')) {
          const clean = part.replace(/\.$/, '');
          // Links to this site stay on the current domain (staging or live)
          const href = clean.replace(/^https:\/\/majeedia\.org\/?$/, '/');
          return <a key={j} href={href}>{clean.replace(/^https?:\/\//, '')}</a>;
        }
        return part;
      })}
      {i < lines.length - 1 && <br />}
    </span>
  ));
}
