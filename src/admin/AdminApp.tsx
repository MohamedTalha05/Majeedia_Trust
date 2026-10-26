// DISABLED: not used by the static GitHub Pages build (see README "Static deployment").
// Kept so the admin panel, contact API and JSON data store can be switched back on later.
// Admin panel: a simple CMS for family administrators. Forms are generated from shared/schema.ts.
import '../index.css';
import { Download, ExternalLink, Inbox, LogOut, Pencil, Plus, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { COLLECTIONS, COLLECTION_KEYS, type CollectionDef, type CollectionKey } from '../../shared/schema';
import type { ContactMessage } from '../../shared/types';
import { StarMark } from '../components/Geometric';
import { ApiError, request, session } from './api';
import { FieldInput, optionLabel } from './FieldInput';

type Doc = Record<string, any>;
type View = { kind: 'collection'; key: CollectionKey } | { kind: 'messages' };

const button = 'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium';
const primary = `${button} bg-ink text-ivory hover:bg-deep-2 disabled:opacity-60`;
const ghost = `${button} border border-stone-300 bg-white hover:bg-stone-50`;

function emptyDoc(def: CollectionDef): Doc {
  const doc: Doc = {};
  for (const f of def.fields) {
    doc[f.key] = f.type.startsWith('i18n')
      ? { en: '' }
      : f.type === 'boolean'
        ? false
        : f.type === 'number'
          ? 0
          : f.type === 'images' || f.type === 'multiselect'
            ? []
            : f.type === 'select'
              ? (f.options?.[0] ?? '')
              : '';
  }
  return doc;
}

function itemTitle(def: CollectionDef, item: Doc): string {
  const v = def.titleField ? item[def.titleField] : item.id;
  if (v && typeof v === 'object') return v.en || '(untitled)';
  if (def.titleField === 'type') return `${optionLabel(String(v))} · ${item.date ?? ''} · ₹${Number(item.amount ?? 0).toLocaleString('en-IN')}`;
  return String(v || '(untitled)');
}

function Login({ onDone }: { onDone: () => void }) {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const password = new FormData(e.currentTarget).get('password');
      const { token } = await request<{ token: string }>('/admin/login', { method: 'POST', body: JSON.stringify({ password }) });
      session.set(token);
      onDone();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-sand p-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-line bg-white p-8 shadow-card">
        <StarMark className="size-10 text-brass-deep" />
        <h1 className="mt-4 text-2xl">Majeedia Trust admin</h1>
        <p className="mt-1 text-sm text-muted">Sign in to manage the website content.</p>
        <input type="text" name="username" autoComplete="username" value="admin" readOnly hidden />
        <label className="mt-6 block text-sm font-medium text-ink">
          Password
          <input name="password" type="password" required autoComplete="current-password" autoFocus className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2" />
        </label>
        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
        <button type="submit" disabled={busy} className={`${primary} mt-6 w-full justify-center`}>
          Sign in
        </button>
      </form>
    </main>
  );
}

