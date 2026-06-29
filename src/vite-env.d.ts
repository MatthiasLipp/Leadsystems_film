/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Cal.com-Buchungslink für das Erstgespräch (z. B. https://cal.com/handle/erstgespraech) */
  readonly VITE_CAL_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
