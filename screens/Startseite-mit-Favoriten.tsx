import React from 'react';
import { View, Text, Image, ImageBackground, ScrollView, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useAppTheme } from '../theme/ThemeContext';
import { buildDuaRouteParams } from '../interfaces/KapitelSchema';
import SubcategoryCard from '../components/SubcategoryCard';
import tw from 'twrnc';

export default function Startseite({ navigation }) {
  const kapiteln = useSelector((state: RootState) => state.kapiteln.kapiteln);
  const themen = useSelector((state: RootState) => state.themen.themen);
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const theme = useAppTheme();
  const dark = theme === 'dark';
  const { width, height } = useWindowDimensions();
  const isWide = width >= 1024;

  const getThema = (themaId: number) => themen.find((thema) => thema.id === themaId);

  const favoriteThemen = favorites
    .map((f) => getThema(f.id))
    .filter((thema): thema is NonNullable<typeof thema> => !!thema);

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
        contentContainerStyle={isWide ? tw`flex-grow p-14` : tw`flex-grow p-7`}
      >
        {favoriteThemen.length > 0 && (
          <View style={[tw`w-full `, isWide && tw`max-w-[640px]`]}>
            <SubcategoryCard
              title="Favoriten"
              items={favoriteThemen.map((thema) => ({ key: thema.id, label: thema.titel }))}
              onSelect={(item) => {
                const thema = favoriteThemen.find((t) => t.id === item.key);
                const kapitel = kapiteln.find((k) => k.id === thema.kategorie);
                navigation.navigate('Bittgebete', buildDuaRouteParams(thema, kapitel?.kategorie, thema.kategorie));
              }}
            />
          </View>
        )}
      </ScrollView>
    </View>
  </View>
  );
}
