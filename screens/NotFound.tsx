import * as React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function NotFound({ navigation }) {
  const route = useRoute();
  console.log("url", route.path);
  console.log("navigation", navigation);
  return (
    <View>
      <Text>Nicht gefunden</Text>
      <Pressable onPress={() => navigation.navigate("Home")}>Back to home</Pressable>
    </View>
  );
}