import React from 'react';
import InfoScreen from '../components/InfoScreen';

const BODY = `1. Datenschutz auf einen Blick
Allgemeine Hinweise
Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.

Datenerfassung auf dieser Website
Wer ist verantwortlich für die Datenerfassung auf dieser Website? Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Die Kontaktdaten können Sie dem Impressum dieser Website entnehmen.

Wie erfassen wir Ihre Daten? Auf dieser Website werden keine personenbezogenen Daten aktiv erhoben. Wir nutzen keine Kontaktformulare, keine Registrierungsfunktionen und wir erfassen keine Analysedaten.

Wofür nutzen wir Ihre Daten? Da wir keine Daten erheben, findet keine Nutzung oder Analyse statt. Die Bereitstellung der Website dient rein informativen Zwecken.

2. Hosting und Server-Log-Files
Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Files, die Ihr Browser automatisch an uns übermittelt. Dies sind:

Browsertyp und Browserversion
verwendetes Betriebssystem
Referrer URL
Hostname des zugreifenden Rechners
Uhrzeit der Serveranfrage
IP-Adresse
Diese Daten sind technisch notwendig, um Ihnen unsere Website anzuzeigen und die Stabilität und Sicherheit zu gewährleisten. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Grundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. f DSGVO, der die Verarbeitung von Daten zur Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen sowie zur Wahrung berechtigter Interessen des Betreibers (fehlerfreier Betrieb der Website) gestattet.

3. Analyse-Tools und Werbung
Wir nutzen auf dieser Website keine Analyse-Tools (wie z. B. Google Analytics oder Matomo) und keine Werbe-Tracker. Ihr Besuch wird nicht statistisch ausgewertet.

4. Cookies
Unsere Website verwendet keine Cookies, die personenbezogene Daten speichern oder das Nutzerverhalten nachverfolgen. Es werden lediglich technisch notwendige Cookies eingesetzt, sofern diese für den Betrieb der TYPO3-Instanz zwingend erforderlich sind.

5. Ihre Rechte
Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Da wir jedoch keine Daten über Ihren Besuch hinaus speichern, liegen uns in der Regel keine Daten vor, die wir Ihnen beauskunften könnten. Sie haben außerdem ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.`;

const BOLD_LINES = [
  '1. Datenschutz auf einen Blick',
  'Allgemeine Hinweise',
  'Datenerfassung auf dieser Website',
  '2. Hosting und Server-Log-Files',
  '3. Analyse-Tools und Werbung',
  '4. Cookies',
  '5. Ihre Rechte',
];

export default function Datenschutz() {
  return <InfoScreen body={BODY} boldLines={BOLD_LINES} />;
}