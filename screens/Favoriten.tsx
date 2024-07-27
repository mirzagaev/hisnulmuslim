import React from 'react';
import { Pressable, FlatList, StyleSheet, ScrollView, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { Banner } from 'react-native-paper';

export default function Favoriten({ navigation }) {
  const dispatch = useDispatch<AppDispatch>();
  const kapiteln = useSelector((state: RootState) => state.kapiteln.kapiteln);
  const themen = useSelector((state: RootState) => state.themen.themen);
  const favorites = useSelector((state: RootState) => state.favorites.favorites);

  const getThema = (themaId: number) => {
    return themen.find((thema) => thema.id === themaId);
  }

  return (
    <ScrollView>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item, index) => item.id.toString()+index}
          renderItem={({ item }, thema = getThema(item.id)) => (
            <Pressable
              onPress={
                () => {
                  navigation.navigate('Bittgebete', {
                    thema: thema,
                    kategorie: kapiteln.find((kapitel: any) => kapitel.id === thema.kategorie).kategorie
                  })
                }
              }
              style={styles.item}
              key={thema.id.toString()}
            >
              <Text style={styles.title}>{thema.titel}</Text>
            </Pressable>
          )}
        />
      ):(
        <Banner visible={true}>Keine Favoriten gefunden.</Banner>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    backgroundColor: '#F9F9F9',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderColor: '#E5E5E5',
  },
  title: {
    fontSize: 13,
  },
});