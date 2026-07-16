"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Headline } from "@/components/ui/Headline";
import { Section } from "@/components/ui/Section";

type FeatureSectionProps = {
  image: {
    src: string;
    alt?: string;
    objectPosition?: string;
    priority?: boolean;
    quality?: number;
  };
  eyebrow: string;
  title: string;
  text?: string;
  cta?: {
    href: string;
    label: string;
    external?: boolean;
  };
  imagePosition?: "left" | "right";
};

export function FeatureSection({
  image,
  eyebrow,
  title,
  text,
  cta,
  imagePosition = "left",
}: FeatureSectionProps) {
  const imageOnRight = imagePosition === "right";

  return (
    <Section className="!py-0">
      <div
        className={`grid lg:grid-cols-2 ${imageOnRight ? "lg:[direction:rtl]" : ""}`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`relative min-h-[20rem] lg:min-h-[32rem] ${imageOnRight ? "lg:[direction:ltr]" : ""}`}
        >
          <Image
            src={image.src}
            alt={image.alt ?? ""}
            fill
            className={`object-cover ${image.objectPosition ?? "object-center"}`}
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={image.priority}
            quality={image.quality ?? 90}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={`flex flex-col items-center justify-center px-[var(--section-padding-x)] py-14 text-center lg:px-12 lg:py-20 xl:px-20 ${imageOnRight ? "lg:[direction:ltr]" : ""}`}
        >
          <p className="mb-5 text-xs font-normal tracking-[0.14em] text-muted uppercase">
            {eyebrow}
          </p>

          <Headline as="h2" className="mx-auto max-w-md">
            {title}
          </Headline>

          {text ? (
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted md:text-base">
              {text}
            </p>
          ) : null}

          {cta ? (
            <div className="mt-10">
              <Button
                href={cta.href}
                external={cta.external}
                variant="outline"
                shape="rect"
              >
                {cta.label}
              </Button>
            </div>
          ) : null}
        </motion.div>
      </div>
    </Section>
  );
}
