import React from 'react';
import { View, Text, Image, ImageBackground, ScrollView, Platform, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';
import { useAppTheme } from '../theme/ThemeContext';

interface Buchstabe {
  umschrift: string;
  isoliert: string;
  anfang?: string;
  mitte?: string;
  ende?: string;
  aussprache: string;
}

const BUCHSTABEN: Buchstabe[] = [
  { umschrift: 'ʾ', isoliert: 'ء', anfang: 'ء', mitte: 'ء', ende: 'ء', aussprache: 'Verschlusslaut wie zwischen be – achten' },
  { umschrift: 'a, ā, i, u', isoliert: 'ا', anfang: 'ا', mitte: 'ـا', ende: 'ـا', aussprache: 'a' },
  { umschrift: 'b', isoliert: 'ب', anfang: 'بـ', mitte: 'ـبـ', ende: 'ـب', aussprache: 'b' },
  { umschrift: 't', isoliert: 'ت', anfang: 'تـ', mitte: 'ـتـ', ende: 'ـت', aussprache: 't' },
  { umschrift: 'ṯ', isoliert: 'ث', anfang: 'ثـ', mitte: 'ـثـ', ende: 'ـث', aussprache: 'stimmloses englisches „th“ wie in „thank“' },
  { umschrift: 'ǧ', isoliert: 'ج', anfang: 'جـ', mitte: 'ـجـ', ende: 'ـج', aussprache: 'stimmhaftes dsch' },
  { umschrift: 'ḥ', isoliert: 'ح', anfang: 'حـ', mitte: 'ـحـ', ende: 'ـح', aussprache: 'h-Laut, der mit Luftdruck aus der Kehle gepresst wird – hat keine Entsprechung im Deutschen' },
  { umschrift: 'ḫ', isoliert: 'خ', anfang: 'خـ', mitte: 'ـخـ', ende: 'ـخ', aussprache: 'ch wie in „Bach“' },
  { umschrift: 'd', isoliert: 'د', anfang: 'د', mitte: 'ـد', ende: 'ـد', aussprache: 'd' },
  { umschrift: 'ḏ', isoliert: 'ذ', anfang: 'ذ', mitte: 'ـذ', ende: 'ـذ', aussprache: 'stimmhaftes englisches „th“ wie in „that“' },
  { umschrift: 'r', isoliert: 'ر', anfang: 'ر', mitte: 'ـر', ende: 'ـر', aussprache: 'Zungen-R' },
  { umschrift: 'z', isoliert: 'ز', anfang: 'ز', mitte: 'ـز', ende: 'ـز', aussprache: 'stimmhaftes s wie in „Salz“' },
  { umschrift: 's', isoliert: 'س', anfang: 'سـ', mitte: 'ـسـ', ende: 'ـس', aussprache: 'stimmloses s wie in „Smog“ oder „Klasse“' },
  { umschrift: 'š', isoliert: 'ش', anfang: 'شـ', mitte: 'ـشـ', ende: 'ـش', aussprache: 'sch wie in „Schule“' },
  { umschrift: 'ṣ', isoliert: 'ص', anfang: 'صـ', mitte: 'ـصـ', ende: 'ـص', aussprache: 'mit versteifter Zunge artikuliertes starkes s – hat keine Entsprechung im Deutschen' },
  { umschrift: 'ḍ', isoliert: 'ض', anfang: 'ضـ', mitte: 'ـضـ', ende: 'ـض', aussprache: 'mit versteifter Zunge artikuliertes starkes d – hat keine Entsprechung im Deutschen' },
  { umschrift: 'ṭ', isoliert: 'ط', anfang: 'طـ', mitte: 'ـطـ', ende: 'ـط', aussprache: 'mit versteifter Zunge artikuliertes starkes t – hat keine Entsprechung im Deutschen' },
  { umschrift: 'ẓ', isoliert: 'ظ', anfang: 'ظـ', mitte: 'ـظـ', ende: 'ـظ', aussprache: 'mit versteifter Zunge artikuliertes stimmhaftes, starkes „th“ wie im englischen „the“ – hat ebenfalls keine deutsche oder englische Entsprechung' },
  { umschrift: 'ʿ', isoliert: 'ع', anfang: 'عـ', mitte: 'ـعـ', ende: 'ـع', aussprache: 'im Kehlkopf erzeugter stimmhafter Reibelaut – hat keine Entsprechung im Deutschen' },
  { umschrift: 'ġ', isoliert: 'غ', anfang: 'غـ', mitte: 'ـغـ', ende: 'ـغ', aussprache: 'im Rachen gebildeter stimmhafter Reibelaut ch, das ähnlich wie das „r“ im französisch ausgesprochenen „Paris“ klingt' },
  { umschrift: 'f', isoliert: 'ف', anfang: 'فـ', mitte: 'ـفـ', ende: 'ـف', aussprache: 'f' },
  { umschrift: 'q', isoliert: 'ق', anfang: 'قـ', mitte: 'ـقـ', ende: 'ـق', aussprache: 'ein tief klingender k-Laut, der am Gaumenzäpfchen gebildet wird – hat keine Entsprechung im Deutschen' },
  { umschrift: 'k', isoliert: 'ك', anfang: 'كـ', mitte: 'ـكـ', ende: 'ـك', aussprache: 'k' },
  { umschrift: 'l', isoliert: 'ل', anfang: 'لـ', mitte: 'ـلـ', ende: 'ـل', aussprache: 'l' },
  { umschrift: 'm', isoliert: 'م', anfang: 'مـ', mitte: 'ـمـ', ende: 'ـم', aussprache: 'm' },
  { umschrift: 'n', isoliert: 'ن', anfang: 'نـ', mitte: 'ـنـ', ende: 'ـن', aussprache: 'n' },
  { umschrift: 'h', isoliert: 'ه', anfang: 'هـ', mitte: 'ـهـ', ende: 'ـه', aussprache: 'h' },
  { umschrift: 'w, u, ū', isoliert: 'و', anfang: 'و', mitte: 'ـو', ende: 'ـو', aussprache: 'englisches „w“ wie in „white“ oder „wow“' },
  { umschrift: 'y, ī, i', isoliert: 'ي', anfang: 'يـ', mitte: 'ـيـ', ende: 'ـي', aussprache: 'j, i' },
  { umschrift: '-t, -a, -h', isoliert: 'ة', ende: 'ـة', aussprache: 'Nur am Wortende: -t, -a, -h' },
  { umschrift: '-ā', isoliert: 'ى', ende: 'ـى', aussprache: 'a' },
];

const HINWEISE = [
  { label: 'Lang ausgesprochene Vokale:', text: 'ā, ī, ū' },
  { label: 'Kurz ausgesprochene Vokale:', text: 'a, i, u' },
  {
    label: 'Šadda-Zeichen:',
    text: 'Doppelt geschriebene Konsonanten werden verlängert bzw. verstärkt ausgesprochen, indem kurz auf ihm verharrt wird.',
  },
];

const arabicFont = Platform.select({ ios: 'Damascus', android: 'serif', default: 'serif' });

function ArabicForm({ label, value, dark }: { label: string; value?: string; dark: boolean }) {
  return (
    <View style={tw`flex-1 items-center`}>
      <Text style={[tw`text-[11px] mb-1`, dark ? tw`text-neutral-400` : tw`text-neutral-500`]}>{label}</Text>
      <Text
        style={[
          tw`text-xl`,
          dark ? tw`text-white` : tw`text-gray-800`,
          { writingDirection: 'rtl', fontFamily: arabicFont },
        ]}
      >
        {value ?? '–'}
      </Text>
    </View>
  );
}

function BuchstabeCard({ item, dark }: { item: Buchstabe; dark: boolean }) {
  return (
    <View
      style={[
        tw`w-full rounded-md border overflow-hidden mb-3 px-4 py-3`,
        dark ? tw`border-neutral-800 bg-black/60` : tw`border-neutral-200 bg-neutral-100/80`,
      ]}
    >
      <View style={tw`flex-row items-center justify-between mb-3`}>
        <Text style={[tw`text-lg font-bold`, dark ? tw`text-white` : tw`text-gray-900`]}>{item.umschrift}</Text>
        <Text
          style={[
            tw`text-2xl`,
            dark ? tw`text-white` : tw`text-gray-800`,
            { writingDirection: 'rtl', fontFamily: arabicFont },
          ]}
        >
          {item.isoliert}
        </Text>
      </View>
      <View style={[tw`flex-row border-t pt-3 mb-3`, dark ? tw`border-neutral-800` : tw`border-neutral-200`]}>
        <ArabicForm label="am Anfang" value={item.anfang} dark={dark} />
        <ArabicForm label="in der Mitte" value={item.mitte} dark={dark} />
        <ArabicForm label="am Ende" value={item.ende} dark={dark} />
      </View>
      <Text style={[tw`text-[13px] leading-5`, dark ? tw`text-neutral-300` : tw`text-neutral-600`]}>
        {item.aussprache}
      </Text>
    </View>
  );
}

export default function Transkript() {
  const theme = useAppTheme();
  const dark = theme === 'dark';
  const { width, height } = useWindowDimensions();
  const isWide = width >= 1024;

  const CASTLE_ASPECT = 823 / 1104;
  const contentWidth = width - (isWide ? 20 : 0);
  const contentHeight = height - (isWide ? 40 : 0);
  let castleWidth = contentWidth * 0.4;
  let castleHeight = castleWidth / CASTLE_ASPECT;
  if (castleHeight > contentHeight) {
    castleHeight = contentHeight;
    castleWidth = castleHeight * CASTLE_ASPECT;
  }

  return (
    <View style={[tw`w-full h-full`, isWide && tw`py-5 pr-5`, dark ? tw`bg-black` : tw`bg-white`]}>
    <View style={[tw`w-full h-full overflow-hidden relative bg-white`, isWide && tw`rounded-2xl`]}>
      {isWide ? (
        <Image
          source={require('../assets/backgrounds/startseite_xl.jpg')}
          style={[tw`absolute right-0 bottom-0`, { width: castleWidth, height: castleHeight }]}
          resizeMode="contain"
        />
      ) : (
        <ImageBackground
          source={require('../assets/backgrounds/startseite.jpg')}
          style={tw`absolute inset-0 w-full h-full`}
          resizeMode="cover"
        />
      )}
      {dark ? (
        <LinearGradient
          colors={['rgba(23,23,23,0.95)', 'rgba(23,23,23,0.8)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={tw`absolute inset-0`}
        />
      ) : (
        <View style={tw`absolute inset-0 bg-neutral-100/55`} />
      )}
      <ScrollView
        style={tw`w-full h-full`}
        contentContainerStyle={isWide ? tw`p-5 items-center` : tw`p-5`}
      >
        <View style={[tw`w-full`, isWide && tw`max-w-[800px]`]}>
          <Text style={[tw`text-sm leading-5 mb-5`, dark ? tw`text-neutral-300` : tw`text-neutral-600`]}>
            Diese Tabelle erklärt die Umschrift (Transkription), mit der die arabischen Buchstaben in den
            lateinischen Aussprachehilfen der Bittgebete wiedergegeben werden.
          </Text>

          {BUCHSTABEN.map((item, i) => (
            <BuchstabeCard key={i} item={item} dark={dark} />
          ))}

          <View
            style={[
              tw`w-full rounded-md border overflow-hidden mt-2 mb-8 px-4 py-3`,
              dark ? tw`border-neutral-800 bg-black/60` : tw`border-neutral-200 bg-neutral-100/80`,
            ]}
          >
            {HINWEISE.map((hinweis, i) => (
              <Text
                key={hinweis.label}
                style={[
                  tw`text-[13px] leading-5`,
                  dark ? tw`text-neutral-300` : tw`text-neutral-600`,
                  i > 0 && tw`mt-2`,
                ]}
              >
                <Text style={[tw`font-semibold`, dark ? tw`text-white` : tw`text-gray-900`]}>{hinweis.label}</Text>
                {' '}
                {hinweis.text}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
    </View>
  );
}
