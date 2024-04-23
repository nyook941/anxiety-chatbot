import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ActionButton from "./ActionButton";

export default function ActionCluster({
  title,
  mainAction,
}: {
  title: string;
  mainAction: () => void;
}) {
  return (
    <View style={styles.buttonsContainer}>
      <ActionButton type={"primary"} title={title} onPress={mainAction} />
      <View style={styles.divContainer}>
        <View style={styles.divBar} />
        <Text style={styles.or}>or</Text>
        <View style={styles.divBar} />
      </View>
      <ActionButton type={"secondary"} title={"Google"} onPress={mainAction} />
      <ActionButton type={"secondary"} title={"Apple"} onPress={mainAction} />
    </View>
  );
}

const styles = StyleSheet.create({
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
  divContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
  },
  or: {
    color: "#d7d7d7",
    fontSize: 16,
    paddingHorizontal: 5,
  },
});
