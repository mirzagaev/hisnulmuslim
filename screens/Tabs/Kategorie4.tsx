import * as React from 'react';
import {View, Text} from 'react-native-ui-lib';
import { Button } from 'react-native';

export default function Kategorie({ navigation }) {
  return (
    <View marginT-100 center>
      <Text blue50 text20 marginB-20>Notfälle / Tod</Text>

      <View marginT-100 center>
        <Button onPress={() => navigation.navigate("Bittgebete")} title="Bittgebete öffnen" />
      </View>
    </View>
  );
}