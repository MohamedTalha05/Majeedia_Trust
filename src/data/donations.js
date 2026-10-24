/**
 * MYFUNDBOX (Donorfit) donation links – the only place they are defined.
 * Every Donate button on the site reads from here.
 *
 * Status checked on 23 Oct 2026:
 *  - multi, sponsorWidow, medical, hifz: load correctly, but show "Test Mode".
 *    Switch the MYFUNDBOX account to live mode before launch.
 *  - education (ovd?qmx5qYSeeJEJ137BNiqbxA) and maintenance
 *    (ovd?fFGq3dXARuRL3Fb0XdtKRw) return "Invalid URL" on the live site.
 *    Until working links are issued, both point to the multi-cause checkout,
 *    which includes "Education Sponsorship" and "Madarsa - Maintenance
 *    Sponsorship". Paste the new links below when you have them.
 */
const MULTI = 'https://donate.myfundbox.com/multi?data=2Afko6t8UhbezCYW9xO40g';

export const DONATION_URLS = {
  multi: MULTI,
  education: MULTI,
  maintenance: MULTI,
  sponsorWidow: 'https://donate.myfundbox.com/ovd?7dLTBGL8Al9PU6cTUkOSUA',
  medical: 'https://donate.myfundbox.com/ovd?HyPkGhDik1BtmErMyo9N_g',
  hifz: 'https://donate.myfundbox.com/ovd?_1T8HZdbxZ4bFOh2M1GqEQ',
};

export const DONATION_PROVIDER = 'MYFUNDBOX';
