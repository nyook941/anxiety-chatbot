import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import ChatbotTextInput from "./ChatbotTextInput";
import ChatbotConversation from "./ChatbotConversation";

export default function Chatbot() {
  return (
    <SafeAreaView style={styles.container}>
      <ChatbotConversation />
      <ChatbotTextInput />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#3A2D2D",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
