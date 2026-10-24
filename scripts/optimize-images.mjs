/**
 * Converts the original photos into responsive WebP files in public/images/
 * and writes src/data/images.json (sizes used for srcset and width/height).
 *
 * Usage:  npm run images -- <folder-with-original-files>
 *
 * To add or replace an image: put the original file in that folder, add or
 * edit an entry in IMAGES below, run the command, then reference the `name`
 * from the page data (e.g. image: 'education-learning').
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SRC_DIR = process.argv[2];
if (!SRC_DIR) {
  console.error('Usage: npm run images -- <folder-with-original-files>');
  process.exit(1);
}

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'images');
const MANIFEST = path.join(ROOT, 'src', 'data', 'images.json');

const BANNER = [800, 1400, 2000];
const PHOTO = [480, 800, 1200];

// name: output file prefix · src: original file name · widths: generated sizes
const IMAGES = [
  // Page heroes (photo on the right, soft cream fade on the left)
  { name: 'hero-home', src: 'hero-image-1.png', widths: BANNER },
  { name: 'banner-about', src: 'About-image-scaled.png', widths: BANNER },
  { name: 'banner-contact', src: 'contact-image-scaled.png', widths: BANNER },
  { name: 'banner-get-involved', src: 'gallery-image-scaled.png', widths: BANNER },
  { name: 'banner-donations', src: 'our-work-image-scaled.png', widths: BANNER },

  // Causes
  { name: 'education-learning', src: 'Education-Learning-scaled.jpg', widths: PHOTO },
  { name: 'maintenance-volunteer', src: 'young-volunteer-scaled.jpg', widths: PHOTO },
  { name: 'sponsor-support', src: 'medium-shot-friend-helping-disabled-man-scaled.jpg', widths: PHOTO },
  { name: 'medical-care', src: 'portrait-woman-working-healthcare-system-as-pediatrician-scaled.jpg', widths: PHOTO },
  { name: 'girls-hifz', src: 'pexels-akelaphotography-448877-scaled.jpg', widths: PHOTO },

  // Supporting photos
  { name: 'community-charity', src: 'charity-donations-help-support-giving-community-concept-scaled.jpg', widths: PHOTO },
  { name: 'volunteers-team', src: 'group-different-people-volunteering-foodbank-scaled.jpg', widths: PHOTO },
  { name: 'volunteer-children', src: 'pexels-lagosfoodbank-8042458-scaled.jpg', widths: PHOTO },
  { name: 'helping-hands-laptop', src: 'charity-volunteer-giving-helping-hands.jpg', widths: PHOTO },
  { name: 'community-gathering', src: 'community-act-care-kindness-cinematic-style-scaled.jpg', widths: PHOTO },
  { name: 'children-slates', src: 'pexels-harshad-pendse-2158718535-35558791-scaled.jpg', widths: PHOTO },
  { name: 'classroom', src: 'pexels-tkirkgoz-11338994-scaled.jpg', widths: PHOTO },
  { name: 'donation-boxes', src: 'pexels-gustavo-fring-7156172-scaled.jpg', widths: PHOTO },
  { name: 'volunteer-sweeping', src: 'pexels-rdne-6647013-scaled.jpg', widths: PHOTO },
  { name: 'tricycle-wheelchair', src: 'pexels-bobbydimas-33001998-scaled.jpg', widths: PHOTO },
  { name: 'child-wheelchair', src: 'pexels-constantin-amani-2163985555-39726362-scaled.jpg', widths: PHOTO },
  { name: 'health-clinic', src: 'pexels-mk_photoz-2149411980-33127835.jpg', widths: PHOTO },
  { name: 'blood-pressure-check', src: 'pexels-mk_photoz-2149411980-33132346-scaled.jpg', widths: PHOTO },
  { name: 'girls-quran-reading', src: 'pexels-kaybee-photography-664870201-31528155-scaled.jpg', widths: PHOTO },
  { name: 'elder-girls-reading', src: 'pexels-quang-nguyen-vinh-222549-35105920-scaled.jpg', widths: PHOTO },
  { name: 'food-donations', src: 'medium-shot-people-with-food-donations-scaled.jpg', widths: PHOTO },
  { name: 'flood-relief', src: 'pexels-guylain-kipoke-504252962-36829317-scaled.jpg', widths: PHOTO },
  { name: 'girl-with-books', src: 'Book-In-Hand-Poster.png', widths: [400, 700] },

  // Photos from the trust's own gallery
  { name: 'trust-prayer-hall', src: 'WhatsApp-Image-2026-05-08-at-12.00.46-PM.jpeg', widths: [480, 800] },
  { name: 'trust-girls-gathering', src: 'WhatsApp-Image-2026-05-08-at-12.00.47-PM-1.jpeg', widths: [480, 800] },
  { name: 'trust-computer-room', src: 'WhatsApp-Image-2026-05-08-at-12.00.48-PM.jpeg', widths: [480, 800] },
];

fs.mkdirSync(OUT_DIR, { recursive: true });
const manifest = {};

for (const img of IMAGES) {
  const file = path.join(SRC_DIR, img.src);
  if (!fs.existsSync(file)) {
    console.warn(`MISSING  ${img.src}`);
    continue;
  }
  const meta = await sharp(file).rotate().metadata();
  const widths = img.widths.filter((w) => w < meta.width).concat(
    img.widths.some((w) => w >= meta.width) ? [meta.width] : [],
  );
  for (const w of widths) {
    await sharp(file).rotate().resize({ width: w }).webp({ quality: 72, effort: 5 })
      .toFile(path.join(OUT_DIR, `${img.name}-${w}.webp`));
  }
  manifest[img.name] = { width: meta.width, height: meta.height, widths };
  console.log(`ok       ${img.name} (${widths.join(', ')})`);
}

// Logo: transparent PNG, trimmed to the artwork, plus WebP
const logoSrc = path.join(SRC_DIR, 'logo-withoutbg-.png');
if (fs.existsSync(logoSrc)) {
  const trimmed = sharp(logoSrc).trim({ threshold: 20 });
  await trimmed.clone().resize({ width: 480 }).png({ compressionLevel: 9 }).toFile(path.join(OUT_DIR, 'logo.png'));
  await trimmed.clone().resize({ width: 480 }).webp({ quality: 90 }).toFile(path.join(OUT_DIR, 'logo.webp'));
  const m = await sharp(path.join(OUT_DIR, 'logo.png')).metadata();
  manifest.logo = { width: m.width, height: m.height, widths: [m.width] };
  console.log('ok       logo');
}

// Favicons and social sharing image
const icon = path.join(SRC_DIR, 'cropped-majeedia-2108-copy.png');
if (fs.existsSync(icon)) {
  const pub = path.join(ROOT, 'public');
  for (const s of [32, 180, 192, 512]) {
    await sharp(icon).resize(s, s).png().toFile(path.join(pub, s === 180 ? 'apple-touch-icon.png' : `favicon-${s}.png`));
  }
  console.log('ok       favicons');
}
const hero = path.join(SRC_DIR, 'hero-image-1.png');
if (fs.existsSync(hero)) {
  await sharp(hero).resize(1200, 630, { fit: 'cover', position: 'right' }).jpeg({ quality: 80 })
    .toFile(path.join(ROOT, 'public', 'og-image.jpg'));
  console.log('ok       og-image.jpg');
}

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`\nWrote ${Object.keys(manifest).length} entries to src/data/images.json`);
