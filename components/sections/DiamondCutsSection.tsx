"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { Container } from "@/components/ui/Container";
import { Headline } from "@/components/ui/Headline";
import { Section } from "@/components/ui/Section";
import {
  DIAMOND_CUT_KEYS,
  diamondCutIcons,
} from "@/lib/diamond-cuts";

export function DiamondCutsSection() {
  const t = useTranslations("home.diamondCuts");

  return (
    <Section className="bg-white">
      <Container>
        <Headline as="h2" className="mb-10 text-center">
          {t("title")}
        </Headline>
        <div className="flex flex-wrap items-start justify-center gap-8 md:gap-12">
          {DIAMOND_CUT_KEYS.map((cut) => {
            const Icon = diamondCutIcons[cut];
            return (
              <Link
                key={cut}
                href="/diamonds"
                className="group flex w-20 flex-col items-center gap-3 text-center"
              >
                <Icon className="h-14 w-14 text-primary/80 transition-colors group-hover:text-secondary" />
                <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                  {t(`cuts.${cut}`)}
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
