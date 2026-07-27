import { useState, type FormEvent, type ReactNode } from "react";
import { Check, Mail, MonitorUp, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  clearStoredEmailMethod,
  CONTACT_EMAIL,
  CONTACT_FORM_ENDPOINT,
  createGmailComposeUrl,
  createMailtoLink,
  createOutlookComposeUrl,
  FIRST_CALL_DRAFT,
  getStoredEmailMethod,
  storeEmailMethod,
  type EmailDeliveryMethod,
  type EmailDraft,
} from "@/lib/contact";

type EmailRequestButtonProps = {
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
  changeClassName?: string;
  size?: "default" | "xs" | "sm" | "lg";
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive" | "link";
  onBeforeDialogOpen?: () => void;
};

type ContactFormState = {
  name: string;
  email: string;
  company: string;
  fair: string;
  message: string;
};

const INITIAL_FORM: ContactFormState = {
  name: "",
  email: "",
  company: "",
  fair: "",
  message: "Hallo Leadsystems-Team,\n\nich möchte ein Erstgespräch vereinbaren.",
};

const METHOD_LABELS: Record<EmailDeliveryMethod, string> = {
  default: "E-Mail-App öffnen",
  gmail: "Mit Gmail öffnen",
  outlook: "Mit Outlook öffnen",
  form: "Nachricht direkt über die Webseite senden",
};

function openNewTab(url: string) {
  const opened = window.open(url, "_blank", "noopener,noreferrer");
  if (opened) opened.opener = null;
  return opened;
}

function buildFormDraft(form: ContactFormState): EmailDraft {
  const lines = [
    form.message.trim(),
    "",
    "Name: " + (form.name.trim() || "-"),
    "E-Mail: " + (form.email.trim() || "-"),
    "Unternehmen: " + (form.company.trim() || "-"),
    "Nächste Messe: " + (form.fair.trim() || "-"),
  ];

  return {
    to: CONTACT_EMAIL,
    subject: FIRST_CALL_DRAFT.subject,
    body: lines.join("\n"),
  };
}

