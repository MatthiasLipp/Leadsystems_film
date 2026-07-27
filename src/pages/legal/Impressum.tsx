import { Link } from "react-router-dom";
import { LegalLayout } from "./LegalLayout";

export function Impressum() {
  return (
    <LegalLayout
      title="Impressum"
      intro="Angaben gemäß § 5 ECG, § 14 UGB, § 63 GewO und § 25 MedienG."
      updated="Juli 2026"
    >
      <p className="muted">
        Hinweis: Bitte prüfen und ergänzen Sie die mit „[…]“ markierten Platzhalter vor der
        Veröffentlichung.
      </p>

      <h2>Medieninhaber &amp; Diensteanbieter</h2>
      <p>
        <strong>Jamodo e.U.</strong>
        <br />
        Inhaber: Matthias Lipp
        <br />
        [Straße und Hausnummer]
        <br />
        [PLZ] [Ort], Österreich
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: [Telefonnummer]
        <br />
        E-Mail: <a href="mailto:kontakt@leadsystems.de">kontakt@leadsystems.de</a>
        <br />
        Web: leadsystems.de
      </p>

      <h2>Unternehmensdaten</h2>
      <p>
        Firmenbuchnummer: [FN …]
        <br />
        Firmenbuchgericht: [zuständiges Landesgericht]
        <br />
        UID-Nummer: [ATU …]
        <br />
        Unternehmensgegenstand: technische Dienstleistungen im Bereich Lead-Erfassung, CRM-,
        Automatisierungs- und Kommunikationssysteme
      </p>

      <h2>Gewerbe &amp; Aufsicht</h2>
      <p>
        Gewerbeberechtigung: [Bezeichnung des Gewerbes]
        <br />
        Mitgliedschaft: Wirtschaftskammer [Bundesland], Fachgruppe [Fachgruppe]
        <br />
        Aufsichtsbehörde / Gewerbebehörde: [Bezirkshauptmannschaft / Magistrat]
        <br />
        Anwendbare Rechtsvorschriften: Gewerbeordnung (GewO), abrufbar unter{" "}
        <a href="https://www.ris.bka.gv.at" target="_blank" rel="noopener noreferrer">
          ris.bka.gv.at
        </a>
      </p>

      <h2>Online-Streitbeilegung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
          ec.europa.eu/consumers/odr
        </a>
        . Unsere E-Mail-Adresse finden Sie oben. Wir sind nicht verpflichtet und grundsätzlich nicht
        bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
        teilzunehmen.
      </p>

      <h2>Haftung für Inhalte &amp; Links</h2>
      <p>
        Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit,
        Vollständigkeit und Aktualität der Inhalte übernehmen wir jedoch keine Gewähr. Unsere Website
        enthält ggf. Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
        Für diese fremden Inhalte ist stets der jeweilige Anbieter verantwortlich.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die auf dieser Website veröffentlichten Inhalte und Werke unterliegen dem österreichischen
        Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung
        außerhalb der Grenzen des Urheberrechts bedürfen unserer schriftlichen Zustimmung.
      </p>

      <p className="muted">
        Informationen zum Umgang mit Ihren Daten finden Sie in unserer{" "}
        <Link to="/datenschutz">Datenschutzerklärung</Link>.
      </p>
    </LegalLayout>
  );
}
