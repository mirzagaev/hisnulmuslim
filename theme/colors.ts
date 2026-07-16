// Design tokens ported from the Claude Design "Hisnul Muslim" design system.

export const BRAND = {
  primary: '#3f66da',
  secondary: '#36054a',
};

export interface CategoryColor {
  id: number;
  label: string;
  base: string;
  dark: string;
  light: string;
}

export const CATEGORY_COLORS: Record<string, CategoryColor> = {
  '1': { id: 1, label: 'Alltag', base: '#08bfba', dark: '#004441', light: '#beeae4' },
  '2': { id: 2, label: 'Gebet', base: '#2484d3', dark: '#052d49', light: '#bbddef' },
  '3': { id: 3, label: 'Reisen', base: '#596ed3', dark: '#1d3060', light: '#c4cee8' },
  '4': { id: 4, label: 'Schutz', base: '#b41ed8', dark: '#430a51', light: '#e2b9ef' },
  '5': { id: 5, label: '1. Hilfe', base: '#c51fb7', dark: '#440641', light: '#e7bae8' },
  '6': { id: 6, label: 'Wohlsein', base: '#de2187', dark: '#4c0631', light: '#f4bde3' },
  '7': { id: 7, label: 'Pilgern', base: '#ef2266', dark: '#60072b', light: '#f9c5dd' },
};

export const NEUTRAL = {
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray800: '#1f2937',
  neutral100: '#f5f5f5',
  neutral200: '#e5e5e5',
  neutral300: '#d4d4d4',
  neutral400: '#a3a3a3',
  neutral500: '#737373',
  neutral600: '#525252',
  neutral700: '#404040',
  neutral800: '#262626',
  neutral900: '#171717',
};

export const RADII = {
  sm: 5,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  pill: 32,
  full: 9999,
};
