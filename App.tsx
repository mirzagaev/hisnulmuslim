import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import Kategorie0 from './screens/Kategorie0';
import Kategorie1 from './screens/Kategorie1';
import Kategorie2 from './screens/Kategorie2';
import Kategorie3 from './screens/Kategorie3';
import Kategorie4 from './screens/Kategorie4';
import Kategorie5 from './screens/Kategorie5';
import Kategorie6 from './screens/Kategorie6';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home" id={undefined}>
      <Drawer.Screen name="Hisnul Muslim" component={Home} />
      <Drawer.Screen
        name="Kategorie0"
        component={Kategorie0}
        options={{ drawerLabel: 'Alltag' }}
      />
      {/* <Drawer.Screen name="Alltag" component={Kategorie0} /> */}
      <Drawer.Screen name="Gebet" component={Kategorie1} />
      <Drawer.Screen name="Reisen" component={Kategorie2} />
      <Drawer.Screen name="Schutz" component={Kategorie3} />
      <Drawer.Screen name="Notfälle / Tod" component={Kategorie4} />
      <Drawer.Screen name="Befindlichkeit" component={Kategorie5} />
      <Drawer.Screen name="Pilgerfahrt" component={Kategorie6} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}