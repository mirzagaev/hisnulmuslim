import * as React from 'react';
import { Image } from 'react-native';
import { View, useWindowDimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import Kategorie0 from '../screens/Tabs/Kategorie0';
import Kategorie1 from '../screens/Tabs/Kategorie1';
import Kategorie2 from '../screens/Tabs/Kategorie2';
import Kategorie3 from '../screens/Tabs/Kategorie3';
import Kategorie4 from '../screens/Tabs/Kategorie4';
import Kategorie5 from '../screens/Tabs/Kategorie5';
import Kategorie6 from '../screens/Tabs/Kategorie6';

export default function Kategorien() {
  // Attention, this is a BottomTab
  const layout = useWindowDimensions();
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={{
        tabBarPosition: layout.width < 600 ? 'bottom' : 'left',
        headerShown: false
      }}
    >
      <Tab.Screen
        name="Alltag"
        component={Kategorie0}
        options={{
          tabBarLabel: 'Alltag',
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/01alltag-128x128.png')} style={{height:26, width:26}} />
          ),
        }}
      />
      <Tab.Screen
        name="Gebet"
        component={Kategorie1}
        options={{
          tabBarLabel: 'Gebet',
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/02gebet-128x128.png')} style={{height:26, width:26}} />
          ),
        }}
      />
      <Tab.Screen
        name="Reisen"
        component={Kategorie2}
        options={{
          tabBarLabel: 'Reisen',
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/03-reise-128x128.png')} style={{height:26, width:26}} />
            // <MaterialIcons name="card-travel" size={26} color="red" />
          ),
        }}
      />
      <Tab.Screen
        name="Schutz"
        component={Kategorie3}
        options={{
          tabBarLabel: 'Schutz',
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/04-schutz-128x128.png')} style={{height:26, width:26}} />
          ),
        }}
      />
      <Tab.Screen
        name="NotfaelleTod"
        component={Kategorie4}
        options={{
          title: "Notfälle / Tod",
          tabBarLabel: 'Notfälle / Tod',
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/05-Notfaelle-128x128.png')} style={{height:26, width:26}} />
          ),
        }}
      />
      <Tab.Screen
        name="Befindlichkeit"
        component={Kategorie5}
        options={{
          tabBarLabel: 'Befindlichkeit',
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/06-Befindlichkeit-128x128.png')} style={{height:26, width:26}} />
          ),
        }}
      />
      <Tab.Screen
        name="Pilgerfahrt"
        component={Kategorie6}
        options={{
          tabBarLabel: 'Pilgerfahrt',
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/07-Hadsh-umra-128x128.png')} style={{height:26, width:26}} />
            // <MaterialCommunityIcons name="account" color="#30969b" size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}