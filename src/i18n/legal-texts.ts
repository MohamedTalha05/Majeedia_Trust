// Privacy policy / Datenschutzerklärung and Imprint / Impressum.
// Tokens in {braces} are filled from the CMS "Legal & governance" settings, or shown as "[To be added]".
// These texts are a starting point and should be reviewed by a qualified legal adviser before launch.
import type { Lang } from '../../shared/types';

export interface LegalSection {
  title: string;
  paragraphs: string[];
}

export interface LegalText {
  notice: string;
  sections: LegalSection[];
}

export const PRIVACY: Record<Lang, LegalText> = {
  en: {
    notice:
      'This privacy policy will be finalised once the Trust’s legal details have been confirmed. Items marked “[To be added]” are still pending.',
    sections: [
      {
        title: '1. Who is responsible',
        paragraphs: ['The controller responsible for data processing on this website is: {controller}', 'Email: {email}'],
      },
      {
        title: '2. Overview',
        paragraphs: [
          'We process personal data only to the extent necessary to provide this website and to respond to enquiries. This website does not use analytics, advertising or tracking cookies, does not embed social media plugins, and loads its fonts from our own server rather than from third parties.',
        ],
      },
      {
        title: '3. Hosting and server log files',
        paragraphs: [
          'This website is hosted by: {hosting}.',
          'When you visit the website, our server automatically processes technical information that your browser transmits: IP address, date and time of the request, the page requested, the referring page, and browser and operating system information. This is necessary to deliver the website and to ensure its security and stability. The legal basis is Art. 6(1)(f) GDPR (our legitimate interest in operating a secure website). Log data is deleted as soon as it is no longer required for these purposes, unless it must be kept longer to investigate a specific security incident.',
        ],
      },
      {
        title: '4. Contact form and email',
        paragraphs: [
          'If you contact us using the contact form or by email, we process the details you provide (name, email address, subject and message) in order to answer your enquiry. The legal basis is your consent (Art. 6(1)(a) GDPR) and our legitimate interest in responding to enquiries (Art. 6(1)(f) GDPR). You may withdraw your consent at any time with effect for the future.',
          'We delete your enquiry once it has been dealt with, unless statutory retention obligations apply. Please do not send sensitive information such as identification documents or bank details through the form.',
        ],
      },
      {
        title: '5. Cookies and local storage',
        paragraphs: [
          'We do not set cookies for visitors to this website. The password-protected administration area uses your browser’s session storage solely to keep authorised administrators signed in; this is strictly necessary for that function and is cleared when the browser tab is closed.',
        ],
      },
      {
        title: '6. Protecting the people we support',
        paragraphs: [
          'We do not publish names, addresses, phone numbers, bank details, identification documents or other private information about beneficiaries. Identifiable photographs or stories are only published with appropriate consent.',
        ],
      },
      {
        title: '7. Recipients',
        paragraphs: [
          'We do not sell personal data. Data is only shared with service providers who support us in operating the website (such as our hosting provider) and who process it on our behalf under a data processing agreement (Art. 28 GDPR), or where we are legally required to do so.',
        ],
      },
      {
        title: '8. Your rights',
        paragraphs: [
          'You have the right to access your personal data (Art. 15 GDPR), to rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18), data portability (Art. 20) and to object to processing (Art. 21). Where processing is based on consent, you may withdraw it at any time (Art. 7(3)). You also have the right to lodge a complaint with a data protection supervisory authority (Art. 77 GDPR).',
          'To exercise your rights, please contact us at {email}.',
        ],
      },
      {
        title: '9. Changes',
        paragraphs: ['We will update this policy when our website or the legal requirements change.'],
      },
    ],
  },
};

export const IMPRINT: Record<Lang, LegalText> = {
  en: {
    notice: 'The imprint will be completed once the Trust’s legal details have been confirmed.',
    sections: [
      { title: 'Information pursuant to § 5 DDG', paragraphs: ['{legalName}', '{address}'] },
      { title: 'Represented by', paragraphs: ['{representative}'] },
      { title: 'Contact', paragraphs: ['Phone: {phone}', 'Email: {imprintEmail}'] },
      { title: 'Register entry', paragraphs: ['{register}'] },
      { title: 'VAT identification number', paragraphs: ['{vat}'] },
      { title: 'Responsible for content pursuant to § 18(2) MStV', paragraphs: ['{contentResponsible}'] },
      {
        title: 'Liability for content and links',
        paragraphs: [
          'We prepare the content of this website with care and publish only verified information. We cannot, however, guarantee that the content is complete, accurate and up to date at all times. This website contains links to external websites over whose content we have no control; the respective provider is always responsible for the content of linked pages. If we become aware of any infringement, we will remove such links immediately.',
        ],
      },
    ],
  },
};
