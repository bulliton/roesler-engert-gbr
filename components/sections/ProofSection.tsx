"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Headline } from "@/components/ui/Headline";
import { Section } from "@/components/ui/Section";
import { StatCounter } from "@/components/ui/StatCounter";
import {
  GemologyIcon,
  HeritageIcon,
  ManufactureIcon,
  PartnersNetworkIcon,
} from "@/components/ui/Icons";

const trustSignals = [
  { key: "signal1", icon: PartnersNetworkIcon },
  { key: "signal2", icon: ManufactureIcon },
  { key: "signal3", icon: GemologyIcon },
  { key: "signal4", icon: HeritageIcon },
] as const;

export function ProofSection() {
  const t = useTranslations("home");
  const tPartners = useTranslations("home.partners");

  const stats = [
    { value: t("stats.years.value"), label: t("stats.years.label") },
    { value: t("stats.pieces.value"), label: t("stats.pieces.label") },
    { value: t("stats.partners.value"), label: t("stats.partners.label") },
    { value: t("stats.cuts.value"), label: t("stats.cuts.label") },
  ];

  return (
    <Section pattern className="border-y border-primary/8">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-2xl text-center md:mb-14"
        >
          <Headline as="h2" bar className="mx-auto">
            {t("proof.title")}
          </Headline>
          <p className="mt-4 text-muted leading-relaxed">{t("proof.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10">
          {stats.map((stat) => (
            <StatCounter key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mx-auto mt-14 max-w-3xl px-6 text-center md:mt-16 md:px-10"
        >
          <div
            className="mx-auto mb-6 h-px w-16 bg-gradient-to-r from-transparent via-accent-gold to-transparent"
            aria-hidden
          />
          <p className="font-display text-[clamp(1.25rem,1.5vw+0.75rem,1.625rem)] leading-snug text-primary italic">
            &ldquo;{t("proof.quote.text")}&rdquo;
          </p>
          <footer className="mt-4 text-sm tracking-wide text-muted uppercase">
            — {t("proof.quote.attribution")}
          </footer>
        </motion.blockquote>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-primary/10">
          {trustSignals.map(({ key, icon: Icon }, index) => (
            <motion.article
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="trust-signal group flex flex-col items-center px-2 text-center lg:px-6"
            >
              <div className="trust-signal-icon mb-5">
                <Icon className="relative z-10 h-5 w-5" />
              </div>
              <p className="mb-2 font-display text-lg leading-snug text-primary">
                {tPartners(`signals.${key}.title`)}
              </p>
              <p className="max-w-[14rem] text-sm leading-relaxed text-muted">
                {tPartners(`signals.${key}.text`)}
              </p>
            </motion.article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
