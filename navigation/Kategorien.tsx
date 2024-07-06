import * as React from 'react';
import { Image, useWindowDimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Kategorie from '../screens/Kategorie';

function TabBar({ layout, navigation }) {
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
        tabBarShowLabel: false,
        tabBarLabelStyle: {
          // opacity: layout.width < 769 ? 0 : 100,
          fontSize: 15,
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          alignSelf: 'flex-start'
          // fontWeight: '600',
          // display: 'none' 
          // alignItems: 'flex-start',
        },
        tabBarStyle: {
          borderColor: '#3f66da',
          borderTopWidth: layout.width < 769 ? 2 : 0,
          borderRightWidth: layout.width > 769 ? 2 : 0,
          shadowColor: 'gray',
          shadowRadius: 10,
          shadowOpacity: 50,
        },
        tabBarItemStyle: {
          display: 'flex',
          flexDirection: 'column',
          alignSelf: 'center'
        },
        // tabBarInactiveBackgroundColor: '#9da3b0',
        // headerLeft: (props) => <LogoHM props={props} nav={nav} />,
        // headerLeftContainerStyle: {
        //   paddingLeft: 20,
        //   paddingRight: 10
        // }
      }}
    >
      <Tab.Screen
        name="1"
        component={Kategorie}
        options={{
          title: 'Alltag',
          tabBarIcon: ({ focused }) => (
            focused ? <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-01_active.svg')} style={{height:34, width:34}} /> : <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-01.svg')} style={{height:34, width:34}} />
          ),
          // tabBarLabel({ focused }) {
          //   return focused ? "Alltag" : "";
          // },
        }}
      />
      <Tab.Screen
        name="2"
        component={Kategorie}
        options={{
          title: 'Gebet',
          tabBarIcon: ({ focused }) => (
            focused ? <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-02_active.svg')} style={{height:34, width:34}} /> : <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-02.svg')} style={{height:34, width:34}} />
          ),
          // tabBarLabel({ focused }) {
          //   return focused ? "Gebet" : "";
          // },
        }}
      />
      <Tab.Screen
        name="3"
        component={Kategorie}
        options={{
          title: 'Reisen',
          tabBarIcon: ({ focused }) => (
            focused ? <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-03_active.svg')} style={{height:34, width:34}} /> : <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-03.svg')} style={{height:34, width:34}} />
          ),
          // tabBarLabel({ focused }) {
          //   return focused ? "Reisen" : "";
          // },
        }}
      />
      <Tab.Screen
        name="4"
        component={Kategorie}
        options={{
          title: 'Schutz',
          tabBarIcon: ({ focused }) => (
            focused ? <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-04_active.svg')} style={{height:34, width:34}} /> : <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-04.svg')} style={{height:34, width:34}} />
          ),
          // tabBarLabel({ focused }) {
          //   return focused ? "Schutz" : "";
          // },
        }}
      />
      <Tab.Screen
        name="5"
        component={Kategorie}
        options={{
          title: "Hilfe",
          tabBarIcon: ({ focused }) => (
            focused ? <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-05_active.svg')} style={{height:34, width:34}} /> : <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-05.svg')} style={{height:34, width:34}} />
          ),
          // tabBarLabel({ focused }) {
          //   return focused ? "Hilfe" : "";
          // },
        }}
      />
      <Tab.Screen
        name="6"
        component={Kategorie}
        options={{
          title: 'Trauer',
          tabBarIcon: ({ focused }) => (
            focused ? <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-06_active.svg')} style={{height:34, width:34}} /> : <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-06.svg')} style={{height:34, width:34}} />
          ),
          // tabBarLabel({ focused }) {
          //   return focused ? "Trauer" : "";
          // },
        }}
      />
      <Tab.Screen
        name="7"
        component={Kategorie}
        options={{
          title: 'Pilgerfahrt',
          tabBarIcon: ({ focused }) => (
            focused ? <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-07_active.svg')} style={{height:34, width:34}} /> : <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-07.svg')} style={{height:34, width:34}} />
          ),
          // tabBarLabel({ focused }) {
          //   return focused ? "Hajj" : "";
          // },
        }}
      />
    </Tab.Navigator>
  );
}


function renderSwitch(param) {
  switch(param) {
    case "1":
      return 'Alltag';
    case "2":
      return 'Gebet';
    case "3":
      return 'Reisen';
    case "4":
      return 'Schutz';
    case "5":
      return 'Hilfe';
    case "6":
      return 'Trauer';
    case "7":
      return 'Pilgerfahrt';
    default:
      return 'Nicht gefunden';
  }
}

export default function Kategorien({ navigation }) {
  // const [catId, setCatId] = React.useState<any>();
  // const [cat, setCat] = React.useState<any>();
  
  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', (e) => {
  //     const cState: number = navigation.getState().index;
  //     const cRoute: any = navigation.getState().routes[cState];
  //     setCatId(cRoute.name);
  //     console.log(navigation);
  //     // setCat(renderSwitch(cRoute.name));
  //     navigation.setOptions({ title: renderSwitch(cRoute.name) });
  //   });
  
  //   return unsubscribe;
  // }, [catId, navigation]);

  // navigation.setOptions({ title: "Ayyd 2" });

  const layout = useWindowDimensions();
  return <TabBar layout={layout} navigation={navigation} />;
}