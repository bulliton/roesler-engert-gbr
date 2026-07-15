import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { AppLocale } from "@/lib/resend/config";

export type LeadType = "contact" | "catalog" | "newsletter";

export type FollowUpState = {
  catalogDay3?: string | null;
  catalogDay7?: string | null;
  contact48h?: string | null;
  partnershipStep?: number;
  partnershipStepsSent?: string[];
};

export type LeadRecord = {
  id: string;
  type: LeadType;
  email: string;
  name?: string;
  company?: string;
  phone?: string;
  source?: string;
  requestType?: string;
  locale: AppLocale;
  message?: string;
  postalCode?: string;
  businessType?: string;
  interests?: string;
  newsletterConfirmed?: boolean;
  salesReplied?: boolean;
  createdAt: string;
  followUps: FollowUpState;
};

type LeadStoreData = {
  leads: LeadRecord[];
};

const STORE_DIR = path.join(process.cwd(), ".data");
const STORE_FILE = path.join(STORE_DIR, "leads.json");

async function readStore(): Promise<LeadStoreData> {
  try {
    const raw = await readFile(STORE_FILE, "utf8");
    return JSON.parse(raw) as LeadStoreData;
  } catch {
    return { leads: [] };
  }
}

async function writeStore(data: LeadStoreData) {
  await mkdir(STORE_DIR, { recursive: true });
  await writeFile(STORE_FILE, JSON.stringify(data, null, 2), "utf8");
}

export async function createLead(
  input: Omit<LeadRecord, "id" | "createdAt" | "followUps"> & {
    followUps?: FollowUpState;
  },
): Promise<LeadRecord> {
  const store = await readStore();
  const lead: LeadRecord = {
    ...input,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    followUps: input.followUps ?? {},
  };
  store.leads.push(lead);
  await writeStore(store);
  return lead;
}

export async function updateLead(
  id: string,
  patch: Partial<LeadRecord>,
): Promise<LeadRecord | null> {
  const store = await readStore();
  const index = store.leads.findIndex((l) => l.id === id);
  if (index === -1) return null;

  store.leads[index] = { ...store.leads[index], ...patch };
  await writeStore(store);
  return store.leads[index];
}

export async function findLeadByEmailAndType(
  email: string,
  type: LeadType,
): Promise<LeadRecord | undefined> {
  const store = await readStore();
  return store.leads
    .filter((l) => l.email.toLowerCase() === email.toLowerCase() && l.type === type)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];
}

export async function listLeads(): Promise<LeadRecord[]> {
  const store = await readStore();
  return store.leads;
}

export async function markFollowUpSent(
  leadId: string,
  key: "catalogDay3" | "catalogDay7" | "contact48h",
  value: string,
): Promise<LeadRecord | null>;
export async function markFollowUpSent(
  leadId: string,
  key: "partnershipStep",
  value: number,
): Promise<LeadRecord | null>;
export async function markFollowUpSent(
  leadId: string,
  key: "catalogDay3" | "catalogDay7" | "contact48h" | "partnershipStep",
  value: string | number,
): Promise<LeadRecord | null> {
  const store = await readStore();
  const index = store.leads.findIndex((l) => l.id === leadId);
  if (index === -1) return null;

  const lead = store.leads[index];

  if (key === "partnershipStep") {
    lead.followUps.partnershipStep = value as number;
    lead.followUps.partnershipStepsSent = [
      ...(lead.followUps.partnershipStepsSent ?? []),
      new Date().toISOString(),
    ];
  } else {
    lead.followUps[key] = value as string;
  }

  store.leads[index] = lead;
  await writeStore(store);
  return lead;
}
