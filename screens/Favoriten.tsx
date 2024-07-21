import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { removeFavorite } from '../redux/slices/favoriteSlice';
import { Banner, List } from 'react-native-paper';

export default function Favoriten({ navigation }) {
  const dispatch = useDispatch<AppDispatch>();
  const themen = useSelector((state: RootState) => state.themen.themen);
  const favorites = useSelector((state: RootState) => state.favorites.favorites);

  const handleRemoveFavorite = (id: number) => {
    dispatch(removeFavorite(id));
  };

  const getThema = (themaId: number) => {
    return themen.find((thema) => thema.id === themaId);
  }

  return (
    <View>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item, index) => item.id.toString()+index}
          renderItem={({ item }, thema = getThema(item.id)) => (
            <List.Item
              title={thema.titel}
              description={undefined}
              right={props => <List.Icon {...props} icon="star" />}
            />
            // <View style={styles.item}>
            //   <Pressable
            //     onPress={
            //       () => {
            //         navigation.navigate('Bittgebete', {
            //           themaId: thema.id
            //         })
            //       }
            //     }
            //     style={styles.item}
            //     key={thema.id.toString()}
            //   >{thema.titel}</Pressable>
            //   <Pressable onPress={() => handleRemoveFavorite(item.id)}>Remove</Pressable>
            // </View>
          )}
        />
      ):(
        <Banner visible={true}>Keine Favoriten gefunden.</Banner>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});
