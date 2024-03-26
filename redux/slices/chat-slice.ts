import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  ChatClientResponse,
  ChatInitialState,
  SystemChat,
  UserChat,
} from "../../models/chat-models";
import { CHATBOT_API_URL, CHATBOT_API_KEY } from "@env";

const initialState: ChatInitialState = {
  conversation: [],
};

const addSystemChat = createAction<{ userId: number; systemId: number }>(
  "chat/markInteractionAsPending"
);

export const fetchSystemResponse = createAsyncThunk(
  "chat/fetchSystemResponse",
  async (
    payload: { userChat: UserChat; conversation: (UserChat | SystemChat)[] },
    { dispatch }
  ) => {
    dispatch(
      addSystemChat({
        userId: payload.userChat.id,
        systemId: payload.conversation.length,
      })
    );
    const baseUrl = CHATBOT_API_URL + "testing";
    const data = {
      question: payload.userChat.message,
    };
    const response = await fetch(baseUrl, {
      method: "PUT",
      headers: {
        "x-api-key": CHATBOT_API_KEY,
      },
      body: JSON.stringify(data),
    });
    const systemResponse = (await response.json()) as ChatClientResponse;
    return {
      userId: payload.userChat.id,
      systemId: payload.conversation.length,
      systemResponse,
    };
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addUserChatMessage: (state, action: PayloadAction<string>) => {
      const userChat: UserChat = {
        id: state.conversation.length,

        message: action.payload,
        metadata: {
          sentDateTime: new Date().toISOString(),
          isSent: false,
        },
      };
      state.conversation.push(userChat);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addSystemChat, (state, action) => {
        const systemChat: SystemChat = {
          id: action.payload.systemId,
          message: null,
          metadata: {
            recievedDateTime: new Date().toISOString(),
            returnedDateTime: null,
            status: "pending",
            userChat: action.payload.userId,
          },
        };
        state.conversation.push(systemChat);
      })
      .addCase(fetchSystemResponse.fulfilled, (state, action) => {
        state.conversation[action.payload.systemId].message =
          action.payload.systemResponse.output_text;
        state.conversation[action.payload.systemId].metadata?.status =
          "fullfilled";
      });
  },
});

export const { addUserChatMessage } = chatSlice.actions;

export default chatSlice.reducer;
