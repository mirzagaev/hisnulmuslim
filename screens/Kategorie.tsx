import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ImageBackground, useWindowDimensions } from 'react-native';
import tw from 'twrnc';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { tabBarStruktur, buildDuaRouteParams } from "../interfaces/KapitelSchema"
import { CATEGORY_COLORS, BRAND } from '../theme/colors';
import { useAppTheme } from "../theme/ThemeContext";
import SubcategoryCard from '../components/SubcategoryCard';

function Kategorie({navigation}) {
  const kapiteln = useSelector((state: RootState) => state.kapiteln.filteredKapiteln);
  // Bei aktiver Suche soll innerhalb einer Kategorie trotzdem über die gesamte
  // Datenbank gesucht werden (wie im Suche-Screen), statt nur innerhalb der
  // gerade geöffneten Kategorie zu filtern.
  const searchTerm = useSelector((state: RootState) => state.kapiteln.searchTerm);
  const isSearching = searchTerm.length >= 2;
  const [catId, setCatId] = useState<any>(1);
  const theme = useAppTheme();
  const dark = theme === 'dark';
  const { width } = useWindowDimensions();
  const isWide = width >= 1024;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', (e) => {
      const cState: number = navigation.getState().index;
      const cRoute: any = navigation.getState().routes[cState];
      setCatId(cRoute.name);
    });

    return unsubscribe;
  }, [catId, navigation]);

  const cat = tabBarStruktur[String(catId)];
  const catColor = CATEGORY_COLORS[String(catId)];

  // Ohne aktive Suche: nur die Themen der gerade geöffneten Kategorie.
  // Mit aktiver Suche: Treffer aus allen Kategorien, mit Kategorienamen als Überschrift.
  const visibleKapiteln = isSearching
    ? kapiteln
    : kapiteln.filter((kapitel) => kapitel.id == catId);

  const list = (
    <ScrollView
      style={tw`flex-1`}
      contentContainerStyle={isWide ? tw`px-5 gap-5` : tw`p-5 gap-5`}
    >
      {visibleKapiteln.map((kapitel) =>
        <View key={kapitel.id} style={tw`gap-5`}>
          {isSearching &&
            <Text style={[tw`text-lg font-medium`, { color: tabBarStruktur[String(kapitel.id)]?.colorItem ?? BRAND.primary }]}>
              {kapitel.kategorie}
            </Text>
          }
          {kapitel.unterkategorien.map((unterkat) => (
            unterkat.themen.length > 0 &&
            <SubcategoryCard
              key={unterkat.id}
              title={unterkat.unterkategorie}
              items={unterkat.themen.map((thema) => ({ key: thema.id, label: thema.titel }))}
              onSelect={(item) => {
                const thema = unterkat.themen.find((t) => t.id === item.key);
                navigation.navigate('Bittgebete', buildDuaRouteParams(thema, kapitel.kategorie, kapitel.id));
              }}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );

  if (isWide) {
    return (
      <View style={[tw`flex-1 flex-row`, dark ? tw`bg-black` : tw`bg-white`]}>
        <View style={tw`flex-1`}>{list}</View>
        <View style={tw`flex-1 p-5`}>
          <ImageBackground
            source={cat.background}
            style={[tw`flex-1 rounded-2xl overflow-hidden h-full w-full`, { backgroundColor: dark ? catColor.dark : catColor.light }]}
            imageStyle={tw`rounded-2xl`}
            resizeMode="cover"
          >
            {dark ? <View style={tw`flex-1 bg-neutral-900/40`} /> : null}
          </ImageBackground>
        </View>
      </View>
    );
  }

  return (
    <ImageBackground
      source={cat.background}
      style={[tw`flex-1 h-full w-full`, { backgroundColor: dark ? catColor.dark : catColor.light }]}
      resizeMode="cover"
    >
      <View style={dark ? tw`flex-1 bg-black/80` : tw`flex-1 bg-[${catColor.light}66]`}>
        {list}
      </View>
    </ImageBackground>
  );
}

export default Kategorie;
