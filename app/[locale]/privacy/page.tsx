import { setRequestLocale } from "next-intl/server";
import { LegalPageContent } from "@/components/sections/LegalPageContent";
import { generatePageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generatePageMetadata({ locale, namespace: "legal.privacy" });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalPageContent namespace="legal.privacy" />;
}
