import React from 'react';
import { ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { useAppTheme } from '../theme/ThemeContext';

interface InfoScreenProps {
  body: string;
}

export default function InfoScreen({ body }: InfoScreenProps) {
  const theme = useAppTheme();
  const dark = theme === 'dark';
  const { width } = useWindowDimensions();
  const isWide = width >= 1024;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: dark ? '#000000' : '#ff0000' }}
      contentContainerStyle={isWide ? { padding: 24, alignItems: 'center' } : { padding: 24 }}
    >
      <View style={{ width: '100%', maxWidth: isWide ? 700 : undefined }}>
        <Text style={{ fontSize: 16, lineHeight: 26, color: dark ? '#ffffff' : '#1f2937' }}>
          {body}
        </Text>
      </View>
    </ScrollView>
  );
}
