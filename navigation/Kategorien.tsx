import React, { useEffect } from 'react';
import { View, Text, Image, useWindowDimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Kategorie from '../screens/Kategorie';
import { PlatformPressable } from '@react-navigation/elements';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchKapiteln } from '../redux/slices/kapitelSlice';
import { fetchDuas } from '../redux/slices/duaSlice';
import { fetchThemen } from '../redux/slices/themaSlice';
import { AppDispatch } from '../redux/store';
import tw from 'twrnc';
import { tabBarStruktur } from "../interfaces/KapitelSchema"

function MyTabBar({ state, descriptors, navigation, layout }) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <View style={[
      tw`flex bg-white shadow-lg shadow-gray-900`,
      layout.width < 769 ? tw`flex-row` : tw`flex-col`,
    ]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              tw`flex items-center font-semibold `,
              layout.width < 769 ? tw`flex-1` : tw`p-1 m-2 rounded-lg`,
              (layout.width > 769 && (isFocused ? tw`bg-gray-100` : tw`hover:bg-gray-100`)),
              (layout.width < 769 && tw`py-2 border-t-4`),
              (layout.width < 769 && (isFocused ? {borderTopColor: tabBarStruktur[route.name].colorItem} : {borderTopColor: "#ffffff"}))
            ]}
          >

            {isFocused ?
              <Image source={tabBarStruktur[route.name].iconActive} style={layout.width < 400 ? {height:30, width:30} : {height:34, width:34}} />
              :
              <Image source={tabBarStruktur[route.name].icon} style={layout.width < 400 ? {width:30, height:30} : {height:34, width:34}} />
            }

            <Text style={[
              tw`uppercase`,
              (layout.width > 769 ? tw`text-md` : tw`text-xs`),
              { color: isFocused ? tabBarStruktur[route.name].colorItem : "#bcbcbc", fontWeight: 400, paddingTop: 3 }
              ]}>
              {tabBarStruktur[route.name].label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
}

