"use client";

import { useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { submitLead } from "@/lib/forms/submit-lead";
import { Link } from "@/lib/navigation";

const inputClass =
  "w-full rounded-sm border border-primary/20 bg-white px-4 py-3 text-primary outline-none transition-colors focus:border-secondary";

export function ContactForm() {
  const t = useTranslations("contact.form");
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
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      requestType: formData.get("requestType"),
      consent: formData.get("consent") === "on",
      source: "contact-page",
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
      <div className="rounded-sm bg-primary-light p-8 text-center text-primary">
        {t("success")}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error ? (
        <div className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </div>
      ) : null}

      <div>
        <label htmlFor="requestType" className="mb-1 block text-sm font-semibold text-primary">
          {t("requestType")}
        </label>
        <select
          id="requestType"
          name="requestType"
          required
          defaultValue=""
          className={`${inputClass} cursor-pointer`}
        >
          <option value="" disabled>
            {t("requestTypePlaceholder")}
          </option>
          <option value="partnership">{t("requestPartnership")}</option>
          <option value="diamonds">{t("requestDiamonds")}</option>
          <option value="collection">{t("requestCollection")}</option>
          <option value="general">{t("requestGeneral")}</option>
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-semibold text-primary">
            {t("name")}
          </label>
          <input id="name" name="name" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="company" className="mb-1 block text-sm font-semibold text-primary">
            {t("company")}
          </label>
          <input id="company" name="company" required className={inputClass} />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-semibold text-primary">
            {t("email")}
          </label>
          <input id="email" name="email" type="email" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-semibold text-primary">
            {t("phone")}
          </label>
          <input id="phone" name="phone" type="tel" className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-semibold text-primary">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={inputClass}
        />
      </div>

      <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 h-4 w-4 shrink-0 rounded-sm border-primary/30 accent-secondary"
        />
        <span>
          {t("consent")}{" "}
          <Link href="/privacy" className="text-secondary underline hover:text-primary">
            {t("privacyLink")}
          </Link>
        </span>
      </label>

      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
