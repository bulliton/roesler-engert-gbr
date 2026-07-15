"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/lib/navigation";
import { routing, type Locale } from "@/i18n/routing";

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (next: Locale) => {
    router.replace(pathname, { locale: next });
  };

  return (
    <div className="flex items-center gap-1 text-xs font-semibold tracking-wider uppercase">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchLocale(loc)}
          className={`min-h-8 min-w-8 rounded px-2 transition-colors ${
            locale === loc
              ? "bg-primary text-white"
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
