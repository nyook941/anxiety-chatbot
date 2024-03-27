import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function UserChat({ message }: { message: string }) {
  return (
    <View style={styles.userChatContainer}>
      <Text style={styles.userChatText}>{message}</Text>
    </View>
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
