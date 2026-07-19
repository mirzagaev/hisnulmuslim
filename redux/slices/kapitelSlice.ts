import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getHMStruktur } from '../../services/api';
import Bittgebete from '../../interfaces/Bittgebet';

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
    // Filter-Reducer für die Suche: durchsucht Kategorie, Unterkategorie,
    // Thema-Titel sowie den Bittgebet-Inhalt (content/arabic/latein)
    filterKapiteln: (
      state,
      action: PayloadAction<{ searchTerm: string; duas: Array<Bittgebete> }>
    ) => {
      const { searchTerm: rawSearchTerm, duas } = action.payload;
      const searchTerm = rawSearchTerm.toLowerCase();

      // Ein Thema hat einen Treffer im Inhalt, wenn eines seiner Bittgebete
      // (verknüpft über kapitel_id) im Text, Arabisch oder Umschrift matcht
      const themaHasContentMatch = (themaId) =>
        duas.some(
          (dua) =>
            dua.kapitel_id == themaId &&
            (dua.content?.toLowerCase().includes(searchTerm) ||
              dua.arabic?.toLowerCase().includes(searchTerm) ||
              dua.latein?.toLowerCase().includes(searchTerm))
        );

      // Filterlogik: saubere Kopie der Originaldaten
      state.filteredKapiteln = state.kapiteln
        .map((kategorie) => {
          const kategorieMatches = (kategorie.kategorie ?? '')
            .toLowerCase()
            .includes(searchTerm);

          const filteredUnterkategorien = kategorie.unterkategorien
            .map((unterkat) => {
              const unterkategorieMatches = (unterkat.unterkategorie ?? '')
                .toLowerCase()
                .includes(searchTerm);

              // Ein Thema bleibt erhalten, wenn Kategorie, Unterkategorie,
              // der Thema-Titel selbst oder der Inhalt eines Bittgebets matcht
              const filteredThemen = unterkat.themen.filter(
                (thema) =>
                  kategorieMatches ||
                  unterkategorieMatches ||
                  (thema.titel ?? '').toLowerCase().includes(searchTerm) ||
                  themaHasContentMatch(thema.id)
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