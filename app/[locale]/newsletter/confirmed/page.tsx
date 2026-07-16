import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Headline } from "@/components/ui/Headline";
import { generatePageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generatePageMetadata({ locale, namespace: "newsletterConfirmed" });
}

export default async function NewsletterConfirmedPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("newsletterConfirmed");

  return (
    <section className="bg-canvas py-[var(--section-padding-y)]">
      <Container className="max-w-2xl text-center">
        <p className="mb-3 text-[var(--text-xs)] font-normal tracking-[0.12em] text-accent-gold uppercase">
          Newsletter
        </p>
        <Headline as="h1" className="mb-6">
          {t("title")}
        </Headline>
        <p className="mb-8 text-lg leading-relaxed text-muted">
          {t("description")}
        </p>
        <Button href="/" variant="teal">
          {t("backHome")}
        </Button>
      </Container>
    </section>
  );
}
