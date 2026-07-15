"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import {
  GemologyIcon,
  HeritageIcon,
  ManufactureIcon,
  PartnersNetworkIcon,
} from "@/components/ui/Icons";
import { Headline } from "@/components/ui/Headline";
import { Section } from "@/components/ui/Section";

const trustSignals = [
  { key: "signal1", icon: PartnersNetworkIcon },
  { key: "signal2", icon: ManufactureIcon },
  { key: "signal3", icon: GemologyIcon },
  { key: "signal4", icon: HeritageIcon },
] as const;

function splitTitle(title: string): { highlight?: string; rest: string } {
  const match = title.match(/^(\d+\+?)\s+(.+)$/);
  if (match) return { highlight: match[1], rest: match[2] };
  return { rest: title };
}

export function PartnerLogosSection() {
  const t = useTranslations("home.partners");

  return (
    <Section pattern className="border-y border-primary/8">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center md:mb-16"
        >
          <Headline as="h2" bar className="mx-auto">
            {t("title")}
          </Headline>
        </motion.div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-primary/10">
          {trustSignals.map(({ key, icon: Icon }, index) => {
            const title = t(`signals.${key}.title`);
            const { highlight, rest } = splitTitle(title);

            return (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                className="trust-signal group flex flex-col items-center px-2 text-center lg:px-8"
              >
                <div className="trust-signal-icon mb-6">
                  <Icon className="relative z-10 h-5 w-5" />
                </div>

                <div className="trust-signal-accent mb-5" aria-hidden />

                {highlight ? (
                  <div className="mb-3">
                    <p className="font-display text-[clamp(2rem,3vw,2.75rem)] leading-none text-primary">
                      {highlight}
                    </p>
                    <p className="mt-2 text-xs font-semibold tracking-[0.18em] text-secondary uppercase">
                      {rest}
                    </p>
                  </div>
                ) : (
                  <p className="mb-3 max-w-[12rem] font-display text-[clamp(1.25rem,1.5vw+0.5rem,1.5rem)] leading-snug text-primary">
                    {rest}
                  </p>
                )}

                <p className="max-w-[16rem] text-sm leading-relaxed text-muted">
                  {t(`signals.${key}.text`)}
                </p>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
