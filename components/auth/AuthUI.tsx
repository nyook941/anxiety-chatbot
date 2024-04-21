import { View, StyleSheet, Platform, SafeAreaView } from "react-native";
import React, { ReactNode } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import EnterCode from "./EnterCode";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";

export default function AuthUI({ children }: { children?: ReactNode }) {
  return (
    <SafeAreaView style={styles.background}>
      {children}
      <View style={styles.round} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#3A2D2D",
    flex: 1,
    justifyContent: "center",
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
