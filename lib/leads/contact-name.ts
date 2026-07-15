import type { AppLocale } from "@/lib/resend/config";

export const CONTACT_SALUTATIONS = ["frau", "herr", "divers"] as const;
export type ContactSalutation = (typeof CONTACT_SALUTATIONS)[number];

const SALUTATION_LABELS: Record<ContactSalutation, { de: string; en: string }> = {
  frau: { de: "Frau", en: "Ms." },
  herr: { de: "Herr", en: "Mr." },
  divers: { de: "", en: "" },
};

export function isValidSalutation(value: string): value is ContactSalutation {
  return (CONTACT_SALUTATIONS as readonly string[]).includes(value);
}

export function formatContactName({
  salutation,
  firstName,
  lastName,
  locale,
}: {
  salutation: string;
  firstName: string;
  lastName: string;
  locale: AppLocale;
}): string {
  const label = isValidSalutation(salutation) ? SALUTATION_LABELS[salutation][locale] : "";
  const full = `${firstName} ${lastName}`.trim();
  return label ? `${label} ${full}` : full;
}

export function parseContactNameFromBody(
  body: Record<string, unknown>,
  locale: AppLocale,
):
  | {
      name: string;
      salutation?: string;
      firstName?: string;
      lastName?: string;
    }
  | { error: string } {
  const salutation = String(body.salutation ?? "").trim();
  const firstName = String(body.firstName ?? "").trim();
  const lastName = String(body.lastName ?? "").trim();
  const legacyName = String(body.name ?? "").trim();

  if (firstName || lastName || salutation) {
    if (!salutation || !isValidSalutation(salutation)) {
      return { error: "salutation" };
    }
    if (!firstName) return { error: "firstName" };
    if (!lastName) return { error: "lastName" };

    return {
      salutation,
      firstName,
      lastName,
      name: formatContactName({ salutation, firstName, lastName, locale }),
    };
  }

  if (legacyName) {
    return { name: legacyName };
  }

  return { error: "firstName" };
}
