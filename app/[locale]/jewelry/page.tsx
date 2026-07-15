import { setRequestLocale } from "next-intl/server";
import { JewelryPageContent } from "@/components/sections/JewelryPageContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function JewelryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <JewelryPageContent />;
}
