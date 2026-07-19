import React, { useState, useEffect } from 'react';
import { Text, Pressable, ScrollView, View, useWindowDimensions } from 'react-native';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useAppTheme } from "../theme/ThemeContext";
import Bittgebet from '../components/Bittgebete';
import { addFavorite, removeFavorite } from '../redux/slices/favoriteSlice';
import { tabBarStruktur } from '../interfaces/KapitelSchema';
import VectorIcon from '../components/icons/VectorIcon';
import tw from 'twrnc';

export default function Bittgebete({ navigation, route }) {
  const { thema, kategorie, catId } = route.params ?? {};
  const dispatch = useDispatch<AppDispatch>();
  const duas = useSelector((state: RootState) => state.duas.duas);
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const [favorit, setFavorit] = useState<any>();
  const theme = useAppTheme();
  const { width } = useWindowDimensions();
  const isWide = width >= 1024;

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
        <View style={{ paddingHorizontal: 10 }}>
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
    if (!thema) {
      navigation.navigate('Kategorien');
    }
  }, [thema, navigation]);

  if (!thema) {
    return null;
  }

  return (
    <ScrollView
      style={theme === "dark" ? tw`bg-black` : tw`bg-white`}
      contentContainerStyle={isWide ? { alignItems: 'center' } : undefined}
    >
      <View style={{ width: '100%', maxWidth: isWide ? 800 : undefined }}>
        <Text style={[tw`p-5 text-xl font-medium`, { color }, theme === 'dark' && tw`text-white`]}>{thema.titel}</Text>
        <View style={tw`px-5`}>
          {duas.map((dua, index) => (dua.kapitel_id == thema.id) &&
            <Bittgebet
              key={dua.kapitel_id.toString()+index}
              id={dua.id}
              kapitel_id={dua.kapitel_id}
              bittgebet_id={dua.bittgebet_id}
              content={dua.content}
              arabic={dua.arabic}
              latein={dua.latein}
              color={color}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}