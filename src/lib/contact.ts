export type EmailDeliveryMethod = "default" | "gmail" | "outlook" | "form";

export type EmailDraft = {
  to: string;
  subject: string;
  body: string;
};

export const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL ?? "kontakt@leadsystems.de";
export const CONTACT_FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT ?? "";
export const EMAIL_METHOD_STORAGE_KEY = "leadsystems-email-method";

export const FIRST_CALL_DRAFT: EmailDraft = {
  to: CONTACT_EMAIL,
  subject: "Erstgespräch — Leadsystems",
  body: [
    "Hallo Leadsystems-Team,",
    "",
    "ich möchte ein Erstgespräch zu unserem Messeauftritt vereinbaren.",
    "",
    "Unternehmen:",
    "Nächste Messe:",
    "Wunschtermin:",
    "",
    "Viele Grüße",
  ].join("\n"),
};

const OUTLOOK_COMPOSE_BASE_URL = "https://outlook.office.com/mail/deeplink/compose";

export function createMailtoLink({ to, subject, body }: EmailDraft) {
  return `mailto:${encodeURI(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function createGmailComposeUrl({ to, subject, body }: EmailDraft) {
  const url = new URL("https://mail.google.com/mail/");
  // Anbieter-spezifische Compose-URLs sind keine universelle Webstandard-Schnittstelle
  // und muessen bei zukuenftigen Anbieter-Aenderungen erneut geprueft werden.
  url.searchParams.set("view", "cm");
  url.searchParams.set("fs", "1");
  url.searchParams.set("to", to);
  url.searchParams.set("su", subject);
  url.searchParams.set("body", body);
  return url.toString();
}

export function createOutlookComposeUrl({ to, subject, body }: EmailDraft) {
  const url = new URL(OUTLOOK_COMPOSE_BASE_URL);
  // Anbieter-spezifische Compose-URLs sind keine universelle Webstandard-Schnittstelle
  // und muessen bei zukuenftigen Anbieter-Aenderungen erneut geprueft werden.
  url.searchParams.set("to", to);
  url.searchParams.set("subject", subject);
  url.searchParams.set("body", body);
  return url.toString();
}

export function isEmailDeliveryMethod(value: string | null): value is EmailDeliveryMethod {
  return value === "default" || value === "gmail" || value === "outlook" || value === "form";
}

export function getStoredEmailMethod() {
  if (typeof window === "undefined") return null;

  const value = window.localStorage.getItem(EMAIL_METHOD_STORAGE_KEY);
  return isEmailDeliveryMethod(value) ? value : null;
}

export function storeEmailMethod(method: EmailDeliveryMethod) {
  window.localStorage.setItem(EMAIL_METHOD_STORAGE_KEY, method);
}

export function clearStoredEmailMethod() {
  window.localStorage.removeItem(EMAIL_METHOD_STORAGE_KEY);
}

export const FIRST_CALL_MAILTO = createMailtoLink(FIRST_CALL_DRAFT);
