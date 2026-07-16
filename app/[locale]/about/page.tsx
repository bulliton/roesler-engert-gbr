import { setRequestLocale } from "next-intl/server";
import { AboutPageContent } from "@/components/sections/AboutPageContent";
import { CtaBand } from "@/components/sections/CtaBand";
import { generatePageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generatePageMetadata({ locale, namespace: "about" });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <AboutPageContent />
      <CtaBand />
    </>
  );
}
