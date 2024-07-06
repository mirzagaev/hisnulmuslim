import * as React from 'react';
import AppNavigation from './navigation/AppNavigation';
import { persistCombineReducers, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reducers from './reducers';
import 'react-native-gesture-handler';

export default function App() {
  return <AppNavigation/>
}