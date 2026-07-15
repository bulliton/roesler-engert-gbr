"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function ProofSection() {
  const t = useTranslations("home.proof");

  return (
    <Section className="border-y border-primary/10 bg-primary-light !py-20 md:!py-28">
      <Container>
        <motion.figure
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mx-auto mb-10 h-px w-10 bg-accent-gold" aria-hidden />
          <blockquote>
            <p className="font-display text-[clamp(1.375rem,1.6vw+0.75rem,1.875rem)] leading-[1.4] text-primary">
              &ldquo;{t("quote.text")}&rdquo;
            </p>
          </blockquote>
          <figcaption className="mt-8 text-xs font-normal tracking-[0.14em] text-muted uppercase">
            {t("quote.attribution")}
          </figcaption>
        </motion.figure>
      </Container>
    </Section>
  );
}
