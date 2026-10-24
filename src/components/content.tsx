// CMS-driven content components.
import {
  Accessibility,
  BookMarked,
  BookOpen,
  Calendar,
  ChevronDown,
  GraduationCap,
  HeartHandshake,
  Landmark,
  MapPin,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { href } from '../../shared/routes';
import type { Category, Faq, Project, Stat, Update } from '../../shared/types';
import { formatDate, paragraphs, tx, useApp } from '../lib/app-context';
import { Img } from './ui';

const ICONS: Record<string, LucideIcon> = {
  'heart-handshake': HeartHandshake,
  'book-open': BookOpen,
  'book-marked': BookMarked,
  'graduation-cap': GraduationCap,
  accessibility: Accessibility,
  users: Users,
  landmark: Landmark,
  sparkles: Sparkles,
};

export function CategoryIcon({ name, className = 'size-5' }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? Sparkles;
  return <Icon aria-hidden className={className} />;
}

export function CategoryCard({ category }: { category: Category }) {
  const { lang, t } = useApp();
  return (
    <article className="reveal group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-shadow duration-300 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        {category.image && (
          <Img
            src={category.image}
            alt={tx(category.imageAlt, lang)}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full transition-transform duration-700 group-hover:scale-[1.04]"
          />
        )}
        <span className="absolute top-4 left-4 flex size-10 items-center justify-center rounded-full bg-ivory/95 text-brass-deep shadow-card">
          <CategoryIcon name={category.icon} />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-medium">{tx(category.title, lang)}</h3>
        <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">{tx(category.summary, lang)}</p>
        <Link
          to={href(lang, 'supportDetail', category.slug[lang])}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brass-deep after:absolute after:inset-0 group-hover:text-ink"
        >
          {t.common.exploreArea}
          <span aria-hidden>→</span>
          <span className="sr-only">: {tx(category.title, lang)}</span>
        </Link>
      </div>
    </article>
  );
}

export function StatTile({ stat, tone = 'light' }: { stat: Stat; tone?: 'light' | 'dark' }) {
  const { lang, t } = useApp();
  const dark = tone === 'dark';
  const shown = stat.verified && stat.value;
  return (
    <div className={`reveal rounded-2xl border p-4 sm:p-6 ${dark ? 'border-ivory/15 bg-ivory/[0.04]' : 'border-line bg-white shadow-card'}`}>
      <dt className={`text-sm font-medium ${dark ? 'text-ivory/70' : 'text-muted'}`}>{tx(stat.label, lang)}</dt>
      <dd className="mt-3">
        {shown ? (
          <span className={`font-serif text-2xl sm:text-4xl ${dark ? 'text-ivory' : 'text-ink'}`}>{stat.value}</span>
        ) : (
          <span className={`inline-block rounded px-2 py-1 text-sm font-medium ${dark ? 'bg-ivory/10 text-ivory/70' : 'bg-sand text-muted'}`}>
            {t.common.toBeAdded}
          </span>
        )}
        {shown && tx(stat.note, lang) && (
          <span className={`mt-2 block text-sm ${dark ? 'text-ivory/60' : 'text-muted'}`}>{tx(stat.note, lang)}</span>
        )}
      </dd>
    </div>
  );
}

export function StatGrid({ stats, tone = 'light' }: { stats: Stat[]; tone?: 'light' | 'dark' }) {
  return (
    <dl className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
      {stats.map((s) => (
        <StatTile key={s.id} stat={s} tone={tone} />
      ))}
    </dl>
  );
}

export function FaqList({ faqs }: { faqs: Faq[] }) {
  const { lang } = useApp();
  return (
    <div className="divide-y divide-line border-y border-line">
      {faqs.map((f) => (
        <details key={f.id} className="group py-1" id={`faq-${f.id}`}>
          <summary className="flex cursor-pointer items-start justify-between gap-6 py-5 text-left">
            <h3 className="font-serif text-lg font-medium sm:text-xl">{tx(f.question, lang)}</h3>
            <ChevronDown aria-hidden className="mt-1 size-5 shrink-0 text-brass-deep transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <div className="prose-site max-w-3xl pb-6 text-ink-soft">
            {paragraphs(tx(f.answer, lang)).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const { lang, t } = useApp();
  const p = t.projects;
  const statusTone =
    project.status === 'completed' ? 'bg-sage/15 text-sage' : project.status === 'ongoing' ? 'bg-brass/15 text-brass-deep' : 'bg-sand text-muted';
  const sections = [
    { label: p.supportProvided, text: tx(project.support, lang) },
    { label: p.outcome, text: tx(project.outcome, lang) },
  ].filter((s) => s.text);
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card">
      {project.photos[0] && (
        <div className="aspect-[16/9] overflow-hidden bg-sand">
          <Img src={project.photos[0]} alt={tx(project.photoAlt, lang)} className="h-full w-full" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="rounded-full bg-ink px-3 py-1 text-ivory">{p.categories[project.category]}</span>
          <span className={`rounded-full px-3 py-1 ${statusTone}`}>{p.statuses[project.status]}</span>
        </div>
        <h3 className="mt-4 text-xl font-medium">{tx(project.name, lang)}</h3>
        <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
          {project.location && (
            <div className="flex items-center gap-1.5">
              <dt>
                <MapPin aria-hidden className="size-4" />
                <span className="sr-only">{p.location}</span>
              </dt>
              <dd>{project.location}</dd>
            </div>
          )}
          {project.year && (
            <div className="flex items-center gap-1.5">
              <dt>
                <Calendar aria-hidden className="size-4" />
                <span className="sr-only">{p.year}</span>
              </dt>
              <dd>{project.year}</dd>
            </div>
          )}
        </dl>
        {tx(project.description, lang) && <p className="mt-4 text-[0.95rem] leading-relaxed">{tx(project.description, lang)}</p>}
        {sections.length > 0 && (
          <dl className="mt-5 space-y-4 border-t border-line pt-5 text-[0.95rem]">
            {sections.map((s) => (
              <div key={s.label}>
                <dt className="text-xs font-semibold tracking-wider text-brass-deep uppercase">{s.label}</dt>
                <dd className="mt-1">{s.text}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </article>
  );
}

export function UpdateCard({ update }: { update: Update }) {
  const { lang, t } = useApp();
  return (
    <article className="reveal group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-shadow hover:shadow-lift">
      {update.image && (
        <div className="aspect-[16/10] overflow-hidden bg-sand">
          <Img src={update.image} alt={tx(update.imageAlt, lang)} className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold tracking-wider text-brass-deep uppercase">
          {t.updates.types[update.type]}
          {update.date && (
            <>
              {' · '}
              <time dateTime={update.date}>{formatDate(update.date, lang)}</time>
            </>
          )}
        </p>
        <h3 className="mt-3 text-xl font-medium">
          <Link to={href(lang, 'updateDetail', update.slug[lang])} className="after:absolute after:inset-0">
            {tx(update.title, lang)}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-[0.95rem] text-muted">{tx(update.excerpt, lang)}</p>
        <span aria-hidden className="mt-5 text-sm font-semibold text-brass-deep group-hover:text-ink">
          {t.common.readMore} →
        </span>
      </div>
    </article>
  );
}
