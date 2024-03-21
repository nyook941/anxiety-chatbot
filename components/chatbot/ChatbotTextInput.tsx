import React, { useState } from "react";
import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { useDispatch } from "react-redux";
import { addUserChatMessage } from "../../redux/slices/chat-slice";
import { Ionicons } from "@expo/vector-icons";

export default function ChatbotTextInput() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleMicrophone = () => {};

  const handleSubmit = () => {
    console.log("Enter pressed");
    dispatch(addUserChatMessage(message));
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInputContainer}>
        <TextInput
          editable
          multiline
          placeholder="What's on your mind?"
          placeholderTextColor={"#DBC9C9"}
          style={styles.textinput}
          onChangeText={setMessage}
          value={message}
        />
        <Pressable
          style={styles.sendButtonContainer}
          onPress={
            message.replace(/\s+/g, "") === "" ? handleMicrophone : handleSubmit
          }
        >
          <Ionicons
            name={message.replace(/\s+/g, "") === "" ? "mic" : "arrow-up"}
            size={20}
            color={"white"}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3A2D2D",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderTopColor: "#A9A9A9",
    borderTopWidth: 1,
  },
  userInputContainer: {
    width: "100%",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#A9A9A9",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  textinput: {
    flex: 1,
    fontSize: 16,
    color: "white",
  },
  sendButtonContainer: {
    width: 35,
    height: 35,
    marginLeft: 8,
    backgroundColor: "#272020",
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#A9A9A9",
    justifyContent: "center",
    alignItems: "center",
  },
});
