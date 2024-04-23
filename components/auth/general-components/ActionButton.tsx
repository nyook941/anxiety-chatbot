import { Text, Pressable, StyleSheet, Platform } from "react-native";
import React from "react";

export default function ActionButton({
  type,
  title,
  onPress,
}: {
  type: "primary" | "secondary";
  title: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        type === "primary" ? styles.signUpButton : styles.thirdPartyButton,
        styles.boxShadow,
      ]}
    >
      <Text
        style={type === "primary" ? styles.signUpText : styles.thirdPartyText}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  signUpButton: {
    backgroundColor: "#534141",
    borderRadius: 10,
    width: "100%",
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  signUpText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  boxShadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: "0 2px 2px rgba(0,0,0,0.5)",
      },
    }),
  },
  thirdPartyButton: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  thirdPartyText: {
    color: "black",
    fontSize: 16,
    fontWeight: "500",
  },
});
