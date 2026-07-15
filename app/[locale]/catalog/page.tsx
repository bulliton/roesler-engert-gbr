import { setRequestLocale } from "next-intl/server";
import { CatalogPageContent } from "@/components/sections/CatalogPageContent";
import { CtaBand } from "@/components/sections/CtaBand";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CatalogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <CatalogPageContent />
      <CtaBand />
    </>
  );
}
