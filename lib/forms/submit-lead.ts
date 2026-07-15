import type { LeadApiErrorCode } from "@/lib/api/leads";

export type SubmitLeadResult<T = Record<string, unknown>> =
  | ({ success: true } & T)
  | { success: false; error: LeadApiErrorCode; message: string };

export async function submitLead<T extends Record<string, unknown>>(
  endpoint: string,
  payload: Record<string, unknown>,
): Promise<SubmitLeadResult<T>> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as SubmitLeadResult<T>;
  return data;
}
