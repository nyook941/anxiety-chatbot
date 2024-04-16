import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Platform,
} from "react-native";
import React from "react";

export default function SignUp() {
  return (
    <>
      <Text style={styles.title}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="enter username"
        placeholderTextColor={"#7D7D7D"}
      />
      <Text style={styles.title}>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="example@gmail.com"
        placeholderTextColor={"#7D7D7D"}
      />
      <Text style={styles.title}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a password of at least 8 digits"
        placeholderTextColor={"#7D7D7D"}
      />
      <Text style={styles.title}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Re-enter your password"
        placeholderTextColor={"#7D7D7D"}
      />
      <View style={styles.buttonsContainer}>
        <Pressable style={[styles.signUpButton, styles.boxShadow]}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </Pressable>
        <View style={styles.divContainer}>
          <View style={styles.divBar} />
          <Text style={styles.or}>or</Text>
          <View style={styles.divBar} />
        </View>
        <Pressable style={[styles.thirdPartyButton, styles.boxShadow]}>
          <Text style={styles.thirdPartyText}>Google</Text>
        </Pressable>
        <Pressable style={[styles.thirdPartyButton, styles.boxShadow]}>
          <Text style={styles.thirdPartyText}>Apple</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginTop: 8,
    marginBottom: 16,
  },
  signUpButton: {
    backgroundColor: "#534141",
    borderRadius: 10,
    width: 180,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  buttonsContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  divBar: {
    backgroundColor: "#d7d7d7",
    height: 1,
    flex: 1,
    marginTop: 2,
  },
  or: {
    color: "#d7d7d7",
    fontSize: 16,
    paddingHorizontal: 5,
  },
  divContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
  },
  thirdPartyButton: {
    backgroundColor: "white",
    borderRadius: 10,
    width: 180,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  thirdPartyText: {
    color: "black",
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
});
