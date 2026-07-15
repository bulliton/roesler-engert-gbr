import type { FC } from "react";
import { DIAMOND_CUT_SVG_PATHS } from "@/lib/brand/diamond-cut-paths";

type IconProps = { className?: string };

function DiamondCutIcon({
  cut,
  className,
}: IconProps & { cut: keyof typeof DIAMOND_CUT_SVG_PATHS }) {
  const { viewBox, d } = DIAMOND_CUT_SVG_PATHS[cut];

  return (
    <svg
      viewBox={viewBox}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}

export function BrilliantIcon({ className }: IconProps) {
  return <DiamondCutIcon cut="brilliant" className={className} />;
}

export function PrincessIcon({ className }: IconProps) {
  return <DiamondCutIcon cut="princess" className={className} />;
}

export function CushionIcon({ className }: IconProps) {
  return <DiamondCutIcon cut="cushion" className={className} />;
}

export function BaguetteIcon({ className }: IconProps) {
  return <DiamondCutIcon cut="baguette" className={className} />;
}

export function PearIcon({ className }: IconProps) {
  return <DiamondCutIcon cut="pear" className={className} />;
}

export function CarreIcon({ className }: IconProps) {
  return <DiamondCutIcon cut="carre" className={className} />;
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
