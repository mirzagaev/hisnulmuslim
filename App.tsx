import React, { useEffect } from 'react';
import AppNavigation from './navigation/AppNavigation';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor, AppDispatch } from './redux/store';
import { fetchKapiteln } from './redux/slices/kapitelSlice';
import { fetchDuas } from './redux/slices/duaSlice';
import { fetchThemen } from './redux/slices/themaSlice';
import { purgeLegacyCache } from './services/api';
import { AppRegistry } from 'react-native';
import { expo as appData } from './app.json';
import * as Device from 'expo-device';
import * as ScreenOrientation from 'expo-screen-orientation';

// Lädt Kapitel/Themen/Bittgebete einmalig direkt beim App-Start, unabhängig davon,
// welcher Screen zuerst angezeigt wird - wichtig für Deep-Links wie
// "kategorie/alltag/4", die das Thema erst aus diesen Daten auflösen können,
// obwohl die Kategorien-Ansicht dabei nie gemountet wird.
function AppContent() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    purgeLegacyCache().finally(() => {
      dispatch(fetchKapiteln());
      dispatch(fetchThemen());
      dispatch(fetchDuas());
    });
  }, []);

  return <AppNavigation />;
}

export default function App() {
  useEffect(() => {
    // Smartphones sollen im Hochformat bleiben; Tablets dürfen weiterhin frei
    // rotieren (siehe die isWide-Layouts, die für breite/Querformat-Bildschirme gedacht sind).
    Device.getDeviceTypeAsync()
      .then((deviceType) => {
        if (deviceType === Device.DeviceType.PHONE) {
          return ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        }
      })
      .catch(() => {
        // z.B. Web-Plattform ohne natives Orientation-Modul - dann einfach nichts sperren
      });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
}

AppRegistry.registerComponent(appData.name, () => App);