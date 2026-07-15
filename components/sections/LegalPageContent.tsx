import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Headline } from "@/components/ui/Headline";
import { Section } from "@/components/ui/Section";

type LegalPageProps = {
  namespace: "legal.imprint" | "legal.privacy";
};

export async function LegalPageContent({ namespace }: LegalPageProps) {
  const t = await getTranslations(namespace);

  return (
    <Section className="bg-primary-light !pt-28">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Headline as="h1">{t("title")}</Headline>
          <div className="mt-8 space-y-4 whitespace-pre-line text-muted leading-relaxed">
            {t("content")}
          </div>
        </div>
      </Container>
    </Section>
  );
}
