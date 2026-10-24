import { useId } from 'react';
import { useFormSubmit } from './useFormSubmit.js';
import { Field, FormStatus, Honeypot, SubmitButton } from './Fields.jsx';

const RULES = {
  name: { required: true, max: 120, label: 'Your name' },
  email: { required: true, email: true, max: 200, label: 'Your email address' },
  phone: { max: 40, label: 'Phone number' },
  subject: { required: true, max: 200, label: 'A subject' },
  message: { required: true, max: 5000, label: 'Your message' },
};

export default function ContactForm() {
  const uid = useId();
  const { status, errors, handleSubmit } = useFormSubmit('contact', RULES);
  const id = (n) => `${uid}-${n}`;

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <p className="form-note">Fields marked <span aria-hidden="true">*</span> are required.</p>
      <div className="form-row">
        <Field id={id('name')} name="name" label="Name" required error={errors.name} autoComplete="name" />
        <Field id={id('email')} name="email" type="email" label="Email" required error={errors.email} autoComplete="email" />
      </div>
      <div className="form-row">
        <Field id={id('phone')} name="phone" type="tel" label="Phone Number" error={errors.phone} autoComplete="tel" />
        <Field
          id={id('subject')}
          name="subject"
          label="Subject"
          required
          error={errors.subject}
          hint="For example, how you would like to help."
        />
      </div>
      <Field id={id('message')} name="message" as="textarea" label="Message" required error={errors.message} />
      <Honeypot />
      <FormStatus status={status} successText="Thank you – your message has been sent. Our team will get back to you." />
      <SubmitButton status={status}>Send Message</SubmitButton>
    </form>
  );
}
