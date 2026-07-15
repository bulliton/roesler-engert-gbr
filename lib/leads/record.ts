import type { AppLocale } from "@/lib/resend/config";
import { createLead, type LeadType } from "@/lib/leads/store";

type RecordLeadInput = {
  type: LeadType;
  email: string;
  locale: AppLocale;
  name?: string;
  company?: string;
  phone?: string;
  source?: string;
  requestType?: string;
  message?: string;
  postalCode?: string;
  businessType?: string;
  interests?: string;
  newsletterConfirmed?: boolean;
};

export async function recordLead(input: RecordLeadInput) {
  try {
    return await createLead({
      ...input,
      followUps: {},
    });
  } catch (error) {
    console.error("Failed to record lead:", error);
    return null;
  }
}
