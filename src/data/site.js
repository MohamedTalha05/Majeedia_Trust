// Organisation details used across the site (header, footer, contact, SEO).
export const SITE = {
  name: 'Majeedia Trust',
  url: 'https://majeedia.org',
  tagline: 'Empowering Communities Through Education, Care, and Opportunity.',
  footerText:
    'Supporting people, creating opportunities, and strengthening communities through meaningful social initiatives. We believe meaningful change begins with care, understanding, and a willingness to take action.',
  email: 'support@majeedia.org',
  phones: [
    { label: '+91 9444135055', href: 'tel:+919444135055' },
    { label: '044 – 24348300', href: 'tel:+914424348300' },
  ],
  address: {
    lines: ['G6, Sathya Apartment No. 1,', 'Dr. Thomas Road 2nd Street,', 'T. Nagar, Chennai 600017'],
    street: 'G6, Sathya Apartment No. 1, Dr. Thomas Road 2nd Street',
    locality: 'T. Nagar, Chennai',
    region: 'Tamil Nadu',
    postalCode: '600017',
    country: 'IN',
  },
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=G6%2C+Sathya+Apartment+No.+1%2C+Dr.+Thomas+Road+2nd+Street%2C+T.+Nagar%2C+Chennai+600017',
  social: [
    { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61594431735624' },
    { name: 'X', href: 'https://x.com/MajeediaTrusts' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/majeediatrust/home/' },
    { name: 'Instagram', href: 'https://www.instagram.com/majeedia_trust/' },
  ],
};

// Main navigation. `children` render as a dropdown on desktop.
export const NAV = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about/' },
  { label: 'Our Work', to: '/our-work/' },
  { label: 'Our Projects', to: '/your-donations/' },
  {
    label: 'Donate',
    to: '/donate/',
    children: [
      { label: 'All Ways to Donate', to: '/donate/' },
      { label: 'General Donations', to: '/general-donation/' },
      { label: 'Sponsorship – 2026', to: '/sponsorship/' },
    ],
  },
  { label: 'Contact', to: '/contact/' },
];

export const FOOTER_INFO = [
  { label: 'Imprint', to: '/imprint/' },
  { label: 'Terms & Conditions', to: '/term-conditions/' },
  { label: 'Privacy Policy', to: '/privacy-policy/' },
  { label: 'Contact', to: '/contact/' },
];

export const FOOTER_QUICK = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about/' },
  { label: 'Our Work', to: '/our-work/' },
  { label: 'Our Projects', to: '/your-donations/' },
  { label: 'General Donations', to: '/general-donation/' },
  { label: 'Sponsorship – 2026', to: '/sponsorship/' },
  { label: 'Get Involved', to: '/get-involved/' },
];
