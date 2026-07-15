"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { CONTACT } from "@/lib/constants";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";
import { MobileNav } from "./MobileNav";

export function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [jewelryOpen, setJewelryOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-primary text-white">
        <div className="mx-auto flex max-w-[var(--page-max-width)] items-center justify-between px-[var(--section-padding-x)] py-2 text-sm">
          <a
            href={CONTACT.phoneHref}
            className="transition-opacity hover:opacity-80"
          >
            {CONTACT.phone}
          </a>
          <a
            href={CONTACT.appointmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold tracking-wide uppercase transition-opacity hover:opacity-80"
          >
            {t("bookAppointment")}
          </a>
        </div>
      </div>

      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "border-primary/10 bg-white/95 shadow-sm backdrop-blur-md"
            : "border-transparent bg-white"
        }`}
      >
        <div className="mx-auto flex max-w-[var(--page-max-width)] items-center justify-between px-[var(--section-padding-x)] py-4">
          <nav className="hidden flex-1 items-center gap-6 lg:flex">
            <Link
              href="/diamonds"
              className="text-sm font-semibold tracking-wide text-primary uppercase transition-colors hover:text-secondary"
            >
              {t("diamonds")}
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setJewelryOpen(true)}
              onMouseLeave={() => setJewelryOpen(false)}
            >
              <Link
                href="/jewelry"
                className="text-sm font-semibold tracking-wide text-primary uppercase transition-colors hover:text-secondary"
              >
                {t("jewelry")} ▾
              </Link>
              {jewelryOpen && (
                <div className="absolute top-full left-0 z-50 mt-2 min-w-44 rounded-lg border border-primary/10 bg-white py-2 shadow-lg">
                  <Link
                    href={{ pathname: "/jewelry", hash: "earrings" }}
                    className="block px-4 py-2 text-sm text-primary hover:bg-primary-light"
                  >
                    {t("earrings")}
                  </Link>
                  <Link
                    href={{ pathname: "/jewelry", hash: "rings" }}
                    className="block px-4 py-2 text-sm text-primary hover:bg-primary-light"
                  >
                    {t("rings")}
                  </Link>
                  <Link
                    href={{ pathname: "/jewelry", hash: "necklaces" }}
                    className="block px-4 py-2 text-sm text-primary hover:bg-primary-light"
                  >
                    {t("necklaces")}
                  </Link>
                </div>
              )}
            </div>
          </nav>

          <Link href="/" className="relative mx-4 h-12 w-36 shrink-0 md:h-14 md:w-44">
            <Image
              src="/brand/wordmark.png"
              alt="Rösler & Engert"
              fill
              className="object-contain object-center"
              priority
            />
          </Link>

          <div className="hidden flex-1 items-center justify-end gap-6 lg:flex">
            <Link
              href="/about"
              className="text-sm font-semibold tracking-wide text-primary uppercase transition-colors hover:text-secondary"
            >
              {t("about")}
            </Link>
            <Link
              href="/contact"
              className="text-sm font-semibold tracking-wide text-primary uppercase transition-colors hover:text-secondary"
            >
              {t("contact")}
            </Link>
            <LocaleSwitcher />
          </div>

          <button
            type="button"
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span className="block h-0.5 w-6 bg-primary" />
            <span className="block h-0.5 w-6 bg-primary" />
            <span className="block h-0.5 w-6 bg-primary" />
          </button>
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
