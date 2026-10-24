import { href } from '../../shared/routes';
import { GeometricPattern, Ornament } from '../components/Geometric';
import { CtaLink, Img, PageHeader } from '../components/ui';
import { useApp } from '../lib/app-context';
import { ContactBand } from './Home';

export function Story() {
  const { lang, t } = useApp();
  const s = t.story;
  return (
    <>
      <PageHeader eyebrow={s.eyebrow} title={s.title} lead={s.lead} />

      <section className="py-20 sm:py-28">
        <div className="container-site max-w-4xl">
          <ol className="relative space-y-14 before:absolute before:top-2 before:bottom-2 before:left-[1.4rem] before:w-px before:bg-brass/40 sm:before:left-[1.9rem]">
            {s.chapters.map((c, i) => (
              <li key={c.title} className="reveal relative grid grid-cols-[3rem_1fr] gap-5 sm:grid-cols-[4rem_1fr] sm:gap-8">
                <span className="relative z-10 flex size-12 items-center justify-center rounded-full border border-brass/50 bg-ivory font-serif text-lg text-brass-deep sm:size-16 sm:text-2xl">
                  {i + 1}
                </span>
                <div className="pt-1 sm:pt-3">
                  <p className="text-xs font-semibold tracking-[0.18em] text-brass-deep uppercase">{c.label}</p>
                  <h2 className="mt-2 text-2xl font-medium sm:text-3xl">{c.title}</h2>
                  <p className="mt-4 text-lg leading-relaxed">{c.text}</p>
                  {i === 1 && (
                    <p className="mt-6 inline-flex flex-col rounded-2xl border border-brass/40 bg-white px-6 py-4 shadow-card">
                      <span className="text-sm text-muted">{t.home.fundLabel}</span>
                      <span className="font-serif text-2xl text-ink sm:text-3xl">{t.home.fundValue}</span>
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="container-site">
          <Img
            src="/images/children-learning"
            alt={t.home.heroImageAlt}
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="aspect-[4/3] w-full rounded-[1.5rem] shadow-lift sm:aspect-[21/9]"
          />
        </div>
      </section>

      <section aria-labelledby="closing" className="relative overflow-hidden bg-deep py-20 text-center sm:py-28">
        <GeometricPattern className="absolute inset-0 h-full w-full text-ivory/[0.04]" size={72} />
        <div className="container-site relative max-w-3xl">
          <Ornament />
          <h2 id="closing" className="mt-6 text-3xl font-medium !text-ivory sm:text-4xl">
            {s.closingTitle}
          </h2>
          <ul className="mt-8 space-y-2">
            {s.closing.map((line) => (
              <li key={line} className="font-serif text-xl text-brass-soft sm:text-2xl">
                {line}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <CtaLink to={href(lang, 'fund')} variant="light">
              {t.home.ctaFund}
            </CtaLink>
            <CtaLink to={href(lang, 'vision')} variant="light">
              {t.home.ctaVision}
            </CtaLink>
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
