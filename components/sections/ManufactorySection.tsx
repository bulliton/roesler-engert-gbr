"use client";

import { useTranslations } from "next-intl";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { SITE_IMAGES } from "@/lib/site-images";

export function ManufactorySection() {
  const t = useTranslations("home.atelier");

  return (
    <FeatureSection
      image={{
        src: SITE_IMAGES.handsCrafting,
        objectPosition: "object-[center_40%]",
      }}
      eyebrow={t("eyebrow")}
      title={t("title")}
      text={t("subtitle")}
      cta={{ href: "/visit", label: t("cta") }}
    />
  );
}
