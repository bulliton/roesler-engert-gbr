"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Headline } from "@/components/ui/Headline";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Section } from "@/components/ui/Section";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { PageHero } from "@/components/sections/PageHero";
import { CONTACT } from "@/lib/constants";
import { SITE_IMAGES } from "@/lib/site-images";

const steps = ["intro", "advisor", "support", "growth"] as const;

export function PartnershipPageContent() {
  const t = useTranslations("partnership");

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <FeatureSection
        image={{
          src: SITE_IMAGES.leadershipPhoto,
          objectPosition: "object-[center_20%]",
          quality: 90,
        }}
        eyebrow={t("hero.eyebrow")}
        title={t("story.title")}
        text={t("story.text")}
        imagePosition="right"
      />

      <Section className="border-t border-primary/10">
        <Container>
          <SectionIntro
            eyebrow={t("journey.eyebrow")}
            title={t("journey.title")}
          />

          <ol className="editorial-list">
            {steps.map((key) => (
              <li key={key} className="editorial-list-item">
                <div>
                  <p className="text-[var(--text-xs)] font-normal tracking-[0.12em] text-muted uppercase">
                    {t(`steps.${key}.eyebrow`)}
                  </p>
                  <Headline as="h3" className="mt-2">
                    {t(`steps.${key}.title`)}
                  </Headline>
                </div>
                <p className="text-sm leading-relaxed text-muted md:text-base">
                  {t(`steps.${key}.text`)}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section contrast className="!py-16 md:!py-20">
        <Container>
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <Headline as="h2" contrast>
                {t("cta.title")}
              </Headline>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
                {t("cta.text")}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-4">
              <Button href="/contact" variant="inverse-contrast">
                {t("cta.contact")}
              </Button>
              <Button
                href={CONTACT.appointmentPath}
                hash={CONTACT.appointmentHash}
                variant="outline-contrast"
              >
                {t("cta.appointment")}
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
