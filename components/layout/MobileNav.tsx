"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNav({ open, onClose }: MobileNavProps) {
  const t = useTranslations("nav");

  if (!open) return null;

  const linkClass =
    "block py-3 text-lg font-display text-primary border-b border-primary/10";

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      <div
        className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <nav className="absolute top-0 right-0 flex h-full w-[min(100%,20rem)] flex-col bg-white p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="mb-8 self-end text-2xl text-primary"
          aria-label="Close menu"
        >
          ×
        </button>
        <Link href="/diamonds" className={linkClass} onClick={onClose}>
          {t("diamonds")}
        </Link>
        <Link href="/jewelry" className={linkClass} onClick={onClose}>
          {t("jewelry")}
        </Link>
        <Link
          href={{ pathname: "/jewelry", hash: "earrings" }}
          className="block py-2 pl-4 text-sm text-muted hover:text-primary"
          onClick={onClose}
        >
          {t("earrings")}
        </Link>
        <Link
          href={{ pathname: "/jewelry", hash: "rings" }}
          className="block py-2 pl-4 text-sm text-muted hover:text-primary"
          onClick={onClose}
        >
          {t("rings")}
        </Link>
        <Link
          href={{ pathname: "/jewelry", hash: "necklaces" }}
          className="mb-2 block py-2 pl-4 text-sm text-muted hover:text-primary"
          onClick={onClose}
        >
          {t("necklaces")}
        </Link>
        <Link href="/about" className={linkClass} onClick={onClose}>
          {t("about")}
        </Link>
        <Link href="/contact" className={linkClass} onClick={onClose}>
          {t("contact")}
        </Link>
        <div className="mt-auto pt-6">
          <LocaleSwitcher />
        </div>
      </nav>
    </div>
  );
}
