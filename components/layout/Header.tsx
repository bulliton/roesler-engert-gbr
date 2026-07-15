"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/navigation";
import { CONTACT } from "@/lib/constants";
import { leftNavItems, rightNavItems } from "@/lib/nav-config";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";
import {
  BookmarkIcon,
  ChevronDownIcon,
  PhoneIcon,
  StoreIcon,
} from "@/components/ui/Icons";
import { JewelryMegaMenu } from "./JewelryMegaMenu";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";

const headerTransition =
  "transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]";

const contentTransition = "transition-colors duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]";

type OpenMenu = "diamonds" | "jewelry" | null;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = pathname === "/";
  const isTransparent = !scrolled;
  const useLightNav = isTransparent && isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const syncHeaderOffset = () => {
      document.documentElement.style.setProperty(
        "--header-offset",
        `${el.offsetHeight}px`,
      );
    };

    syncHeaderOffset();
    const observer = new ResizeObserver(syncHeaderOffset);
    observer.observe(el);
    window.addEventListener("resize", syncHeaderOffset);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncHeaderOffset);
    };
  }, [openMenu]);

  const topBarClass = scrolled
    ? "bg-primary text-white"
    : useLightNav
      ? "bg-transparent text-white/90"
      : "bg-white text-primary border-b border-primary/10";

  const mainBarClass = scrolled
    ? "border-primary/10 bg-white/95 shadow-sm backdrop-blur-md"
    : useLightNav
      ? "border-transparent bg-transparent"
      : "border-b border-primary/10 bg-white";

  const utilityLinkClass = `inline-flex items-center gap-1.5 text-xs font-normal ${contentTransition} transition-opacity hover:opacity-80`;

  const navLinkClass = useLightNav
    ? `inline-flex items-center gap-1 text-xs font-normal tracking-[0.14em] uppercase !text-white hover:!text-white/80 ${contentTransition} nav-link-underline`
    : `inline-flex items-center gap-1 text-xs font-normal tracking-[0.14em] uppercase !text-primary hover:!text-secondary ${contentTransition} nav-link-underline`;

  const menuBarClass = useLightNav ? "bg-white" : "bg-primary";

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      <div className={`${headerTransition} ${topBarClass}`}>
        <div className="mx-auto flex max-w-[var(--page-max-width)] items-center justify-between gap-4 px-[var(--section-padding-x)] py-1">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5">
            <a href={CONTACT.phoneHref} className={utilityLinkClass}>
              <PhoneIcon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{CONTACT.phone}</span>
            </a>
            <Link href="/visit" className={utilityLinkClass}>
              <StoreIcon className="h-3.5 w-3.5 shrink-0" />
              <span>
                {CONTACT.address.street}, {CONTACT.address.city}
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <a
              href={CONTACT.appointmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={utilityLinkClass}
            >
              <BookmarkIcon className="h-3.5 w-3.5 shrink-0" />
              <span className="hidden sm:inline">{t("bookAppointment")}</span>
            </a>
            <LocaleSwitcher inverted={scrolled || useLightNav} compact />
          </div>
        </div>
      </div>

      <div
        className={`relative ${headerTransition} ${mainBarClass}`}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div className="mx-auto grid max-w-[var(--page-max-width)] grid-cols-3 items-center gap-4 px-[var(--section-padding-x)] py-3 lg:grid-cols-[1fr_auto_1fr]">
          <nav className="hidden items-center gap-8 lg:flex xl:gap-10">
            {leftNavItems.map((item) => (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => "mega" in item && item.mega ? setOpenMenu(item.key) : undefined}
              >
                <Link
                  href={item.href}
                  className={navLinkClass}
                  data-open={openMenu === item.key ? "true" : undefined}
                >
                  {t(item.key)}
                  {"mega" in item && item.mega ? (
                    <ChevronDownIcon className="h-2.5 w-2.5 opacity-60" />
                  ) : null}
                </Link>
              </div>
            ))}
          </nav>

          <Link
            href="/"
            className="relative col-start-2 flex h-10 shrink-0 items-center justify-center justify-self-center overflow-visible md:h-12"
          >
            <Image
              src="/brand/logo-horizontal.svg"
              alt="Rösler & Engert"
              width={884}
              height={108}
              className={`h-full w-auto max-w-[11rem] max-lg:scale-[1.2] sm:max-w-[13rem] md:max-w-[15rem] md:scale-100 lg:max-w-[17rem] ${contentTransition} ${
                useLightNav ? "brightness-0 invert" : ""
              }`}
              priority
            />
          </Link>

          <nav className="hidden items-center justify-end gap-8 lg:flex xl:gap-10">
            {rightNavItems.map((item) => (
              <Link key={item.key} href={item.href} className={navLinkClass}>
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="col-start-3 flex h-11 w-11 items-center justify-center justify-self-end lg:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            <span className="relative block h-3.5 w-6">
              <span
                className={`absolute left-0 block h-0.5 w-6 origin-center ${contentTransition} ${menuBarClass} ${
                  mobileOpen ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-0.5 w-6 ${contentTransition} ${menuBarClass} ${
                  mobileOpen ? "scale-x-0 opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-6 origin-center ${contentTransition} ${menuBarClass} ${
                  mobileOpen ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>

        <MegaMenu
          open={openMenu === "diamonds"}
          onClose={() => setOpenMenu(null)}
        />
        <JewelryMegaMenu
          open={openMenu === "jewelry"}
          onClose={() => setOpenMenu(null)}
        />
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
