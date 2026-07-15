"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Headline } from "@/components/ui/Headline";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";
import { CONTACT } from "@/lib/constants";

function ContactForm() {
  const t = useTranslations("contact.form");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-sm bg-primary-light p-8 text-center text-primary">
        {t("success")}
      </div>
    );
  }

  const inputClass =
    "w-full rounded-sm border border-primary/20 bg-white px-4 py-3 text-primary outline-none transition-colors focus:border-secondary";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
          <input id="company" name="company" className={inputClass} />
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
      <Button type="submit" variant="primary">
        {t("submit")}
      </Button>
    </form>
  );
}

export function ContactSection() {
  const t = useTranslations("contact");

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <Headline as="h2">{t("title")}</Headline>
              <dl className="mt-8 space-y-6">
                <div>
                  <dt className="text-sm font-semibold text-secondary uppercase">
                    {t("info.phone")}
                  </dt>
                  <dd className="mt-1">
                    <a href={CONTACT.phoneHref} className="text-primary hover:text-secondary">
                      {CONTACT.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-secondary uppercase">
                    {t("info.email")}
                  </dt>
                  <dd className="mt-1">
                    <a href={CONTACT.emailHref} className="text-primary hover:text-secondary">
                      {CONTACT.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-secondary uppercase">
                    {t("info.address")}
                  </dt>
                  <dd className="mt-1 text-muted">
                    {CONTACT.address.street}
                    <br />
                    {CONTACT.address.city}
                    <br />
                    {CONTACT.address.country}
                  </dd>
                </div>
                <div>
                  <Button href={CONTACT.appointmentUrl} external variant="primary">
                    {t("info.appointment")}
                  </Button>
                </div>
              </dl>
            </div>
            <ContactForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
