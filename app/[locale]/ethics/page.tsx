import { setRequestLocale } from "next-intl/server";
import { EthicsPageContent } from "@/components/sections/EthicsPageContent";
import { CtaBand } from "@/components/sections/CtaBand";
import { generatePageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generatePageMetadata({ locale, namespace: "ethics" });
}

export default async function EthicsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <EthicsPageContent />
      <CtaBand />
    </>
  );
}
