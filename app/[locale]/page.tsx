import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProofSection } from "@/components/sections/ProofSection";
import { AtelierSection } from "@/components/sections/AtelierSection";
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
      <AtelierSection />
      <PartnerValueSection />
      <CtaBand />
    </>
  );
}
