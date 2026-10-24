import manifest from '../data/images.json';

// Responsive WebP image from public/images (see scripts/optimize-images.mjs).
// Width/height come from the manifest so the browser reserves space (no layout shift).
export function imageSources(name) {
  const m = manifest[name];
  if (!m) throw new Error(`Unknown image "${name}" – add it to scripts/optimize-images.mjs`);
  const srcSet = m.widths.map((w) => `/images/${name}-${w}.webp ${w}w`).join(', ');
  const src = `/images/${name}-${m.widths[Math.min(1, m.widths.length - 1)]}.webp`;
  return { ...m, src, srcSet };
}

export default function Img({ name, alt, sizes = '(min-width: 960px) 50vw, 100vw', priority = false, className }) {
  const { src, srcSet, width, height } = imageSources(name);
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding={priority ? 'sync' : 'async'}
    />
  );
}
