"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Headline } from "@/components/ui/Headline";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";
import { CONTACT } from "@/lib/constants";

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
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {serviceKeys.map((key, i) => (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-sm border border-primary/10 bg-primary-light p-6"
              >
                <Headline as="h3" bar={false} className="!text-xl">
                  {t(`items.${key}.title`)}
                </Headline>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {t(`items.${key}.text`)}
                </p>
              </motion.article>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap justify-center gap-4">
            <Button href={CONTACT.appointmentUrl} external variant="primary" shape="pill">
              {t("cta.appointment")}
            </Button>
            <Button href="/catalog" variant="outline" shape="pill">
              {t("cta.catalog")}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
