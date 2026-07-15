import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { AppLocale } from "@/lib/resend/config";
import { getSiteUrl } from "@/lib/resend/config";
import { CONTACT } from "@/lib/constants";
import {
  EmailButton,
  EmailLayout,
  EmailQuote,
  accentColor,
  brandColor,
  internalContainer,
  internalMain,
  mutedText,
  text,
} from "@/lib/resend/email-layout";

type ContactLeadEmailProps = {
  locale: AppLocale;
  name: string;
  company: string;
  email: string;
  phone?: string;
  message: string;
  requestType?: string;
  source: string;
};

export function ContactLeadConfirmationEmail({
  locale,
  name,
  company,
}: Pick<ContactLeadEmailProps, "locale" | "name" | "company">) {
  const isEn = locale === "en";

  return (
    <EmailLayout
      locale={locale}
      preview={
        isEn
          ? "We received your inquiry | Rösler & Engert"
          : "Wir haben Ihre Anfrage erhalten | Rösler & Engert"
      }
      eyebrowLabel={isEn ? "B2B partnership" : "B2B Partnerschaft"}
      title={isEn ? "Thank you for your inquiry" : "Vielen Dank für Ihre Anfrage"}
    >
      <Text style={text}>
        {isEn ? `Dear ${name},` : `Guten Tag ${name},`}
      </Text>
      <Text style={text}>
        {isEn
          ? `We received your message from ${company}. Our team will review it and get back to you within one business day.`
          : `Wir haben Ihre Nachricht von ${company} erhalten. Unser Team prüft sie und meldet sich in der Regel innerhalb eines Werktages bei Ihnen.`}
      </Text>
      <Text style={mutedText}>
        {isEn
          ? "Prefer not to wait? Book a visit at our showroom in Würzburg."
          : "Möchten Sie nicht warten? Buchen Sie direkt einen Termin in unserem Showroom in Würzburg."}
      </Text>
      <EmailButton
        href={`${CONTACT.appointmentUrl}?utm_source=email&utm_medium=transactional&utm_campaign=tx-01`}
        label={isEn ? "Book an appointment" : "Termin buchen"}
      />
      <Text style={{ ...mutedText, margin: "24px 0 0", fontSize: "14px" }}>
        {isEn ? "Or call us: " : "Oder rufen Sie uns an: "}
        <a href={CONTACT.phoneHref} style={{ color: accentColor, textDecoration: "none", fontWeight: 600 }}>
          {CONTACT.phone}
        </a>
      </Text>
    </EmailLayout>
  );
}

export function ContactLeadFollowUpEmail({
  locale,
  name,
}: {
  locale: AppLocale;
  name: string;
}) {
  const isEn = locale === "en";

  return (
    <EmailLayout
      locale={locale}
      preview={
        isEn ? "Your inquiry at Rösler & Engert" : "Ihre Anfrage bei Rösler & Engert"
      }
      title={isEn ? "Any questions about your inquiry?" : "Noch Fragen zu Ihrer Anfrage?"}
    >
      <Text style={text}>
        {isEn ? `Dear ${name},` : `Guten Tag ${name},`}
      </Text>
      <Text style={text}>
        {isEn
          ? "We want to make sure your inquiry reached us. If you have not heard back yet, we are happy to help directly."
          : "Wir möchten sicherstellen, dass Ihre Anfrage bei uns angekommen ist. Falls Sie noch keine Rückmeldung erhalten haben, stehen wir Ihnen gerne direkt zur Verfügung."}
      </Text>
      <Text style={mutedText}>
        {isEn
          ? "Mon–Fri, 9:00–17:00. Call us or book a visit at our showroom."
          : "Mo–Fr, 9:00–17:00 Uhr. Rufen Sie uns an oder buchen Sie einen Termin in unserem Showroom."}
      </Text>
      <EmailButton href={CONTACT.phoneHref} label={isEn ? "Call now" : "Jetzt anrufen"} />
      <EmailButton
        href={`${CONTACT.appointmentUrl}?utm_source=email&utm_medium=nurture&utm_campaign=nur-03`}
        label={isEn ? "Book an appointment" : "Termin buchen"}
        variant="outline"
      />
    </EmailLayout>
  );
}

