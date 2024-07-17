import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoriteState {
  favorites: Array<{ id: number }>;
}

const initialState: FavoriteState = {
  favorites: [],
};

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<{ id: number }>) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
    //   state.favorites = state.favorites.filter(item => item.id !== action.payload);
      state.favorites.pop();
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;