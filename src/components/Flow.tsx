// A numbered step chain (e.g. Family Land → Initial Fund → …). Vertical on small screens, horizontal on large.
import { ArrowDown, ArrowRight } from 'lucide-react';

interface Step {
  title: string;
  text?: string;
}

export function Flow({ steps, tone = 'light', label }: { steps: (Step | string)[]; tone?: 'light' | 'dark'; label: string }) {
  const items = steps.map((s) => (typeof s === 'string' ? { title: s } : s));
  const dark = tone === 'dark';
  // Long chains wrap into a 3-column grid on large screens; the step numbers carry the order.
  const grid = items.length > 5;
  return (
    <ol aria-label={label} className={`flex flex-col items-stretch gap-2 ${grid ? 'lg:grid lg:grid-cols-3 lg:gap-5' : 'lg:flex-row lg:gap-0'}`}>
      {items.map((step, i) => (
        <li key={step.title} className={`reveal flex flex-col items-center ${grid ? '' : 'lg:flex-1 lg:flex-row'}`}>
          <div
            className={`w-full rounded-2xl border p-5 text-center lg:h-full lg:p-6 ${
              dark ? 'border-ivory/15 bg-ivory/[0.04]' : 'border-line bg-white shadow-card'
            }`}
          >
            <span
              className={`mx-auto flex size-9 items-center justify-center rounded-full font-serif text-sm ${
                dark ? 'bg-brass/20 text-brass-soft' : 'bg-sand text-brass-deep'
              }`}
            >
              {i + 1}
            </span>
            <p className={`mt-3 font-serif text-lg leading-snug ${dark ? 'text-ivory' : 'text-ink'}`}>{step.title}</p>
            {step.text && <p className={`mt-2 text-sm leading-relaxed ${dark ? 'text-ivory/70' : 'text-muted'}`}>{step.text}</p>}
          </div>
          {i < items.length - 1 && (
            <span
              aria-hidden
              className={`flex shrink-0 items-center justify-center py-1 ${grid ? 'lg:hidden' : 'lg:px-2 lg:py-0'} ${dark ? 'text-brass' : 'text-brass-deep'}`}
            >
              <ArrowDown className="size-5 lg:hidden" />
              <ArrowRight className="hidden size-5 lg:block" />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