export function ContactLeadSalesNotificationEmail(props: ContactLeadEmailProps) {
  const { name, company, email, phone, message, requestType, source, locale } =
    props;

  return (
    <Html>
      <Head />
      <Preview>{`Neue B2B-Anfrage: ${company} (${name})`}</Preview>
      <Body style={internalMain}>
        <Container style={internalContainer}>
          <Section
            style={{
              padding: "24px 28px 16px",
              borderBottom: "1px solid #e2e8e8",
            }}
          >
            <Text
              style={{
                margin: "0",
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: accentColor,
              }}
            >
              Intern · Sales Alert
            </Text>
            <Heading
              style={{
                margin: "8px 0 0",
                fontSize: "22px",
                fontWeight: "600",
                color: brandColor,
              }}
            >
              Neue B2B-Anfrage
            </Heading>
          </Section>
          <Section style={{ padding: "24px 28px" }}>
            <Section
              style={{
                margin: "0 0 20px",
                padding: "16px 20px",
                backgroundColor: "#f2fafa",
                border: "1px solid #e2e8e8",
              }}
            >
              <Text style={{ margin: "0", fontSize: "14px", lineHeight: "1.7", color: "#171717" }}>
                <strong>Quelle:</strong> {source}
                <br />
                <strong>Sprache:</strong> {locale.toUpperCase()}
                {requestType ? (
                  <>
                    <br />
                    <strong>Anfrageart:</strong> {requestType}
                  </>
                ) : null}
              </Text>
            </Section>
            <Text style={{ margin: "0 0 12px", fontSize: "14px", lineHeight: "1.7", color: "#171717" }}>
              <strong>Name:</strong> {name}
              <br />
              <strong>Unternehmen:</strong> {company}
              <br />
              <strong>E-Mail:</strong> {email}
              {phone ? (
                <>
                  <br />
                  <strong>Telefon:</strong> {phone}
                </>
              ) : null}
            </Text>
            <Text style={{ margin: "0", fontSize: "14px", lineHeight: "1.7", color: "#171717" }}>
              <strong>Nachricht:</strong>
              <br />
              {message || "—"}
            </Text>
          </Section>
          <Section style={{ padding: "16px 28px 24px", backgroundColor: brandColor }}>
            <Text style={{ margin: "0", fontSize: "12px", color: "rgba(255,255,255,0.8)" }}>
              Bitte innerhalb von 24h antworten · TX-02
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

type BookletLeadEmailProps = {
  locale: AppLocale;
  name: string;
  company: string;
  downloadUrl: string;
};

export function BookletLeadConfirmationEmail({
  locale,
  name,
  company,
  downloadUrl,
}: BookletLeadEmailProps) {
  const isEn = locale === "en";

  return (
    <EmailLayout
      locale={locale}
      preview={
        isEn
          ? "Your B2B catalog | Rösler & Engert"
          : "Ihr B2B-Katalog | Rösler & Engert"
      }
      eyebrowLabel={isEn ? "B2B Catalog 2026" : "B2B Katalog 2026"}
      title={isEn ? "Your catalog is ready" : "Ihr Katalog steht bereit"}
    >
      <Text style={text}>
        {isEn ? `Dear ${name},` : `Guten Tag ${name},`}
      </Text>
      <Text style={text}>
            {isEn
              ? `Thank you for your interest from ${company}. Download our B2B catalog using the link below.`
              : `Vielen Dank für Ihr Interesse von ${company}. Über den folgenden Link laden Sie unseren B2B-Katalog herunter.`}
      </Text>
      <Section
        style={{
          margin: "0 0 28px",
          padding: "24px 28px",
          backgroundColor: "#f2fafa",
          border: "1px solid #e2e8e8",
        }}
      >
        <Text
          style={{
            margin: "0 0 4px",
            fontFamily: "'Lora', Georgia, serif",
            fontSize: "18px",
            color: brandColor,
          }}
        >
          {isEn ? "Catalog 2026" : "Katalog 2026"}
        </Text>
        <Text style={{ margin: "0", fontSize: "14px", color: "#5a6b6b" }}>
          {isEn
            ? "Rings · Earrings · Necklaces · Diamonds · B2B services"
            : "Ringe · Ohrschmuck · Colliers · Diamanten · B2B-Services"}
        </Text>
      </Section>
      <EmailButton
        href={`${downloadUrl}?utm_source=email&utm_medium=transactional&utm_campaign=tx-03`}
        label={isEn ? "Download catalog (PDF)" : "Katalog herunterladen (PDF)"}
      />
      <EmailButton
        href={`${CONTACT.appointmentUrl}?utm_source=email&utm_medium=transactional&utm_campaign=tx-03`}
        label={isEn ? "Book an appointment" : "Termin buchen"}
        variant="outline"
      />
      <Text style={{ ...mutedText, margin: "28px 0 0", fontStyle: "italic" }}>
            {isEn
              ? "Questions about collections, diamonds, or partnership? We are happy to advise you personally."
              : "Fragen zu Kollektionen, Diamanten oder Partnerschaft? Wir beraten Sie gerne persönlich."}
      </Text>
    </EmailLayout>
  );
}

export function CatalogFollowUp1Email({
  locale,
  name,
}: {
  locale: AppLocale;
  name: string;
}) {
  const isEn = locale === "en";

  return (
    <EmailLayout
      locale={locale}
      preview={
        isEn
          ? "Questions about our collections?"
          : "Haben Sie Fragen zu unseren Kollektionen?"
      }
      eyebrowLabel={isEn ? "Catalog · Follow-up" : "Katalog · Follow-up"}
      title={
        isEn
          ? "Questions about our collections?"
          : "Haben Sie Fragen zu unseren Kollektionen?"
      }
    >
      <Text style={text}>
        {isEn ? `Dear ${name},` : `Guten Tag ${name},`}
      </Text>
      <Text style={text}>
        {isEn
          ? "You downloaded our B2B catalog a few days ago. Do you have questions about specific collections, diamond cuts, or our B2B services?"
          : "Vor einigen Tagen haben Sie unseren B2B-Katalog heruntergeladen. Haben sich bereits Fragen zu bestimmten Kollektionen, Diamant-Schliffen oder unseren B2B-Services ergeben?"}
      </Text>
      <Text style={mutedText}>
        {isEn
          ? "Our team is happy to advise you by phone or at our showroom in Würzburg."
          : "Unser Team berät Sie gerne telefonisch oder bei einem Termin in unserem Showroom in Würzburg."}
      </Text>
      <EmailButton
        href={`${CONTACT.appointmentUrl}?utm_source=email&utm_medium=nurture&utm_campaign=nur-01`}
        label={isEn ? "Book an appointment" : "Termin buchen"}
      />
    </EmailLayout>
  );
}

export function CatalogFollowUp2Email({ locale }: { locale: AppLocale }) {
  const isEn = locale === "en";

  return (
    <EmailLayout
      locale={locale}
      preview={
        isEn
          ? "Personal consultation from Würzburg"
          : "Persönliche Beratung aus Würzburg"
      }
      eyebrowLabel={isEn ? "Catalog · Follow-up" : "Katalog · Follow-up"}
      title={
        isEn
          ? "We are here if you have questions"
          : "Wir sind für Sie da, wenn Fragen offen sind"
      }
    >
      <Text style={text}>
        {isEn
          ? "As a jeweler partner, you get invoice purchasing, ring adjustments, engravings, nationwide shipping, and collection adaptations from our atelier in Würzburg."
          : "Als Juwelierpartner erhalten Sie Rechnungsankauf, Ringanpassungen, Gravuren, deutschlandweiten Versand und Kollektionsanpassungen aus unserem Atelier in Würzburg."}
      </Text>
      <EmailQuote>
        {isEn
          ? "We work as the back office for independent jewelers: in-house manufacturing, a licensed gemologist, and field service when you need it."
          : "Wir verstehen uns als Backoffice für unabhängige Juweliere: eigene Manufaktur, lizenzierter Gemmologe und Außendienst, wenn Sie ihn brauchen."}
      </EmailQuote>
      <EmailButton
        href={`${CONTACT.appointmentUrl}?utm_source=email&utm_medium=nurture&utm_campaign=nur-02`}
        label={isEn ? "Visit our showroom" : "Showroom besuchen"}
      />
    </EmailLayout>
  );
}

export function BookletLeadSalesNotificationEmail(
  props: BookletLeadEmailProps & {
    email: string;
    phone?: string;
    postalCode?: string;
    businessType?: string;
    interests?: string;
  },
) {
  const {
    name,
    company,
    email,
    phone,
    postalCode,
    businessType,
    interests,
    locale,
  } = props;

  return (
    <Html>
      <Head />
      <Preview>{`Katalog-Download: ${company} (${name})`}</Preview>
      <Body style={internalMain}>
        <Container style={internalContainer}>
          <Section
            style={{
              padding: "24px 28px 16px",
              borderBottom: "1px solid #e2e8e8",
            }}
          >
            <Text
              style={{
                margin: "0",
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: accentColor,
              }}
            >
              Intern · Sales Alert
            </Text>
            <Heading
              style={{
                margin: "8px 0 0",
                fontSize: "22px",
                fontWeight: "600",
                color: brandColor,
              }}
            >
              Neuer Katalog-Download
            </Heading>
          </Section>
          <Section style={{ padding: "24px 28px" }}>
            <Text style={{ margin: "0", fontSize: "14px", lineHeight: "1.7", color: "#171717" }}>
              <strong>Sprache:</strong> {locale.toUpperCase()}
              <br />
              <strong>Name:</strong> {name}
              <br />
              <strong>Unternehmen:</strong> {company}
              <br />
              <strong>E-Mail:</strong> {email}
              {phone ? (
                <>
                  <br />
                  <strong>Telefon:</strong> {phone}
                </>
              ) : null}
              {postalCode ? (
                <>
                  <br />
                  <strong>PLZ/Region:</strong> {postalCode}
                </>
              ) : null}
              {businessType ? (
                <>
                  <br />
                  <strong>Geschäftsart:</strong> {businessType}
                </>
              ) : null}
              {interests ? (
                <>
                  <br />
                  <strong>Interessen:</strong> {interests}
                </>
              ) : null}
            </Text>
          </Section>
          <Section style={{ padding: "16px 28px 24px", backgroundColor: brandColor }}>
            <Text style={{ margin: "0", fontSize: "12px", color: "rgba(255,255,255,0.8)" }}>
              Follow-up NUR-01 in 3 Tagen · TX-04
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export function NewsletterDoubleOptInEmail({
  locale,
  email,
  confirmUrl,
}: {
  locale: AppLocale;
  email: string;
  confirmUrl: string;
}) {
  const isEn = locale === "en";

  return (
    <EmailLayout
      locale={locale}
      preview={
        isEn
          ? "Please confirm your newsletter subscription"
          : "Bitte bestätigen Sie Ihre Newsletter-Anmeldung"
      }
      eyebrowLabel="Newsletter"
      title={
        isEn
          ? "Please confirm your subscription"
          : "Bitte bestätigen Sie Ihre Anmeldung"
      }
    >
      <Text style={text}>
        {isEn
          ? `You signed up for our B2B newsletter with ${email}.`
          : `Sie haben sich für unseren B2B-Newsletter mit der Adresse ${email} angemeldet.`}
      </Text>
      <Text style={text}>
        {isEn
          ? "Click the button below to complete your subscription. You will only receive updates after confirming."
          : "Klicken Sie auf den Button, um Ihre Anmeldung abzuschließen. Erst danach erhalten Sie Updates zu Kollektionen, Messeterminen und B2B-Neuigkeiten."}
      </Text>
      <EmailButton
        href={confirmUrl}
        label={isEn ? "Confirm subscription" : "Anmeldung bestätigen"}
      />
      <Text style={{ ...mutedText, margin: "0", fontSize: "13px" }}>
        {isEn
          ? "If you did not sign up, please ignore this email. The link is valid for 48 hours."
          : "Falls Sie sich nicht angemeldet haben, ignorieren Sie diese E-Mail. Der Link ist 48 Stunden gültig."}
      </Text>
    </EmailLayout>
  );
}

export function NewsletterConfirmationEmail({
  locale,
  email,
}: {
  locale: AppLocale;
  email: string;
}) {
  const isEn = locale === "en";

  return (
    <EmailLayout
      locale={locale}
      preview={
        isEn
          ? "Newsletter subscription confirmed"
          : "Newsletter-Anmeldung bestätigt"
      }
      eyebrowLabel="Newsletter"
      title={isEn ? "Welcome to partner updates" : "Willkommen bei den Partner-Updates"}
      showUnsubscribe
    >
      <Text style={text}>
        {isEn
          ? "Thank you for your interest in Rösler & Engert."
          : "Vielen Dank für Ihr Interesse an Rösler & Engert."}
      </Text>
      <Text style={text}>
        {isEn
          ? `We registered ${email} for partner updates: new collections, trade fairs, and partnership news.`
          : `Wir haben ${email} für Partner-Updates registriert: neue Kollektionen, Messen und Neuigkeiten zur Partnerschaft.`}
      </Text>
      <Text style={{ ...mutedText, margin: "0", fontStyle: "italic" }}>
        {isEn
          ? "You can unsubscribe at any time."
          : "Sie können sich jederzeit wieder abmelden."}
      </Text>
    </EmailLayout>
  );
}

export function PartnershipNurtureEmail({
  locale,
  name,
  step,
}: {
  locale: AppLocale;
  name: string;
  step: number;
}) {
  const isEn = locale === "en";
  const steps = isEn
    ? [
        {
          title: "Your back office for jewelry",
          body: `Dear ${name}, thank you for your interest in a B2B partnership with Rösler & Engert. For 128 years, we have crafted jewelry in Würzburg and worked with jewelers across Germany.`,
          cta: "Visit our showroom",
        },
        {
          title: "How we work with jewelers",
          body: "Invoice purchasing, ring adjustments, engravings, field service, and in-house manufacturing. All from Würzburg.",
          cta: "Learn more",
        },
        {
          title: "Diamonds and gemology in Würzburg",
          body: "Our gemologist advises on 20+ diamond cuts: brilliant, princess, cushion, pear, and more.",
          cta: "Explore diamonds",
        },
        {
          title: "Collections and customization",
          body: "Made in Germany. We adapt collections to your brand and clientele.",
          cta: "View collections",
        },
        {
          title: "Your next step: a visit to Würzburg",
          body: `Dear ${name}, we would be glad to welcome you to our showroom and talk about how Rösler & Engert can support your business.`,
          cta: "Book an appointment",
        },
      ]
    : [
        {
          title: "Ihr Backoffice für Schmuck",
          body: `Guten Tag ${name}, schön, dass Sie sich für eine B2B-Partnerschaft mit Rösler & Engert interessieren. Seit 128 Jahren fertigen wir in Würzburg Schmuck und arbeiten mit Juwelieren deutschlandweit zusammen.`,
          cta: "Showroom besuchen",
        },
        {
          title: "So arbeiten wir mit Juwelieren zusammen",
          body: "Rechnungsankauf, Ringanpassungen, Gravuren, Außendienst und eigene Fertigung. Alles aus Würzburg.",
          cta: "Mehr erfahren",
        },
        {
          title: "Diamanten und Gemmologie in Würzburg",
          body: "Unser Gemmologe berät zu über 20 Diamantschliffen: Brilliant, Princess, Cushion, Birne und mehr.",
          cta: "Diamanten entdecken",
        },
        {
          title: "Kollektionen und Individualisierung",
          body: "Made in Germany. Wir passen Kollektionen an Ihre Marke und Kundschaft an.",
          cta: "Kollektionen ansehen",
        },
        {
          title: "Ihr nächster Schritt: ein Besuch in Würzburg",
          body: `Guten Tag ${name}, wir freuen uns, Sie in unserem Showroom begrüßen zu dürfen und zu besprechen, wie Rösler & Engert Ihr Geschäft unterstützen kann.`,
          cta: "Termin buchen",
        },
      ];

  const content = steps[step] ?? steps[0];
  const links = [
    `${CONTACT.appointmentUrl}?utm_source=email&utm_medium=nurture&utm_campaign=nur-p1`,
    `${getSiteUrl()}/${locale}/partnership?utm_source=email&utm_medium=nurture&utm_campaign=nur-p2`,
    `${getSiteUrl()}/${locale}/diamonds?utm_source=email&utm_medium=nurture&utm_campaign=nur-p3`,
    `${getSiteUrl()}/${locale}/jewelry?utm_source=email&utm_medium=nurture&utm_campaign=nur-p4`,
    `${CONTACT.appointmentUrl}?utm_source=email&utm_medium=nurture&utm_campaign=nur-p5`,
  ];

  return (
    <EmailLayout
      locale={locale}
      preview={content.title}
      eyebrowLabel={
        isEn
          ? `Partnership · ${step + 1} of 5`
          : `Partnerschaft · ${step + 1} von 5`
      }
      title={content.title}
      showUnsubscribe
    >
      <Text style={text}>{content.body}</Text>
      <EmailButton href={links[step] ?? links[0]} label={content.cta} />
    </EmailLayout>
  );
}
