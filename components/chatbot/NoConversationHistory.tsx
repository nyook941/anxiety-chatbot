import React, { useEffect, useState } from "react";
import {
  LayoutAnimation,
  Platform,
  UIManager,
  StyleSheet,
  View,
  Text,
  Image,
  Keyboard,
} from "react-native";
import SuggestedChat from "./SuggestedChat";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function NoConversationHistory() {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setKeyboardVisible(false);
      }
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <>
      <View style={styles.iconTitleView}>
        <Image
          style={styles.logo}
          source={require("../../assets/butterfly-icon.png")}
        />
        <Text style={styles.subtitle}>How are you feeling today?</Text>
      </View>
      {!keyboardVisible && (
        <View style={styles.suggestedChatView}>
          <SuggestedChat
            title={"I'm feeling great today!"}
            subtitle={"Let me tell you about my day."}
          />
          <SuggestedChat
            title={"I'm feeling anxious,"}
            subtitle={"help me calm down."}
          />
          <SuggestedChat
            title={"I want to know more"}
            subtitle={"about breast cancer symptoms."}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: "space-evenly",
  //   alignItems: "center",
  // },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    opacity: 0.8,
  },
  subtitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "500",
  },
  iconTitleView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
    padding: 32,
  },
  suggestedChatView: {
    justifyContent: "space-evenly",
    flex: 1,
    width: "100%",
    padding: 32,
    alignItems: "center",
  },
});
