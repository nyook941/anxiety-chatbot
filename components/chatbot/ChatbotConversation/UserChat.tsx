import { View, Text, StyleSheet, Animated } from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export default function UserChat({
  message,
  animation,
}: {
  message: string;
  animation: Animated.Value;
}) {
  const { conversation } = useSelector((state: RootState) => state.chat);

  useEffect(() => {
    console.log("running user chat animation");
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [conversation.length]);

  return (
    <Animated.View
      style={[
        styles.userChatContainer,
        { transform: [{ translateX: animation }, { translateY: animation }] },
      ]}
    >
      <Text style={styles.userChatText}>{message}</Text>
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
