import React from 'react';
import { SvgXml } from 'react-native-svg';
import { ICONS, IconName } from './iconSource';

interface VectorIconProps {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export default function VectorIcon({ name, size = 24, color = '#000000', strokeWidth = 1.5 }: VectorIconProps) {
  const def = ICONS[name];
  const rootAttrs = def.stroke
    ? `fill="none" stroke="currentColor" stroke-width="${strokeWidth}"`
    : 'fill="currentColor"';
  const xml = `<svg viewBox="${def.viewBox}" ${rootAttrs} xmlns="http://www.w3.org/2000/svg">${def.inner}</svg>`;
  return <SvgXml xml={xml} width={size} height={size} color={color} />;
}
