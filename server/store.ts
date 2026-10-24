// JSON-file content store. Each collection lives in DATA_DIR/<key>.json and is seeded
// from server/seed on first start. Writes are atomic (temp file + rename) and serialised.
import { existsSync } from 'node:fs';
import { copyFile, mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { COLLECTION_KEYS, type CollectionKey } from '../shared/schema';
import type { ContactMessage, PublicContent } from '../shared/types';
import { ROOT } from './paths';

export const DATA_DIR = path.resolve(ROOT, process.env.DATA_DIR ?? 'data');
const SEED_DIR = path.join(ROOT, 'server', 'seed');

type Doc = Record<string, any>;
const data = {} as Record<CollectionKey, Doc[] | Doc>;
let messages: ContactMessage[] = [];
let writeQueue: Promise<unknown> = Promise.resolve();

export async function initStore(): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  for (const key of COLLECTION_KEYS) {
    const file = path.join(DATA_DIR, `${key}.json`);
    if (!existsSync(file)) await copyFile(path.join(SEED_DIR, `${key}.json`), file);
    data[key] = JSON.parse(await readFile(file, 'utf8'));
  }
  const inbox = path.join(DATA_DIR, 'messages.json');
  messages = existsSync(inbox) ? JSON.parse(await readFile(inbox, 'utf8')) : [];
}

function persist(name: string, value: unknown): Promise<void> {
  const file = path.join(DATA_DIR, `${name}.json`);
  const run = async () => {
    const tmp = `${file}.${process.pid}.tmp`;
    await writeFile(tmp, JSON.stringify(value, null, 2), 'utf8');
    await rename(tmp, file);
  };
  const next = writeQueue.then(run, run);
  writeQueue = next.catch(() => undefined);
  return next;
}

export function getCollection(key: CollectionKey): Doc[] | Doc {
  return data[key];
}

export async function setCollection(key: CollectionKey, value: Doc[] | Doc): Promise<void> {
  data[key] = value;
  await persist(key, value);
}

export function getMessages(): ContactMessage[] {
  return messages;
}

export async function setMessages(next: ContactMessage[]): Promise<void> {
  messages = next;
  await persist('messages', next);
}

export function exportAll(): Record<string, unknown> {
  return { exportedAt: new Date().toISOString(), ...data, messages };
}

const byOrder = (a: Doc, b: Doc) => (a.order ?? 0) - (b.order ?? 0);
const byDateDesc = (a: Doc, b: Doc) => String(b.date ?? '').localeCompare(String(a.date ?? ''));

/** The public view of the content: unpublished items, unverified figures and non-consented photos are removed. */
export function getPublicContent(): PublicContent {
  const list = (key: CollectionKey) => getCollection(key) as Doc[];
  return {
    categories: list('categories').filter((c) => c.published).sort(byOrder),
    projects: list('projects')
      .filter((p) => p.published)
      .map((p) => (p.photoConsent ? p : { ...p, photos: [] }))
      .sort((a, b) => byOrder(a, b) || String(b.year).localeCompare(String(a.year))),
    stats: list('stats')
      .map((s) => (s.verified && s.value ? s : { ...s, value: '', note: { en: '' } }))
      .sort(byOrder),
    reports: list('reports').filter((r) => r.published).sort((a, b) => String(b.year).localeCompare(String(a.year))),
    updates: list('updates')
      .filter((u) => u.published)
      .map((u) => (u.photoConsent ? u : { ...u, image: '' }))
      .sort(byDateDesc),
    faqs: list('faqs').filter((f) => f.published).sort(byOrder),
    ledger: list('ledger')
      .filter((e) => e.verified && e.public)
      .map(({ note: _note, ...entry }) => ({ ...entry, note: { en: '' } })) as PublicContent['ledger'],
    legal: getCollection('legal') as PublicContent['legal'],
    settings: getCollection('settings') as PublicContent['settings'],
  } as PublicContent;
}
