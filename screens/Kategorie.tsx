import React, { useState, useContext , useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import tw from 'twrnc';
import { tabBarStruktur } from "../interfaces/KapitelSchema"

function Kategorie({navigation}) {
  const kapiteln = useSelector((state: RootState) => state.kapiteln.kapiteln);
  const [kategorie, setKategorie] = useState<any[]>([]);
  const [catId, setCatId] = useState<any>(1);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', (e) => {
      const cState: number = navigation.getState().index;
      const cRoute: any = navigation.getState().routes[cState];
      setCatId(cRoute.name);
    });
  
    return unsubscribe;
  }, [catId, navigation]);

  return (
    <ScrollView style={tw`flex-1`}>
      {kapiteln.map((kapitel) => (kapitel.id == catId) &&
      <>
      <Text style={[
        tw`text-xl font-medium bg-white p-4`,
        {color: tabBarStruktur[catId].colorItem, borderBottomColor: tabBarStruktur[catId].colorItem, borderBottomWidth: 3, fontSize: 20, paddingHorizontal: 0},
        ]}>{kapitel.kategorie}</Text>
        
        {kapitel.unterkategorien.map((unterkat) => (
          <View key={unterkat.id.toString()}>
            {unterkat.unterkategorie && <Text style={tw`text-md font-medium py-2 px-4`}>{unterkat.unterkategorie}</Text>}
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
                style={tw`bg-white py-2 px-4`}
              >
                <Text>{thema.titel}</Text>
              </Pressable>
            ))}
          </View>
        ))}
        </>
      )}
    </ScrollView>
  );
}

export default Kategorie;