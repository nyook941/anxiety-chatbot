import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Pressable,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import NoConversationHistory from "./NoConversationHistory";
import { Ionicons } from "@expo/vector-icons";
import { addUserChatMessage } from "../../redux/slices/chat-slice";
import { setIsScreenScrolled } from "../../redux/slices/general-slice";

export default function Chatbot() {
  const scrollViewRef = useRef<ScrollView>(null);
  const conversation = useSelector((state: RootState) => state.chat);
  const [message, setMessage] = useState("");
  const [showNoConvo, setShowNoConvo] = useState(
    conversation.interactions.length === 0
  );
  const [userChatAnimations, setUserChatAnimations] = useState<
    Animated.Value[]
  >([]);

  const dispatch = useDispatch();

  const hideNoConvoHistoryAnim = useRef<Animated.Value>(
    new Animated.Value(1)
  ).current;

  const handleMicrophone = () => {};

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const isScrolled = event.nativeEvent.contentOffset.y > 0;
    dispatch(setIsScreenScrolled(isScrolled));
  };

  useEffect(() => {
    setUserChatAnimations([...userChatAnimations, new Animated.Value(200)]);
    if (userChatAnimations.length !== 0) {
      if (userChatAnimations.length === 1) {
        Animated.timing(hideNoConvoHistoryAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setShowNoConvo(false));
        let animationTimeout = setTimeout(() => {
          Animated.timing(userChatAnimations[0], {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }, 300);
        return () => {
          if (animationTimeout) {
            clearTimeout(animationTimeout);
          }
        };
      }
      Animated.timing(userChatAnimations[userChatAnimations.length - 1], {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [conversation.interactions.length]);

  const handleSubmit = () => {
    dispatch(addUserChatMessage(message));
    setMessage("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, width: "100%" }}>
        {showNoConvo ? (
          <Animated.View
            style={{
              opacity: hideNoConvoHistoryAnim,
              flex: 1,
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <NoConversationHistory />
          </Animated.View>
        ) : (
          <ScrollView
            style={styles.scrollView}
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({ animated: true })
            }
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {conversation.interactions.map((interaction, index) => (
              <React.Fragment key={index}>
                <Animated.View
                  style={[
                    styles.userChatContainer,
                    {
                      transform: [
                        { translateY: userChatAnimations[index] },
                        { translateX: userChatAnimations[index] },
                      ],
                    },
                  ]}
                >
                  <Text style={styles.userChatText}>
                    {interaction.userChat.message}
                  </Text>
                </Animated.View>
                {interaction.systemChat.metadata.recievedDateTime && (
                  <View style={styles.systemChatContainer}>
                    <Text style={styles.systemChatText}>
                      {interaction.systemChat.message!}
                    </Text>
                  </View>
                )}
              </React.Fragment>
            ))}
            <View style={{ padding: 35 }}></View>
          </ScrollView>
        )}
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
            <Pressable
              style={styles.sendButtonContainer}
              onPress={handleSubmit}
            >
              <Ionicons
                name={message.trim() ? "arrow-up" : "mic"}
                size={20}
                color={"white"}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#3A2D2D",
    alignItems: "center",
    justifyContent: "flex-start",
  },
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
  scrollView: {
    padding: 16,
    paddingTop: 70,
  },
});
