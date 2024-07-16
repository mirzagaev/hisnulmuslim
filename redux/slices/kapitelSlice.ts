import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getHMStruktur, syncOfflineData } from '../../services/api';

interface KapitelState {
  kapiteln: Array<{
    id: number,
    kategorie: string,
    unterkategorien: Array<{
      id: number,
      unterkategorie: string,
      parent: number,
      themen: Array<{
        id: number,
        titel: string,
      }>
    }>
  }>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: KapitelState = {
  kapiteln: [],
  status: 'idle',
  error: null,
};

export const fetchKapiteln = createAsyncThunk('kapiteln/fetchKapiteln', async () => {
  const kapiteln = await getHMStruktur();
  return kapiteln;
});

const kapitelSlice = createSlice({
  name: 'kapiteln',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchKapiteln.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchKapiteln.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = 'succeeded';
        state.kapiteln = action.payload;
      })
      .addCase(fetchKapiteln.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default kapitelSlice.reducer;