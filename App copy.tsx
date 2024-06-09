import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer, Link } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Bittgebete from './screens/Bittgebete';
import Kategorie from './screens/Kategorie';
import Home from './screens/Home';
import * as Linking from 'expo-linking';

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Kategorien</Text>

//       <View>
//         <Button
//           title="Go to Kategorie X"
//           onPress={() => navigation.navigate("Kategorie")}
//         />
//       </View>
//     </View>
//   );
// }

// function KategorieScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Kategorie X</Text>

//       <View>
//         <Button
//           title="Go to Bittgebet X"
//           onPress={() => navigation.navigate("Bittgebete")}
//         />
//       </View>
//     </View>
//   );
// }

// function BittgebeteScreen() {
//   return (
//     <View style={{backgroundColor: 'gray'}}>
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
//         <Text>Im Namen Allahs, ich vertraue auf Allah, und es gibt keine Macht noch Kraft außer bei Allah.</Text>
//         <Text>بِسْمِ اللهِ، تَوَكَّلْتُ عَلَى اللهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ</Text>
//         <Text>Bismil-lahi, tawakkaltu ´ala l-lahi, wa la hawla wa la quwwata illa bi-l-lahi.</Text>
//       </View>
//     </View>
//   );
// }

const Stack = createNativeStackNavigator();
const prefix = Linking.createURL('/');

function App() {
  const linking = {
    prefixes: [prefix],
    // prefixes: ['hisnulmuslim://', 'https://hisnulmuslim.com', 'https://*.hisnulmuslim.com'],
    config: {
      screens: {
        "Hisnul Muslim": "",
        // Kategorie: 'kategorie/:id',
        Kategorie: {
          path: 'kategorie/:id/',
          parse: {
            id: (id) => 'kategorie-${id}',
          }
        },
        Bittgebete: 'dua/:id',
      },    
    },
  };

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator id={undefined}>
        <Stack.Screen name="Hisnul Muslim" component={Home} />
        <Stack.Screen name="Kategorie" component={Kategorie} />
        <Stack.Screen name="Bittgebete" component={Bittgebete} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;