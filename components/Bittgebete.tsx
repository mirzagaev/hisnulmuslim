import React, { useState } from 'react';
import { View, Text, Pressable, Share, Platform } from 'react-native';
import Bittgebete, { DuaContentItem } from '../interfaces/Bittgebet';
import { useAppTheme } from '../theme/ThemeContext';
import VectorIcon from './icons/VectorIcon';
import { stripHtml } from '../utils/richText';
import tw from 'twrnc';

interface DuaCardProps extends Bittgebete {
  color: string;
}

// Ein Bittgebet besteht aus einem oder mehreren Text-Blöcken (Dua/Quran/Hadith/Arabisch,
// jeweils mit optionaler Übersetzung + Umschrift) sowie optionalen Hinweis-/Quelle-Notizen,
// alle in der von den Redakteuren festgelegten Sortierung.
type TextBlock = {
  kind: 'text';
  key: string;
  family: string;
  arabic?: string;
  translation?: string;
  umschrift?: string;
};

type NoteBlock = {
  kind: 'note';
  key: string;
  label: string;
  content: string;
};

type DuaBlock = TextBlock | NoteBlock;

const TEXT_FAMILIES = ['dua', 'quran', 'hadith', 'ar'];
const NOTE_LABELS: Record<string, string> = { hinweis: 'Hinweis', quelle: 'Quelle' };

function familyOf(type: string): string | null {
  return TEXT_FAMILIES.find(
    (family) => type === family || type === `${family}_translation` || type === `${family}_umschrift`
  ) ?? null;
}

function buildBlocks(items: DuaContentItem[] = []): DuaBlock[] {
  const sorted = [...items].sort((a, b) => a.sorting - b.sorting);
  const blocks: DuaBlock[] = [];
  let current: TextBlock | null = null;

  sorted.forEach((item, index) => {
    if (item.type in NOTE_LABELS) {
      blocks.push({ kind: 'note', key: `note-${item.uid ?? index}`, label: NOTE_LABELS[item.type], content: stripHtml(item.content) });
      current = null;
      return;
    }

    const family = familyOf(item.type);
    if (!family) {
      return;
    }

    if (!current || current.family !== family) {
      current = { kind: 'text', key: `block-${item.uid ?? index}`, family };
      blocks.push(current);
    }

    const content = stripHtml(item.content);
    if (item.type === family) current.arabic = content;
    else if (item.type.endsWith('_translation')) current.translation = content;
    else if (item.type.endsWith('_umschrift')) current.umschrift = content;
  });

  return blocks;
}

function Bittgebet(dua: DuaCardProps) {
  const theme = useAppTheme();
  const dark = theme === 'dark';
  const [showLatein, setShowLatein] = useState(false);

  const blocks = buildBlocks(dua.items);
  const hasUmschrift = blocks.some((block) => block.kind === 'text' && block.umschrift);

  const handleShare = () => {
    const text = blocks
      .map((block) =>
        block.kind === 'text'
          ? [block.translation, block.arabic, block.umschrift].filter(Boolean).join('\n')
          : `${block.label}: ${block.content}`
      )
      .filter(Boolean)
      .join('\n\n');
    Share.share({ message: text });
  };

  return (
    <View style={tw`w-full mb-5`}>
      <View style={tw`w-full items-center mb-3`}>
        <VectorIcon name="logo" size={40} color={dark ? '#ffffff' : dua.color} />
      </View>
      <View
        style={[
          tw`w-full rounded-lg overflow-hidden`,
          dark ? tw`bg-black` : tw`bg-white`,
          {
            shadowColor: '#000',
            shadowOpacity: dark ? 0 : 0.12,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 4 },
            elevation: 4,
          },
        ]}
      >
        {blocks.map((block, index) =>
          block.kind === 'text' ? (
            <View
              key={block.key}
              style={index > 0 ? [tw`border-t`, dark ? tw`border-neutral-800` : tw`border-neutral-100`] : undefined}
            >
              {block.translation ? (
                <View style={tw`py-6 px-6 bg-[${dua.color}]`}>
                  <Text style={tw`text-white text-lg leading-7`}>{block.translation}</Text>
                </View>
              ) : null}

              {block.arabic ? (
                <View style={tw`py-6 px-6`}>
                  <Text
                    style={[
                      tw`text-3xl leading-10 text-right`,
                      dark ? tw`text-white` : tw`text-gray-800`,
                      {
                        writingDirection: 'rtl',
                        fontFamily: Platform.select({ ios: 'Damascus', android: 'serif', default: 'serif' }),
                      },
                    ]}
                  >
                    {block.arabic}
                  </Text>
                </View>
              ) : null}

              {block.umschrift && showLatein ? (
                <View style={tw`py-5 px-6`}>
                  <Text
                    style={[
                      tw`italic text-sm border-t pt-5`,
                      dark ? tw`text-white border-neutral-700` : tw`text-gray-800 border-neutral-200`,
                    ]}
                  >
                    {block.umschrift}
                  </Text>
                </View>
              ) : null}
            </View>
          ) : (
            <View
              key={block.key}
              style={[tw`py-4 px-6`, index > 0 && [tw`border-t`, dark ? tw`border-neutral-800` : tw`border-neutral-100`]]}
            >
              <Text style={[tw`text-xs italic`, dark ? tw`text-neutral-400` : tw`text-neutral-500`]}>
                {block.label}: {block.content}
              </Text>
            </View>
          )
        )}
      </View>

      <View style={tw`flex-row items-center gap-4 pt-4 px-6`}>
        <Pressable onPress={handleShare} accessibilityLabel="Teilen" hitSlop={8}>
          <VectorIcon name="share" size={20} color={dark ? '#ffffff' : '#1f2937'} strokeWidth={2} />
        </Pressable>
        {hasUmschrift ? (
          <Pressable
            onPress={() => setShowLatein((v) => !v)}
            style={showLatein ? tw`opacity-100` : tw`opacity-50`}
            accessibilityLabel="Transliteration"
            hitSlop={8}
          >
            <VectorIcon name="transkript" size={20} color={dark ? '#ffffff' : '#1f2937'} />
          </Pressable>
        ) : null}
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
