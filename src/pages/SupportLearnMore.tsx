// "Learn More" view of a support area: an information-only project page without a donation form.
import { ArrowLeft, CircleCheck, HandHeart, ListChecks, Mail, Quote, Share2, Target, TrendingUp } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { href } from '../../shared/routes';
import type { Category } from '../../shared/types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CategoryIcon } from '../components/content';
import { Flow } from '../components/Flow';
import { GeometricPattern } from '../components/Geometric';
import { CtaLink, Img, Value } from '../components/ui';
import { paragraphs, tx, useApp } from '../lib/app-context';

export interface Programme {
  heading: string;
  intro: string;
  gallery: { src: string; alt: string }[];
}

// Objectives and activities per support area, restated from that area's own description and programme text.
export const LEARN_MORE: Record<string, { approach: string; objectives: string[]; activities: string[] }> = {
  education: {
    approach: 'Assessed individually and given discreetly',
    objectives: [
      'Help children and students continue their learning when their families cannot meet the costs alone.',
      'Support orphans and children whose families face difficult circumstances.',
      'Let young people focus on their studies with dignity.',
    ],
    activities: [
      'Education sponsorship for children and students who need assistance with their education.',
      'Assessing each request individually, so that support meets a real educational need.',
      'Giving each sponsorship discreetly.',
    ],
  },
  'widow-support': {
    approach: 'Assessed in confidence and given discreetly',
    objectives: [
      'Help individuals and families meet the cost of essential treatment when they cannot manage it alone.',
      'Let patients focus on their recovery with dignity.',
      'Protect the privacy and dignity of every patient and their family.',
    ],
    activities: [
      'Sponsorship for individuals and families facing essential medical needs.',
      'Assessing each situation with care and in confidence.',
      'Giving support discreetly.',
    ],
  },
  'girls-education': {
    approach: 'Assessed individually and given discreetly',
    objectives: [
      'Help girls continue memorising the Holy Quran when their families cannot meet the costs alone.',
      'Help each girl complete her Hifz with dignity and consistency.',
    ],
    activities: [
      'Sponsorship for girls enrolled in Hifz programmes.',
      'Assessing each sponsorship individually and considering support carefully.',
      'Giving each sponsorship discreetly.',
    ],
  },
  'other-initiatives': {
    approach: 'Each request assessed carefully',
    objectives: [
      'Keep school buildings safe, clean and fit for learning.',
      'Help children learn and teachers teach in a well-kept school.',
    ],
    activities: [
      'Sponsoring the maintenance and upkeep of schools that serve the community.',
      'Assessing each request carefully, so that support goes to the repairs and upkeep that make a real difference.',
      'Allocating responsibly and keeping accurate records.',
    ],
  },
  'disability-support': {
    approach: 'Assessed individually and supported discreetly',
    objectives: [
      'Help people with disabilities and their families meet essential needs that they cannot manage alone.',
      'Help people live with greater independence and dignity.',
      'Treat every person with dignity and respect.',
    ],
    activities: [
      'Sponsorship for people with disabilities and families dealing with disability-related needs.',
      'Assessing each request individually and supporting it discreetly.',
      'Focusing on practical support.',
    ],
  },
};

