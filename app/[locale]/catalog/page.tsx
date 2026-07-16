import { setRequestLocale } from "next-intl/server";
import { CatalogPageContent } from "@/components/sections/CatalogPageContent";
import { CtaBand } from "@/components/sections/CtaBand";
import { generatePageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generatePageMetadata({ locale, namespace: "catalog" });
}

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
