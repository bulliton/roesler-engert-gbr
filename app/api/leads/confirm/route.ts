import { NextResponse } from "next/server";
import { findLeadByEmailAndType, updateLead } from "@/lib/leads/store";
import { verifyLeadToken } from "@/lib/leads/tokens";
import { getSiteUrl } from "@/lib/resend/config";
import { sendNewsletterConfirmation } from "@/lib/resend/send";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(`${getSiteUrl()}/de?newsletter=invalid`);
  }

  const payload = verifyLeadToken(token);
  if (!payload || payload.type !== "newsletter_confirm") {
    return NextResponse.redirect(`${getSiteUrl()}/de?newsletter=invalid`);
  }

  const result = await sendNewsletterConfirmation({
    locale: payload.locale,
    email: payload.email,
    company: payload.company,
  });

  if (!result.ok) {
    console.error("Newsletter confirmation failed:", result.error);
    return NextResponse.redirect(
      `${getSiteUrl()}/${payload.locale}?newsletter=error`,
    );
  }

  const lead = await findLeadByEmailAndType(payload.email, "newsletter");
  if (lead) {
    await updateLead(lead.id, { newsletterConfirmed: true });
  }

  return NextResponse.redirect(
    `${getSiteUrl()}/${payload.locale}/newsletter/confirmed`,
  );
}
