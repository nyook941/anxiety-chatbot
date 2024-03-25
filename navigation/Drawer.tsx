import { View, Text } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Chatbot from "../components/chatbot/Chatbot";
import MoodDiary from "../components/mood-diary/MoodDiary";
import DrawerHeader from "./DrawerHeader";

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
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
