import React from 'react';
import { View, Text, Image, ImageBackground, ScrollView, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '../theme/ThemeContext';
import tw from 'twrnc';

export default function Startseite() {
  const theme = useAppTheme();
  const dark = theme === 'dark';
  const { width, height } = useWindowDimensions();
  const isWide = width >= 1024;

  const CASTLE_ASPECT = 823 / 1104;
  const contentWidth = width - (isWide ? 20 : 0);
  const contentHeight = height - (isWide ? 40 : 0);
  let castleWidth = contentWidth * 0.4;
  let castleHeight = castleWidth / CASTLE_ASPECT;
  if (castleHeight > contentHeight) {
    castleHeight = contentHeight;
    castleWidth = castleHeight * CASTLE_ASPECT;
  }

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
        tw`w-full h-full overflow-hidden relative bg-white`,
        isWide && tw`rounded-2xl`,
      ]}
    >
      {isWide ? (
        <Image
          source={require('../assets/backgrounds/startseite_xl.jpg')}
          style={[tw`absolute right-0 bottom-0`, { width: castleWidth, height: castleHeight }]}
          resizeMode="contain"
        />
      ) : (
        <ImageBackground
          source={require('../assets/backgrounds/startseite.jpg')}
          style={tw`absolute inset-0 w-full h-full`}
          resizeMode="cover"
        />
      )}
      {dark ? (
        <LinearGradient
          colors={['rgba(23,23,23,0.95)', 'rgba(23,23,23,0.8)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={tw`absolute inset-0`}
        />
      ) : (
        <View style={tw`absolute inset-0 bg-neutral-100/55`} />
      )}
      <ScrollView
        style={tw`w-full h-full`}
        contentContainerStyle={isWide ? tw`flex-grow p-14` : tw`flex-grow p-7`}
      >
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
          Alle Bittgebete aus dem klassischen Hisnul Muslim,{"\n"}neu kategorisiert für einfachen Zugang.
        </Text>
      </ScrollView>
    </View>
  </View>
  );
}
