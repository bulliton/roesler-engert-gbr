"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Headline } from "@/components/ui/Headline";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";

export function AboutPageContent() {
  const t = useTranslations("about");

  const blocks = [
    {
      key: "heritage" as const,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    },
    {
      key: "gemology" as const,
      image: "https://images.unsplash.com/photo-1605100804763-247fc67f9958?w=800&q=80",
    },
    {
      key: "manufacturing" as const,
      image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <Section>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] overflow-hidden rounded-sm"
            >
              <Image
                src={blocks[0].image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Headline as="h2">{t("heritage.title")}</Headline>
              <p className="mt-6 text-muted leading-relaxed">
                {t("heritage.text")}
              </p>
            </motion.div>
          </div>
        </Container>
      </Section>

      <Section className="bg-primary-light" id="leadership">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[3/2] overflow-hidden rounded-sm lg:order-2"
            >
              <Image
                src="/images/leadership.webp"
                alt={t("leadership.imageAlt")}
                fill
                className="object-cover object-[center_20%]"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
                priority
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:order-1"
            >
              <p className="mb-3 text-sm font-semibold tracking-[0.15em] text-secondary uppercase">
                {t("leadership.eyebrow")}
              </p>
              <Headline as="h2">{t("leadership.title")}</Headline>
              <p className="mt-6 text-muted leading-relaxed">
                {t("leadership.text")}
              </p>
            </motion.div>
          </div>
        </Container>
      </Section>

      {blocks.slice(1).map((block, i) => (
        <Section key={block.key} className={i % 2 === 0 ? "" : "bg-primary-light"}>
          <Container>
            <div
              className={`grid items-center gap-12 lg:grid-cols-2 ${i % 2 === 0 ? "lg:[direction:rtl]" : ""}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative aspect-[4/3] overflow-hidden rounded-sm ${i % 2 === 0 ? "lg:[direction:ltr]" : ""}`}
              >
                <Image
                  src={block.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className={i % 2 === 0 ? "lg:[direction:ltr]" : ""}
              >
                <Headline as="h2">{t(`${block.key}.title`)}</Headline>
                <p className="mt-6 text-muted leading-relaxed">
                  {t(`${block.key}.text`)}
                </p>
              </motion.div>
            </div>
          </Container>
        </Section>
      ))}
    </>
  );
}
