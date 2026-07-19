import React, { useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterKapiteln, clearFilteredKapiteln } from '../redux/slices/kapitelSlice';
import { RootState } from '../redux/store';
import { NavigationContainer } from '@react-navigation/native'
import { Image, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Kategorien from './Kategorien';
import Info from '../screens/Info';
import Impressum from '../screens/Impressum';
import Datenschutz from '../screens/Datenschutz';
import Bittgebete from '../screens/Bittgebete';
import Favoriten from '../screens/Favoriten';
import NotFound from '../screens/NotFound';
import Suche from '../screens/Suche';
import { useColorScheme } from 'react-native';
import HeaderBrand from '../components/HeaderBrand';
import { ThemeContext } from '../theme/ThemeContext';
import tw from 'twrnc';

const config = {
    screens: {
        Kategorien: {
            path: '',
            screens: {
                home: '',
                '1': 'kategorien/1',
                '2': 'kategorien/2',
                '3': 'kategorien/3',
                '4': 'kategorien/4',
                '5': 'kategorien/5',
                '6': 'kategorien/6',
                '7': 'kategorien/7',
            },
        },
        Bittgebete: 'dua',
        Favoriten: 'favorites',
        Info: 'information',
        Impressum: 'impressum',
        Datenschutz: 'datenschutz',
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
    const duas = useSelector((state: RootState) => state.duas.duas);
    const [search, setSearch] = useState('');
    const colorScheme = useColorScheme() ?? 'light'; // <- global Dark/Light, system-gesteuert

    return (
        <ThemeContext.Provider value={colorScheme}>
            <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
                <Drawer.Navigator
                    id={undefined}
                    screenOptions={{
                        drawerStyle: colorScheme === "dark" ? tw`bg-neutral-700` : tw`bg-white`,
                        drawerLabelStyle: colorScheme === "dark" ? tw`text-gray-100` : tw`text-gray-900`,
                        drawerItemStyle: tw`rounded-[5px]`,
                        drawerActiveBackgroundColor: "transparent",
                        drawerType: 'front',
                        headerStyle: [
                            colorScheme === "dark" ? tw`bg-black` : tw`bg-white`,
                            tw`border-b-transparent`,
                        ],
                        overlayColor: "transparent",
                        headerTintColor: colorScheme === "dark" ? "#ffffff" : "#000000",   // Textfarbe
                        headerTitleAlign: 'center',
                        headerTitleStyle: colorScheme === "dark" ? tw`text-white` : tw`text-[#171717]`,
                    }}
                >
                    <Drawer.Screen
                        name="Kategorien"
                        component={search ? Suche : Kategorien}
                        listeners={({ navigation }) => ({
                            drawerItemPress: (e) => {
                                e.preventDefault();
                                setSearch('');
                                dispatch(clearFilteredKapiteln());
                                navigation.navigate('Kategorien', { screen: 'home' });
                            },
                        })}
                        options={({ navigation }) => {
                            useLayoutEffect(() => {
                                navigation.setOptions({
                                    headerSearchBarOptions: {
                                        placeholder: 'Hisnul Muslim durchsuchen',
                                        onChangeText: (event) => {
                                            const searchTerm = event.nativeEvent.text;
                                            setSearch(searchTerm);
                                            if (searchTerm.length >= 2) {
                                                dispatch(filterKapiteln({ searchTerm, duas })); // Redux-Store filtern
                                            } else {
                                                dispatch(clearFilteredKapiteln()); // Zurücksetzen, falls Eingabe leer ist
                                            }
                                        },
                                    },
                                });
                            }, [navigation, duas]);

                            return {
                                drawerIcon: ({ focused }) =>
                                    focused ? (
                                        <Image
                                            source={require('../assets/images/hm-logo-blau.png')}
                                            style={tw`w-[30px] h-[30px]`}
                                        />
                                    ) : (
                                        <Image
                                            source={require('../assets/images/hm-logo-grau.png')}
                                            style={tw`w-[30px] h-[30px]`}
                                        />
                                    ),
                                headerTitle: () => <HeaderBrand />,
                                drawerLabel: "Hisnul Muslim"
                            };
                        }}

                    />
                    <Drawer.Screen
                        name="Favoriten"
                        component={Favoriten}
                        options={{
                            drawerIcon: ({ focused }) => (
                            focused ? <Image source={require('../assets/icons/00-active.png')} style={tw`w-[30px] h-[30px]`} /> : <Image source={require('../assets/icons/00-inactive.png')} style={tw`w-[30px] h-[30px]`} />
                            ),
                        }}
                    />
                    <Drawer.Screen
                        name="Info über die App"
                        component={Info}
                        options={{
                            headerTitle: () => <HeaderBrand />,
                            drawerIcon: ({ focused }) => (
                            focused ? <Image source={require('../assets/icons/001-active.png')} style={tw`w-7 h-7`} /> : <Image source={require('../assets/icons/001-inactive.png')} style={tw`w-7 h-7`} />
                            ),
                        }}
                    />
                    <Drawer.Screen
                        name="Impressum"
                        component={Impressum}
                        options={{
                            headerTitle: "Impressum",
                            drawerLabel: "Impressum",
                        }}
                    />
                    <Drawer.Screen
                        name="Datenschutz"
                        component={Datenschutz}
                        options={{
                            headerTitle: "Datenschutzerklärung",
                            drawerLabel: "Datenschutzerklärung",
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
