// Subtle Islamic geometric motifs (eight-pointed star / khatam), drawn in currentColor.
import { useId } from 'react';

export function GeometricPattern({ className = '', size = 56 }: { className?: string; size?: number }) {
  const id = useId().replace(/:/g, '');
  const c = size / 2;
  const h = size / 4; // half side of the square
  const d = h * Math.SQRT2; // half diagonal of the rotated square
  return (
    <svg aria-hidden className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={`geo-${id}`} width={size} height={size} patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <rect x={c - h} y={c - h} width={h * 2} height={h * 2} />
            <polygon points={`${c},${c - d} ${c + d},${c} ${c},${c + d} ${c - d},${c}`} />
            <path d={`M${c} 0V${c - d}M${c} ${size}V${c + d}M0 ${c}H${c - d}M${size} ${c}H${c + d}`} />
            <circle cx={c} cy={c} r={h * 0.45} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#geo-${id})`} />
    </svg>
  );
}

/** The Majeedia Trust mark: an eight-pointed star with a central circle. */
export function StarMark({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="9" y="9" width="22" height="22" rx="1" />
      <rect x="9" y="9" width="22" height="22" rx="1" transform="rotate(45 20 20)" />
      <circle cx="20" cy="20" r="5" />
    </svg>
  );
}

/** A thin ornamental divider. */
export function Ornament({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`flex items-center justify-center gap-4 text-brass ${className}`}>
      <span className="h-px w-16 bg-current opacity-60" />
      <StarMark className="size-5" />
      <span className="h-px w-16 bg-current opacity-60" />
    </div>
  );
}
