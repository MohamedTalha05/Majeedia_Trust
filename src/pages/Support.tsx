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

export function SupportDetail() {
  const { lang, t, content, match } = useApp();
  const category = findDetail(match, content) as Category;
  const s = t.support;
  const projects = content.projects.filter((p) => category.projectCategories.includes(p.category));
  const others = content.categories.filter((c) => c.id !== category.id);

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
            <div className="prose-site mt-10 text-lg">
              {paragraphs(tx(category.description, lang)).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <aside className="space-y-6 lg:col-span-5">
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
