// Generates responsive black & white WebP variants of the source photographs into public/images.
// All site photography is monochrome for a consistent, calm visual language.
// Usage: npm run images
import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = path.resolve('assets-src/images');
const OUT = path.resolve('public/images');
const WIDTHS = [640, 1280];

await mkdir(OUT, { recursive: true });
for (const file of await readdir(SRC)) {
  if (!/\.(jpe?g|png|webp)$/i.test(file)) continue;
  const name = file.replace(/\.[^.]+$/, '');
  for (const width of WIDTHS) {
    const target = path.join(OUT, `${name}-${width}.webp`);
    const info = await sharp(path.join(SRC, file))
      .resize({ width, withoutEnlargement: true })
      .grayscale()
      .webp({ quality: 74 })
      .toFile(target);
    console.log(`${path.basename(target)}  ${(info.size / 1024).toFixed(0)} KB`);
  }
}
