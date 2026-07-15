"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function NewsletterForm() {
  const t = useTranslations("footer.newsletter");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="border-t border-white/10 pt-8">
      <h3 className="mb-2 text-xs font-semibold tracking-[0.2em] text-secondary uppercase">
        {t("title")}
      </h3>
      <p className="mb-4 text-sm leading-relaxed text-white/65">{t("description")}</p>
      {submitted ? (
        <p className="text-sm text-secondary">{t("success")}</p>
      ) : (
        <form
          className="flex flex-col gap-3 sm:flex-row sm:items-end"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <label className="flex-1">
            <span className="sr-only">{t("emailLabel")}</span>
            <input
              type="email"
              name="email"
              required
              placeholder={t("emailLabel")}
              className="w-full border-b border-white/25 bg-transparent py-2.5 text-sm text-white placeholder:text-white/40 focus:border-secondary focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="shrink-0 py-2.5 text-sm font-semibold tracking-wide text-white uppercase transition-colors hover:text-secondary"
          >
            {t("submit")}
          </button>
        </form>
      )}
    </div>
  );
}
