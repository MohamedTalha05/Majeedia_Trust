import { FolderOpen } from 'lucide-react';
import { href } from '../../shared/routes';
import { CategoryCard, CategoryIcon, ProjectCard } from '../components/content';
import { CtaLink, EmptyState, Img, PageHeader, Value } from '../components/ui';
import { paragraphs, tx, useApp } from '../lib/app-context';
import { findDetail } from '../seo/head';
import { ContactBand } from './Home';
import type { Category } from '../../shared/types';

export function Support() {
  const { t, content } = useApp();
  return (
    <>
      <PageHeader eyebrow={t.support.eyebrow} title={t.support.title} lead={t.support.lead} />
      <section className="py-16 sm:py-24">
        <div className="container-site grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.categories.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </section>
      <ContactBand />
    </>
  );
}

// Sponsorship programmes with an embedded donation form and photo gallery, keyed by support-area id.
const SPONSORSHIPS: Record<string, { heading: string; intro: string; donationUrl: string; gallery: { src: string; alt: string }[] }> = {
  education: {
    heading: 'Our Education Sponsorship Programme',
    intro:
      'Through education sponsorship, Majeedia Trust helps children and students continue their learning when their families cannot meet the costs alone. Each sponsorship is assessed individually and given discreetly, so that young people can focus on their studies with dignity.',
    donationUrl: 'https://donate.myfundbox.com/ovd?hzORUapy_JMM4Uatw-BB8w',
    gallery: [
      { src: '/images/girls-education', alt: 'Girls in headscarves writing in their exercise books at a classroom desk' },
      { src: '/images/madrasa-learning', alt: 'Seen from above, two girls in headscarves reading the Quran on prayer mats' },
      { src: '/images/community-welfare', alt: 'Three young women in headscarves smiling as they read a sheet of paper together' },
    ],
  },
  'widow-support': {
    heading: 'Our Medical Support Sponsorship Programme',
    intro:
      'Through medical support sponsorship, Majeedia Trust helps individuals and families meet the cost of essential treatment when they cannot manage it alone. Each request is assessed individually and supported discreetly, so that patients can focus on their recovery with dignity.',
    donationUrl: 'https://donate.myfundbox.com/ovd?HyPkGhDik1BtmErMyo9N_g',
    gallery: [
      { src: '/images/medical-vital-signs', alt: 'A nurse in a headscarf and medical gown taking a patient’s vital signs beside a monitor' },
      { src: '/images/medical-nurse', alt: 'A nurse in a headscarf and surgical cap smiling on a hospital ward' },
      { src: '/images/medical-waiting', alt: 'Women in headscarves waiting to be seen by medical staff in a hospital waiting area' },
    ],
  },
  'girls-education': {
    heading: 'Our Girls’ Hifz Sponsorship Programme',
    intro:
      'Through Hifz sponsorship, Majeedia Trust helps girls continue memorising the Holy Quran when their families cannot meet the costs alone. Each sponsorship is assessed individually and given discreetly, so that every girl can pursue her Hifz with dignity and consistency.',
    donationUrl: 'https://donate.myfundbox.com/ovd?_1T8HZdbxZ4bFOh2M1GqEQ',
    gallery: [
      { src: '/images/madrasa-learning', alt: 'Seen from above, two girls in headscarves reading the Quran on prayer mats' },
      { src: '/images/children-learning', alt: 'Children sitting on the carpet of a mosque as a teacher writes on the blackboard, the girls in headscarves' },
      { src: '/images/community-welfare', alt: 'Three young women in headscarves smiling as they read a sheet of paper together' },
    ],
  },
  'other-initiatives': {
    heading: 'Our School Maintenance Sponsorship Programme',
    intro:
      'Through school maintenance sponsorship, Majeedia Trust helps keep school buildings safe, clean and fit for learning. Each request is assessed carefully, so that support goes to the repairs and upkeep that make a real difference for pupils and teachers.',
    donationUrl: 'https://donate.myfundbox.com/ovd?ReTPS7_YlB1fiRGh2RXj5A',
    gallery: [
      { src: '/images/school-exterior', alt: 'The front of a rebuilt single-storey school building with brick pillars and a flagpole' },
      { src: '/images/school-classroom', alt: 'A teacher at the front of a bright, newly renovated classroom full of pupils' },
      { src: '/images/school-pupils', alt: 'Pupils in headscarves seated at new desks in a renovated classroom' },
    ],
  },
  'disability-support': {
    heading: 'Our Disability Support Sponsorship Programme',
    intro:
      'Through disability support sponsorship, Majeedia Trust helps people with disabilities and their families meet essential needs that they cannot manage alone. Each request is assessed individually and supported discreetly, so that every person is treated with dignity and respect.',
    donationUrl: 'https://donate.myfundbox.com/ovd?7dLTBGL8Al9PU6cTUkOSUA',
    gallery: [
      { src: '/images/disability-wheelchair', alt: 'A carer helping a child seated in a new wheelchair' },
      { src: '/images/disability-classroom', alt: 'A teacher helping pupils at their desks in a classroom, one pupil using a wheelchair' },
      { src: '/images/disability-therapy', alt: 'A therapist encouraging a young boy on a ride-on toy in a colourful play room' },
    ],
  },
};

