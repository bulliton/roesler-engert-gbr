"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Headline } from "@/components/ui/Headline";
import { Section } from "@/components/ui/Section";

export function AboutPreviewSection() {
  const t = useTranslations("home.aboutPreview");

  return (
    <Section>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[4/3] overflow-hidden rounded-sm"
          >
            <Image
              src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80"
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-primary/10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="mb-2 text-sm font-semibold tracking-[0.15em] text-secondary uppercase">
              {t("eyebrow")}
            </p>
            <Headline as="h2">{t("title")}</Headline>
            <p className="mt-6 text-muted leading-relaxed">{t("text")}</p>
            <div className="mt-8">
              <Button href="/about" variant="primary">
                {t("link")}
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
