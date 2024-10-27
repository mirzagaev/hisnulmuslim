import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import tw from 'twrnc';

function Kategorie({ navigation }) {
  const kapiteln = useSelector((state: RootState) => state.kapiteln.kapiteln);
  const [kategorie, setKategorie] = useState<any[]>([]);
  const [catId, setCatId] = useState<any>();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', (e) => {
      const cState: number = navigation.getState().index;
      const cRoute: any = navigation.getState().routes[cState];
      setCatId(cRoute.name);
    });
  
    return unsubscribe;
  }, [catId, navigation]);

  return kapiteln.map((kapitel) => (kapitel.id == catId) &&
    <ScrollView style={tw`flex-1`} key={kapitel.id}>
      <Text key={kapitel.id.toString()} style={tw`text-xl font-title font-medium text-[#3f66da] bg-white p-5`}>{kapitel.kategorie}</Text>
      {kapitel.unterkategorien.map((unterkat) => (
        <View key={unterkat.id.toString()}>
          {unterkat.unterkategorie && <Text style={tw`text-base font-medium py-3 px-5`}>{unterkat.unterkategorie}</Text>}
          {unterkat.themen.map((thema) => (
            <Pressable
              onPress={
                () => {
                  navigation.navigate('Bittgebete', {
                    thema: thema,
                    kategorie: kapitel.kategorie
                  })
                }
              }
              style={tw`bg-white py-2 px-5`}
              key={thema.id.toString()}
            >
              <Text>{thema.titel}</Text>
            </Pressable>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

export default Kategorie;