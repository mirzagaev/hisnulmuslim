import React from 'react';
import { ScrollView, Text, View, useWindowDimensions } from 'react-native';
import tw from 'twrnc';
import { useAppTheme } from '../theme/ThemeContext';

interface InfoScreenProps {
  body: string;
  boldLines?: string[];
}

export default function InfoScreen({ body, boldLines = [] }: InfoScreenProps) {
  const theme = useAppTheme();
  const dark = theme === 'dark';
  const { width } = useWindowDimensions();
  const isWide = width >= 1024;
  const lines = body.split('\n');

  return (
    <ScrollView
      style={dark ? tw`flex-1 bg-black` : tw`flex-1`}
      contentContainerStyle={[tw`p-6`, isWide && tw`items-center`]}
    >
      <View style={[tw`w-full`, isWide && tw`max-w-[700px]`]}>
        <Text style={[tw`text-base leading-[26px]`, dark ? tw`text-white` : tw`text-gray-800`]}>
          {lines.map((line, index) => (
            <Text key={index} style={boldLines.includes(line.trim()) ? tw`font-bold` : undefined}>
              {line}
              {index < lines.length - 1 ? '\n' : ''}
            </Text>
          ))}
        </Text>
      </View>
    </ScrollView>
  );
}
