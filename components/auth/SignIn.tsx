import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { InputTitlePlaceholder } from "../../models/general-models";
import InputCluster from "./general-components/InputCluster";
import ActionCluster from "./general-components/ActionCluster";
import Title from "./general-components/Title";
import AuthUI from "./AuthUI";
import { SignInInput, autoSignIn, signIn } from "@aws-amplify/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  setPassword,
  setUsername,
  signInUser,
} from "../../redux/slices/auth-slice";
import { useNavigation } from "@react-navigation/native";

export default function SignIn() {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();

  const { username, password } = useSelector((state: RootState) => state.auth);

  const inputArr = [
    {
      title: "Username",
      placeHolder: "username",
      value: username,
      setValue: (val: string) => dispatch(setUsername(val)),
    },
    {
      title: "Password",
      placeHolder: "8 characters or more",
      value: password,
      setValue: (val: string) => dispatch(setPassword(val)),
    },
  ] as InputTitlePlaceholder[];

  const handleSignIn = () => {
    dispatch(signInUser({ username: username, password: password }));
  };

  const handleSignUpPress = () => {
    navigation.navigate("SignUp" as never);
  };

  return (
    <AuthUI>
      <Title title={"Sign In"} subtitle="please sign in to continue" />
      <View style={[styles.mainContainer, styles.boxShadow]}>
        <InputCluster inputArr={inputArr} />
        <ActionCluster title={"Sign In"} mainAction={handleSignIn} />
      </View>
      <Pressable style={styles.container}>
        <Text style={styles.logIn}>Forgot Password?</Text>
      </Pressable>
      <Pressable style={styles.signInContainer} onPress={handleSignUpPress}>
        <Text style={styles.subtitle}>Don't have an account?</Text>
        <Text style={styles.logIn}>Sign Up</Text>
      </Pressable>
    </AuthUI>
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
