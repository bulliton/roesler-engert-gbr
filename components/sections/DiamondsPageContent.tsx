"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Headline } from "@/components/ui/Headline";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";

function BrilliantIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 91.51 91.52" className={className} fill="currentColor" aria-hidden>
      <path d="M45.67,91.52s.05,0,.08,0c.03,0,.06,0,.08,0h.02c6.91-.02,13.47-1.58,19.35-4.35,.05-.02,.12-.02,.17-.04,.06-.03,.1-.07,.15-.1,5.52-2.66,10.43-6.4,14.45-10.94,.02-.01,.04-.02,.05-.03,.11-.09,.19-.2,.24-.31,3.34-3.84,6.05-8.24,7.98-13.05,0,0,0,0,0-.01,2.1-5.24,3.26-10.95,3.26-16.93s-1.16-11.69-3.26-16.93c0,0,0-.01,0-.02-1.92-4.8-4.63-9.2-7.98-13.04-.05-.11-.13-.22-.24-.31-.02-.01-.04-.02-.06-.03-4.02-4.53-8.93-8.27-14.45-10.93-.05-.03-.09-.07-.16-.1-.05-.02-.11-.02-.17-.04C59.31,1.58,52.76,.02,45.85,0h-.02s-.06,0-.08,0c-.03,0-.05,0-.08,0h-.01c-6.92,.01-13.48,1.58-19.36,4.35-.05,.02-.1,.02-.15,.04-.06,.03-.09,.06-.14,.09-5.53,2.66-10.44,6.4-14.47,10.94-.02,.01-.04,.02-.05,.03-.11,.1-.19,.21-.25,.32-3.28,3.77-5.95,8.07-7.86,12.77-.05,.08-.08,.17-.1,.25-2.1,5.25-3.27,10.97-3.27,16.96H0c0,6,1.17,11.72,3.27,16.97,.02,.09,.05,.17,.1,.25,1.91,4.7,4.59,9,7.86,12.77,.05,.12,.13,.22,.25,.32,.02,.01,.04,.02,.05,.03,4.03,4.54,8.94,8.28,14.47,10.94,.05,.03,.08,.07,.14,.09,.05,.02,.1,.02,.15,.04,5.88,2.78,12.44,4.34,19.36,4.35h.01Z" />
    </svg>
  );
}

function PrincessIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 91.51 91.51" className={className} fill="currentColor" aria-hidden>
      <path d="M91.48,90.31h0c.02-.1,.03-.2,.03-.3V1.5c0-.1-.01-.2-.03-.29h0c-.03-.13-.07-.25-.13-.37-.01-.03-.03-.05-.04-.08-.13-.23-.32-.42-.55-.55-.03-.01-.05-.03-.08-.04-.12-.06-.24-.11-.37-.13h0c-.1-.02-.19-.03-.3-.03H1.5c-.1,0-.2,.01-.29,.03h0c-.13,.03-.25,.07-.37,.13-.03,.01-.05,.03-.08,.04-.23,.13-.42,.32-.55,.55-.02,.03-.03,.05-.04,.08-.06,.11-.1,.23-.13,.36h0c-.02,.1-.03,.2-.03,.3V90.01c0,.1,.01,.2,.03,.29h0c.03,.13,.07,.25,.13,.37,.01,.03,.03,.06,.04,.08,.12,.2,.27,.37,.46,.5,.03,.02,.07,.04,.1,.05,.05,.03,.1,.06,.16,.08,.04,.02,.09,.03,.13,.04,.05,.02,.1,.03,.15,.04,.1,.02,.2,.03,.29,.03H90.01c.1,0,.2-.01,.29-.03,.05-.01,.1-.03,.15-.04,.04-.01,.09-.02,.13-.04,.06-.02,.11-.05,.16-.08,.03-.02,.07-.03,.1-.05,.19-.13,.34-.3,.46-.5,.02-.03,.03-.05,.04-.08,.06-.11,.1-.23,.13-.36ZM2.99,9.16l7.43,18.32v36.55l-7.43,18.32V9.16Z" />
    </svg>
  );
}

const cutIcons: Record<string, React.FC<{ className?: string }>> = {
  brilliant: BrilliantIcon,
  princess: PrincessIcon,
  cushion: BrilliantIcon,
  baguette: PrincessIcon,
  pear: BrilliantIcon,
  carre: PrincessIcon,
};

const cutKeys = ["brilliant", "princess", "cushion", "baguette", "pear", "carre"] as const;

export function DiamondsPageContent() {
  const t = useTranslations("diamonds");

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Headline as="h2">{t("expertise.title")}</Headline>
            <p className="mt-6 text-muted leading-relaxed">{t("expertise.text")}</p>
          </div>
        </Container>
      </Section>
      <Section className="bg-primary-light" pattern>
        <Container>
          <Headline as="h2" className="mb-12 text-center">
            {t("cuts.title")}
          </Headline>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {cutKeys.map((cut) => {
              const Icon = cutIcons[cut];
              return (
                <div
                  key={cut}
                  className="flex flex-col items-center gap-3 rounded-sm bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <Icon className="h-16 w-16 text-primary" />
                  <span className="text-sm font-semibold text-primary">
                    {t(`cuts.${cut}`)}
                  </span>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
