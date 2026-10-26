// CMS schema: drives both the admin editing forms and server-side validation.
import {
  LEDGER_TYPES,
  PROJECT_CATEGORIES,
  PROJECT_STATUSES,
  REPORT_TYPES,
  UPDATE_TYPES,
} from './types';

export type FieldType =
  | 'text'
  | 'textarea'
  | 'url'
  | 'email'
  | 'date'
  | 'number'
  | 'boolean'
  | 'select'
  | 'multiselect'
  | 'image'
  | 'images'
  | 'i18n'
  | 'i18n-textarea'
  | 'i18n-slug';

export interface Field {
  key: string;
  type: FieldType;
  label: string;
  help?: string;
  options?: readonly string[];
  required?: boolean;
  /** For i18n-slug: the i18n field the slug is generated from when left empty. */
  from?: string;
}

export interface CollectionDef {
  label: string;
  description: string;
  kind: 'list' | 'single';
  /** Field shown as the item title in admin lists. */
  titleField?: string;
  fields: Field[];
}

const PUBLISHED: Field = {
  key: 'published',
  type: 'boolean',
  label: 'Published',
  help: 'Only published items appear on the public website.',
};
const ORDER: Field = { key: 'order', type: 'number', label: 'Display order', help: 'Lower numbers appear first.' };
const CONSENT: Field = {
  key: 'photoConsent',
  type: 'boolean',
  label: 'Consent confirmed for photos',
  help: 'Photos are only shown publicly when you confirm that everyone identifiable has given consent.',
};

