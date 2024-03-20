import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addUserChatMessage } from "../../redux/slices/chat-slice";

export default function ChatbotConversation() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addUserChatMessage(String(Math.random())));
  }, []);
  const conversation = useSelector((state: RootState) => state.chat);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView style={{ padding: 16 }}>
        {conversation.interactions.map((interaction, index) => (
          <>
            <View style={styles.userChatContainer} id={String(index)}>
              <Text style={styles.userChatText}>
                {interaction.userChat.message}
              </Text>
            </View>
            <View style={styles.systemChatContainer} id={String(index)}>
              <Text style={styles.systemChatText}>
                {interaction.systemChat.message ?? "loading"}
              </Text>
            </View>
          </>
        ))}
        <View style={{ height: 16 }}></View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    width: "100%",
  },
  userChatContainer: {
    backgroundColor: "#8E574C",
    maxWidth: "75%",
    alignSelf: "flex-end",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    marginVertical: 16,
  },
  userChatText: {
    fontSize: 16,
    color: "white",
    padding: 16,
    fontWeight: "500",
  },
  systemChatContainer: {
    backgroundColor: "#EEEEEE",
    maxWidth: "75%",
    alignSelf: "flex-start",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    marginVertical: 16,
  },
  systemChatText: {
    fontSize: 16,
    color: "#505050",
    padding: 16,
    fontWeight: "500",
  },
});
