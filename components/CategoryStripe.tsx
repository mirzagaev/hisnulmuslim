import React from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
import { CATEGORY_COLORS } from '../theme/colors';

interface CategoryStripeProps {
  active?: string | number | null;
  height?: number;
  layout?: any;
}

export default function CategoryStripe({ active, height = 4, layout }: CategoryStripeProps) {
  const activeId = active != null ? String(active) : null;
  return (
    <View style={tw`flex-row w-full`}>
      {Object.keys(CATEGORY_COLORS).map((id) => (
        <View
          key={id}
          style={[
            tw`flex-1 h-[${height}px] bg-[${CATEGORY_COLORS[id].base}]`,
            activeId == null || activeId === id ? tw`opacity-100` : tw`opacity-35`,
          ]}
        />
      ))}
    </View>
  );
}