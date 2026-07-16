"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Headline } from "@/components/ui/Headline";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";
import { CONTACT } from "@/lib/constants";
import { SITE_IMAGES } from "@/lib/site-images";

const optionKeys = ["showroom", "fieldService"] as const;

export function VisitPageContent() {
  const t = useTranslations("visit");

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <Section className="!py-0">
        <div className="relative aspect-[21/9] min-h-[14rem] w-full">
          <Image
            src={SITE_IMAGES.workshopInterior}
            alt=""
            fill
            className="object-cover object-[center_40%]"
            sizes="100vw"
            priority
          />
        </div>
      </Section>

      <Section>
        <Container>
          <ul className="editorial-list">
            {optionKeys.map((key) => (
              <li key={key} className="editorial-list-item">
                <Headline as="h3">{t(`options.${key}.title`)}</Headline>
                <div>
                  <p className="text-sm leading-relaxed text-muted md:text-base">
                    {t(`options.${key}.text`)}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-primary">
                    {(["point1", "point2", "point3"] as const).map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="text-accent-gold">—</span>
                        <span>{t(`options.${key}.${point}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          <div className="section-divider">
            <SectionIntro title={t("location.label")} />
            <p className="mt-4 text-primary">
              {CONTACT.address.street}
              <br />
              {CONTACT.address.city}, {CONTACT.address.country}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                href={CONTACT.appointmentPath}
                hash={CONTACT.appointmentHash}
                variant="primary"
              >
                {t("cta.appointment")}
              </Button>
              <Button href="/contact" variant="outline">
                {t("cta.contact")}
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
