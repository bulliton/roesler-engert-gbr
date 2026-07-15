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
import { sendNewsletterEmails } from "@/lib/resend/send";

export async function POST(request: Request) {
  let locale = parseLocale(undefined);

  try {
    const body = await request.json();
    locale = parseLocale(body.locale);

    const email = String(body.email ?? "").trim();
    const company = String(body.company ?? "").trim();
    const consent = Boolean(body.consent);

    if (!email || !isValidEmail(email)) return validationError(locale, "email");
    if (!consent) return consentError(locale);

    if (!getResendClient()) {
      return emailNotConfiguredError(locale);
    }

    const result = await sendNewsletterEmails({
      locale,
      email,
      company: company || undefined,
    });

    if (!result.ok) {
      console.error("Newsletter email failed:", result.error);
      return emailSendFailedError(locale);
    }

    return jsonResponse({ success: true });
  } catch (error) {
    console.error("Newsletter API error:", error);
    return serverError(locale);
  }
}
