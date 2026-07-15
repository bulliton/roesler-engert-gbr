"use client";

import { useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FooterLabel } from "@/components/ui/FooterLabel";
import { Link } from "@/lib/navigation";
import { submitLead } from "@/lib/forms/submit-lead";

export function NewsletterForm() {
  const t = useTranslations("footer.newsletter");
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const result = await submitLead("/api/leads/newsletter", {
      locale,
      email: formData.get("email"),
      consent: formData.get("consent") === "on",
    });

    setLoading(false);

    if (result.success) {
      setSubmitted(true);
      return;
    }

    setError(result.message);
  };

  return (
    <div className="border-t border-white/10 pt-8">
      <FooterLabel className="mb-2">{t("title")}</FooterLabel>
      <p className="mb-4 font-body text-sm leading-relaxed text-white/65">{t("description")}</p>
      {submitted ? (
        <p className="text-sm text-secondary">{t("success")}</p>
      ) : (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {error ? (
            <p className="text-xs text-red-200">{error}</p>
          ) : null}
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
          <button
            type="submit"
            disabled={loading}
            className="self-start py-2.5 text-sm font-semibold tracking-wide text-white uppercase transition-colors hover:text-secondary disabled:opacity-60"
          >
            {loading ? t("submitting") : t("submit")}
          </button>
        </form>
      )}
    </div>
  );
}
