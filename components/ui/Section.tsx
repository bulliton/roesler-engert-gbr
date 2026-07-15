import { type ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  contrast?: boolean;
  pattern?: boolean;
  id?: string;
};

export function Section({
  children,
  className = "",
  contrast = false,
  pattern = false,
  id,
}: SectionProps) {
  const base = "py-[var(--section-padding-y)] relative";
  const variant = contrast
    ? "contrast-band"
    : pattern
      ? "diamond-pattern bg-primary-light"
      : "";

  return (
    <section id={id} className={`${base} ${variant} ${className}`}>
      <div className="relative z-10">{children}</div>
    </section>
  );
}
