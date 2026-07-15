import type { ReactNode } from "react";

type FooterLabelProps = {
  children: ReactNode;
  className?: string;
};

/** Small caps label — always Lato (font-body), never serif. */
export function FooterLabel({ children, className = "" }: FooterLabelProps) {
  return (
    <p
      className={`font-body text-[11px] font-semibold tracking-[0.2em] text-secondary uppercase ${className}`}
    >
      {children}
    </p>
  );
}
