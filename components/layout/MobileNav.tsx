"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { CONTACT } from "@/lib/constants";
import {
  jewelrySubItems,
  leftNavItems,
  rightNavItems,
  utilityNavItems,
} from "@/lib/nav-config";
import { SearchInput } from "@/components/ui/SearchInput";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNav({ open, onClose }: MobileNavProps) {
  const t = useTranslations("nav");

  if (!open) return null;

  const linkClass =
    "flex items-center justify-between py-3 text-base font-display text-primary border-b border-primary/10";

  const subLinkClass =
    "block py-2.5 pl-4 text-sm font-normal text-primary/80 border-b border-primary/5";

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
          className="mb-6 self-end text-2xl text-primary"
          aria-label="Close menu"
        >
          ×
        </button>

        <SearchInput className="mb-6" />

        {leftNavItems.map((item) =>
          item.key === "jewelry" ? (
            <div key={item.key} className="border-b border-primary/10">
              <Link href={item.href} className={linkClass} onClick={onClose}>
                {t(item.key)}
              </Link>
              <div className="pb-2">
                {jewelrySubItems.map((sub) => (
                  <Link
                    key={sub.key}
                    href={sub.href}
                    className={subLinkClass}
                    onClick={onClose}
                  >
                    {t(sub.key)}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link key={item.key} href={item.href} className={linkClass} onClick={onClose}>
              {t(item.key)}
            </Link>
          ),
        )}

        {rightNavItems.map((item) => (
          <Link key={item.key} href={item.href} className={linkClass} onClick={onClose}>
            {t(item.key)}
          </Link>
        ))}

        {utilityNavItems.map((item) => (
          <Link key={item.key} href={item.href} className={linkClass} onClick={onClose}>
            {t(item.key)}
          </Link>
        ))}

        <a
          href={CONTACT.appointmentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
          onClick={onClose}
        >
          {t("bookAppointment")}
        </a>

        <div className="mt-auto pt-6">
          <LocaleSwitcher />
        </div>
      </nav>
    </div>
  );
}
