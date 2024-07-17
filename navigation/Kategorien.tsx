import React, { useState, useEffect } from 'react';
import { Image, useWindowDimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Kategorie from '../screens/Kategorie';
import { useDispatch, useSelector } from 'react-redux';
import { fetchKapiteln } from '../redux/slices/kapitelSlice';
import { fetchDuas } from '../redux/slices/duaSlice';
import { fetchThemen } from '../redux/slices/themaSlice';
import { AppDispatch, RootState } from '../redux/store';

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
        headerTintColor: '#3f66da',
        tabBarActiveBackgroundColor: 'white',
        tabBarInactiveBackgroundColor: 'white',
        tabBarLabelStyle: {
          fontSize: layout.width < 769 ? 10 : 15,
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          alignSelf: 'center',
        },
        tabBarStyle: {
          display: 'flex',
          flexWrap: 'wrap',
          borderTopColor: '#3f66da',
          borderTopWidth: layout.width < 769 ? 3 : 0,
        },
        tabBarItemStyle: {
          display: 'flex',
          flexWrap: layout.width < 769 ? 'wrap' : 'nowrap',
          flexDirection: layout.width < 769 ? 'column' : 'row',
          alignSelf: layout.width < 769 ? 'center' : 'flex-start',
          paddingVertical: 5,
        }
      }}
    >
      <Tab.Screen
        name="1"
        component={Kategorie}
        options={{
          title: 'Alltag',
          tabBarIcon: ({ focused }) => (
            focused ? <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-01_active.svg')} style={{height:34, width:34}} /> : <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-01.svg')} style={{height:34, width:34}} />
          )
        }}
      />
      <Tab.Screen
        name="2"
        component={Kategorie}
        options={{
          title: 'Gebet',
          tabBarIcon: ({ focused }) => (
            focused ? <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-02_active.svg')} style={{height:34, width:34}} /> : <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-02.svg')} style={{height:34, width:34}} />
          )
        }}
      />
      <Tab.Screen
        name="3"
        component={Kategorie}
        options={{
          title: 'Reisen',
          tabBarIcon: ({ focused }) => (
            focused ? <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-03_active.svg')} style={{height:34, width:34}} /> : <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-03.svg')} style={{height:34, width:34}} />
          )
        }}
      />
      <Tab.Screen
        name="4"
        component={Kategorie}
        options={{
          title: 'Schutz',
          tabBarIcon: ({ focused }) => (
            focused ? <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-04_active.svg')} style={{height:34, width:34}} /> : <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-04.svg')} style={{height:34, width:34}} />
          )
        }}
      />
      <Tab.Screen
        name="5"
        component={Kategorie}
        options={{
          title: "Hilfe",
          tabBarIcon: ({ focused }) => (
            focused ? <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-05_active.svg')} style={{height:34, width:34}} /> : <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-05.svg')} style={{height:34, width:34}} />
          )
        }}
      />
      <Tab.Screen
        name="6"
        component={Kategorie}
        options={{
          title: 'Trauer',
          tabBarIcon: ({ focused }) => (
            focused ? <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-06_active.svg')} style={{height:34, width:34}} /> : <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-06.svg')} style={{height:34, width:34}} />
          )
        }}
      />
      <Tab.Screen
        name="7"
        component={Kategorie}
        options={{
          title: 'Hajj',
          tabBarIcon: ({ focused }) => (
            focused ? <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-07_active.svg')} style={{height:34, width:34}} /> : <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-07.svg')} style={{height:34, width:34}} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

export default function Kategorien({ navigation }) {
  const dispatch = useDispatch<AppDispatch>();
  const kapiteln = useSelector((state: RootState) => state.kapiteln.kapiteln);
  const themen = useSelector((state: RootState) => state.themen.themen);
  const duas = useSelector((state: RootState) => state.duas.duas);

  useEffect(() => {
    dispatch(fetchKapiteln());
    dispatch(fetchThemen());
    dispatch(fetchDuas());
  }, []);

  const layout = useWindowDimensions();
  return <TabBar layout={layout} navigation={navigation} />;
}