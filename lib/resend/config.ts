import { Resend } from "resend";

export type AppLocale = "de" | "en";

export function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export function getFromEmail() {
  return process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
}

export function getSalesNotificationEmail(requestType?: string) {
  if (requestType === "partnership" && process.env.SALES_EMAIL_PARTNERSHIP) {
    return process.env.SALES_EMAIL_PARTNERSHIP;
  }
  if (requestType === "diamonds" && process.env.SALES_EMAIL_DIAMONDS) {
    return process.env.SALES_EMAIL_DIAMONDS;
  }
  if (requestType === "collection" && process.env.SALES_EMAIL_COLLECTION) {
    return process.env.SALES_EMAIL_COLLECTION;
  }

  return (
    process.env.SALES_NOTIFICATION_EMAIL ??
    process.env.RESEND_FROM_EMAIL ??
    "info@roesler-engert.de"
  );
}

export function getCronSecret() {
  return process.env.CRON_SECRET;
}

export function getResendAudienceId() {
  return process.env.RESEND_AUDIENCE_ID;
}

export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export function getContactPageUrl(locale: AppLocale = "de") {
  const path = locale === "en" ? "/en/contact" : "/de/kontakt";
  return `${getSiteUrl()}${path}`;
}

export function getVisitPageUrl(locale: AppLocale = "de") {
  const path = locale === "en" ? "/en/visit" : "/de/besuch";
  return `${getSiteUrl()}${path}`;
}

export function getCatalogDownloadUrl() {
  return `${getSiteUrl()}/downloads/katalog-2026.pdf`;
}
