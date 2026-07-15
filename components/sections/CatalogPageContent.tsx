"use client";

import { useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Headline } from "@/components/ui/Headline";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";
import { Link } from "@/lib/navigation";
import { CONTACT } from "@/lib/constants";
import { submitLead } from "@/lib/forms/submit-lead";

const inputClass =
  "w-full rounded-sm border border-primary/20 bg-white px-4 py-3 text-primary outline-none transition-colors focus:border-secondary";

export function CatalogPageContent() {
  const t = useTranslations("catalog");
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const result = await submitLead<{ downloadUrl?: string }>("/api/leads/booklet", {
      locale,
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      postalCode: formData.get("postalCode"),
      businessType: formData.get("businessType"),
      interests: formData.get("interests"),
      consent: formData.get("consent") === "on",
    });

    setLoading(false);

    if (result.success) {
      setSubmitted(true);
      setDownloadUrl(result.downloadUrl ?? "/downloads/katalog-2026.pdf");
      return;
    }

    setError(result.message);
  };

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <Headline as="h2">{t("preview.title")}</Headline>
              <p className="mt-4 text-muted leading-relaxed">{t("preview.text")}</p>

              <ul className="mt-8 space-y-4">
                {(["collections", "services", "partnership"] as const).map((key) => (
                  <li key={key} className="flex gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-secondary" />
                    <div>
                      <p className="font-semibold text-primary">{t(`valueProps.${key}.title`)}</p>
                      <p className="mt-1 text-sm text-muted">{t(`valueProps.${key}.text`)}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10 rounded-sm border border-primary/15 bg-primary-light p-6">
                <p className="text-sm font-semibold tracking-wide text-secondary uppercase">
                  {t("preview.noteLabel")}
                </p>
                <p className="mt-2 text-sm text-muted">{t("preview.note")}</p>
              </div>
            </div>

            <div className="rounded-sm border border-primary/10 bg-white p-6 shadow-sm md:p-8">
              {submitted ? (
                <div className="space-y-6 text-center">
                  <Headline as="h3" bar={false}>
                    {t("form.successTitle")}
                  </Headline>
                  <p className="text-muted">{t("form.successText")}</p>
                  {downloadUrl ? (
                    <Button href={downloadUrl} external variant="primary" shape="pill">
                      {t("form.download")}
                    </Button>
                  ) : null}
                  <div>
                    <Button href={CONTACT.appointmentUrl} external variant="outline" shape="pill">
                      {t("form.bookAppointment")}
                    </Button>
                  </div>
                  <p className="text-sm text-muted">{t("form.emailNote")}</p>
                </div>
              ) : (
                <>
                  <Headline as="h3" bar={false}>
                    {t("form.title")}
                  </Headline>
                  <p className="mt-3 text-sm text-muted">{t("form.subtitle")}</p>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    {error ? (
                      <div className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                        {error}
                      </div>
                    ) : null}

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="catalog-company" className="mb-1 block text-sm font-semibold text-primary">
                          {t("form.company")}
                        </label>
                        <input id="catalog-company" name="company" required className={inputClass} />
                      </div>
                      <div>
                        <label htmlFor="catalog-name" className="mb-1 block text-sm font-semibold text-primary">
                          {t("form.name")}
                        </label>
                        <input id="catalog-name" name="name" required className={inputClass} />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="catalog-email" className="mb-1 block text-sm font-semibold text-primary">
                          {t("form.email")}
                        </label>
                        <input id="catalog-email" name="email" type="email" required className={inputClass} />
                      </div>
                      <div>
                        <label htmlFor="catalog-phone" className="mb-1 block text-sm font-semibold text-primary">
                          {t("form.phone")}
                        </label>
                        <input id="catalog-phone" name="phone" type="tel" className={inputClass} />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="catalog-postal" className="mb-1 block text-sm font-semibold text-primary">
                          {t("form.postalCode")}
                        </label>
                        <input id="catalog-postal" name="postalCode" className={inputClass} />
                      </div>
                      <div>
                        <label htmlFor="catalog-business" className="mb-1 block text-sm font-semibold text-primary">
                          {t("form.businessType")}
                        </label>
                        <select id="catalog-business" name="businessType" defaultValue="" className={inputClass}>
                          <option value="">{t("form.businessTypePlaceholder")}</option>
                          <option value="jeweler">{t("form.businessTypes.jeweler")}</option>
                          <option value="goldsmith">{t("form.businessTypes.goldsmith")}</option>
                          <option value="retail">{t("form.businessTypes.retail")}</option>
                          <option value="other">{t("form.businessTypes.other")}</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="catalog-interests" className="mb-1 block text-sm font-semibold text-primary">
                        {t("form.interests")}
                      </label>
                      <textarea
                        id="catalog-interests"
                        name="interests"
                        rows={3}
                        placeholder={t("form.interestsPlaceholder")}
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
                        {t("form.consent")}{" "}
                        <Link href="/privacy" className="text-secondary underline hover:text-primary">
                          {t("form.privacyLink")}
                        </Link>
                      </span>
                    </label>

                    <Button type="submit" variant="primary" shape="pill" disabled={loading}>
                      {loading ? t("form.submitting") : t("form.submit")}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
