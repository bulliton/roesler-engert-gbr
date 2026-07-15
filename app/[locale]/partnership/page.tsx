import { setRequestLocale } from "next-intl/server";
import { PartnershipPageContent } from "@/components/sections/PartnershipPageContent";
import { CtaBand } from "@/components/sections/CtaBand";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PartnershipPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PartnershipPageContent />
      <CtaBand />
    </>
  );
}
