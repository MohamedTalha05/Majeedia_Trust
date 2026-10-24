// Generates the site logo, favicon, touch icon, square logo and the default Open Graph image
// into public/, from the brand logo in assets-src/logo.webp.
// Usage: node scripts/generate-brand-assets.mjs
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const GREEN = '#0f3e22'; // logo green
const DEEP = '#0b2416';
const IVORY = '#fbf8f3';
const SOURCE = 'assets-src/logo.webp';
// The mosque icon occupies the left part of the source logo, before the wordmark.
const MARK = { left: 34, top: 44, width: 61, height: 63 };

// Recolours every visible pixel of a transparent image to one colour, keeping its alpha.
async function tint(input, hex) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  for (let i = 0; i < data.length; i += 4) [data[i], data[i + 1], data[i + 2]] = [r, g, b];
  return sharp(data, { raw: info }).png().toBuffer();
}

const logo = await sharp(SOURCE).trim().png().toBuffer();
await sharp(logo).webp({ lossless: true }).toFile('public/logo.webp');
await sharp(await tint(logo, IVORY)).webp({ lossless: true }).toFile('public/logo-light.webp');

const mark = await tint(await sharp(SOURCE).extract(MARK).png().toBuffer(), IVORY);
const icon = async (size, radius) => {
  const pad = Math.round(size * 0.18);
  const inner = await sharp(mark).resize(size - pad * 2, size - pad * 2, { fit: 'contain', background: '#0000' }).toBuffer();
  const bg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="${GREEN}"/></svg>`;
  return sharp(Buffer.from(bg)).composite([{ input: inner, top: pad, left: pad }]).png().toBuffer();
};
const fav = await icon(64, 14);
await writeFile(
  'public/favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><image width="64" height="64" href="data:image/png;base64,${fav.toString('base64')}"/></svg>\n`,
);
await sharp(await icon(180, 0)).toFile('public/apple-touch-icon.png');

const logoWide = await sharp(logo).resize({ width: 448 }).toBuffer();
const { height: wideH } = await sharp(logoWide).metadata();
await sharp({ create: { width: 512, height: 512, channels: 4, background: IVORY } })
  .composite([{ input: logoWide, top: Math.round((512 - wideH) / 2), left: 32 }])
  .png()
  .toFile('public/logo-512.png');

const ogLogo = await sharp(await tint(logo, IVORY)).resize({ width: 560 }).toBuffer();
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="${DEEP}"/>
  <text x="100" y="400" font-family="Georgia, serif" font-size="34" font-style="italic" fill="#a9d3b6">A family legacy. A structured fund. A lasting impact.</text>
  <rect x="100" y="460" width="64" height="2" fill="#a9d3b6"/>
  <text x="100" y="510" font-family="Segoe UI, Arial, sans-serif" font-size="24" letter-spacing="4" fill="${IVORY}" opacity="0.7">A FAMILY-LED CHARITABLE INITIATIVE</text>
</svg>`;
await sharp(Buffer.from(og))
  .composite([{ input: ogLogo, top: 120, left: 90 }])
  .jpeg({ quality: 86 })
  .toFile('public/og-image.jpg');
console.log('Brand assets written to public/');
