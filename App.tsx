import React, { useEffect } from 'react';
import AppNavigation from './navigation/AppNavigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { AppRegistry } from 'react-native';
import { expo as appData } from './app.json';
import * as Device from 'expo-device';
import * as ScreenOrientation from 'expo-screen-orientation';

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
        <AppNavigation />
      </PersistGate>
    </Provider>
  );
}

AppRegistry.registerComponent(appData.name, () => App);