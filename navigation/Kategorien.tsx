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
      <Ionicons name="search-outline" size={32} />
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
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        tabBarLabelStyle: {
          opacity: layout.width < 769 ? 0 : 100,
          fontWeight: '600',
          alignItems: 'center'
        },
        tabBarInactiveBackgroundColor: '#9da3b0',
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
        name="favorit"
        component={Favoriten}
        options={{
          title: 'Favoriten',
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/00fav-128x128.png')} style={{height:26, width:26}} />
          ),
          tabBarActiveBackgroundColor: '#f5b03b',
          tabBarBadge: '1',
        }}
      />
      <Tab.Screen
        name="1"
        component={Kategorie}
        options={{
          title: 'Alltag',
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/01alltag-128x128.png')} style={{height:26, width:26}} />
          ),
          tabBarActiveBackgroundColor: '#3b4398',
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
          tabBarActiveBackgroundColor: '#2f5f9d',
        }}
      />
      <Tab.Screen
        name="3"
        component={Kategorie}
        options={{
          title: 'Reisen',
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
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/07-Hadsh-umra-128x128.png')} style={{height:26, width:26}} />
          ),
          tabBarActiveBackgroundColor: '#147c1b'
        }}
      />
    </Tab.Navigator>
  );
}

export default function Kategorien({ navigation }) {
  const layout = useWindowDimensions();
  return <TabBar layout={layout} nav={navigation} />;
}