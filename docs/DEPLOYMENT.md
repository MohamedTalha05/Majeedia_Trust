# Deploying the Majeedia Trust website to Hostinger

This guide replaces the WordPress site at **majeedia.org** with the new static React site.

> **Do not start section 5 (Go live) until the trust has approved the launch and the backup in section 3 has been verified.**
> Sections 1–4 do not touch the live WordPress site.

The new site is plain HTML, CSS, JavaScript and images, with every page pre-rendered. It needs no WordPress, no database and no Node.js on the server. The only server-side code is `api/contact.php`, which emails form submissions.

---

## 1. Build the site (on your computer)

You need Node.js 20 or newer. It was built and tested with Node 24.

```bash
npm install
npm run build      # creates the dist/ folder
npm run check      # checks every page, link, image and SEO tag in dist/
```

`npm run check -- --external` also requests every external link (MYFUNDBOX, social profiles, Google Maps).

The **`dist/` folder is the complete website**. Its contents are what you upload.

```
dist/
  .htaccess          ← HTTPS, redirects, caching, 404 page  (hidden file – make sure it is uploaded)
  index.html         ← homepage
  about/index.html   ← one folder per page …
  404.html
  api/contact.php    ← form handler
  assets/            ← JavaScript, CSS, fonts
  images/            ← photos
  sitemap.xml, robots.txt, favicons, og-image.jpg
```

## 2. Before launch: things only the trust can do

| # | Task | Where |
|---|---|---|
| 1 | **Switch the MYFUNDBOX account from Test Mode to live mode.** Every donation form currently shows "Test Mode". | MYFUNDBOX dashboard |
| 2 | **Get working links for the Education and Maintenance causes.** The current ones show "Invalid URL". Paste them into `src/data/donations.js` and rebuild. Until then, both buttons go to the multi-cause checkout. | MYFUNDBOX dashboard |
| 3 | Create the mailbox **website@majeedia.org** so the contact form can send mail, or change `MAIL_FROM` in `public/api/contact.php` to an existing @majeedia.org address. | hPanel → Emails → Email Accounts |
| 4 | Optional: provide the trust's registration number for the Imprint page (`src/data/legal.js`). | – |

## 3. Back up the WordPress site (mandatory)

1. Log in to **hPanel** and go to **Websites → majeedia.org → Dashboard → Files → Backups**.
2. Click **Generate new backup** and wait for it to finish.
3. Download both the **Files backup** and the **Database backup** (choose the WordPress database, usually `u123456789_xxxx`).
4. **Verify the backup:**
   - The files archive opens and contains `wp-config.php`, `wp-content/uploads/` and `.htaccess`.
   - The database file (`.sql` or `.sql.gz`) is larger than a few hundred KB and contains `CREATE TABLE` lines when opened in a text editor.
5. Store both files in two places, for example your computer and Google Drive.

Also note the current **PHP version** (hPanel → Advanced → PHP Configuration). The form handler needs PHP 8.0 or newer.

## 4. Test on a staging subdomain (WordPress stays live)

1. hPanel → **Domains → Subdomains** → create `new.majeedia.org`. Hostinger creates a folder for it, for example `public_html/new` or `domains/majeedia.org/public_html/new`.
2. hPanel → **Security → SSL**: make sure an SSL certificate covers `new.majeedia.org`. It usually installs automatically within a few minutes.
3. Upload the **contents** of `dist/` (not the folder itself) into the subdomain folder:
   - **File Manager:** zip `dist/` on your computer, upload the zip, then right-click → **Extract**. Then open **Settings → Show hidden files** and confirm `.htaccess` is there.
   - **or FTP** (FileZilla): hPanel → Files → FTP Accounts shows the host, user and password. Upload everything inside `dist/`.
4. Protect the staging site from search engines and the public: hPanel → **Advanced → Password Protect Directories** → choose the subdomain folder.
5. Test, using the checklist in section 6, at `https://new.majeedia.org`.

## 5. Go live (only after approval and a verified backup)

The live site lives in the domain's `public_html` folder (in File Manager: `domains/majeedia.org/public_html` or just `public_html`).

1. In File Manager, create a folder **outside** `public_html`, for example `/home/<user>/wordpress-backup-2026-10-xx`. Keeping it outside `public_html` means the old WordPress cannot be reached from the web.
2. Select **everything** inside `public_html` (with hidden files shown) and **Move** it into that backup folder. If the staging subdomain folder is inside `public_html`, leave it there.
3. Upload the contents of `dist/` into `public_html` (as in step 4.3) and confirm `.htaccess` is present.
4. hPanel → **Performance → CDN** (if enabled): **Purge all cache**. If LiteSpeed Cache was used, purge it too.
5. Run the checks in section 6 on `https://majeedia.org`.
6. **Leave the WordPress database in place.** It is not used by the new site, and it makes rollback instant. Delete it only after about 30 days without problems.

