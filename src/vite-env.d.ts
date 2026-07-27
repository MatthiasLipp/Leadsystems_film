/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Cal.com-Buchungslink für das Erstgespräch (z. B. https://cal.com/handle/erstgespraech) */
  readonly VITE_CAL_URL?: string;
  /** Optionaler POST-Endpunkt für den direkten Kontaktformular-Versand. */
  readonly VITE_CONTACT_FORM_ENDPOINT?: string;
  /** Kontaktadresse für E-Mail, Gmail, Outlook und Formular-Fallbacks. */
  readonly VITE_CONTACT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
