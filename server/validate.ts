// Schema-driven sanitising of admin input. Unknown keys are dropped; values are coerced and length-limited.
import type { CollectionDef, Field } from '../shared/schema';

export class ValidationError extends Error {
  constructor(public errors: Record<string, string>) {
    super('Validation failed');
  }
}

const LIMITS = { short: 500, long: 20000 };

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

function isSafeUrl(value: string): boolean {
  if (!value) return true;
  if (value.startsWith('/') && !value.startsWith('//')) return true;
  return /^https?:\/\/[^\s]+$/i.test(value);
}

function isLocalAsset(value: string): boolean {
  return (/^\/(images|uploads)\/[\w./-]+$/.test(value) && !value.includes('..')) || /^https:\/\/[^\s]+$/i.test(value);
}

function i18n(v: unknown, max: number) {
  const o = (v && typeof v === 'object' ? v : {}) as Record<string, unknown>;
  return { en: str(o.en, max) };
}

function sanitizeField(field: Field, value: unknown, errors: Record<string, string>): unknown {
  switch (field.type) {
    case 'text':
      return str(value, LIMITS.short);
    case 'textarea':
      return str(value, LIMITS.long);
    case 'url': {
      const v = str(value, 2000);
      if (!isSafeUrl(v)) errors[field.key] = 'Must be a link starting with https:// or /';
      return v;
    }
    case 'email': {
      const v = str(value, 254);
      if (v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) errors[field.key] = 'Invalid email address';
      return v;
    }
    case 'date': {
      const v = str(value, 10);
      if (v && !/^\d{4}-\d{2}-\d{2}$/.test(v)) errors[field.key] = 'Use the format YYYY-MM-DD';
      return v;
    }
    case 'number': {
      const n = typeof value === 'number' ? value : Number(value);
      if (!Number.isFinite(n)) {
        if (field.required) errors[field.key] = 'Enter a number';
        return 0;
      }
      return n;
    }
    case 'boolean':
      return value === true;
    case 'select': {
      const v = str(value, 100);
      if (field.options?.includes(v)) return v;
      if (field.required) errors[field.key] = 'Choose an option';
      return field.options?.[0] ?? '';
    }
    case 'multiselect':
      return Array.isArray(value) ? [...new Set(value.filter((v) => field.options?.includes(v)))] : [];
    case 'image': {
      const v = str(value, 2000);
      if (v && !isLocalAsset(v)) errors[field.key] = 'Use an uploaded image';
      return v;
    }
    case 'images':
      return Array.isArray(value) ? value.map((v) => str(v, 2000)).filter((v) => v && isLocalAsset(v)).slice(0, 20) : [];
    case 'i18n':
      return i18n(value, LIMITS.short);
    case 'i18n-textarea':
      return i18n(value, LIMITS.long);
    case 'i18n-slug':
      return i18n(value, 80);
  }
}

/**
 * Returns a clean document for the given collection definition.
 * `siblings` are the other items of a list collection, used to keep slugs unique.
 */
export function sanitize(def: CollectionDef, input: Record<string, unknown>, siblings: Record<string, any>[] = []) {
  const errors: Record<string, string> = {};
  const out: Record<string, any> = {};
  for (const field of def.fields) out[field.key] = sanitizeField(field, input[field.key], errors);

  for (const field of def.fields) {
    if (field.type === 'i18n-slug') {
      const source = (field.from ? out[field.from] : {}) as { en: string };
      for (const lang of ['en'] as const) {
        let slug = slugify(out[field.key][lang] || source?.[lang] || '');
        if (!slug) slug = `item-${Date.now().toString(36)}`;
        const taken = new Set(siblings.map((s) => s[field.key]?.[lang]));
        let candidate = slug;
        for (let i = 2; taken.has(candidate); i++) candidate = `${slug}-${i}`;
        out[field.key][lang] = candidate;
      }
    }
    if (field.required) {
      const v = out[field.key];
      const empty = field.type.startsWith('i18n') ? !v.en : v === '' || v === undefined;
      if (empty && !errors[field.key]) errors[field.key] = 'Required';
    }
  }

  if (Object.keys(errors).length) throw new ValidationError(errors);
  return out;
}
