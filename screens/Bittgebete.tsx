import * as React from 'react';
import {View, Text} from 'react-native-ui-lib';
import { Button } from 'react-native';

export default function Bittgebete({ navigation }) {
  return (
    <View flex paddingH-25 paddingT-120>
      <Text blue50 text20>Bittgebete zum Thema X</Text>

      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}