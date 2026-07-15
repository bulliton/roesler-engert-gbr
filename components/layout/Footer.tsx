import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/navigation";
import { Container } from "@/components/ui/Container";
import { DiamondIcon } from "@/components/ui/DiamondIcon";
import { CONTACT } from "@/lib/constants";
import { FooterContactForm } from "./FooterContactForm";
import { FooterSocial } from "./FooterSocial";
import { NewsletterForm } from "./NewsletterForm";

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const year = new Date().getFullYear();

  const pageLinks = [
    { href: "/" as const, label: "Home" },
    { href: "/diamonds" as const, label: nav("diamonds") },
    { href: "/jewelry" as const, label: nav("jewelry") },
    { href: "/about" as const, label: nav("about") },
    { href: "/contact" as const, label: nav("contact") },
  ];

  return (
    <footer className="bg-primary-dark text-white">
      <Container className="py-14 lg:py-20">
        <div className="mb-12 flex flex-col items-center text-center lg:mb-16">
          <div className="relative h-10 w-56 md:h-12 md:w-64">
            <Image
              src="/brand/logo-horizontal.svg"
              alt="Rösler & Engert"
              fill
              className="object-contain brightness-0 invert"
              priority={false}
            />
          </div>
          <p className="mt-4 max-w-md font-display text-base text-white/85 md:text-lg">
            {t("tagline")}
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_auto_minmax(0,1fr)] lg:gap-10 xl:gap-16">
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-xl text-white md:text-2xl">
                {t("mission.title")}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65">
                {t("mission.text")}
              </p>
            </div>

            <FooterSocial />

            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-semibold tracking-[0.2em] text-secondary uppercase">
                  {t("inquiries.general")}
                </h3>
                <div className="mt-2 space-y-1 text-sm text-white/80">
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
                <h3 className="text-xs font-semibold tracking-[0.2em] text-secondary uppercase">
                  {t("inquiries.appointment")}
                </h3>
                <p className="mt-2 text-sm text-white/80">
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
                <h3 className="text-xs font-semibold tracking-[0.2em] text-secondary uppercase">
                  {t("inquiries.visit")}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
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

          <nav aria-label={t("pages")} className="lg:px-4 xl:px-8">
            <h3 className="mb-5 text-xs font-semibold tracking-[0.2em] text-secondary uppercase">
              {t("pages")}
            </h3>
            <ul className="space-y-3">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-display text-lg text-white transition-colors hover:text-secondary md:text-xl"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <FooterContactForm />
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 lg:mt-16 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <DiamondIcon className="h-8 w-8 text-white/50" />
            <p className="text-sm text-white/45">{t("copyright", { year })}</p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/45">
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
