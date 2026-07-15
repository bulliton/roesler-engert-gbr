import { setRequestLocale } from "next-intl/server";
import { JewelryPageContent } from "@/components/sections/JewelryPageContent";
import { CtaBand } from "@/components/sections/CtaBand";

type Props = {
  params: Promise<{ locale: string }>;
};

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
