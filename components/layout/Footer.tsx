import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/navigation";
import { Container } from "@/components/ui/Container";
import { CONTACT } from "@/lib/constants";

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white">
      <Container className="py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 font-display text-lg">{t("navigation")}</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="/" className="hover:text-secondary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-secondary">
                  {nav("about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-secondary">
                  {nav("contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-lg">{t("products")}</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="/diamonds" className="hover:text-secondary">
                  {nav("diamonds")}
                </Link>
              </li>
              <li>
                <Link href="/jewelry" className="hover:text-secondary">
                  {nav("jewelry")}
                </Link>
              </li>
              <li>
                <Link
                  href={{ pathname: "/jewelry", hash: "earrings" }}
                  className="hover:text-secondary"
                >
                  {nav("earrings")}
                </Link>
              </li>
              <li>
                <Link
                  href={{ pathname: "/jewelry", hash: "rings" }}
                  className="hover:text-secondary"
                >
                  {nav("rings")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-lg">{t("company")}</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="/imprint" className="hover:text-secondary">
                  {t("imprint")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-secondary">
                  {t("privacy")}
                </Link>
              </li>
            </ul>
            <p className="mt-4 text-sm text-white/60">{t("tagline")}</p>
          </div>

          <div>
            <h3 className="mb-4 font-display text-lg">{t("contact")}</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a href={CONTACT.phoneHref} className="hover:text-secondary">
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={CONTACT.emailHref} className="hover:text-secondary">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                {CONTACT.address.street}
                <br />
                {CONTACT.address.city}
              </li>
            </ul>
            <div className="relative mt-6 h-20 w-20 opacity-80">
              <Image
                src="/brand/logo-seal.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/50">
          {t("copyright", { year })}
        </div>
      </Container>
    </footer>
  );
}
