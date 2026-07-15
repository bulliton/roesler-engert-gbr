"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePathname } from "@/lib/navigation";
import { CONTACT } from "@/lib/constants";

const SCROLL_THRESHOLD = 160;

export function StickyAppointmentButton() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }

    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const visible = !isHome || scrolled;

  return (
    <motion.div
      initial={false}
      animate={{ y: visible ? 0 : "100%" }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : { duration: 0.32, ease: [0.4, 0, 0.2, 1] }
      }
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-primary-dark px-[var(--section-padding-x)] pt-[var(--mobile-bottom-bar-padding)] pb-[max(var(--mobile-bottom-bar-padding),env(safe-area-inset-bottom))] md:hidden ${
        visible ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <a
        href={CONTACT.appointmentUrl}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visible ? 0 : -1}
        className="flex min-h-11 w-full items-center justify-center rounded-full border border-accent-gold bg-accent-gold px-6 py-2.5 text-xs font-normal tracking-[0.14em] text-primary uppercase transition-colors duration-300 hover:border-accent-gold-light hover:bg-accent-gold-light"
      >
        {t("bookAppointment")}
      </a>
    </motion.div>
  );
}
