# Majeedia Trust – Website Audit (Phase 1)

Audit of the live WordPress site **https://majeedia.org/**, carried out on 23 October 2026.

**How it was audited:** raw HTML of every URL in the site's XML sitemap was downloaded and parsed (titles, meta, headings, links, images, forms). Pages were rendered in headless Microsoft Edge for screenshots. The MYFUNDBOX donation widgets were rendered in headless Edge, because they are JavaScript apps and their server HTML is empty.

**Stack today:** WordPress, the Astra theme and Elementor, plus SureForms (forms), SureCookie (cookie banner) and an SEO plugin that generates `sitemap_index.xml` and JSON-LD. Hosting is Hostinger.

---

## 1. Pages and URLs

`sitemap_index.xml` lists 23 pages, 1 post, 1 category and 4 form URLs. Every one of these returned HTTP 200.

### 1.1 Real content pages

| URL | Page title (current) | H1 | Role |
|---|---|---|---|
| `/` | Home - Majeedia Trust | *(none – hero heading is an H2)* | Homepage |
| `/about/` | About - Majeedia Trust | About Majeedia Trust | About Us |
| `/your-donations/` | Your donations - Majeedia Trust | Projects That Create Meaningful Change | Projects overview with 5 causes (nav: "Your donations") |
| `/general-donation/` | General Donations - Majeedia Trust | Every Contribution Helps Make a Difference | Education and Maintenance causes |
| `/sponsorship/` | Sponsorship – 2026 - Majeedia Trust | Your Support Can Change Someone's Journey | Destitute/Handicap, Medical and Girls' Hifz causes |
| `/contact/` | Contact - Majeedia Trust | Contact | Contact details, form and map |
| `/get-involved/` | Get Involved - Majeedia Trust | *(none)* | Ways to help and a volunteer application form (**not linked from the nav**) |
| `/imprint/` | Imprint - Majeedia Trust | Imprint | Legal |
| `/term-conditions/` | term-conditions - Majeedia Trust | term-conditions | Legal |
| `/privacy-policy/` | privacy-policy - Majeedia Trust | privacy-policy | Legal |

### 1.2 Cause information pages ("Learn More")

| URL | H1 | Links its "Donate Now" button to |
|---|---|---|
| `/education-learning/` | Education & Learning | `/education-donate/` |
| `/maintenance-support/` | MAINTENANCE SUPPORT | `/maintenance-donate/` |
| `/sponsor-a-widow-destitute-handicap/` | SPONSORSHIP SUPPORT | `/destitute-handicap-donate/` |
| `/medical-needs-sponsorship-2/` | MEDICAL SPONSORSHIP SUPPORT | `/medical-needs-sponsorship/` ⚠ (redirects back to this page itself) |
| `/girls-hifz-sponsorship/` | GIRLS' HIFZ SPONSORSHIP | `/girls-hifz-sponsorship-donate/` |

### 1.3 Cause donation pages (each embeds a MYFUNDBOX iframe)

| URL | H1 | Embedded donation URL |
|---|---|---|
| `/education-donate/` | Education & Learning | `https://donate.myfundbox.com/ovd?qmx5qYSeeJEJ137BNiqbxA` |
| `/maintenance-donate/` | MAINTENANCE SUPPORT | `https://donate.myfundbox.com/ovd?fFGq3dXARuRL3Fb0XdtKRw` |
| `/destitute-handicap-donate/` | Sponsor a Widow, Destitute Person or Person with a Disability | `https://donate.myfundbox.com/ovd?7dLTBGL8Al9PU6cTUkOSUA` |
| `/medical-needs-donate/` | Medical Needs – Sponsorship | `https://donate.myfundbox.com/ovd?HyPkGhDik1BtmErMyo9N_g` |
| `/girls-hifz-sponsorship-donate/` | Girls Hifz Sponsorship | `https://donate.myfundbox.com/ovd?_1T8HZdbxZ4bFOh2M1GqEQ` |

### 1.4 Unused, template or system URLs that are still indexed

| URL | What it is |
|---|---|
| `/our-projects-v1/` | Older draft of "Your donations". It is the **only page with the 6 "Areas of Work" cards** (Education, Food & Basic Support, Orphan Care, Healthcare, Emergency Relief, Community Development). It has a broken link to `/donate-pages/`. |
| `/donate-page/` | Leftover from the template: "Clients I've Helped", "Request A Quote", placeholder logos |
| `/gallery/` | Gallery of 13 photos (excluded from the rebuild, per the brief) |
| `/hello-world/`, `/category/uncategorized/` | Default WordPress post and category |
| `/form/…` (4 URLs) | SureForms form endpoints, including a "Request a quote" leftover from the template |

