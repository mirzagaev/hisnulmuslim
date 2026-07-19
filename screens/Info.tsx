import * as React from 'react';
import { View, Text, Image, ScrollView, useWindowDimensions } from 'react-native';
import tw from 'twrnc';
import { useAppTheme } from '../theme/ThemeContext';
import CategoryStripe from '../components/CategoryStripe';

export default function Info({ navigation }) {
  const theme = useAppTheme();
  const dark = theme === 'dark';
  const { width } = useWindowDimensions();
  const isWide = width >= 1024;

  return (
    <ScrollView
      style={dark ? tw`bg-black` : tw`bg-white`}
      contentContainerStyle={isWide ? tw`items-center` : undefined}
    >
      <View style={[tw`flex-1 items-center font-medium px-10 pt-5 text-center w-full`, isWide && tw`max-w-[640px]`]}>
        <Image
          source={require('../assets/images/hm-logo-blau.png')}
          style={tw`h-10 w-10 mt-5`}
        />
        <Text style={tw`italic font-semibold text-[#3f66da] text-lg text-center py-5`}>"Gedenkt Meiner, so gedenke Ich eurer.{"\n"}
        Seid Mir dankbar und seid nicht undankbar gegen Mich."{"\n"}(Sura 2, Vers 152)</Text>
        <Text style={[tw`font-regular text-center py-2 text-[#36054a]`, dark && tw`text-neutral-200`]}>Alle Bittgebete aus dem klassischen Hisnul Muslim {"\n"}neu kategorisiert für einfacheren Zugang.</Text>

        <View style={tw`my-5 w-full`}>
          <CategoryStripe height={6} />
        </View>
      </View>
    </ScrollView>
  );
}
