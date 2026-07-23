export const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL ?? "kontakt@leadsystems.de";

export const FIRST_CALL_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "Erstgespräch — Leadsystems",
)}&body=${encodeURIComponent(
  "Hallo Leadsystems-Team,\n\nich möchte ein Erstgespräch zu unserem Messeauftritt vereinbaren.\n\nUnternehmen:\nNächste Messe:\nWunschtermin:\n\nViele Grüße",
)}`;
