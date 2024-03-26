interface UserChat {
  message: string;
  metadata: {
    sentDateTime: string;
    isSent: boolean;
  };
}

interface SystemChat {
  message: string | null;
  metadata: {
    recievedDateTime: string | null;
    returnedDateTime: string | null;
    isComplete: boolean;
  };
}

interface Interaction {
  id: number;
  userChat: UserChat;
  systemChat: SystemChat;
}

interface Conversation {
  interactions: Interaction[];
}

interface ChatClientResponse {
  output_text: string;
}

export { UserChat, SystemChat, Interaction, Conversation, ChatClientResponse };
