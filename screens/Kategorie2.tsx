import * as React from 'react';
import {View, Text} from 'react-native-ui-lib';
import { Button } from 'react-native';

export default function Kategorie({ navigation }) {
  return (
    <View marginT-100 center>
      <Text blue50 text20 marginB-20>Bittgebete zum Reisen</Text>

      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}