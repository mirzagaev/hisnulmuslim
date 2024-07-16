import * as React from 'react';
import { View } from 'react-native-ui-lib';
import { Pressable } from 'react-native';

export default function Favoriten({ navigation }) {
  return (
    <View flex paddingH-25 paddingT-120>
      <Pressable onPress={() => navigation.goBack()}>Go back</Pressable>
    </View>
  );
}