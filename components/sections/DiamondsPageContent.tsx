"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Headline } from "@/components/ui/Headline";
import { Section } from "@/components/ui/Section";
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
          <div className="mx-auto max-w-3xl text-center">
            <Headline as="h2">{t("expertise.title")}</Headline>
            <p className="mt-6 text-muted leading-relaxed">{t("expertise.text")}</p>
          </div>
        </Container>
      </Section>
      <Section className="bg-primary-light" pattern>
        <Container>
          <Headline as="h2" className="mb-12 text-center">
            {t("cuts.title")}
          </Headline>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {DIAMOND_CUT_KEYS.map((cut) => {
              const Icon = diamondCutIcons[cut];
              return (
                <div
                  key={cut}
                  className="flex flex-col items-center gap-3 rounded-sm bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <Icon className="h-16 w-16 text-primary" />
                  <span className="text-sm font-semibold text-primary">
                    {t(`cuts.${cut}`)}
                  </span>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
