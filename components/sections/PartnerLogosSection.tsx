import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";

const trustSignals = [
  "signal1",
  "signal2",
  "signal3",
  "signal4",
] as const;

export async function PartnerLogosSection() {
  const t = await getTranslations("home.partners");

  return (
    <section className="border-t border-primary/10 bg-primary-light py-12">
      <Container>
        <p className="mb-8 text-center text-sm font-semibold tracking-[0.2em] text-secondary uppercase">
          {t("title")}
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustSignals.map((key) => (
            <div
              key={key}
              className="rounded-sm border border-primary/10 bg-white px-5 py-6 text-center"
            >
              <p className="font-display text-sm tracking-wide text-primary uppercase md:text-base">
                {t(`signals.${key}.title`)}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {t(`signals.${key}.text`)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
