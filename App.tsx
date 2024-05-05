import * as React from 'react';
import { Button, View, Text } from 'react-native';
// import { View, Text, Button } from 'react-native-ui-lib';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Kategorien</Text>

      <View>
        <Button
          title="Go to Kategorie X"
          onPress={() => navigation.navigate("Kategorie")}
        />
      </View>
    </View>
  );
}

function KategorieScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Kategorie X</Text>

      <View>
        <Button
          title="Go to Bittgebet X"
          onPress={() => navigation.navigate("Bittgebete")}
        />
      </View>
    </View>
  );
}

function BittgebeteScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Bittgebet X</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Hisnul Muslim" component={HomeScreen} />
        <Stack.Screen name="Kategorie" component={KategorieScreen} />
        <Stack.Screen name="Bittgebete" component={BittgebeteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;