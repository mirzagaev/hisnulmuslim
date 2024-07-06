import { NavigationContainer } from '@react-navigation/native'
import { TouchableHighlight, Image, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {View} from 'react-native-ui-lib';
import Kategorien from './Kategorien';
import Info from '../screens/Info';
import Favoriten from '../screens/Favoriten';
import NotFound from '../screens/NotFound';

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

function Suchbox(props: any) {
    return (
        <View paddingH-10>
        <TouchableHighlight onPress={() => alert("Suche")}>
            <Image
            style={{ width: 32, height: 32 }}
            source={require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-14.svg')}
            />
        </TouchableHighlight>
        </View>
    );
}

const AppNavigation = () => {
    const Drawer = createDrawerNavigator();

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
            >
                <Drawer.Screen
                    name="Hisnul Muslim"
                    component={Kategorien}
                    options={{
                        headerRight: (props) => <Suchbox props={props} />,
                        // headerShown: false,
                        drawerIcon: ({ focused }) => (
                          focused ? <Image source={require('../assets/images/logo.png')} style={{height:34, width:34}} /> : <Image source={require('../assets/images/logo.png')} style={{height:34, width:34}} />
                        ),
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
                    name="NotFound"
                    component={NotFound}
                    options={{
                        title: 'Seite nicht gefunden',
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