### 1.5 Differences from the requested page list

| Requested page | What exists on the live site |
|---|---|
| Home | `/` ✔ |
| About Us | `/about/` ✔ (nav label "About", footer label "About Us") |
| Our Work | No dedicated page. The "Areas of Work" content exists only on `/our-projects-v1/` (unlinked) and as six short blocks on `/about/`. |
| Our Projects | `/your-donations/` (H1 "Projects That Create Meaningful Change", nav label "Your donations") |
| Donate | No donation hub. The donation flow is split across `/general-donation/` and `/sponsorship/`, the 5 cause pages and the 5 donate pages. Header "Donate now" goes straight to the MYFUNDBOX multi-cause cart. |
| Contact | `/contact/` ✔ |
| Imprint / Terms / Privacy | `/imprint/`, `/term-conditions/`, `/privacy-policy/` ✔ |
| *(not requested)* | `/get-involved/` exists, with a volunteer form |

---

## 2. Header and navigation

- **Logo:** `cropped-majeedia-2108-copy-1.png`, which links to `/`. It shows a green mosque silhouette, "Majeedia" in green italic serif and "Trust" in black.
- **Menu:** Home · About · **Your donations ▾** (submenu: General Donations, Sponsorship) · Contact
- **CTA button:** "Donate now", dark green, linking to `https://donate.myfundbox.com/multi?data=2Afko6t8UhbezCYW9xO40g`
- The header sits transparently over the cream hero. A mobile menu comes from Astra.

## 3. Homepage sections (in order)

1. **Hero:** H2 "Creating Opportunities. Strengthening Communities." · H5 "Supporting People. Building Possibilities." · intro paragraph · buttons "Learn About Us" (`/about/`) and "Donate Now" (MYFUNDBOX multi) · three ticks: Community, Care, Opportunity. The image is `hero-image-1.png` (a man with two children reading outdoors), with no text over it.
2. **OUR FOCUS / What We Do:** five alternating image and text rows, numbered 01–04 and then "03." again (a numbering bug):
   Education & Learning → Maintenance → Sponsor a Destitute/Handicap → Medical Needs – Sponsorship → Girls' Hifz Sponsorship. Each has a "Learn More" link to its cause info page.
3. **OUR APPROACH / What Guides Our Work:** People First, Responsible Action and Long-Term Commitment. ⚠ The subtitle is leftover accounting-template text: *"With organized, up-to-date records, you can make decisions faster and manage your finances without worry."*
4. **VOICES & STORIES / Every Journey Has a Story:** three short quotes attributed to "Community Member" / "Community Partner". These appear to be generic sample quotes rather than attributable testimonials.
5. **Logo strip:** four "Logoipsum" placeholder SVGs from the template (`logo-1/3/4/5.svg`).
6. **GET INVOLVED / Be Part of the Journey:** short text, the `Book-In-Hand-Poster.png` image and the contact form.
7. **Footer.**

## 4. About Us (`/about/`)

The hero H1 reads "About Majeedia Trust" over `About-image-scaled.png`. Below that come "OUR PURPOSE / Why Majeedia Trust Exists" (4 paragraphs and an image) and "WHAT WE CARE ABOUT / Our Areas of Work" (Education, Food & Basic Support, Orphan Care, Healthcare, Emergency Relief, Community Development). Then come "As Featured In" (Logoipsum placeholders ⚠) and the CTA "Together, We Can Create More Possibilities", whose "Support Our Work" button goes to the MYFUNDBOX multi cart.

Full text has been captured. There is no separate mission or vision statement on the live site.

## 5. Our Work and projects content

- `/your-donations/`: hero, "Turning Care Into Action", then "Areas of Our Work" with the same 5 causes as the homepage. Each cause has "Learn About Us" (cause info page) and "Donate Now" (cause donate page) buttons.
- `/our-projects-v1/`: the 6 areas listed in section 4, each with its own two-paragraph description and images. All its "Learn About Us" buttons go to `/about/`, and the "Donate Now" buttons go to the multi cart.
- Each **cause info page** has an intro, 4–6 "Our Focus" cards, a "How Your Support Can Help" list, two images, a closing appeal and a CTA.
- Each **cause donate page** has a longer "Why it matters" text, 4 focus points, an appeal, the MYFUNDBOX iframe and a CTA.

