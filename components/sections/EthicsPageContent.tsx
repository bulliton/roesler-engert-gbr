"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Headline } from "@/components/ui/Headline";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { PageHero } from "@/components/sections/PageHero";

const sectionKeys = ["sourcing", "gemology", "partnership"] as const;

export function EthicsPageContent() {
  const t = useTranslations("ethics");

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <Section>
        <Container>
          <ul className="editorial-list">
            {sectionKeys.map((key) => (
              <li key={key} className="editorial-list-item">
                <Headline as="h3">{t(`sections.${key}.title`)}</Headline>
                <p className="text-sm leading-relaxed text-muted md:text-base">
                  {t(`sections.${key}.text`)}
                </p>
              </li>
            ))}
          </ul>

          <div className="section-actions flex flex-wrap gap-4">
            <Button href="/contact">{t("cta.contact")}</Button>
            <Button href="/diamonds" variant="outline">
              {t("cta.diamonds")}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
