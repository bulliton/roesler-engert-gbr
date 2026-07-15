"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { VideoBackground } from "@/components/ui/VideoBackground";
import { Button } from "@/components/ui/Button";
import { CONTACT } from "@/lib/constants";
import { SITE_IMAGES } from "@/lib/site-images";

export function HeroSection() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative -mt-[var(--header-offset)] flex h-[100svh] min-h-[100svh] items-end overflow-hidden">
      <VideoBackground
        posterSrc={SITE_IMAGES.craftsmanAtWork}
        imageClassName="object-cover object-[65%_35%] md:object-[center_32%]"
      />
      <Container className="relative z-10 pb-12 pt-28 md:pb-16 lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative max-w-xl md:max-w-2xl"
        >
          <h1 className="font-display text-[clamp(2.25rem,3.8vw+0.75rem,3.75rem)] font-normal leading-[1em] tracking-[-0.01em] !text-white hero-text-shadow">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-white/70 md:mt-5 md:max-w-lg md:text-[0.9375rem]">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5 md:mt-10">
            <Button
              href={CONTACT.appointmentUrl}
              external
              variant="inverse"
            >
              {t("ctaPrimary")}
            </Button>
            <Button href="/catalog" variant="outline-contrast">
              {t("ctaSecondary")}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
