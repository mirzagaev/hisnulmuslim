import React, { useState, useEffect } from 'react';
import { Pressable, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Bittgebet from '../components/Bittgebete';

export default function Bittgebete({ navigation, route }) {
  const { themaId } = route.params;
  // let duas = useSelector((state: RootState) => state.duas.duas.find(dua => dua.kapitel_id == themaId));
  let duas = useSelector((state: RootState) => state.duas.duas);

  // useEffect(() => {
  //   console.log(themaId);
  // }, [navigation]);

  return (
    <ScrollView>
      {duas.map((dua) => (dua.kapitel_id == themaId) && 
        <Bittgebet
          id={dua.id}
          kapitel_id={dua.kapitel_id}
          bittgebet_id={dua.bittgebet_id}
          content={dua.content}
          arabic={dua.arabic}
          latein={dua.latein}
        />
      )}
      <Pressable onPress={() => navigation.goBack()}>go back</Pressable>
    </ScrollView>
  );
}