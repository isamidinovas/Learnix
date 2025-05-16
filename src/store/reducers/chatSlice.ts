import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { chatWithDocumentAsync } from "../thunks/chatThunk";

interface ChatWithDocumentState {
  response: string;
  loading: boolean;
  error: string | null;
}

const chatWithDocumentSlice = createSlice({
  name: "chat",
  initialState: {
    response: "",
    loading: false,
    error: null,
  } as ChatWithDocumentState,
  reducers: {
    resetState: (state) => {
      state.response = "";
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(chatWithDocumentAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        chatWithDocumentAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.response = action.payload;
        }
      )
      .addCase(chatWithDocumentAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "An unknown error occurred";
      });
  },
});

export const { resetState } = chatWithDocumentSlice.actions;
export default chatWithDocumentSlice.reducer;
