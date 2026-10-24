import { CheckCircle2, Mail, ShieldAlert } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { href } from '../../shared/routes';
import { FaqList } from '../components/content';
import { PageHeader, Value } from '../components/ui';
import { tx, useApp } from '../lib/app-context';

type Status = 'idle' | 'sending' | 'success' | 'error';

export function Contact() {
  const { lang, t, content } = useApp();
  const c = t.contact;
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus('sending');
    setErrors({});
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          subject: data.get('subject'),
          message: data.get('message'),
          website: data.get('website'),
          consent: data.get('consent') === 'on',
          lang,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setErrors(body.errors ?? {});
        setStatus('error');
        return;
      }
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  const input =
    'mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-ink focus:border-brass focus:outline-none aria-[invalid=true]:border-red-700';
  const label = 'block text-sm font-medium text-ink';
  const err = (key: string) => (errors[key] ? { 'aria-invalid': true, 'aria-describedby': `${key}-error` } : {});
  const errorText = (key: string) =>
    errors[key] && (
      <p id={`${key}-error`} className="mt-1 text-sm text-red-800">
        {c.required}
      </p>
    );

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
      <section className="py-14 sm:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <aside className="space-y-6 lg:col-span-4">
            <div className="rounded-2xl border border-line bg-white p-6 shadow-card">
              <Mail aria-hidden className="size-6 text-brass-deep" />
              <h2 className="mt-4 text-lg font-medium">{c.emailLabel}</h2>
              <p className="mt-1 break-words">
                {content.settings.contactEmail ? (
                  <a href={`mailto:${content.settings.contactEmail}`} className="text-brass-deep underline-offset-4 hover:underline">
                    {content.settings.contactEmail}
                  </a>
                ) : (
                  <Value>{''}</Value>
                )}
              </p>
              {tx(content.settings.contactNote, lang) && <p className="mt-4 text-[0.95rem] text-muted">{tx(content.settings.contactNote, lang)}</p>}
            </div>
            <p className="flex items-start gap-3 rounded-2xl bg-sand p-5 text-sm">
              <ShieldAlert aria-hidden className="mt-0.5 size-5 shrink-0 text-brass-deep" />
              {c.sensitive}
            </p>
          </aside>

          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-10">
              <h2 className="text-2xl font-medium">{c.formTitle}</h2>
              {status === 'success' ? (
                <p role="status" className="mt-6 flex items-start gap-3 rounded-xl bg-sage/10 p-5 text-ink">
                  <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-sage" />
                  {c.success}
                </p>
              ) : (
                <form onSubmit={onSubmit} className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={label}>
                      {c.name} *
                    </label>
                    <input id="name" name="name" required maxLength={200} autoComplete="name" className={input} {...err('name')} />
                    {errorText('name')}
                  </div>
                  <div>
                    <label htmlFor="email" className={label}>
                      {c.email} *
                    </label>
                    <input id="email" name="email" type="email" required maxLength={254} autoComplete="email" className={input} {...err('email')} />
                    {errorText('email')}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="subject" className={label}>
                      {c.subject}
                    </label>
                    <input id="subject" name="subject" maxLength={300} className={input} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className={label}>
                      {c.message} *
                    </label>
                    <textarea id="message" name="message" required rows={6} maxLength={5000} className={input} {...err('message')} />
                    {errorText('message')}
                  </div>
                  {/* Honeypot field for spam bots – hidden from people and assistive technology. */}
                  <div aria-hidden className="absolute -left-[9999px]">
                    <label htmlFor="website">Website</label>
                    <input id="website" name="website" tabIndex={-1} autoComplete="off" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="flex items-start gap-3 text-sm">
                      <input type="checkbox" name="consent" required className="mt-1 size-4 accent-[#0f3e22]" {...err('consent')} />
                      <span>
                        {c.consent}{' '}
                        <Link to={href(lang, 'privacy')} className="font-medium text-brass-deep underline underline-offset-4">
                          {c.privacyLink}
                        </Link>
                      </span>
                    </label>
                    {errorText('consent')}
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="rounded-full bg-ink px-7 py-3 font-semibold text-ivory transition-colors hover:bg-deep-2 disabled:opacity-60"
                    >
                      {status === 'sending' ? c.sending : c.send}
                    </button>
                    {status === 'error' && (
                      <p role="alert" className="mt-4 text-sm text-red-800">
                        {c.error}
                      </p>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq" className="border-t border-line bg-white py-16">
        <div className="container-site max-w-4xl">
          <h2 id="faq" className="text-2xl font-medium sm:text-3xl">
            {t.faq.title}
          </h2>
          <div className="mt-8">
            <FaqList faqs={content.faqs.slice(0, 6)} />
          </div>
        </div>
      </section>
    </>
  );
}
