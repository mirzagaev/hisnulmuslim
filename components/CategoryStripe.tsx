import React from 'react';
import { View } from 'react-native';
import { CATEGORY_COLORS } from '../theme/colors';

interface CategoryStripeProps {
  active?: string | number | null;
  height?: number;
}

export default function CategoryStripe({ active, height = 4 }: CategoryStripeProps) {
  const activeId = active != null ? String(active) : null;
  return (
    <View style={{ flexDirection: 'row', width: '100%' }}>
      {Object.keys(CATEGORY_COLORS).map((id) => (
        <View
          key={id}
          style={{
            flex: 1,
            height,
            backgroundColor: CATEGORY_COLORS[id].base,
            opacity: activeId == null || activeId === id ? 1 : 0.35,
          }}
        />
      ))}
    </View>
  );
}
