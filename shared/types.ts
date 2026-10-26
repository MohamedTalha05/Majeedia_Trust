// Content types shared by the Express server, the SSR renderer and the React client.

export type Lang = 'en';
export const LANGS: Lang[] = ['en'];
export const DEFAULT_LANG: Lang = 'en';

/** A text value. An empty string means "not yet provided". */
export interface I18n {
  en: string;
}

export const PROJECT_CATEGORIES = [
  'education',
  'madrasa',
  'girls-education',
  'widow-support',
  'disability-support',
  'welfare',
  'masjid',
  'community',
] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export const PROJECT_STATUSES = ['planned', 'ongoing', 'completed'] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export const REPORT_TYPES = [
  'annual-report',
  'fund-overview',
  'project-spending',
  'impact-report',
  'financial-summary',
] as const;
export type ReportType = (typeof REPORT_TYPES)[number];

export const UPDATE_TYPES = [
  'project-update',
  'education-story',
  'community-initiative',
  'annual-update',
  'milestone',
  'new-project',
  'impact-story',
] as const;
export type UpdateType = (typeof UPDATE_TYPES)[number];

export const LEDGER_TYPES = [
  'starting-fund',
  'family-contribution',
  'zakat-contribution',
  'maintenance-contribution',
  'beneficiary-support',
  'project-expense',
  'maintenance-expense',
  'masjid-project',
  'education-project',
  'other-allocation',
] as const;
export type LedgerType = (typeof LEDGER_TYPES)[number];
/** Ledger types that represent money coming into the fund (the rest are allocations). */
export const LEDGER_INFLOWS: LedgerType[] = ['starting-fund', 'family-contribution', 'zakat-contribution', 'maintenance-contribution'];

export interface Category {
  id: string;
  slug: I18n;
  title: I18n;
  summary: I18n;
  description: I18n;
  image: string;
  imageAlt: I18n;
  icon: string;
  projectCategories: ProjectCategory[];
  currentInitiatives: I18n;
  impact: I18n;
  order: number;
  published: boolean;
}

export interface Project {
  id: string;
  name: I18n;
  category: ProjectCategory;
  location: string;
  year: string;
  status: ProjectStatus;
  description: I18n;
  support: I18n;
  outcome: I18n;
  photos: string[];
  photoAlt: I18n;
  photoConsent: boolean;
  order: number;
  published: boolean;
}

export interface Stat {
  id: string;
  label: I18n;
  value: string;
  note: I18n;
  verified: boolean;
  order: number;
}

export interface Report {
  id: string;
  type: ReportType;
  title: I18n;
  year: string;
  summary: I18n;
  fileUrl: string;
  published: boolean;
}

export interface Update {
  id: string;
  slug: I18n;
  type: UpdateType;
  title: I18n;
  excerpt: I18n;
  body: I18n;
  date: string;
  image: string;
  imageAlt: I18n;
  photoConsent: boolean;
  published: boolean;
}

export interface Faq {
  id: string;
  question: I18n;
  answer: I18n;
  order: number;
  published: boolean;
}

export interface LedgerEntry {
  id: string;
  date: string;
  type: LedgerType;
  amount: number;
  note: I18n;
  verified: boolean;
  public: boolean;
}

export interface LegalInfo {
  legalName: I18n;
  registrationType: I18n;
  registrationNumber: I18n;
  jurisdiction: I18n;
  establishedDate: I18n;
  trustees: I18n;
  registeredAddress: I18n;
  charitableStatus: I18n;
  taxStatus: I18n;
  donationEligibility: I18n;
  zakatGovernance: I18n;
  imprintRepresentative: I18n;
  imprintContentResponsible: I18n;
  imprintPhone: string;
  imprintEmail: string;
  imprintRegister: I18n;
  imprintVatId: string;
  privacyController: I18n;
  hostingProvider: I18n;
}

export interface Settings {
  contactEmail: string;
  contactNote: I18n;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  supportButtonEnabled: boolean;
  supportButtonLabel: I18n;
  supportButtonUrl: string;
  photosAreIllustrative: boolean;
}

export interface ContactMessage {
  id: string;
  receivedAt: string;
  lang: Lang;
  name: string;
  email: string;
  subject: string;
  message: string;
}

/** Everything the public site needs, already filtered to published / verified items. */
export interface PublicContent {
  categories: Category[];
  projects: Project[];
  stats: Stat[];
  reports: Report[];
  updates: Update[];
  faqs: Faq[];
  ledger: LedgerEntry[];
  legal: LegalInfo;
  settings: Settings;
}

export interface SiteConfig {
  siteUrl: string;
}
