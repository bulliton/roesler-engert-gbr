import { setRequestLocale } from "next-intl/server";
import { JewelryPageContent } from "@/components/sections/JewelryPageContent";
import { CtaBand } from "@/components/sections/CtaBand";
import { generatePageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generatePageMetadata({ locale, namespace: "jewelry" });
}

export default async function JewelryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <JewelryPageContent />
      <CtaBand />
    </>
  );
}
