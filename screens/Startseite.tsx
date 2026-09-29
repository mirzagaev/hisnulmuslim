import React, { useState } from 'react';
import { View, Text, Image, ImageBackground, ScrollView, Pressable, LayoutAnimation, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useAppTheme } from '../theme/ThemeContext';
import { buildDuaRouteParams } from '../interfaces/KapitelSchema';
import tw from 'twrnc';

export default function Startseite({ navigation }) {
  const kapiteln = useSelector((state: RootState) => state.kapiteln.kapiteln);
  const themen = useSelector((state: RootState) => state.themen.themen);
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const theme = useAppTheme();
  const dark = theme === 'dark';
  const { width, height } = useWindowDimensions();
  const isWide = width >= 1024;
  const [favoritenOffen, setFavoritenOffen] = useState(false);

  const toggleFavoriten = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setFavoritenOffen((open) => !open);
  };

  const getThema = (themaId: number) => themen.find((thema) => thema.id === themaId);

  const favoriteThemen = favorites
    .map((f) => getThema(f.id))
    .filter((thema): thema is NonNullable<typeof thema> => !!thema);

  const FOOTER_BAR_HEIGHT = isWide ? 64 : 56;

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
  <View
    style={[
      tw`w-full h-full `,
      isWide && tw`py-5 pr-5`,
      theme === "dark" ? tw`bg-black` : tw`bg-white`
    ]}
  >
    <View
      style={[
        tw`w-full h-full overflow-hidden relative bg-white`,
        isWide && tw`rounded-2xl`,
      ]}
    >
      <ImageBackground
        source={isWide ? require('../assets/backgrounds/startseite_xl.jpg') : require('../assets/backgrounds/startseite.jpg')}
        style={tw`absolute inset-0 w-full h-full`}
        resizeMode="cover"
      />
      {dark ? (
        <LinearGradient
          colors={['rgba(23,23,23,0.95)', 'rgba(23,23,23,0.8)']}
          start={isWide ? { x: 0, y: 0 } : { x: 0, y: 0 }}
          end={isWide ? { x: 1, y: 0 } : { x: 0, y: 1 }}
          style={tw`absolute inset-0`}
        />
      ) : (
        <LinearGradient
          colors={['rgba(241, 241, 241, 0.5)', 'rgba(226, 226, 226, 0.5)']}
          start={isWide ? { x: 0, y: 0 } : { x: 0, y: 1 }}
          end={isWide ? { x: 1, y: 0 } : { x: 0, y: 0 }}
          style={tw`absolute inset-0`}
        />
      )}
      <ScrollView
        style={tw`w-full h-full`}
        contentContainerStyle={[
          isWide ? tw`flex-grow p-14` : tw`flex-grow p-7`,
          favoriteThemen.length > 0 && { paddingBottom: FOOTER_BAR_HEIGHT + (isWide ? 24 : 16) },
        ]}
      >
        <Text
          style={[
            tw`font-light mb-4`,
            isWide ? tw`text-[56px] leading-[64px]` : tw`text-[34px] leading-10`,
            dark ? tw`text-white` : tw`text-[#3f66da]`,
          ]}
        >
          {'Salam Alaikum und\nHerzlich Willkommen!'}
        </Text>
      </ScrollView>
      {favoriteThemen.length > 0 && (
        <View
          style={[
            tw`absolute left-0 right-0 bottom-0 rounded-2xl overflow-hidden`,
            isWide ? tw`my-5 mx-14` : tw`m-3`,
            dark ? tw`bg-black/85 border-neutral-800` : tw`bg-white/90 border-neutral-200`,
          ]}
        >
          <Pressable
            onPress={toggleFavoriten}
            style={[
              tw`flex-row items-center justify-between`,
              isWide ? tw`px-6` : tw`px-5`,
              { height: FOOTER_BAR_HEIGHT },
            ]}
          >
            <View style={tw`flex-row items-center justify-center`}>
              <Image source={require('../assets/icons/00-active.png')} style={tw`w-[22px] h-[22px] mr-4`} />
              <Text style={[tw`text-lg font-semibold`, dark ? tw`text-white` : tw`text-gray-800`]}>
                Favoriten
              </Text>
            </View>
            <Ionicons
              name={favoritenOffen ? 'chevron-down' : 'chevron-up'}
              size={22}
              color={dark ? '#ffffff' : '#1f2937'}
            />
          </Pressable>
          {favoritenOffen && (
            <ScrollView
              style={{ maxHeight: height * 0.45 }}
              contentContainerStyle={isWide ? tw`pb-4` : tw`pb-1`}
            >
              {favoriteThemen.map((thema) => (
                <Pressable
                  key={thema.id}
                  onPress={() => {
                    const kapitel = kapiteln.find((k) => k.id === thema.kategorie);
                    navigation.navigate('Bittgebete', buildDuaRouteParams(thema, kapitel?.kategorie, thema.kategorie));
                  }}
                  style={({ pressed }) => [
                    tw`flex-row items-center justify-between py-3`,
                    isWide ? tw`px-16` : tw`px-5`,
                    pressed ? tw`bg-neutral-300/30` : tw`bg-transparent`,
                  ]}
                >
                  <Text style={[tw`flex-1 text-sm leading-5`, dark ? tw`text-white` : tw`text-gray-800`]}>
                    {thema.titel}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          )}
        </View>
      )}
    </View>
  </View>
  );
}
