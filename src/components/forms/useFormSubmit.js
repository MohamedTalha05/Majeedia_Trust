import { useRef, useState } from 'react';

// Form submissions go to public/api/contact.php on Hostinger (see docs/DEPLOYMENT.md).
// Set VITE_FORM_ENDPOINT in a .env file to use a different service.
export const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || '/api/contact.php';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * rules: { fieldName: { required?: bool, email?: bool, max?: number, label: string } }
 * Returns status: 'idle' | 'submitting' | 'success' | 'error'
 */
export function useFormSubmit(formType, rules) {
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const startedAt = useRef(Date.now());

  function validate(data) {
    const found = {};
    for (const [name, rule] of Object.entries(rules)) {
      const value = String(data.get(name) || '').trim();
      if (rule.required && !value) found[name] = `Please enter ${rule.label.toLowerCase()}.`;
      else if (rule.email && value && !EMAIL_RE.test(value)) found[name] = 'Please enter a valid email address, e.g. name@example.com.';
      else if (rule.max && value.length > rule.max) found[name] = `Please keep this under ${rule.max} characters.`;
    }
    return found;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = form.querySelector(`[name="${Object.keys(found)[0]}"]`);
      first?.focus();
      return;
    }

    data.append('form_type', formType);
    data.append('elapsed', String(Math.round((Date.now() - startedAt.current) / 1000)));
    setStatus('submitting');
    try {
      const res = await fetch(FORM_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus('success');
        form.reset();
      } else {
        if (json.errors) setErrors(json.errors);
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return { status, errors, handleSubmit };
}
