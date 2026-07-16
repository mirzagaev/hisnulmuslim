import React from 'react';
import InfoScreen from '../components/InfoScreen';

const BODY = `Angaben gemäß § 5 TMG

Hisnul Muslim App
Musterstraße 1
70000 Stuttgart

Kontakt: kontakt@hisnulmuslim.de

(Platzhaltertext – bitte durch die tatsächlichen Angaben ersetzen.)`;

export default function Impressum() {
  return <InfoScreen body={BODY} />;
}
