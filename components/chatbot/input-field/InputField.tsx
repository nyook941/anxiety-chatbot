import { View, StyleSheet, TextInput, Pressable, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  addUserChatMessage,
  fetchSystemResponse,
  setUserChatToSent,
} from "../../../redux/slices/chat-slice";
import { Ionicons } from "@expo/vector-icons";
import { isUserChat } from "../../../models/chat-models";

export default function InputField() {
  const dispatch = useDispatch<AppDispatch>();
  const [message, setMessage] = useState("");
  const { conversation } = useSelector((state: RootState) => state.chat);

  const handleSubmit = () => {
    if (conversation.length > 0) {
      dispatch(addUserChatMessage(message));
      setMessage("");
    } else {
      setTimeout(() => {
        dispatch(addUserChatMessage(message));
        setMessage("");
      }, 300);
    }
  };

  const handleMic = () => {};

  const sendBackgroundAnim = useRef<Animated.Value>(
    new Animated.Value(0)
  ).current;
  const backgroundColor = sendBackgroundAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#272020", "#8E574C"],
  });

  useEffect(() => {
    Animated.timing(sendBackgroundAnim, {
      toValue: message.trim() ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [message]);

  return (
    <View style={styles.inputContainer}>
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
        <Pressable onPress={message.trim() ? handleSubmit : handleMic}>
          <Animated.View
            style={[styles.sendButtonContainer, { backgroundColor }]}
          >
            <Ionicons
              name={message.trim() ? "arrow-up" : "mic"}
              size={20}
              color={"white"}
            />
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
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
