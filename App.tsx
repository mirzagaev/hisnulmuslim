import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import Kategorie0 from './screens/Kategorie0';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" id={undefined}>
        <Drawer.Screen name="Hisnul Muslim" component={Home} />
        <Drawer.Screen name="Alltag" component={Kategorie0} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}