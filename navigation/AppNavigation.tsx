import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

// Screens we previously created
import Kategorien from '../screens/Kategorien';
import Bittgebete from '../screens/Bittgebete';

const AppNavigation = () => {
    // Attention, this is a Stack
    const Stack = createNativeStackNavigator()

    // Please refer to the Graph2, where all modules are connected
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Kategorien" id={undefined}>
                <Stack.Screen name="Hisnul Muslim" component={Kategorien} />
                <Stack.Screen name="Bittgebete" component={Bittgebete} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation