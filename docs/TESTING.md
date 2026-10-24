# Test report – Majeedia Trust website

**Date:** 23 October 2026
**Build:** `npm run build` (Vite 8.3.5, React 19.3.1, Node 24.16.0)
**Environment:** local production build served by `scripts/serve-dist.mjs`, which mimics Hostinger: folder `index.html`, `/about` → `/about/` 301, 404.html with a 404 status, gzip, and the cache headers from `.htaccess`. The browser was Microsoft Edge (Chromium), headless, driven through the DevTools protocol with real device emulation.

The live Hostinger deployment has **not** been tested yet, because nothing has been deployed. Section 6 of `DEPLOYMENT.md` lists the checks to run there.

## 1. Build

| Test | Result |
|---|---|
| `npm install` | ✅ 0 vulnerabilities |
| `npm run dev` | ✅ Dev server starts, and pages and modules load |
| `npm run build` | ✅ No errors or warnings. 22 pages pre-rendered, plus `404.html` and `sitemap.xml` |
| Each page has a unique `<title>` | ✅ The build fails if two pages share a title |
| No WordPress needed to render | ✅ `dist/` is static HTML/CSS/JS/images. The only server code is `api/contact.php`, used for forms |

## 2. Automated site check (`npm run check -- --external`)

These checks cover all 22 pages from `sitemap.xml` plus every internal link found while crawling:

| Check | Result |
|---|---|
| Every page returns 200 | ✅ |
| Exactly one `<h1>` per page | ✅ |
| Unique title and meta description (70–170 characters) | ✅ |
| Canonical URL equals the page's own `https://majeedia.org/...` URL | ✅ |
| Open Graph title, description, image and URL present | ✅ |
| Every `<img>` has alt text, and every `src`/`srcset` file exists | ✅ |
| Every CSS, JS and font file referenced exists | ✅ |
| Internal links resolve and use trailing slashes | ✅ |
| Every internal page is in `sitemap.xml`, and vice versa | ✅ |
| Unknown URL returns a 404 status, the "Page Not Found" page and `noindex` | ✅ |
| No placeholder text ("lorem ipsum", "Logoipsum", "TODO") | ✅ |
| **External links** (9) | ✅ All MYFUNDBOX links, X, LinkedIn, Instagram and Google Maps return 200. Facebook returns 400 to scripts, but was confirmed in a real browser ("Majeedia Trust \| Chennai \| Facebook"). |

## 3. Browser tests: every page × 3 viewports

The viewports were mobile 375×800 (2× DPR, touch), tablet 768×1024 and desktop 1440×900. Each page was scrolled top to bottom so that lazy-loaded images load.

| Check | Result |
|---|---|
| Horizontal overflow | ✅ None on any page at any width |
| Broken images | ✅ None |
| JavaScript errors and console errors | ✅ None (including React hydration) |
| Failed network requests | ✅ None. The 404 test page logs its own expected 404 status. |
| Direct load of each URL, with and without trailing slash | ✅ `/about` redirects to `/about/` |
| Tap targets under 24px | ✅ Only the radio/checkbox inputs (20px), and each sits inside a 40px-tall clickable label |

## 4. Interaction tests

| Test | Result |
|---|---|
| Mobile: menu hidden → opens (`aria-expanded`) → all links visible | ✅ |
| Mobile: tapping a link navigates without reload, menu closes, focus moves to main content | ✅ |
| Title and canonical update after client-side navigation | ✅ |
| Escape closes the mobile menu and the desktop Donate submenu | ✅ |
| Keyboard: first Tab reveals the "Skip to main content" link | ✅ |
| Keyboard: Donate submenu opens on focus. Toggle button has `aria-expanded`. | ✅ |
| Visible focus ring on links, buttons and inputs | ✅ |
| Header "Donate now" goes to the MYFUNDBOX multi-cause checkout | ✅ |
| Donate page: 7 Donate buttons, all going to MYFUNDBOX | ✅ |
| No `<iframe>` anywhere, and no payment fields on the site | ✅ |
| Contact form, empty submit: 4 field errors, focus on first invalid field, errors linked with `aria-describedby` | ✅ |
| Contact form: invalid email rejected | ✅ |
| Contact form with no mail script available (local): shows an error with the email address. It does **not** claim the message was sent. | ✅ |

## 5. Lighthouse 13.5 (mobile, simulated slow 4G)

| Page | Performance | Accessibility | Best Practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| `/` | 99 | 100 | 100 | 100 | 2.1 s | 0.001 |
| `/donate/` | 94 | 100 | 100 | 100 | 3.0 s | 0.001 |
| `/girls-hifz-sponsorship/` | 96 | 100 | 100 | 100 | 2.6 s | 0 |
| `/contact/` | 95 | 100 | 100 | 100 | 2.6 s | 0.02 |

Lighthouse's remaining suggestions are minor:
- about 50 KB of unused JavaScript per page (the site ships as a single bundle);
- the CSS file blocks rendering by up to 0.6 s on the slow-4G simulation;
- small image compression savings (20–55 KB).

## 6. Not tested yet (needs the live server or the trust's accounts)

| Item | Why | How to test |
|---|---|---|
| Sending email from the Contact and Volunteer forms | PHP is not available locally | Submit both forms on staging. Check that the email arrives at support@majeedia.org. |
| `.htaccess` redirects, HTTPS and caching on Hostinger | Needs Hostinger's server | `DEPLOYMENT.md` section 6 |
| Completing a real donation | The MYFUNDBOX account is in **Test Mode** | After switching to live mode, make a small donation for each cause |
| Real iPhone and Android devices | Tested with Chromium device emulation only | Open the staging site on real phones (Safari on iOS, Chrome on Android) |

## 7. Known issues on the trust's side

1. **MYFUNDBOX is in Test Mode.** All donation forms show "Test Mode", so donations will not be real until it is switched to live mode.
2. **The Education and Maintenance cause links are invalid** ("Invalid URL" on MYFUNDBOX). Their buttons temporarily use the multi-cause checkout, which lists both causes. Replace the links in `src/data/donations.js`.
3. The Imprint's registration number is blank on the old site, so it is left out until provided.
4. The mailbox `website@majeedia.org` (the sender address for form emails) must exist in Hostinger.

## How to rerun

```bash
npm run build
npm run check -- --external
npm run preview      # then open http://localhost:4173
```
