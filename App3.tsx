import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import Kategorie0 from './screens/Kategorie0';
import Kategorie1 from './screens/Kategorie1';
import Kategorie2 from './screens/Kategorie2';
import Kategorie3 from './screens/Kategorie3';

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator id={undefined} initialRouteName='Home'>
//         <Tab.Screen name="Hisnul Muslim" component={Home} options={{
//            tabBarShowLabel:false,  
//            tabBarStyle: {  
//               backgroundColor:'red'  
//            }
//         }}/>
//         <Tab.Screen name="Alltag" component={Kategorie0} />
//         <Tab.Screen name="Gebet" component={Kategorie1} />
//         <Tab.Screen name="Reisen" component={Kategorie2} />
//         <Tab.Screen name="Schutz" component={Kategorie3} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }