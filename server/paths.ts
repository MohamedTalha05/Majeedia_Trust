import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** Project root (one level above /server). */
export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
