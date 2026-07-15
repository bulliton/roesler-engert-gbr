import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/HeroSection";
import { DiamondCutsSection } from "@/components/sections/DiamondCutsSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { AboutPreviewSection } from "@/components/sections/AboutPreviewSection";
import { ShowroomSection } from "@/components/sections/ShowroomSection";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { ExpertiseSection } from "@/components/sections/ExpertiseSection";
import { PartnerLogosSection } from "@/components/sections/PartnerLogosSection";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <DiamondCutsSection />
      <StatsSection />
      <AboutPreviewSection />
      <ShowroomSection />
      <CategoriesSection />
      <ExpertiseSection />
      <PartnerLogosSection />
    </>
  );
}
