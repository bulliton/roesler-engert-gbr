import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/navigation";
import { Container } from "@/components/ui/Container";
import { FooterLabel } from "@/components/ui/FooterLabel";
import { DiamondIcon } from "@/components/ui/DiamondIcon";
import { CONTACT } from "@/lib/constants";
import { FooterContactForm } from "./FooterContactForm";
import { FooterNavigation } from "./FooterNavigation";
import { FooterSocial } from "./FooterSocial";
import { NewsletterForm } from "./NewsletterForm";

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white">
      <Container className="py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-8 xl:gap-12">
          <div className="space-y-8 lg:col-span-4 xl:col-span-4">
            <div>
              <Link
                href="/"
                className="relative inline-flex h-9 shrink-0 items-center sm:h-10 md:h-11"
                aria-label="Rösler & Engert"
              >
                <Image
                  src="/brand/logo-horizontal.svg"
                  alt="Rösler & Engert"
                  width={884}
                  height={108}
                  className="h-full w-auto max-w-[11rem] brightness-0 invert sm:max-w-[13rem] md:max-w-[15rem] lg:max-w-[17rem]"
                />
              </Link>
              <p className="mt-4 font-body text-sm leading-relaxed text-white/65">
                {t("mission.text")}
              </p>
            </div>

            <FooterSocial />

            <div className="space-y-6">
              <div>
                <FooterLabel>{t("inquiries.general")}</FooterLabel>
                <div className="mt-2 space-y-1 font-body text-sm text-white/80">
                  <p>
                    <a href={CONTACT.phoneHref} className="transition-colors hover:text-secondary">
                      {CONTACT.phone}
                    </a>
                  </p>
                  <p>
                    <a href={CONTACT.emailHref} className="transition-colors hover:text-secondary">
                      {CONTACT.email}
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <FooterLabel>{t("inquiries.appointment")}</FooterLabel>
                <p className="mt-2 font-body text-sm text-white/80">
                  <a
                    href={CONTACT.appointmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-secondary"
                  >
                    {nav("bookAppointment")}
                  </a>
                </p>
              </div>

              <div>
                <FooterLabel>{t("inquiries.visit")}</FooterLabel>
                <p className="mt-2 font-body text-sm leading-relaxed text-white/80">
                  {CONTACT.address.street}
                  <br />
                  {CONTACT.address.city}
                  <br />
                  {CONTACT.address.country}
                </p>
              </div>
            </div>

            <NewsletterForm />
          </div>

          <div className="flex flex-col gap-10 lg:col-span-8">
            <FooterNavigation />
            <FooterContactForm />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 lg:mt-16 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <DiamondIcon className="h-8 w-8 text-white/50" />
            <p className="font-body text-sm text-white/45">{t("copyright", { year })}</p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 font-body text-sm text-white/45">
            <Link href="/imprint" className="transition-colors hover:text-white/80">
              {t("terms")}
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-white/80">
              {t("privacy")}
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-white/80">
              {t("cookies")}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
