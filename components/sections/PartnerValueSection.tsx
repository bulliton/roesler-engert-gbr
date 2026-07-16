"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Headline } from "@/components/ui/Headline";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Section } from "@/components/ui/Section";

const items = ["gemology", "manufacturing", "advisor"] as const;

export function PartnerValueSection() {
  const t = useTranslations("home.partnerValue");

  return (
    <Section>
      <Container>
        <SectionIntro
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <ul className="editorial-list">
          {items.map((key, index) => (
            <motion.li
              key={key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="editorial-list-item"
            >
              <Headline as="h4">{t(`items.${key}.title`)}</Headline>
              <p className="text-sm leading-relaxed text-muted md:text-base">
                {t(`items.${key}.text`)}
              </p>
            </motion.li>
          ))}
        </ul>

        <div className="section-actions">
          <Button href="/partnership" variant="outline">
            {t("cta")}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
