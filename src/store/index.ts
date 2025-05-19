import { configureStore } from "@reduxjs/toolkit";
import decksReducer from "./reducers/deckSlice";
import chatReducer from "./reducers/chatSlice";
import authReducer from "./reducers/authSlice";

export const store = configureStore({
  reducer: {
    decks: decksReducer,
    chat: chatReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
