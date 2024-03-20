import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Conversation, Interaction } from "../../models/chat-models";

const initialState: Conversation = {
  interactions: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addUserChatMessage: (state, action: PayloadAction<string>) => {
      const interaction: Interaction = {
        userChat: {
          message: action.payload,
          metadata: {
            sentDateTime: Date(),
            isSent: false,
          },
        },
        systemChat: {
          message: null,
          metadata: {
            recievedDateTime: null,
            returnedDateTime: null,
            isComplete: false,
          },
        },
      };
      state.interactions.push(interaction);
    },
  },
});

export const { addUserChatMessage } = chatSlice.actions;

export default chatSlice.reducer;
