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
    notice: '',
    sections: [
      {
        title: 'Organisation Information',
        paragraphs: [
          'Majeedia Trust\nG6, Sathya Apartment No.1,\nDr. Thomas Road 2nd Street,\nT. Nagar, Chennai 600017',
          'Website: https://majeedia.org',
          'Email: support@majeedia.org',
          'Telephone: 044 \u2013 24348300',
        ],
      },
      {
        title: 'Registration Details',
        paragraphs: [
          'Registration Number:',
        ],
      },
      {
        title: 'Disclaimer \u2013 Website Content',
        paragraphs: [
          'Majeedia Trust endeavors to keep the information on this website accurate and up to date. However, information may occasionally be incomplete or require updates. If you identify an error or have a question about any content, please contact us.',
        ],
      },
      {
        title: 'Disclaimer \u2013 External Links',
        paragraphs: [
          'This website may contain links to external websites operated by third parties. Majeedia Trust does not control the content of those websites. Responsibility for the content of external websites rests with their respective operators.',
        ],
      },
      {
        title: 'Copyright',
        paragraphs: [
          'Unless otherwise stated, the text, photographs, graphics, and other materials created for this website are intended for use by Majeedia Trust. Reproduction, distribution, or other use of these materials may require prior permission from the relevant rights holder.',
          'Third-party materials remain the property of their respective owners. If you believe any material on this website infringes your rights, please contact us so that we can review the matter.',
        ],
      },
      {
        title: 'Donations and Charitable Activities',
        paragraphs: [
          'Majeedia Trust provides information about its charitable initiatives, including education support, sponsorship, medical assistance, and other community support activities.',
          'Online donations may be processed through our designated donation platform. Please refer to the applicable donation terms and privacy policy for further information about payment processing and personal data.',
        ],
      },
      {
        title: 'Contact for Legal and Website Enquiries',
        paragraphs: [
          'Majeedia Trust',
          'Email: support@majeedia.org',
          'Website: https://majeedia.org',
        ],
      },
    ],
  },
};

