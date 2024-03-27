import {
  View,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { setIsScreenScrolled } from "../../../redux/slices/general-slice";
import { isUserChat } from "../../../models/chat-models";
import UserChat from "./UserChat";
import SystemChat from "./SystemChat";
import SystemChatPending from "./SystemChatPending";
import { fetchSystemResponse } from "../../../redux/slices/chat-slice";

export default function Conversation() {
  const { conversation } = useSelector((state: RootState) => state.chat);
  const [userChatAnimations, setUserChatAnimations] = useState<
    Animated.Value[]
  >([]);

  const dispatch = useDispatch<AppDispatch>();

  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const isScrolled = event.nativeEvent.contentOffset.y > 0;
    dispatch(setIsScreenScrolled(isScrolled));
  };

  useEffect(() => {
    console.log("adding animation");
    setUserChatAnimations([...userChatAnimations, new Animated.Value(200)]);

    const chatItem = conversation[conversation.length - 1];
    if (isUserChat(chatItem)) {
      dispatch(fetchSystemResponse(chatItem));
    }
  }, [conversation.length]);

  return (
    <ScrollView
      style={styles.scrollView}
      ref={scrollViewRef}
      onContentSizeChange={() =>
        scrollViewRef.current?.scrollToEnd({ animated: true })
      }
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      {conversation.map((chat, index) => (
        <React.Fragment key={index}>
          {isUserChat(chat) ? (
            <UserChat
              message={chat.message!}
              animation={userChatAnimations[index]}
            />
          ) : (
            <>
              {chat.metadata.status === "fulfilled" && (
                <SystemChat
                  message={
                    chat.message ?? "An error occured. Please try again later."
                  }
                />
              )}
            </>
          )}
        </React.Fragment>
      ))}
      <SystemChatPending />
      <View style={{ padding: 35 }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    padding: 16,
    paddingTop: 70,
  },
});
