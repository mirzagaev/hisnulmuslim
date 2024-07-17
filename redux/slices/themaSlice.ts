import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getKategorieData, syncOfflineData } from '../../services/api';
import Thema from '../../interfaces/Thema';

interface ThemaState {
  themen: Array<Thema>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ThemaState = {
  themen: [],
  status: 'idle',
  error: null,
};

export const fetchThemen = createAsyncThunk('themen/fetchThemen', async () => {
  const themen = await getKategorieData();
  return themen;
});

const themaSlice = createSlice({
  name: 'themen',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchThemen.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchThemen.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = 'succeeded';
        state.themen = action.payload;
      })
      .addCase(fetchThemen.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default themaSlice.reducer;