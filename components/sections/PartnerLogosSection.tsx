import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";

const partners = [
  "NIKE",
  "LOUIS VUITTON",
  "DONDUP",
  "PRADA",
  "NIKE",
  "LOUIS VUITTON",
  "DONDUP",
  "PRADA",
];

export async function PartnerLogosSection() {
  const t = await getTranslations("home.partners");

  return (
    <section className="border-t border-primary/10 bg-primary-light py-10">
      <Container>
        <p className="sr-only">{t("title")}</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16">
          {partners.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-display text-sm tracking-[0.2em] text-primary/70 uppercase md:text-base"
              aria-hidden={i > 0}
            >
              {name}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
