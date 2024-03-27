import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function SystemChat({ message }: { message: string }) {
  return (
    <View style={styles.systemChatContainer}>
      <Text style={styles.systemChatText}>{message}</Text>
    </View>
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
