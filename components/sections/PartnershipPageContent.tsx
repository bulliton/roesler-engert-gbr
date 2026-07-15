"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Headline } from "@/components/ui/Headline";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";
import { CONTACT } from "@/lib/constants";

const stepKeys = ["intro", "advisor", "support", "growth"] as const;

export function PartnershipPageContent() {
  const t = useTranslations("partnership");

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
            <Headline as="h2">{t("story.title")}</Headline>
            <p className="mt-6 text-lg leading-relaxed text-muted">{t("story.text")}</p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {stepKeys.map((key, i) => (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-sm border border-primary/10 p-6"
              >
                <p className="text-sm font-semibold tracking-[0.2em] text-secondary uppercase">
                  {t(`steps.${key}.eyebrow`)}
                </p>
                <Headline as="h3" bar={false} className="mt-3 !text-xl">
                  {t(`steps.${key}.title`)}
                </Headline>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {t(`steps.${key}.text`)}
                </p>
              </motion.article>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="primary" shape="pill">
              {t("cta.contact")}
            </Button>
            <Button href={CONTACT.appointmentUrl} external variant="outline" shape="pill">
              {t("cta.appointment")}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
