import { setRequestLocale } from "next-intl/server";
import { FaqPageContent } from "@/components/sections/FaqPageContent";
import { CtaBand } from "@/components/sections/CtaBand";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <FaqPageContent />
      <CtaBand />
    </>
  );
}
