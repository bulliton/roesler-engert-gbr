"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";
import { CONTACT } from "@/lib/constants";
import { SITE_IMAGES } from "@/lib/site-images";

const optionKeys = ["showroom", "fieldService"] as const;

export function VisitPageContent() {
  const t = useTranslations("visit");

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <Section className="!py-0">
        <div className="relative aspect-[21/9] min-h-[14rem] w-full">
          <Image
            src={SITE_IMAGES.workshopInterior}
            alt=""
            fill
            className="object-cover object-[center_40%]"
            sizes="100vw"
            priority
          />
        </div>
      </Section>

      <Section>
        <Container>
          <ul className="editorial-list">
            {optionKeys.map((key, i) => (
              <motion.li
                key={key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="editorial-list-item"
              >
                <p className="font-display text-[clamp(1.125rem,1.2vw+0.5rem,1.375rem)] leading-snug text-primary">
                  {t(`options.${key}.title`)}
                </p>
                <div>
                  <p className="text-sm leading-relaxed text-muted md:text-base">
                    {t(`options.${key}.text`)}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-primary">
                    {(["point1", "point2", "point3"] as const).map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="text-accent-gold">—</span>
                        <span>{t(`options.${key}.${point}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            ))}
          </ul>

          <div className="section-divider">
            <SectionIntro title={t("location.label")} />
            <p className="mt-4 text-primary">
              {CONTACT.address.street}
              <br />
              {CONTACT.address.city}, {CONTACT.address.country}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact" variant="primary">
                {t("cta.contact")}
              </Button>
              <Button href="/contact" variant="outline">
                {t("cta.contact")}
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
