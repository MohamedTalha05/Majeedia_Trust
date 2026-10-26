import { Info } from 'lucide-react';
import { href } from '../../shared/routes';
import { Flow } from '../components/Flow';
import { GeometricPattern, Ornament } from '../components/Geometric';
import { CtaLink, PageHeader, SectionHeading } from '../components/ui';
import { tx, useApp } from '../lib/app-context';

export function Fund() {
  const { lang, t, content } = useApp();
  const f = t.fund;
  const s = content.settings;
  return (
    <>
      <PageHeader eyebrow={f.eyebrow} title={f.title} lead={f.lead} />

      <section aria-labelledby="flow" className="py-16 sm:py-24">
        <div className="container-site">
          <SectionHeading id="flow" title={f.flowTitle} text={f.flowText} />
          <div className="mt-12">
            <Flow steps={t.fundFlow} label={f.flowTitle} />
          </div>
        </div>
      </section>

      <section aria-labelledby="model" className="border-y border-line bg-white py-16 sm:py-24">
        <div className="container-site">
          <SectionHeading id="model" title={f.modelTitle} />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {f.model.map((step, i) => (
              <li key={step.title} className={`reveal rounded-2xl border border-line bg-ivory p-6 ${i === f.model.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
                <span className="font-serif text-4xl text-brass">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 text-xl font-medium">{step.title}</h3>
                <p className="mt-2 text-[0.95rem] text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="funding" className="py-16 sm:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading id="funding" title={f.fundingTitle} />
            <div className="prose-site mt-6 text-lg">
              {f.funding.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <aside className="lg:col-span-5">
            <div className="flex gap-4 rounded-2xl border border-brass/40 bg-white p-6 shadow-card">
              <Info aria-hidden className="mt-1 size-5 shrink-0 text-brass-deep" />
              <p className="text-[0.95rem]">{f.zakatNote}</p>
            </div>
          </aside>
        </div>
      </section>

      <section aria-labelledby="circle" className="relative overflow-hidden bg-sand py-16 sm:py-24">
        <GeometricPattern className="absolute inset-y-0 right-0 hidden w-1/3 text-brass/20 lg:block [mask-image:linear-gradient(to_left,black,transparent)]" />
        <div className="container-site relative grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Ornament className="!justify-start" />
            <h2 id="circle" className="mt-6 text-3xl font-medium sm:text-4xl">
              {f.circleTitle}
            </h2>
            <p className="mt-5 text-lg">{f.circleText}</p>
            <p className="mt-5 text-sm text-muted">{f.circleNote}</p>
            {s.supportButtonEnabled && s.supportButtonUrl && (
              <a
                href={s.supportButtonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex rounded-full border border-brass px-6 py-3 font-semibold text-brass-deep hover:bg-brass hover:text-white"
              >
                {tx(s.supportButtonLabel, lang)}
              </a>
            )}
          </div>
          <div className="lg:col-span-6">
            <h3 className="text-lg font-medium">{f.circleChannelsTitle}</h3>
            <ul className="mt-4 space-y-3">
              {f.circleChannels.map((c) => (
                <li key={c} className="rounded-xl border border-line bg-white/70 px-5 py-3.5 text-ink">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-site flex flex-col gap-3 sm:flex-row">
          <CtaLink to={href(lang, 'impact')}>{t.home.ctaTransparency}</CtaLink>
          <CtaLink to={href(lang, 'vision')} variant="secondary">
            {t.home.ctaVision}
          </CtaLink>
        </div>
      </section>
    </>
  );
}
