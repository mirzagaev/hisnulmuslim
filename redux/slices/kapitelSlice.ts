import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getHMStruktur } from '../../services/api';

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
  filteredKapiteln: Array<{
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
  filteredKapiteln: [],
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
  reducers: {
    // Filter-Reducer für die Suche
    // filterKapiteln: (state, action: PayloadAction<string>) => {
    //   const searchTerm = action.payload.toLowerCase();
    //   // console.log(searchTerm);
    //   state.filteredKapiteln = state.kapiteln.filter((kategorie) =>
    //     kategorie.kategorie.toLowerCase().includes(searchTerm)
    //   );
    // },
    filterKapiteln: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.toLowerCase();

      // Filterlogik: saubere Kopie der Originaldaten
      state.filteredKapiteln = state.kapiteln
        .map((kategorie) => {
          // Filtere nur Themen, die den Suchbegriff enthalten
          const filteredUnterkategorien = kategorie.unterkategorien
            .map((unterkat) => {
              const filteredThemen = unterkat.themen.filter((thema) =>
                thema.titel.toLowerCase().includes(searchTerm)
              );

              // Gib nur Unterkategorien zurück, die Treffer haben
              return filteredThemen.length > 0
                ? { ...unterkat, themen: filteredThemen }
                : null;
            })
            .filter(Boolean); // Entferne "null" Einträge

          // Gib nur Kategorien zurück, die Treffer in Unterkategorien haben
          return filteredUnterkategorien.length > 0
            ? { ...kategorie, unterkategorien: filteredUnterkategorien }
            : null;
        })
        .filter(Boolean); // Entferne "null" Einträge
    },
    clearFilteredKapiteln: (state) => {
      state.filteredKapiteln = state.kapiteln;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchKapiteln.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchKapiteln.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = 'succeeded';
        state.kapiteln = action.payload;
        state.filteredKapiteln = action.payload; // Standard: alle Daten anzeigen
      })
      .addCase(fetchKapiteln.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Actions exportieren
export const { filterKapiteln, clearFilteredKapiteln } = kapitelSlice.actions;

// Reducer exportieren
export default kapitelSlice.reducer;