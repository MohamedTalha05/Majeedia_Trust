import { CheckCircle2, Mail, MapPin, Phone, Share2, ShieldAlert } from 'lucide-react';
import { useState, type FormEvent } from 'react';
// DISABLED for the static GitHub Pages build (the contact form posts to the server's /api/contact):
// import { CheckCircle2 } from 'lucide-react';
// import { useState, type FormEvent } from 'react';
// import { Link } from 'react-router-dom';
// import { href } from '../../shared/routes';
import { FaqList } from '../components/content';
import { SocialLinks } from '../components/SocialLinks';
import { PageHeader, Value } from '../components/ui';
import { tx, useApp } from '../lib/app-context';

// type Status = 'idle' | 'sending' | 'success' | 'error';

export function Contact() {
  const { lang, t, content } = useApp();
  const c = t.contact;

  // DISABLED for the static GitHub Pages build: the form needs the server's /api/contact endpoint.
  // const [status, setStatus] = useState<Status>('idle');
  // const [errors, setErrors] = useState<Record<string, string>>({});
  //
  // async function onSubmit(e: FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   const form = e.currentTarget;
  //   const data = new FormData(form);
  //   setStatus('sending');
  //   setErrors({});
  //   try {
  //     const res = await fetch('/api/contact', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         name: data.get('name'),
  //         email: data.get('email'),
  //         subject: data.get('subject'),
  //         message: data.get('message'),
  //         website: data.get('website'),
  //         consent: data.get('consent') === 'on',
  //         lang,
  //       }),
  //     });
  //     if (!res.ok) {
  //       const body = await res.json().catch(() => ({}));
  //       setErrors(body.errors ?? {});
  //       setStatus('error');
  //       return;
  //     }
  //     form.reset();
  //     setStatus('success');
  //   } catch {
  //     setStatus('error');
  //   }
  // }
  //
  // const input =
  //   'mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-ink focus:border-brass focus:outline-none aria-[invalid=true]:border-red-700';
  // const label = 'block text-sm font-medium text-ink';
  // const err = (key: string) => (errors[key] ? { 'aria-invalid': true, 'aria-describedby': `${key}-error` } : {});
  // const errorText = (key: string) =>
  //   errors[key] && (
  //     <p id={`${key}-error`} className="mt-1 text-sm text-red-800">
  //       {c.required}
  //     </p>
  //   );

  const email = content.settings.contactEmail;

  // Static site: there is no server to post to, so a valid form opens the visitor's email app pre-filled.
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? '').trim();
    const values = { name: get('name'), email: get('email'), phone: get('phone').replace(/[\s-]/g, ''), help: get('help'), message: get('message') };

    const next: Record<string, string> = {};
    if (!values.name) next.name = c.formRequired;
    if (!values.email) next.email = c.formRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) next.email = c.formInvalidEmail;
    if (!values.phone) next.phone = c.formRequired;
    else if (!/^[6-9]\d{9}$/.test(values.phone)) next.phone = c.formInvalidPhone;
    if (!values.message) next.message = c.formRequired;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Phone: +91 ${values.phone}`,
      ...(values.help ? [`How I would like to help: ${values.help}`] : []),
      '',
      values.message,
    ].join('\n');
    const subject = `Website enquiry from ${values.name}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    e.currentTarget.reset();
    setSent(true);
  }

  const field =
    'w-full rounded-md border border-[#b9bcc4] bg-[#f9f9f9] px-3 py-2.5 text-[0.95rem] text-ink placeholder:text-[#7a7f87] focus:border-brass-deep focus:outline-none aria-[invalid=true]:border-red-700';
  const fieldError = (key: string) =>
    errors[key] ? { 'aria-invalid': true, 'aria-describedby': `${key}-error` } : {};
  const errorText = (key: string) =>
    errors[key] && (
      <p id={`${key}-error`} className="mt-1 text-sm text-red-800">
        {errors[key]}
      </p>
    );

  const address = content.settings.contactAddress;
  const phones = content.settings.contactPhones ?? [];

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
      <section className="py-10 sm:py-14">
        <div className="container-site grid max-w-6xl gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
          <aside className="space-y-4 lg:col-span-5">
            <div className="rounded-2xl border border-line bg-white p-6 shadow-card">
              <Mail aria-hidden className="size-6 text-brass-deep" />
              <h2 className="mt-4 text-lg font-medium">{c.emailLabel}</h2>
              <p className="mt-1 break-words">
                {email ? (
                  <a href={`mailto:${email}`} className="text-brass-deep underline-offset-4 hover:underline">
                    {email}
                  </a>
                ) : (
                  <Value>{''}</Value>
                )}
              </p>
              {tx(content.settings.contactNote, lang) && <p className="mt-4 text-[0.95rem] text-muted">{tx(content.settings.contactNote, lang)}</p>}
            </div>
            {phones.length > 0 && (
              <div className="rounded-2xl border border-line bg-white p-6 shadow-card">
                <Phone aria-hidden className="size-6 text-brass-deep" />
                <h2 className="mt-4 text-lg font-medium">{c.phonesLabel}</h2>
                <ul className="mt-1 space-y-1">
                  {phones.map((phone) => (
                    <li key={phone}>
                      <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="text-brass-deep underline-offset-4 hover:underline">
                        {phone}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {address && (
              <div className="rounded-2xl border border-line bg-white p-6 shadow-card">
                <MapPin aria-hidden className="size-6 text-brass-deep" />
                <h2 className="mt-4 text-lg font-medium">{c.addressLabel}</h2>
                <p className="mt-1">{address}</p>
              </div>
            )}
            <div className="rounded-2xl border border-line bg-white p-6 shadow-card">
              <Share2 aria-hidden className="size-6 text-brass-deep" />
              <h2 className="mt-4 text-lg font-medium">{c.connectLabel}</h2>
              <div className="mt-3">
                <SocialLinks label={c.connectLabel} linkClassName="bg-sand text-brass-deep hover:bg-brass-deep hover:text-ivory" />
              </div>
            </div>
            <p className="flex items-start gap-3 rounded-2xl bg-sand p-5 text-sm">
              <ShieldAlert aria-hidden className="mt-0.5 size-5 shrink-0 text-brass-deep" />
              {c.sensitive}
            </p>
          </aside>

          <div className="flex justify-center lg:col-span-7">
            <div className="w-full max-w-xl">
              <p className="text-sm font-bold uppercase tracking-[0.08em] text-brass-deep">{c.formEyebrow}</p>
              <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">{c.formHeading}</h2>
              <p className="mt-4 leading-relaxed text-ink">{c.formIntro}</p>

              <div className="mt-5 rounded-md bg-white p-4 sm:p-5">
                {sent && (
                  <p role="status" className="mb-6 flex items-start gap-3 rounded-md bg-sage/10 p-4 text-sm text-ink">
                    <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-sage" />
                    {c.formSent}
                  </p>
                )}
                <form onSubmit={onSubmit} noValidate className="space-y-4">
                  <div>
                    <label htmlFor="name" className="sr-only">{c.formName}</label>
                    <input id="name" name="name" placeholder={`${c.formNameShort} *`} maxLength={200} autoComplete="name" className={field} {...fieldError('name')} />
                    {errorText('name')}
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">{c.formEmail}</label>
                    <input id="email" name="email" type="email" placeholder={`${c.formEmailShort} *`} maxLength={254} autoComplete="email" className={field} {...fieldError('email')} />
                    {errorText('email')}
                  </div>
                  <div>
                    <label htmlFor="phone" className="sr-only">{c.formPhone}</label>
                    <div className="relative">
                      <span aria-hidden className="pointer-events-none absolute inset-y-0 left-3 flex items-center gap-1.5 text-[0.95rem] text-ink-soft">
                        <span className="text-base leading-none">🇮🇳</span>+91
                      </span>
                      <input id="phone" name="phone" type="tel" inputMode="numeric" placeholder={`${c.formPhone} *`} maxLength={14} autoComplete="tel-national" className={`${field} pl-[4.5rem]`} {...fieldError('phone')} />
                    </div>
                    {errorText('phone')}
                  </div>
                  <div>
                    <label htmlFor="help" className="sr-only">{c.formHelp}</label>
                    <input id="help" name="help" placeholder={c.formHelp} maxLength={300} className={field} />
                  </div>
                  <div>
                    <label htmlFor="message" className="sr-only">{c.formMessage}</label>
                    <textarea id="message" name="message" placeholder={`${c.formMessage} *`} rows={4} maxLength={5000} className={field} {...fieldError('message')} />
                    {errorText('message')}
                  </div>
                  <button
                    type="submit"
                    className="rounded-md bg-brass-deep px-3.5 py-2 text-[0.95rem] text-white transition-colors hover:bg-deep-2"
                  >
                    {c.formSend}
                  </button>
                </form>
              </div>
            </div>
              {/*
                DISABLED for the static GitHub Pages build: the form needs the server's /api/contact endpoint.

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
                    (Honeypot field for spam bots – hidden from people and assistive technology.)
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
              */}
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
