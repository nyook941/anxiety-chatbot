import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./slices/chat-slice";
import moodSlice from "./slices/mood-slice";

export const store = configureStore({
  reducer: {
    chat: chatSlice,
    mood: moodSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
