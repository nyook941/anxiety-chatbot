import { View, StyleSheet, SafeAreaView, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import NoConversationHistory from "./NoConversationHistory";
import { fetchSystemResponse } from "../../redux/slices/chat-slice";
import { isUserChat } from "../../models/chat-models";
import Conversation from "./ChatbotConversation/Conversation";
import InputField from "./input-field/InputField";

export default function Chatbot() {
  const { conversation } = useSelector((state: RootState) => state.chat);
  const [showNoConvo, setShowNoConvo] = useState(conversation.length === 0);

  const hideNoConvoHistoryAnim = useRef<Animated.Value>(
    new Animated.Value(1)
  ).current;

  useEffect(() => {
    if (conversation.length === 1) {
      Animated.timing(hideNoConvoHistoryAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowNoConvo(false));
    }
  }, [conversation.length]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, width: "100%" }}>
        {showNoConvo ? (
          <Animated.View
            style={{
              opacity: hideNoConvoHistoryAnim,
              flex: 1,
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <NoConversationHistory />
          </Animated.View>
        ) : (
          <Conversation />
        )}
        <InputField />
      </View>
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
