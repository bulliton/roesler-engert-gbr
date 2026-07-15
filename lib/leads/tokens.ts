import { createHmac, timingSafeEqual } from "node:crypto";

export type LeadTokenPayload = {
  type: "newsletter_confirm";
  email: string;
  locale: "de" | "en";
  company?: string;
  exp: number;
};

function getSecret() {
  return (
    process.env.LEAD_TOKEN_SECRET ??
    process.env.CRON_SECRET ??
    "dev-lead-token-secret-change-in-production"
  );
}

function sign(data: string) {
  return createHmac("sha256", getSecret()).update(data).digest("base64url");
}

export function createLeadToken(
  payload: Omit<LeadTokenPayload, "exp">,
  ttlHours = 48,
): string {
  const full: LeadTokenPayload = {
    ...payload,
    exp: Date.now() + ttlHours * 60 * 60 * 1000,
  };
  const data = Buffer.from(JSON.stringify(full)).toString("base64url");
  return `${data}.${sign(data)}`;
}

export function verifyLeadToken(token: string): LeadTokenPayload | null {
  const [data, signature] = token.split(".");
  if (!data || !signature) return null;

  const expected = sign(data);
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(data, "base64url").toString("utf8"),
    ) as LeadTokenPayload;

    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

import { getSiteUrl } from "@/lib/resend/config";

export function buildNewsletterConfirmUrl(token: string) {
  return `${getSiteUrl()}/api/leads/confirm?token=${encodeURIComponent(token)}`;
}
