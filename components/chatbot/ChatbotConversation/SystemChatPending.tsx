import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export default function SystemChatPending() {
  const { pendingRequest } = useSelector((state: RootState) => state.chat);

  return (
    <>
      {pendingRequest > 0 && (
        <View style={styles.systemChatPendingContainer}>
          <Image
            style={styles.loadingGif}
            source={require("../../../assets/typing.gif")}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  systemChatPendingContainer: {
    backgroundColor: "#EEEEEE",
    maxWidth: "75%",
    alignSelf: "flex-start",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    marginVertical: 16,
  },
  loadingGif: {
    height: 30,
    width: 40,
    margin: 8,
  },
});
