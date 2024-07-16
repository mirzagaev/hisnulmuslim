import * as React from 'react';
import { View, Text } from 'react-native-ui-lib';
import { Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function NotFound({ navigation }) {
  const route = useRoute();
  console.log("url", route.path);
  console.log("navigation", navigation);
  return (
    <View flex paddingH-25 paddingT-120>
      <Text red50 text20 marginB-30>Nicht gefunden</Text>
      <Pressable onPress={() => navigation.navigate("Home")}>Back to home</Pressable>
    </View>
  );
}