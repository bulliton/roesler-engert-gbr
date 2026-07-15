import { setRequestLocale } from "next-intl/server";
import { AboutPageContent } from "@/components/sections/AboutPageContent";
import { CtaBand } from "@/components/sections/CtaBand";

type Props = {
  params: Promise<{ locale: string }>;
};

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
