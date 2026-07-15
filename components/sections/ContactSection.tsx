import Image from "next/image";
import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactEditorialLabel } from "@/components/ui/ContactEditorialLabel";
import { Container } from "@/components/ui/Container";
import { CONTACT } from "@/lib/constants";
import { SITE_IMAGES } from "@/lib/site-images";
import { Link } from "@/lib/navigation";

function EditorialRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(6.5rem,8.5rem)_1fr] sm:gap-x-10 sm:gap-y-0">
      <ContactEditorialLabel>{label}</ContactEditorialLabel>
      <div className="font-body text-[15px] leading-relaxed text-primary/90">{children}</div>
    </div>
  );
}

function EditorialLink({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const className =
    "contact-editorial-link text-primary/90 transition-colors hover:text-secondary";

  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href as "/"} className={className}>
      {children}
    </Link>
  );
}

export async function ContactSection() {
  const t = await getTranslations("contact");

  return (
    <>
      <section className="bg-white py-[var(--section-padding-y)]">
        <Container>
          <div className="mx-auto max-w-2xl">
            <ContactEditorialLabel className="mb-3">{t("sections.form")}</ContactEditorialLabel>
            <h2 className="font-display text-[clamp(1.5rem,2vw+0.75rem,2.25rem)] font-normal text-primary">
              {t("form.title")}
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">{t("form.subtitle")}</p>
            <div className="mt-10">
              <ContactForm variant="editorial" />
            </div>
          </div>
        </Container>
      </section>

      <section className="contact-editorial-grid border-t border-primary/8 bg-primary-light">
        <div className="contact-editorial-content flex flex-col justify-center px-[var(--section-padding-x)] py-12 md:py-16 lg:py-20">
          <div className="mx-auto w-full max-w-md space-y-10 sm:max-w-lg lg:mx-0 lg:max-w-none lg:pl-[clamp(1rem,6vw,4rem)]">
            <EditorialRow label={t("sections.visit")}>
              <p>
                {CONTACT.address.street}
                <br />
                {CONTACT.address.city}
              </p>
            </EditorialRow>

            <EditorialRow label={t("sections.touch")}>
              <div className="space-y-3">
                <p>
                  <a href={CONTACT.phoneHref} className="contact-editorial-link hover:text-secondary">
                    {CONTACT.phone}
                  </a>
                </p>
                <ul className="space-y-2">
                  <li>
                    <span className="text-primary/60">{t("inquiries.general")}: </span>
                    <a href={CONTACT.emailHref} className="contact-editorial-link hover:text-secondary">
                      {CONTACT.email}
                    </a>
                  </li>
                  <li>
                    <span className="text-primary/60">{t("inquiries.partnership")}: </span>
                    <a href={CONTACT.emailHref} className="contact-editorial-link hover:text-secondary">
                      {CONTACT.email}
                    </a>
                  </li>
                  <li>
                    <span className="text-primary/60">{t("inquiries.diamonds")}: </span>
                    <a href={CONTACT.emailHref} className="contact-editorial-link hover:text-secondary">
                      {CONTACT.email}
                    </a>
                  </li>
                </ul>
              </div>
            </EditorialRow>

            <EditorialRow label={t("sections.business")}>
              <div className="space-y-1">
                <p>{t("business.company")}</p>
                <p className="text-primary/75">{t("business.address")}</p>
                <p className="pt-2">
                  <EditorialLink href="/imprint">{t("business.imprint")}</EditorialLink>
                </p>
              </div>
            </EditorialRow>

            <EditorialRow label={t("sections.hours")}>
              <div className="space-y-3">
                <p>{t("hours.text")}</p>
                <p>
                  <EditorialLink href={CONTACT.appointmentUrl} external>
                    {t("hours.appointment")}
                  </EditorialLink>
                </p>
              </div>
            </EditorialRow>
          </div>
        </div>

        <div className="contact-editorial-image relative min-h-[min(52vh,28rem)] lg:min-h-[calc(100svh-var(--header-offset))]">
          <Image
            src={SITE_IMAGES.leadership}
            alt={t("imageAlt")}
            fill
            priority
            className="object-cover object-[center_22%]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-primary-light/20 via-transparent to-transparent lg:from-primary-light/35"
            aria-hidden
          />
        </div>
      </section>
    </>
  );
}
