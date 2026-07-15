import { SITE_IMAGES } from "@/lib/site-images";
import { getSiteUrl, type AppLocale } from "@/lib/resend/config";

export type EmailImageKey =
  | "contact"
  | "catalog"
  | "newsletter"
  | "showroom"
  | "partnershipWelcome"
  | "partnershipServices"
  | "partnershipDiamonds"
  | "partnershipCollections"
  | "partnershipVisit"
  | "followUpCatalog"
  | "followUpServices"
  | "followUpContact"
  | "appointment";

const EMAIL_IMAGE_PATHS: Record<EmailImageKey, string> = {
  contact: SITE_IMAGES.craftsmanAtWork,
  catalog: SITE_IMAGES.ringFinishing,
  newsletter: SITE_IMAGES.heroCraftsmanship,
  showroom: SITE_IMAGES.workshopInterior,
  partnershipWelcome: SITE_IMAGES.leadership,
  partnershipServices: SITE_IMAGES.handsCrafting,
  partnershipDiamonds: SITE_IMAGES.qualityInspection,
  partnershipCollections: SITE_IMAGES.ringSetting,
  partnershipVisit: SITE_IMAGES.aboutHero,
  followUpCatalog: SITE_IMAGES.precisionMeasurement,
  followUpServices: SITE_IMAGES.workbenchDetail,
  followUpContact: SITE_IMAGES.workshopInterior,
  appointment: SITE_IMAGES.workshopInterior,
};

const EMAIL_IMAGE_ALTS: Record<EmailImageKey, Record<AppLocale, string>> = {
  contact: {
    de: "Goldschmied bei der Arbeit in der Manufaktur Rösler & Engert, Würzburg",
    en: "Goldsmith at work in the Rösler & Engert atelier, Würzburg",
  },
  catalog: {
    de: "Feinpolitur eines Ringes in der Rösler & Engert Manufaktur",
    en: "Fine finishing of a ring in the Rösler & Engert atelier",
  },
  newsletter: {
    de: "Handwerkskunst und Schmuckfertigung bei Rösler & Engert",
    en: "Craftsmanship and jewelry manufacturing at Rösler & Engert",
  },
  showroom: {
    de: "Showroom und Manufaktur von Rösler & Engert in Würzburg",
    en: "Rösler & Engert showroom and atelier in Würzburg",
  },
  partnershipWelcome: {
    de: "Das Team von Rösler & Engert — Ihr B2B-Partner seit 128 Jahren",
    en: "The Rösler & Engert team — your B2B partner for 128 years",
  },
  partnershipServices: {
    de: "Präzise Handarbeit in der Schmuckmanufaktur Würzburg",
    en: "Precision handcraft in our Würzburg jewelry atelier",
  },
  partnershipDiamonds: {
    de: "Diamantprüfung durch unseren Hausgemmologen",
    en: "Diamond inspection by our in-house gemmologist",
  },
  partnershipCollections: {
    de: "Ringfassung und Kollektionsfertigung Made in Germany",
    en: "Ring setting and collection manufacturing — Made in Germany",
  },
  partnershipVisit: {
    de: "Rösler & Engert — Domstr. 18, Würzburg",
    en: "Rösler & Engert — Domstr. 18, Würzburg",
  },
  followUpCatalog: {
    de: "Präzisionsmessung und Qualitätssicherung im Atelier",
    en: "Precision measurement and quality assurance in the atelier",
  },
  followUpServices: {
    de: "Werkstatt und Werkzeuge der Rösler & Engert Manufaktur",
    en: "Workbench and tools at the Rösler & Engert atelier",
  },
  followUpContact: {
    de: "Innenansicht des Showrooms in Würzburg",
    en: "Interior view of the showroom in Würzburg",
  },
  appointment: {
    de: "Besuchen Sie unseren Showroom in der Würzburger Domstraße",
    en: "Visit our showroom on Domstrasse in Würzburg",
  },
};

export function getEmailImageUrl(key: EmailImageKey) {
  return `${getSiteUrl()}${EMAIL_IMAGE_PATHS[key]}`;
}

export function getEmailImageAlt(key: EmailImageKey, locale: AppLocale) {
  return EMAIL_IMAGE_ALTS[key][locale];
}

export function getPartnershipNurtureImageKey(step: number): EmailImageKey {
  const keys: EmailImageKey[] = [
    "partnershipWelcome",
    "partnershipServices",
    "partnershipDiamonds",
    "partnershipCollections",
    "partnershipVisit",
  ];
  return keys[step] ?? "partnershipWelcome";
}

export function resolveEmailHero(key: EmailImageKey, locale: AppLocale) {
  return {
    src: getEmailImageUrl(key),
    alt: getEmailImageAlt(key, locale),
  };
}
