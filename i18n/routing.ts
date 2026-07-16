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
    "/catalog": {
      de: "/katalog",
      en: "/catalog",
    },
    "/services": {
      de: "/service",
      en: "/services",
    },
    "/partnership": {
      de: "/partnerschaft",
      en: "/partnership",
    },
    "/visit": {
      de: "/besuch",
      en: "/visit",
    },
    "/faq": {
      de: "/faq",
      en: "/faq",
    },
    "/imprint": {
      de: "/impressum",
      en: "/imprint",
    },
    "/privacy": {
      de: "/datenschutz",
      en: "/privacy",
    },
    "/cookies": {
      de: "/cookies",
      en: "/cookies",
    },
    "/ethics": {
      de: "/nachhaltigkeit",
      en: "/ethics",
    },
    "/newsletter/confirmed": {
      de: "/newsletter/bestaetigt",
      en: "/newsletter/confirmed",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
