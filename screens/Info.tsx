import * as React from 'react';
import { View, Text, Image, ScrollView, useWindowDimensions } from 'react-native';
import tw from 'twrnc';
import { useAppTheme } from '../theme/ThemeContext';
import CategoryStripe from '../components/CategoryStripe';

export default function Info() {
  const theme = useAppTheme();
  const dark = theme === 'dark';
  const { width } = useWindowDimensions();
  const isWide = width >= 1024;

  return (
    <ScrollView
      style={dark ? tw`bg-black` : tw`bg-white`}
      contentContainerStyle={isWide ? tw`items-center` : undefined}
    >
      <View style={[tw`flex-1 items-center font-medium px-8 pt-5 text-center w-full`, isWide && tw`max-w-[640px]`]}>
        <Text
          style={[
            tw`font-light mb-4`,
            isWide ? tw`text-[56px] leading-[64px]` : tw`text-[34px] leading-10`,
            dark ? tw`text-white` : tw`text-[#3f66da]`,
          ]}
        >
          Die Hisnul Muslim App – das Original, neu gedacht.
        </Text>
        <Text
          style={[
            isWide ? tw`text-xl leading-8` : tw`text-base leading-[26px]`,
            dark ? tw`text-neutral-300` : tw`text-neutral-700`,
            isWide && tw`max-w-[640px]`,
          ]}
        >
          Alle Bittgebete aus dem klassischen Hisnul Muslim, neu kategorisiert für einfachen Zugang.
        </Text>

        <View style={tw`my-5 w-full`}>
          <CategoryStripe height={6} />
        </View>

        <Text
          style={[
            isWide ? tw`text-xl leading-8` : tw`text-base leading-[26px]`,
            dark ? tw`text-neutral-300` : tw`text-neutral-700`,
            isWide && tw`max-w-[640px]`,
          ]}
        >
          Hinter der Hisnul Muslim App steht keine Firma, sondern ein kleines Team, das den Zugang zu authentischen Bittgebeten (Adhkar) so einfach wie möglich machen möchte — 100 % kostenlos und werbefrei.
        </Text>
        <Text
          style={[
            tw`font-medium mt-3 text-left w-full`,
            isWide ? tw`text-2xl leading-[64px]` : tw`text-xl leading-10`,
            dark ? tw`text-white` : tw`text-[#3f66da]`,
          ]}
        >
          Klarer Fokus
        </Text>
        <Text
          style={[
            isWide ? tw`text-xl leading-8` : tw`text-base leading-[26px]`,
            dark ? tw`text-neutral-300` : tw`text-neutral-700`,
            isWide && tw`max-w-[640px]`,
          ]}
        >Ein modernes, ablenkungsfreies Design hilft dabei, sich ganz auf das Gedenken Allahs zu konzentrieren.</Text>
        <Text
          style={[
            tw`font-medium mt-3 text-left w-full`,
            isWide ? tw`text-2xl leading-[64px]` : tw`text-xl leading-10`,
            dark ? tw`text-white` : tw`text-[#3f66da]`,
          ]}
        >
          Präzise Umschrift
        </Text>
        <Text
          style={[
            isWide ? tw`text-xl leading-8` : tw`text-base leading-[26px]`,
            dark ? tw`text-neutral-300` : tw`text-neutral-700`,
            isWide && tw`max-w-[640px]`,
          ]}
        >Optimierte Transliteration als praktische Lesehilfe für die richtige arabische Aussprache.</Text>
        
        <Text
          style={[
            tw`font-medium mt-3 text-left w-full`,
            isWide ? tw`text-2xl leading-[64px]` : tw`text-xl leading-10`,
            dark ? tw`text-white` : tw`text-[#3f66da]`,
          ]}
        >Das Original</Text>
        <Text
          style={[
            isWide ? tw`text-xl leading-8` : tw`text-base leading-[26px]`,
            dark ? tw`text-neutral-300` : tw`text-neutral-700`,
            isWide && tw`max-w-[640px]`,
          ]}
        >Basiert direkt auf dem bewährten Originalwerk von Sa'id ibn Ali ibn Wahf al-Qahtani und wurde mit größter Sorgfalt überarbeitet</Text>
        
        <Text
          style={[
            tw`font-medium mt-3 text-left w-full`,
            isWide ? tw`text-2xl leading-[64px]` : tw`text-xl leading-10`,
            dark ? tw`text-white` : tw`text-[#3f66da]`,
          ]}
        >Von der Community geprägt</Text>
        <Text
          style={[
            isWide ? tw`text-xl leading-8` : tw`text-base leading-[26px]`,
            dark ? tw`text-neutral-300` : tw`text-neutral-700`,
            isWide && tw`max-w-[640px]`,
          ]}
        >Mit Version 3.0 (jetzt auch für iOS) baut die App auf dem Feedback von über 10.000 Nutzern auf</Text>
        
        <Text
          style={[
            tw`font-medium mt-3 text-left w-full`,
            isWide ? tw`text-2xl leading-[64px]` : tw`text-xl leading-10`,
            dark ? tw`text-white` : tw`text-[#3f66da]`,
          ]}
        >Das Original</Text>
        <Text
          style={[
            isWide ? tw`text-xl leading-8` : tw`text-base leading-[26px]`,
            dark ? tw`text-neutral-300` : tw`text-neutral-700`,
            isWide && tw`max-w-[640px]`,
          ]}
        >Basiert direkt auf dem bewährten Originalwerk von Sa'id ibn Ali ibn Wahf al-Qahtani und wurde mit größter Sorgfalt überarbeitet</Text>

        <View style={tw`my-5 w-full`}>
          <CategoryStripe height={6} />
        </View>

        <Text style={tw`italic font-semibold text-[#3f66da] text-lg pb-10`}>Möge Allah dieses Projekt segnen und allen einen großen Nutzen daraus ziehen lassen. Amin.</Text>
      </View>
    </ScrollView>
  );
}