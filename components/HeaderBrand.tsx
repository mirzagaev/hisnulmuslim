import React from 'react';
import { View, Text } from 'react-native';
import { PlatformPressable } from '@react-navigation/elements';
import { BRAND } from '../theme/colors';
import VectorIcon from './icons/VectorIcon';
import { useAppTheme } from "../theme/ThemeContext";
import tw from 'twrnc';

interface HeaderBrandProps {
  // Optional: macht "Hisnul Muslim" im Header antippbar (z. B. Sprung zur Themenübersicht).
  // Ohne onPress bleibt der Titel wie bisher rein dekorativ.
  onPress?: () => void;
  // Web-URL fürs <a>-Semantik-Äquivalent von onPress (Rechtsklick/neuer Tab etc.).
  href?: string;
}

export default function HeaderBrand({ onPress, href }: HeaderBrandProps) {
  const theme = useAppTheme();
  const brand = (
    <View style={tw`flex flex-row items-center gap-3`}>
      <VectorIcon name="logo" size={32} color={theme === "dark" ? "#ffffff" : BRAND.primary} />
      <Text style={[
        tw`text-xl font-bold`,
        theme === "dark" ? tw`text-white` : tw`text-[${BRAND.primary}]`,
      ]}>Hisnul Muslim</Text>
    </View>
  );

  if (!onPress) {
    return brand;
  }

  return (
    <PlatformPressable href={href} onPress={onPress}>
      {brand}
    </PlatformPressable>
  );
}