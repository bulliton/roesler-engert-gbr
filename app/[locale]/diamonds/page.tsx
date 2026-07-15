import { setRequestLocale } from "next-intl/server";
import { DiamondsPageContent } from "@/components/sections/DiamondsPageContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function DiamondsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <DiamondsPageContent />;
}
