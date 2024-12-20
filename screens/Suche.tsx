import React, { useState, useContext , useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import tw from 'twrnc';
import { tabBarStruktur } from "../interfaces/KapitelSchema"

function Suche({ navigation}) {
  const kapiteln = useSelector((state: RootState) => state.kapiteln.kapiteln);

  const filteredKapiteln = useSelector((state: RootState) => state.kapiteln.filteredKapiteln);
  console.log(filteredKapiteln);

  return (
    <ScrollView style={tw`flex-1 h-full`}>
      {filteredKapiteln.map((kategorie) => (
        <View key={kategorie.id.toString()}>
          <Text style={[
          tw`text-xl font-medium bg-white p-4`,
          {color: tabBarStruktur[kategorie.id].colorItem, borderBottomColor: tabBarStruktur[kategorie.id].colorItem, borderBottomWidth: 3, fontSize: 20, paddingHorizontal: 0},
            ]}>{kategorie.kategorie}</Text>

          {kategorie.unterkategorien.map((unterkat) => (
            <View key={unterkat.id.toString()}>
              {unterkat.unterkategorie && <Text style={tw`text-md font-medium py-2 px-4`}>{unterkat.unterkategorie}</Text>}
              {unterkat.themen.map((thema) => (
                <Pressable
                  key={thema.id}
                  onPress={
                    () => {
                      navigation.navigate('Bittgebete', {
                        thema: thema,
                        kategorie: kategorie.kategorie
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
        </View>
      ))}
    </ScrollView>
  );
}

export default Suche;