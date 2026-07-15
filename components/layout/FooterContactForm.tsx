"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";

const inputClass =
  "w-full border-0 border-b border-white/25 bg-transparent py-3 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-secondary";

export function FooterContactForm() {
  const t = useTranslations("footer.form");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex min-h-[20rem] items-center justify-center rounded-lg border border-white/10 bg-primary/70 p-8 text-center">
        <p className="font-display text-lg text-white">{t("success")}</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-white/10 bg-primary/70 p-6 lg:p-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="footer-request" className="sr-only">
            {t("requestType")}
          </label>
          <select
            id="footer-request"
            name="requestType"
            required
            defaultValue=""
            className={`${inputClass} cursor-pointer appearance-none`}
          >
            <option value="" disabled className="bg-primary-dark text-white/60">
              {t("requestType")}
            </option>
            <option value="partnership" className="bg-primary-dark">
              {t("requestPartnership")}
            </option>
            <option value="diamonds" className="bg-primary-dark">
              {t("requestDiamonds")}
            </option>
            <option value="collection" className="bg-primary-dark">
              {t("requestCollection")}
            </option>
            <option value="general" className="bg-primary-dark">
              {t("requestGeneral")}
            </option>
          </select>
        </div>

        <div>
          <label htmlFor="footer-name" className="sr-only">
            {t("name")}
          </label>
          <input
            id="footer-name"
            name="name"
            type="text"
            required
            placeholder={t("name")}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="footer-email" className="sr-only">
            {t("email")}
          </label>
          <input
            id="footer-email"
            name="email"
            type="email"
            required
            placeholder={t("email")}
            className={inputClass}
          />
        </div>

        <div>
          <div className="mb-1 flex items-baseline justify-between gap-4">
            <label htmlFor="footer-message" className="sr-only">
              {t("message")}
            </label>
            <span className="text-xs text-white/40">{t("optional")}</span>
          </div>
          <textarea
            id="footer-message"
            name="message"
            rows={3}
            placeholder={t("message")}
            className={`${inputClass} resize-none`}
          />
        </div>

        <label className="flex items-start gap-3 text-xs leading-relaxed text-white/55">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-0.5 h-4 w-4 shrink-0 rounded-sm border-white/30 bg-transparent accent-secondary"
          />
          <span>
            {t("consent")}{" "}
            <Link href="/privacy" className="text-white/80 underline hover:text-secondary">
              {t("privacyLink")}
            </Link>
          </span>
        </label>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="rounded-full bg-secondary px-8 py-2.5 text-sm font-semibold tracking-wide text-white uppercase transition-colors hover:bg-white hover:text-primary"
          >
            {t("submit")}
          </button>
        </div>
      </form>
    </div>
  );
}
