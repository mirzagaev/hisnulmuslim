import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getBittgebete, syncOfflineData } from '../../services/api';

interface DuaState {
  duas: Array<{
    id: number,
    kapitel_id: number,
    bittgebet_id: number,
    content: string,
    arabic: string,
    latein: string
  }>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DuaState = {
  duas: [],
  status: 'idle',
  error: null,
};

export const fetchDuas = createAsyncThunk('duas/fetchDuas', async () => {
  const duas = await getBittgebete();
  return duas;
});

const duaSlice = createSlice({
  name: 'duas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDuas.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDuas.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = 'succeeded';
        state.duas = action.payload;
      })
      .addCase(fetchDuas.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default duaSlice.reducer;