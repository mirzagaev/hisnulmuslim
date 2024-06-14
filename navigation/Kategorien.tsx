import * as React from 'react';
import { Image, useWindowDimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Kategorie from '../screens/Kategorie';

function TopTabBar() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#ffffff'
        }
      }}
    >
      <Tab.Screen
        name="1"
        component={Kategorie}
        options={{
          title: "Alltag",
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/01alltag-128x128.png')} style={{height:26, width:26}} />
          ),
          // tabBarPressColor: '#ff0000',
        }}
      />
      <Tab.Screen
        name="2"
        component={Kategorie}
        options={{
          title: 'Gebet',
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/02gebet-128x128.png')} style={{height:26, width:26}} />
          ),
        }}
      />
      <Tab.Screen
        name="3"
        component={Kategorie}
        options={{
          title: 'Reisen',
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/03-reise-128x128.png')} style={{height:26, width:26}} />
            // <MaterialIcons name="card-travel" size={26} color="red" />
          ),
        }}
      />
      <Tab.Screen
        name="4"
        component={Kategorie}
        options={{
          title: 'Schutz',
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/04-schutz-128x128.png')} style={{height:26, width:26}} />
          ),
        }}
      />
      <Tab.Screen
        name="5"
        component={Kategorie}
        options={{
          title: "Notfälle / Tod",
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/05-Notfaelle-128x128.png')} style={{height:26, width:26}} />
          ),
        }}
      />
      <Tab.Screen
        name="6"
        component={Kategorie}
        options={{
          title: 'Befindlichkeit',
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/06-Befindlichkeit-128x128.png')} style={{height:26, width:26}} />
          ),
        }}
      />
      <Tab.Screen
        name="7"
        component={Kategorie}
        options={{
          title: 'Pilgerfahrt',
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/07-Hadsh-umra-128x128.png')} style={{height:26, width:26}} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function LeftTabBar({ layout }) {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={{
        tabBarPosition: 'left', // 'bottom'
        // tabBarShowLabel: layout.width < 800 ? false : true,
        headerShown: false
      }}
    >
      <Tab.Screen
        name="1"
        component={Kategorie}
        options={{
          title: 'Alltag',
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/01alltag-128x128.png')} style={{height:26, width:26}} />
          ),
        }}
      />
      <Tab.Screen
        name="2"
        component={Kategorie}
        options={{
          title: 'Gebet',
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/02gebet-128x128.png')} style={{height:26, width:26}} />
          ),
        }}
      />
      <Tab.Screen
        name="3"
        component={Kategorie}
        options={{
          title: 'Reisen',
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/03-reise-128x128.png')} style={{height:26, width:26}} />
            // <MaterialIcons name="card-travel" size={26} color="red" />
          ),
        }}
      />
      <Tab.Screen
        name="4"
        component={Kategorie}
        options={{
          title: 'Schutz',
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/04-schutz-128x128.png')} style={{height:26, width:26}} />
          ),
        }}
      />
      <Tab.Screen
        name="5"
        component={Kategorie}
        options={{
          title: "Notfälle / Tod",
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/05-Notfaelle-128x128.png')} style={{height:26, width:26}} />
          ),
        }}
      />
      <Tab.Screen
        name="6"
        component={Kategorie}
        options={{
          title: 'Befindlichkeit',
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/06-Befindlichkeit-128x128.png')} style={{height:26, width:26}} />
          ),
        }}
      />
      <Tab.Screen
        name="7"
        component={Kategorie}
        options={{
          title: 'Pilgerfahrt',
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/07-Hadsh-umra-128x128.png')} style={{height:26, width:26}} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Kategorien() {
  const layout = useWindowDimensions();
  return layout.width < 769 ? <TopTabBar /> : <LeftTabBar layout={layout} />;
}