"use client";

import { useTranslations } from "next-intl";
import { SearchIcon } from "@/components/ui/Icons";

type SearchInputProps = {
  className?: string;
  inverted?: boolean;
  compact?: boolean;
};

export function SearchInput({
  className = "",
  inverted = false,
  compact = false,
}: SearchInputProps) {
  const t = useTranslations("nav");

  return (
    <form
      role="search"
      className={`relative ${className}`}
      onSubmit={(e) => e.preventDefault()}
    >
      <SearchIcon
        className={`pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 ${
          compact ? "h-3.5 w-3.5" : "left-3 h-4 w-4"
        } ${inverted ? "text-white/70" : "text-muted"}`}
      />
      <input
        type="search"
        name="q"
        placeholder={t("search")}
        className={`w-full min-w-[8rem] rounded-sm border pr-3 transition-colors focus:outline-none sm:min-w-[10rem] ${
          compact ? "py-1 pl-8 text-xs" : "py-1.5 pl-9 text-sm"
        } ${
          inverted
            ? "border-white/30 bg-white/10 text-white placeholder:text-white/60 focus:border-white/60"
            : "border-primary/20 bg-white text-primary placeholder:text-muted focus:border-secondary"
        }`}
        aria-label={t("search")}
      />
    </form>
  );
}
