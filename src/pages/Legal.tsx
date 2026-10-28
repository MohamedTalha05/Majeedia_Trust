import { Info } from 'lucide-react';
import { Fragment } from 'react';
import { href } from '../../shared/routes';
import type { LegalInfo } from '../../shared/types';
import { CtaLink, PageHeader, Value } from '../components/ui';
import { IMPRINT, PRIVACY, TERMS, type LegalText } from '../i18n/legal-texts';
import { tx, useApp } from '../lib/app-context';

const LEGAL_FIELDS = [
  'legalName',
  'registrationType',
  'registrationNumber',
  'jurisdiction',
  'establishedDate',
  'registeredAddress',
  'charitableStatus',
  'taxStatus',
] as const satisfies readonly (keyof LegalInfo)[];

/** Details confirmed by the Trust for this page; a value entered in Site content takes precedence. */
const CONFIRMED: Partial<Record<(typeof LEGAL_FIELDS)[number], string>> = {
  legalName: 'Majeedia Educational and Charitable Trust',
  registrationType: 'Charitable Trust',
  registrationNumber: '4/80/2019',
  jurisdiction: 'Tamil Nadu, India',
  establishedDate: '03/07/2019',
  registeredAddress: 'G6, Sathya Apartment\nNo. 1, Dr. Thomas Road, 2nd Street\nT. Nagar, Chennai – 600017',
  taxStatus: 'Section 12A',
};

export function LegalStatus() {
  const { lang, t, content } = useApp();
  const l = t.legal;
  // Fields without a confirmed value are left out rather than shown as placeholders.
  const rows = LEGAL_FIELDS.map((key) => ({ key, value: tx(content.legal[key], lang) || CONFIRMED[key] })).filter((r) => r.value);
  return (
    <>
      <PageHeader eyebrow={l.eyebrow} title={l.title} lead={l.lead} />
      <section className="py-14 sm:py-20">
        <div className="container-site max-w-4xl">
          <p className="flex items-start gap-3 rounded-2xl border border-brass/40 bg-white p-5 text-[0.95rem]">
            <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-brass-deep" />
            {l.note}
          </p>
          <dl className="mt-10 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white shadow-card">
            {rows.map(({ key, value }) => (
              <div key={key} className="grid gap-1 px-6 py-4 sm:grid-cols-3 sm:gap-6">
                <dt className="font-medium text-ink">{l.fields[key]}</dt>
                <dd className="whitespace-pre-line sm:col-span-2">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10">
            <CtaLink to={href(lang, 'contact')} variant="secondary">
              {t.common.contactTrust}
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}

/** Splits a paragraph into text/link segments and renders emails and URLs as anchor elements. */
function renderParagraph(
  paragraph: string,
  fill: (s: string) => React.ReactNode,
): React.ReactNode {
  const linkPattern = /([\w.+-]+@[\w-]+\.[\w.]+|https?:\/\/[^\s]+)/g;
  const parts = paragraph.split(linkPattern);
  return parts.map((part, i) => {
    if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(part)) {
      return (
        <a key={i} href={`mailto:${part}`} className="text-brass-deep underline hover:no-underline">
          {part}
        </a>
      );
    }
    if (/^https?:\/\//.test(part)) {
      return (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-brass-deep underline hover:no-underline">
          {part}
        </a>
      );
    }
    return <Fragment key={i}>{fill(part)}</Fragment>;
  });
}

function LegalDocument({ title, text }: { title: string; text: LegalText }) {
  const { lang, content } = useApp();
  const legal = content.legal;
  const values: Record<string, string> = {
    controller: tx(legal.privacyController, lang),
    email: content.settings.contactEmail,
    hosting: tx(legal.hostingProvider, lang),
    legalName: tx(legal.legalName, lang),
    address: tx(legal.registeredAddress, lang),
    representative: tx(legal.imprintRepresentative, lang),
    phone: legal.imprintPhone,
    imprintEmail: legal.imprintEmail || content.settings.contactEmail,
    register: tx(legal.imprintRegister, lang),
    vat: legal.imprintVatId,
    contentResponsible: tx(legal.imprintContentResponsible, lang),
  };
  const fill = (paragraph: string) =>
    paragraph.split(/(\{\w+\})/).map((part, i) => {
      const token = part.match(/^\{(\w+)\}$/)?.[1];
      return <Fragment key={i}>{token ? <Value>{values[token]}</Value> : part}</Fragment>;
    });

  return (
    <>
      <PageHeader eyebrow={title} title={title} />
      <section className="py-14 sm:py-20">
        <div className="container-site max-w-3xl">
          {text.notice && (
            <p className="flex items-start gap-3 rounded-2xl border border-brass/40 bg-white p-5 text-[0.95rem]">
              <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-brass-deep" />
              {text.notice}
            </p>
          )}
          {text.sections.map((s) => (
            <section key={s.title} className="mt-10">
              <h2 className="text-2xl font-medium">{s.title}</h2>
              <div className="prose-site mt-4 whitespace-pre-line">
                {s.paragraphs.map((p) => (
                  <p key={p}>{renderParagraph(p, fill)}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}

export function Privacy() {
  const { lang, t } = useApp();
  return <LegalDocument title={t.nav.privacy} text={PRIVACY[lang]} />;
}

export function Imprint() {
  const { lang, t } = useApp();
  return <LegalDocument title={t.nav.imprint} text={IMPRINT[lang]} />;
}

export function Terms() {
  const { lang, t } = useApp();
  return <LegalDocument title={t.nav.terms} text={TERMS[lang]} />;
}
