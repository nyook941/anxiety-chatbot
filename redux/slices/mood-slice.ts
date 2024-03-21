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
      const moodIndex = state.moodArr.findIndex(
        (m) => m.date === action.payload.date
      );
      if (moodIndex !== -1) {
        state.moodArr[moodIndex].moods.push(...action.payload.moods);
      } else {
        state.moodArr.push(action.payload);
      }
    },
  },
});

export const { setMoodArr, addToMoodArr } = moodSlice.actions;

export default moodSlice.reducer;
