import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { TouchableHighlight, Image, Text } from 'react-native';
import {View} from 'react-native-ui-lib';
import Kategorien from './Kategorien';
import Info from '../screens/Info';
import Bittgebete from '../screens/Bittgebete';
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
    const Stack = createNativeStackNavigator()

    return (
        <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
            <Stack.Navigator initialRouteName="Home" id={undefined}>
                <Stack.Screen
                    name="Home"
                    component={Kategorien}
                    options={{
                        title: 'Hisnul Muslim',
                        // headerShown: false,
                        headerRight: (props) => <Suchbox props={props} />,
                        // headerSearchBarOptions
                    }}
                />
                <Stack.Screen
                    name="Bittgebete"
                    component={Bittgebete}
                />
                <Stack.Screen
                    name="Info"
                    component={Info}
                    options={{
                        title: 'Über Hisnul Muslim App',
                    }}
                />
                <Stack.Screen
                    name="NotFound"
                    component={NotFound}
                    options={{
                        title: 'Seite nicht gefunden',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation