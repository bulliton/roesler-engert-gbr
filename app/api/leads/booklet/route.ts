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
import { getCatalogDownloadUrl, getResendClient } from "@/lib/resend/config";
import { sendBookletLeadEmails } from "@/lib/resend/send";

export async function POST(request: Request) {
  let locale = parseLocale(undefined);

  try {
    const body = await request.json();
    locale = parseLocale(body.locale);

    const name = String(body.name ?? "").trim();
    const company = String(body.company ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const postalCode = String(body.postalCode ?? "").trim();
    const businessType = String(body.businessType ?? "").trim();
    const interests = String(body.interests ?? "").trim();
    const consent = Boolean(body.consent);

    if (!name) return validationError(locale, "name");
    if (!company) return validationError(locale, "company");
    if (!email || !isValidEmail(email)) return validationError(locale, "email");
    if (!consent) return consentError(locale);

    if (!getResendClient()) {
      return emailNotConfiguredError(locale);
    }

    const result = await sendBookletLeadEmails({
      locale,
      name,
      company,
      email,
      phone: phone || undefined,
      postalCode: postalCode || undefined,
      businessType: businessType || undefined,
      interests: interests || undefined,
    });

    if (!result.ok) {
      console.error("Booklet lead email failed:", result.error);
      return emailSendFailedError(locale);
    }

    return jsonResponse({
      success: true,
      downloadUrl: getCatalogDownloadUrl(),
    });
  } catch (error) {
    console.error("Booklet API error:", error);
    return serverError(locale);
  }
}
