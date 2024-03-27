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
  const [userChatAnimations, setUserChatAnimations] = useState<
    Animated.Value[]
  >([]);

  const dispatch = useDispatch<AppDispatch>();

  const hideNoConvoHistoryAnim = useRef<Animated.Value>(
    new Animated.Value(1)
  ).current;

  useEffect(() => {
    setUserChatAnimations([...userChatAnimations, new Animated.Value(200)]);
    if (userChatAnimations.length !== 0) {
      if (userChatAnimations.length === 1) {
        Animated.timing(hideNoConvoHistoryAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setShowNoConvo(false));
        setTimeout(() => {
          Animated.timing(userChatAnimations[0], {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }, 300);
      }
      Animated.timing(userChatAnimations[userChatAnimations.length - 1], {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }

    const chatItem = conversation[conversation.length - 1];
    if (isUserChat(chatItem)) {
      dispatch(fetchSystemResponse(chatItem));
    }

    // setSystemChatAnimations([...systemChatAnimations, new Animated.Value(200)]);
    // if (systemChatAnimations.length !== 0) {
    //   Animated.timing(systemChatAnimations[systemChatAnimations.length - 1], {
    //     toValue: 0,
    //     duration: 300,
    //     useNativeDriver: true,
    //   }).start();
    // }
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
