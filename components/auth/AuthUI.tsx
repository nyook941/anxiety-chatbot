import { View, Text, StyleSheet, Platform } from "react-native";
import React from "react";
import SignUp from "./SignUp";

export default function AuthUI({
  type,
}: {
  type: "Sign Up" | "Sign In" | "Forgot Password" | "Enter Code";
}) {
  return (
    <View style={styles.background}>
      <Text style={styles.title}>{type}</Text>
      <Text style={styles.subtitle}>
        Please{" "}
        {type === "Forgot Password"
          ? "enter your email"
          : type === "Enter Code"
          ? "enter the code sent to your email"
          : type.toLowerCase()}{" "}
        to continue
      </Text>
      <View style={[styles.container, styles.boxShadow]}>
        <SignUp />
      </View>
      <View style={styles.round} />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#3A2D2D",
    flex: 1,
    paddingTop: 100,
    alignItems: "center",
    overflow: "hidden",
  },
  round: {
    backgroundColor: "#D9D9D9",
    height: "60%",
    position: "absolute",
    width: "140%",
    bottom: 0,
    left: "-10%",
    borderTopLeftRadius: 300,
    borderTopRightRadius: 300,
    zIndex: 0,
  },
  container: {
    backgroundColor: "#f3f3f3",
    position: "relative",
    zIndex: 1,
    padding: 16,
    width: "85%",
    borderRadius: 10,
    paddingVertical: 24,
    marginTop: 50,
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
  title: {
    color: "white",
    fontWeight: "500",
    fontSize: 24,
  },
  subtitle: {
    color: "white",
    fontSize: 16,
  },
});
