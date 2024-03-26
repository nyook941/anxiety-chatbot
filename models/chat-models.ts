interface Chat {
  id: number;
  message: string | null;
}

interface UserChat extends Chat {
  metadata: {
    sentDateTime: string;
    isSent: boolean;
  };
}

interface SystemChat extends Chat {
  metadata: {
    recievedDateTime: string | null;
    returnedDateTime: string | null;
    status: "pending" | "fullfilled" | "rejected" | null;
    userChat: number;
  };
}

interface ChatInitialState {
  conversation: (UserChat | SystemChat)[];
}

interface ChatClientResponse {
  output_text: string;
}

export { UserChat, SystemChat, ChatInitialState, ChatClientResponse };
