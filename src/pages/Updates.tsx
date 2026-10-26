import { ArrowLeft, Newspaper } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { href } from '../../shared/routes';
import { UPDATE_TYPES, type Update, type UpdateType } from '../../shared/types';
import { UpdateCard } from '../components/content';
import { EmptyState, Img, PageHeader } from '../components/ui';
import { formatDate, paragraphs, tx, useApp } from '../lib/app-context';
import { findDetail } from '../seo/head';

export function Updates() {
  const { t, content } = useApp();
  const u = t.updates;
  const [params, setParams] = useSearchParams();
  const type = UPDATE_TYPES.includes(params.get('type') as UpdateType) ? (params.get('type') as UpdateType) : '';
  const available = UPDATE_TYPES.filter((ty) => content.updates.some((x) => x.type === ty));
  const list = type ? content.updates.filter((x) => x.type === type) : content.updates;
  const chip = (active: boolean) =>
    `rounded-full border px-4 py-2 text-sm font-medium ${active ? 'border-ink bg-ink text-ivory' : 'border-line bg-white hover:border-ink/40'}`;

  return (
    <>
      <PageHeader eyebrow={u.eyebrow} title={u.title} lead={u.lead} />
      <section className="py-14 sm:py-20">
        <div className="container-site">
          {content.updates.length === 0 ? (
            <EmptyState title={u.emptyTitle} text={u.emptyText} icon={<Newspaper className="size-5" aria-hidden />} />
          ) : (
            <>
              {available.length > 1 && (
                <div role="group" aria-label={u.title} className="mb-8 flex flex-wrap gap-2">
                  <button type="button" className={chip(!type)} aria-pressed={!type} onClick={() => setParams({}, { replace: true, preventScrollReset: true })}>
                    {u.all}
                  </button>
                  {available.map((ty) => (
                    <button
                      key={ty}
                      type="button"
                      className={chip(type === ty)}
                      aria-pressed={type === ty}
                      onClick={() => setParams({ type: ty }, { replace: true, preventScrollReset: true })}
                    >
                      {u.types[ty]}
                    </button>
                  ))}
                </div>
              )}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {list.map((x) => (
                  <UpdateCard key={x.id} update={x} />
                ))}
              </div>
            </>
          )}
          <p className="mt-12 max-w-3xl text-sm text-muted">{u.consentNote}</p>
        </div>
      </section>
    </>
  );
}

export function UpdateDetail() {
  const { lang, t, content, match } = useApp();
  const update = findDetail(match, content) as Update;
  return (
    <>
      <PageHeader eyebrow={t.updates.types[update.type]} title={tx(update.title, lang)} lead={tx(update.excerpt, lang)}>
        {update.date && (
          <p className="mt-6 text-sm text-muted">
            <time dateTime={update.date}>{formatDate(update.date, lang)}</time>
          </p>
        )}
      </PageHeader>
      <article className="py-14 sm:py-20">
        <div className="container-site max-w-3xl">
          {update.image && (
            <Img src={update.image} alt={tx(update.imageAlt, lang)} priority sizes="(min-width: 768px) 768px, 100vw" className="mb-10 aspect-[16/10] w-full rounded-[1.5rem] shadow-lift" />
          )}
          <div className="prose-site text-lg">
            {paragraphs(tx(update.body, lang)).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <Link to={href(lang, 'updates')} className="mt-12 inline-flex items-center gap-2 font-semibold text-brass-deep hover:text-ink">
            <ArrowLeft aria-hidden className="size-4" /> {t.common.backToUpdates}
          </Link>
        </div>
      </article>
    </>
  );
}
