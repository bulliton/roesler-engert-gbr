"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Headline } from "@/components/ui/Headline";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { PageHero } from "@/components/sections/PageHero";
import { SITE_IMAGES } from "@/lib/site-images";

const jewelryCategories = [
  {
    id: "earrings",
    image: SITE_IMAGES.earringsCraft,
  },
  {
    id: "rings",
    image: SITE_IMAGES.ringSetting,
  },
  {
    id: "necklaces",
    image: SITE_IMAGES.necklaceCraft,
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

      <Section elevated className="border-b border-primary/10">
        <Container>
          <SectionIntro title={t("manufactory.title")} />
          <p className="max-w-2xl text-muted leading-relaxed">{t("manufactory.text")}</p>
        </Container>
      </Section>

      {jewelryCategories.map((cat, i) => (
        <Section
          key={cat.id}
          id={cat.id}
          className={`scroll-mt-[calc(var(--header-offset)+1rem)] ${i % 2 === 1 ? "surface-elevated" : ""}`}
        >
          <Container>
            <div
              className={`grid items-center gap-12 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}
            >
              <div
                className={`relative aspect-[4/3] overflow-hidden ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}
              >
                <Image
                  src={cat.image}
                  alt={t(`categories.${cat.id}.title`)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className={i % 2 === 1 ? "lg:[direction:ltr]" : ""}>
                <Headline as="h2">{t(`categories.${cat.id}.title`)}</Headline>
                <p className="mt-6 text-muted leading-relaxed">
                  {t(`categories.${cat.id}.description`)}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button href="/contact">{t("cta.samples")}</Button>
                  <Button href="/catalog" variant="outline">
                    {t("cta.catalog")}
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      ))}
    </>
  );
}
