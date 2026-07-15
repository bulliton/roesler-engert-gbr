import { CIRCULAR_LOGO_DIAMOND_PATH } from "@/lib/brand/circular-logo-paths";

type DiamondIconProps = {
  className?: string;
  animate?: boolean;
};

export function DiamondIcon({ className = "", animate = false }: DiamondIconProps) {
  return (
    <svg
      viewBox="0 0 1638 1687"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={`${animate ? "brand-mark-enter" : ""} ${className}`}
      aria-hidden="true"
    >
      <path d={CIRCULAR_LOGO_DIAMOND_PATH} />
    </svg>
  );
}
