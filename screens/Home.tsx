import * as React from 'react';
import {View, Text} from 'react-native-ui-lib';
import { Button } from 'react-native';

export default function Home({ navigation }) {
  // const linkTo = useLinkTo();

  return (
    <View marginT-100 center>
      <Text blue50 text20 marginB-20>Kategorien</Text>

      <Button
        onPress={() => navigation.navigate('Alltag')}
        title="Alltag"
      />

      {/* <View marginT-100 center> */}
      {/* <Link to={{ screen: 'Kategorie', params: { id: '1' } }}>jlnljn</Link> */}
        {/* <Button
          label="Go to Kategorie 1"
          // onPress={() => linkTo("/kategorie/22")}
        /> */}
      {/* </View> */}
    </View>
  );
}