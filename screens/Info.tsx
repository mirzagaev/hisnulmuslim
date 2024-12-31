import * as React from 'react';
import { View, Text, Image } from 'react-native';
import tw from 'twrnc';

export default function Info({ navigation }) {
  return (
    <View style={tw`flex-1 bg-white items-center font-medium px-10 pt-5 text-center`}>
      <Image
        source={require('../assets/images/hm-logo-blau.png')}
        style={{ height: 40, width: 40, marginTop: 20 }}
      />
      <Text style={tw`italic font-semibold text-[#0084d7] text-lg text-center py-5`}>"Gedenkt Meiner, so gedenke Ich eurer.<br/>
      Seid Mir dankbar und seid nicht undankbar gegen Mich."<br/>(Sura 2, Vers 152)</Text>
      <Text style={tw`font-regular text-[#36054A] text-center py-2`}>Alle Bittgebete aus dem klassischen Hisnul Muslim <br/>neu kategorisiert für einfacheren Zugang.</Text>
      
      <View style={tw`flex flex-row my-5 w-full`}>
        <View style={tw`flex-1 w-1/8 block py-1 bg-[#0dc9ca] mx-1`}></View>
        <View style={tw`flex-1 w-1/8 block py-1 bg-[#2483d3] mx-1`}></View>
        <View style={tw`flex-1 w-1/8 block py-1 bg-[#7e57d6] mx-1`}></View>
        <View style={tw`flex-1 w-1/8 block py-1 bg-[#b41ed8] mx-1`}></View>
        <View style={tw`flex-1 w-1/8 block py-1 bg-[#c61fb7] mx-1`}></View>
        <View style={tw`flex-1 w-1/8 block py-1 bg-[#e21f87] mx-1`}></View>
        <View style={tw`flex-1 w-1/8 block py-1 bg-[#ef2265] mx-1`}></View>
      </View>
    </View>
  );
}