import * as React from 'react';
import {View, Text} from 'react-native-ui-lib';
import { Button } from 'react-native';
import { List, MD3Colors } from 'react-native-paper';

const Kategorie = ({ navigation }) => (
  <View>
    <List.Section>
      <List.Subheader>Gedenken am Morgen und am Abend</List.Subheader>
      <List.Item onPress={() => navigation.navigate("Bittgebete")} title="Das Gedenken am Morgen und am Abend" />
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

export default Kategorie;