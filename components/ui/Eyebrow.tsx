import { type ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  contrast?: boolean;
  gold?: boolean;
};

export function Eyebrow({
  children,
  className = "",
  contrast = false,
  gold = false,
}: EyebrowProps) {
  return (
    <p
      className={`mb-4 text-[var(--text-xs)] font-normal tracking-[0.12em] uppercase ${
        gold
          ? "text-accent-gold"
          : contrast
            ? "text-white/65"
            : "text-muted"
      } ${className}`}
    >
      {children}
    </p>
  );
}
