import React, { useState, useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Bittgebet from '../components/Bittgebete';

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#3f66da',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    marginHorizontal: 15,
    fontWeight: '600',
    fontSize: 12,
    textTransform: "uppercase",
    color: '#ffffff',
    width: 'auto'
  }
});

export default function Bittgebete({ navigation, route }) {
  const { themaId } = route.params;
  let duas = useSelector((state: RootState) => state.duas.duas);

  return (
    <ScrollView>
      {duas.map((dua) => (dua.kapitel_id == themaId) && 
        <Bittgebet
          key={dua.kapitel_id.toString()}
          id={dua.id}
          kapitel_id={dua.kapitel_id}
          bittgebet_id={dua.bittgebet_id}
          content={dua.content}
          arabic={dua.arabic}
          latein={dua.latein}
        />
      )}
      <Pressable onPress={() => navigation.goBack()} style={styles.btn}>Zurück</Pressable>
    </ScrollView>
  );
}