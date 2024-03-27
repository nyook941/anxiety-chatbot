import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Animated,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { addUserChatMessage } from "../../../redux/slices/chat-slice";
import { Ionicons } from "@expo/vector-icons";

export default function InputField() {
  const dispatch = useDispatch<AppDispatch>();
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    dispatch(addUserChatMessage(message));
    setMessage("");
  };

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
      duration: 300,
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
        <Pressable onPress={handleSubmit}>
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
