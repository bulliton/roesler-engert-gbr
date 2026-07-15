"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/lib/navigation";
import { routing, type Locale } from "@/i18n/routing";

type LocaleSwitcherProps = {
  inverted?: boolean;
  compact?: boolean;
};

export function LocaleSwitcher({ inverted = false, compact = false }: LocaleSwitcherProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (next: Locale) => {
    router.replace(pathname, { locale: next });
  };

  return (
    <div
      className={`flex items-center gap-1 font-normal tracking-normal uppercase ${
        compact ? "text-[0.65rem]" : "text-xs font-semibold tracking-wider"
      }`}
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchLocale(loc)}
          className={`px-1 transition-colors duration-300 ${
            compact ? "py-0.5" : "py-1"
          } ${
            locale === loc
              ? inverted
                ? "text-white underline decoration-white underline-offset-[3px]"
                : "text-primary underline decoration-primary underline-offset-[3px]"
              : inverted
                ? "text-white/65 hover:text-white/90"
                : "text-primary/55 hover:text-primary"
          }`}
          aria-current={locale === loc ? "true" : undefined}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
