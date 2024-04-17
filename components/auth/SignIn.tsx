import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import React from "react";
import { InputTitlePlaceholder } from "../../models/general-models";
import InputCluster from "./general-components/InputCluster";
import ActionCluster from "./general-components/ActionCluster";

export default function SignIn() {
  const inputArr = [
    { title: "Username", placeHolder: "John Doe" },
    { title: "Password", placeHolder: "8 characters or more" },
  ] as InputTitlePlaceholder[];

  return (
    <>
      <View style={[styles.mainContainer, styles.boxShadow]}>
        <InputCluster inputArr={inputArr} />
        <ActionCluster title={"Log In"} />
      </View>
      <Pressable style={styles.container}>
        <Text style={styles.logIn}>Forgot Password?</Text>
      </Pressable>
      <Pressable style={styles.signInContainer}>
        <Text style={styles.subtitle}>Already have an account?</Text>
        <Text style={styles.logIn}>Sign In</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 8,
    zIndex: 1,
    justifyContent: "center",
    width: "85%",
  },
  signInContainer: {
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    position: "absolute",
    flexDirection: "row",
    bottom: 40,
  },
  subtitle: {
    fontSize: 16,
    color: "#7d7d7d",
  },
  logIn: {
    fontSize: 16,
    color: "#534141",
    textDecorationLine: "underline",
  },
  mainContainer: {
    backgroundColor: "#f3f3f3",
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
});
