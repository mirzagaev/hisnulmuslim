import React from 'react';
import VectorIcon from './VectorIcon';
import { IconName } from './iconSource';

interface CategoryIconProps {
  category: number | string;
  active?: boolean;
  size?: number;
  color?: string;
}

export default function CategoryIcon({ category, active = false, size = 32, color = '#000000' }: CategoryIconProps) {
  const name = (active ? `cat${category}` : `cat${category}-inactive`) as IconName;
  return <VectorIcon name={name} size={size} color={color} />;
}
