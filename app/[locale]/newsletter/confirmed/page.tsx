import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Link } from "@/lib/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function NewsletterConfirmedPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("newsletterConfirmed");

  return (
    <section className="bg-primary-light py-[var(--section-padding-y)]">
      <Container className="max-w-2xl text-center">
        <p className="mb-3 font-body text-xs font-semibold tracking-[0.18em] text-secondary uppercase">
          Newsletter
        </p>
        <h1 className="mb-6 font-display text-[clamp(2rem,4vw,2.75rem)] font-normal text-primary">
          {t("title")}
        </h1>
        <p className="mb-8 font-body text-lg leading-relaxed text-muted">
          {t("description")}
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-secondary px-8 py-3 text-xs font-semibold tracking-[0.12em] text-white uppercase transition-colors hover:bg-secondary/90"
        >
          {t("backHome")}
        </Link>
      </Container>
    </section>
  );
}
