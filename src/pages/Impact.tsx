import { CheckCircle2, FileText, Lock } from 'lucide-react';
import { href } from '../../shared/routes';
import { REPORT_TYPES } from '../../shared/types';
import { StatGrid } from '../components/content';
import { FundChart } from '../components/FundChart';
import { CtaLink, EmptyState, PageHeader, SectionHeading } from '../components/ui';
import { tx, useApp } from '../lib/app-context';

export function Impact() {
  const { lang, t, content } = useApp();
  const i = t.impact;
  return (
    <>
      <PageHeader eyebrow={i.eyebrow} title={i.title} lead={i.lead} />

      <section aria-labelledby="stats" className="py-16 sm:py-24">
        <div className="container-site">
          <SectionHeading id="stats" title={i.statsTitle} text={<p className="text-base text-muted">{t.common.verifiedOnly}</p>} />
          <div className="mt-10">
            <StatGrid stats={content.stats} />
          </div>
        </div>
      </section>

      <section aria-labelledby="transparency" className="border-y border-line bg-white py-16 sm:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading id="transparency" title={i.transparencyTitle} />
            <div className="prose-site mt-6 text-lg">
              {i.transparencyText.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6">
            <h3 className="text-xl font-medium">{i.trackedTitle}</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {i.tracked.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl bg-ivory px-4 py-3 text-[0.95rem]">
                  <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-sage" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="overview" className="py-16 sm:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="overview" title={i.overviewTitle} text={i.overviewText} />
          </div>
          <div className="lg:col-span-8">
            {content.ledger.length ? <FundChart entries={content.ledger} /> : <EmptyState title={i.overviewTitle} text={i.overviewEmpty} />}
          </div>
        </div>
      </section>

      <section aria-labelledby="reports" className="border-t border-line bg-sand py-16 sm:py-24">
        <div className="container-site">
          <SectionHeading id="reports" title={i.reportsTitle} text={i.reportsText} />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {REPORT_TYPES.map((type) => {
              const reports = content.reports.filter((r) => r.type === type);
              return (
                <section key={type} aria-labelledby={`report-${type}`} className="rounded-2xl border border-line bg-white p-6 shadow-card">
                  <div className="flex items-center gap-3">
                    <FileText aria-hidden className="size-5 text-brass-deep" />
                    <h3 id={`report-${type}`} className="text-lg font-medium">
                      {i.reportTypes[type]}
                    </h3>
                  </div>
                  {reports.length ? (
                    <ul className="mt-4 divide-y divide-line">
                      {reports.map((r) => (
                        <li key={r.id} className="py-3">
                          <p className="font-medium text-ink">
                            {tx(r.title, lang)} {r.year && <span className="text-muted">· {r.year}</span>}
                          </p>
                          {tx(r.summary, lang) && <p className="mt-1 text-sm text-muted">{tx(r.summary, lang)}</p>}
                          {r.fileUrl && (
                            <a href={r.fileUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-brass-deep hover:underline">
                              {i.download} →
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 text-sm text-muted">{i.noReports}</p>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="privacy" className="py-16 sm:py-20">
        <div className="container-site">
          <div className="flex flex-col gap-6 rounded-2xl border border-line bg-white p-8 shadow-card sm:flex-row sm:items-start">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-sand text-brass-deep">
              <Lock aria-hidden className="size-5" />
            </span>
            <div>
              <h2 id="privacy" className="text-2xl font-medium">
                {i.privacyTitle}
              </h2>
              <p className="mt-3 text-lg">{i.privacyText}</p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                <CtaLink to={href(lang, 'fund')} variant="text">
                  {t.home.ctaFund}
                </CtaLink>
                <CtaLink to={href(lang, 'legal')} variant="text">
                  {t.nav.legal}
                </CtaLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
