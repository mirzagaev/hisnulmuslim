import React, { useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterKapiteln, clearFilteredKapiteln } from '../redux/slices/kapitelSlice';
import { RootState } from '../redux/store';
import { NavigationContainer } from '@react-navigation/native'
import { Image, Text, View } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Kategorien from './Kategorien';
import CategoryTabShell from './CategoryTabShell';
import Info from '../screens/Info';
import Impressum from '../screens/Impressum';
import Datenschutz from '../screens/Datenschutz';
import Bittgebete from '../screens/Bittgebete';
import Favoriten from '../screens/Favoriten';
import Transkript from '../screens/Transkript';
import NotFound from '../screens/NotFound';
import Suche from '../screens/Suche';
import { useColorScheme } from 'react-native';
import HeaderBrand from '../components/HeaderBrand';
import VectorIcon from '../components/icons/VectorIcon';
import { ThemeContext } from '../theme/ThemeContext';
import { CATEGORY_SLUGS } from '../interfaces/KapitelSchema';
import tw from 'twrnc';

const config = {
    screens: {
        Root: {
            path: '',
            screens: {
                Kategorien: {
                    path: '',
                    screens: {
                        home: '',
                        '1': `kategorie/${CATEGORY_SLUGS['1']}`,
                        '2': `kategorie/${CATEGORY_SLUGS['2']}`,
                        '3': `kategorie/${CATEGORY_SLUGS['3']}`,
                        '4': `kategorie/${CATEGORY_SLUGS['4']}`,
                        '5': `kategorie/${CATEGORY_SLUGS['5']}`,
                        '6': `kategorie/${CATEGORY_SLUGS['6']}`,
                        '7': `kategorie/${CATEGORY_SLUGS['7']}`,
                    },
                },
                Favoriten: 'favorites',
                Transkript: 'transkript',
                Info: 'information',
                Impressum: 'impressum',
                Datenschutz: 'datenschutz',
                Suche: 'search',
            },
        },
        Bittgebete: {
            path: 'kategorie/:catSlug/:themaId',
            parse: {
                themaId: (themaId: string) => Number(themaId),
            },
        },
        NotFound: '*',
    },
};

const linking = {
    prefixes: ['hisnulmuslim://', 'https://hisnulmuslim.de', 'https://*.hisnulmuslim.de'],
    config,
};

