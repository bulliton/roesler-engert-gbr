"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Headline } from "@/components/ui/Headline";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";

const serviceKeys = [
  "invoice",
  "ringAdjustments",
  "engraving",
  "shipping",
  "customization",
] as const;

export function ServicesPageContent() {
  const t = useTranslations("services");

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
            {serviceKeys.map((key, i) => (
              <motion.li
                key={key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="editorial-list-item"
              >
                <Headline as="h4">{t(`items.${key}.title`)}</Headline>
                <p className="text-sm leading-relaxed text-muted md:text-base">
                  {t(`items.${key}.text`)}
                </p>
              </motion.li>
            ))}
          </ul>

          <div className="section-actions flex flex-wrap gap-4">
            <Button href="/contact" variant="primary">
              {t("cta.contact")}
            </Button>
            <Button href="/catalog" variant="outline">
              {t("cta.catalog")}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
