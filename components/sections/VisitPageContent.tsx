"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Headline } from "@/components/ui/Headline";
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

      <Section>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mb-12 aspect-[21/9] overflow-hidden rounded-sm md:mb-14"
          >
            <Image
              src={SITE_IMAGES.workshopInterior}
              alt=""
              fill
              className="object-cover object-[center_40%]"
              sizes="100vw"
              priority
            />
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-2">
            {optionKeys.map((key, i) => (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-sm border border-primary/10 bg-primary-light p-8"
              >
                <Headline as="h2" bar={false}>
                  {t(`options.${key}.title`)}
                </Headline>
                <p className="mt-4 leading-relaxed text-muted">{t(`options.${key}.text`)}</p>
                <ul className="mt-6 space-y-2 text-sm text-primary">
                  {(["point1", "point2", "point3"] as const).map((point) => (
                    <li key={point} className="flex gap--2">
                      <span className="text-secondary">•</span>
                      <span>{t(`options.${key}.${point}`)}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>

          <div className="mt-12 rounded-sm border border-primary/10 p-8 text-center">
            <p className="text-sm font-semibold tracking-wide text-secondary uppercase">
              {t("location.label")}
            </p>
            <p className="mt-3 text-lg text-primary">
              {CONTACT.address.street}
              <br />
              {CONTACT.address.city}, {CONTACT.address.country}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href={CONTACT.appointmentUrl} external variant="primary" shape="pill">
                {t("cta.appointment")}
              </Button>
              <Button href="/contact" variant="outline" shape="pill">
                {t("cta.contact")}
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
