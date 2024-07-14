import React, { useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../redux/slices/itemSlice';
import { AppDispatch, RootState } from '../redux/store';

export default function ItemList() {
  const [name, setName] = React.useState('');
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.items.items);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="content"
        value={name}
        onChangeText={setName}
      />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.content}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '100%',
  },
});