function DrawerNavigator() {
    const Drawer = createDrawerNavigator();
    const dispatch = useDispatch(); // Redux-Dispatch
    const duas = useSelector((state: RootState) => state.duas.duas);
    const [search, setSearch] = useState('');
    const colorScheme = useColorScheme() ?? 'light'; // <- global Dark/Light, system-gesteuert

    // Impressum & Datenschutz werden aus der scrollbaren Liste ausgeblendet
    // (siehe drawerItemStyle: { display: 'none' } weiter unten) und stattdessen
    // hier unterhalb der ScrollView fest ("fixiert") am unteren Rand gerendert.
    const renderDrawerContent = (props: any) => (
        <View style={tw`flex-1`}>
            <DrawerContentScrollView {...props}>
                <Text
                    style={[
                        tw`text-xl font-bold px-4 pb-6 pt-3`,
                        colorScheme === "dark" ? tw`text-white` : tw`text-[#171717]`,
                    ]}
                >
                    Hisnul Muslim
                </Text>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View
                style={[
                    tw`border-t px-2`,
                    colorScheme === "dark"
                        ? tw`border-neutral-800 bg-neutral-900`
                        : tw`border-gray-100 bg-white`,
                ]}
            >
                <DrawerItem
                    label="Impressum"
                    labelStyle={colorScheme === "dark" ? tw`text-gray-100` : tw`text-gray-900`}
                    onPress={() => props.navigation.navigate('Impressum')}
                />
                <DrawerItem
                    label="Datenschutzerklärung"
                    labelStyle={colorScheme === "dark" ? tw`text-gray-100` : tw`text-gray-900`}
                    onPress={() => props.navigation.navigate('Datenschutz')}
                />
            </View>
        </View>
    );

    return (
        <Drawer.Navigator
            id={undefined}
            drawerContent={renderDrawerContent}
            screenOptions={{
                drawerStyle: [
                    colorScheme === "dark" ? tw`bg-neutral-900` : tw`bg-white shadow-xl`,
                    { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
                ],
                drawerLabelStyle: colorScheme === "dark" ? tw`text-gray-100` : tw`text-gray-900`,
                drawerActiveBackgroundColor: "transparent",
                drawerType: 'front',
                headerStyle: [
                    colorScheme === "dark" ? tw`bg-black` : tw`bg-white`,
                    tw`border-b-transparent`,
                ],
                overlayColor: "transparent",
                headerTintColor: colorScheme === "dark" ? "#ffffff" : "#000000",   // Textfarbe
                headerTitleStyle: colorScheme === "dark" ? tw`text-white` : tw`text-[#171717]`,
            }}
        >
            <Drawer.Screen
                name="Kategorien"
                children={(props) =>
                    search
                        ? <CategoryTabShell contentName="Suche" content={Suche} navigation={props.navigation} />
                        : <Kategorien {...props} />
                }
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
                                // Setzt den Anfangstext der (unkontrollierten) Sucheingabe.
                                // Greift, sobald die Suchleiste neu gemountet wird (z. B. nach
                                // Zurückkommen von einem Bittgebet), damit man dort weitermachen
                                // kann, ohne den Suchbegriff erneut einzutippen.
                                ...({ defaultValue: search } as object),
                                onChangeText: (event) => {
                                    const searchTerm = event.nativeEvent.text;
                                    // Beim Navigieren zu einem anderen Screen (z. B. Bittgebete)
                                    // löscht die native Suchleiste ihren Text automatisch, was
                                    // hier sonst die Suchergebnisse im Hintergrund zurücksetzen würde.
                                    if (searchTerm === '' && !navigation.isFocused()) {
                                        return;
                                    }
                                    setSearch(searchTerm);
                                    if (searchTerm.length >= 2) {
                                        dispatch(filterKapiteln({ searchTerm, duas })); // Redux-Store filtern
                                    } else {
                                        dispatch(clearFilteredKapiteln()); // Zurücksetzen, falls Eingabe leer ist
                                    }
                                },
                            },
                        });
                    }, [navigation, duas, search]);

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
                        headerTitle: () => (
                            <HeaderBrand
                                href="/"
                                onPress={() => {
                                    setSearch('');
                                    dispatch(clearFilteredKapiteln());
                                    navigation.navigate('Kategorien', { screen: 'home' });
                                }}
                            />
                        ),
                        headerTitleAlign: 'left',
                        drawerLabel: "Themenübersicht"
                    };
                }}

            />
            <Drawer.Screen
                name="Favoriten"
                children={(props) => <CategoryTabShell contentName="Favoriten" content={Favoriten} navigation={props.navigation} />}
                options={{
                    drawerIcon: ({ focused }) => (
                    focused ? <Image source={require('../assets/icons/00-active.png')} style={tw`w-[30px] h-[30px]`} /> : <Image source={require('../assets/icons/00-inactive.png')} style={tw`w-[30px] h-[30px]`} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Transkript"
                children={(props) => <CategoryTabShell contentName="Transkript" content={Transkript} navigation={props.navigation} />}
                options={{
                    headerTitle: "Transkript",
                    drawerLabel: "Transkript",
                    drawerIcon: ({ focused }) => (
                        <VectorIcon
                            name="transkript"
                            size={26}
                            color={focused ? colorScheme === 'dark' ? '#fff' : '#023c69' : colorScheme === 'dark' ? '#a3a3a3' : '#737373'}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="Info über die App"
                children={(props) => <CategoryTabShell contentName="Info" content={Info} navigation={props.navigation} />}
                options={({ navigation }) => ({
                    headerTitle: () => (
                        <HeaderBrand
                            href="/"
                            onPress={() => {
                                setSearch('');
                                dispatch(clearFilteredKapiteln());
                                navigation.navigate('Kategorien', { screen: 'home' });
                            }}
                        />
                    ),
                    drawerIcon: ({ focused }) => (
                    focused ? <Image source={require('../assets/icons/001-active.png')} style={tw`w-7 h-7`} /> : <Image source={require('../assets/icons/001-inactive.png')} style={tw`w-7 h-7`} />
                    ),
                })}
            />
            <Drawer.Screen
                name="Impressum"
                component={Impressum}
                options={{
                    headerTitle: "Impressum",
                    drawerLabel: "Impressum",
                    // wird stattdessen fest unten im Footer gerendert, siehe renderDrawerContent
                    drawerItemStyle: { display: 'none' },
                }}
            />
            <Drawer.Screen
                name="Datenschutz"
                component={Datenschutz}
                options={{
                    headerTitle: "Datenschutzerklärung",
                    drawerLabel: "Datenschutzerklärung",
                    // wird stattdessen fest unten im Footer gerendert, siehe renderDrawerContent
                    drawerItemStyle: { display: 'none' },
                }}
            />
            <Drawer.Screen
                name="Suche"
                children={(props) => <CategoryTabShell contentName="Suche" content={Suche} navigation={props.navigation} />}
                options={{
                    title: 'Suche',
                    drawerItemStyle: {
                        display: 'none'
                    }
                }}
            />
        </Drawer.Navigator>
    );
}

const AppNavigation = () => {
    const RootStack = createNativeStackNavigator();
    const colorScheme = useColorScheme() ?? 'light'; // <- global Dark/Light, system-gesteuert

    return (
        <ThemeContext.Provider value={colorScheme}>
            <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
                <RootStack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
                    <RootStack.Screen name="Root" component={DrawerNavigator} />
                    <RootStack.Screen
                        name="Bittgebete"
                        component={Bittgebete}
                        options={{
                            headerShown: true,
                            title: 'Bittgebete',
                            animation: 'slide_from_right',
                            headerStyle: { backgroundColor: colorScheme === "dark" ? "#000000" : "#ffffff" },
                            headerShadowVisible: false,
                            headerTintColor: colorScheme === "dark" ? "#ffffff" : "#000000",
                            headerTitleStyle: colorScheme === "dark" ? tw`text-white` : tw`text-[#171717]`,
                            contentStyle: { backgroundColor: colorScheme === "dark" ? "#171717" : "#f5f5f5" },
                        }}
                    />
                    <RootStack.Screen
                        name="NotFound"
                        component={NotFound}
                        options={{
                            headerShown: true,
                            title: 'Seite nicht gefunden',
                            headerStyle: { backgroundColor: colorScheme === "dark" ? "#000000" : "#ffffff" },
                            headerTintColor: colorScheme === "dark" ? "#ffffff" : "#000000",
                        }}
                    />
                </RootStack.Navigator>
            </NavigationContainer>
        </ThemeContext.Provider>
    );
}

export default AppNavigation
