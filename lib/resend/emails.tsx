import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { AppLocale } from "@/lib/resend/config";
import { CONTACT } from "@/lib/constants";

const brandColor = "#004646";
const accentColor = "#009696";

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
    <Html>
      <Head />
      <Preview>
        {isEn
          ? "We received your inquiry — Rösler & Engert"
          : "Wir haben Ihre Anfrage erhalten — Rösler & Engert"}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>
            {isEn ? "Thank you for your inquiry" : "Vielen Dank für Ihre Anfrage"}
          </Heading>
          <Text style={text}>
            {isEn ? `Dear ${name},` : `Guten Tag ${name},`}
          </Text>
          <Text style={text}>
            {isEn
              ? `We have received your message on behalf of ${company}. Our B2B team will get back to you shortly.`
              : `Wir haben Ihre Nachricht im Namen von ${company} erhalten. Unser B2B-Team meldet sich in Kürze bei Ihnen.`}
          </Text>
          <Section style={ctaSection}>
            <Button href={CONTACT.appointmentUrl} style={button}>
              {isEn ? "Book an appointment" : "Termin buchen"}
            </Button>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            Rösler & Engert GbR · {CONTACT.address.street} · {CONTACT.address.city}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export function ContactLeadSalesNotificationEmail(props: ContactLeadEmailProps) {
  const {
    name,
    company,
    email,
    phone,
    message,
    requestType,
    source,
    locale,
  } = props;

  return (
    <Html>
      <Head />
      <Preview>{`Neue B2B-Anfrage: ${company} (${name})`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Neue B2B-Anfrage</Heading>
          <Text style={text}>
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
          <Text style={text}>
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
          <Text style={text}>
            <strong>Nachricht:</strong>
            <br />
            {message || "—"}
          </Text>
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
    <Html>
      <Head />
      <Preview>
        {isEn
          ? "Your B2B catalog download — Rösler & Engert"
          : "Ihr B2B-Katalog — Rösler & Engert"}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>
            {isEn ? "Your catalog is ready" : "Ihr Katalog steht bereit"}
          </Heading>
          <Text style={text}>
            {isEn ? `Dear ${name},` : `Guten Tag ${name},`}
          </Text>
          <Text style={text}>
            {isEn
              ? `Thank you for your interest on behalf of ${company}. You can download our B2B catalog using the link below.`
              : `Vielen Dank für Ihr Interesse im Namen von ${company}. Über den folgenden Link können Sie unseren B2B-Katalog herunterladen.`}
          </Text>
          <Section style={ctaSection}>
            <Button href={downloadUrl} style={button}>
              {isEn ? "Download catalog (PDF)" : "Katalog herunterladen (PDF)"}
            </Button>
          </Section>
          <Section style={ctaSection}>
            <Button href={CONTACT.appointmentUrl} style={secondaryButton}>
              {isEn ? "Book an appointment" : "Termin buchen"}
            </Button>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            {isEn
              ? "Our team is happy to advise you personally on collections, diamonds, and B2B partnership."
              : "Unser Team berät Sie gerne persönlich zu Kollektionen, Diamanten und B2B-Partnerschaft."}
          </Text>
        </Container>
      </Body>
    </Html>
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
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Neuer Katalog-Download</Heading>
          <Text style={text}>
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
        </Container>
      </Body>
    </Html>
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
    <Html>
      <Head />
      <Preview>
        {isEn
          ? "Newsletter subscription confirmed"
          : "Newsletter-Anmeldung bestätigt"}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>
            {isEn ? "Welcome to our newsletter" : "Willkommen beim Newsletter"}
          </Heading>
          <Text style={text}>
            {isEn
              ? `We have registered ${email} for our B2B updates.`
              : `Wir haben ${email} für unsere B2B-Updates registriert.`}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f6f6",
  fontFamily: "Helvetica, Arial, sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "32px 24px",
  maxWidth: "560px",
  backgroundColor: "#ffffff",
};

const heading = {
  color: brandColor,
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "1.3",
  margin: "0 0 16px",
};

const text = {
  color: "#333333",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0 0 16px",
};

const ctaSection = {
  margin: "24px 0",
};

const button = {
  backgroundColor: accentColor,
  borderRadius: "999px",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
};

const secondaryButton = {
  ...button,
  backgroundColor: brandColor,
};

const hr = {
  borderColor: "#e6e6e6",
  margin: "24px 0",
};

const footer = {
  color: "#666666",
  fontSize: "13px",
  lineHeight: "1.5",
};
