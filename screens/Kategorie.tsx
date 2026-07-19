import React, { useState, useEffect } from 'react';
import { View, ScrollView, ImageBackground, useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { tabBarStruktur } from "../interfaces/KapitelSchema"
import { CATEGORY_COLORS } from '../theme/colors';
import { useAppTheme } from "../theme/ThemeContext";
import SubcategoryCard from '../components/SubcategoryCard';

function Kategorie({navigation}) {
  const kapiteln = useSelector((state: RootState) => state.kapiteln.kapiteln);
  const [catId, setCatId] = useState<any>(1);
  const theme = useAppTheme();
  const dark = theme === 'dark';
  const { width } = useWindowDimensions();
  const isWide = width >= 1024;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', (e) => {
      const cState: number = navigation.getState().index;
      const cRoute: any = navigation.getState().routes[cState];
      setCatId(cRoute.name);
    });

    return unsubscribe;
  }, [catId, navigation]);

  const cat = tabBarStruktur[String(catId)];
  const catColor = CATEGORY_COLORS[String(catId)];

  const list = (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={isWide ? { paddingHorizontal: 20, gap: 20 } : { padding: 20, gap: 20 }}
    >
      {kapiteln.map((kapitel) => (kapitel.id == catId) &&
        <View key={catId} style={{ gap: 20 }}>
          {kapitel.unterkategorien.map((unterkat) => (
            unterkat.themen.length > 0 &&
            <SubcategoryCard
              key={unterkat.id}
              title={unterkat.unterkategorie}
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
  );

  if (isWide) {
    return (
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: dark ? '#000000' : '#ffffff' }}>
        <View style={{ flex: 1 }}>{list}</View>
        <View style={{ flex: 1, padding: 20 }}>
          <ImageBackground
            source={cat.background}
            style={{ flex: 1, borderRadius: 16, overflow: 'hidden' }}
            imageStyle={{ borderRadius: 16 }}
            resizeMode="cover"
          >
            {dark ? <View style={{ flex: 1, backgroundColor: 'rgba(23,23,23,0.4)' }} /> : null}
          </ImageBackground>
        </View>
      </View>
    );
  }

  return (
    <ImageBackground source={cat.background} style={{ flex: 1 }} resizeMode="cover">
      <View
        style={{
          flex: 1,
          backgroundColor: dark ? 'rgba(0,0,0,0.8)' : `${catColor.light}66`,
        }}
      >
        {list}
      </View>
    </ImageBackground>
  );
}

export default Kategorie;
