"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { StatCounter } from "@/components/ui/StatCounter";

export function StatsSection() {
  const t = useTranslations("home.stats");

  const stats = [
    { value: t("years.value"), label: t("years.label") },
    { value: t("pieces.value"), label: t("pieces.label") },
    { value: t("partners.value"), label: t("partners.label") },
    { value: t("cuts.value"), label: t("cuts.label") },
  ];

  return (
    <Section elevated className="border-y border-primary/10 !py-12 md:!py-16">
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {stats.map((stat) => (
            <StatCounter key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
