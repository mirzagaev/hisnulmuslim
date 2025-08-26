import React, { useState, useLayoutEffect, createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { filterKapiteln, clearFilteredKapiteln } from '../redux/slices/kapitelSlice';
import { NavigationContainer } from '@react-navigation/native'
import { Image, Text, Alert, BackHandler } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Kategorien from './Kategorien';
import Info from '../screens/Info';
import Bittgebete from '../screens/Bittgebete';
import Favoriten from '../screens/Favoriten';
import NotFound from '../screens/NotFound';
import Suche from '../screens/Suche';
import { useColorScheme } from 'react-native';

// -------------------------
// Theme Context
// -------------------------
export const ThemeContext = createContext<"light" | "dark">("light");
export const useAppTheme = () => useContext(ThemeContext);

const config = {
    screens: {
        // Kategorien: {
        //     screens: {
        //         1: 'cat/1',
        //         2: 'cat/2',
        //         3: 'cat/3',
        //         4: 'cat/4',
        //         5: 'cat/5',
        //         6: 'cat/6',
        //         7: 'cat/7',
        //     },
        // },
        Kategorien: 'kategorien',
        Bittgebete: 'dua',
        Favoriten: 'favorites',
        Info: 'information',
        Suche: 'search',
        NotFound: '*',
    },
};

const linking = {
    prefixes: ['hisnulmuslim://', 'https://hisnulmuslim.de', 'https://*.hisnulmuslim.de'],
    config,
};

const AppNavigation = () => {
    const Drawer = createDrawerNavigator();
    const dispatch = useDispatch(); // Redux-Dispatch
    const [search, setSearch] = useState('');
    const colorScheme = useColorScheme(); // <- global Dark/Light

    return (
        <ThemeContext.Provider value={colorScheme ?? "light"}>
            <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
                <Drawer.Navigator
                    id={undefined}
                    screenOptions={{
                        drawerStyle: {
                            backgroundColor: colorScheme === "dark" ? "#404040" : "#ffffff", // bg-neutral-900 / white
                        },
                        drawerLabelStyle: {
                            color: colorScheme === "dark" ? "#f3f4f6" : "#111827", // text-gray-100 / gray-900
                        },
                        drawerItemStyle: { borderRadius: 5 },
                        drawerActiveBackgroundColor: "transparent",
                        drawerType: 'slide',
                        headerStyle: {
                            backgroundColor: colorScheme === "dark" ? "#171717" : "#ffffff", // bg-gray-900 / white
                        },
                        overlayColor: colorScheme === "dark" ? "#171717" : "#ffffff",
                        headerTintColor: colorScheme === "dark" ? "#ffffff" : "#000000",   // Textfarbe
                        headerTitleStyle: {
                            color: colorScheme === "dark" ? "#ffffff" : "#171717",
                        }
                    }}
                    // initialRouteName="Kategorien"
                    // backBehavior='order'
                >
                    <Drawer.Screen
                        name="Kategorien"
                        component={search ? Suche : Kategorien}
                        options={({ navigation }) => {
                            useLayoutEffect(() => {
                                navigation.setOptions({
                                    headerSearchBarOptions: {
                                        placeholder: 'Hisnul Muslim durchsuchen',
                                        onChangeText: (event) => {
                                            const searchTerm = event.nativeEvent.text;
                                            setSearch(searchTerm);
                                            if (searchTerm.length >= 2) {
                                                dispatch(filterKapiteln(searchTerm)); // Redux-Store filtern
                                            } else {
                                                dispatch(clearFilteredKapiteln()); // Zurücksetzen, falls Eingabe leer ist
                                            }
                                        },
                                    },
                                });
                            }, [navigation]);

                            return {
                                drawerIcon: ({ focused }) =>
                                    focused ? (
                                        <Image
                                            source={require('../assets/images/hm-logo-blau.png')}
                                            style={{ height: 30, width: 30 }}
                                        />
                                    ) : (
                                        <Image
                                            source={require('../assets/images/hm-logo-grau.png')}
                                            style={{ height: 30, width: 30 }}
                                        />
                                    ),
                                headerTitle: "Hisnul Muslim",
                                drawerLabel: "Hisnul Muslim"
                            };
                        }}

                    />
                    <Drawer.Screen
                        name="Favoriten"
                        component={Favoriten}
                        options={{
                            drawerIcon: ({ focused }) => (
                            focused ? <Image source={require('../assets/icons/00-active.png')} style={{height:30, width:30}} /> : <Image source={require('../assets/icons/00-inactive.png')} style={{height:30, width:30}} />
                            ),
                        }}
                    />
                    <Drawer.Screen
                        name="Info über die App"
                        component={Info}
                        options={{
                            headerTitle: "Hisnul Muslim",
                            drawerIcon: ({ focused }) => (
                            focused ? <Image source={require('../assets/icons/001-active.png')} style={{height:28, width:28}} /> : <Image source={require('../assets/icons/001-inactive.png')} style={{height:28, width:28}} />
                            ),
                        }}
                    />
                    <Drawer.Screen
                        name="Bittgebete"
                        component={Bittgebete}
                        options={{
                            title: 'Bittgebete',
                            drawerItemStyle: {
                                display: 'none'
                            }
                        }}
                    />
                    <Drawer.Screen
                        name="NotFound"
                        component={NotFound}
                        options={{
                            title: 'Seite nicht gefunden',
                            drawerItemStyle: {
                                display: 'none'
                            }
                        }}
                    />
                    <Drawer.Screen
                        name="Suche"
                        component={Suche}
                        options={{
                            title: 'Suche',
                            drawerItemStyle: {
                                display: 'none'
                            }
                        }}
                    />
                </Drawer.Navigator>
            </NavigationContainer>
        </ThemeContext.Provider>
    );
}

export default AppNavigation