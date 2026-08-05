import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, Pressable, ScrollView, View, useWindowDimensions } from 'react-native';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useAppTheme } from "../theme/ThemeContext";
import Bittgebet from '../components/Bittgebete';
import { addFavorite, removeFavorite } from '../redux/slices/favoriteSlice';
import { tabBarStruktur, CATEGORY_IDS_BY_SLUG } from '../interfaces/KapitelSchema';
import VectorIcon from '../components/icons/VectorIcon';
import tw from 'twrnc';

export default function Bittgebete({ navigation, route }) {
  const { catSlug, themaId } = route.params ?? {};
  let { thema, kategorie, catId } = route.params ?? {};
  const dispatch = useDispatch<AppDispatch>();
  const duas = useSelector((state: RootState) => state.duas.duas);
  const kapiteln = useSelector((state: RootState) => state.kapiteln);
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const [favorit, setFavorit] = useState<any>();
  const theme = useAppTheme();
  const { width } = useWindowDimensions();
  const isWide = width >= 1024;

  // Deep-Link-Fall (z. B. Kaltstart über "kategorie/alltag/4"): nur catSlug/themaId
  // sind bekannt, das eigentliche Thema fehlt noch. Es wird aus den geladenen
  // Kapitel-Daten aufgelöst, sobald diese verfügbar sind.
  const isDeepLink = !thema && !!catSlug && themaId != null;
  const isResolving = isDeepLink && kapiteln.status !== 'succeeded' && kapiteln.status !== 'failed';

  if (isDeepLink && !isResolving) {
    const resolvedCatId = CATEGORY_IDS_BY_SLUG[catSlug];
    const kapitel = kapiteln.kapiteln.find((k) => String(k.id) === resolvedCatId);
    const resolvedThema = kapitel?.unterkategorien
      .flatMap((u) => u.themen)
      .find((t) => t.id === Number(themaId));

    if (resolvedThema) {
      thema = resolvedThema;
      kategorie = kapitel.kategorie;
      catId = kapitel.id;
    }
  }

  useEffect(() => {
    if (!thema) return;
    const favorit = favorites.find((th: any) => th.id === thema.id);
    setFavorit(favorit);
  }, [favorites, thema]);

  const handleAddFavorite = (item: { id: number }) => {
    dispatch(addFavorite(item));
  };
  
  const handleRemoveFavorite = (id: number) => {
    dispatch(removeFavorite(id));
  };

  const color = tabBarStruktur[String(catId)]?.colorItem ?? '#3f66da';

  useEffect(() => {
    if (!thema) return;
    navigation.setOptions({
      title: kategorie,
      headerRight: () => (
        <View style={tw`px-[10px]`}>
          {favorit ? (
            <Pressable onPress={() => handleRemoveFavorite(thema.id)} hitSlop={8}>
              <VectorIcon name="fav" size={24} color={color} />
            </Pressable>
          ):(
            <Pressable onPress={() => handleAddFavorite({id: thema.id})} hitSlop={8}>
              <VectorIcon name="fav-inactive" size={24} color={theme === 'dark' ? '#ffffff' : '#1f2937'} />
            </Pressable>
          )}
        </View>
      )
    });
  }, [navigation, kategorie, favorit, thema, theme]);

  useEffect(() => {
    // Solange ein Deep-Link noch auf die Kapitel-Daten wartet, nicht wegnavigieren.
    if (thema || isResolving) return;
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Kategorien');
    }
  }, [thema, isResolving, navigation]);

  if (isResolving) {
    return (
      <View
        style={[
          tw`flex-1 items-center justify-center`,
          theme === 'dark' ? tw`bg-neutral-900` : tw`bg-neutral-100`,
        ]}
      >
        <ActivityIndicator color={theme === 'dark' ? '#ffffff' : '#3f66da'} />
      </View>
    );
  }

  if (!thema) {
    return null;
  }

  return (
    <ScrollView
      style={theme === "dark" ? tw`bg-neutral-900` : tw`bg-neutral-100`}
      contentContainerStyle={isWide ? tw`items-center` : undefined}
    >
      <View style={[tw`w-full`, isWide && tw`max-w-[800px]`]}>
        <Text style={[tw`p-5 text-xl font-medium`, { color }, theme === 'dark' && tw`text-white`]}>{thema.titel}</Text>
        <View style={tw`px-5`}>
          {duas.map((dua, index) => (dua.kapitel_id == thema.id) &&
            <Bittgebet
              key={dua.kapitel_id.toString()+index}
              id={dua.id}
              kapitel_id={dua.kapitel_id}
              bittgebet_id={dua.bittgebet_id}
              items={dua.items}
              color={color}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}