import { Provider } from "react-redux";
import { store } from "./redux/store";
import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigation from "./navigation/Drawer";
import { MoodDiaryService } from "./components/mood-diary/MoodDiaryServices";

export default function App() {
  useEffect(() => {
    MoodDiaryService.addDatesForMonth();
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <DrawerNavigation />
      </NavigationContainer>
    </Provider>
  );
}
