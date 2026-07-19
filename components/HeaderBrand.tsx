import React from 'react';
import { View, Text } from 'react-native';
import { BRAND } from '../theme/colors';
import VectorIcon from './icons/VectorIcon';
import { useAppTheme } from "../theme/ThemeContext";
import tw from 'twrnc';

export default function HeaderBrand() {
  const theme = useAppTheme();
  return (
    <View style={tw`flex flex-row items-center gap-3`}>
      <VectorIcon name="logo" size={32} color={theme === "dark" ? "#ffffff" : BRAND.primary} />
      <Text style={[
        tw`text-xl font-bold`,
        theme === "dark" ? tw`text-white` : tw`text-[${BRAND.primary}]`,
      ]}>Hisnul Muslim</Text>
    </View>
  );
}