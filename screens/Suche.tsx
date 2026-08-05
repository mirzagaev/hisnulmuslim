import React from 'react';
import { View, Text, Image, ImageBackground, ScrollView, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { tabBarStruktur, buildDuaRouteParams } from "../interfaces/KapitelSchema"
import { useAppTheme } from "../theme/ThemeContext";
import SubcategoryCard from '../components/SubcategoryCard';

function Suche({ navigation }) {
  const filteredKapiteln = useSelector((state: RootState) => state.kapiteln.filteredKapiteln);
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
        contentContainerStyle={isWide ? tw`p-5 items-center` : tw`p-5 gap-5`}
      >
        <View style={[tw`w-full gap-5`, isWide && tw`max-w-[800px]`]}>
          {filteredKapiteln.map((kategorie) => {
            const color = tabBarStruktur[String(kategorie.id)]?.colorItem ?? '#3f66da';
            return (
              <View key={kategorie.id} style={tw`gap-4`}>
                <Text style={tw`text-lg font-medium text-[${color}]`}>{kategorie.kategorie}</Text>
                {kategorie.unterkategorien.map((unterkat) => (
                  unterkat.themen.length > 0 &&
                  <SubcategoryCard
                    key={unterkat.id}
                    title={unterkat.unterkategorie}
                    items={unterkat.themen.map((thema) => ({ key: thema.id, label: thema.titel }))}
                    onSelect={(item) => {
                      const thema = unterkat.themen.find((t) => t.id === item.key);
                      navigation.navigate('Bittgebete', buildDuaRouteParams(thema, kategorie.kategorie, kategorie.id));
                    }}
                  />
                ))}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
    </View>
  );
}

export default Suche;
