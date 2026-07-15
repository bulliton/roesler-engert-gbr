"use client";

import { useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { submitLead } from "@/lib/forms/submit-lead";
import { CONTACT_SALUTATIONS } from "@/lib/leads/contact-name";
import { Link } from "@/lib/navigation";

type ContactFormProps = {
  variant?: "default" | "editorial";
};

const defaultInputClass =
  "w-full rounded-sm border border-primary/20 bg-white px-4 py-3 text-primary outline-none transition-colors focus:border-secondary";

const editorialInputClass =
  "contact-editorial-input w-full border-0 border-b border-primary/20 bg-transparent px-0 py-3 text-primary outline-none transition-colors placeholder:text-primary/35 focus:border-secondary";

const editorialLabelClass =
  "mb-1 block font-body text-[10px] font-semibold tracking-[0.2em] text-primary/55 uppercase";

const defaultLabelClass = "mb-1 block text-sm font-semibold text-primary";

export function ContactForm({ variant = "default" }: ContactFormProps) {
  const t = useTranslations("contact.form");
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditorial = variant === "editorial";
  const inputClass = isEditorial ? editorialInputClass : defaultInputClass;
  const labelClass = isEditorial ? editorialLabelClass : defaultLabelClass;

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
      <div
        className={
          isEditorial
            ? "border border-primary/10 bg-primary-light/50 px-6 py-8 text-center text-primary"
            : "rounded-sm bg-primary-light p-8 text-center text-primary"
        }
      >
        {t("success")}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error ? (
        <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </div>
      ) : null}

      <div>
        <label htmlFor="requestType" className={labelClass}>
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

      <div className="grid gap-6 sm:grid-cols-[minmax(0,7.5rem)_1fr_1fr]">
        <div>
          <label htmlFor="salutation" className={labelClass}>
            {t("salutation")}
          </label>
          <select
            id="salutation"
            name="salutation"
            required
            defaultValue=""
            className={`${inputClass} cursor-pointer`}
          >
            <option value="" disabled>
              {t("salutationPlaceholder")}
            </option>
            {CONTACT_SALUTATIONS.map((value) => (
              <option key={value} value={value}>
                {t(`salutationOptions.${value}`)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="firstName" className={labelClass}>
            {t("firstName")}
          </label>
          <input id="firstName" name="firstName" required autoComplete="given-name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>
            {t("lastName")}
          </label>
          <input id="lastName" name="lastName" required autoComplete="family-name" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="company" className={labelClass}>
          {t("company")}
        </label>
        <input id="company" name="company" required autoComplete="organization" className={inputClass} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClass}>
            {t("email")}
          </label>
          <input id="email" name="email" type="email" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            {t("phone")}
          </label>
          <input id="phone" name="phone" type="tel" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          {t("message")}
        </label>
        <textarea id="message" name="message" rows={5} required className={inputClass} />
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

      <Button
        type="submit"
        variant="primary"
        shape={isEditorial ? "pill" : "rect"}
        disabled={loading}
        className={isEditorial ? "!bg-primary hover:!bg-primary-dark" : undefined}
      >
        {loading ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
