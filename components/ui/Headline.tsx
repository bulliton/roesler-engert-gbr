import { type ReactNode } from "react";

type HeadlineProps = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
  bar?: boolean;
  contrast?: boolean;
};

export function Headline({
  children,
  as: Tag = "h2",
  className = "",
  bar = true,
  contrast = false,
}: HeadlineProps) {
  const size =
    Tag === "h1"
      ? "text-[clamp(2.25rem,4vw+1rem,4.5rem)]"
      : Tag === "h2"
        ? "text-[clamp(1.75rem,2.5vw+1rem,3rem)]"
        : "text-[clamp(1.25rem,1.5vw+0.75rem,2rem)]";

  return (
    <Tag
      className={`${size} ${bar ? "headline-bar" : ""} ${contrast ? "!text-white" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
