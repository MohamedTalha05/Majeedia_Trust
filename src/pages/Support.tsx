import { ArrowLeft, FolderOpen } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { href } from '../../shared/routes';
import { CategoryCard, CategoryIcon, ProjectCard } from '../components/content';
import { CtaLink, EmptyState, Img, PageHeader, Value } from '../components/ui';
import { paragraphs, tx, useApp } from '../lib/app-context';
import { findDetail } from '../seo/head';
import { ContactBand } from './Home';
import { LEARN_MORE, LearnMoreDetail, OtherProjectTiles } from './SupportLearnMore';
import type { Category, PublicContent } from '../../shared/types';

// Support areas not listed on the What We Support page (their detail pages stay reachable).
const HIDDEN_ON_SUPPORT_PAGE = ['madrasa-education', 'family-community-welfare', 'masjid-projects'];

const shownOnSupportPage = (c: Category) => !HIDDEN_ON_SUPPORT_PAGE.includes(c.id);

export function Support() {
  const { t, content } = useApp();
  return (
    <>
      <PageHeader eyebrow={t.support.eyebrow} title={t.support.title} lead={t.support.lead} />
      <section className="py-16 sm:py-24">
        <div className="container-site grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.categories.filter(shownOnSupportPage).map((c) => (
            <CategoryCard
              key={c.id}
              category={c}
              actions
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          ))}
        </div>
      </section>
      <ContactBand />
    </>
  );
}

// Sponsorship programmes with their own donation page and photo gallery, keyed by support-area id.
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

/** The area's own MyFundbox form, or the site-wide donation link for areas without one. */
function donationUrlFor(category: Category, settings: PublicContent['settings']): string | undefined {
  return SPONSORSHIPS[category.id]?.donationUrl ?? ((settings.supportButtonEnabled && settings.supportButtonUrl) || undefined);
}

/**
 * Learn More (/what-we-support/:slug) shows the information page; Donate Now (…?donate) shows the
 * page with the donation form. Pre-rendered HTML is the Learn More view, so the Donate view is chosen
 * in a layout effect, before the first paint (an inline script in index.html hides the Learn More
 * view until then). Areas without Learn More content always use the donation page.
 */
export function SupportDetail() {
  const { content, match } = useApp();
  const category = findDetail(match, content) as Category;
  const [params] = useSearchParams();
  const [donateView, setDonateView] = useState(false);
  useLayoutEffect(() => {
    setDonateView(params.has('donate'));
    document.documentElement.classList.remove('donate-view');
  }, [params]);
  const programme = SPONSORSHIPS[category.id];
  if (donateView || !programme || !LEARN_MORE[category.id]) return <SupportDonateDetail />;
  const others = content.categories.filter((c) => c.id !== category.id && shownOnSupportPage(c));
  return <LearnMoreDetail category={category} programme={programme} others={others} />;
}

function SupportDonateDetail() {
  const { lang, t, content, match } = useApp();
  const category = findDetail(match, content) as Category;
  const s = t.support;
  const projects = content.projects.filter((p) => category.projectCategories.includes(p.category));
  const others = content.categories.filter((c) => c.id !== category.id && shownOnSupportPage(c));
  const sponsorship = SPONSORSHIPS[category.id];
  const donationUrl = donationUrlFor(category, content.settings);
  // The first paragraph explains the need; the rest describes how the Trust responds.
  const [why, ...doing] = paragraphs(tx(category.description, lang));
  // "Donate Now" links here with ?donate. Pages are pre-rendered without the query string, so the
  // form is only added after hydration, then scrolled into view (it sits below the text on mobile).
  const [params] = useSearchParams();
  const [donating, setDonating] = useState(false);
  const donateRef = useRef<HTMLDivElement>(null);
  useEffect(() => setDonating(params.has('donate')), [params]);
  useEffect(() => {
    if (donating) donateRef.current?.scrollIntoView({ block: 'start' });
  }, [donating]);

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
            <div className="mt-10">
              <h2 className="text-2xl font-medium sm:text-3xl">{s.overview}</h2>
              <p className="mt-4 text-lg">{tx(category.summary, lang)}</p>
            </div>
            {why && (
              <div className="mt-10">
                <h2 className="text-2xl font-medium sm:text-3xl">{s.whyItMatters}</h2>
                <p className="mt-4 text-lg">{why}</p>
              </div>
            )}
            {(sponsorship || doing.length > 0) && (
              <div className="mt-10">
                <h2 className="text-2xl font-medium sm:text-3xl">{s.whatWeAreDoing}</h2>
                {sponsorship && (
                  <>
                    <h3 className="mt-5 text-xl font-medium">{sponsorship.heading}</h3>
                    <p className="mt-3 text-lg">{sponsorship.intro}</p>
                  </>
                )}
                <div className="prose-site mt-4 text-lg">
                  {doing.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            )}
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
            {donating && donationUrl && (
              <div ref={donateRef} className="scroll-mt-28 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
                <h2 className="px-6 pt-6 text-xl font-medium">{s.donateTitle}</h2>
                <iframe
                  src={donationUrl}
                  title={`${s.donateTitle}: ${tx(category.title, lang)}`}
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
        <div className="container-site">
          <Link to={href(lang, 'support')} className="mt-12 inline-flex items-center gap-2 font-semibold text-brass-deep hover:text-ink">
            <ArrowLeft aria-hidden className="size-4" /> {s.backToSupport}
          </Link>
        </div>
      </section>

      {others.length > 0 && (
        <section aria-labelledby="other-projects" className="border-t border-line bg-white py-16 sm:py-20">
          <div className="container-site">
            <h2 id="other-projects" className="text-2xl font-medium sm:text-3xl">
              {s.learnMorePage.otherProjects}
            </h2>
            <OtherProjectTiles others={others} />
          </div>
        </section>
      )}

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

      {/* Donate Now pages end with the related projects; the other area links show only without ?donate. */}
      {!donating && (
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
      )}
    </>
  );
}
