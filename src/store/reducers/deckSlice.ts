import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { WritableDraft } from "immer";

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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDecks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getDecks.fulfilled, (state, action) => {
        state.decks = JSON.parse(JSON.stringify(action.payload));
        state.loading = false;
      })
      .addCase(getDecks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ката decks алуу процессинде";
      });
    builder
      .addCase(createDeck.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createDeck.fulfilled,
        (state, action: PayloadAction<DeckDataList>) => {
          state.loading = false;
          state.decks.push(action.payload);
        }
      )
      .addCase(createDeck.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Колода түзүүдө ката кетти";
      });
    builder
      .addCase(getDeckById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDeckById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDeck = JSON.parse(JSON.stringify(action.payload));
      })
      .addCase(getDeckById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Колода түзүүдө ката кетти";
      });
    builder
      .addCase(removeDeck.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeDeck.fulfilled, (state, action) => {
        state.loading = false;
        state.decks = state.decks.filter(
          (deck) => deck.id !== Number(action.payload)
        );
      })

      .addCase(removeDeck.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Колода түзүүдө ката кетти";
      });
    builder
      .addCase(getMyDecksList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyDecksList.fulfilled, (state, action) => {
        state.loading = false;
        state.creatorDecks = JSON.parse(JSON.stringify(action.payload));
      })

      .addCase(getMyDecksList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Колода түзүүдө ката кетти";
      });
    builder
      .addCase(updateDeck.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDeck.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDeck = JSON.parse(JSON.stringify(action.payload));
      })

      .addCase(updateDeck.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Колода түзүүдө ката кетти";
      });
  },
});

export default decksSlice.reducer;
