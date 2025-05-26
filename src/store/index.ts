import { configureStore } from "@reduxjs/toolkit";
import decksReducer from "./reducers/deckSlice";
import chatReducer from "./reducers/chatSlice";
import authReducer from "./reducers/authSlice";
import subjectReducer from "./reducers/subjectSlice";

export const store = configureStore({
  reducer: {
    decks: decksReducer,
    chat: chatReducer,
    auth: authReducer,
    subjects: subjectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
