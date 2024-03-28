import { StyleSheet, Image, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export default function SystemChatPending() {
  const { pendingRequest, conversation } = useSelector(
    (state: RootState) => state.chat
  );
  const [isPending, setIsPending] = useState<boolean>(true);

  const ySlideAnim = useRef<Animated.Value>(new Animated.Value(200)).current;
  const xSlideAnim = useRef<Animated.Value>(new Animated.Value(-200)).current;

  useEffect(() => {
    if (pendingRequest > 0 || conversation.length === 1) {
      setIsPending(true);
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(xSlideAnim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(ySlideAnim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
        ]).start();
      }, 500);
    } else {
      Animated.parallel([
        Animated.timing(xSlideAnim, {
          toValue: -200,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(ySlideAnim, {
          toValue: 200,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => setIsPending(false));
    }
  }, [pendingRequest]);

  return (
    <>
      {isPending && (
        <Animated.View
          style={[
            styles.systemChatPendingContainer,
            {
              transform: [
                { translateX: xSlideAnim },
                { translateY: ySlideAnim },
              ],
            },
          ]}
        >
          <Image
            style={styles.loadingGif}
            source={require("../../../assets/typing.gif")}
          />
        </Animated.View>
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