**No statistics, beneficiary counts, project outcomes, dates or locations of projects appear anywhere on the site.**

## 6. Donations

**Provider:** Donorfit checkout widgets served from `donate.myfundbox.com`, with Razorpay (UPI/QR and card) as the payment processor. The organisation is shown inside the widget as **"Majeedia Educational & Charitable Trust"**. Amounts are in INR, the default is ₹100 monthly, and the donor can opt to cover a ₹5.36 fee.

### 6.1 Rendered status of every donation URL (headless Edge, 23 Oct 2026)

| Cause | URL | Status |
|---|---|---|
| Multi-cause cart ("Donate now", "Support Our Work") | `multi?data=2Afko6t8UhbezCYW9xO40g` | Loads ⚠ **shows "Test Mode"** |
| Education | `ovd?qmx5qYSeeJEJ137BNiqbxA` | ❌ **"Invalid URL"** |
| Maintenance | `ovd?fFGq3dXARuRL3Fb0XdtKRw` | ❌ **"Invalid URL"** |
| Sponsor a Widow/Handicap/Destitute | `ovd?7dLTBGL8Al9PU6cTUkOSUA` | Loads ⚠ "Test Mode" |
| Medical support – Sponsorship | `ovd?HyPkGhDik1BtmErMyo9N_g` | Loads ⚠ "Test Mode" |
| Girls-Hifz-Sponsorship | `ovd?_1T8HZdbxZ4bFOh2M1GqEQ` | Loads ⚠ "Test Mode" |

**The multi-cause cart lists these causes** under the heading "Sponsorships - 2026":
Sponsor a Widow/Handicap/Destitute · Medical support - Sponsorship · Girls-Hifz-Sponsorship · Education Sponsorship · Madarsa - Maintenance Sponsorship.

### 6.2 Compared with the requested categories

| Requested | What exists |
|---|---|
| General Donation | No standalone "general" form. The multi cart is used for this purpose. |
| Education Fund | Exists, but the cause link is invalid. It is reachable inside the multi cart. |
| Maintenance | Exists, but the cause link is invalid. It is reachable inside the multi cart (as "Madarsa - Maintenance"). |
| Sponsorship – 2026 | This is the name of the `/sponsorship/` page and the heading of the multi cart, not a separate form |
| Sponsor a Widow / a Destitute Person / a Person with a Disability | **One combined cause with one URL**, not three |
| Medical Needs Sponsorship | ✔ |
| Girls' Hifz Sponsorship | ✔ |

## 7. Contact information and forms

