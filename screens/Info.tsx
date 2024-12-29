import * as React from 'react';
import { View, Text, Image } from 'react-native';
import tw from 'twrnc';

export default function Info({ navigation }) {
  return (
    <View style={tw`flex-1 bg-white items-center font-medium px-4`}>
      <Text style={tw`italic font-semibold text-[#0084d7] text-base text-center py-5`}>"Gedenkt Meiner, so gedenke Ich eurer.
      Seid Mir dankbar und seid nicht undankbar gegen Mich." (Sura 2, Vers 152)</Text>
      <Image
          source={require('../assets/images/hm-logo-blau.png')}
          style={{ height: 40, width: 40 }}
      />
    </View>
  );
}