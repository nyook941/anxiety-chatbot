import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addUserChatMessage } from "../../redux/slices/chat-slice";

export default function ChatbotConversation() {
  const disaptch = useDispatch();
  disaptch(addUserChatMessage("RAHHHH"));
  const conversation = useSelector((state: RootState) => state.chat);

  return (
    <View style={styles.container}>
      {conversation.interactions.map((interaction) => (
        <View style={styles.userChatContainer}>
          <Text style={styles.userChatText}>
            {interaction.userChat.message}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    width: "100%",
    padding: 16,
  },
  userChatContainer: {
    backgroundColor: "red",
    maxWidth: "75%",
  },
  userChatText: {
    fontSize: 16,
    color: "white",
    padding: 8,
  },
});
