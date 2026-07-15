"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Headline } from "@/components/ui/Headline";
import { Section } from "@/components/ui/Section";
import { SITE_IMAGES } from "@/lib/site-images";

const steps = [
  { key: "inspect" as const, image: SITE_IMAGES.precisionMeasurement },
  { key: "craft" as const, image: SITE_IMAGES.handsCrafting },
  { key: "finish" as const, image: SITE_IMAGES.qualityInspection },
  { key: "deliver" as const, image: SITE_IMAGES.workshopInterior },
];

export function AtelierSection() {
  const t = useTranslations("home.atelier");

  return (
    <Section id="atelier">
      <Container>
        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="mb-2 text-sm font-semibold tracking-[0.15em] text-accent-gold uppercase">
            {t("eyebrow")}
          </p>
          <Headline as="h2" bar>
            {t("title")}
          </Headline>
          <p className="mt-4 text-muted leading-relaxed">{t("subtitle")}</p>
        </div>

        <div className="space-y-0 divide-y divide-primary/10">
          {steps.map(({ key, image }, index) => (
            <motion.article
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="grid items-center gap-8 py-10 first:pt-0 last:pb-0 md:grid-cols-2 md:gap-12 md:py-12"
            >
              <div
                className={`relative aspect-[4/3] overflow-hidden rounded-sm ${index % 2 === 1 ? "md:order-2" : ""}`}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-primary/8" />
                <span className="absolute top-4 left-4 font-display text-5xl leading-none text-white/25">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <h3 className="font-display text-[clamp(1.35rem,1.5vw+0.75rem,1.75rem)] text-primary">
                  {t(`steps.${key}.title`)}
                </h3>
                <p className="mt-3 max-w-md text-muted leading-relaxed">
                  {t(`steps.${key}.text`)}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 md:mt-14">
          <Button href="/visit" variant="outline">
            {t("cta")}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
