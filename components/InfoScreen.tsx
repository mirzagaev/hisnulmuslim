import React from 'react';
import { ScrollView, Text } from 'react-native';
import { useAppTheme } from '../navigation/AppNavigation';

interface InfoScreenProps {
  body: string;
}

export default function InfoScreen({ body }: InfoScreenProps) {
  const theme = useAppTheme();
  const dark = theme === 'dark';

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: dark ? '#000000' : '#ffffff' }}
      contentContainerStyle={{ padding: 24 }}
    >
      <Text style={{ fontSize: 16, lineHeight: 26, color: dark ? '#ffffff' : '#1f2937' }}>
        {body}
      </Text>
    </ScrollView>
  );
}