export const COLLECTIONS = {
  categories: {
    label: 'Support areas',
    description: 'The areas shown on "What We Support".',
    kind: 'list',
    titleField: 'title',
    fields: [
      { key: 'title', type: 'i18n', label: 'Title', required: true },
      { key: 'slug', type: 'i18n-slug', label: 'URL slug', from: 'title', help: 'Leave empty to generate from the title.' },
      { key: 'summary', type: 'i18n-textarea', label: 'Short description' },
      { key: 'description', type: 'i18n-textarea', label: 'Full description', help: 'Separate paragraphs with an empty line.' },
      { key: 'image', type: 'image', label: 'Image' },
      { key: 'imageAlt', type: 'i18n', label: 'Image description (alt text)' },
      {
        key: 'icon',
        type: 'select',
        label: 'Icon',
        options: ['heart-handshake', 'book-open', 'book-marked', 'graduation-cap', 'accessibility', 'users', 'landmark', 'sparkles'],
      },
      { key: 'projectCategories', type: 'multiselect', label: 'Related project categories', options: PROJECT_CATEGORIES },
      { key: 'currentInitiatives', type: 'i18n-textarea', label: 'Current initiatives', help: 'Verified information only.' },
      { key: 'impact', type: 'i18n-textarea', label: 'Impact information', help: 'Verified information only.' },
      ORDER,
      PUBLISHED,
    ],
  },
  projects: {
    label: 'Projects',
    description: 'The searchable project directory. Never include beneficiary names or addresses.',
    kind: 'list',
    titleField: 'name',
    fields: [
      { key: 'name', type: 'i18n', label: 'Project name', required: true },
      { key: 'category', type: 'select', label: 'Category', options: PROJECT_CATEGORIES, required: true },
      { key: 'location', type: 'text', label: 'Location', help: 'Town or region only, never a personal address.' },
      { key: 'year', type: 'text', label: 'Year' },
      { key: 'status', type: 'select', label: 'Status', options: PROJECT_STATUSES },
      { key: 'description', type: 'i18n-textarea', label: 'Description' },
      { key: 'support', type: 'i18n-textarea', label: 'Support provided' },
      { key: 'outcome', type: 'i18n-textarea', label: 'Outcome' },
      { key: 'photos', type: 'images', label: 'Photos' },
      { key: 'photoAlt', type: 'i18n', label: 'Photo description (alt text)' },
      CONSENT,
      ORDER,
      PUBLISHED,
    ],
  },
  stats: {
    label: 'Impact figures',
    description: 'Figures shown on the Impact page. Unverified figures display as "[To be added]".',
    kind: 'list',
    titleField: 'label',
    fields: [
      { key: 'label', type: 'i18n', label: 'Label', required: true },
      { key: 'value', type: 'text', label: 'Value', help: 'e.g. "12" or "≈ ₹65 lakh". Leave empty if unknown.' },
      { key: 'note', type: 'i18n', label: 'Note' },
      { key: 'verified', type: 'boolean', label: 'Verified', help: 'Only verified figures are shown publicly.' },
      ORDER,
    ],
  },
  reports: {
    label: 'Reports',
    description: 'Annual reports, fund overviews, spending, impact reports and financial summaries.',
    kind: 'list',
    titleField: 'title',
    fields: [
      { key: 'title', type: 'i18n', label: 'Title', required: true },
      { key: 'type', type: 'select', label: 'Report type', options: REPORT_TYPES, required: true },
      { key: 'year', type: 'text', label: 'Year' },
      { key: 'summary', type: 'i18n-textarea', label: 'Summary' },
      { key: 'fileUrl', type: 'url', label: 'Document link (PDF)', help: 'Upload a PDF in "Files" and paste its address here.' },
      PUBLISHED,
    ],
  },
  updates: {
    label: 'Updates & stories',
    description: 'News, project updates and stories. Obtain consent before publishing identifiable people.',
    kind: 'list',
    titleField: 'title',
    fields: [
      { key: 'title', type: 'i18n', label: 'Title', required: true },
      { key: 'slug', type: 'i18n-slug', label: 'URL slug', from: 'title', help: 'Leave empty to generate from the title.' },
      { key: 'type', type: 'select', label: 'Type', options: UPDATE_TYPES },
      { key: 'date', type: 'date', label: 'Date' },
      { key: 'excerpt', type: 'i18n-textarea', label: 'Short summary' },
      { key: 'body', type: 'i18n-textarea', label: 'Full text', help: 'Separate paragraphs with an empty line.' },
      { key: 'image', type: 'image', label: 'Image' },
      { key: 'imageAlt', type: 'i18n', label: 'Image description (alt text)' },
      CONSENT,
      PUBLISHED,
    ],
  },
  faqs: {
    label: 'FAQs',
    description: 'Frequently asked questions. Answers must only use verified information.',
    kind: 'list',
    titleField: 'question',
    fields: [
      { key: 'question', type: 'i18n', label: 'Question', required: true },
      { key: 'answer', type: 'i18n-textarea', label: 'Answer' },
      ORDER,
      PUBLISHED,
    ],
  },
  ledger: {
    label: 'Fund ledger',
    description:
      'Record contributions and allocations. Only entries marked both "verified" and "show publicly" appear in the public fund overview, and only as totals.',
    kind: 'list',
    titleField: 'type',
    fields: [
      { key: 'date', type: 'date', label: 'Date', required: true },
      { key: 'type', type: 'select', label: 'Entry type', options: LEDGER_TYPES, required: true },
      { key: 'amount', type: 'number', label: 'Amount (₹)', required: true },
      { key: 'note', type: 'i18n', label: 'Internal note', help: 'Never include beneficiary names.' },
      { key: 'verified', type: 'boolean', label: 'Verified' },
      { key: 'public', type: 'boolean', label: 'Include in public totals' },
    ],
  },
  legal: {
    label: 'Legal & governance',
    description:
      'Only enter information confirmed by official documents. Empty fields display as "[To be added]".',
    kind: 'single',
    fields: [
      { key: 'legalName', type: 'i18n', label: 'Legal name' },
      { key: 'registrationType', type: 'i18n', label: 'Registration type' },
      { key: 'registrationNumber', type: 'i18n', label: 'Registration number' },
      { key: 'jurisdiction', type: 'i18n', label: 'Country / jurisdiction' },
      { key: 'establishedDate', type: 'i18n', label: 'Date of establishment' },
      { key: 'trustees', type: 'i18n-textarea', label: 'Trustees / governance' },
      { key: 'registeredAddress', type: 'i18n-textarea', label: 'Registered address' },
      { key: 'charitableStatus', type: 'i18n', label: 'Charitable status' },
      { key: 'taxStatus', type: 'i18n', label: 'Tax status' },
      { key: 'donationEligibility', type: 'i18n', label: 'Donation eligibility' },
      { key: 'zakatGovernance', type: 'i18n-textarea', label: 'Zakat governance' },
      { key: 'imprintRepresentative', type: 'i18n', label: 'Imprint: represented by' },
      { key: 'imprintContentResponsible', type: 'i18n', label: 'Imprint: responsible for content' },
      { key: 'imprintPhone', type: 'text', label: 'Imprint: phone' },
      { key: 'imprintEmail', type: 'email', label: 'Imprint: email' },
      { key: 'imprintRegister', type: 'i18n', label: 'Imprint: register entry' },
      { key: 'imprintVatId', type: 'text', label: 'Imprint: VAT ID (if any)' },
      { key: 'privacyController', type: 'i18n-textarea', label: 'Privacy: data controller (name & address)' },
      { key: 'hostingProvider', type: 'i18n', label: 'Privacy: hosting provider' },
    ],
  },
  settings: {
    label: 'Site settings',
    description: 'Contact details, social links and future support options.',
    kind: 'single',
    fields: [
      { key: 'contactEmail', type: 'email', label: 'Public contact email' },
      { key: 'contactNote', type: 'i18n-textarea', label: 'Contact page note' },
      { key: 'facebookUrl', type: 'url', label: 'Facebook URL' },
      { key: 'instagramUrl', type: 'url', label: 'Instagram URL' },
      { key: 'linkedinUrl', type: 'url', label: 'LinkedIn URL' },
      { key: 'youtubeUrl', type: 'url', label: 'YouTube URL' },
      {
        key: 'supportButtonEnabled',
        type: 'boolean',
        label: 'Show support button',
        help: 'Only enable once supporting the Trust is legally and operationally approved.',
      },
      { key: 'supportButtonLabel', type: 'i18n', label: 'Support button label' },
      { key: 'supportButtonUrl', type: 'url', label: 'Support button link' },
      {
        key: 'photosAreIllustrative',
        type: 'boolean',
        label: 'Show "photographs are illustrative" notice',
      },
    ],
  },
} satisfies Record<string, CollectionDef>;

export type CollectionKey = keyof typeof COLLECTIONS;
export const COLLECTION_KEYS = Object.keys(COLLECTIONS) as CollectionKey[];
