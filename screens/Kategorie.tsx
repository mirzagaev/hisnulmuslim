import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { List, Headline } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

function Kategorie({ nav }) {
  const [catId, setCatId] = React.useState<any>();
  const navigation = useNavigation();

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
      {catId && (<Headline>Kategorie: {catId}</Headline>)}
      <List.Section>
        <List.Subheader>Gedenken am Morgen und am Abend</List.Subheader>
        <List.Item onPress={() => nav.navigate("Bittgebete")} title="Das Gedenken am Morgen und am Abend" />
      </List.Section>
      <List.Section>
        <List.Subheader>Aufstehen</List.Subheader>
        <List.Item title="Das Gedenken beim Erwachen aus dem Schlaf" />
        <List.Item title="Das Gedenken beim Einschlafen" />
        <List.Item title="Bittgebete bei unruhigem Schlaf in der Nacht" />
        <List.Item title="Bittgebet bei Angst / Furcht im Schlaf und Leid wg. Einsamkeit" />
      </List.Section>
    </View>
  );
}

export default Kategorie;