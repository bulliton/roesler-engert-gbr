import { setRequestLocale } from "next-intl/server";
import { ServicesPageContent } from "@/components/sections/ServicesPageContent";
import { CtaBand } from "@/components/sections/CtaBand";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ServicesPageContent />
      <CtaBand />
    </>
  );
}
