"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { CONTACT } from "@/lib/constants";
import {
  DIAMOND_CUT_KEYS,
  diamondCutIcons,
} from "@/lib/diamond-cuts";
import {
  jewelrySubItems,
  leftNavItems,
  rightNavItems,
  utilityNavItems,
} from "@/lib/nav-config";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";
import { ChevronDownIcon, PhoneIcon } from "@/components/ui/Icons";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

type ExpandableKey = "diamonds" | "jewelry";

const listVariants = {
  closed: { height: 0, opacity: 0 },
  open: { height: "auto", opacity: 1 },
};

function NavLink({
  href,
  children,
  onClick,
  className = "",
}: {
  href: Parameters<typeof Link>[0]["href"];
  children: ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`font-display text-[clamp(1.75rem,5vw,2.5rem)] leading-none tracking-[-0.01em] text-white transition-colors hover:text-accent-gold ${className}`}
    >
      {children}
    </Link>
  );
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const t = useTranslations("nav");
  const tMega = useTranslations("nav.megaMenu");
  const [expanded, setExpanded] = useState<ExpandableKey | null>(null);

  useEffect(() => {
    if (!open) {
      setExpanded(null);
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const toggle = (key: ExpandableKey) => {
    setExpanded((current) => (current === key ? null : key));
  };

  const subLinkClass =
    "flex items-center gap-3 py-2.5 font-body text-sm text-white/75 transition-colors hover:text-accent-gold";

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="mobile-nav"
          className="fixed inset-0 z-[60] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        >
          <nav
            id="mobile-navigation"
            className="contrast-band diamond-pattern flex h-full flex-col bg-primary-dark"
            aria-label="Mobile navigation"
          >
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-[var(--section-padding-x)] py-3">
              <Link
                href="/"
                onClick={onClose}
                className="relative flex h-10 shrink-0 items-center overflow-visible"
              >
                <Image
                  src="/brand/logo-horizontal.svg"
                  alt="Rösler & Engert"
                  width={884}
                  height={108}
                  className="h-full w-auto max-w-[11rem] origin-left scale-[1.2] brightness-0 invert"
                />
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center text-white/80 transition-colors hover:text-white"
                aria-label={t("closeMenu")}
              >
                <span className="sr-only">{t("closeMenu")}</span>
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden
                >
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="relative z-10 flex-1 overflow-y-auto overscroll-contain px-[var(--section-padding-x)] py-8">
              <div className="mx-auto flex max-w-lg flex-col gap-1">
                {leftNavItems.map((item) => {
                  if (item.key === "diamonds" || item.key === "jewelry") {
                    const isOpen = expanded === item.key;

                    return (
                      <div key={item.key} className="border-b border-white/10 py-4">
                        <button
                          type="button"
                          onClick={() => toggle(item.key)}
                          className="flex w-full items-center justify-between gap-4 text-left"
                          aria-expanded={isOpen}
                        >
                          <span className="font-display text-[clamp(1.75rem,5vw,2.5rem)] leading-none tracking-[-0.01em] text-white">
                            {t(item.key)}
                          </span>
                          <ChevronDownIcon
                            className={`h-4 w-4 shrink-0 text-accent-gold transition-transform duration-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen ? (
                            <motion.div
                              key={`${item.key}-sub`}
                              initial="closed"
                              animate="open"
                              exit="closed"
                              variants={listVariants}
                              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                              className="overflow-hidden"
                            >
                              <ul className="mt-4 space-y-1 pl-1">
                                {item.key === "diamonds"
                                  ? DIAMOND_CUT_KEYS.map((cut) => {
                                      const Icon = diamondCutIcons[cut];
                                      return (
                                        <li key={cut}>
                                          <Link
                                            href="/diamonds"
                                            className={subLinkClass}
                                            onClick={onClose}
                                          >
                                            <Icon className="h-4 w-4 shrink-0 text-accent-gold/80" />
                                            {tMega(`cuts.${cut}`)}
                                          </Link>
                                        </li>
                                      );
                                    })
                                  : jewelrySubItems.map((sub) => (
                                      <li key={sub.key}>
                                        <Link
                                          href={sub.href}
                                          className={subLinkClass}
                                          onClick={onClose}
                                        >
                                          {t(sub.key)}
                                        </Link>
                                      </li>
                                    ))}
                                <li className="pt-2">
                                  <Link
                                    href={item.href}
                                    className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-[0.16em] text-accent-gold uppercase"
                                    onClick={onClose}
                                  >
                                    {item.key === "diamonds"
                                      ? t("allDiamonds")
                                      : t("allJewelry")}
                                  </Link>
                                </li>
                              </ul>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <div key={item.key} className="border-b border-white/10 py-4">
                      <NavLink href={item.href} onClick={onClose}>
                        {t(item.key)}
                      </NavLink>
                    </div>
                  );
                })}

                {rightNavItems.map((item) => (
                  <div key={item.key} className="border-b border-white/10 py-4">
                    <NavLink href={item.href} onClick={onClose}>
                      {t(item.key)}
                    </NavLink>
                  </div>
                ))}

                <div className="mt-4 grid gap-3 border-t border-white/10 pt-6">
                  {utilityNavItems.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={onClose}
                      className="font-body text-sm tracking-[0.12em] text-white/65 uppercase transition-colors hover:text-accent-gold"
                    >
                      {t(item.key)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-auto border-t border-white/10 px-[var(--section-padding-x)] pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5">
              <div className="mx-auto flex max-w-lg flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <a
                    href={CONTACT.phoneHref}
                    className="inline-flex items-center gap-2 font-body text-sm text-white/75 transition-colors hover:text-white"
                  >
                    <PhoneIcon className="h-4 w-4 text-accent-gold" />
                    {CONTACT.phone}
                  </a>
                  <LocaleSwitcher inverted />
                </div>

                <div className="flex flex-col gap-[var(--spacing-compact)]">
                  <Link
                    href="/contact"
                    onClick={onClose}
                    className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-accent-gold bg-accent-gold px-6 py-2.5 text-xs font-normal tracking-[0.14em] text-primary uppercase transition-colors duration-300 hover:border-accent-gold-light hover:bg-accent-gold-light"
                  >
                    {t("contact")}
                  </Link>

                  <p className="text-center font-body text-xs leading-snug tracking-[0.1em] text-white/60">
                    {t("mobileTrustText")}
                  </p>
                </div>
              </div>
            </div>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
