import React from 'react';
import InfoScreen from '../components/InfoScreen';

const BODY = `Angaben gemäß $ 5 TMG
Hisnul Muslim

Vertreten durch
Bach Iman, Mirzagayev Aydin, Wels Omar

Kontakt
Webseite: www.hisnulmuslim.de
E-Mail: info@hisnulmuslim.de 

Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
Bach Iman, Mirzagayev Aydin, Wels Omar

Haftungsausschluss (Disclaimer)
Haftung für Inhalte
Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.

Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.

Haftung für Links
Unser Angebot kann Verweise auf externe Webseiten Dritter enthalten, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.

Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Verweise umgehend entfernen.

Urheberrecht
Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.

Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.

Hinweis zur Datennutzung
Diese Webseite dient rein informativen Zwecken. Wir verkaufen keine Produkte, nehmen keine personenbezogenen Daten auf und führen keine Analysen (Tracking) des Nutzerverhaltens durch.

Irrtümer und Änderungen vorbehalten. Copyright © Hisnul Muslim `;

const BOLD_LINES = [
  'Angaben gemäß $ 5 TMG',
  'Vertreten durch',
  'Kontakt',
  'Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV',
  'Haftungsausschluss (Disclaimer)',
  'Haftung für Inhalte',
  'Haftung für Links',
  'Urheberrecht',
  'Hinweis zur Datennutzung',
];

export default function Impressum() {
  return <InfoScreen body={BODY} boldLines={BOLD_LINES} />;
}