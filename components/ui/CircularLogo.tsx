type CircularLogoProps = {
  className?: string;
  size?: number;
};

export function CircularLogo({ className = "", size = 148 }: CircularLogoProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-white ${className}`}
      role="img"
      aria-label="Rösler & Engert"
    >
      <circle cx="100" cy="100" r="94" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
      <circle cx="100" cy="100" r="82" stroke="currentColor" strokeWidth="0.75" />

      <defs>
        <path
          id="circular-logo-arc-top"
          d="M 34 108 A 66 66 0 0 1 166 108"
          fill="none"
        />
        <path
          id="circular-logo-arc-bottom"
          d="M 166 92 A 66 66 0 0 1 34 92"
          fill="none"
        />
      </defs>

      <text
        fill="currentColor"
        fontSize="11.5"
        letterSpacing="3"
        style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
      >
        <textPath href="#circular-logo-arc-top" startOffset="50%" textAnchor="middle">
          RÖSLER &amp; ENGERT
        </textPath>
      </text>
      <text
        fill="currentColor"
        fontSize="7.5"
        letterSpacing="4"
        opacity="0.75"
        style={{ fontFamily: "var(--font-lato), system-ui, sans-serif" }}
      >
        <textPath href="#circular-logo-arc-bottom" startOffset="50%" textAnchor="middle">
          HERITAGE CRAFTSMANSHIP
        </textPath>
      </text>

      <circle cx="100" cy="100" r="48" stroke="currentColor" strokeWidth="0.75" />
      <path
        d="M100 62 L107 78 L123 83 L107 88 L100 104 L93 88 L77 83 L93 78 Z"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinejoin="round"
      />
      <path
        d="M100 70 L104 79 L113 82 L104 85 L100 94 L96 85 L87 82 L96 79 Z"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
