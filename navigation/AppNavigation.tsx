import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { Text } from 'react-native';

import Kategorien from './Kategorien';
import Bittgebete from '../screens/Bittgebete';
import NotFound from '../screens/NotFound';

const config = {
    screens: {
        Home: {
            // initialRouteName: 'home',
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
    const Stack = createNativeStackNavigator()

    return (
        <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
            <Stack.Navigator initialRouteName="Home" id={undefined}>
                <Stack.Screen
                    name="Home"
                    component={Kategorien}
                    options={{
                        title: 'Hisnul Muslim',
                    }}
                />
                <Stack.Screen
                    name="Bittgebete"
                    component={Bittgebete}
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