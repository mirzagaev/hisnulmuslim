import React, { useState, useEffect } from 'react';
import { Text, Image, Pressable, ScrollView } from 'react-native';
import { View } from 'react-native-ui-lib';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import Bittgebet from '../components/Bittgebete';
import { addFavorite, removeFavorite } from '../redux/slices/favoriteSlice';
import tw from 'twrnc';

export default function Bittgebete({ navigation, route }) {
  const { thema, kategorie } = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const duas = useSelector((state: RootState) => state.duas.duas);
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const [favorit, setFavorit] = useState<any>();

  useEffect(() => {
    const favorit = favorites.find((th: any) => th.id === thema.id); 
    setFavorit(favorit);
  }, [favorites, thema]);

  const handleAddFavorite = (item: { id: number }) => {
    dispatch(addFavorite(item));
  };
  
  const handleRemoveFavorite = (id: number) => {
    dispatch(removeFavorite(id));
  };

  useEffect(() => {
    navigation.setOptions({
      title: kategorie,
      headerRight: () => (
        <View paddingH-10>
          {favorit ? (
            <Pressable onPress={() => handleRemoveFavorite(thema.id)}>
              <Image
                style={{ width: 30, height: 30 }}
                source={require('../assets/icons/00-active.png')}
              />
            </Pressable>
          ):(
            <Pressable onPress={() => handleAddFavorite({id: thema.id})}>
              <Image
                style={{ width: 30, height: 30 }}
                source={require('../assets/icons/00-inactive.png')}
              />
            </Pressable>
          )}
        </View>
      )
    });
  }, [navigation, kategorie, favorit, thema]);

  return (
    <ScrollView style={tw`bg-white`}>
      <Text style={tw`p-5 text-base font-title font-medium`}>{thema.titel}</Text>
      {duas.map((dua, index) => (dua.kapitel_id == thema.id) && 
        <Bittgebet
          key={dua.kapitel_id.toString()+index}
          id={dua.id}
          kapitel_id={dua.kapitel_id}
          bittgebet_id={dua.bittgebet_id}
          content={dua.content}
          arabic={dua.arabic}
          latein={dua.latein}
        />
      )}
    </ScrollView>
  );
}