import { CircleAlert, CircleCheck, LoaderCircle } from 'lucide-react';
import { SITE } from '../../data/site.js';

export function Field({ id, name, label, type = 'text', required, error, hint, as = 'input', autoComplete, rows = 5 }) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;
  const Control = as;
  return (
    <div className={`field${error ? ' has-error' : ''}`}>
      <label htmlFor={id}>
        {label}
        {required ? <span className="required" aria-hidden="true"> *</span> : <span className="optional"> (optional)</span>}
      </label>
      {hint && <p id={`${id}-hint`} className="field-hint">{hint}</p>}
      <Control
        id={id}
        name={name}
        type={as === 'input' ? type : undefined}
        rows={as === 'textarea' ? rows : undefined}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        autoComplete={autoComplete}
      />
      {error && (
        <p id={`${id}-error`} className="field-error">
          <CircleAlert aria-hidden="true" size={16} /> {error}
        </p>
      )}
    </div>
  );
}

export function ChoiceGroup({ name, legend, options, type = 'radio', hint }) {
  return (
    <fieldset className="field choice-group">
      <legend>
        {legend} <span className="optional">(optional)</span>
      </legend>
      {hint && <p className="field-hint">{hint}</p>}
      <div className="choices">
        {options.map((opt) => (
          <label key={opt} className="choice">
            <input type={type} name={type === 'checkbox' ? `${name}[]` : name} value={opt} />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

// Hidden from people; bots that fill every field are rejected by the server.
export function Honeypot() {
  return (
    <div className="hp-field" aria-hidden="true">
      <label htmlFor="website">Leave this field empty</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export function FormStatus({ status, successText }) {
  return (
    <div role="status" aria-live="polite" className="form-status-region">
      {status === 'success' && (
        <p className="form-status success">
          <CircleCheck aria-hidden="true" size={20} /> {successText}
        </p>
      )}
      {status === 'error' && (
        <p className="form-status error">
          <CircleAlert aria-hidden="true" size={20} />
          <span>
            Sorry, your message could not be sent. Please try again, or email us directly at{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </span>
        </p>
      )}
    </div>
  );
}

export function SubmitButton({ status, children }) {
  const busy = status === 'submitting';
  return (
    <button type="submit" className="btn btn-primary" disabled={busy} aria-disabled={busy}>
      {busy ? (
        <>
          <LoaderCircle aria-hidden="true" size={18} className="spin" /> Sending…
        </>
      ) : (
        children
      )}
    </button>
  );
}
