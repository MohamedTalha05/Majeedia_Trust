import { useId } from 'react';
import { useFormSubmit } from './useFormSubmit.js';
import { ChoiceGroup, Field, FormStatus, Honeypot, SubmitButton } from './Fields.jsx';
import { AREAS } from '../../data/areas.js';

const RULES = {
  name: { required: true, max: 120, label: 'Your name' },
  email: { required: true, email: true, max: 200, label: 'Your email address' },
  phone: { max: 40, label: 'Phone number' },
  motivation: { required: true, max: 3000, label: 'Why you would like to volunteer' },
  experience: { required: true, max: 3000, label: 'Your relevant experience or skills' },
  availability: { required: true, max: 2000, label: 'Your availability' },
};

// The live form's "area" question had no options; these are the trust's own areas of work.
const AREA_OPTIONS = [...AREAS.map((a) => a.title), 'Maintenance', 'Not sure yet'];

export default function VolunteerForm() {
  const uid = useId();
  const { status, errors, handleSubmit } = useFormSubmit('volunteer', RULES);
  const id = (n) => `${uid}-${n}`;

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <p className="form-note">Fields marked <span aria-hidden="true">*</span> are required.</p>
      <div className="form-row">
        <Field id={id('name')} name="name" label="Your Name" required error={errors.name} autoComplete="name" hint="Please enter your full name." />
        <Field id={id('email')} name="email" type="email" label="Your Email" required error={errors.email} autoComplete="email" hint="We will use this email to contact you." />
      </div>
      <Field id={id('phone')} name="phone" type="tel" label="Phone Number" error={errors.phone} autoComplete="tel" />
      <div className="form-row">
        <ChoiceGroup name="gender" legend="Gender" options={['Male', 'Female', 'Prefer not to say']} />
        <ChoiceGroup name="age_group" legend="Age Group" options={['Under 18', '18–25', '26–40', '41–55', 'Over 55']} />
      </div>
      <Field
        id={id('motivation')}
        name="motivation"
        as="textarea"
        rows={4}
        label="Please tell us why you would like to volunteer with Majeedia Trust."
        hint="Share your motivation and what inspires you to volunteer."
        required
        error={errors.motivation}
      />
      <Field
        id={id('experience')}
        name="experience"
        as="textarea"
        rows={4}
        label="Please tell us about any educational background, work experience, skills, or previous volunteering experience that would be relevant to the volunteer role you are interested in."
        hint="Detail any relevant experience or skills you possess."
        required
        error={errors.experience}
      />
      <Field
        id={id('availability')}
        name="availability"
        as="textarea"
        rows={3}
        label="When are you available to volunteer? Please specify your preferred days, times, and the length of commitment you would like to make."
        hint="Let us know your availability for volunteering."
        required
        error={errors.availability}
      />
      <ChoiceGroup name="areas" type="checkbox" legend="Which area would you like to support?" hint="Select all that apply." options={AREA_OPTIONS} />
      <Honeypot />
      <FormStatus status={status} successText="Thank you for your interest in volunteering – your application has been sent. We will be in touch." />
      <SubmitButton status={status}>Submit Application</SubmitButton>
    </form>
  );
}
