import type { ReactNode } from "react";

type ContactEditorialLabelProps = {
  children: ReactNode;
  className?: string;
};

/** Small-caps editorial label — contact page row headers. */
export function ContactEditorialLabel({
  children,
  className = "",
}: ContactEditorialLabelProps) {
  return (
    <p
      className={`font-body text-[10px] font-semibold tracking-[0.22em] text-primary/55 uppercase ${className}`}
    >
      {children}
    </p>
  );
}
