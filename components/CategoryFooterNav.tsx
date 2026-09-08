import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { PlatformPressable } from '@react-navigation/elements';
import tw from 'twrnc';
import { useAppTheme } from '../theme/ThemeContext';
import { tabBarStruktur } from '../interfaces/KapitelSchema';
import CategoryStripe from './CategoryStripe';
import CategoryIcon from './icons/CategoryIcon';
import { CATEGORY_COLORS } from '../theme/colors';

const CATEGORY_IDS = Object.keys(tabBarStruktur);

interface CategoryFooterNavProps {
  // Aktuell hervorgehobene Kategorie. null/undefined = alle hervorgehoben (wie auf der Startseite).
  active?: string | number | null;
  onSelectCategory: (id: string) => void;
  // Optional: baut die Web-URL für ein Kategorie-Icon (für <a>-Semantik im Web-Build).
  hrefFor?: (id: string) => string | undefined;
  layout?: { width: number };
  // 'auto' verhält sich wie in Kategorien.tsx (ab 769px vertikale Leiste links).
  // 'horizontal' erzwingt immer die horizontale Footer-Leiste (für Screens ohne Sidebar-Layout).
  orientation?: 'auto' | 'horizontal';
}

export default function CategoryFooterNav({
  active = null,
  onSelectCategory,
  hrefFor,
  layout,
  orientation = 'auto',
}: CategoryFooterNavProps) {
  const theme = useAppTheme();
  const { width: windowWidth } = useWindowDimensions();
  const width = layout?.width ?? windowWidth;
  const vertical = orientation === 'auto' && width >= 769;
  const isWide = width >= 1024;
  const activeId = active != null ? String(active) : null;

  return (
    <View style={theme === 'dark' ? tw`bg-black` : tw`bg-white`}>
      {!vertical && <CategoryStripe active={activeId} height={4} layout={layout ?? { width }} />}
      <View
        style={[
          tw`flex py-2`,
          vertical ? tw`flex-col px-5 py-4` : tw`flex-row`,
          !isWide && tw`pb-3 pt-1`,
        ]}
      >
        {CATEGORY_IDS.map((id) => {
          const highlighted = activeId == null || activeId === id;
          const catColor = CATEGORY_COLORS[id];

          return (
            <PlatformPressable
              key={id}
              href={hrefFor?.(id)}
              onPress={() => onSelectCategory(id)}
              style={[
                tw`flex items-center font-semibold`,
                vertical ? tw`py-1` : tw`flex-1 py-2`,
              ]}
            >
              <View
                style={tw`p-2 rounded-lg
                  border-[${highlighted ? catColor.base : (theme === 'dark' ? '#404040' : '#e5e5e5')}]
                  bg-[${highlighted ? catColor.base : (theme === 'dark' ? '#1f1e1e' : '#f5f5f5')}]`}
              >
                <CategoryIcon
                  category={id}
                  active={highlighted}
                  color={highlighted ? '#ffffff' : (theme === 'dark' ? '#ffffff' : '#737373')}
                  size={width < 400 ? 26 : 36}
                />
              </View>
              <Text
                style={[
                  tw`pt-1`,
                  !isWide && tw`text-xs sm:text-sm`,
                  theme === 'dark' ? tw`text-neutral-200` : tw`text-neutral-700`,
                ]}
              >
                {tabBarStruktur[id].label}
              </Text>
            </PlatformPressable>
          );
        })}
      </View>
    </View>
  );
}
