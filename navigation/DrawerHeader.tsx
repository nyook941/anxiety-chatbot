import React, { useEffect, useRef } from "react";
import { StyleSheet, SafeAreaView, Pressable, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type DrawerParamList = {
  Chat: undefined;
  "Mood Diary": undefined;
  "User Info": undefined;
};

type NavigationProp = DrawerNavigationProp<DrawerParamList>;

export default function DrawerHeader({
  color = "#A9A9A9",
  background = "#272020",
}: {
  color?: string;
  background?: string;
}) {
  const navigation = useNavigation<NavigationProp>();
  const { isScreenScrolled } = useSelector((state: RootState) => state.general);

  const backgroundAnim = useRef(new Animated.Value(0)).current;
  const backgroundColor = backgroundAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["transparent", background],
  });
  const borderColor = backgroundAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["transparent", color],
  });

  useEffect(() => {
    Animated.timing(backgroundAnim, {
      toValue: isScreenScrolled ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isScreenScrolled]);

  return (
    <SafeAreaView>
      <Animated.View
        style={[styles.container, { backgroundColor, borderColor }]}
      >
        <Pressable onPress={() => navigation.openDrawer()}>
          <MaterialIcons name="menu" size={30} color={color} />
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 40,
    left: 20,
    padding: 5,
    borderRadius: 30,
    borderWidth: 1,
  },
});
