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
