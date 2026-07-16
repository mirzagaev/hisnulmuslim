import * as React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import tw from 'twrnc';
import { useAppTheme } from '../navigation/AppNavigation';
import CategoryStripe from '../components/CategoryStripe';

export default function Info({ navigation }) {
  const theme = useAppTheme();
  const dark = theme === 'dark';

  return (
    <ScrollView style={dark ? tw`bg-black` : tw`bg-white`}>
      <View style={tw`flex-1 items-center font-medium px-10 pt-5 text-center`}>
        <Image
          source={require('../assets/images/hm-logo-blau.png')}
          style={{ height: 40, width: 40, marginTop: 20 }}
        />
        <Text style={tw`italic font-semibold text-[#3f66da] text-lg text-center py-5`}>"Gedenkt Meiner, so gedenke Ich eurer.{"\n"}
        Seid Mir dankbar und seid nicht undankbar gegen Mich."{"\n"}(Sura 2, Vers 152)</Text>
        <Text style={[tw`font-regular text-center py-2`, { color: '#36054A' }, dark && tw`text-neutral-200`]}>Alle Bittgebete aus dem klassischen Hisnul Muslim {"\n"}neu kategorisiert für einfacheren Zugang.</Text>

        <View style={tw`my-5 w-full`}>
          <CategoryStripe height={6} />
        </View>
      </View>
    </ScrollView>
  );
}
