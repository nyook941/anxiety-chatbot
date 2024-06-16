import { View, Text } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Chatbot from "../components/chatbot/Chatbot";
import MoodDiary from "../components/mood-diary/MoodDiary";
import DrawerHeader from "./DrawerHeader";
import { useDispatch } from "react-redux";
import { postUserSignInData } from "../redux/slices/user-slice";
import { getCurrentUser, fetchUserAttributes } from "@aws-amplify/auth";
import { AppDispatch } from "../redux/store";
import UserInfo from "../components/user-settings/UserInfo";

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  const dispatch = useDispatch<AppDispatch>();
  const userData = async () => {
    const email = (await fetchUserAttributes()).email;
    const user = await getCurrentUser();
    return {
      username: user.username,
      email: email,
      birthdate: undefined,
      id: user.userId,
    };
  };

  userData().then((data) => {
    dispatch(postUserSignInData(data));
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
      <Drawer.Screen
        name="User Info"
        component={UserInfo}
        options={{
          header: () => <DrawerHeader color={"black"} background={"white"} />,
        }}
      />
    </Drawer.Navigator>
  );
}
