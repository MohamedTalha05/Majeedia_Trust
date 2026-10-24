import manifest from '../../data/images.json';

export default function Logo({ priority = false, className = 'logo' }) {
  const { width, height } = manifest.logo;
  return (
    <picture>
      <source srcSet="/images/logo.webp" type="image/webp" />
      <img
        src="/images/logo.png"
        width={width}
        height={height}
        alt="Majeedia Trust"
        className={className}
        loading={priority ? 'eager' : 'lazy'}
      />
    </picture>
  );
}
