import { render } from "@react-email/components";
import {
  CatalogFollowUp1Email,
  CatalogFollowUp2Email,
  ContactLeadFollowUpEmail,
  PartnershipNurtureEmail,
} from "@/lib/resend/emails";
import { getResendClient, getFromEmail } from "@/lib/resend/config";
import { listLeads, markFollowUpSent } from "@/lib/leads/store";

const MS_DAY = 24 * 60 * 60 * 1000;
const MS_48H = 48 * 60 * 60 * 1000;

const PARTNERSHIP_SCHEDULE_DAYS = [0, 3, 7, 14, 21];

type SendResult = { sent: number; errors: string[] };

async function sendRenderedEmail({
  to,
  subject,
  react,
}: {
  to: string;
  subject: string;
  react: React.ReactElement;
}) {
  const resend = getResendClient();
  if (!resend) throw new Error("RESEND_API_KEY missing");

  const html = await render(react);
  const { error } = await resend.emails.send({
    from: getFromEmail(),
    to,
    subject,
    html,
  });

  if (error) throw new Error(error.message);
}

export async function processEmailFollowUps(): Promise<SendResult> {
  const leads = await listLeads();
  const now = Date.now();
  let sent = 0;
  const errors: string[] = [];

  for (const lead of leads) {
    const age = now - new Date(lead.createdAt).getTime();

    try {
      if (
        lead.type === "catalog" &&
        !lead.followUps.catalogDay3 &&
        age >= 3 * MS_DAY
      ) {
        const isEn = lead.locale === "en";
        await sendRenderedEmail({
          to: lead.email,
          subject: isEn
            ? "Questions about our collections? — Rösler & Engert"
            : "Haben Sie Fragen zu unseren Kollektionen? — Rösler & Engert",
          react: (
            <CatalogFollowUp1Email
              locale={lead.locale}
              name={lead.name ?? "Partner"}
            />
          ),
        });
        await markFollowUpSent(lead.id, "catalogDay3", new Date().toISOString());
        sent++;
      }

      if (
        lead.type === "catalog" &&
        lead.followUps.catalogDay3 &&
        !lead.followUps.catalogDay7 &&
        age >= 7 * MS_DAY
      ) {
        const isEn = lead.locale === "en";
        await sendRenderedEmail({
          to: lead.email,
          subject: isEn
            ? "Personal consultation — Rösler & Engert"
            : "Persönliche Beratung — Rösler & Engert",
          react: <CatalogFollowUp2Email locale={lead.locale} />,
        });
        await markFollowUpSent(lead.id, "catalogDay7", new Date().toISOString());
        sent++;
      }

      if (
        lead.type === "contact" &&
        !lead.salesReplied &&
        !lead.followUps.contact48h &&
        age >= MS_48H
      ) {
        const isEn = lead.locale === "en";
        await sendRenderedEmail({
          to: lead.email,
          subject: isEn
            ? "Your inquiry at Rösler & Engert"
            : "Ihre Anfrage bei Rösler & Engert",
          react: (
            <ContactLeadFollowUpEmail
              locale={lead.locale}
              name={lead.name ?? "Partner"}
            />
          ),
        });
        await markFollowUpSent(lead.id, "contact48h", new Date().toISOString());
        sent++;
      }

      if (
        lead.type === "contact" &&
        lead.requestType === "partnership"
      ) {
        const step = lead.followUps.partnershipStep ?? 0;
        if (step < PARTNERSHIP_SCHEDULE_DAYS.length) {
          const requiredAge = PARTNERSHIP_SCHEDULE_DAYS[step] * MS_DAY;
          if (age >= requiredAge) {
            const isEn = lead.locale === "en";
            const subjects = isEn
              ? [
                  "Welcome — your partner for jewelry & diamonds",
                  "How we work with jewelers",
                  "Diamonds & gemmology in Würzburg",
                  "Collections & customization",
                  "Your next step — a personal appointment",
                ]
              : [
                  "Willkommen — Ihr Partner für Schmuck & Diamanten",
                  "So arbeiten wir mit Juwelieren zusammen",
                  "Diamanten & Gemmologie in Würzburg",
                  "Kollektionen & Individualisierung",
                  "Ihr nächster Schritt — ein persönlicher Termin",
                ];

            await sendRenderedEmail({
              to: lead.email,
              subject: `${subjects[step]} — Rösler & Engert`,
              react: (
                <PartnershipNurtureEmail
                  locale={lead.locale}
                  name={lead.name ?? "Partner"}
                  step={step}
                />
              ),
            });
            await markFollowUpSent(lead.id, "partnershipStep", step + 1);
            sent++;
          }
        }
      }
    } catch (error) {
      errors.push(
        `${lead.id}: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  return { sent, errors };
}
