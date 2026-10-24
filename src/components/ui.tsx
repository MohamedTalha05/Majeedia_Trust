// Small, reusable presentational building blocks.
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../lib/app-context';
import { Breadcrumbs } from './Breadcrumbs';
import { GeometricPattern } from './Geometric';

type Variant = 'primary' | 'secondary' | 'light' | 'text';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-ink text-ivory hover:bg-deep-2 px-6 py-3 rounded-full shadow-card',
  secondary: 'border border-ink/20 text-ink hover:border-ink/50 hover:bg-white px-6 py-3 rounded-full',
  light: 'border border-ivory/30 text-ivory hover:bg-ivory/10 px-6 py-3 rounded-full',
  text: 'text-brass-deep hover:text-ink underline-offset-4 hover:underline',
};

export function CtaLink({ to, children, variant = 'primary', className = '' }: { to: string; children: ReactNode; variant?: Variant; className?: string }) {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center justify-center gap-2 text-[0.95rem] font-semibold transition-colors duration-200 ${VARIANTS[variant]} ${className}`}
    >
      {children}
      <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  );
}

/** Shows CMS text, or the "[To be added]" placeholder when it is empty. */
export function Value({ children }: { children: string | undefined }) {
  const { t } = useApp();
  return children ? <>{children}</> : <span className="placeholder">{t.common.toBeAdded}</span>;
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = 'left',
  id,
  as: Tag = 'h2',
}: {
  eyebrow?: string;
  title: string;
  text?: ReactNode;
  align?: 'left' | 'center';
  id?: string;
  as?: 'h1' | 'h2';
}) {
  const center = align === 'center';
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className={`eyebrow ${center ? 'justify-center' : ''}`}>{eyebrow}</p>}
      <Tag id={id} className="mt-4 text-3xl font-medium sm:text-4xl lg:text-[2.75rem]">
        {title}
      </Tag>
      {text && <div className="mt-5 text-lg text-ink-soft">{text}</div>}
    </div>
  );
}

/** Standard inner-page header with breadcrumbs, H1 and lead paragraph. */
export function PageHeader({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead?: string; children?: ReactNode }) {
  return (
    <header className="relative overflow-hidden border-b border-line bg-sand">
      <GeometricPattern className="text-brass/25 absolute inset-y-0 right-0 hidden w-1/2 md:block [mask-image:linear-gradient(to_left,black,transparent)]" />
      <div className="container-site relative pt-8 pb-16 sm:pb-20">
        <Breadcrumbs />
        <div className="fade-up mt-10 max-w-3xl sm:mt-14">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 text-[2.1rem] font-medium sm:text-5xl lg:text-6xl">{title}</h1>
          {lead && <p className="mt-6 text-lg leading-relaxed sm:text-xl">{lead}</p>}
          {children}
        </div>
      </div>
    </header>
  );
}

export function EmptyState({ title, text, icon }: { title: string; text: string; icon?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-brass/50 bg-white/60 px-6 py-12 text-center sm:px-12">
      {icon && <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-sand text-brass-deep">{icon}</div>}
      <h3 className="text-xl font-medium">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-muted">{text}</p>
    </div>
  );
}

/** Responsive image. Built-in photos ("/images/name") get WebP srcsets; uploads are used as-is. */
export function Img({
  src,
  alt,
  className = '',
  sizes = '(min-width: 1024px) 33vw, 100vw',
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const builtIn = /^\/images\/[\w-]+$/.test(src);
  return (
    <img
      src={builtIn ? `${src}-1280.webp` : src}
      srcSet={builtIn ? `${src}-640.webp 640w, ${src}-1280.webp 1280w` : undefined}
      sizes={builtIn ? sizes : undefined}
      alt={alt}
      width={1200}
      height={896}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      // Local photos are converted to black & white when processed; external images get the same look via CSS.
      className={`object-cover ${builtIn || src.startsWith('/uploads/') ? '' : 'grayscale'} ${className}`}
    />
  );
}
