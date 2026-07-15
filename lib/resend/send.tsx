import { render } from "@react-email/components";
import {
  BookletLeadConfirmationEmail,
  BookletLeadSalesNotificationEmail,
  CatalogFollowUp1Email,
  CatalogFollowUp2Email,
  ContactLeadConfirmationEmail,
  ContactLeadFollowUpEmail,
  ContactLeadSalesNotificationEmail,
  NewsletterConfirmationEmail,
  NewsletterDoubleOptInEmail,
  PartnershipNurtureEmail,
} from "@/lib/resend/emails";
import {
  getCatalogDownloadUrl,
  getFromEmail,
  getResendAudienceId,
  getResendClient,
  getSalesNotificationEmail,
  getSiteUrl,
  type AppLocale,
} from "@/lib/resend/config";
import { buildNewsletterConfirmUrl, createLeadToken } from "@/lib/leads/tokens";

type SendResult = { ok: true } | { ok: false; error: unknown };

async function sendEmail({
  to,
  subject,
  react,
}: {
  to: string | string[];
  subject: string;
  react: React.ReactElement;
}): Promise<SendResult> {
  const resend = getResendClient();
  if (!resend) return { ok: false, error: "RESEND_API_KEY missing" };

  const html = await render(react);

  const { error } = await resend.emails.send({
    from: getFromEmail(),
    to,
    subject,
    html,
  });

  if (error) return { ok: false, error };
  return { ok: true };
}

export async function sendContactLeadEmails({
  locale,
  name,
  company,
  email,
  phone,
  message,
  requestType,
  source,
}: {
  locale: AppLocale;
  name: string;
  company: string;
  email: string;
  phone?: string;
  message: string;
  requestType?: string;
  source: string;
}): Promise<SendResult> {
  const isEn = locale === "en";

  const confirmation = await sendEmail({
    to: email,
    subject: isEn
      ? "We received your inquiry | Rösler & Engert"
      : "Wir haben Ihre Anfrage erhalten | Rösler & Engert",
    react: (
      <ContactLeadConfirmationEmail locale={locale} name={name} company={company} />
    ),
  });

  if (!confirmation.ok) return confirmation;

  return sendEmail({
    to: getSalesNotificationEmail(requestType),
    subject: `Neue B2B-Anfrage: ${company} (${name})`,
    react: (
      <ContactLeadSalesNotificationEmail
        locale={locale}
        name={name}
        company={company}
        email={email}
        phone={phone}
        message={message}
        requestType={requestType}
        source={source}
      />
    ),
  });
}

export async function sendBookletLeadEmails({
  locale,
  name,
  company,
  email,
  phone,
  postalCode,
  businessType,
  interests,
}: {
  locale: AppLocale;
  name: string;
  company: string;
  email: string;
  phone?: string;
  postalCode?: string;
  businessType?: string;
  interests?: string;
}): Promise<SendResult> {
  const isEn = locale === "en";
  const downloadUrl = getCatalogDownloadUrl();

  const confirmation = await sendEmail({
    to: email,
    subject: isEn
      ? "Your B2B catalog | Rösler & Engert"
      : "Ihr B2B-Katalog | Rösler & Engert",
    react: (
      <BookletLeadConfirmationEmail
        locale={locale}
        name={name}
        company={company}
        downloadUrl={downloadUrl}
      />
    ),
  });

  if (!confirmation.ok) return confirmation;

  return sendEmail({
    to: getSalesNotificationEmail(),
    subject: `Katalog-Download: ${company} (${name})`,
    react: (
      <BookletLeadSalesNotificationEmail
        locale={locale}
        name={name}
        company={company}
        email={email}
        phone={phone}
        postalCode={postalCode}
        businessType={businessType}
        interests={interests}
        downloadUrl={downloadUrl}
      />
    ),
  });
}

export async function sendNewsletterDoubleOptIn({
  locale,
  email,
  company,
}: {
  locale: AppLocale;
  email: string;
  company?: string;
}): Promise<SendResult> {
  const token = createLeadToken({
    type: "newsletter_confirm",
    email,
    locale,
    company,
  });

  const isEn = locale === "en";

  return sendEmail({
    to: email,
    subject: isEn
      ? "Please confirm your subscription | Rösler & Engert"
      : "Bitte bestätigen Sie Ihre Anmeldung | Rösler & Engert",
    react: (
      <NewsletterDoubleOptInEmail
        locale={locale}
        email={email}
        confirmUrl={buildNewsletterConfirmUrl(token)}
      />
    ),
  });
}

export async function sendNewsletterConfirmation({
  locale,
  email,
  company,
}: {
  locale: AppLocale;
  email: string;
  company?: string;
}): Promise<SendResult> {
  const resend = getResendClient();
  if (!resend) return { ok: false, error: "RESEND_API_KEY missing" };

  const audienceId = getResendAudienceId();
  if (audienceId) {
    const { error } = await resend.contacts.create({
      audienceId,
      email,
      firstName: company,
      unsubscribed: false,
    });

    if (error && !String(error.message).toLowerCase().includes("already")) {
      return { ok: false, error };
    }
  }

  const isEn = locale === "en";

  return sendEmail({
    to: email,
    subject: isEn
      ? "Partner updates confirmed | Rösler & Engert"
      : "Partner-Updates bestätigt | Rösler & Engert",
    react: <NewsletterConfirmationEmail locale={locale} email={email} />,
  });
}

/** @deprecated Use sendNewsletterDoubleOptIn + sendNewsletterConfirmation */
export async function sendNewsletterEmails({
  locale,
  email,
  company,
}: {
  locale: AppLocale;
  email: string;
  company?: string;
}): Promise<SendResult> {
  return sendNewsletterDoubleOptIn({ locale, email, company });
}

export {
  CatalogFollowUp1Email,
  CatalogFollowUp2Email,
  ContactLeadFollowUpEmail,
  PartnershipNurtureEmail,
  getSiteUrl,
};
