import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/forms/ContactForm";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Headline } from "@/components/ui/Headline";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";
import { CONTACT } from "@/lib/constants";

export async function ContactSection() {
  const t = await getTranslations("contact");

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <Headline as="h2">{t("title")}</Headline>
              <dl className="mt-8 space-y-6">
                <div>
                  <dt className="text-sm font-semibold text-secondary uppercase">
                    {t("info.phone")}
                  </dt>
                  <dd className="mt-1">
                    <a href={CONTACT.phoneHref} className="text-primary hover:text-secondary">
                      {CONTACT.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-secondary uppercase">
                    {t("info.email")}
                  </dt>
                  <dd className="mt-1">
                    <a href={CONTACT.emailHref} className="text-primary hover:text-secondary">
                      {CONTACT.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-secondary uppercase">
                    {t("info.address")}
                  </dt>
                  <dd className="mt-1 text-muted">
                    {CONTACT.address.street}
                    <br />
                    {CONTACT.address.city}
                    <br />
                    {CONTACT.address.country}
                  </dd>
                </div>
                <div>
                  <Button href={CONTACT.appointmentUrl} external variant="primary">
                    {t("info.appointment")}
                  </Button>
                </div>
              </dl>
            </div>
            <ContactForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
