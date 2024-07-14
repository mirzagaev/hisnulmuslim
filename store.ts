import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// adding our persist configs
const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};