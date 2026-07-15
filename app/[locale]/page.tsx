import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/HeroSection";
import { ManufactorySection } from "@/components/sections/ManufactorySection";
import { ProofSection } from "@/components/sections/ProofSection";
import { PartnerValueSection } from "@/components/sections/PartnerValueSection";
import { CtaBand } from "@/components/sections/CtaBand";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <ProofSection />
      <ManufactorySection />
      <PartnerValueSection />
      <CtaBand />
    </>
  );
}
