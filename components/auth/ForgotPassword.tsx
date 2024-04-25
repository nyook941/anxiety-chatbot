import { View, Text, StyleSheet, Platform, Pressable } from "react-native";
import React from "react";
import Title from "./general-components/Title";
import InputCluster from "./general-components/InputCluster";
import ActionButton from "./general-components/ActionButton";
import { InputTitlePlaceholder } from "../../models/general-models";
import AuthUI from "./AuthUI";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  handleResetPassword,
  setUsername,
} from "../../redux/slices/auth-slice";

export default function ForgotPassword() {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();

  const { username } = useSelector((state: RootState) => state.auth);

  const inputArr = [
    {
      title: "Username",
      placeHolder: "Enter your username",
      value: username,
      setValue: (val: string) => dispatch(setUsername(val)),
    },
  ] as InputTitlePlaceholder[];

  const handleSignIn = () => {
    navigation.navigate("SignIn" as never);
  };

  const handleForgotPassword = () => {
    dispatch(
      handleResetPassword({
        username,
        navigateCallback: () => navigation.navigate("ResetPassword" as never),
      })
    );
  };

  return (
    <AuthUI>
      <Title
        title={"Enter Username"}
        subtitle="a code will be emailed to your account"
      />
      <View style={[styles.mainContainer, styles.boxShadow]}>
        <InputCluster inputArr={inputArr} />
        <ActionButton
          type={"primary"}
          title={"Continue"}
          onPress={handleForgotPassword}
        />
      </View>
      <Pressable style={styles.container} onPress={handleSignIn}>
        <Text style={styles.logIn}>Back to Sign In</Text>
      </Pressable>
    </AuthUI>
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
