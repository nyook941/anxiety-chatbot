import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TextInputKeyPressEventData,
  NativeSyntheticEvent,
  Button,
  Pressable,
  Text,
} from "react-native";
import { useDispatch } from "react-redux";
import { addUserChatMessage } from "../../redux/slices/chat-slice";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

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
        <FontAwesome
          name={message.replace(/\s+/g, "") === "" ? "microphone" : "send"}
          size={25}
          color={"white"}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3A2D2D",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderTopColor: "#A9A9A9",
    borderTopWidth: 1,
    flexDirection: "row",
  },
  textinput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#A9A9A9",
    borderRadius: 10,
    padding: 15,
    justifyContent: "center",
    fontSize: 16,
    color: "white",
  },
  sendButtonContainer: {
    width: 50,
    height: 50,
    marginLeft: 16,
    backgroundColor: "#272020",
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#A9A9A9",
    justifyContent: "center",
    alignItems: "center",
  },
});
