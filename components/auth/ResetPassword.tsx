import { View, Text, StyleSheet, Platform, Pressable } from "react-native";
import React from "react";
import Title from "./general-components/Title";
import InputCluster from "./general-components/InputCluster";
import ActionButton from "./general-components/ActionButton";
import { InputTitlePlaceholder } from "../../models/general-models";

export default function ResetPassword() {
  const inputArr = [
    { title: "Code", placeHolder: "Code" },
    { title: "New Password", placeHolder: "New Password" },
    { title: "Confirm Password", placeHolder: "Confirm Password" },
  ] as InputTitlePlaceholder[];
  return (
    <>
      <Title
        title={"Reset Password"}
        subtitle="enter the code sent to email"
        altSubtitle={"kennan.k.wu@gmail.com"}
      />
      <View style={[styles.mainContainer, styles.boxShadow]}>
        <InputCluster inputArr={inputArr} />
        <ActionButton type={"primary"} title={"Submit"} />
      </View>
      <Pressable style={styles.container}>
        <Text style={styles.logIn}>Resend Code</Text>
      </Pressable>
    </>
  );
}
const styles = StyleSheet.create({
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
  mainContainer: {
    backgroundColor: "#f3f3f3",
    zIndex: 1,
    padding: 16,
    width: "85%",
    borderRadius: 10,
    paddingVertical: 24,
    marginTop: 50,
  },
  logIn: {
    fontSize: 16,
    color: "#534141",
    textDecorationLine: "underline",
  },
  container: {
    flexDirection: "row",
    marginTop: 8,
    zIndex: 1,
    justifyContent: "center",
    width: "85%",
  },
});
