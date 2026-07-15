"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { Container } from "@/components/ui/Container";
import { DiamondIcon } from "@/components/ui/DiamondIcon";
import { Headline } from "@/components/ui/Headline";
import { Section } from "@/components/ui/Section";

const categories = [
  {
    key: "diamonds" as const,
    href: "/diamonds" as const,
    image:
      "https://images.unsplash.com/photo-1605100804763-247fc67f9958?w=600&q=80",
  },
  {
    key: "earrings" as const,
    href: { pathname: "/jewelry" as const, hash: "earrings" },
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
  },
  {
    key: "rings" as const,
    href: { pathname: "/jewelry" as const, hash: "rings" },
    image:
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&q=80",
  },
  {
    key: "necklaces" as const,
    href: { pathname: "/jewelry" as const, hash: "necklaces" },
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
  },
];

export function CategoriesSection() {
  const t = useTranslations("home.categories");

  return (
    <Section className="bg-white">
      <Container>
        <div className="mb-12 text-center">
          <Headline as="h2">{t("title")}</Headline>
          <p className="mx-auto mt-4 max-w-2xl text-muted">{t("subtitle")}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={cat.href}
                className="group relative block aspect-[3/4] overflow-hidden rounded-sm"
              >
                <Image
                  src={cat.image}
                  alt={t(cat.key)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between">
                  <span className="font-display text-xl text-white">
                    {t(cat.key)}
                  </span>
                  <DiamondIcon className="h-8 w-8 text-white/60 transition-colors group-hover:text-secondary" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
