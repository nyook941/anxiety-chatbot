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
import AuthUI from "./AuthUI";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigation } from "@react-navigation/native";
import {
  setConfirmPassword,
  setEmail,
  setPassword,
  setUsername,
} from "../../redux/slices/auth-slice";

export default function SignUp() {
  const dispatch = useDispatch();
  const { username, password, email, confirmPassword } = useSelector(
    (state: RootState) => state.auth
  );
  const navigation = useNavigation();

  const inputArr = [
    {
      title: "Username",
      placeHolder: "John Doe",
      value: username,
      setValue: (val: string) => dispatch(setUsername(val)),
    },
    {
      title: "Email",
      placeHolder: "johndoe@gmail.com",
      value: email,
      setValue: (val: string) => dispatch(setEmail(val)),
    },
    {
      title: "Password",
      placeHolder: "8 characters or more",
      value: password,
      setValue: (val: string) => dispatch(setPassword(val)),
    },
    {
      title: "Confirm Password",
      placeHolder: "re-enter your password",
      value: confirmPassword,
      setValue: (val: string) => dispatch(setConfirmPassword(val)),
    },
  ] as InputTitlePlaceholder[];

  const handleSignInPress = () => {
    navigation.navigate("SignIn" as never);
  };

  return (
    <AuthUI>
      <Title
        title={"Sign Up"}
        subtitle="please create an account to continue"
      />
      <View style={[styles.mainContainer, styles.boxShadow]}>
        <InputCluster inputArr={inputArr} />
        <ActionCluster title={"Sign Up"} mainAction={} />
      </View>
      <Pressable style={styles.signInContainer} onPress={handleSignInPress}>
        <Text style={styles.subtitle}>Already have an account?</Text>
        <Text style={styles.logIn}>Sign In</Text>
      </Pressable>
    </AuthUI>
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