function Editor({
  def,
  collection,
  initial,
  onSaved,
  onCancel,
}: {
  def: CollectionDef;
  collection: CollectionKey;
  initial: Doc;
  onSaved: (doc: Doc) => void;
  onCancel?: () => void;
}) {
  const [doc, setDoc] = useState<Doc>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => setDoc(initial), [initial]);

  async function save(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErrors({});
    setMessage('');
    try {
      const path = def.kind === 'single' ? `/admin/data/${collection}` : doc.id ? `/admin/data/${collection}/${doc.id}` : `/admin/data/${collection}`;
      const method = def.kind === 'list' && !doc.id ? 'POST' : 'PUT';
      const saved = await request<Doc>(path, { method, body: JSON.stringify(doc) });
      setMessage('Saved. Changes are live on the website.');
      onSaved(saved);
    } catch (err) {
      if (err instanceof ApiError) setErrors(err.errors);
      setMessage((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={save} className="space-y-6">
      {def.fields.map((f) => (
        <div key={f.key} className="rounded-xl border border-stone-200 bg-white p-4">
          <label htmlFor={`f-${f.key}`} className="block text-sm font-semibold text-ink">
            {f.label}
            {f.required && <span className="text-red-700"> *</span>}
          </label>
          {f.help && <p className="mt-0.5 text-xs text-muted">{f.help}</p>}
          <div className="mt-3">
            <FieldInput field={f} value={doc[f.key]} onChange={(v) => setDoc((d) => ({ ...d, [f.key]: v }))} />
          </div>
          {errors[f.key] && <p className="mt-2 text-sm text-red-700">{errors[f.key]}</p>}
        </div>
      ))}
      <div className="sticky bottom-0 flex flex-wrap items-center gap-3 border-t border-stone-200 bg-stone-50/95 py-4 backdrop-blur">
        <button type="submit" disabled={busy} className={primary}>
          {busy ? 'Saving…' : 'Save'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className={ghost}>
            Back to list
          </button>
        )}
        {message && <p className={`text-sm ${Object.keys(errors).length ? 'text-red-700' : 'text-sage'}`}>{message}</p>}
      </div>
    </form>
  );
}

function CollectionView({ collection }: { collection: CollectionKey }) {
  const def: CollectionDef = COLLECTIONS[collection];
  const [data, setData] = useState<Doc[] | Doc | null>(null);
  const [editing, setEditing] = useState<Doc | null>(null);
  const [error, setError] = useState('');

  const load = useCallback(() => {
    setData(null);
    request<Doc[] | Doc>(`/admin/data/${collection}`).then(setData, (e) => setError(e.message));
  }, [collection]);
  useEffect(() => {
    setEditing(null);
    load();
  }, [load]);

  if (error) return <p className="text-red-700">{error}</p>;
  if (!data) return <p className="text-muted">Loading…</p>;

  if (def.kind === 'single') return <Editor def={def} collection={collection} initial={data as Doc} onSaved={setData} />;

  if (editing) {
    return (
      <Editor
        def={def}
        collection={collection}
        initial={editing}
        onSaved={(saved) => {
          setEditing(saved);
          load();
        }}
        onCancel={() => setEditing(null)}
      />
    );
  }

  const items = data as Doc[];
  async function remove(item: Doc) {
    if (!confirm(`Delete "${itemTitle(def, item)}"? This cannot be undone.`)) return;
    await request(`/admin/data/${collection}/${item.id}`, { method: 'DELETE' });
    load();
  }

  return (
    <div>
      <button type="button" onClick={() => setEditing(emptyDoc(def))} className={primary}>
        <Plus className="size-4" /> Add new
      </button>
      {items.length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-stone-300 bg-white p-8 text-center text-muted">Nothing here yet.</p>
      ) : (
        <ul className="mt-6 divide-y divide-stone-200 overflow-hidden rounded-xl border border-stone-200 bg-white">
          {items.map((item) => {
            const hidden = ('published' in item && !item.published) || ('verified' in item && !item.verified);
            return (
              <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate font-medium text-ink">{itemTitle(def, item)}</p>
                  {hidden && <span className="text-xs font-semibold text-amber-700">Not shown publicly</span>}
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setEditing(item)} className={ghost}>
                    <Pencil className="size-4" /> Edit
                  </button>
                  <button type="button" onClick={() => remove(item)} className={`${ghost} text-red-700`} aria-label={`Delete ${itemTitle(def, item)}`}>
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function MessagesView() {
  const [messages, setMessages] = useState<ContactMessage[] | null>(null);
  const load = () => request<ContactMessage[]>('/admin/messages').then(setMessages);
  useEffect(() => {
    load();
  }, []);
  if (!messages) return <p className="text-muted">Loading…</p>;
  if (!messages.length) return <p className="rounded-xl border border-dashed border-stone-300 bg-white p-8 text-center text-muted">No messages yet.</p>;
  return (
    <ul className="space-y-4">
      {messages.map((m) => (
        <li key={m.id} className="rounded-xl border border-stone-200 bg-white p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-ink">{m.subject || '(no subject)'}</p>
              <p className="text-sm text-muted">
                {m.name} · <a href={`mailto:${m.email}`} className="text-brass-deep underline">{m.email}</a> · {new Date(m.receivedAt).toLocaleString()} · {m.lang.toUpperCase()}
              </p>
            </div>
            <button
              type="button"
              className={`${ghost} text-red-700`}
              onClick={async () => {
                if (!confirm('Delete this message?')) return;
                await request(`/admin/messages/${m.id}`, { method: 'DELETE' });
                load();
              }}
            >
              <Trash2 className="size-4" /> Delete
            </button>
          </div>
          <p className="mt-3 text-sm whitespace-pre-line">{m.message}</p>
        </li>
      ))}
    </ul>
  );
}

export default function AdminApp() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [view, setView] = useState<View>({ kind: 'collection', key: 'projects' });

  useEffect(() => {
    if (!session.get()) return setAuthed(false);
    request('/admin/session').then(
      () => setAuthed(true),
      () => setAuthed(false),
    );
  }, []);

  async function downloadBackup() {
    const data = await request('/admin/export');
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `majeedia-trust-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  if (authed === null) return null;
  if (!authed) return <Login onDone={() => setAuthed(true)} />;

  const current = view.kind === 'collection' ? COLLECTIONS[view.key] : null;
  const navItem = (active: boolean) =>
    `w-full rounded-lg px-3 py-2 text-left text-sm ${active ? 'bg-ink text-ivory' : 'text-ink-soft hover:bg-stone-200/60'}`;

  return (
    <div className="min-h-screen bg-stone-50 lg:flex">
      <aside className="border-b border-stone-200 bg-sand p-4 lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 lg:overflow-y-auto lg:border-r lg:border-b-0">
        <div className="flex items-center gap-2">
          <StarMark className="size-7 text-brass-deep" />
          <span className="font-serif text-lg text-ink">Trust admin</span>
        </div>
        <nav className="mt-6 grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-1">
          {COLLECTION_KEYS.map((key) => (
            <button key={key} type="button" onClick={() => setView({ kind: 'collection', key })} className={navItem(view.kind === 'collection' && view.key === key)}>
              {COLLECTIONS[key].label}
            </button>
          ))}
          <button type="button" onClick={() => setView({ kind: 'messages' })} className={`${navItem(view.kind === 'messages')} flex items-center gap-2`}>
            <Inbox className="size-4" /> Messages
          </button>
        </nav>
        <div className="mt-6 flex flex-wrap gap-2 border-t border-stone-300 pt-4 lg:flex-col">
          <a href="/en" target="_blank" rel="noopener" className={ghost}>
            <ExternalLink className="size-4" /> View website
          </a>
          <button type="button" onClick={downloadBackup} className={ghost}>
            <Download className="size-4" /> Download backup
          </button>
          <button
            type="button"
            onClick={() => {
              session.set('');
              setAuthed(false);
            }}
            className={ghost}
          >
            <LogOut className="size-4" /> Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-4 sm:p-8">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl">{current ? current.label : 'Messages'}</h1>
          <p className="mt-1 mb-8 text-sm text-muted">
            {current ? current.description : 'Messages sent through the contact form. Delete them once they have been answered.'}
          </p>
          {view.kind === 'collection' ? <CollectionView key={view.key} collection={view.key} /> : <MessagesView />}
        </div>
      </main>
    </div>
  );
}
