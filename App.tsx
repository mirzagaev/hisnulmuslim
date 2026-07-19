import React from 'react';
import AppNavigation from './navigation/AppNavigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { AppRegistry } from 'react-native';
import { expo as appData } from './app.json';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigation />
      </PersistGate>
    </Provider>
  );
}

AppRegistry.registerComponent(appData.name, () => App);