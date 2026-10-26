# Majeedia Trust

> **Static deployment (current setup).** The site is published to GitHub Pages as a static site.
> `npm run build` pre-renders every page from `data/*.json` into `dist/` (plus `404.html`, `sitemap.xml`, `robots.txt`), and
> `.github/workflows/deploy.yml` publishes it on every push to `main`. Use `npm run dev` to work locally.
>
> **Disabled for now** (code kept, marked `DISABLED`): the Express server and its JSON data store (`server/`), the admin panel
> (`src/admin/`, `/admin`) and the contact form (`src/pages/Contact.tsx`, which needs `/api/contact`). Content is edited directly in
> `data/*.json` and goes live on the next push. The sections below describe the full server setup for when it is switched back on. website

English website and content management system for **Majeedia Trust**, a family-led charitable initiative focused on responsible, structured and sustainable giving.

- **Frontend:** React 19, React Router 7, Tailwind CSS 4, server-side rendered for SEO and fast first paint
- **Backend:** Node.js + Express. It serves the REST API, the admin CMS, uploads, the sitemap and robots.txt, and renders every page on the server
- **Content storage:** JSON files on disk (no database to run or maintain)

## Quick start

```bash
npm install
cp .env.example .env      # then set ADMIN_PASSWORD, ADMIN_SECRET and SITE_URL
npm run dev               # http://localhost:3000
```

Production:

```bash
npm run build
npm start                 # serves dist/ with server-side rendering
```

Requires Node.js 20+.

## Project structure

```
server/          Express server: SSR, API, admin auth, uploads, sitemap/robots
  seed/          Initial content, copied into DATA_DIR on first start
shared/          Code used by both server and browser: types, routes, CMS schema
src/
  i18n/          All fixed website copy: en.ts, de.ts, legal-texts.ts
  pages/         One component per page
  components/    Header, footer, cards, flows, charts…
  admin/         The admin panel (loaded only at /admin)
  seo/head.ts    Titles, meta descriptions, canonical, Open Graph, JSON-LD
public/          Static files (optimised images, favicon, OG image)
assets-src/      Original photographs (run `npm run images` after changing them)
data/            Live content edited through the admin panel (git-ignored, back it up)
uploads/         Uploaded photos and PDFs (git-ignored, back it up)
```

## URLs

| Page | URL |
|---|---|
| Home | `/en` |
| About | `/en/about` |
| Our story | `/en/our-story` |
| What we support | `/en/what-we-support` (+ `/:area`) |
| Projects | `/en/projects` |
| Impact & transparency | `/en/impact-transparency` |
| Family fund | `/en/family-fund` |
| Long-term vision | `/en/long-term-vision` |
| Updates | `/en/updates` (+ `/:slug`) |
| FAQ | `/en/faq` |
| Contact | `/en/contact` |
| Legal status & governance | `/en/legal-status-governance` |
| Privacy | `/en/privacy-policy` |
| Imprint | `/en/imprint` |

`/` redirects to `/en`, and any old `/de/...` link redirects to `/en`. Routes are defined once in `shared/routes.ts`.

## Guide for family administrators

Go to **`/admin`** and sign in with the admin password.

| Section | What it controls |
|---|---|
| Support areas | The cards on "What We Support" and each area's page, including *current initiatives* and *impact* text |
| Projects | The searchable project directory |
| Impact figures | The numbers on the Impact page. **Only figures marked "Verified" are shown**; others display "[To be added]" |
| Reports | Annual reports, fund overviews, project spending, impact reports, financial summaries (upload the PDF) |
| Updates & stories | News and stories, each with its own page |
| FAQs | Questions and answers (also published as structured data for search engines) |
| Fund ledger | Contributions and allocations. Only entries marked *Verified* **and** *Include in public totals* appear, and only as totals by type |
| Legal & governance | Registration details, trustees, Impressum and privacy-policy details |
| Site settings | Contact email, social links, and the "Donate" button (links to the myfundbox donation page; can be switched off here) |
| Messages | Messages sent through the contact form |

The site is English-only, so every text field has a single English box.

**Content rules (please follow):**
- Only enter information you have verified. Leave anything uncertain empty: the website then shows "[To be added]".
- Never enter beneficiary names, addresses, phone numbers, bank details or ID documents.
- Photos of projects and stories only appear publicly after you tick **"Consent confirmed for photos"**.
- Uploaded images are automatically resized, converted to WebP and stripped of location (GPS) metadata.

Use **Download backup** in the admin panel regularly, and back up the `data/` and `uploads/` folders on the server.

## SEO and AI-search readiness

- Every page is server-rendered with a unique `<title>`, meta description, canonical URL, Open Graph tags and JSON-LD (`Organization`, `WebPage`/`AboutPage`/`ContactPage`/`FAQPage`, `BreadcrumbList`, `Article`).
- `/sitemap.xml` is generated from the live content; `/robots.txt` excludes `/admin` and `/api`.
- Content-wise, the FAQ explicitly answers what the Trust is, how it was established, how the fund works, how it is funded and whether it accepts donations.

## Security & privacy

- Admin access uses a password from `ADMIN_PASSWORD` with signed, expiring session tokens. Login and contact form are rate-limited, and the contact form has a spam honeypot.
- All admin input is validated against `shared/schema.ts`; unknown fields and unsafe links are dropped.
- In production a strict Content-Security-Policy and other security headers are sent (helmet).
- Fonts are self-hosted, and there are no analytics, tracking cookies or third-party embeds, so no cookie banner is needed. If analytics are added later, a consent mechanism must be added first.
- The privacy policy and imprint are templates that pull details from "Legal & governance". **They must be reviewed by a qualified legal adviser before launch.**

## Not yet verified (shown as "[To be added]")

Legal name and status, registration, trustees, address, tax status, donation eligibility, Zakat governance, Impressum details, contact email, hosting provider, impact figures (other than the initial fund of approximately ₹65 lakh and the ₹50,000 maintenance fund), projects, reports and updates.

The photographs are illustrative and do not show actual beneficiaries; a notice says so in the footer (it can be turned off in Site settings once real, consented photos are used).
