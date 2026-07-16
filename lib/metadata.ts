import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type PageMetadataOptions = {
  locale: string;
  namespace: string;
  titleKey?: string;
  descriptionKey?: string;
};

export async function generatePageMetadata({
  locale,
  namespace,
  titleKey = "title",
  descriptionKey = "description",
}: PageMetadataOptions): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const site = await getTranslations({ locale, namespace: "metadata" });

  const title = t(titleKey);
  const description = t.has(descriptionKey)
    ? t(descriptionKey)
    : site("defaultDescription");

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${site("siteName")}`,
      description,
      locale: locale === "de" ? "de_DE" : "en_US",
      type: "website",
    },
  };
}
