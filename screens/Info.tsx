import * as React from 'react';
import { View, Text, Button } from 'react-native';

export default function Info({ navigation }) {
  return (
    <View>
      <Text>was ist Hisnul Muslim?</Text>

      <Button onPress={() => navigation.goBack()} title="Go back" />
    </View>
  );
}