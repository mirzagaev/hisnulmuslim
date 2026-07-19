import React from 'react';
import { View, Text, Pressable, useWindowDimensions } from 'react-native';
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
  const paddingHorizontal = width >= 1024 ? 40 : 28;

  return (
    <View
      style={{
        width: '100%',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: dark ? '#262626' : '#e5e5e5',
        backgroundColor: dark ? 'rgba(0,0,0,0.6)' : 'rgba(245,245,245,0.8)',
        overflow: 'hidden',
      }}
    >
      {title ? (
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            paddingHorizontal,
            paddingTop: 20,
            paddingBottom: 8,
            color: dark ? '#ffffff' : '#1f2937',
          }}
        >
          {title}
        </Text>
      ) : null}
      {items.map((item, i) => (
        <Pressable
          key={item.key}
          onPress={() => onSelect(item, i)}
          style={({ pressed }) => ({
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 12,
            paddingHorizontal,
            paddingBottom: i === items.length - 1 ? 20 : 12,
            backgroundColor: pressed ? 'rgba(212,212,212,0.3)' : 'transparent',
          })}
        >
          <Text style={{ flex: 1, fontSize: 14, lineHeight: 20, color: dark ? '#ffffff' : '#1f2937' }}>
            {item.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
