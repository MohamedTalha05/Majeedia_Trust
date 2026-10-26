import { FolderOpen, Search } from 'lucide-react';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PROJECT_CATEGORIES, PROJECT_STATUSES, type ProjectCategory, type ProjectStatus } from '../../shared/types';
import { ProjectCard } from '../components/content';
import { EmptyState, PageHeader } from '../components/ui';
import { tx, useApp } from '../lib/app-context';

export function Projects() {
  const { lang, t, content } = useApp();
  const p = t.projects;
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const category = PROJECT_CATEGORIES.includes(params.get('category') as ProjectCategory) ? (params.get('category') as ProjectCategory) : '';
  const status = PROJECT_STATUSES.includes(params.get('status') as ProjectStatus) ? (params.get('status') as ProjectStatus) : '';

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true, preventScrollReset: true });
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return content.projects.filter((project) => {
      if (category && project.category !== category) return false;
      if (status && project.status !== status) return false;
      if (!q) return true;
      const haystack = [tx(project.name, lang), tx(project.description, lang), project.location, project.year, p.categories[project.category]]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [content.projects, category, status, query, lang, p.categories]);

  const hasProjects = content.projects.length > 0;
  const chip = (active: boolean) =>
    `rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
      active ? 'border-ink bg-ink text-ivory' : 'border-line bg-white text-ink-soft hover:border-ink/40'
    }`;

  return (
    <>
      <PageHeader eyebrow={p.eyebrow} title={p.title} lead={p.lead} />
      <section className="py-14 sm:py-20">
        <div className="container-site">
          <form role="search" onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <div className="flex flex-col gap-3 md:flex-row">
              <label className="relative flex-1">
                <span className="sr-only">{p.search}</span>
                <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => update('q', e.target.value)}
                  placeholder={p.searchPlaceholder}
                  className="w-full rounded-full border border-line bg-white py-3 pr-4 pl-12 text-ink placeholder:text-muted/80 focus:border-brass focus:outline-none"
                />
              </label>
              <label className="md:w-56">
                <span className="sr-only">{p.status}</span>
                <select
                  value={status}
                  onChange={(e) => update('status', e.target.value)}
                  className="w-full rounded-full border border-line bg-white px-4 py-3 text-ink focus:border-brass focus:outline-none"
                >
                  <option value="">{p.allStatuses}</option>
                  {PROJECT_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {p.statuses[s]}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div role="group" aria-label={t.nav.support} className="flex flex-wrap gap-2">
              <button type="button" className={chip(!category)} aria-pressed={!category} onClick={() => update('category', '')}>
                {p.all}
              </button>
              {PROJECT_CATEGORIES.map((c) => (
                <button key={c} type="button" className={chip(category === c)} aria-pressed={category === c} onClick={() => update('category', c)}>
                  {p.categories[c]}
                </button>
              ))}
            </div>
          </form>

          <div className="mt-10">
            {!hasProjects ? (
              <EmptyState title={p.emptyTitle} text={p.emptyText} icon={<FolderOpen className="size-5" aria-hidden />} />
            ) : (
              <>
                <p aria-live="polite" className="text-sm text-muted">
                  {p.results(results.length)}
                </p>
                {results.length ? (
                  <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {results.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                ) : (
                  <div className="mt-6 rounded-2xl border border-line bg-white p-10 text-center">
                    <p>{p.noMatch}</p>
                    <button type="button" onClick={() => setParams({}, { replace: true })} className="mt-4 text-sm font-semibold text-brass-deep hover:underline">
                      {p.clear}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
