"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Headline } from "@/components/ui/Headline";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";

const jewelryCategories = [
  {
    id: "earrings",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
  },
  {
    id: "rings",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=80",
  },
  {
    id: "necklaces",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
  },
] as const;

export function JewelryPageContent() {
  const t = useTranslations("jewelry");

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />
      {jewelryCategories.map((cat, i) => (
        <Section
          key={cat.id}
          id={cat.id}
          className={i % 2 === 1 ? "bg-primary-light" : ""}
        >
          <Container>
            <div
              className={`grid items-center gap-12 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`relative aspect-[4/3] overflow-hidden rounded-sm ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}
              >
                <Image
                  src={cat.image}
                  alt={t(`categories.${cat.id}.title`)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
              <div className={i % 2 === 1 ? "lg:[direction:ltr]" : ""}>
                <Headline as="h2">{t(`categories.${cat.id}.title`)}</Headline>
                <p className="mt-6 text-muted leading-relaxed">
                  {t(`categories.${cat.id}.description`)}
                </p>
              </div>
            </div>
          </Container>
        </Section>
      ))}
    </>
  );
}
