import { type ReactNode } from "react";

type HeadlineProps = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4";
  className?: string;
  bar?: boolean;
  contrast?: boolean;
};

export function Headline({
  children,
  as: Tag = "h2",
  className = "",
  bar = false,
  contrast = false,
}: HeadlineProps) {
  return (
    <Tag
      className={`font-display font-normal ${bar ? "headline-bar" : ""} ${contrast ? "!text-white" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
