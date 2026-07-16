import React from 'react';
import InfoScreen from '../components/InfoScreen';

const BODY = `Diese App speichert deine Einstellungen (z. B. Hell-/Dunkelmodus und Favoriten) ausschließlich lokal auf deinem Gerät. Es werden keine personenbezogenen Daten an Server übertragen.

(Platzhaltertext – bitte durch die tatsächliche Datenschutzerklärung ersetzen.)`;

export default function Datenschutz() {
  return <InfoScreen body={BODY} />;
}
