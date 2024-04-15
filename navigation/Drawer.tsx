import { View, Text } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Chatbot from "../components/chatbot/Chatbot";
import MoodDiary from "../components/mood-diary/MoodDiary";
import DrawerHeader from "./DrawerHeader";
import { useDispatch } from "react-redux";
import { postUserSignInData } from "../redux/slices/user-slice";
import { getCurrentUser } from "@aws-amplify/auth";
import { AppDispatch } from "../redux/store";

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  const dispatch = useDispatch<AppDispatch>();
  const userData = async () => {
    return await getCurrentUser();
  };

  userData().then((data) => {
    const userData = {
      username: data.username,
      email: undefined,
      birthdate: undefined,
      id: data.userId,
    };
    dispatch(postUserSignInData(userData));
  });

  return (
    <Drawer.Navigator initialRouteName="Chat">
      <Drawer.Screen
        name="Chat"
        component={Chatbot}
        options={{
          header: () => <DrawerHeader />,
        }}
      />
      <Drawer.Screen
        name="Mood Diary"
        component={MoodDiary}
        options={{
          header: () => <DrawerHeader color={"black"} background={"white"} />,
        }}
      />
    </Drawer.Navigator>
  );
}
