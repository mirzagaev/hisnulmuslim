import React from 'react';
import { View, Text, Image, ImageBackground, ScrollView, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useAppTheme } from '../theme/ThemeContext';
import { buildDuaRouteParams } from '../interfaces/KapitelSchema';
import SubcategoryCard from '../components/SubcategoryCard';

export default function Favoriten({ navigation }) {
  const kapiteln = useSelector((state: RootState) => state.kapiteln.kapiteln);
  const themen = useSelector((state: RootState) => state.themen.themen);
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
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

  const getThema = (themaId: number) => themen.find((thema) => thema.id === themaId);

  const favoriteThemen = favorites
    .map((f) => getThema(f.id))
    .filter((thema): thema is NonNullable<typeof thema> => !!thema);

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
          {favoriteThemen.length > 0 ? (
            <SubcategoryCard
              items={favoriteThemen.map((thema) => ({ key: thema.id, label: thema.titel }))}
              onSelect={(item) => {
                const thema = favoriteThemen.find((t) => t.id === item.key);
                const kapitel = kapiteln.find((k) => k.id === thema.kategorie);
                navigation.navigate('Bittgebete', buildDuaRouteParams(thema, kapitel?.kategorie, thema.kategorie));
              }}
            />
          ) : (
            <View style={tw`pt-12 px-4`}>
              <Text style={[tw`text-center text-sm leading-[22px]`, dark ? tw`text-neutral-300` : tw`text-neutral-500`]}>
                Noch keine Favoriten.{"\n"}Tippe im Bittgebet auf das Herz, um es hier zu sammeln.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
    </View>
  );
}