- **Address:** G6, Sathya Apartment No. 1, Dr. Thomas Road 2nd Street, T. Nagar, Chennai 600017
- **Phone:** +91 9444135055 · 044 – 24348300 (only the landline appears on the Imprint)
- **Email:** support@majeedia.org
- **Social:** Facebook `https://www.facebook.com/profile.php?id=61594431735624` · X `https://x.com/MajeediaTrusts` · LinkedIn `https://www.linkedin.com/company/majeediatrust/home/` · Instagram `https://www.instagram.com/majeedia_trust/`
- **Map:** a Google Maps embed of the address, blocked until cookie consent is given (SureCookie).
- **Contact form** (SureForms #1299, used on Home and Contact): Name\*, Email\*, Phone Number\*, "How Would You Like to Help?", Message\*. The Phone field's slug is still `number-of-employees` (a template leftover). Protection is hCaptcha/Turnstile, and the page markup contains "sitekey verification failed" strings, so **form delivery could not be verified**.
- **Volunteer form** (`/get-involved/`, SureForms #3171): Name\*, Email\*, Phone, Gender, Age Group, motivation\*, experience\*, availability\*, and "Which area would you like to support?". That last checkbox group renders with **no options**.

## 8. Footer

Logo · tagline ("Supporting people, creating opportunities, and strengthening communities through meaningful social initiatives. We believe meaningful change begins with care, understanding, and a willingness to take action") · **Information:** Imprint, Term-conditions, Privacy-policy, Contact · **Quick Links:** Home, About Us, Your donations, General Donations, Sponsorship – 2026, Contact · **Contact Info:** address and email · social icons · "Copyright © 2026 Majeedia Trust · Powered by Majeedia Trust".

## 9. Images

All 37 content images below downloaded successfully (HTTP 200).

| Image | Used on |
|---|---|
| `2026/09/cropped-majeedia-2108-copy-1.png`, `logo-withoutbg-.png`, favicons `cropped-majeedia-2108-copy-{32,180,192}` | Logo and favicon |
| `2026/09/hero-image-1.png` (1.4 MB PNG) | Home hero |
| `2026/09/About-image-scaled.png`, `contact-image-scaled.png`, `our-work-image-scaled.png`, `gallery-image-scaled.png` | Page hero banners (About, Contact, Donations/Sponsorship, Get Involved) |
| `2026/09/Education-Learning-scaled.jpg` | Education (Home, projects, cause pages; OG image) |
| `2026/10/young-hispanic-man-…-scaled.jpg` | Maintenance |
| `2026/10/medium-shot-friend-helping-disabled-man-scaled.jpg` | Destitute/Handicap |
| `2026/10/portrait-woman-working-healthcare-system-as-pediatrician-scaled.jpg` | Medical |
| `2026/10/pexels-akelaphotography-448877-scaled.jpg` | Girls' Hifz |
| `2026/09/charity-donations-help-support-giving-community-concept-scaled.jpg` | About |
| `2026/10/group-different-people-volunteering-foodbank-scaled.jpg` | Your donations hero |
| `2026/10/pexels-lagosfoodbank-8042458-scaled.jpg` | CTA sections |
| `2026/10/charity-volunteer-giving-helping-hands.jpg` | Maintenance donate |
| `2026/10/community-act-care-kindness…`, `pexels-tkirkgoz-…`, `pexels-harshad-pendse-…` | Education info |
| `2026/10/pexels-gustavo-fring-7156172`, `pexels-rdne-6647013` | Maintenance info |
| `2026/10/pexels-bobbydimas-…`, `pexels-constantin-amani-…` | Sponsor info |
| `2026/10/pexels-mk_photoz-…` (×2) | Medical info |
| `2026/10/pexels-kaybee-photography-…`, `pexels-quang-nguyen-vinh-…` | Hifz info |
| `2026/09/medium-shot-people-with-food-donations`, `2026/10/little-children-trick-treating-halloween`, `pexels-guylain-kipoke-…` | Our-projects-v1 areas (Food, Orphan, Emergency) |
| `2026/10/Book-In-Hand-Poster.png` | Home "Get Involved" |
| `2021/07/logo-1/3/4/5.svg` | **Placeholders ("Logoipsum"): do not reuse** |

The existing alt text consists of file names (for example "pexels akelaphotography 448877"). Most photos are stock images from Pexels or Freepik, plus a set of the trust's own photos (`WhatsApp-Image-2026-05-08…`) on the Gallery page.

## 10. SEO observations

- Titles follow the pattern "Page - Majeedia Trust", but several are raw slugs ("term-conditions", "privacy-policy") or internal names ("Our Projects v1", "Girls-Hifz-Sponsorship-Donate").
- Meta descriptions are auto-truncated body text cut mid-word, and several pages share the same description.
- The homepage has **no H1**. `/get-involved/` has no H1. Legal pages use the slug as the H1.
- Placeholder and template pages (`/hello-world/`, `/donate-page/`, `/our-projects-v1/`, `/form/…`) are indexed.
- The JSON-LD declares a `WebSite` with `author: Person` (generic plugin output). There is no proper `NGO`/`Organization` entity with contact details.
- `robots.txt` blocks `/wp-admin/` and points to `sitemap_index.xml`.

## 11. Third-party integrations

MYFUNDBOX / Donorfit (donations, with Razorpay inside it) · Google Maps (embed) · SureForms with hCaptcha/Turnstile · SureCookie consent · Google Fonts (Open Sans, Poppins) · Facebook, X, LinkedIn and Instagram profile links.

## 12. Content issues to resolve

1. **Donation links:** the Education and Maintenance cause URLs are invalid, the whole widget is in **Test Mode**, and the Medical "Donate Now" button loops back to its own info page.
2. The Privacy Policy names "Donorfit". This is accurate, since Donorfit is the widget behind donate.myfundbox.com, but it may be worth naming MYFUNDBOX/Razorpay too.
3. The Imprint shows "Registration Number:" with no value.
4. The legal name differs between sources: the widget shows "Majeedia Educational & Charitable Trust", while the site says "Majeedia Trust".
5. Template leftovers: the accounting subtitle, the Logoipsum logos, `/donate-page/`, the "Request a quote" form and the duplicate "03." numbering.
6. The testimonials are unattributed generic quotes.
7. The volunteer form's "area" question has no options.
8. "Hispanic" appears in an image file name and alt text. The file will be renamed and given a meaningful alt.
