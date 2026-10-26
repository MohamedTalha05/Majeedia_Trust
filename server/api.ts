// REST API: public content + contact form, and the authenticated admin CMS endpoints.
import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import express, { type NextFunction, type Request, type Response } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import { COLLECTIONS, COLLECTION_KEYS, type CollectionKey } from '../shared/schema';
import { LANGS, type ContactMessage, type Lang } from '../shared/types';
import { ROOT } from './paths';
import { adminEnabled, checkPassword, issueToken, rateLimit, requireAdmin } from './security';
import {
  exportAll,
  getCollection,
  getMessages,
  getPublicContent,
  setCollection,
  setMessages,
} from './store';
import { sanitize, slugify, ValidationError } from './validate';

export const UPLOAD_DIR = path.resolve(ROOT, process.env.UPLOAD_DIR ?? 'uploads');

export const api = express.Router();
api.use(express.json({ limit: '200kb' }));
api.use((_req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

// ---------- Public ----------

api.get('/content', (_req, res) => res.json(getPublicContent()));

const contactLimiter = rateLimit(5, 15 * 60 * 1000);
api.post('/contact', contactLimiter, async (req, res) => {
  const body = req.body ?? {};
  // Honeypot: real visitors never fill the hidden "website" field.
  if (body.website) return res.json({ ok: true });
  const field = (key: string, max: number) => (typeof body[key] === 'string' ? body[key].trim().slice(0, max) : '');
  const msg: ContactMessage = {
    id: randomUUID(),
    receivedAt: new Date().toISOString(),
    lang: LANGS.includes(body.lang) ? (body.lang as Lang) : 'en',
    name: field('name', 200),
    email: field('email', 254),
    subject: field('subject', 300),
    message: field('message', 5000),
  };
  const errors: Record<string, string> = {};
  if (!msg.name) errors.name = 'required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(msg.email)) errors.email = 'invalid';
  if (msg.message.length < 5) errors.message = 'required';
  if (body.consent !== true) errors.consent = 'required';
  if (Object.keys(errors).length) return res.status(400).json({ errors });
  await setMessages([msg, ...getMessages()].slice(0, 5000));
  res.json({ ok: true });
});

// ---------- Admin ----------

const loginLimiter = rateLimit(10, 15 * 60 * 1000);
api.post('/admin/login', loginLimiter, (req, res) => {
  if (!adminEnabled()) return res.status(503).json({ error: 'Admin is not configured (set ADMIN_PASSWORD).' });
  if (!checkPassword(req.body?.password)) return res.status(401).json({ error: 'Incorrect password' });
  res.json({ token: issueToken() });
});

const admin = express.Router();
admin.use(requireAdmin);
api.use('/admin', admin);

admin.get('/session', (_req, res) => res.json({ ok: true }));
admin.get('/export', (_req, res) => {
  res.set('Content-Disposition', `attachment; filename="majeedia-trust-backup-${new Date().toISOString().slice(0, 10)}.json"`);
  res.json(exportAll());
});

function collectionParam(req: Request, res: Response): CollectionKey | null {
  const key = req.params.collection as CollectionKey;
  if (!COLLECTION_KEYS.includes(key)) {
    res.status(404).json({ error: 'Unknown collection' });
    return null;
  }
  return key;
}

const wrap =
  (fn: (req: Request, res: Response) => Promise<unknown>) => (req: Request, res: Response, next: NextFunction) =>
    fn(req, res).catch(next);

admin.get('/data/:collection', (req, res) => {
  const key = collectionParam(req, res);
  if (key) res.json(getCollection(key));
});

admin.post(
  '/data/:collection',
  wrap(async (req, res) => {
    const key = collectionParam(req, res);
    if (!key) return;
    const def = COLLECTIONS[key];
    if (def.kind !== 'list') return res.status(400).json({ error: 'Not a list collection' });
    const items = getCollection(key) as Record<string, any>[];
    const doc = sanitize(def, req.body ?? {}, items);
    const titleField = def.titleField ? doc[def.titleField] : undefined;
    const base = slugify(typeof titleField === 'object' ? titleField.en : String(titleField ?? ''));
    const id = base && !items.some((i) => i.id === base) ? base : randomUUID();
    const created = { id, ...doc };
    await setCollection(key, [...items, created]);
    res.status(201).json(created);
  }),
);

admin.put(
  '/data/:collection/:id',
  wrap(async (req, res) => {
    const key = collectionParam(req, res);
    if (!key) return;
    const items = getCollection(key) as Record<string, any>[];
    const index = Array.isArray(items) ? items.findIndex((i) => i.id === req.params.id) : -1;
    if (index < 0) return res.status(404).json({ error: 'Not found' });
    const doc = sanitize(COLLECTIONS[key], req.body ?? {}, items.filter((_, i) => i !== index));
    const updated = { id: items[index].id, ...doc };
    await setCollection(key, items.map((item, i) => (i === index ? updated : item)));
    res.json(updated);
  }),
);

admin.put(
  '/data/:collection',
  wrap(async (req, res) => {
    const key = collectionParam(req, res);
    if (!key) return;
    const def = COLLECTIONS[key];
    if (def.kind !== 'single') return res.status(400).json({ error: 'Not a single document' });
    const doc = sanitize(def, req.body ?? {});
    await setCollection(key, doc);
    res.json(doc);
  }),
);

admin.delete(
  '/data/:collection/:id',
  wrap(async (req, res) => {
    const key = collectionParam(req, res);
    if (!key) return;
    const items = getCollection(key) as Record<string, any>[];
    if (!Array.isArray(items)) return res.status(400).json({ error: 'Not a list collection' });
    await setCollection(key, items.filter((i) => i.id !== req.params.id));
    res.status(204).end();
  }),
);

admin.get('/messages', (_req, res) => res.json(getMessages()));
admin.delete(
  '/messages/:id',
  wrap(async (req, res) => {
    await setMessages(getMessages().filter((m) => m.id !== req.params.id));
    res.status(204).end();
  }),
);

// Uploads: images are re-encoded to black & white WebP to match the site's photography
// (re-encoding also strips EXIF/GPS metadata); PDFs are stored as-is.
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024, files: 1 } });
admin.post(
  '/upload',
  upload.single('file'),
  wrap(async (req, res) => {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file received' });
    await mkdir(UPLOAD_DIR, { recursive: true });
    const id = randomUUID();
    if (file.buffer.subarray(0, 5).toString() === '%PDF-') {
      const name = `${id}.pdf`;
      await writeFile(path.join(UPLOAD_DIR, name), file.buffer);
      return res.status(201).json({ url: `/uploads/${name}` });
    }
    if (!/^image\/(jpeg|png|webp)$/.test(file.mimetype)) {
      return res.status(400).json({ error: 'Only JPEG, PNG, WebP images or PDF documents are allowed.' });
    }
    const name = `${id}.webp`;
    try {
      await sharp(file.buffer)
        .rotate()
        .resize({ width: 1600, withoutEnlargement: true })
        .grayscale()
        .webp({ quality: 78 })
        .toFile(path.join(UPLOAD_DIR, name));
    } catch {
      return res.status(400).json({ error: 'The image could not be processed.' });
    }
    res.status(201).json({ url: `/uploads/${name}` });
  }),
);

api.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ValidationError) return res.status(400).json({ error: 'Please check the highlighted fields.', errors: err.errors });
  if (err instanceof multer.MulterError) return res.status(400).json({ error: err.message });
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});