export function SupportDetail() {
  const { lang, t, content, match } = useApp();
  const category = findDetail(match, content) as Category;
  const s = t.support;
  const projects = content.projects.filter((p) => category.projectCategories.includes(p.category));
  const others = content.categories.filter((c) => c.id !== category.id);
  const sponsorship = SPONSORSHIPS[category.id];
  const donationUrl = sponsorship?.donationUrl;

  return (
    <>
      <PageHeader eyebrow={s.eyebrow} title={tx(category.title, lang)} lead={tx(category.summary, lang)} />

      <section className="py-16 sm:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {category.image && (
              <Img
                src={category.image}
                alt={tx(category.imageAlt, lang)}
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="aspect-[16/10] w-full rounded-[1.5rem] shadow-lift"
              />
            )}
            {sponsorship && (
              <div className="mt-10">
                <h2 className="text-2xl font-medium sm:text-3xl">{sponsorship.heading}</h2>
                <p className="mt-4 text-lg">{sponsorship.intro}</p>
              </div>
            )}
            <div className="prose-site mt-10 text-lg">
              {paragraphs(tx(category.description, lang)).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {sponsorship && (
              <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
                {sponsorship.gallery.map((image) => (
                  <Img
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    sizes="(min-width: 1024px) 19vw, 33vw"
                    className="aspect-square w-full rounded-2xl shadow-card"
                  />
                ))}
              </div>
            )}
          </div>
          <aside className="space-y-6 lg:col-span-5">
            {donationUrl && (
              <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
                <h2 className="px-6 pt-6 text-xl font-medium">{s.donateTitle}</h2>
                <iframe
                  src={donationUrl}
                  title={`${s.donateTitle}: ${tx(category.title, lang)}`}
                  loading="lazy"
                  className="mt-4 block h-[760px] w-full border-0"
                />
                <p className="border-t border-line px-6 py-4 text-sm">
                  <a href={donationUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-brass-deep underline-offset-4 hover:underline">
                    {s.donateFallback}
                  </a>
                </p>
              </div>
            )}
            <div className="rounded-2xl border border-line bg-white p-6 shadow-card">
              <div className="flex size-11 items-center justify-center rounded-full bg-sand text-brass-deep">
                <CategoryIcon name={category.icon} />
              </div>
              <h2 className="mt-5 text-xl font-medium">{s.currentInitiatives}</h2>
              <div className="mt-3 text-[0.95rem]">
                <Value>{tx(category.currentInitiatives, lang)}</Value>
              </div>
              <h2 className="mt-8 text-xl font-medium">{s.impact}</h2>
              <div className="mt-3 text-[0.95rem]">
                <Value>{tx(category.impact, lang)}</Value>
              </div>
            </div>
            <p className="text-sm text-muted">{t.common.verifiedOnly}</p>
          </aside>
        </div>
      </section>

      <section aria-labelledby="related" className="border-t border-line bg-white py-16 sm:py-20">
        <div className="container-site">
          <h2 id="related" className="text-2xl font-medium sm:text-3xl">
            {s.relatedProjects}
          </h2>
          <div className="mt-8">
            {projects.length ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            ) : (
              <EmptyState title={t.projects.emptyTitle} text={s.noProjects} icon={<FolderOpen className="size-5" aria-hidden />} />
            )}
          </div>
          <div className="mt-8">
            <CtaLink to={href(lang, 'projects')} variant="secondary">
              {s.viewProjects}
            </CtaLink>
          </div>
        </div>
      </section>

      <section aria-labelledby="other-areas" className="py-16 sm:py-20">
        <div className="container-site">
          <h2 id="other-areas" className="text-2xl font-medium sm:text-3xl">
            {t.common.allAreas}
          </h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {others.map((c) => (
              <li key={c.id}>
                <CtaLink to={href(lang, 'supportDetail', c.slug[lang])} variant="secondary" className="!px-4 !py-2 text-sm">
                  {tx(c.title, lang)}
                </CtaLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
