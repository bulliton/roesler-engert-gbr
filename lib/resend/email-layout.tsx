import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { AppLocale } from "@/lib/resend/config";
import { CONTACT } from "@/lib/constants";
import { getSiteUrl } from "@/lib/resend/config";
import type { ReactNode } from "react";

export const brandColor = "#004646";
export const accentColor = "#009696";
export const goldColor = "#b8956b";
export const mutedColor = "#5a6b6b";
export const textColor = "#171717";

const main = {
  backgroundColor: "#f2fafa",
  fontFamily: "'Lato', Helvetica, Arial, sans-serif",
};

const container = {
  margin: "0 auto",
  maxWidth: "600px",
  backgroundColor: "#ffffff",
  border: "1px solid rgba(0, 70, 70, 0.06)",
};

const logoSection = {
  padding: "36px 48px 28px",
  textAlign: "center" as const,
};

const goldLine = {
  padding: "0 48px",
};

const goldLineInner = {
  height: "3px",
  backgroundColor: goldColor,
  fontSize: "0",
  lineHeight: "0",
};

const eyebrow = {
  margin: "0",
  fontSize: "11px",
  fontWeight: "600",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: accentColor,
};

const contentSection = {
  padding: "32px 48px 40px",
};

const heading = {
  margin: "0 0 24px",
  fontFamily: "'Lora', Georgia, 'Times New Roman', serif",
  fontSize: "28px",
  fontWeight: "400",
  lineHeight: "1.3",
  color: brandColor,
};

const text = {
  margin: "0 0 16px",
  fontSize: "16px",
  lineHeight: "1.65",
  color: textColor,
};

const mutedText = {
  ...text,
  color: mutedColor,
};

const footerSection = {
  padding: "28px 48px 36px",
  backgroundColor: "#f2fafa",
  borderTop: "1px solid #e2e8e8",
};

const footerText = {
  margin: "0 0 12px",
  fontSize: "13px",
  lineHeight: "1.6",
  color: mutedColor,
  textAlign: "center" as const,
};

const link = {
  color: accentColor,
  textDecoration: "none",
};

export function getLogoUrl() {
  return `${getSiteUrl()}/brand/logo-horizontal.svg`;
}

type EmailLayoutProps = {
  locale: AppLocale;
  preview: string;
  eyebrowLabel?: string;
  title: string;
  children: ReactNode;
  showUnsubscribe?: boolean;
};

export function EmailLayout({
  locale,
  preview,
  eyebrowLabel,
  title,
  children,
  showUnsubscribe = false,
}: EmailLayoutProps) {
  const isEn = locale === "en";

  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Img
              src={getLogoUrl()}
              width="200"
              height="24"
              alt="Rösler & Engert"
              style={{ margin: "0 auto" }}
            />
          </Section>
          <Section style={goldLine}>
            <div style={goldLineInner}>&nbsp;</div>
          </Section>
          {eyebrowLabel ? (
            <Section style={{ padding: "32px 48px 0" }}>
              <Text style={eyebrow}>{eyebrowLabel}</Text>
            </Section>
          ) : null}
          <Section style={contentSection}>
            <Heading style={heading}>{title}</Heading>
            {children}
          </Section>
          <Hr style={{ borderColor: "#e2e8e8", margin: "0" }} />
          <Section style={footerSection}>
            <Text style={footerText}>
              <strong style={{ color: brandColor }}>Rösler &amp; Engert GbR</strong>
              <br />
              {CONTACT.address.street} · {CONTACT.address.city}
              {isEn ? ` · ${CONTACT.address.country}` : ` · ${CONTACT.address.country}`}
            </Text>
            <Text style={{ ...footerText, margin: "0" }}>
              <Link href={CONTACT.phoneHref} style={link}>
                {CONTACT.phone}
              </Link>
              {" · "}
              <Link href={CONTACT.emailHref} style={link}>
                {CONTACT.email}
              </Link>
              {" · "}
              <Link href={getSiteUrl()} style={link}>
                roesler-engert.de
              </Link>
            </Text>
            <Text
              style={{
                ...footerText,
                margin: "16px 0 0",
                fontSize: "11px",
                color: "#8a9a9a",
              }}
            >
              {isEn ? "Mon–Fri, 9:00–17:00" : "Mo–Fr, 9:00–17:00 Uhr"} ·{" "}
              {isEn
                ? "Handcrafted jewelry & diamonds · Made in Germany"
                : "Handgefertigter Schmuck & Diamanten · Made in Germany"}
            </Text>
            {showUnsubscribe ? (
              <Text
                style={{
                  ...footerText,
                  margin: "12px 0 0",
                  fontSize: "11px",
                  color: "#8a9a9a",
                }}
              >
                <Link href="{{{RESEND_UNSUBSCRIBE_URL}}}" style={{ color: "#8a9a9a" }}>
                  {isEn ? "Unsubscribe" : "Abmelden"}
                </Link>
              </Text>
            ) : null}
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export function EmailButton({
  href,
  label,
  variant = "primary",
}: {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
}) {
  const style =
    variant === "primary"
      ? {
          backgroundColor: accentColor,
          color: "#ffffff",
        }
      : {
          backgroundColor: "transparent",
          color: brandColor,
          border: `1px solid ${brandColor}`,
        };

  return (
    <Section style={{ margin: "0 0 12px" }}>
      <Link
        href={href}
        style={{
          display: "inline-block",
          padding: variant === "primary" ? "14px 32px" : "13px 32px",
          borderRadius: "999px",
          fontSize: "13px",
          fontWeight: "600",
          letterSpacing: "0.06em",
          textTransform: "uppercase" as const,
          textDecoration: "none",
          textAlign: "center" as const,
          ...style,
        }}
      >
        {label}
      </Link>
    </Section>
  );
}

export function EmailQuote({ children }: { children: ReactNode }) {
  return (
    <Section
      style={{
        margin: "0 0 28px",
        padding: "20px 24px",
        backgroundColor: "#f2fafa",
        borderLeft: `3px solid ${goldColor}`,
      }}
    >
      <Text
        style={{
          margin: "0",
          fontSize: "15px",
          lineHeight: "1.65",
          color: brandColor,
          fontStyle: "italic",
        }}
      >
        {children}
      </Text>
    </Section>
  );
}

export const internalMain = {
  backgroundColor: "#f6f6f6",
  fontFamily: "Helvetica, Arial, sans-serif",
};

export const internalContainer = {
  margin: "0 auto",
  maxWidth: "560px",
  backgroundColor: "#ffffff",
};

export { text, mutedText, brandColor, accentColor };
