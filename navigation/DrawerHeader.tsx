import React from "react";
import { StyleSheet, SafeAreaView, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

type DrawerParamList = {
  Chat: undefined;
  "Mood Diary": undefined;
};

type NavigationProp = DrawerNavigationProp<DrawerParamList>;

export default function DrawerHeader({
  color = "#A9A9A9",
}: {
  color?: string;
}) {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => navigation.openDrawer()}>
        <MaterialIcons name="menu" size={30} color={color} />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 40,
    left: 20,
  },
});
