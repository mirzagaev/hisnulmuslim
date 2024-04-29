import * as React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Kategorie from './screens/Kategorie';
import Bittgebete from './screens/Bittgebete';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Hisnul Muslim',
  screens: {
    Home: {
      screen: Home,
      options: {
        title: 'Hisnul Muslim',
      },
    },
    Kategorie: {
      screen: Kategorie,
      options: {
        title: 'Kategorie: XY',
      },
    },
    Bittgebete: {
      screen: Bittgebete,
      options: {
        title: 'Bittgebete',
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}