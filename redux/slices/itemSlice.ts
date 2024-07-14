import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getBittgebete, syncOfflineData } from '../../services/api';

interface ItemState {
  items: Array<{ id: number, content: string }>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ItemState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  const items = await getBittgebete();
  return items;
});

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default itemSlice.reducer;