### Domain and HTTPS

- The domain already points to Hostinger, so **no DNS changes are needed**.
- hPanel → **Security → SSL**: the existing certificate for `majeedia.org` and `www.majeedia.org` keeps working. The `.htaccess` file redirects all `http://` and `www.` requests to `https://majeedia.org`.
- After HTTPS has worked for a few days, you can enable HSTS by uncommenting the `Strict-Transport-Security` line in `.htaccess`.

### Search engines

1. **Google Search Console** → Sitemaps: remove `sitemap_index.xml` and submit `https://majeedia.org/sitemap.xml`.
2. The old URLs keep working: every page from the WordPress site keeps its address, and the rest redirect (301) as follows:

| Old URL | Redirects to |
|---|---|
| `/our-projects-v1/` | `/our-work/` |
| `/donate-page/`, `/donate-pages/` | `/donate/` |
| `/medical-needs-sponsorship/` | `/medical-needs-sponsorship-2/` |
| `/gallery/` | `/about/` |
| `/hello-world/`, `/category/…`, `/author/…`, `/feed/` | `/` |
| `/form/…` | `/contact/` |
| `sitemap_index.xml` and other WordPress sitemaps | `/sitemap.xml` |
| `/wp-admin`, `/wp-login.php`, `/xmlrpc.php` | 410 Gone |

## 6. Launch checklist

- [ ] Homepage and every menu item open. Refreshing any page (for example `/about/` or `/girls-hifz-sponsorship/`) works.
- [ ] `https://majeedia.org/about` (without the trailing slash) redirects to `/about/`.
- [ ] `http://majeedia.org` and `https://www.majeedia.org` redirect to `https://majeedia.org/`.
- [ ] An unknown address, for example `/abc/`, shows the "Page Not Found" page.
- [ ] Every **Donate** button opens the correct MYFUNDBOX page, and the account is no longer in **Test Mode**.
- [ ] Send a test message from the **Contact** page and the **Get Involved** volunteer form, and confirm both arrive at support@majeedia.org. Check the spam folder too.
- [ ] Old URLs redirect (try `/gallery/` and `/our-projects-v1/`).
- [ ] Test on a phone (Android and iPhone): the menu opens and closes and nothing scrolls sideways.
- [ ] Run Google PageSpeed Insights (https://pagespeed.web.dev) on the homepage.

## 7. Rollback (if something goes wrong)

The WordPress files and database are untouched, so rolling back takes a few minutes:

1. File Manager → create `/home/<user>/react-site-<date>` and move everything inside `public_html` into it.
2. Move everything from `/home/<user>/wordpress-backup-<date>` back into `public_html`, including hidden files such as WordPress's own `.htaccess`.
3. Purge the CDN or LiteSpeed cache.
4. Check that `https://majeedia.org` shows WordPress again.

If the WordPress files were lost, restore them with hPanel → **Backups → Restore** using the backup from section 3. That backup restores both files and database.

## 8. Contact form email

`api/contact.php` uses PHP's `mail()`, which Hostinger supports for addresses on your own domain. It includes these safeguards:

- a hidden honeypot field;
- a minimum fill-in time of 3 seconds;
- a limit of 5 messages per hour per IP address;
- a check that the request comes from the same domain;
- input validation and protection against email header injection.

If messages land in spam, open hPanel → **Emails → Email Accounts → DNS settings** and make sure the SPF and DKIM records are set. If `mail()` is unreliable on the plan, switch the script to authenticated SMTP using the mailbox password, for example with PHPMailer.

If the form cannot reach the script (for example while you run `npm run dev` locally, where there is no PHP), the form shows an error with the email address rather than claiming success.

## 9. Updating the site later

| To change… | Edit | Then |
|---|---|---|
| Donation links | `src/data/donations.js` | `npm run build` and upload `dist/` |
| Contact details, menu, social links | `src/data/site.js` | same |
| Cause text and images | `src/data/causes.js` | same |
| Areas of work | `src/data/areas.js` | same |
| Legal pages | `src/data/legal.js` | same |
| Page-specific text | `src/pages/*.jsx` | same |
| Add or replace a photo | Put the original in a folder, add an entry in `scripts/optimize-images.mjs`, then run `npm run images -- <folder>` | same |

When uploading an update, it is enough to upload the whole `dist/` again, overwriting the existing files. Old files in `assets/` are harmless.
