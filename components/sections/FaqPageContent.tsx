"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Headline } from "@/components/ui/Headline";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";
import { CONTACT } from "@/lib/constants";

const faqKeys = [
  "partnership",
  "minimumOrder",
  "catalog",
  "customization",
  "shipping",
  "appointment",
] as const;

export function FaqPageContent() {
  const t = useTranslations("faq");

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl divide-y divide-primary/10">
            {faqKeys.map((key) => (
              <details key={key} className="group py-6">
                <summary className="cursor-pointer list-none font-display text-lg text-primary transition-colors group-open:text-secondary">
                  <span className="flex items-start justify-between gap-4">
                    {t(`items.${key}.question`)}
                    <span className="text-secondary">+</span>
                  </span>
                </summary>
                <p className="mt-4 pr-8 text-sm leading-relaxed text-muted">
                  {t(`items.${key}.answer`)}
                </p>
              </details>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-3xl rounded-sm bg-primary-light p-8 text-center">
            <Headline as="h2" bar={false} className="!text-2xl">
              {t("cta.title")}
            </Headline>
            <p className="mt-4 text-muted">{t("cta.text")}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="primary" shape="pill">
                {t("cta.contact")}
              </Button>
              <Button href={CONTACT.appointmentUrl} external variant="outline" shape="pill">
                {t("cta.appointment")}
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
