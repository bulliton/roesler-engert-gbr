"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  BookmarkIcon,
  HeritageIcon,
  PartnersNetworkIcon,
  UserIcon,
} from "@/components/ui/Icons";
import { Headline } from "@/components/ui/Headline";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";
import { CONTACT } from "@/lib/constants";
import { SITE_IMAGES } from "@/lib/site-images";

const steps = [
  { key: "intro", icon: PartnersNetworkIcon },
  { key: "advisor", icon: UserIcon },
  { key: "support", icon: BookmarkIcon },
  { key: "growth", icon: HeritageIcon },
] as const;

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
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
            >
              <p className="mb-3 text-sm font-semibold tracking-[0.15em] text-secondary uppercase">
                {t("hero.eyebrow")}
              </p>
              <Headline as="h2" bar>
                {t("story.title")}
              </Headline>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                {t("story.text")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="relative aspect-[4/3] overflow-hidden rounded-sm"
            >
              <Image
                src={SITE_IMAGES.leadership}
                alt=""
                fill
                className="object-cover object-[center_20%]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-primary/10" />
            </motion.div>
          </div>
        </Container>
      </Section>

      <Section pattern className="border-y border-primary/8">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-14 max-w-2xl text-center md:mb-16"
          >
            <p className="mb-3 text-sm font-semibold tracking-[0.15em] text-secondary uppercase">
              {t("journey.eyebrow")}
            </p>
            <Headline as="h2" bar className="mx-auto">
              {t("journey.title")}
            </Headline>
          </motion.div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-primary/10">
            {steps.map(({ key, icon: Icon }, index) => (
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

                <p className="text-xs font-semibold tracking-[0.18em] text-secondary uppercase">
                  {t(`steps.${key}.eyebrow`)}
                </p>
                <Headline
                  as="h3"
                  bar={false}
                  className="mt-3 !text-[clamp(1.125rem,1.2vw+0.75rem,1.375rem)] leading-snug"
                >
                  {t(`steps.${key}.title`)}
                </Headline>
                <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-muted">
                  {t(`steps.${key}.text`)}
                </p>
              </motion.article>
            ))}
          </div>
        </Container>
      </Section>

      <Section contrast className="!py-14 md:!py-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left"
          >
            <div className="max-w-2xl">
              <p className="font-display text-2xl text-white md:text-3xl">
                {t("cta.title")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/80 md:text-base">
                {t("cta.text")}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap justify-center gap-4">
              <Button href="/contact" variant="primary" shape="pill">
                {t("cta.contact")}
              </Button>
              <Button
                href={CONTACT.appointmentUrl}
                external
                variant="outline-contrast"
                shape="pill"
              >
                {t("cta.appointment")}
              </Button>
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
