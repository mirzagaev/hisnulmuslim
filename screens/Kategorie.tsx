import * as React from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  SectionList,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DATA = [
  {
    title: 'Gedenken am Morgen und am Abend',
    data: ['Das Gedenken am Morgen und am Abend'],
  },
  {
    title: 'Aufstehen',
    data: [
      'Das Gedenken beim Erwachen aus dem Schlaf',
      'Das Gedenken beim Einschlafen',
      'Bittgebete bei unruhigem Schlaf in der Nacht',
      'Bittgebet bei Angst / Furcht im Schlaf und Leid wg. Einsamkeit'
    ],
  },
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
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderColor: '#3f66da',
    // borderTopWidth: 2,
    borderBottomWidth: 2,
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

function Kategorie({ nav }) {
  const [catId, setCatId] = React.useState<any>();
  const navigation = useNavigation();

  // navigation.setOptions({ title: "Ayyd" });

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', (e) => {
      const cState: number = navigation.getState().index;
      const cRoute: any = navigation.getState().routes[cState];
      setCatId(cRoute.name);
    });
  
    return unsubscribe;
  }, [catId, navigation]);

  return (
    <View>
      {catId && 
        <Text style={styles.catHeader}>{renderSwitch(catId)}</Text>
      }

      <SectionList
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
      />
    </View>
  );
}

export default Kategorie;