import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Headline } from "@/components/ui/Headline";
import { Section } from "@/components/ui/Section";
import type { LegalNamespace, LegalSection } from "@/lib/legal";

type LegalPageProps = {
  namespace: LegalNamespace;
};

export async function LegalPageContent({ namespace }: LegalPageProps) {
  const t = await getTranslations(namespace);
  const sections = t.raw("sections") as LegalSection[];

  return (
    <Section className="bg-primary-light !pt-28">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Headline as="h1">{t("title")}</Headline>
          <p className="mt-4 text-sm text-muted">{t("lastUpdated")}</p>

          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-xl text-primary">{section.heading}</h2>
                <div className="mt-4 space-y-4 text-muted leading-relaxed">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
