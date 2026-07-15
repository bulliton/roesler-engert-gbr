"use client";

import { useTranslations } from "next-intl";
import { CONTACT } from "@/lib/constants";

export function StickyAppointmentButton() {
  const t = useTranslations("nav");

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 p-4 md:hidden">
      <a
        href={CONTACT.appointmentUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex min-h-10 w-full items-center justify-center rounded-sm border border-white bg-primary px-7 py-2 text-xs font-normal tracking-[0.14em] text-white uppercase transition-colors duration-500 hover:bg-primary-dark"
      >
        {t("bookAppointment")}
      </a>
    </div>
  );
}
