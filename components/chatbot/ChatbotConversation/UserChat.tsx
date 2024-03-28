import { Text, StyleSheet, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { UserChat, isUserChat } from "../../../models/chat-models";
import { fetchSystemResponse } from "../../../redux/slices/chat-slice";

export default function UserChatComponent({ chat }: { chat: UserChat }) {
  const { conversation } = useSelector((state: RootState) => state.chat);
  const slideAnim = useRef<Animated.Value>(new Animated.Value(200)).current;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const chatItem = conversation[conversation.length - 1];
    console.log(chatItem);
    console.log(isUserChat(chatItem));
    if (isUserChat(chatItem)) {
      dispatch(fetchSystemResponse(chatItem));
    }
  }, [conversation.length]);

  return (
    <Animated.View
      style={[
        styles.userChatContainer,
        { transform: [{ translateX: slideAnim }, { translateY: slideAnim }] },
      ]}
    >
      <Text style={styles.userChatText}>{chat.message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
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
});
