// One form control per schema field type.
import { ImagePlus, Loader2, Trash2, Upload } from 'lucide-react';
import { useState } from 'react';
import type { Field } from '../../shared/schema';
import { en } from '../i18n/en';
import { uploadFile } from './api';

const OPTION_LABELS: Record<string, string> = {
  ...en.projects.categories,
  ...en.projects.statuses,
  ...en.impact.reportTypes,
  ...en.updates.types,
  ...en.impact.ledgerTypes,
};
export const optionLabel = (value: string) =>
  OPTION_LABELS[value] ?? value.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());

const inputClass = 'w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-ink focus:border-brass focus:outline-none';

function ImageUpload({ onUploaded, accept = 'image/jpeg,image/png,image/webp' }: { onUploaded: (url: string) => void; accept?: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  return (
    <div>
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-medium hover:bg-stone-50">
        {busy ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
        Upload file
        <input
          type="file"
          accept={accept}
          className="sr-only"
          disabled={busy}
          onChange={async (e) => {
            const file = e.target.files?.[0];
            e.target.value = '';
            if (!file) return;
            setBusy(true);
            setError('');
            try {
              onUploaded(await uploadFile(file));
            } catch (err) {
              setError((err as Error).message);
            } finally {
              setBusy(false);
            }
          }}
        />
      </label>
      {error && <p className="mt-1 text-xs text-red-700">{error}</p>}
    </div>
  );
}

const preview = (src: string) => (/^\/images\/[\w-]+$/.test(src) ? `${src}-640.webp` : src);

export function FieldInput({ field, value, onChange }: { field: Field; value: any; onChange: (v: any) => void }) {
  const id = `f-${field.key}`;
  switch (field.type) {
    case 'text':
    case 'url':
    case 'email':
    case 'date':
      return (
        <div className="space-y-2">
          <input
            id={id}
            type={field.type === 'text' ? 'text' : field.type}
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            className={inputClass}
          />
          {field.key === 'fileUrl' && <ImageUpload accept="application/pdf" onUploaded={onChange} />}
        </div>
      );
    case 'textarea':
      return <textarea id={id} rows={5} value={value ?? ''} onChange={(e) => onChange(e.target.value)} className={inputClass} />;
    case 'number':
      return <input id={id} type="number" value={value ?? 0} onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))} className={`${inputClass} max-w-xs`} />;
    case 'boolean':
      return (
        <label className="inline-flex items-center gap-2 text-sm">
          <input id={id} type="checkbox" checked={value === true} onChange={(e) => onChange(e.target.checked)} className="size-4 accent-[#0f3e22]" />
          Yes
        </label>
      );
    case 'select':
      return (
        <select id={id} value={value ?? ''} onChange={(e) => onChange(e.target.value)} className={`${inputClass} max-w-sm`}>
          {!field.required && <option value="">—</option>}
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {optionLabel(o)}
            </option>
          ))}
        </select>
      );
    case 'multiselect': {
      const selected: string[] = Array.isArray(value) ? value : [];
      return (
        <div className="flex flex-wrap gap-3">
          {field.options?.map((o) => (
            <label key={o} className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selected.includes(o)}
                onChange={(e) => onChange(e.target.checked ? [...selected, o] : selected.filter((s) => s !== o))}
                className="size-4 accent-[#0f3e22]"
              />
              {optionLabel(o)}
            </label>
          ))}
        </div>
      );
    }
    case 'image':
      return (
        <div className="flex flex-wrap items-start gap-4">
          {value ? (
            <div className="relative">
              <img src={preview(value)} alt="" className="h-28 w-40 rounded-lg object-cover" />
              <button type="button" onClick={() => onChange('')} className="absolute top-1 right-1 rounded bg-white/90 p-1" aria-label="Remove image">
                <Trash2 className="size-4 text-red-700" />
              </button>
            </div>
          ) : (
            <div className="flex h-28 w-40 items-center justify-center rounded-lg border border-dashed border-stone-300 text-stone-400">
              <ImagePlus className="size-6" />
            </div>
          )}
          <ImageUpload onUploaded={onChange} />
        </div>
      );
    case 'images': {
      const list: string[] = Array.isArray(value) ? value : [];
      return (
        <div className="flex flex-wrap items-start gap-4">
          {list.map((src) => (
            <div key={src} className="relative">
              <img src={preview(src)} alt="" className="h-24 w-32 rounded-lg object-cover" />
              <button
                type="button"
                onClick={() => onChange(list.filter((s) => s !== src))}
                className="absolute top-1 right-1 rounded bg-white/90 p-1"
                aria-label="Remove photo"
              >
                <Trash2 className="size-4 text-red-700" />
              </button>
            </div>
          ))}
          <ImageUpload onUploaded={(url) => onChange([...list, url])} />
        </div>
      );
    }
    case 'i18n':
    case 'i18n-textarea':
    case 'i18n-slug': {
      const v = value ?? { en: '' };
      return field.type === 'i18n-textarea' ? (
        <textarea rows={5} value={v.en ?? ''} onChange={(e) => onChange({ ...v, en: e.target.value })} className={inputClass} />
      ) : (
        <input value={v.en ?? ''} onChange={(e) => onChange({ ...v, en: e.target.value })} className={inputClass} />
      );
    }
  }
}
