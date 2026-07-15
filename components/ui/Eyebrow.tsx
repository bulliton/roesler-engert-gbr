import { type ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  contrast?: boolean;
};

export function Eyebrow({
  children,
  className = "",
  contrast = false,
}: EyebrowProps) {
  return (
    <p
      className={`mb-4 text-xs font-normal tracking-[0.14em] uppercase ${
        contrast ? "text-white/65" : "text-muted"
      } ${className}`}
    >
      {children}
    </p>
  );
}
