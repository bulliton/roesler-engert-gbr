import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CONTACT } from "@/lib/constants";

export async function CtaBand() {
  const t = await getTranslations("ctaBand");

  return (
    <Section contrast className="!py-14 md:!py-16">
      <Container>
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div className="max-w-2xl">
            <p className="font-display text-2xl text-white md:text-3xl">{t("title")}</p>
            <p className="mt-3 text-sm leading-relaxed text-white/80 md:text-base">{t("text")}</p>
          </div>
          <div className="flex shrink-0 flex-col items-center gap-3 sm:flex-row">
            <Button href={CONTACT.appointmentUrl} external variant="primary" shape="pill" className="!border-accent-gold !bg-accent-gold !text-primary hover:!bg-accent-gold-light hover:!border-accent-gold-light">
              {t("appointment")}
            </Button>
            <Button href="/catalog" variant="outline-contrast" shape="pill" className="text-sm opacity-90">
              {t("catalog")}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
