"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CONTACT } from "@/lib/constants";

const cards = [
  {
    key: "craftsmanship" as const,
    image:
      "https://images.unsplash.com/photo-1617032215425-9e6d4d6b0c8e?w=800&q=80",
    href: "/visit" as const,
  },
  {
    key: "diamonds" as const,
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
    href: "/diamonds" as const,
  },
  {
    key: "showroom" as const,
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",
    href: CONTACT.appointmentUrl,
    external: true,
  },
];

export function ShowroomSection() {
  const t = useTranslations("home.showroom");

  return (
    <Section>
      <Container>
        <div className="grid gap-10 md:grid-cols-3">
          {cards.map((card, i) => (
            <motion.article
              key={card.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-sm bg-primary-light">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="mb-3 font-display text-lg text-secondary">
                {t(`${card.key}.title`)}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {t(`${card.key}.text`)}
              </p>
              {"external" in card && card.external ? (
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-semibold tracking-wide text-secondary uppercase transition-colors hover:text-primary"
                >
                  {t(`${card.key}.cta`)}
                </a>
              ) : (
                <Link
                  href={card.href as "/visit"}
                  className="mt-4 inline-block text-sm font-semibold tracking-wide text-secondary uppercase transition-colors hover:text-primary"
                >
                  {t(`${card.key}.cta`)}
                </Link>
              )}
            </motion.article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
