import { CONTACT } from "@/lib/constants";

export const LEGAL_ENTITY = {
  brandName: "Rösler & Engert",
  legalName: "Rösler & Engert GbR",
  street: CONTACT.address.street,
  city: CONTACT.address.city,
  countryDe: "Deutschland",
  countryEn: "Germany",
  phone: CONTACT.phone,
  email: CONTACT.email,
  representativesDe: "die Gesellschafter Christian Roesler und Markus Engert",
  representativesEn: "the partners Christian Roesler and Markus Engert",
  contentResponsibleDe: "Christian Roesler",
  contentResponsibleEn: "Christian Roesler",
  supervisoryAuthorityDe:
    "Bayerisches Landesamt für Datenschutzaufsicht (BayLDA), Promenade 18, 91522 Ansbach",
  supervisoryAuthorityEn:
    "Bavarian State Office for Data Protection Supervision (BayLDA), Promenade 18, 91522 Ansbach, Germany",
} as const;

export type LegalNamespace = "legal.imprint" | "legal.privacy" | "legal.cookies";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
};
