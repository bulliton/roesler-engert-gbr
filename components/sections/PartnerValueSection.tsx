"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DiamondIcon } from "@/components/ui/DiamondIcon";
import { Headline } from "@/components/ui/Headline";
import { Section } from "@/components/ui/Section";

const items = ["gemology", "manufacturing", "advisor", "service"] as const;

export function PartnerValueSection() {
  const t = useTranslations("home.partnerValue");

  return (
    <Section contrast>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-12 max-w-2xl text-center md:mb-14"
        >
          <DiamondIcon animate className="mx-auto mb-6 h-14 w-14 text-accent-gold" />
          <Headline as="h2" contrast bar={false}>
            {t("title")}
          </Headline>
          <p className="mt-4 text-lg leading-relaxed text-white/80">{t("subtitle")}</p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:gap-10">
          {items.map((key, index) => (
            <motion.article
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="border-t border-white/15 pt-6"
            >
              <h3 className="font-display text-xl text-white">{t(`items.${key}.title`)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/75 md:text-base">
                {t(`items.${key}.text`)}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 flex justify-center md:mt-14">
          <Button href="/partnership" variant="outline-contrast" shape="pill">
            {t("cta")}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