export const TERMS: Record<Lang, LegalText> = {
  en: {
    notice:
      'Items marked "[To be confirmed]" have not yet been verified by Majeedia Trust and should be reviewed before publication.',
    sections: [
      {
        title: '1. Introduction and Acceptance of Terms',
        paragraphs: [
          'Welcome to the Majeedia Trust website. By accessing or using this website, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use this website.',
          'These Terms and Conditions apply to all visitors and users of https://majeedia.org and govern your use of the website and any services or information provided through it.',
          'Majeedia Trust reserves the right to update these Terms and Conditions at any time. Any changes will be published on this page with a revised effective date. Continued use of the website after changes are published constitutes acceptance of the revised terms.',
        ],
      },
      {
        title: '2. About Majeedia Trust and This Website',
        paragraphs: [
          'Majeedia Trust is a family-led charitable initiative committed to responsible, transparent and sustainable giving. The Trust supports individuals, families and community projects across areas including education, widow support, girls\u2019 education, disability support, welfare and masjid projects.',
          'This website provides information about Majeedia Trust, its charitable activities, its family fund, and ways to support the Trust\u2019s work. It also facilitates online donations for live charitable programmes.',
          'Majeedia Trust operates as a family-led charitable initiative. [To be confirmed: details of formal registration, legal structure and jurisdiction will be published once officially verified.]',
        ],
      },
      {
        title: '3. Use of Website Content and Information',
        paragraphs: [
          'The information on this website is provided for general information purposes only. Majeedia Trust endeavours to keep the information accurate and up to date; however, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability or suitability of the information for any particular purpose.',
          'You may browse and share content from this website for personal, non-commercial and informational purposes, provided you attribute the content to Majeedia Trust and do not alter it.',
          'You must not use this website in any way that is unlawful, harmful, or that may bring Majeedia Trust into disrepute.',
        ],
      },
      {
        title: '4. Donations and Charitable Activities',
        paragraphs: [
          'Majeedia Trust accepts online donations for its live charitable programmes through a designated third-party donation platform. By making a donation, you agree to the terms and conditions of that platform as well as these Terms and Conditions.',
          'All donations are voluntary. Majeedia Trust will use donations responsibly in accordance with its charitable objectives. Donations are allocated to the charitable programmes and projects described on the website at the time of donation, unless Majeedia Trust communicates otherwise.',
          '[To be confirmed: whether donations are eligible for tax deductions or any other tax benefit under applicable law. No tax benefit should be assumed or promised unless officially confirmed.]',
          'Majeedia Trust does not guarantee any specific charitable outcome from a donation. Charitable results depend on many factors beyond the Trust\u2019s control.',
        ],
      },
      {
        title: '5. Online Donation Processing and Third-Party Payment Platforms',
        paragraphs: [
          'Online donations made through this website are processed by a third-party payment platform. Majeedia Trust does not directly collect or store your payment card details.',
          'By proceeding with an online donation, you acknowledge that you are subject to the terms, conditions and privacy policy of the third-party payment platform. Majeedia Trust is not responsible for any errors, losses or issues arising from the use of the third-party platform.',
          'If you have a question or concern about a donation payment, please contact us at support@majeedia.org.',
        ],
      },
      {
        title: '6. Sponsorship and Charitable Programme Information',
        paragraphs: [
          'Information about sponsorship and charitable programmes on this website is provided to describe Majeedia Trust\u2019s work and the people it supports. All information about beneficiaries is anonymised and aggregated to protect the dignity and privacy of the individuals concerned.',
          'Majeedia Trust reserves the right to adjust, close or modify any charitable programme at any time, subject to the responsible use of any funds already received.',
          '[To be confirmed: specific sponsorship terms, programme commitments and beneficiary criteria will be confirmed by Majeedia Trust before publication.]',
        ],
      },
      {
        title: '7. Intellectual Property and Copyright',
        paragraphs: [
          'Unless otherwise stated, all text, photographs, graphics, logos and other materials on this website are the property of Majeedia Trust or its licensors and are protected by applicable copyright and intellectual property laws.',
          'You may not reproduce, distribute, publish, transmit or create derivative works from any content on this website without prior written permission from Majeedia Trust, except where expressly permitted.',
          'Third-party materials used on this website remain the property of their respective owners. If you believe any content on this website infringes your intellectual property rights, please contact us at support@majeedia.org so that we may review the matter.',
        ],
      },
      {
        title: '8. External Website Links',
        paragraphs: [
          'This website may contain links to external websites operated by third parties. These links are provided for convenience and informational purposes only. Majeedia Trust does not endorse, control or take responsibility for the content, privacy practices or availability of any external website.',
          'Clicking on external links is at your own risk. We encourage you to read the terms and privacy policies of any external website you visit.',
        ],
      },
      {
        title: '9. Website Availability and Accuracy of Information',
        paragraphs: [
          'Majeedia Trust does not guarantee that this website will be available at all times or that it will be free from errors, interruptions or security vulnerabilities. We reserve the right to suspend, withdraw or restrict access to any part of the website at any time without notice.',
          'Information on this website may be updated or changed without notice. Only verified information is published; items still being confirmed are marked accordingly.',
        ],
      },
      {
        title: '10. Limitation of Liability',
        paragraphs: [
          'To the fullest extent permitted by applicable law, Majeedia Trust shall not be liable for any direct, indirect, incidental, consequential or special loss or damage arising from your use of, or reliance on, this website or its content.',
          'Nothing in these Terms and Conditions limits or excludes liability that cannot be excluded under applicable law, including liability for fraud, personal injury or death caused by negligence.',
          '[To be confirmed: specific liability provisions should be reviewed by a qualified legal adviser familiar with applicable law before publication.]',
        ],
      },
      {
        title: '11. Privacy and Personal Data',
        paragraphs: [
          'Majeedia Trust processes personal data in accordance with its Privacy Policy, which is available on this website. By using this website, you acknowledge and agree to the processing of your personal data as described in the Privacy Policy.',
          'Please do not send sensitive personal information such as identification documents, bank details or medical information through any contact form or email.',
        ],
      },
      {
        title: '12. Changes to These Terms',
        paragraphs: [
          'Majeedia Trust may update these Terms and Conditions from time to time to reflect changes in the law, our charitable activities or our website. The most current version will always be available at https://majeedia.org/en/terms-and-conditions.',
          'We encourage you to review these terms periodically. Material changes will be communicated on this page.',
        ],
      },
      {
        title: '13. Contact',
        paragraphs: [
          'If you have any questions about these Terms and Conditions, please contact us:',
          'Majeedia Trust\nG6, Sathya Apartment No. 1,\nDr. Thomas Road 2nd Street,\nT. Nagar, Chennai 600017',
          'Email: support@majeedia.org',
          'Website: https://majeedia.org',
          'Telephone: 044 \u2013 24348300',
        ],
      },
    ],
  },
};
