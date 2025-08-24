import React, { useState , useEffect } from 'react';
import { Text, View, ScrollView, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import tw from 'twrnc';
import { tabBarStruktur } from "../interfaces/KapitelSchema"
import { useAppTheme } from "../navigation/AppNavigation";

function Kategorie({navigation}) {
  const kapiteln = useSelector((state: RootState) => state.kapiteln.kapiteln);
  const [kategorie, setKategorie] = useState<any[]>([]);
  const [catId, setCatId] = useState<any>(1);
  const theme = useAppTheme();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', (e) => {
      const cState: number = navigation.getState().index;
      const cRoute: any = navigation.getState().routes[cState];
      setCatId(cRoute.name);
    });
  
    return unsubscribe;
  }, [catId, navigation]);

  return (
    <ScrollView style={[
      tw`flex-1`,
      theme === "dark" ? tw`bg-neutral-900` : tw`bg-white`
    ]}>
      {kapiteln.map((kapitel) => (kapitel.id == catId) &&
        <View key={catId}>
          <Text style={[
            tw`text-2xl font-medium px-4 py-3`,
            theme === "dark" ? tw`bg-neutral-900` : tw`bg-white`,
            {color: tabBarStruktur[catId].colorItem, borderBottomColor: tabBarStruktur[catId].colorItem, borderBottomWidth: 3, paddingHorizontal: 0},
          ]}>{kapitel.kategorie}</Text>
          
          {kapitel.unterkategorien.map((unterkat) => (
            <View key={unterkat.id.toString()}>
              {unterkat.unterkategorie && <Text style={[
                tw`text-md font-medium py-2 px-4`,
                theme === "dark" && tw`text-neutral-200`
                ]}>{unterkat.unterkategorie}</Text>}
              {unterkat.themen.map((thema) => (
                <Pressable
                  key={thema.id}
                  onPress={
                    () => {
                      navigation.navigate('Bittgebete', {
                        thema: thema,
                        kategorie: kapitel.kategorie
                      })
                    }
                  }
                  style={[
                    tw`py-2 px-4`,
                    theme === "dark" ? tw`bg-neutral-800 border-b border-neutral-700` : tw`bg-white border-b border-neutral-100`
                  ]}
                >
                  <Text style={theme === "dark" && tw`text-neutral-200`}>{thema.titel}</Text>
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

export default Kategorie;