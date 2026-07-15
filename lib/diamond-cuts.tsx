import type { FC, SVGProps } from "react";

type IconProps = { className?: string };

const svgBase: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 100 100",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
};

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
};

export function BrilliantIcon({ className }: IconProps) {
  return (
    <svg {...svgBase} className={className}>
      <circle cx="50" cy="50" r="42" {...stroke} />
      <circle cx="50" cy="50" r="10" {...stroke} />
      <path
        d="M50 40 L50 8 M57.07 42.93 L79.7 20.3 M60 50 L92 50 M57.07 57.07 L79.7 79.7 M50 60 L50 92 M42.93 57.07 L20.3 79.7 M40 50 L8 50 M42.93 42.93 L20.3 20.3"
        {...stroke}
      />
    </svg>
  );
}

export function PrincessIcon({ className }: IconProps) {
  return (
    <svg {...svgBase} className={className}>
      <rect x="12" y="12" width="76" height="76" {...stroke} />
      <rect x="30" y="30" width="40" height="40" {...stroke} />
      <path
        d="M30 30 L12 12 M70 30 L88 12 M70 70 L88 88 M30 70 L12 88"
        {...stroke}
      />
      <path
        d="M50 30 L50 12 M70 50 L88 50 M50 70 L50 88 M30 50 L12 50"
        {...stroke}
      />
      <path d="M30 30 L70 70 M70 30 L30 70" {...stroke} strokeWidth={0.75} />
    </svg>
  );
}

export function CushionIcon({ className }: IconProps) {
  return (
    <svg {...svgBase} className={className}>
      <path
        d="M28 12 H72 Q88 12 88 28 V72 Q88 88 72 88 H28 Q12 88 12 72 V28 Q12 12 28 12 Z"
        {...stroke}
      />
      <circle cx="50" cy="50" r="10" {...stroke} />
      <path
        d="M50 40 L68 22 M50 40 L82 36 M50 40 L82 64 M50 40 L68 78 M50 40 L32 78 M50 40 L18 64 M50 40 L18 36 M50 40 L32 22"
        {...stroke}
        strokeWidth={0.75}
      />
    </svg>
  );
}

export function BaguetteIcon({ className }: IconProps) {
  return (
    <svg {...svgBase} className={className}>
      <rect x="36" y="10" width="28" height="80" {...stroke} />
      <rect x="42" y="22" width="16" height="56" {...stroke} />
      <path
        d="M42 22 L36 10 M58 22 L64 10 M58 78 L64 90 M42 78 L36 90"
        {...stroke}
      />
    </svg>
  );
}

export function PearIcon({ className }: IconProps) {
  return (
    <svg {...svgBase} className={className}>
      <path
        d="M50 6 C58 10 70 26 76 46 C82 66 70 88 50 92 C30 88 18 66 24 46 C30 26 42 10 50 6 Z"
        {...stroke}
      />
      <circle cx="50" cy="60" r="10" {...stroke} />
      <path
        d="M50 50 L50 18 M57.07 52.93 L72 38 M60 60 L80 58 M57.07 67.07 L74 76 M50 70 L50 86 M42.93 67.07 L26 76 M40 60 L20 58 M42.93 52.93 L28 38"
        {...stroke}
      />
    </svg>
  );
}

export function CarreIcon({ className }: IconProps) {
  return (
    <svg {...svgBase} className={className}>
      <rect x="12" y="12" width="76" height="76" {...stroke} />
      <rect x="24" y="24" width="52" height="52" {...stroke} />
      <rect x="36" y="36" width="28" height="28" {...stroke} />
      <path
        d="M24 24 L12 12 M76 24 L88 12 M76 76 L88 88 M24 76 L12 88"
        {...stroke}
      />
      <path d="M36 36 L64 64 M64 36 L36 64" {...stroke} strokeWidth={0.75} />
    </svg>
  );
}

export const DIAMOND_CUT_KEYS = [
  "brilliant",
  "princess",
  "cushion",
  "baguette",
  "pear",
  "carre",
] as const;

export type DiamondCutKey = (typeof DIAMOND_CUT_KEYS)[number];

export const diamondCutIcons: Record<
  DiamondCutKey,
  FC<{ className?: string }>
> = {
  brilliant: BrilliantIcon,
  princess: PrincessIcon,
  cushion: CushionIcon,
  baguette: BaguetteIcon,
  pear: PearIcon,
  carre: CarreIcon,
};
