import React, { useState } from 'react';
import { View, Text, Pressable, Share, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Bittgebete from '../interfaces/Bittgebet';
import { useAppTheme } from '../theme/ThemeContext';
import tw from 'twrnc';

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
      style={[
        tw`w-full mb-5 border border-[rgba(63,102,218,0.2)] rounded-lg overflow-hidden`,
        dark ? tw`bg-neutral-800/70` : tw`bg-white`,
        {
          shadowColor: '#000',
          shadowOpacity: dark ? 0 : 0.12,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 8 },
          elevation: 4,
        },
      ]}
    >
      {dua.content ? (
        <View style={tw`py-6 px-6 bg-[${dua.color}]`}>
          <Text style={tw`text-white text-lg leading-7`}>{dua.content}</Text>
        </View>
      ) : null}

      {dua.arabic ? (
        <View style={[tw`py-6 px-6 border-b`, dark ? tw`border-neutral-700` : tw`border-neutral-200`]}>
          <Text
            style={[
              tw`text-[22px] leading-10 text-right`,
              dark ? tw`text-white` : tw`text-gray-800`,
              {
                writingDirection: 'rtl',
                fontFamily: Platform.select({ ios: 'Damascus', android: 'serif', default: 'serif' }),
              },
            ]}
          >
            {dua.arabic}
          </Text>
        </View>
      ) : null}

      {dua.latein && showLatein ? (
        <View style={[tw`py-[18px] px-6 border-b-[3px]`, dark ? tw`border-neutral-700` : tw`border-neutral-300`]}>
          <Text style={[tw`italic text-sm`, dark ? tw`text-white` : tw`text-gray-800`]}>
            {dua.latein}
          </Text>
        </View>
      ) : null}

      <View style={tw`flex-row items-center gap-4 py-4 px-6`}>
        <Pressable onPress={handleShare} accessibilityLabel="Teilen" hitSlop={8}>
          <Ionicons name="share-social-outline" size={20} color={dark ? '#ffffff' : '#1f2937'} />
        </Pressable>
        <Pressable onPress={() => setShowLatein((v) => !v)} accessibilityLabel="Transliteration" hitSlop={8}>
          <Ionicons name="text-outline" size={20} color={dark ? '#ffffff' : '#1f2937'} />
        </Pressable>
        <View style={tw`ml-auto flex-row gap-4`}>
          <Text style={tw`text-[11px] text-neutral-400`}>Hisnul Muslim</Text>
          <Text style={tw`text-[11px] text-neutral-400`}>Kapitel {dua.kapitel_id}</Text>
          <Text style={tw`text-[11px] text-neutral-400`}>Bittgebet {dua.bittgebet_id}</Text>
        </View>
      </View>
    </View>
  );
}

export default Bittgebet;
