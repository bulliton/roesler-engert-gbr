import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProofSection } from "@/components/sections/ProofSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ManufactorySection } from "@/components/sections/ManufactorySection";
import { PartnerValueSection } from "@/components/sections/PartnerValueSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { generatePageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generatePageMetadata({
    locale,
    namespace: "metadata",
    titleKey: "siteName",
    descriptionKey: "defaultDescription",
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <ProofSection />
      <StatsSection />
      <ManufactorySection />
      <PartnerValueSection />
      <CtaBand />
    </>
  );
}