export function LearnMoreDetail({ category, programme, others }: { category: Category; programme: Programme; others: Category[] }) {
  const { lang, t, content } = useApp();
  const s = t.support;
  const l = s.learnMorePage;
  const info = LEARN_MORE[category.id];
  const detailHref = href(lang, 'supportDetail', category.slug[lang]);
  const donateHref = `${detailHref}?donate`;
  const project = content.projects.find((p) => p.supportArea === category.id);
  // The first paragraph explains the need; the rest describes how the Trust responds.
  const [why, ...doing] = paragraphs(tx(category.description, lang));

  return (
    <div data-learn-more>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-deep">
        <div aria-hidden className="absolute inset-0 -z-10">
          {category.image && <Img src={category.image} alt="" priority sizes="100vw" className="h-full w-full" />}
          <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/75 to-deep/30 lg:bg-gradient-to-r lg:from-deep/95 lg:via-deep/70 lg:to-deep/10" />
          <GeometricPattern className="absolute inset-0 h-full w-full text-ivory/[0.05]" size={64} />
        </div>
        <div className="container-site relative flex min-h-[32rem] flex-col pt-8 pb-28 sm:min-h-[36rem] lg:min-h-[40rem]">
          <div className="[&_a]:!text-ivory/75 [&_a:hover]:!text-ivory [&_ol]:!text-ivory/60 [&_span]:!text-ivory">
            <Breadcrumbs />
          </div>
          <div className="fade-up mt-auto max-w-3xl pt-16">
            <p className="eyebrow !text-brass-soft">
              <CategoryIcon name={category.icon} className="size-4" /> {s.eyebrow}
            </p>
            <h1 className="mt-5 text-[2.2rem] leading-[1.1] font-medium !text-ivory sm:text-5xl lg:text-6xl">{tx(category.title, lang)}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/85 sm:text-xl">{tx(category.summary, lang)}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CtaLink to={donateHref} className="!bg-ivory !text-ink hover:!bg-white">
                {s.donateNow}
              </CtaLink>
              <Link to={href(lang, 'support')} className="inline-flex items-center gap-2 px-2 py-3 text-[0.95rem] font-semibold text-ivory/85 hover:text-ivory">
                <ArrowLeft aria-hidden className="size-4" /> {s.backToSupport}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* At a glance */}
      <section aria-label={l.atAGlance} className="relative z-10 -mt-16">
        <dl className="container-site grid gap-4 sm:grid-cols-3">
          <GlanceTile label={l.status}>{project ? t.projects.statuses[project.status] : <Value>{''}</Value>}</GlanceTile>
          <GlanceTile label={l.programme}>{programme.heading}</GlanceTile>
          <GlanceTile label={l.approach}>{info.approach}</GlanceTile>
        </dl>
      </section>

      {/* Overview */}
      <section aria-labelledby="overview" className="py-16 sm:py-24">
        <div className="container-site grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">{s.overview}</p>
            <h2 id="overview" className="mt-4 text-3xl font-medium sm:text-4xl">
              {programme.heading}
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-lg leading-relaxed sm:text-xl">{programme.intro}</p>
            <div className="prose-site mt-6 text-lg text-ink-soft">
              {doing.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      {why && (
        <section aria-labelledby="why" className="relative overflow-hidden bg-deep py-16 text-ivory/80 sm:py-24">
          <GeometricPattern className="absolute inset-0 h-full w-full text-ivory/[0.04]" size={72} />
          <div className="container-site relative max-w-4xl text-center">
            <Quote aria-hidden className="mx-auto size-10 text-brass" />
            <p className="eyebrow mt-6 justify-center !text-brass-soft">{s.whyItMatters}</p>
            <h2 id="why" className="sr-only">
              {s.whyItMatters}
            </h2>
            <p className="mt-6 font-serif text-2xl leading-snug text-ivory sm:text-3xl lg:text-[2.1rem]">{why}</p>
          </div>
        </section>
      )}

      {/* Objectives & activities */}
      <section aria-labelledby="what-we-do" className="py-16 sm:py-24">
        <div className="container-site">
          <p className="eyebrow">{tx(category.title, lang)}</p>
          <h2 id="what-we-do" className="mt-4 max-w-3xl text-3xl font-medium sm:text-4xl">
            {s.whatWeAreDoing}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <ListCard icon={<Target className="size-5" aria-hidden />} title={l.objectives} items={info.objectives} />
            <ListCard icon={<ListChecks className="size-5" aria-hidden />} title={l.activities} items={info.activities} />
          </div>
        </div>
      </section>

      {/* Gallery */}
      {programme.gallery.length > 0 && (
        <section aria-labelledby="gallery" className="border-t border-line bg-white py-16 sm:py-24">
          <div className="container-site">
            <h2 id="gallery" className="text-3xl font-medium sm:text-4xl">
              {l.gallery}
            </h2>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:grid-rows-2">
              {programme.gallery.map((image, i) => (
                <figure
                  key={image.src}
                  className={`group relative overflow-hidden rounded-2xl bg-sand shadow-card ${i === 0 ? 'col-span-2 lg:row-span-2' : ''}`}
                >
                  <Img
                    src={image.src}
                    alt={image.alt}
                    sizes={i === 0 ? '(min-width: 1024px) 66vw, 100vw' : '(min-width: 1024px) 33vw, 50vw'}
                    className={`h-full w-full transition-transform duration-700 group-hover:scale-[1.04] ${i === 0 ? 'aspect-[16/10]' : 'aspect-square lg:aspect-auto'}`}
                  />
                  <span aria-hidden className="absolute inset-x-0 bottom-0 hidden h-14 bg-gradient-to-t from-deep/85 to-transparent sm:block" />
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Impact & approach */}
      <section aria-labelledby="impact" className="border-t border-line bg-sand py-16 sm:py-24">
        <div className="container-site grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
            <span className="flex size-11 items-center justify-center rounded-full bg-sand text-brass-deep">
              <TrendingUp aria-hidden className="size-5" />
            </span>
            <h2 id="impact" className="mt-5 text-2xl font-medium">
              {s.impact}
            </h2>
            <div className="mt-3 text-[0.95rem]">{tx(category.impact, lang) ? tx(category.impact, lang) : <p className="text-muted">{l.impactText}</p>}</div>
            <p className="mt-6 text-sm text-muted">{t.common.verifiedOnly}</p>
          </div>
          <div className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8 lg:col-span-2">
            <h2 className="text-2xl font-medium">{l.howWeWork}</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {t.about.approachPoints.map((point) => (
                <li key={point} className="flex gap-3">
                  <CircleCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-brass-deep" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <h2 className="mt-6 mb-6 text-2xl font-medium">{l.process}</h2>
            <Flow steps={t.fundFlow} label={l.process} />
          </div>
        </div>
      </section>

      {/* Ways to help */}
      <section aria-labelledby="help" className="py-16 sm:py-24">
        <div className="container-site">
          <p className="eyebrow">{s.howToHelp}</p>
          <h2 id="help" className="mt-4 text-3xl font-medium sm:text-4xl">
            {l.waysTitle}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="flex flex-col rounded-2xl bg-ink p-6 text-ivory/80 shadow-lift sm:p-8">
              <HandHeart aria-hidden className="size-7 text-brass-soft" />
              <h3 className="mt-5 text-xl font-medium !text-ivory">{l.ways.donate.title}</h3>
              <p className="mt-3 flex-1">{l.ways.donate.text}</p>
              <CtaLink to={donateHref} className="mt-6 self-start !bg-ivory !text-ink hover:!bg-white">
                {s.donateNow}
              </CtaLink>
            </div>
            <div className="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
              <Mail aria-hidden className="size-7 text-brass-deep" />
              <h3 className="mt-5 text-xl font-medium">{l.ways.contact.title}</h3>
              <p className="mt-3 flex-1 text-muted">{l.ways.contact.text}</p>
              <CtaLink to={href(lang, 'contact')} variant="secondary" className="mt-6 self-start">
                {t.common.contactTrust}
              </CtaLink>
            </div>
            <div className="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
              <Share2 aria-hidden className="size-7 text-brass-deep" />
              <h3 className="mt-5 text-xl font-medium">{l.ways.share.title}</h3>
              <p className="mt-3 flex-1 text-muted">{l.ways.share.text}</p>
              <ShareButton title={tx(category.title, lang)} />
            </div>
          </div>
        </div>
      </section>

      {/* Other projects */}
      {others.length > 0 && (
        <section aria-labelledby="other-projects" className="border-t border-line bg-white py-16 sm:py-20">
          <div className="container-site">
            <h2 id="other-projects" className="text-2xl font-medium sm:text-3xl">
              {l.otherProjects}
            </h2>
            <OtherProjectTiles others={others} />
            <Link to={href(lang, 'support')} className="mt-12 inline-flex items-center gap-2 font-semibold text-brass-deep hover:text-ink">
              <ArrowLeft aria-hidden className="size-4" /> {s.backToSupport}
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

/** Image tiles linking to other areas' Learn More pages (also used on the Donate Now page). */
export function OtherProjectTiles({ others }: { others: Category[] }) {
  const { lang } = useApp();
  return (
    <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {others.map((c) => (
        <li key={c.id}>
          <Link
            to={href(lang, 'supportDetail', c.slug[lang])}
            className="group relative flex h-40 items-end overflow-hidden rounded-2xl bg-deep p-5 shadow-card"
          >
            {c.image && (
              <Img
                src={c.image}
                alt=""
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="absolute inset-0 h-full w-full opacity-60 transition-transform duration-700 group-hover:scale-[1.05]"
              />
            )}
            <span className="absolute inset-0 bg-gradient-to-t from-deep/90 to-deep/10" aria-hidden />
            <span className="relative font-serif text-lg leading-snug text-ivory">{tx(c.title, lang)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function GlanceTile({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-lift sm:p-6">
      <dt className="text-sm font-medium text-muted">{label}</dt>
      <dd className="mt-2 font-serif text-lg leading-snug text-ink">{children}</dd>
    </div>
  );
}

function ListCard({ icon, title, items }: { icon: ReactNode; title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-full bg-sand text-brass-deep">{icon}</span>
        <h3 className="text-xl font-medium">{title}</h3>
      </div>
      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <CircleCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-brass-deep" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Uses the device share sheet where available, otherwise copies the page link. */
function ShareButton({ title }: { title: string }) {
  const { t } = useApp();
  const share = t.support.learnMorePage.ways.share;
  const [copied, setCopied] = useState(false);
  const onClick = async () => {
    const url = window.location.href.split(/[?#]/)[0];
    try {
      if (navigator.share) await navigator.share({ title, url });
      else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
      }
    } catch {
      // Share sheet dismissed or clipboard unavailable: nothing to do.
    }
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-6 inline-flex items-center justify-center gap-2 self-start rounded-full border border-ink/20 px-6 py-3 text-[0.95rem] font-semibold text-ink transition-colors duration-200 hover:border-ink/50 hover:bg-white"
    >
      <Share2 aria-hidden className="size-4" />
      <span aria-live="polite">{copied ? share.copied : share.cta}</span>
    </button>
  );
}
