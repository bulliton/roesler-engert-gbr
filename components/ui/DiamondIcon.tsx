type DiamondIconProps = {
  className?: string;
  animate?: boolean;
};

export function DiamondIcon({ className = "", animate = false }: DiamondIconProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${animate ? "diamond-draw" : ""} ${className}`}
      aria-hidden="true"
    >
      <circle
        cx="50"
        cy="50"
        r="48"
        stroke="currentColor"
        strokeWidth="0.75"
        className={animate ? "diamond-circle" : ""}
      />
      <path
        d="M50 12 L58 32 L78 38 L58 44 L50 64 L42 44 L22 38 L42 32 Z"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinejoin="round"
        className={animate ? "diamond-facets" : ""}
      />
      <path
        d="M50 22 L54 34 L66 38 L54 42 L50 54 L46 42 L34 38 L46 34 Z"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinejoin="round"
        className={animate ? "diamond-table" : ""}
      />
      <style>{`
        .diamond-circle {
          stroke-dasharray: 302;
          stroke-dashoffset: 302;
          animation: draw 2s ease forwards;
        }
        .diamond-facets {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: draw 1.5s ease 0.3s forwards;
        }
        .diamond-table {
          stroke-dasharray: 80;
          stroke-dashoffset: 80;
          animation: draw 1s ease 0.8s forwards;
        }
        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .diamond-circle, .diamond-facets, .diamond-table {
            animation: none;
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </svg>
  );
}
