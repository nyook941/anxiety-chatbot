import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { signOutUser } from "../redux/slices/auth-slice";

export default function CustomDrawerContent(
  props: DrawerContentComponentProps
) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          dispatch(signOutUser());
        }}
      >
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#f5f5f5",
  },
  logoutText: {
    fontSize: 16,
    color: "#d32f2f",
  },
});
