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
          className={`rounded px-1.5 transition-colors duration-300 ${
            compact ? "min-h-6 min-w-6" : "min-h-8 min-w-8 px-2"
          } ${
            locale === loc
              ? inverted
                ? "bg-white text-primary"
                : "bg-primary text-white"
              : inverted
                ? "text-white/80 hover:bg-white/10"
                : "text-primary hover:bg-primary-light"
          }`}
          aria-current={locale === loc ? "true" : undefined}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
