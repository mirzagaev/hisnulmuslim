import React, { useState, useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import Bittgebet from '../components/Bittgebete';
import { addFavorite, removeFavorite } from '../redux/slices/favoriteSlice';

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#3f66da',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    marginHorizontal: 15,
    fontWeight: '600',
    fontSize: 12,
    textTransform: "uppercase",
    color: '#ffffff',
    width: 'auto'
  }
});

export default function Bittgebete({ navigation, route }) {
  const { themaId } = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const duas = useSelector((state: RootState) => state.duas.duas);
  let favorite = useSelector((state: RootState) => state.favorites.favorites.find((thema) => thema.id === themaId));

  const handleAddFavorite = (item: { id: number }) => {
    dispatch(addFavorite(item));
  };
  
  const handleRemoveFavorite = (id: number) => {
    dispatch(removeFavorite(id));
  };

  return (
    <ScrollView>
      {favorite ? (
        <Pressable onPress={() => handleRemoveFavorite(themaId)}>entferne Favorite</Pressable>
      ):(
        <Pressable onPress={() => handleAddFavorite({id: themaId})}>Favorite</Pressable>
      )}
      {duas.map((dua, index) => (dua.kapitel_id == themaId) && 
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
      <Pressable onPress={() => navigation.goBack()} style={styles.btn}>Zurück</Pressable>
    </ScrollView>
  );
}