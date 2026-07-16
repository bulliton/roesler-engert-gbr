import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Headline } from "@/components/ui/Headline";
import { Section } from "@/components/ui/Section";

export async function CtaBand() {
  const t = await getTranslations("ctaBand");

  return (
    <Section contrast className="!py-16 md:!py-20">
      <Container>
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Headline as="h2" contrast>
              {t("title")}
            </Headline>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
              {t("text")}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-4">
            <Button href="/contact" variant="inverse-contrast">
              {t("contact")}
            </Button>
            <Button href="/catalog" variant="outline-contrast">
              {t("catalog")}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
