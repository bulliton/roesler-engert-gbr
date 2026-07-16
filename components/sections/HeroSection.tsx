"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { VideoBackground } from "@/components/ui/VideoBackground";
import { Button } from "@/components/ui/Button";
import { Headline } from "@/components/ui/Headline";
import { SITE_IMAGES } from "@/lib/site-images";

export function HeroSection() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative -mt-[var(--header-offset)] flex h-[100svh] min-h-[100svh] items-end overflow-hidden">
      <VideoBackground
        posterSrc={SITE_IMAGES.craftsmanAtWork}
        imageClassName="object-cover object-[34%_26%] md:object-[center_32%]"
      />
      <Container className="relative z-10 pb-12 pt-28 md:pb-16 lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-xl md:max-w-2xl"
        >
          <Headline as="h1" contrast className="hero-text-shadow">
            {t("title")}
          </Headline>
          <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-white/80 md:mt-5 md:max-w-lg md:text-base">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5 md:mt-10">
            <Button href="/contact" variant="inverse">
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
