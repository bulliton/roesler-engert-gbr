"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Headline } from "@/components/ui/Headline";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { PageHero } from "@/components/sections/PageHero";
import {
  DIAMOND_CUT_KEYS,
  diamondCutIcons,
} from "@/lib/diamond-cuts";

export function DiamondsPageContent() {
  const t = useTranslations("diamonds");

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <Headline as="h2">{t("expertise.title")}</Headline>
            <p className="mt-6 text-muted leading-relaxed">{t("expertise.text")}</p>
          </div>
        </Container>
      </Section>

      <Section elevated className="border-t border-primary/10">
        <Container>
          <SectionIntro title={t("education.title")} />
          <p className="mx-auto max-w-3xl text-muted leading-relaxed">
            {t("education.text")}
          </p>
          <ul className="editorial-list mt-10 max-w-3xl">
            {(["certification", "traceability", "consultation"] as const).map(
              (key) => (
                <li key={key} className="editorial-list-item !grid-cols-1">
                  <p className="text-primary">{t(`education.${key}`)}</p>
                </li>
              ),
            )}
          </ul>
          <div className="section-actions flex flex-wrap gap-4">
            <Button href="/catalog">{t("cta.catalog")}</Button>
            <Button href="/contact" variant="outline">
              {t("cta.contact")}
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-primary/10">
        <Container>
          <Headline as="h2" className="section-intro-block">
            {t("cuts.title")}
          </Headline>
          <div className="grid gap-0 divide-y divide-primary/10 border-t border-primary/10">
            {DIAMOND_CUT_KEYS.map((cut) => {
              const Icon = diamondCutIcons[cut];
              return (
                <article
                  key={cut}
                  id={cut}
                  className="scroll-mt-[calc(var(--header-offset)+1rem)] grid gap-6 py-10 md:grid-cols-[auto_1fr] md:items-start md:gap-10"
                >
                  <div className="flex items-center gap-4">
                    <Icon className="h-12 w-12 text-primary/70" />
                    <h3 className="font-display text-primary">
                      {t(`cuts.${cut}`)}
                    </h3>
                  </div>
                  <p className="text-muted leading-relaxed">
                    {t(`cuts.descriptions.${cut}`)}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
