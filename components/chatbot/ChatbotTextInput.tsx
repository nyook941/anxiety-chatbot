import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";

export default function ChatbotTextInput() {
  return (
    <View style={styles.container}>
      <TextInput
        editable
        multiline
        placeholder="What's on your mind?"
        placeholderTextColor={"#DBC9C9"}
        style={styles.textinput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  textinput: {
    borderWidth: 3,
    width: "100%",
    borderColor: "#A9A9A9",
    borderRadius: 10,
    fontSize: 16,
    color: "white",
    padding: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
