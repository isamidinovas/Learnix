import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createDeck, getDecks } from "../thunks/deckThunk";
import { DeckDataList } from "../../types/decks";
interface DeckState {
  decks: DeckDataList[];
  loading: boolean;
  error: string | null;
}
const initialState: DeckState = {
  decks: [],
  loading: false,
  error: null,
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
      .addCase(
        getDecks.fulfilled,
        (state, action: PayloadAction<DeckDataList[]>) => {
          state.decks = action.payload;
          state.loading = false;
        }
      )
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
  },
});

export default decksSlice.reducer;
