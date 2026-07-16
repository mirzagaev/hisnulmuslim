import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { tabBarStruktur } from "../interfaces/KapitelSchema"
import { useAppTheme } from "../navigation/AppNavigation";
import SubcategoryCard from '../components/SubcategoryCard';

function Suche({ navigation }) {
  const filteredKapiteln = useSelector((state: RootState) => state.kapiteln.filteredKapiteln);
  const theme = useAppTheme();
  const dark = theme === 'dark';

  return (
    <ScrollView style={{ flex: 1, backgroundColor: dark ? '#000000' : '#ffffff' }} contentContainerStyle={{ padding: 20, gap: 20 }}>
      {filteredKapiteln.map((kategorie) => {
        const color = tabBarStruktur[String(kategorie.id)]?.colorItem ?? '#3f66da';
        return (
          <View key={kategorie.id} style={{ gap: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: '500', color }}>{kategorie.kategorie}</Text>
            {kategorie.unterkategorien.map((unterkat) => (
              unterkat.themen.length > 0 &&
              <SubcategoryCard
                key={unterkat.id}
                title={unterkat.unterkategorie}
                color={color}
                items={unterkat.themen.map((thema) => ({ key: thema.id, label: thema.titel }))}
                onSelect={(item) => {
                  const thema = unterkat.themen.find((t) => t.id === item.key);
                  navigation.navigate('Bittgebete', {
                    thema,
                    kategorie: kategorie.kategorie,
                    catId: kategorie.id,
                  });
                }}
              />
            ))}
          </View>
        );
      })}
    </ScrollView>
  );
}

export default Suche;
