import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Mood, MoodSliceState } from "../../models/mood-models";

const initialState: MoodSliceState = {
  moodArr: [],
};

export const moodSlice = createSlice({
  name: "mood",
  initialState,
  reducers: {
    setMoodArr: (state, action: PayloadAction<Mood[]>) => {
      state.moodArr = action.payload;
    },
    addToMoodArr: (state, action: PayloadAction<Mood>) => {
      const mood = state.moodArr.find((m) => {
        m.date === action.payload.date;
      });
      if (mood) {
      }
    },
  },
});

export const {} = moodSlice.actions;

export default moodSlice.reducer;
