import React, { useState, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { filterKapiteln, clearFilteredKapiteln } from '../redux/slices/kapitelSlice';
import { NavigationContainer } from '@react-navigation/native'
import { Image, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Kategorien from './Kategorien';
import Info from '../screens/Info';
import Bittgebete from '../screens/Bittgebete';
import Favoriten from '../screens/Favoriten';
import NotFound from '../screens/NotFound';
import Suche from '../screens/Suche';
import tw from 'twrnc';

const config = {
    screens: {
        Home: {
            screens: {
                1: 'cat/1',
                2: 'cat/2',
                3: 'cat/3',
                4: 'cat/4',
                5: 'cat/5',
                6: 'cat/6',
                7: 'cat/7',
            },
        },
        Bittgebete: 'dua',
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

    return (
        <NavigationContainer
            // linking={linking}
            fallback={<Text>Loading...</Text>}
        >
            <Drawer.Navigator id={undefined}
                screenOptions={{
                    drawerItemStyle: {
                        borderRadius: 0
                    }
                }}
                initialRouteName="Hisnul Muslim"
            >
                <Drawer.Screen
                    name="Hisnul Muslim"
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
                                        source={require('../assets/images/logo.png')}
                                        style={{ height: 34, width: 34 }}
                                    />
                                ) : (
                                    <Image
                                        source={require('../assets/images/logo.png')}
                                        style={{ height: 34, width: 34 }}
                                    />
                                ),
                        };
                    }}

                />
                <Drawer.Screen
                    name="Info über die App"
                    component={Info}
                    options={{
                        drawerIcon: ({ focused }) => (
                          focused ? <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-15.svg')} style={{height:34, width:34}} /> : <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-15.svg')} style={{height:34, width:34}} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Favoriten"
                    component={Favoriten}
                    options={{
                        drawerIcon: ({ focused }) => (
                          focused ? <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-00_active.svg')} style={{height:34, width:34}} /> : <Image source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-00.svg')} style={{height:34, width:34}} />
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
    );
}

export default AppNavigation