function TabBar({ layout, navigation }) {
  const Tab = createBottomTabNavigator();
  
  return (
    <Tab.Navigator
      id={undefined}
      initialRouteName='1'
      screenOptions={({ route }) => ({
        animation: 'shift',
        tabBarActiveTintColor: '#3f66da',
        tabBarPosition: layout.width < 769 ? 'bottom' : 'left',
        headerShown: false,
        headerTitleStyle: {
          paddingHorizontal: 0,
          fontSize: 20
        },
        headerStyle: {
          borderBottomColor: tabBarStruktur[route.name].colorItem,
          borderBottomWidth: 3,
        },
      })}
      tabBar={(props) => <MyTabBar {...props} layout={layout} />}
    >    
      <Tab.Screen name="1" component={Kategorie} options={{
        title: 'Alltag',
        headerTintColor: tabBarStruktur["1"].colorItem,
      }} />
      <Tab.Screen name="2" component={Kategorie} options={{title: 'Gebet',
        headerTintColor: tabBarStruktur["2"].colorItem,
      }} />
      <Tab.Screen name="3" component={Kategorie} options={{title: 'Reisen',
        headerTintColor: tabBarStruktur["3"].colorItem,
      }} />
      <Tab.Screen name="4" component={Kategorie} options={{title: 'Schutz',
        headerTintColor: tabBarStruktur["4"].colorItem,
      }} />
      <Tab.Screen name="5" component={Kategorie} options={{title: '1. Hilfe',
        headerTintColor: tabBarStruktur["5"].colorItem,
      }} />
      <Tab.Screen name="6" component={Kategorie} options={{title: 'Trauer',
        headerTintColor: tabBarStruktur["6"].colorItem,
      }} />
      <Tab.Screen name="7" component={Kategorie} options={{title: 'Pilgern',
        headerTintColor: tabBarStruktur["7"].colorItem,
      }} />
    </Tab.Navigator>
  );
  //       tabBarPosition: layout.width > 769 ? 'left' : 'bottom',
  //       animation: 'shift',
  //       tabBarActiveTintColor: '#3f66da',
  //       headerShown: false,
  //       headerTintColor: '#3f66da',
  //       tabBarActiveBackgroundColor: 'white',
  //       tabBarInactiveBackgroundColor: 'white',
  //       tabBarLabelStyle: {
  //         fontSize: layout.width < 769 ? 10 : 15,
  //         display: 'flex',
  //         flexWrap: 'wrap',
  //         flexDirection: 'row',
  //         alignSelf: 'center',
  //         paddingBottom: 0
  //       },
  //       tabBarStyle: {
  //         display: 'flex',
  //         flexWrap: 'wrap',
  //         borderTopColor: '#0ccaca',
  //         borderTopWidth: layout.width < 769 ? 5 : 0,
  //         paddingVertical: 20,
  //         marginBottom: 20,
  //         // height: layout.width < 769 ? 80 : "auto",
  //         // margin: 0,
  //         // padding: 0,
  //       },
  //       tabBarIconStyle:{
  //         marginBottom: layout.width < 769 ? 5 : 0,
  //         // borderBottomColor: '#2483d3',
  //         // borderBottomWidth: layout.width < 769 ? 2 : 0,
  //         marginVertical: 10,
  //       },
  //       tabBarItemStyle: {
  //         display: 'flex',
  //         paddingBottom: 10,
  //         flexWrap: layout.width < 769 ? 'wrap' : 'nowrap',
  //         flexDirection: layout.width < 769 ? 'column' : 'row',
  //         alignSelf: layout.width < 769 ? 'center' : 'flex-start',
  //       },
  //     })}
  //   >
  //     <Tab.Screen
  //       name="1"
  //       component={Kategorie}
  //       options={{
  //         // tabBarActiveBackgroundColor: '#0ccaca',
  //         title: 'ALLTAG',
  //         tabBarIcon: ({ focused }) => (
  //           focused ? <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-01_active.svg')} style={{height:34, width:34}} /> : <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-01.svg')} style={{height:34, width:34}} />
  //         ),
  //       }}
  //     />
  //     <Tab.Screen
  //       name="2"
  //       component={Kategorie}
  //       options={{
  //         // tabBarActiveBackgroundColor: '#2483d3',
  //         title: 'GEBET',
  //         tabBarIcon: ({ focused }) => (
  //           focused ? <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-02_active.svg')} style={{height:34, width:34}} /> : <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-02.svg')} style={{height:34, width:34}} />
  //         )
  //       }}
  //     />
  //     <Tab.Screen
  //       name="3"
  //       component={Kategorie}
  //       options={{
  //         title: 'REISEN',
  //         tabBarIcon: ({ focused }) => (
  //           focused ? <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-03_active.svg')} style={{height:34, width:34}} /> : <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-03.svg')} style={{height:34, width:34}} />
  //         )
  //       }}
  //     />
  //     <Tab.Screen
  //       name="4"
  //       component={Kategorie}
  //       options={{
  //         title: 'SCHUTZ',
  //         tabBarIcon: ({ focused }) => (
  //           focused ? <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-04_active.svg')} style={{height:34, width:34}} /> : <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-04.svg')} style={{height:34, width:34}} />
  //         )
  //       }}
  //     />
  //     <Tab.Screen
  //       name="5"
  //       component={Kategorie}
  //       options={{
  //         title: "1. HILFE",
  //         tabBarIcon: ({ focused }) => (
  //           focused ? <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-05_active.svg')} style={{height:34, width:34}} /> : <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-05.svg')} style={{height:34, width:34}} />
  //         )
  //       }}
  //     />
  //     <Tab.Screen
  //       name="6"
  //       component={Kategorie}
  //       options={{
  //         title: 'TRAUER',
  //         tabBarIcon: ({ focused }) => (
  //           focused ? <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-06_active.svg')} style={{height:34, width:34}} /> : <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-06.svg')} style={{height:34, width:34}} />
  //         )
  //       }}
  //     />
  //     <Tab.Screen
  //       name="7"
  //       component={Kategorie}
  //       options={{
  //         title: 'PILGERN',
  //         tabBarIcon: ({ focused }) => (
  //           focused ? <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-07_active.svg')} style={{height:34, width:34}} /> : <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-07.svg')} style={{height:34, width:34}} />
  //         )
  //       }}
  //     />
  //   </Tab.Navigator>
  // );
}

export default function Kategorien({ navigation }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchKapiteln());
    dispatch(fetchThemen());
    dispatch(fetchDuas());
  }, []);

  const layout = useWindowDimensions();
  return <TabBar layout={layout} navigation={navigation} />;
}