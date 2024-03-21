import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import NoConversationHistory from "./NoConversationHistory";

export default function ChatbotConversation() {
  const scrollViewRef = useRef<ScrollView>(null);
  const conversation = useSelector((state: RootState) => state.chat);

  return (
    <View style={styles.container}>
      {conversation.interactions.length === 0 ? (
        <NoConversationHistory />
      ) : (
        <ScrollView
          style={{ padding: 16 }}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
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
        </ScrollView>
      )}
      <View style={{ height: 16 }}></View>
    </View>
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
