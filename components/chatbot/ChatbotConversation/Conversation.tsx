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
import SystemChatPending from "./SystemChatPending";
import UserChatComponent from "./UserChat";
import SystemChatComponent from "./SystemChat";

export default function Conversation() {
  const { conversation } = useSelector((state: RootState) => state.chat);

  const dispatch = useDispatch<AppDispatch>();

  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const isScrolled = event.nativeEvent.contentOffset.y > 0;
    dispatch(setIsScreenScrolled(isScrolled));
  };

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
            <UserChatComponent chat={chat} />
          ) : (
            <>
              {chat.metadata.status === "fulfilled" && (
                <SystemChatComponent chat={chat} />
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
