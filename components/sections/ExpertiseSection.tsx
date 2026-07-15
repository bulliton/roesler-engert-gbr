"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DiamondIcon } from "@/components/ui/DiamondIcon";
import { Headline } from "@/components/ui/Headline";
import { Section } from "@/components/ui/Section";

export function ExpertiseSection() {
  const t = useTranslations("home.expertise");

  return (
    <Section contrast>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <DiamondIcon
            animate
            className="mb-8 h-20 w-20 text-secondary"
          />
          <Headline as="h2" contrast bar={false}>
            {t("title")}
          </Headline>
          <p className="mt-6 text-lg leading-relaxed text-white/85">
            {t("text")}
          </p>
          <div className="mt-10">
            <Button variant="outline-contrast" href="/contact">
              {t("cta")}
            </Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
