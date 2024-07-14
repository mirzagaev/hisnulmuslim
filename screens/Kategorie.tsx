import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, View, SectionList, StatusBar, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getKategorieData } from '../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { fetchKapiteln } from '../redux/slices/kapitelSlice';
import { AppDispatch, RootState } from '../redux/store';

const DATA = [
  // {
  //   title: 'Gedenken am Morgen und am Abend',
  //   data: ['Das Gedenken am Morgen und am Abend'],
  // },
  // {
  //   title: 'Aufstehen',
  //   data: [
  //     'Das Gedenken beim Erwachen aus dem Schlaf',
  //     'Das Gedenken beim Einschlafen',
  //     'Bittgebete bei unruhigem Schlaf in der Nacht',
  //     'Bittgebet bei Angst / Furcht im Schlaf und Leid wg. Einsamkeit'
  //   ],
  // },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  catHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3f66da',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 15
  },
  header: {
    fontSize: 14,
    fontWeight: '600',
    paddingTop: 15,
    paddingBottom: 7,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  item: {
    // backgroundColor: '#f9c2ff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#9da3b0',
  },
  title: {
    fontSize: 12,
  },
});

function renderSwitch(param) {
  switch(param) {
    case "1":
      return 'Alltag';
    case "2":
      return 'Gebet';
    case "3":
      return 'Reisen';
    case "4":
      return 'Schutz';
    case "5":
      return 'Hilfe';
    case "6":
      return 'Trauer';
    case "7":
      return 'Pilgerfahrt';
    default:
      return 'Nicht gefunden';
  }
}

function KategorieMysql({ nav }) {
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

  useEffect(() => {
    fetchKategorie(catId);
  }, [catId]);

  const fetchKategorie = async (id: number) => {
    const data = await getKategorieData(id);
    // console.log("Kategorie", data["Bittgebete"]);
    setKategorie(data);
  };

  return (
    <ScrollView>
      {catId && 
        <Text style={styles.catHeader}>{renderSwitch(catId)}</Text>
      }

      <FlatList
        data={kategorie}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.content}</Text>
          </View>
        )}
      />

      {/* <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
      /> */}
    </ScrollView>
  );
}

function Kategorie() {
  const [name, setName] = React.useState('');
  const dispatch = useDispatch<AppDispatch>();
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

  useEffect(() => {
    if(catId!==undefined){
      dispatch(fetchKapiteln(catId));
    }
  }, [catId]);

  return (
    <View style={styles.container}>
    {catId && 
      <Text style={styles.catHeader}>{renderSwitch(catId)}</Text>
    }
      <FlatList
        data={kapiteln}
        keyExtractor={(kapitel) => kapitel.id.toString()}
        renderItem={({ item }) => <Text>{item.titel}</Text>}
      />
    </View>
  );
}

export default Kategorie;