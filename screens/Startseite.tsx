import React from 'react';
import { View, Text, ImageBackground, ScrollView, useWindowDimensions } from 'react-native';
import { useAppTheme } from '../theme/ThemeContext';
import tw from 'twrnc';

export default function Startseite() {
  const theme = useAppTheme();
  const dark = theme === 'dark';
  const { width } = useWindowDimensions();
  const isWide = width >= 1024;

  return (
  <View
    style={[
      tw`w-full h-full `,
      isWide && tw`py-5 pr-5`,
      theme === "dark" ? tw`bg-black` : tw`bg-white`
    ]}
  >
    <View
      style={[
        tw`w-full h-full overflow-hidden relative bg-linear-to-b lg:bg-linear-to-r`,
        isWide && tw`rounded-2xl`,
        theme === "dark" ? tw`from-neutral-900/95 to-neutral-900/80` : tw`bg-white`
      ]}
    >
      <ScrollView
        style={[
          tw`p-5 w-full h-full z-50`,
          {
            backgroundColor: dark ? 'rgba(23,23,23,0.92)' : 'rgba(245,245,245,0.75)'
          }
        ]}
        contentContainerStyle={{ flexGrow: 1, padding: isWide ? 56 : 28 }}
      >
        <Text
          style={[
            tw`font-light mb-4`,
            {
              color: dark ? '#ffffff' : '#3f66da',
              fontSize: isWide ? 56 : 34,
              lineHeight: isWide ? 64 : 40,
            },
          ]}
        >
          Die Hisnul Muslim App – das Original, neu gedacht.
        </Text>
        <Text
          style={{
            color: dark ? '#d4d4d4' : '#404040',
            fontSize: isWide ? 20 : 16,
            lineHeight: isWide ? 32 : 26,
            maxWidth: isWide ? 640 : undefined,
          }}
        >
          Alle Bittgebete aus dem klassischen Hisnul Muslim,{"\n"}neu kategorisiert für einfachen Zugang.
        </Text>
      </ScrollView>
      {/* <ImageBackground
        source={require('../assets/backgrounds/startseite.jpg')}
        style={tw`absolute z-20 right-0 bottom-0 inset-0`}
        resizeMode="cover"
      /> */}
    </View>
  </View>
  );
}
