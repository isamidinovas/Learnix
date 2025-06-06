import { createSlice } from "@reduxjs/toolkit";

import {
  createDeck,
  getDeckById,
  getDecks,
  getMyDecksList,
  removeDeck,
  updateDeck,
} from "../thunks/deckThunk";
import { DeckDataList } from "../../types/decks";

interface DeckState {
  decks: DeckDataList[];
  loading: boolean;
  error: string | null;
  selectedDeck: DeckDataList | null;
  creatorDecks: DeckDataList[];
}

const initialState: DeckState = {
  decks: [],
  loading: false,
  error: null,
  selectedDeck: null,
  creatorDecks: [],
};

const decksSlice = createSlice({
  name: "decks",
  initialState,
  reducers: {
    clearCreatorDecks(state) {
      state.creatorDecks = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDecks.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.decks = [];
      })
      .addCase(getDecks.fulfilled, (state, action) => {
        state.decks = action.payload;
        state.loading = false;
      })
      .addCase(getDecks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ката карточка алуу процессинде";
        state.decks = [];
      });

    builder
      .addCase(createDeck.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDeck.fulfilled, (state, action) => {
        state.loading = false;
        state.decks.push(action.payload);
        state.creatorDecks.push(action.payload);
      })
      .addCase(createDeck.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Карточка түзүүдө ката кетти";
      });

    builder
      .addCase(getDeckById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDeckById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDeck = action.payload;
      })
      .addCase(getDeckById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Карточка түзүүдө ката кетти";
      });

    builder
      .addCase(getMyDecksList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyDecksList.fulfilled, (state, action) => {
        state.loading = false;
        state.creatorDecks = action.payload;
      })
      .addCase(getMyDecksList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Карточкаларды алууда ката кетти";
      });

    builder
      .addCase(removeDeck.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeDeck.fulfilled, (state, action) => {
        state.loading = false;
        state.decks = state.decks.filter(
          (deck) => deck.id.toString() !== action.payload
        );
        state.creatorDecks = state.creatorDecks.filter(
          (deck) => deck.id.toString() !== action.payload
        );
      })
      .addCase(removeDeck.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Карточканы өчүрүүдө ката кетти";
      });

    builder
      .addCase(updateDeck.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDeck.fulfilled, (state, action) => {
        state.loading = false;
        const updatedDeck = action.payload;
        state.decks = state.decks.map((deck) =>
          deck.id === updatedDeck.id ? updatedDeck : deck
        );
        state.creatorDecks = state.creatorDecks.map((deck) =>
          deck.id === updatedDeck.id ? updatedDeck : deck
        );
        state.selectedDeck = updatedDeck;
      })
      .addCase(updateDeck.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "карточканы жаңыртууда ката кетти";
      });
  },
});
export const { clearCreatorDecks } = decksSlice.actions;
export default decksSlice.reducer;
