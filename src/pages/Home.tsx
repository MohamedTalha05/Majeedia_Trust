import { Compass, Eye, HandHeart, Landmark, Leaf, Scale, ShieldCheck, Sprout, Users } from 'lucide-react';
import { href } from '../../shared/routes';
import { CategoryCard, FaqList, StatGrid, UpdateCard } from '../components/content';
import { Flow } from '../components/Flow';
import { GeometricPattern, Ornament } from '../components/Geometric';
import { CtaLink, Img, SectionHeading } from '../components/ui';
import { useApp } from '../lib/app-context';

export const VALUE_ICONS = {
  faith: Landmark,
  responsibility: Scale,
  transparency: Eye,
  compassion: HandHeart,
  dignity: ShieldCheck,
  education: Compass,
  sustainability: Leaf,
  community: Users,
} as const;

/** Photos that cross-fade behind the home hero (decorative, so no alt text). */
const HERO_SLIDES = ['children-learning', 'madrasa-learning', 'girls-education', 'community-welfare', 'masjid-community'];

export function Home() {
  const { lang, t, content } = useApp();
  const h = t.home;
  const stats = content.stats.slice(0, 3);

  return (
    <>
      {/* Hero: animated photo background */}
      <section className="relative isolate overflow-hidden bg-deep">
        <div aria-hidden className="absolute inset-0 -z-10">
          {HERO_SLIDES.map((name, i) => (
            <img
              key={name}
              src={`/images/${name}-1280.webp`}
              srcSet={`/images/${name}-640.webp 640w, /images/${name}-1280.webp 1280w`}
              sizes="100vw"
              alt=""
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : undefined}
              decoding="async"
              className="hero-slide absolute inset-0 h-full w-full object-cover"
              style={{ animationDelay: `${i * 6}s` }}
            />
          ))}
          <div className="absolute inset-0 bg-deep/65 lg:bg-transparent lg:bg-gradient-to-r lg:from-deep/90 lg:via-deep/55 lg:to-deep/5" />
          <GeometricPattern className="absolute inset-0 h-full w-full text-ivory/[0.05]" size={64} />
        </div>
        <div className="container-site relative flex min-h-[34rem] items-center py-20 sm:min-h-[38rem] lg:min-h-[44rem] lg:py-28">
          <div className="fade-up max-w-3xl">
            <p className="eyebrow !text-brass-soft">{h.eyebrow}</p>
            <h1 className="mt-6 text-[2.2rem] leading-[1.1] font-medium !text-ivory sm:text-6xl lg:text-[4.25rem]">{h.title}</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ivory/85 sm:text-xl">{h.subtitle}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CtaLink to={href(lang, 'story')} className="!bg-ivory !text-ink hover:!bg-white">
                {h.ctaStory}
              </CtaLink>
              <CtaLink to={href(lang, 'impact')} variant="light">
                {h.ctaImpact}
              </CtaLink>
            </div>
          </div>
          <div className="fade-up-delay absolute right-4 bottom-8 hidden rounded-2xl border border-ivory/20 bg-deep/60 px-5 py-4 text-ivory backdrop-blur-sm sm:right-6 md:block lg:right-8">
            {h.motto.map((line) => (
              <p key={line} className="font-serif text-[0.95rem] leading-snug">
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Family legacy */}
      <section aria-labelledby="legacy" className="py-20 sm:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="legacy" eyebrow={h.legacyEyebrow} title={h.legacyTitle} />
            <div className="prose-site mt-6 text-lg">
              {h.legacyText.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-8 inline-flex flex-col rounded-2xl border border-brass/40 bg-white px-6 py-5 shadow-card">
              <span className="text-sm font-medium text-muted">{h.fundLabel}</span>
              <span className="mt-1 font-serif text-3xl text-ink">{h.fundValue}</span>
            </div>
            <div className="mt-8">
              <CtaLink to={href(lang, 'story')} variant="text">
                {h.ctaReadStory}
              </CtaLink>
            </div>
          </div>
          <div className="lg:col-span-7 lg:pl-8">
            <ol aria-label={h.legacyTitle} className="relative space-y-4 before:absolute before:top-6 before:bottom-6 before:left-6 before:w-px before:bg-brass/40">
              {h.journey.map((step, i) => (
                <li key={step} className="reveal relative flex items-center gap-5">
                  <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-brass/50 bg-ivory font-serif text-brass-deep">
                    {i + 1}
                  </span>
                  <span className="flex-1 rounded-2xl border border-line bg-white px-6 py-5 font-serif text-xl text-ink shadow-card">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Purpose & values */}
      <section aria-labelledby="purpose" className="border-y border-line bg-white py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading id="purpose" eyebrow={h.purposeEyebrow} title={h.purposeTitle} text={h.purposeText} align="center" />
          <ul className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {t.values.map((v) => {
              const Icon = VALUE_ICONS[v.key as keyof typeof VALUE_ICONS] ?? Sprout;
              return (
                <li key={v.key} className="reveal rounded-2xl bg-ivory p-5 sm:p-6">
                  <Icon aria-hidden className="size-6 text-brass-deep" strokeWidth={1.5} />
                  <h3 className="mt-4 text-lg font-medium sm:text-xl">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[0.95rem]">{v.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* What we support */}
      <section aria-labelledby="support" className="py-20 sm:py-28">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading id="support" eyebrow={h.supportEyebrow} title={h.supportTitle} text={h.supportText} />
            <CtaLink to={href(lang, 'support')} variant="secondary" className="self-start lg:self-auto">
              {h.ctaDiscover}
            </CtaLink>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.categories.map((c) => (
              <CategoryCard key={c.id} category={c} />
            ))}
          </div>
        </div>
      </section>

      {/* Family fund */}
      <section aria-labelledby="fund" className="relative overflow-hidden bg-deep py-20 text-ivory/80 sm:py-28">
        <GeometricPattern className="absolute inset-0 h-full w-full text-ivory/[0.04]" size={72} />
        <div className="container-site relative">
          <div className="max-w-3xl">
            <p className="eyebrow !text-brass">{h.fundEyebrow}</p>
            <h2 id="fund" className="mt-4 text-3xl font-medium !text-ivory sm:text-4xl lg:text-[2.75rem]">
              {h.fundTitle}
            </h2>
            <p className="mt-5 text-lg">{h.fundText}</p>
          </div>
          <div className="mt-12">
            <Flow steps={t.fundFlow} tone="dark" label={h.fundTitle} />
          </div>
          <div className="mt-10">
            <CtaLink to={href(lang, 'fund')} variant="light">
              {h.ctaFund}
            </CtaLink>
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section aria-labelledby="transparency" className="py-20 sm:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="transparency" eyebrow={h.transparencyEyebrow} title={h.transparencyTitle} text={h.transparencyText} />
            <p className="mt-5 text-sm text-muted">{t.common.verifiedOnly}</p>
            <div className="mt-8">
              <CtaLink to={href(lang, 'impact')}>{h.ctaTransparency}</CtaLink>
            </div>
          </div>
          <div className="lg:col-span-7">
            <StatGrid stats={stats} />
          </div>
        </div>
      </section>

      {/* Vision */}
      <section aria-labelledby="vision" className="relative overflow-hidden bg-sand">
        <div className="container-site grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-2">
          <Img src="/images/masjid-community" alt={h.visionImageAlt} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/3] w-full rounded-[1.5rem] shadow-lift" />
          <div>
            <SectionHeading id="vision" eyebrow={h.visionEyebrow} title={h.visionTitle} text={h.visionText} />
            <div className="mt-8">
              <CtaLink to={href(lang, 'vision')}>{h.ctaVision}</CtaLink>
            </div>
          </div>
        </div>
      </section>

      {/* Growing the circle (subtle) */}
      <section aria-labelledby="circle" className="py-20 sm:py-24">
        <div className="container-site">
          <div className="mx-auto max-w-3xl text-center">
            <Ornament />
            <h2 id="circle" className="mt-6 text-2xl font-medium sm:text-3xl">
              {t.fund.circleTitle}
            </h2>
            <p className="mt-4 text-lg">{t.fund.circleText}</p>
            <p className="mt-4 text-sm text-muted">{t.fund.circleNote}</p>
          </div>
        </div>
      </section>

      {/* Updates */}
      {content.updates.length > 0 && (
        <section aria-labelledby="updates" className="border-t border-line py-20 sm:py-24">
          <div className="container-site">
            <div className="flex items-end justify-between gap-6">
              <SectionHeading id="updates" title={h.updatesTitle} />
              <CtaLink to={href(lang, 'updates')} variant="text">
                {h.ctaUpdates}
              </CtaLink>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {content.updates.slice(0, 3).map((u) => (
                <UpdateCard key={u.id} update={u} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section aria-labelledby="faq" className="border-t border-line bg-white py-20 sm:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="faq" eyebrow={t.faq.eyebrow} title={h.faqTitle} />
            <div className="mt-6">
              <CtaLink to={href(lang, 'faq')} variant="text">
                {h.ctaFaq}
              </CtaLink>
            </div>
          </div>
          <div className="lg:col-span-8">
            <FaqList faqs={content.faqs.slice(0, 5)} />
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}

export function ContactBand() {
  const { lang, t } = useApp();
  return (
    <section className="py-20 sm:py-24">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-[2rem] bg-deep-2 px-6 py-14 text-center sm:px-12">
          <GeometricPattern className="absolute inset-0 h-full w-full text-ivory/[0.05]" size={48} />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-medium !text-ivory sm:text-4xl">{t.home.contactTitle}</h2>
            <p className="mt-4 text-lg text-ivory/75">{t.home.contactText}</p>
            <div className="mt-8">
              <CtaLink to={href(lang, 'contact')} variant="light">
                {t.common.contactTrust}
              </CtaLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
