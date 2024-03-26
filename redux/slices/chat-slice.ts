import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ChatClientResponse,
  chatClientResponse,
  Conversation,
  Interaction,
  UserChat,
} from "../../models/chat-models";

const initialState: Conversation = {
  interactions: [],
};

const fetchSystemResponse = createAsyncThunk(
  "chat/fetchSystemResponse",
  async (interaction: Interaction) => {
    const response = await fetch(
      `https://reqres.in/api/users/${interaction.userChat.message}`
    );
    const systemResponse = (await response.json()) as ChatClientResponse;
    interaction.systemChat.message = systemResponse.output_text;
    return interaction;
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addUserChatMessage: (state, action: PayloadAction<string>) => {
      const interaction: Interaction = {
        id: state.interactions.length,
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
  extraReducers: (builder) => {
    // builder.addCase(
    //   fetchSystemResponse.pending,
    //   (state, action: PayloadAction<Interaction>) => {
    //     state.interactions[state.interactions.length] = action.payload;
    //   }
    // );
  },
});

export const { addUserChatMessage } = chatSlice.actions;

export default chatSlice.reducer;
