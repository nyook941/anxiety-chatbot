import { Text, StyleSheet, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { SystemChat } from "../../../models/chat-models";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export default function SystemChatComponent({ chat }: { chat: SystemChat }) {
  const { conversation } = useSelector((state: RootState) => state.chat);

  const ySlideAnim = useRef<Animated.Value>(new Animated.Value(200)).current;
  const xSlideAnim = useRef<Animated.Value>(new Animated.Value(-200)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(xSlideAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(ySlideAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }, 200);
  }, [chat.metadata.status === "fulfilled"]);

  return (
    <Animated.View
      style={[
        styles.systemChatContainer,
        { transform: [{ translateX: xSlideAnim }, { translateY: ySlideAnim }] },
      ]}
    >
      <Text style={styles.systemChatText}>{chat.message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
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
