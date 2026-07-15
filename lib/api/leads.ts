import { NextResponse } from "next/server";
import type { AppLocale } from "@/lib/resend/config";

export type LeadApiErrorCode =
  | "VALIDATION_ERROR"
  | "CONSENT_REQUIRED"
  | "EMAIL_NOT_CONFIGURED"
  | "EMAIL_SEND_FAILED"
  | "SERVER_ERROR";

export type LeadApiResponse<T = Record<string, unknown>> =
  | ({ success: true } & T)
  | { success: false; error: LeadApiErrorCode; message: string };

export function parseLocale(value: unknown): AppLocale {
  return value === "en" ? "en" : "de";
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function jsonResponse<T>(body: LeadApiResponse<T>, status = 200) {
  return NextResponse.json(body, { status });
}

export function validationError(locale: AppLocale, field?: string) {
  const message =
    locale === "en"
      ? field
        ? `Please check the field: ${field}.`
        : "Please check your entries and try again."
      : field
        ? `Bitte prüfen Sie das Feld: ${field}.`
        : "Bitte prüfen Sie Ihre Eingaben und versuchen Sie es erneut.";

  return jsonResponse(
    { success: false, error: "VALIDATION_ERROR", message },
    400,
  );
}

export function consentError(locale: AppLocale) {
  return jsonResponse(
    {
      success: false,
      error: "CONSENT_REQUIRED",
      message:
        locale === "en"
          ? "Consent is required to process your request."
          : "Zur Verarbeitung Ihrer Anfrage ist eine Einwilligung erforderlich.",
    },
    400,
  );
}

export function emailNotConfiguredError(locale: AppLocale) {
  return jsonResponse(
    {
      success: false,
      error: "EMAIL_NOT_CONFIGURED",
      message:
        locale === "en"
          ? "The contact form is temporarily unavailable. Please call us or book an appointment."
          : "Das Kontaktformular ist vorübergehend nicht verfügbar. Bitte rufen Sie uns an oder buchen Sie einen Termin.",
    },
    503,
  );
}

export function emailSendFailedError(locale: AppLocale) {
  return jsonResponse(
    {
      success: false,
      error: "EMAIL_SEND_FAILED",
      message:
        locale === "en"
          ? "Your message could not be sent. Please try again later."
          : "Ihre Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.",
    },
    502,
  );
}

export function serverError(locale: AppLocale) {
  return jsonResponse(
    {
      success: false,
      error: "SERVER_ERROR",
      message:
        locale === "en"
          ? "An unexpected error occurred. Please try again."
          : "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
    },
    500,
  );
}
