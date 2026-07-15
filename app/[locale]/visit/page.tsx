import { setRequestLocale } from "next-intl/server";
import { VisitPageContent } from "@/components/sections/VisitPageContent";
import { CtaBand } from "@/components/sections/CtaBand";

type Props = {
  params: Promise<{ locale: string }>;
};

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
