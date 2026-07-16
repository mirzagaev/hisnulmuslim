import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useAppTheme } from '../navigation/AppNavigation';
import SubcategoryCard from '../components/SubcategoryCard';
import { BRAND } from '../theme/colors';

export default function Favoriten({ navigation }) {
  const kapiteln = useSelector((state: RootState) => state.kapiteln.kapiteln);
  const themen = useSelector((state: RootState) => state.themen.themen);
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const theme = useAppTheme();
  const dark = theme === 'dark';

  const getThema = (themaId: number) => themen.find((thema) => thema.id === themaId);

  const favoriteThemen = favorites
    .map((f) => getThema(f.id))
    .filter((thema): thema is NonNullable<typeof thema> => !!thema);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: dark ? '#000000' : '#ffffff' }} contentContainerStyle={{ padding: 20 }}>
      {favoriteThemen.length > 0 ? (
        <SubcategoryCard
          title="Gesammelte Bittgebete"
          color={BRAND.primary}
          items={favoriteThemen.map((thema) => ({ key: thema.id, label: thema.titel }))}
          onSelect={(item) => {
            const thema = favoriteThemen.find((t) => t.id === item.key);
            const kapitel = kapiteln.find((k) => k.id === thema.kategorie);
            navigation.navigate('Bittgebete', {
              thema,
              kategorie: kapitel?.kategorie,
              catId: thema.kategorie,
            });
          }}
        />
      ) : (
        <View style={{ paddingTop: 48, paddingHorizontal: 16 }}>
          <Text style={{ textAlign: 'center', fontSize: 14, lineHeight: 22, color: dark ? '#d4d4d4' : '#737373' }}>
            Noch keine Favoriten.{"\n"}Tippe im Bittgebet auf das Herz, um es hier zu sammeln.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
