import { Check, Sprout } from 'lucide-react';
import { href } from '../../shared/routes';
import { Flow } from '../components/Flow';
import { Ornament } from '../components/Geometric';
import { CtaLink, Img, PageHeader, SectionHeading } from '../components/ui';
import { useApp } from '../lib/app-context';
import { ContactBand, VALUE_ICONS } from './Home';

export function About() {
  const { lang, t } = useApp();
  const a = t.about;
  return (
    <>
      <PageHeader eyebrow={a.eyebrow} title={a.title} lead={a.lead} />

      <section aria-labelledby="story" className="py-20 sm:py-24">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading id="story" title={a.storyTitle} text={a.storyText} />
            <div className="mt-8">
              <CtaLink to={href(lang, 'story')}>{a.ctaStory}</CtaLink>
            </div>
          </div>
          <Img src="/images/community-welfare" alt={t.story.imageAlt} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/3] w-full rounded-[1.5rem] shadow-lift" />
        </div>
        <div className="container-site mt-16">
          <Flow steps={a.storyJourney} label={a.storyTitle} />
        </div>
      </section>

      <section aria-labelledby="values" className="border-y border-line bg-white py-20 sm:py-24">
        <div className="container-site">
          <SectionHeading id="values" title={a.valuesTitle} text={a.valuesText} align="center" />
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.values.map((v) => {
              const Icon = VALUE_ICONS[v.key as keyof typeof VALUE_ICONS] ?? Sprout;
              return (
                <li key={v.key} className="reveal rounded-2xl border border-line bg-ivory p-6">
                  <Icon aria-hidden className="size-7 text-brass-deep" strokeWidth={1.5} />
                  <h3 className="mt-4 text-xl font-medium">{v.title}</h3>
                  <p className="mt-2 text-[0.95rem] text-muted">{v.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="approach" className="py-20 sm:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading id="approach" title={a.approachTitle} />
            <div className="prose-site mt-6 text-lg">
              {a.approachText.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <ul className="space-y-3 lg:col-span-6">
            {a.approachPoints.map((point) => (
              <li key={point} className="reveal flex items-start gap-4 rounded-2xl border border-line bg-white p-5 shadow-card">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-sand text-brass-deep">
                  <Check aria-hidden className="size-4" />
                </span>
                <span className="text-ink">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="legal" className="bg-sand py-16">
        <div className="container-site max-w-3xl text-center">
          <Ornament />
          <h2 id="legal" className="mt-6 text-2xl font-medium sm:text-3xl">
            {a.legalTitle}
          </h2>
          <p className="mt-4 text-lg">{a.legalText}</p>
          <div className="mt-6">
            <CtaLink to={href(lang, 'legal')} variant="text">
              {a.ctaLegal}
            </CtaLink>
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
