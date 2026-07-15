import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/about": {
      de: "/ueber-uns",
      en: "/about",
    },
    "/jewelry": {
      de: "/schmuck",
      en: "/jewelry",
    },
    "/diamonds": {
      de: "/diamanten",
      en: "/diamonds",
    },
    "/contact": {
      de: "/kontakt",
      en: "/contact",
    },
    "/imprint": {
      de: "/impressum",
      en: "/imprint",
    },
    "/privacy": {
      de: "/datenschutz",
      en: "/privacy",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
