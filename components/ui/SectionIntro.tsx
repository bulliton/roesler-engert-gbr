import { type ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Headline } from "@/components/ui/Headline";

type SectionIntroProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  contrast?: boolean;
  bar?: boolean;
  className?: string;
};

export function SectionIntro({
  eyebrow,
  title,
  subtitle,
  align = "left",
  contrast = false,
  bar = false,
  className = "",
}: SectionIntroProps) {
  const alignClass = align === "center" ? "mx-auto text-center" : "max-w-2xl";

  return (
    <div className={`section-intro ${alignClass} ${className}`}>
      {eyebrow ? (
        <Eyebrow contrast={contrast} className={align === "center" ? "mx-auto" : ""}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <Headline
        as="h2"
        bar={bar}
        contrast={contrast}
        className={align === "center" && bar ? "mx-auto" : ""}
      >
        {title}
      </Headline>
      {subtitle ? (
        <p
          className={`mt-5 max-w-xl text-sm leading-relaxed md:text-base ${
            contrast ? "text-white/75" : "text-muted"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
