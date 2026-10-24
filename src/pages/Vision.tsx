import { Target } from 'lucide-react';
import { Flow } from '../components/Flow';
import { GeometricPattern } from '../components/Geometric';
import { Img, PageHeader, SectionHeading } from '../components/ui';
import { useApp } from '../lib/app-context';
import { ContactBand } from './Home';

export function Vision() {
  const { t } = useApp();
  const v = t.vision;
  return (
    <>
      <PageHeader eyebrow={v.eyebrow} title={v.title} lead={v.lead} />

      <section aria-label={v.title} className="relative overflow-hidden bg-deep py-16 sm:py-20">
        <GeometricPattern className="absolute inset-0 h-full w-full text-ivory/[0.04]" size={72} />
        <div className="container-site relative">
          <Flow steps={v.chain} tone="dark" label={v.title} />
        </div>
      </section>

      <section aria-labelledby="objectives" className="py-16 sm:py-24">
        <div className="container-site">
          <SectionHeading id="objectives" title={v.objectivesTitle} />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {v.objectives.map((o, i) => (
              <li key={o} className="reveal flex flex-col rounded-2xl border border-line bg-white p-5 shadow-card">
                <span className="flex items-center gap-2 text-sm font-semibold text-brass-deep">
                  <Target aria-hidden className="size-4" /> {String(i + 1).padStart(2, '0')}
                </span>
                <span className="mt-3 font-serif text-lg leading-snug text-ink">{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="why" className="border-t border-line bg-white py-16 sm:py-24">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading id="why" title={v.whyTitle} />
            <div className="prose-site mt-6 text-lg">
              {v.whyText.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <Img src="/images/masjid-community" alt={t.home.visionImageAlt} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/3] w-full rounded-[1.5rem] shadow-lift" />
        </div>
      </section>

      <ContactBand />
    </>
  );
}
