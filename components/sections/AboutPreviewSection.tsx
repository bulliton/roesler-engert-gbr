"use client";

import { useTranslations } from "next-intl";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { SITE_IMAGES } from "@/lib/site-images";

export function AboutPreviewSection() {
  const t = useTranslations("home.aboutPreview");

  return (
    <FeatureSection
      image={{ src: SITE_IMAGES.workshopInterior }}
      eyebrow={t("eyebrow")}
      title={t("title")}
      text={t("text")}
      cta={{ href: "/about", label: t("link") }}
    />
  );
}
