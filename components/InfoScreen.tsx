import React from 'react';
import { ScrollView, Text, View, useWindowDimensions } from 'react-native';
import tw from 'twrnc';
import { useAppTheme } from '../theme/ThemeContext';

interface InfoScreenProps {
  body: string;
}

export default function InfoScreen({ body }: InfoScreenProps) {
  const theme = useAppTheme();
  const dark = theme === 'dark';
  const { width } = useWindowDimensions();
  const isWide = width >= 1024;

  return (
    <ScrollView
      style={dark ? tw`flex-1 bg-black` : tw`flex-1 bg-[#ff0000]`}
      contentContainerStyle={[tw`p-6`, isWide && tw`items-center`]}
    >
      <View style={[tw`w-full`, isWide && tw`max-w-[700px]`]}>
        <Text style={[tw`text-base leading-[26px]`, dark ? tw`text-white` : tw`text-gray-800`]}>
          {body}
        </Text>
      </View>
    </ScrollView>
  );
}
