"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { VideoBackground } from "@/components/ui/VideoBackground";
import { CONTACT } from "@/lib/constants";

export function HeroSection() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden">
      <VideoBackground posterSrc="https://images.unsplash.com/photo-1610375461246-83c789932e29?w=1920&q=80" />
      <Container className="relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-secondary uppercase">
            {t("eyebrow")}
          </p>
          <h1 className="font-display text-[clamp(2.5rem,5vw+1rem,4.5rem)] leading-tight text-white">
            {t("title")}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/90">
            {t("subtitle")}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              variant="primary"
              href={CONTACT.appointmentUrl}
              external
            >
              {t("ctaPrimary")}
            </Button>
            <Button variant="outline-contrast" href="/about">
              {t("ctaSecondary")}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
