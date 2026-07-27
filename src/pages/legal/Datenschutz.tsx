import { Link } from "react-router-dom";
import { LegalLayout } from "./LegalLayout";

export function Datenschutz() {
  return (
    <LegalLayout
      title="Datenschutzerklärung"
      intro="Wir nehmen den Schutz Ihrer personenbezogenen Daten ernst. Nachfolgend informieren wir Sie über die Verarbeitung Ihrer Daten im Zusammenhang mit dieser Website und unseren Leistungen."
      updated="Juli 2026"
    >
      <p className="muted">
        Hinweis: Diese Erklärung ist eine sorgfältig vorbereitete Vorlage. Bitte prüfen und ergänzen
        Sie die mit „[…]“ markierten Platzhalter (insb. Hosting-Anbieter und Adresse) sowie eine
        rechtliche Freigabe vor der Veröffentlichung.
      </p>

      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist:
        <br />
        <strong>Jamodo e.U.</strong>, Inhaber Matthias Lipp
        <br />
        [Straße und Hausnummer], [PLZ] [Ort], Österreich
        <br />
        E-Mail: <a href="mailto:kontakt@leadsystems.de">kontakt@leadsystems.de</a>
      </p>

      <h2>2. Rechtsgrundlagen</h2>
      <p>
        Wir verarbeiten personenbezogene Daten nur auf Grundlage der Datenschutz-Grundverordnung
        (DSGVO). Je nach Zweck stützen wir uns insbesondere auf Ihre Einwilligung (Art. 6 Abs. 1
        lit. a DSGVO), die Erfüllung eines Vertrags bzw. vorvertragliche Maßnahmen (lit. b), die
        Erfüllung rechtlicher Pflichten (lit. c) sowie unsere berechtigten Interessen an einem
        sicheren und funktionalen Webauftritt (lit. f).
      </p>

      <h2>3. Aufruf der Website &amp; Server-Logfiles</h2>
      <p>
        Beim Aufruf dieser Website werden durch den Hosting-Anbieter automatisch Informationen
        erfasst und in sogenannten Server-Logfiles gespeichert. Dies können sein: aufgerufene Seite,
        Datum und Uhrzeit, übertragene Datenmenge, Referrer-URL, verwendeter Browser und dessen
        Version, Betriebssystem sowie die (ggf. gekürzte) IP-Adresse.
      </p>
      <p>
        Diese Daten dienen der technischen Bereitstellung, Stabilität und Sicherheit der Website
        (Art. 6 Abs. 1 lit. f DSGVO). Hosting-Anbieter: [Hosting-Anbieter inkl. Anschrift]. Mit
        diesem Anbieter besteht ein Auftragsverarbeitungsvertrag gemäß Art. 28 DSGVO.
      </p>

      <h2>4. Schriftarten (Google Fonts &amp; Fontshare)</h2>
      <p>
        Zur einheitlichen Darstellung von Schriftarten binden wir Fonts der Anbieter Google Ireland
        Limited („Google Fonts“) sowie der Indian Type Foundry („Fontshare“) ein. Beim Aufruf einer
        Seite lädt Ihr Browser die benötigten Schriftarten von den Servern dieser Anbieter. Dabei
        wird Ihre IP-Adresse an den jeweiligen Anbieter übertragen; eine Übermittlung in Drittländer
        (u. a. USA) ist möglich. Rechtsgrundlage ist unser berechtigtes Interesse an einer
        ansprechenden Darstellung (Art. 6 Abs. 1 lit. f DSGVO).
      </p>
      <p className="muted">
        Hinweis: Für maximale Datensparsamkeit können die Schriftarten alternativ lokal (selbst
        gehostet) ausgeliefert werden. In diesem Fall entfällt die Übermittlung an Google/Fontshare.
      </p>

      <h2>5. Kontaktaufnahme</h2>
      <p>
        Wenn Sie uns per E-Mail kontaktieren (z. B. über den „Per E-Mail anfragen“-Button),
        verarbeiten wir die von Ihnen übermittelten Daten (z. B. Name, E-Mail-Adresse, Unternehmen,
        Inhalt der Anfrage) zur Bearbeitung Ihres Anliegens. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b
        DSGVO (vorvertragliche Maßnahmen) bzw. lit. f DSGVO. Ihre Anfrage speichern wir, solange dies
        zur Bearbeitung erforderlich ist bzw. gesetzliche Aufbewahrungspflichten bestehen.
      </p>

      <h2>6. Cookies &amp; Tracking</h2>
      <p>
        Diese Website verwendet keine Cookies zu Analyse- oder Marketingzwecken und bindet kein
        externes Tracking (z. B. Google Analytics, Meta-Pixel) ein. Es werden ausschließlich
        technisch notwendige Verarbeitungen durchgeführt. Sollte sich dies künftig ändern, holen wir
        – soweit erforderlich – vorab Ihre Einwilligung ein.
      </p>

      <h2>7. Verarbeitung im Rahmen unserer Leistungen (Kunden)</h2>
      <p>
        Erbringen wir für Kunden technische Leistungen rund um Lead-Erfassung, CRM-, Automatisierungs-
        und Kommunikationssysteme, verarbeiten wir personenbezogene Daten im Auftrag des jeweiligen
        Kunden. In diesem Fall ist der Kunde Verantwortlicher und wir handeln als
        Auftragsverarbeiter. Die Einzelheiten regelt unsere{" "}
        <Link to="/avv">Vereinbarung zur Auftragsverarbeitung (AVV) gemäß Art. 28 DSGVO</Link>.
      </p>

      <h2>8. Empfänger &amp; Auftragsverarbeiter</h2>
      <p>
        Zur Erbringung unserer Leistungen setzen wir sorgfältig ausgewählte Dienstleister ein, u. a.
        Hosting-/Infrastruktur-Anbieter, CRM- und Automatisierungsplattformen (z. B. HighLevel, n8n)
        sowie Kommunikationsdienste (z. B. Meta / WhatsApp Business Platform). Mit diesen bestehen
        Auftragsverarbeitungsverträge. Eine detaillierte Übersicht finden Sie in der{" "}
        <Link to="/avv">AVV, Anlage 3</Link>.
      </p>

      <h2>9. Datenübermittlung in Drittländer</h2>
      <p>
        Soweit Daten in Länder außerhalb der EU/des EWR übermittelt werden, erfolgt dies nur bei
        Vorliegen einer geeigneten Grundlage – etwa eines Angemessenheitsbeschlusses der
        EU-Kommission, der EU-Standardvertragsklauseln oder des EU-U.S. Data Privacy Framework
        (soweit der Anbieter zertifiziert ist) – sowie geeigneter zusätzlicher Schutzmaßnahmen.
      </p>

      <h2>10. Speicherdauer</h2>
      <p>
        Wir speichern personenbezogene Daten nur so lange, wie es für die jeweiligen Zwecke
        erforderlich ist oder gesetzliche Aufbewahrungspflichten dies vorsehen. Danach werden die
        Daten gelöscht oder anonymisiert.
      </p>

      <h2>11. Ihre Rechte</h2>
      <p>Sie haben nach der DSGVO insbesondere folgende Rechte:</p>
      <ul>
        <li>Auskunft über die zu Ihrer Person verarbeiteten Daten (Art. 15 DSGVO)</li>
        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
        <li>Löschung (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
        <li>Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)</li>
      </ul>
      <p>
        Zur Ausübung Ihrer Rechte genügt eine E-Mail an{" "}
        <a href="mailto:kontakt@leadsystems.de">kontakt@leadsystems.de</a>.
      </p>

      <h2>12. Beschwerderecht</h2>
      <p>
        Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. In Österreich
        ist dies die Österreichische Datenschutzbehörde,{" "}
        <a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer">
          dsb.gv.at
        </a>
        .
      </p>
    </LegalLayout>
  );
}
