"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
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
          src: SITE_IMAGES.leadership,
          objectPosition: "object-[center_20%]",
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
            {steps.map((key, index) => (
              <motion.li
                key={key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="editorial-list-item"
              >
                <div>
                  <p className="text-xs font-normal tracking-[0.14em] text-muted uppercase">
                    {t(`steps.${key}.eyebrow`)}
                  </p>
                  <p className="mt-2 font-display text-[clamp(1.125rem,1.2vw+0.5rem,1.375rem)] leading-snug text-primary">
                    {t(`steps.${key}.title`)}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-muted md:text-base">
                  {t(`steps.${key}.text`)}
                </p>
              </motion.li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section contrast className="!py-16 md:!py-20">
        <Container>
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="font-display text-[clamp(1.5rem,2vw+0.5rem,2.25rem)] leading-snug text-white">
                {t("cta.title")}
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
                {t("cta.text")}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-4">
              <Button href="/contact" variant="inverse-contrast">
                {t("cta.contact")}
              </Button>
              <Button
                href={CONTACT.appointmentUrl}
                external
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
