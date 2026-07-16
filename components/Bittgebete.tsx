import React, { useState } from 'react';
import { View, Text, Pressable, Share, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Bittgebete from '../interfaces/Bittgebet';
import { useAppTheme } from '../navigation/AppNavigation';
import { RADII } from '../theme/colors';

interface DuaCardProps extends Bittgebete {
  color: string;
}

function Bittgebet(dua: DuaCardProps) {
  const theme = useAppTheme();
  const dark = theme === 'dark';
  const [showLatein, setShowLatein] = useState(true);

  const handleShare = () => {
    const text = [dua.content, dua.arabic, dua.latein].filter(Boolean).join('\n');
    Share.share({ message: text });
  };

  return (
    <View
      style={{
        width: '100%',
        marginBottom: 20,
        backgroundColor: dark ? 'rgba(38,38,38,0.7)' : '#ffffff',
        borderWidth: 1,
        borderColor: 'rgba(63,102,218,0.2)',
        borderRadius: RADII.lg,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: dark ? 0 : 0.12,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 8 },
        elevation: 4,
      }}
    >
      {dua.content ? (
        <View style={{ backgroundColor: dua.color, paddingVertical: 24, paddingHorizontal: 24 }}>
          <Text style={{ color: '#ffffff', fontSize: 18, lineHeight: 28 }}>{dua.content}</Text>
        </View>
      ) : null}

      {dua.arabic ? (
        <View
          style={{
            paddingVertical: 24,
            paddingHorizontal: 24,
            borderBottomWidth: 1,
            borderBottomColor: dark ? '#404040' : '#e5e5e5',
          }}
        >
          <Text
            style={{
              fontSize: 22,
              lineHeight: 40,
              textAlign: 'right',
              writingDirection: 'rtl',
              color: dark ? '#ffffff' : '#1f2937',
              fontFamily: Platform.select({ ios: 'Damascus', android: 'serif', default: 'serif' }),
            }}
          >
            {dua.arabic}
          </Text>
        </View>
      ) : null}

      {dua.latein && showLatein ? (
        <View
          style={{
            paddingVertical: 18,
            paddingHorizontal: 24,
            borderBottomWidth: 3,
            borderBottomColor: dark ? '#404040' : '#d4d4d4',
          }}
        >
          <Text style={{ fontStyle: 'italic', fontSize: 15, color: dark ? '#ffffff' : '#1f2937' }}>
            {dua.latein}
          </Text>
        </View>
      ) : null}

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 16, paddingHorizontal: 24 }}>
        <Pressable onPress={handleShare} accessibilityLabel="Teilen" hitSlop={8}>
          <Ionicons name="share-social-outline" size={20} color={dark ? '#ffffff' : '#1f2937'} />
        </Pressable>
        <Pressable onPress={() => setShowLatein((v) => !v)} accessibilityLabel="Transliteration" hitSlop={8}>
          <Ionicons name="text-outline" size={20} color={dark ? '#ffffff' : '#1f2937'} />
        </Pressable>
        <View style={{ marginLeft: 'auto', flexDirection: 'row', gap: 16 }}>
          <Text style={{ fontSize: 11, color: dark ? '#a3a3a3' : '#a3a3a3' }}>Hisnul Muslim</Text>
          <Text style={{ fontSize: 11, color: dark ? '#a3a3a3' : '#a3a3a3' }}>Kapitel {dua.kapitel_id}</Text>
          <Text style={{ fontSize: 11, color: dark ? '#a3a3a3' : '#a3a3a3' }}>Bittgebet {dua.bittgebet_id}</Text>
        </View>
      </View>
    </View>
  );
}

export default Bittgebet;
