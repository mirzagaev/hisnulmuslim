import * as React from 'react';
import { Image, useWindowDimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Kategorie from '../screens/Kategorie';
import Info from '../screens/Info';
import Favoriten from '../screens/Favoriten';

function TabBar({ layout }) {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      id={undefined}
      initialRouteName='1'
      screenOptions={{
        tabBarPosition: layout.width > 769 ? 'left' : 'bottom',
        // tabBarShowLabel: layout.width < 769 ? false : true,
        animation: 'shift',
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        tabBarLabelStyle: { fontWeight: '600' },
        tabBarInactiveBackgroundColor: '#cccccc',
        tabBarStyle: {
          display: 'flex'
        }
      }}
    >
      <Tab.Screen
        name="favorit"
        component={Favoriten}
        options={{
          title: 'Favoriten',
          tabBarLabel: layout.width > 769 ? 'Favoriten' : '',
          tabBarShowLabel: true,
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/00fav-128x128.png')} style={{height:26, width:26}} />
          ),
          tabBarActiveBackgroundColor: '#f5b03b'
        }}
      />
      <Tab.Screen
        name="1"
        component={Kategorie}
        options={{
          title: 'Alltag',
          tabBarLabel: layout.width > 769 ? 'Alltag' : '',
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/01alltag-128x128.png')} style={{height:26, width:26}} />
          ),
          tabBarActiveBackgroundColor: '#3b4398'
        }}
      />
      <Tab.Screen
        name="2"
        component={Kategorie}
        options={{
          title: 'Gebet',
          tabBarLabel: layout.width > 769 ? 'Gebet' : '',
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/02gebet-128x128.png')} style={{height:26, width:26}} />
          ),
          tabBarActiveBackgroundColor: '#2f5f9d'
        }}
      />
      <Tab.Screen
        name="3"
        component={Kategorie}
        options={{
          title: 'Reisen',
          tabBarLabel: layout.width > 769 ? 'Reisen' : '',
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/03-reise-128x128.png')} style={{height:26, width:26}} />
          ),
          tabBarActiveBackgroundColor: '#168098'
        }}
      />
      <Tab.Screen
        name="4"
        component={Kategorie}
        options={{
          title: 'Schutz',
          tabBarLabel: layout.width > 769 ? 'Schutz' : '',
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/04-schutz-128x128.png')} style={{height:26, width:26}} />
          ),
          tabBarActiveBackgroundColor: '#30969b'
        }}
      />
      <Tab.Screen
        name="5"
        component={Kategorie}
        options={{
          title: "Notfälle / Tod",
          tabBarLabel: layout.width > 769 ? 'Notfälle / Tod' : '',
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/05-Notfaelle-128x128.png')} style={{height:26, width:26}} />
          ),
          tabBarActiveBackgroundColor: '#208e67'
        }}
      />
      <Tab.Screen
        name="6"
        component={Kategorie}
        options={{
          title: 'Befindlichkeit',
          tabBarLabel: layout.width > 769 ? 'Befindlichkeit' : '',
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/06-Befindlichkeit-128x128.png')} style={{height:26, width:26}} />
          ),
          tabBarActiveBackgroundColor: '#1e843b'
        }}
      />
      <Tab.Screen
        name="7"
        component={Kategorie}
        options={{
          title: 'Pilgerfahrt',
          tabBarLabel: layout.width > 769 ? 'Pilgerfahrt' : '',
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/07-Hadsh-umra-128x128.png')} style={{height:26, width:26}} />
          ),
          tabBarActiveBackgroundColor: '#147c1b'
        }}
      />
      {/* <Tab.Screen
        name="info"
        component={Info}
        options={{
          title: 'Hisnul Muslim',
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/HM-LOGO-weiss.png')} style={{height:26, width:26}} />
          ),
          tabBarActiveBackgroundColor: '#30609e'
        }}
      /> */}
    </Tab.Navigator>
  );
}

export default function Kategorien() {
  const layout = useWindowDimensions();
  // return layout.width < 769 ? <TopTabBar /> : <LeftTabBar layout={layout} />;
  return <TabBar layout={layout} />;
}