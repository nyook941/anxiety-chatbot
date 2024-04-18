import {
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  View,
  Pressable,
  Platform,
} from "react-native";
import React from "react";
import ActionCluster from "./general-components/ActionCluster";
import { InputTitlePlaceholder } from "../../models/general-models";
import InputCluster from "./general-components/InputCluster";
import Title from "./general-components/Title";

export default function SignUp() {
  const inputArr = [
    { title: "Username", placeHolder: "John Doe" },
    { title: "Email", placeHolder: "johndoe@gmail.com" },
    { title: "Password", placeHolder: "8 characters or more" },
    { title: "Confirm Password", placeHolder: "re-enter your password" },
  ] as InputTitlePlaceholder[];

  return (
    <>
      <Title
        title={"Sign Up"}
        subtitle="please create an account to continue"
      />
      <View style={[styles.mainContainer, styles.boxShadow]}>
        <InputCluster inputArr={inputArr} />
        <ActionCluster title={"Sign Up"} />
      </View>
      <Pressable style={styles.signInContainer}>
        <Text style={styles.subtitle}>Already have an account?</Text>
        <Text style={styles.logIn}>Sign In</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
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
  signInContainer: {
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    position: "absolute",
    flexDirection: "row",
    bottom: 40,
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
