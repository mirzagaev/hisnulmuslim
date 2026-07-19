import React from 'react';
import { View, Text, ScrollView, useWindowDimensions } from 'react-native';
import tw from 'twrnc';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { tabBarStruktur } from "../interfaces/KapitelSchema"
import { useAppTheme } from "../theme/ThemeContext";
import SubcategoryCard from '../components/SubcategoryCard';

function Suche({ navigation }) {
  const filteredKapiteln = useSelector((state: RootState) => state.kapiteln.filteredKapiteln);
  const theme = useAppTheme();
  const dark = theme === 'dark';
  const { width } = useWindowDimensions();
  const isWide = width >= 1024;

  return (
    <ScrollView
      style={[tw`flex-1`, dark ? tw`bg-black` : tw`bg-white`]}
      contentContainerStyle={isWide ? tw`p-5 items-center` : tw`p-5 gap-5`}
    >
      <View style={[tw`w-full gap-5`, isWide && tw`max-w-[800px]`]}>
        {filteredKapiteln.map((kategorie) => {
          const color = tabBarStruktur[String(kategorie.id)]?.colorItem ?? '#3f66da';
          return (
            <View key={kategorie.id} style={tw`gap-4`}>
              <Text style={tw`text-lg font-medium text-[${color}]`}>{kategorie.kategorie}</Text>
              {kategorie.unterkategorien.map((unterkat) => (
                unterkat.themen.length > 0 &&
                <SubcategoryCard
                  key={unterkat.id}
                  title={unterkat.unterkategorie}
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
      </View>
    </ScrollView>
  );
}

export default Suche;
