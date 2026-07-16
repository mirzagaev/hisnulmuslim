import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useAppTheme } from '../navigation/AppNavigation';
import { RADII } from '../theme/colors';
import VectorIcon from './icons/VectorIcon';

export interface SubcategoryCardItem {
  key: string | number;
  label: string;
  meta?: string;
}

interface SubcategoryCardProps {
  title?: string;
  color: string;
  numbered?: boolean;
  items: SubcategoryCardItem[];
  onSelect: (item: SubcategoryCardItem, index: number) => void;
}

export default function SubcategoryCard({ title, color, numbered = true, items, onSelect }: SubcategoryCardProps) {
  const theme = useAppTheme();
  const dark = theme === 'dark';

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: dark ? 'rgba(38,38,38,0.7)' : '#ffffff',
        borderWidth: 1,
        borderColor: dark ? '#404040' : '#e5e5e5',
        borderRadius: RADII.md,
        shadowColor: '#000',
        shadowOpacity: dark ? 0 : 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
        overflow: 'hidden',
      }}
    >
      {title ? (
        <View
          style={{
            paddingVertical: 14,
            paddingHorizontal: 20,
            borderBottomWidth: 1,
            borderBottomColor: dark ? '#404040' : '#e5e5e5',
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: '500', color }}>{title}</Text>
        </View>
      ) : null}
      {items.map((item, i) => (
        <Pressable
          key={item.key}
          onPress={() => onSelect(item, i)}
          style={({ pressed }) => ({
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            paddingVertical: 13,
            paddingHorizontal: 20,
            borderTopWidth: i === 0 ? 0 : 1,
            borderTopColor: dark ? '#404040' : '#e5e5e5',
            backgroundColor: pressed ? (dark ? 'rgba(0,0,0,0.4)' : '#f5f5f5') : 'transparent',
          })}
        >
          {numbered ? (
            <Text style={{ color, fontSize: 13, fontWeight: '500', minWidth: 22 }}>{i + 1}</Text>
          ) : null}
          <Text style={{ flex: 1, fontSize: 14, lineHeight: 20, color: dark ? '#ffffff' : '#1f2937' }}>
            {item.label}
          </Text>
          {item.meta ? (
            <Text style={{ fontSize: 12, color: dark ? '#a3a3a3' : '#a3a3a3' }}>{item.meta}</Text>
          ) : null}
          <VectorIcon name="right" size={16} color={dark ? '#a3a3a3' : '#a3a3a3'} />
        </Pressable>
      ))}
    </View>
  );
}
