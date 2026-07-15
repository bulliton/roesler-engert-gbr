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
    { key: "heritage" as const, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80" },
    { key: "gemology" as const, image: "https://images.unsplash.com/photo-1605100804763-247fc67f9958?w=800&q=80" },
    { key: "manufacturing" as const, image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80" },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />
      {blocks.map((block, i) => (
        <Section key={block.key} className={i % 2 === 1 ? "bg-primary-light" : ""}>
          <Container>
            <div
              className={`grid items-center gap-12 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative aspect-[4/3] overflow-hidden rounded-sm ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}
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
                className={i % 2 === 1 ? "lg:[direction:ltr]" : ""}
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
