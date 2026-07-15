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
        className="pointer-events-auto flex min-h-12 w-full items-center justify-center rounded-full bg-secondary px-6 py-3 text-sm font-semibold tracking-wide text-white uppercase shadow-lg transition-colors hover:bg-primary"
      >
        {t("bookAppointment")}
      </a>
    </div>
  );
}
