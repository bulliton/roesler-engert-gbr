"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CONTACT } from "@/lib/constants";
import { SITE_IMAGES } from "@/lib/site-images";

const cards = [
  {
    key: "craftsmanship" as const,
    image: SITE_IMAGES.handsCrafting,
    imageClassName: "object-cover object-[center_40%] scale-[1.22]",
    href: "/visit" as const,
  },
  {
    key: "diamonds" as const,
    image: SITE_IMAGES.precisionMeasurement,
    imageClassName: "object-cover object-[center_35%]",
    href: "/diamonds" as const,
  },
  {
    key: "showroom" as const,
    image: SITE_IMAGES.workshopInterior,
    imageClassName: "object-cover object-[68%_45%] scale-[1.22]",
    href: CONTACT.appointmentUrl,
    external: true,
  },
] as const;

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
              <div className="relative mb-5 aspect-[3/4] overflow-hidden rounded-sm bg-primary-light">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  className={card.imageClassName ?? "object-cover"}
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
