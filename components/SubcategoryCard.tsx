import React from 'react';
import { View, Text, Pressable, useWindowDimensions } from 'react-native';
import tw from 'twrnc';
import { useAppTheme } from '../theme/ThemeContext';

export interface SubcategoryCardItem {
  key: string | number;
  label: string;
}

interface SubcategoryCardProps {
  title?: string;
  items: SubcategoryCardItem[];
  onSelect: (item: SubcategoryCardItem, index: number) => void;
}

export default function SubcategoryCard({ title, items, onSelect }: SubcategoryCardProps) {
  const theme = useAppTheme();
  const dark = theme === 'dark';
  const { width } = useWindowDimensions();
  const isWide = width >= 1024;

  return (
    <View
      style={[
        tw`w-full rounded-md border overflow-hidden`,
        dark ? tw`border-neutral-800 bg-black/60` : tw`border-neutral-200 bg-neutral-100/80`,
      ]}
    >
      {title ? (
        <Text
          style={[
            tw`text-lg font-semibold pt-5 pb-2`,
            dark ? tw`text-white` : tw`text-gray-800`,
            isWide ? tw`px-10` : tw`px-7`,
          ]}
        >
          {title}
        </Text>
      ) : null}
      {items.map((item, i) => (
        <Pressable
          key={item.key}
          onPress={() => onSelect(item, i)}
          style={({ pressed }) => [
            tw`flex-row items-center justify-between py-3`,
            pressed ? tw`bg-neutral-300/30` : tw`bg-transparent`,
            isWide ? tw`px-10` : tw`px-7`,
            i === items.length - 1 ? tw`pb-5` : tw`pb-3`,
          ]}
        >
          <Text style={[tw`flex-1 text-sm leading-5`, dark ? tw`text-white` : tw`text-gray-800`]}>
            {item.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
