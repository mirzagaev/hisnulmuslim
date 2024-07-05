import * as React from 'react';
import { TouchableHighlight, Button, Image, Text, useWindowDimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Kategorie from '../screens/Kategorie';
import Favoriten from '../screens/Favoriten';
import Ionicons from '@expo/vector-icons/Ionicons';

function LogoHM(props: any) {
  return (
    <TouchableHighlight onPress={() => props.nav.navigate("Info")}>
      <Image
        style={{ width: 32, height: 32 }}
        source={require('../assets/images/logo.png')}
      />
    </TouchableHighlight>
  );
}

function Suchbox(props: any) {
  return (
    <TouchableHighlight onPress={() => alert("Suche")}>
      <Image
        style={{ width: 32, height: 32 }}
        source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-14.svg')}
      />
      {/* <Ionicons name="search-outline" size={32} /> */}
    </TouchableHighlight>
  );
}

function TabBar({ layout, nav }) {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      id={undefined}
      initialRouteName='1'
      screenOptions={{
        tabBarPosition: layout.width > 769 ? 'left' : 'bottom',
        animation: 'shift',
        tabBarActiveTintColor: '#3f66da',
        headerShown: false,
        // headerTintColor: '#3f66da',
        tabBarActiveBackgroundColor: 'white',
        tabBarInactiveBackgroundColor: 'white',
        // tabBarInactiveTintColor: 'white',
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          // fontSize: 10,
          // fontWeight: '600',
          alignItems: 'center',
        },
        tabBarItemStyle: {
          padding: 5
        },
        // tabBarInactiveBackgroundColor: '#9da3b0',
        headerLeft: (props) => <LogoHM props={props} nav={nav} />,
        headerLeftContainerStyle: {
          paddingLeft: 20,
          paddingRight: 10
        },
        headerRight: (props) => <Suchbox props={props} nav={nav} />,
        headerRightContainerStyle: {
          paddingRight: 10
        }
      }}
    >
      <Tab.Screen
        name="1"
        component={Kategorie}
        options={{
          title: 'Alltag',
          tabBarIcon: ({ focused }) => (
            focused ? <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-01_active.svg')} style={{height:30, width:30}} /> : <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-01.svg')} style={{height:30, width:30}} />
          ),
          // tabBarActiveBackgroundColor: '#3b4398',
        }}
      />
      <Tab.Screen
        name="2"
        component={Kategorie}
        options={{
          title: 'Gebet',
          tabBarIcon: ({ focused }) => (
            focused ? <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-02_active.svg')} style={{height:30, width:30}} /> : <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-02.svg')} style={{height:30, width:30}} />
          ),
          // tabBarActiveBackgroundColor: '#2f5f9d',
        }}
      />
      <Tab.Screen
        name="3"
        component={Kategorie}
        options={{
          title: 'Reisen',
          tabBarIcon: ({ focused }) => (
            focused ? <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-03_active.svg')} style={{height:30, width:30}} /> : <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-03.svg')} style={{height:30, width:30}} />
          ),
          // tabBarActiveBackgroundColor: '#168098'
        }}
      />
      <Tab.Screen
        name="4"
        component={Kategorie}
        options={{
          title: 'Schutz',
          tabBarIcon: ({ focused }) => (
            focused ? <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-04_active.svg')} style={{height:30, width:30}} /> : <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-04.svg')} style={{height:30, width:30}} />
          ),
          // tabBarActiveBackgroundColor: '#30969b'
        }}
      />
      <Tab.Screen
        name="5"
        component={Kategorie}
        options={{
          title: "Hilfe",
          tabBarIcon: ({ focused }) => (
            focused ? <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-05_active.svg')} style={{height:30, width:30}} /> : <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-05.svg')} style={{height:30, width:30}} />
          ),
          // tabBarActiveBackgroundColor: '#208e67'
        }}
      />
      <Tab.Screen
        name="6"
        component={Kategorie}
        options={{
          title: 'Trauer',
          tabBarIcon: ({ focused }) => (
            focused ? <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-06_active.svg')} style={{height:30, width:30}} /> : <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-06.svg')} style={{height:30, width:30}} />
          ),
          // tabBarActiveBackgroundColor: '#1e843b'
        }}
      />
      <Tab.Screen
        name="7"
        component={Kategorie}
        options={{
          title: 'Hajj',
          tabBarIcon: ({ focused }) => (
            focused ? <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-07_active.svg')} style={{height:30, width:30}} /> : <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-07.svg')} style={{height:30, width:30}} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Kategorien({ navigation }) {
  const layout = useWindowDimensions();
  return <TabBar layout={layout} nav={navigation} />;
}