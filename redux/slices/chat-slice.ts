import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  ChatClientResponse,
  ChatInitialState,
  isUserChat,
  SystemChat,
  UserChat,
} from "../../models/chat-models";
import { CHATBOT_API_URL, CHATBOT_API_KEY } from "@env";

const initialState: ChatInitialState = {
  conversation: [],
  pendingRequest: 0,
};

export const fetchSystemResponse = createAsyncThunk(
  "chat/fetchSystemResponse",
  async (userChat: UserChat) => {
    console.log(process.env.CHATBOT_API_URL);
    const baseUrl = CHATBOT_API_URL;
    const data = {
      question: userChat.message,
    };
    const response = await fetch(baseUrl, {
      method: "PUT",
      headers: {
        "x-api-key": CHATBOT_API_KEY,
      },
      body: JSON.stringify(data),
    });
    const systemResponse = (await response.json()) as ChatClientResponse;
    console.log(systemResponse);
    return {
      userId: userChat.id,
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
    setUserChatToSent: (state, action: PayloadAction<UserChat>) => {
      const chatItem = state.conversation[action.payload.id];
      if (isUserChat(chatItem)) {
        chatItem.metadata.isSent = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSystemResponse.pending, (state) => {
        state.pendingRequest++;
      })
      .addCase(fetchSystemResponse.fulfilled, (state, action) => {
        const systemChat: SystemChat = {
          id: state.conversation.length,
          message: action.payload.systemResponse.output_text,
          metadata: {
            returnedDateTime: new Date().toISOString(),
            status: "fulfilled",
            userChat: action.payload.userId,
          },
        };
        state.conversation.push(systemChat);
        state.pendingRequest--;
      });
  },
});

export const { addUserChatMessage, setUserChatToSent } = chatSlice.actions;

export default chatSlice.reducer;
