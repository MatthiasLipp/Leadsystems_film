import { Link } from "react-router-dom";
import { LegalLayout } from "./LegalLayout";

export function AGB() {
  return (
    <LegalLayout
      title="Allgemeine Geschäftsbedingungen"
      intro="Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge und Leistungen zwischen Jamodo e.U. und ihren Kunden im Zusammenhang mit Leadsystems."
      updated="Juli 2026"
    >
      <p className="muted">
        Hinweis: Diese AGB sind eine Arbeitsfassung und vor produktiver Nutzung rechtlich zu prüfen
        sowie an Ihre konkreten Leistungen und Preise anzupassen.
      </p>

      <h2>1. Geltungsbereich</h2>
      <p>
        Diese AGB gelten für sämtliche Angebote, Verträge und Leistungen der Jamodo e.U.
        („Auftragnehmer“) gegenüber ihren Kunden („Auftraggeber“) im Bereich Lead-Erfassung, CRM-,
        Automatisierungs- und Kommunikationssysteme sowie damit verbundener Beratung und Betreuung.
        Abweichende Bedingungen des Auftraggebers werden nur wirksam, wenn wir ihnen ausdrücklich
        schriftlich zustimmen.
      </p>

      <h2>2. Vertragsgegenstand &amp; Leistungen</h2>
      <p>
        Gegenstand ist die technische Einrichtung, der Betrieb, die Betreuung und Optimierung von
        Systemen zur Erfassung, Qualifizierung, Verarbeitung und Nachbearbeitung von Leads sowie
        damit verbundene Automatisierungs- und Kommunikations-Workflows (z. B. WhatsApp, E-Mail). Der
        konkrete Leistungsumfang ergibt sich aus dem jeweiligen Angebot, der Bestellung oder dem
        Leistungsauftrag.
      </p>

      <h2>3. Vertragsabschluss</h2>
      <p>
        Unsere Angebote sind freibleibend. Ein Vertrag kommt durch schriftliche Auftragsbestätigung,
        Gegenzeichnung eines Angebots oder Beginn der Leistungserbringung zustande.
      </p>

      <h2>4. Mitwirkungspflichten des Auftraggebers</h2>
      <p>
        Der Auftraggeber stellt rechtzeitig alle für die Leistungserbringung erforderlichen
        Informationen, Zugänge, Inhalte und Freigaben bereit. Er ist insbesondere verantwortlich für
        die Rechtmäßigkeit der Datenerhebung, die Information betroffener Personen sowie die Freigabe
        genutzter Nummern, Accounts, Vorlagen und Nachrichteninhalte.
      </p>

      <h2>5. Preise &amp; Zahlungsbedingungen</h2>
      <p>
        Es gelten die im Angebot vereinbarten Preise. Sofern nicht anders vereinbart, verstehen sich
        Preise zzgl. gesetzlicher Umsatzsteuer. Rechnungen sind innerhalb von [14] Tagen ab
        Rechnungsdatum ohne Abzug zur Zahlung fällig. [Weitere Zahlungs- und Abrechnungsmodalitäten
        ergänzen.]
      </p>

      <h2>6. Laufzeit &amp; Kündigung</h2>
      <p>
        Laufzeit und Kündigungsfristen ergeben sich aus der jeweiligen Vereinbarung. Das Recht zur
        außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt. [Konkrete Laufzeit- und
        Kündigungsregelungen ergänzen.]
      </p>

      <h2>7. Nutzungsrechte</h2>
      <p>
        An eigens für den Auftraggeber erstellten Konfigurationen und Workflows erhält der
        Auftraggeber für die Vertragsdauer ein einfaches, nicht übertragbares Nutzungsrecht im
        vereinbarten Umfang. An Standardkomponenten, Vorlagen und Know-how des Auftragnehmers
        verbleiben sämtliche Rechte beim Auftragnehmer.
      </p>

      <h2>8. Verfügbarkeit &amp; Drittanbieter</h2>
      <p>
        Wesentliche Teile der Leistungen werden über Drittanbieter-Plattformen (z. B. HighLevel, n8n,
        Meta / WhatsApp Business Platform) erbracht. Für deren Verfügbarkeit, Bedingungen und
        Änderungen übernimmt der Auftragnehmer keine Gewähr, soweit diese außerhalb seines
        Einflussbereichs liegen.
      </p>

      <h2>9. Gewährleistung &amp; Haftung</h2>
      <p>
        Der Auftragnehmer erbringt seine Leistungen fachgerecht. Er haftet nach den gesetzlichen
        Bestimmungen für Vorsatz und grobe Fahrlässigkeit. Bei leichter Fahrlässigkeit haftet er nur
        bei Verletzung wesentlicher Vertragspflichten und begrenzt auf den vertragstypischen,
        vorhersehbaren Schaden. Für die Rechtmäßigkeit der Datenerhebung, eingeholte Einwilligungen,
        Inhalte freigegebener Nachrichten sowie die geschäftliche Nutzung der Leads durch den
        Auftraggeber haftet der Auftragnehmer nicht.
      </p>

      <h2>10. Datenschutz</h2>
      <p>
        Die Verarbeitung personenbezogener Daten im Auftrag des Auftraggebers regelt die{" "}
        Vereinbarung zur Auftragsverarbeitung (AVV) gemäß Art. 28 DSGVO.
        Informationen zur Verarbeitung auf dieser Website enthält die{" "}
        <Link to="/datenschutz">Datenschutzerklärung</Link>.
      </p>

      <h2>11. Vertraulichkeit</h2>
      <p>
        Beide Parteien behandeln vertrauliche Informationen der jeweils anderen Partei vertraulich.
        Diese Verpflichtung besteht auch nach Beendigung der Zusammenarbeit fort.
      </p>

      <h2>12. Schlussbestimmungen</h2>
      <p>
        Änderungen und Ergänzungen bedürfen der Textform. Sollten einzelne Bestimmungen unwirksam
        sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. Es gilt das Recht der
        Republik Österreich unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist, soweit gesetzlich
        zulässig, [zuständiges Gericht / Sitz des Auftragnehmers].
      </p>
    </LegalLayout>
  );
}
