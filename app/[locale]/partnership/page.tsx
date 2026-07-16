import { setRequestLocale } from "next-intl/server";
import { PartnershipPageContent } from "@/components/sections/PartnershipPageContent";
import { generatePageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generatePageMetadata({ locale, namespace: "partnership" });
}

export default async function PartnershipPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PartnershipPageContent />;
}
