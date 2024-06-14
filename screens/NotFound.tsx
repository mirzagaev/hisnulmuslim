import * as React from 'react';
import { View, Text } from 'react-native-ui-lib';
import { Button } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function NotFound({ navigation }) {
  const route = useRoute();
  console.log("url", route.path);
  console.log("navigation", navigation);
  return (
    <View flex paddingH-25 paddingT-120>
      <Text red50 text20>Nicht gefunden</Text>
      <Button onPress={() => navigation.navigate("Home")} title="Back to home" />
    </View>
  );
}