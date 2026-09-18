import React from 'react';
import Startseite from '../screens/Startseite-mit-Favoriten';
import CategoryTabShell from './CategoryTabShell';

export default function Kategorien({ navigation }) {
  return <CategoryTabShell contentName="home" content={Startseite} navigation={navigation} />;
}
