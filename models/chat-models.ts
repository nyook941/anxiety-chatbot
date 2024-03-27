interface Chat {
  id: number;
  message: string | null;
}

interface UserChat extends Chat {
  metadata: {
    sentDateTime: string | null;
    isSent: boolean;
  };
}

interface SystemChat extends Chat {
  metadata: {
    returnedDateTime: string | null;
    status: "fulfilled" | "rejected" | null;
    userChat: number;
  };
}

interface ChatInitialState {
  conversation: (UserChat | SystemChat)[];
  pendingRequest: number;
}

interface ChatClientResponse {
  output_text: string;
}

function isSystemChat(
  chatItem: UserChat | SystemChat | undefined
): chatItem is SystemChat {
  return !!chatItem && "metadata" in chatItem && "status" in chatItem.metadata;
}

function isUserChat(
  chatItem: UserChat | SystemChat | undefined
): chatItem is UserChat {
  return !!chatItem && "metadata" in chatItem && "isSent" in chatItem.metadata;
}

export {
  UserChat,
  SystemChat,
  ChatInitialState,
  ChatClientResponse,
  isSystemChat,
  isUserChat,
};
