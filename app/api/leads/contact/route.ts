import {
  consentError,
  emailNotConfiguredError,
  emailSendFailedError,
  isValidEmail,
  jsonResponse,
  parseLocale,
  serverError,
  validationError,
} from "@/lib/api/leads";
import { getResendClient } from "@/lib/resend/config";
import { sendContactLeadEmails } from "@/lib/resend/send";

const REQUEST_TYPES = new Set([
  "partnership",
  "diamonds",
  "collection",
  "general",
  "catalog",
  "services",
  "visit",
]);

export async function POST(request: Request) {
  let locale = parseLocale(undefined);

  try {
    const body = await request.json();
    locale = parseLocale(body.locale);

    const name = String(body.name ?? "").trim();
    const company = String(body.company ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const message = String(body.message ?? "").trim();
    const requestType = String(body.requestType ?? "").trim();
    const consent = Boolean(body.consent);
    const source = String(body.source ?? "contact-form").trim();

    if (!name) return validationError(locale, "name");
    if (!company) return validationError(locale, "company");
    if (!email || !isValidEmail(email)) return validationError(locale, "email");
    if (!consent) return consentError(locale);

    if (requestType && !REQUEST_TYPES.has(requestType)) {
      return validationError(locale, "requestType");
    }

    if (!getResendClient()) {
      return emailNotConfiguredError(locale);
    }

    const result = await sendContactLeadEmails({
      locale,
      name,
      company,
      email,
      phone: phone || undefined,
      message,
      requestType: requestType || undefined,
      source,
    });

    if (!result.ok) {
      console.error("Contact lead email failed:", result.error);
      return emailSendFailedError(locale);
    }

    return jsonResponse({ success: true });
  } catch (error) {
    console.error("Contact lead API error:", error);
    return serverError(locale);
  }
}
