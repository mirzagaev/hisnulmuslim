import * as React from 'react';
import {View, TextField, Text, Button} from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';

export default function Kategorie() {
  const navigation = useNavigation();

  return (
    <View flex paddingH-25 paddingT-120>
      <Text blue50 text20>Kategorie X</Text>

    <View marginT-100 center>
      <Button text70 white background-orange30
        label="Go to Bittgebet X"
        onPress={() => navigation.navigate("Bittgebete")}
      />
    </View>
    </View>
  );
}