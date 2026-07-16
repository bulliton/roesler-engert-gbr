import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/navigation";
import { Container } from "@/components/ui/Container";
import { CircularLogo } from "@/components/ui/CircularLogo";
import { FooterLabel } from "@/components/ui/FooterLabel";
import { CONTACT } from "@/lib/constants";
import { FooterBackgroundMark } from "./FooterBackgroundMark";
import { FooterContactForm } from "./FooterContactForm";
import { FooterNavigation } from "./FooterNavigation";
import { FooterSocial } from "./FooterSocial";
import { NewsletterForm } from "./NewsletterForm";

export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-primary-dark pb-[var(--mobile-bottom-bar-offset)] text-white md:pb-0">
      <FooterBackgroundMark />
      <Container className="relative z-10 py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-8 xl:gap-12">
          <div className="space-y-8 lg:col-span-4 xl:col-span-4">
            <div>
              <Link href="/" className="inline-block" aria-label="Rösler & Engert">
                <CircularLogo size={88} className="text-white" />
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
          <p className="font-body text-sm text-white/45">{t("copyright", { year })}</p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 font-body text-sm text-white/45">
            <Link href="/imprint" className="transition-colors hover:text-white/80">
              {t("terms")}
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-white/80">
              {t("privacy")}
            </Link>
            <Link href="/cookies" className="transition-colors hover:text-white/80">
              {t("cookies")}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
