import { configureStore } from '@reduxjs/toolkit';
import duaReducer from './slices/duaSlice';
import kapitelSlice from './slices/kapitelSlice';
import favoriteReducer from './slices/favoriteSlice';
import themaReducer  from './slices/themaSlice';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  kapiteln: kapitelSlice,
  duas: duaReducer,
  themen: themaReducer,
  favorites: favoriteReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// Typen für den Zustand und Dispatch
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;