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
  userChat: UserChat;
  systemChat: SystemChat;
}

interface Conversation {
  interactions: Interaction[];
}

export { UserChat, SystemChat, Interaction, Conversation };
