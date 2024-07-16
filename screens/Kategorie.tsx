import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, View, SectionList, StatusBar, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    // marginHorizontal: 16,
  },
  catHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3f66da',
    backgroundColor: '#fff',
    paddingTop: 17,
    paddingBottom: 15,
    paddingHorizontal: 15
  },
  header: {
    fontSize: 14,
    fontWeight: '600',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#9da3b0',
  },
  item: {
    backgroundColor: '#F9F9F9',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderColor: '#E5E5E5',
  },
  title: {
    fontSize: 12,
  },
});

function Kategorie() {
  const kapiteln = useSelector((state: RootState) => state.kapiteln.kapiteln);
  const [kategorie, setKategorie] = useState<any[]>([]);
  const [catId, setCatId] = useState<any>();
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', (e) => {
      const cState: number = navigation.getState().index;
      const cRoute: any = navigation.getState().routes[cState];
      setCatId(cRoute.name);
    });
  
    return unsubscribe;
  }, [catId, navigation]);

  return kapiteln.map((kapitel) => (kapitel.id == catId) &&
    <ScrollView style={styles.container} key={kapitel.id}>
      <Text style={styles.catHeader} key={kapitel.id.toString()}>{kapitel.kategorie}</Text>
      {kapitel.unterkategorien.map((unterkat) => (
        <View key={unterkat.id.toString()}>
          {unterkat.unterkategorie && <Text style={styles.header}>{unterkat.unterkategorie}</Text>}
          {unterkat.themen.map((thema) => (
            <View style={styles.item} key={thema.id.toString()}>
              <Text style={styles.title}>{thema.titel}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

export default Kategorie;