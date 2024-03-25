import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeneralInitialState } from "../../models/general-models";

const initialState: GeneralInitialState = {
  isScreenScrolled: false,
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setIsScreenScrolled: (state, action: PayloadAction<boolean>) => {
      state.isScreenScrolled = action.payload;
    },
  },
});

export const { setIsScreenScrolled } = generalSlice.actions;

export default generalSlice.reducer;
