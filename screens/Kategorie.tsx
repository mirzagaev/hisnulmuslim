import React, { useState, useEffect } from 'react';
import { View, ScrollView, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { tabBarStruktur } from "../interfaces/KapitelSchema"
import { useAppTheme } from "../navigation/AppNavigation";
import SubcategoryCard from '../components/SubcategoryCard';

function Kategorie({navigation}) {
  const kapiteln = useSelector((state: RootState) => state.kapiteln.kapiteln);
  const [catId, setCatId] = useState<any>(1);
  const theme = useAppTheme();
  const dark = theme === 'dark';

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', (e) => {
      const cState: number = navigation.getState().index;
      const cRoute: any = navigation.getState().routes[cState];
      setCatId(cRoute.name);
    });

    return unsubscribe;
  }, [catId, navigation]);

  const cat = tabBarStruktur[String(catId)];

  return (
    <ImageBackground source={cat.background} style={{ flex: 1 }} resizeMode="cover">
      <View
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: dark ? 'rgba(0,0,0,0.86)' : 'rgba(255,255,255,0.6)',
        }}
      />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, gap: 16 }}>
        {kapiteln.map((kapitel) => (kapitel.id == catId) &&
          <View key={catId} style={{ gap: 16 }}>
            {kapitel.unterkategorien.map((unterkat) => (
              unterkat.themen.length > 0 &&
              <SubcategoryCard
                key={unterkat.id}
                title={unterkat.unterkategorie}
                color={cat.colorItem}
                items={unterkat.themen.map((thema) => ({ key: thema.id, label: thema.titel }))}
                onSelect={(item) => {
                  const thema = unterkat.themen.find((t) => t.id === item.key);
                  navigation.navigate('Bittgebete', {
                    thema,
                    kategorie: kapitel.kategorie,
                    catId: kapitel.id,
                  });
                }}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
}

export default Kategorie;
