"use client";

import { useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { submitLead } from "@/lib/forms/submit-lead";
import { CONTACT_SALUTATIONS } from "@/lib/leads/contact-name";

const inputClass =
  "w-full border-0 border-b border-white/25 bg-transparent py-3 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-secondary";

export function FooterContactForm() {
  const t = useTranslations("footer.form");
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

    const result = await submitLead("/api/leads/contact", {
      locale,
      salutation: formData.get("salutation"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      company: formData.get("company"),
      email: formData.get("email"),
      message: formData.get("message"),
      requestType: formData.get("requestType"),
      consent: formData.get("consent") === "on",
      source: "footer-form",
    });

    setLoading(false);

    if (result.success) {
      setSubmitted(true);
      return;
    }

    setError(result.message);
  };

  if (submitted) {
    return (
      <div className="flex min-h-[20rem] items-center justify-center rounded-lg border border-white/10 bg-primary/70 p-8 text-center">
        <p className="font-display text-lg text-white">{t("success")}</p>
      </div>
    );
  }

  return (
    <div className="h-full rounded-lg border border-white/10 bg-primary/50 p-6 lg:p-7">
      <form onSubmit={handleSubmit} className="flex h-full flex-col space-y-5">
        {error ? (
          <p className="rounded-sm border border-red-300/40 bg-red-950/30 px-3 py-2 text-xs text-red-100">
            {error}
          </p>
        ) : null}

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
          <label htmlFor="footer-salutation" className="sr-only">
            {t("salutation")}
          </label>
          <select
            id="footer-salutation"
            name="salutation"
            required
            defaultValue=""
            className={`${inputClass} cursor-pointer appearance-none`}
          >
            <option value="" disabled className="bg-primary-dark text-white/60">
              {t("salutation")}
            </option>
            {CONTACT_SALUTATIONS.map((value) => (
              <option key={value} value={value} className="bg-primary-dark">
                {t(`salutationOptions.${value}`)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="footer-company" className="sr-only">
            {t("company")}
          </label>
          <input
            id="footer-company"
            name="company"
            type="text"
            required
            placeholder={t("company")}
            className={inputClass}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="footer-firstName" className="sr-only">
              {t("firstName")}
            </label>
            <input
              id="footer-firstName"
              name="firstName"
              type="text"
              required
              autoComplete="given-name"
              placeholder={t("firstName")}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="footer-lastName" className="sr-only">
              {t("lastName")}
            </label>
            <input
              id="footer-lastName"
              name="lastName"
              type="text"
              required
              autoComplete="family-name"
              placeholder={t("lastName")}
              className={inputClass}
            />
          </div>
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

        <div className="mt-auto flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-secondary px-8 py-2.5 text-sm font-semibold tracking-wide text-white uppercase transition-colors hover:bg-white hover:text-primary disabled:opacity-60"
          >
            {loading ? t("submitting") : t("submit")}
          </button>
        </div>
      </form>
    </div>
  );
}
