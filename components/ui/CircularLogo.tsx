import {
  CIRCULAR_LOGO_CENTER,
  CIRCULAR_LOGO_DIAMOND_PATH,
  CIRCULAR_LOGO_TEXT_PATHS,
} from "@/lib/brand/circular-logo-paths";

type CircularLogoProps = {
  className?: string;
  size?: number;
};

export function CircularLogo({ className = "", size = 148 }: CircularLogoProps) {
  const { x: cx, y: cy } = CIRCULAR_LOGO_CENTER;

  return (
    <svg
      viewBox="0 0 1638 1687"
      width={size}
      height={size}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-white ${className}`}
      role="img"
      aria-label="Rösler & Engert"
    >
      <path d={CIRCULAR_LOGO_DIAMOND_PATH} />
      <g transform={`translate(${cx} ${cy})`}>
        <g transform={`translate(${-cx} ${-cy})`}>
          {CIRCULAR_LOGO_TEXT_PATHS.map((path, index) => (
            <path key={index} d={path} />
          ))}
        </g>
      </g>
    </svg>
  );
}
