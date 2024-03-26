import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  ChatClientResponse,
  Conversation,
  Interaction,
} from "../../models/chat-models";
import { CHATBOT_API_KEY } from "@env";

const initialState: Conversation = {
  interactions: [],
};

const markInteractionAsPending = createAction<number>(
  "chat/markInteractionAsPending"
);

export const fetchSystemResponse = createAsyncThunk(
  "chat/fetchSystemResponse",
  async (interaction: Interaction, { dispatch }) => {
    console.log("thunk dispatched");
    dispatch(markInteractionAsPending(interaction.id));
    const baseUrl =
      "https://xty88zhgt2.execute-api.us-east-2.amazonaws.com/default/KennanPortfolio";
    const data = {
      question: interaction.userChat.message,
    };
    console.log(CHATBOT_API_KEY);
    const response = await fetch(baseUrl, {
      method: "PUT",
      headers: {
        "x-api-key": CHATBOT_API_KEY,
      },
      body: JSON.stringify(data),
    });
    const systemResponse = (await response.json()) as ChatClientResponse;
    return { id: interaction.id, systemResponse };
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
            sentDateTime: new Date().toISOString(),
            isSent: false,
          },
        },
        systemChat: {
          message: null,
          metadata: {
            recievedDateTime: null,
            returnedDateTime: null,
            status: null,
          },
        },
      };
      state.interactions.push(interaction);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(markInteractionAsPending, (state, action) => {
        const interaction = state.interactions.find(
          (i) => i.id === action.payload
        );
        if (interaction) {
          interaction.systemChat.metadata.recievedDateTime =
            new Date().toISOString();
          interaction.systemChat.metadata.status = "pending";
        }
      })
      .addCase(
        fetchSystemResponse.fulfilled,
        (
          state,
          action: PayloadAction<{
            id: number;
            systemResponse: ChatClientResponse;
          }>
        ) => {
          const { id, systemResponse } = action.payload;
          const interaction = state.interactions.find((i) => i.id === id);
          if (interaction) {
            interaction.systemChat.message = systemResponse.output_text;
            interaction.systemChat.metadata.returnedDateTime =
              new Date().toISOString();
            interaction.systemChat.metadata.status = "fullfilled";
          }
        }
      );
  },
});

export const { addUserChatMessage } = chatSlice.actions;

export default chatSlice.reducer;
