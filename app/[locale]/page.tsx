import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { AboutPreviewSection } from "@/components/sections/AboutPreviewSection";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { ExpertiseSection } from "@/components/sections/ExpertiseSection";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutPreviewSection />
      <CategoriesSection />
      <ExpertiseSection />
    </>
  );
}
