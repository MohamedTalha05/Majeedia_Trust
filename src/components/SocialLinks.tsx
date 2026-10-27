// Social media icon links, driven by the CMS settings (only filled-in URLs are shown).
import type { ReactNode } from 'react';
import { useApp } from '../lib/app-context';

const ICONS: Record<string, ReactNode> = {
  Facebook: (
    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
  ),
  LinkedIn: (
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  ),
  Instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.3" />
    </>
  ),
  X: <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />,
};

export function SocialLinks({ label, linkClassName }: { label: string; linkClassName: string }) {
  const { content } = useApp();
  const s = content.settings;
  const links = [
    { name: 'Facebook', url: s.facebookUrl },
    { name: 'LinkedIn', url: s.linkedinUrl },
    { name: 'Instagram', url: s.instagramUrl },
    { name: 'X', url: s.xUrl },
  ].filter((x) => x.url);
  if (links.length === 0) return null;

  return (
    <ul aria-label={label} className="flex flex-wrap gap-3">
      {links.map((x) => (
        <li key={x.name}>
          <a
            href={x.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${x.name} (opens in a new tab)`}
            className={`flex size-10 items-center justify-center rounded-full transition-colors ${linkClassName}`}
          >
            <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="size-[1.125rem]">
              {ICONS[x.name]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
