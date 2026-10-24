import { href } from '../../shared/routes';
import { FaqList } from '../components/content';
import { CtaLink, PageHeader } from '../components/ui';
import { useApp } from '../lib/app-context';

export function Faq() {
  const { lang, t, content } = useApp();
  return (
    <>
      <PageHeader eyebrow={t.faq.eyebrow} title={t.faq.title} lead={t.faq.lead} />
      <section className="py-14 sm:py-20">
        <div className="container-site max-w-4xl">
          <FaqList faqs={content.faqs} />
          <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl bg-sand p-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-serif text-xl text-ink">{t.faq.more}</p>
            <CtaLink to={href(lang, 'contact')}>{t.common.contactTrust}</CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}

export function NotFound() {
  const { lang, t } = useApp();
  return (
    <section className="py-28">
      <div className="container-site max-w-2xl text-center">
        <p className="font-serif text-7xl text-brass">404</p>
        <h1 className="mt-6 text-4xl font-medium">{t.notFound.title}</h1>
        <p className="mt-4 text-lg">{t.notFound.text}</p>
        <div className="mt-8">
          <CtaLink to={href(lang, 'home')}>{t.notFound.cta}</CtaLink>
        </div>
      </div>
    </section>
  );
}