export function EmailRequestButton({
  children,
  className,
  wrapperClassName,
  changeClassName,
  size = "default",
  variant = "default",
  onBeforeDialogOpen,
}: EmailRequestButtonProps) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"options" | "form">("options");
  const [remember, setRemember] = useState(false);
  const [storedMethod, setStoredMethod] = useState<EmailDeliveryMethod | null>(() =>
    getStoredEmailMethod(),
  );
  const [notice, setNotice] = useState<string | null>(null);
  const [form, setForm] = useState<ContactFormState>(INITIAL_FORM);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const openDialog = (nextView: "options" | "form" = "options") => {
    onBeforeDialogOpen?.();
    setNotice(null);
    setRemember(false);
    setView(nextView);
    setOpen(true);
  };

  const executeMethod = (method: EmailDeliveryMethod, draft = FIRST_CALL_DRAFT) => {
    if (method === "form") {
      openDialog("form");
      return true;
    }

    if (method === "default") {
      window.location.href = createMailtoLink(draft);
      setOpen(false);
      return true;
    }

    const url = method === "gmail" ? createGmailComposeUrl(draft) : createOutlookComposeUrl(draft);
    const opened = openNewTab(url);

    if (!opened) {
      setNotice(
        "Der neue Tab wurde vom Browser blockiert. Bitte wähle die Option noch einmal über einen Button aus.",
      );
      openDialog("options");
      return false;
    }

    setOpen(false);
    return true;
  };

  const handlePrimaryClick = () => {
    const latestStoredMethod = getStoredEmailMethod();
    setStoredMethod(latestStoredMethod);

    if (latestStoredMethod) {
      executeMethod(latestStoredMethod);
      return;
    }

    openDialog("options");
  };

  const handleChangeOption = () => {
    clearStoredEmailMethod();
    setStoredMethod(null);
    openDialog("options");
  };

  const handleSelect = (method: EmailDeliveryMethod) => {
    if (remember) {
      storeEmailMethod(method);
      setStoredMethod(method);
    }

    executeMethod(method);
  };

  const updateForm = (field: keyof ContactFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("sending");

    if (!CONTACT_FORM_ENDPOINT) {
      setFormStatus("error");
      setNotice(
        "Der direkte Webseitenversand ist noch nicht konfiguriert. E-Mail-App, Gmail und Outlook bleiben als Versandwege verfuegbar.",
      );
      return;
    }

    try {
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          fair: form.fair,
          message: form.message,
        }),
      });

      if (!response.ok) throw new Error("Form submission failed");

      setFormStatus("sent");
      setNotice("Danke, deine Anfrage wurde gesendet.");
      setForm(INITIAL_FORM);
    } catch {
      setFormStatus("error");
      setNotice(
        "Die Nachricht konnte gerade nicht direkt gesendet werden. Bitte nutze eine der E-Mail-Optionen.",
      );
    }
  };

  const fallbackDraft = buildFormDraft(form);

  return (
    <>
      <span className={cn("inline-flex flex-col items-start gap-1.5", wrapperClassName)}>
        <Button type="button" size={size} variant={variant} className={className} onClick={handlePrimaryClick}>
          {children}
        </Button>
        {storedMethod && (
          <button
            type="button"
            className={cn(
              "text-xs text-current/65 underline-offset-4 transition-colors hover:text-current hover:underline",
              changeClassName,
            )}
            onClick={handleChangeOption}
          >
            E-Mail-Option ändern
          </button>
        )}
      </span>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[calc(100vh-2rem)] overflow-y-auto bg-paper text-ink sm:max-w-xl">
          {view === "options" ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl leading-tight text-ink">
                  Wie möchtest du deine Anfrage senden?
                </DialogTitle>
                <DialogDescription className="text-slate">
                  Wähle einen Versandweg. Das Kontaktformular bleibt jederzeit als Alternative verfügbar.
                </DialogDescription>
              </DialogHeader>

              {notice && (
                <p className="rounded-md border border-pulse/20 bg-pulse/8 px-3 py-2 text-sm text-slate">
                  {notice}
                </p>
              )}

              <div className="grid gap-3">
                <button
                  type="button"
                  aria-label={METHOD_LABELS.default}
                  className="rounded-lg border border-porcelain-200 bg-white p-4 text-left transition-colors hover:border-pulse/35 hover:bg-porcelain-200/45"
                  onClick={() => handleSelect("default")}
                >
                  <span className="flex items-center gap-3 font-semibold text-ink">
                    <Mail className="size-5 text-pulse-deep" aria-hidden="true" />
                    {METHOD_LABELS.default}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-slate">
                    Ist Gmail, Outlook oder eine andere E-Mail-App als Standard eingerichtet, wird
                    sie beim nächsten Mal automatisch geöffnet.
                  </span>
                </button>

                <button
                  type="button"
                  aria-label={METHOD_LABELS.gmail}
                  className="rounded-lg border border-porcelain-200 bg-white p-4 text-left transition-colors hover:border-pulse/35 hover:bg-porcelain-200/45"
                  onClick={() => handleSelect("gmail")}
                >
                  <span className="flex items-center gap-3 font-semibold text-ink">
                    <MonitorUp className="size-5 text-pulse-deep" aria-hidden="true" />
                    {METHOD_LABELS.gmail}
                  </span>
                </button>

                <button
                  type="button"
                  aria-label={METHOD_LABELS.outlook}
                  className="rounded-lg border border-porcelain-200 bg-white p-4 text-left transition-colors hover:border-pulse/35 hover:bg-porcelain-200/45"
                  onClick={() => handleSelect("outlook")}
                >
                  <span className="flex items-center gap-3 font-semibold text-ink">
                    <MonitorUp className="size-5 text-pulse-deep" aria-hidden="true" />
                    {METHOD_LABELS.outlook}
                  </span>
                </button>

                <button
                  type="button"
                  aria-label={METHOD_LABELS.form}
                  className="rounded-lg border border-porcelain-200 bg-white p-4 text-left transition-colors hover:border-pulse/35 hover:bg-porcelain-200/45"
                  onClick={() => handleSelect("form")}
                >
                  <span className="flex items-center gap-3 font-semibold text-ink">
                    <Send className="size-5 text-pulse-deep" aria-hidden="true" />
                    {METHOD_LABELS.form}
                  </span>
                </button>
              </div>

              <label className="flex items-start gap-3 rounded-md bg-porcelain-200/60 p-3 text-sm text-slate">
                <input
                  type="checkbox"
                  className="mt-1 size-4 accent-pulse"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                />
                <span>Diese Auswahl für zukünftige Anfragen merken</span>
              </label>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl leading-tight text-ink">
                  Nachricht direkt über die Webseite senden
                </DialogTitle>
                <DialogDescription className="text-slate">
                  Das Formular speichert keine Auswahl- oder Accountdaten im Browser.
                </DialogDescription>
              </DialogHeader>

              {notice && (
                <p className="rounded-md border border-pulse/20 bg-pulse/8 px-3 py-2 text-sm text-slate">
                  {notice}
                </p>
              )}

              <form className="grid gap-4" onSubmit={handleFormSubmit}>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="grid gap-1.5 text-sm font-medium text-ink">
                    Name
                    <input
                      className="h-10 rounded-md border border-input bg-white px-3 text-sm text-ink outline-none focus:border-pulse"
                      value={form.name}
                      onChange={(event) => updateForm("name", event.target.value)}
                      autoComplete="name"
                    />
                  </label>
                  <label className="grid gap-1.5 text-sm font-medium text-ink">
                    E-Mail
                    <input
                      className="h-10 rounded-md border border-input bg-white px-3 text-sm text-ink outline-none focus:border-pulse"
                      value={form.email}
                      onChange={(event) => updateForm("email", event.target.value)}
                      autoComplete="email"
                      type="email"
                    />
                  </label>
                  <label className="grid gap-1.5 text-sm font-medium text-ink">
                    Unternehmen
                    <input
                      className="h-10 rounded-md border border-input bg-white px-3 text-sm text-ink outline-none focus:border-pulse"
                      value={form.company}
                      onChange={(event) => updateForm("company", event.target.value)}
                      autoComplete="organization"
                    />
                  </label>
                  <label className="grid gap-1.5 text-sm font-medium text-ink">
                    Nächste Messe
                    <input
                      className="h-10 rounded-md border border-input bg-white px-3 text-sm text-ink outline-none focus:border-pulse"
                      value={form.fair}
                      onChange={(event) => updateForm("fair", event.target.value)}
                    />
                  </label>
                </div>

                <label className="grid gap-1.5 text-sm font-medium text-ink">
                  Nachricht
                  <textarea
                    className="min-h-32 rounded-md border border-input bg-white px-3 py-2 text-sm text-ink outline-none focus:border-pulse"
                    value={form.message}
                    onChange={(event) => updateForm("message", event.target.value)}
                  />
                </label>

                <div className="flex flex-wrap items-center gap-3">
                  <Button type="submit" className="rounded-full px-5" disabled={formStatus === "sending"}>
                    {formStatus === "sending" ? "Wird gesendet..." : "Nachricht senden"}
                    <Check className="size-4" aria-hidden="true" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full px-5"
                    onClick={() => setView("options")}
                  >
                    Versandweg wählen
                  </Button>
                </div>
              </form>

              <div className="border-t border-porcelain-200 pt-4">
                <p className="mb-3 text-sm text-slate">Oder mit deinem Text öffnen:</p>
                <div className="flex flex-wrap gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => executeMethod("default", fallbackDraft)}>
                    E-Mail-App
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => executeMethod("gmail", fallbackDraft)}>
                    Gmail
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => executeMethod("outlook", fallbackDraft)}>
                    Outlook
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
