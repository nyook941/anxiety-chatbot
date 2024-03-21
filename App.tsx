import { StyleSheet, View } from "react-native";
import Chatbot from "./components/chatbot/Chatbot";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import MoodDiary from "./components/mood-diary/MoodDiary";
import "react-native-gesture-handler";
import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <Provider store={store}>
      {/* <View style={styles.container}> */}
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Chat">
          <Drawer.Screen name="Chat" component={Chatbot} />
          <Drawer.Screen name="Mood Diary" component={MoodDiary} />
        </Drawer.Navigator>
      </NavigationContainer>
      {/* </View> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
