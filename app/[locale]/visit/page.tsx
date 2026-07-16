import { setRequestLocale } from "next-intl/server";
import { VisitPageContent } from "@/components/sections/VisitPageContent";
import { CtaBand } from "@/components/sections/CtaBand";
import { generatePageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generatePageMetadata({ locale, namespace: "visit" });
}

export default async function VisitPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <VisitPageContent />
      <CtaBand />
    </>
  );
}
