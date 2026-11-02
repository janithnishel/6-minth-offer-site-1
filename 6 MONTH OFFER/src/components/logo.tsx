import { useId } from "react";

/**
 * Client Flow Business Solution brand mark in the light-yellow / golden suite:
 * left-facing head silhouette + banded "globe of thought" sphere + circuit drips.
 * Gradients: #FFD84D → #FFC61A → #F5B300 → #CA8A04 (no blues).
 */
export function BrandMark({ className = "h-10 w-10" }: { className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const head = `grad-head-${uid}`;
  const band = `grad-band-${uid}`;
  const bandAlt = `grad-band-alt-${uid}`;
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={head} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFC61A" />
          <stop offset="1" stopColor="#A16207" />
        </linearGradient>
        <linearGradient id={band} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFE98A" />
          <stop offset="1" stopColor="#F5B300" />
        </linearGradient>
        <linearGradient id={bandAlt} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFD84D" />
          <stop offset="1" stopColor="#CA8A04" />
        </linearGradient>
      </defs>

      {/* head silhouette (face profile to the left) */}
      <path
        d="M46 5C30 7 17.6 18.4 14.4 32.6c-1.7 7.6-.7 14.6 2.3 20.5L11 60.4l5.6 3.1-2.1 5.5 4.7 2.3-1.9 6.1c4.7 6.5 12.2 10 20.1 10.6l.3 7.5h13.5V5Z"
        fill={`url(#${head})`}
      />

      {/* sphere of banded ribbons */}
      <ellipse cx="60" cy="15" rx="10.5" ry="4.2" fill={`url(#${band})`} />
      <path d="M41 26q19 9 38 0" stroke={`url(#${bandAlt})`} strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M33.5 38q26.5 10 53 0" stroke={`url(#${band})`} strokeWidth="8.5" strokeLinecap="round" fill="none" />
      <path d="M31 50q29 10 58 0" stroke={`url(#${bandAlt})`} strokeWidth="8.5" strokeLinecap="round" fill="none" />
      <path d="M34.5 62q25.5 9 51 0" stroke={`url(#${band})`} strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M42 73q18 7 36 0" stroke={`url(#${bandAlt})`} strokeWidth="7" strokeLinecap="round" fill="none" />

      {/* circuit drips */}
      <g stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M48 80v8h-3.5v5" />
        <path d="M56 82v12" />
        <path d="M64 80v6h3.5v6" />
        <path d="M72 78v10" />
      </g>
      <g fill="#CA8A04">
        <circle cx="44.5" cy="94.5" r="2.1" />
        <circle cx="56" cy="95.5" r="2.1" />
        <circle cx="67.5" cy="93.5" r="2.1" />
        <circle cx="72" cy="89.5" r="2.1" />
      </g>
    </svg>
  );
}

export function Logo({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md";
  className?: string;
}) {
  const word = size === "md" ? "text-[26px]" : "text-[20px]";
  const sub = size === "md" ? "text-[15px]" : "text-[11.5px]";
  const mark = size === "md" ? "h-11 w-11" : "h-9 w-9";
  return (
    <span className={`flex items-center gap-2.5 select-none ${className}`}>
      <BrandMark className={mark} />
      <span className="flex flex-col leading-none">
        <span className={`font-display font-extrabold tracking-[-0.02em] ${word}`}>
          <span className="text-ink dark:text-white">Client</span>
          <span className="text-brand-600 dark:text-flow-soft">{" Flow"}</span>
        </span>
        <span className={`mt-1 flex flex-wrap items-baseline gap-x-1.5 ${sub}`}>
          <span className="font-display font-extrabold tracking-[0.02em] text-brand-600 dark:text-flow-soft">
            Business Solution
          </span>
          <span className="font-body font-semibold text-stone-500 dark:text-stone-400">
            by IntuVision<span className="align-super text-[0.6em]">®</span>
          </span>
        </span>
      </span>
    </span>
  );
}
