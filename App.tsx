import { Provider, useSelector } from "react-redux";
import { RootState, store } from "./redux/store";
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Amplify } from "aws-amplify";
import amplifyconfig from "./amplifyconfiguration.json";
import { DataStore } from "@aws-amplify/datastore";
import RootNavigator from "./navigation/RootNavigator";
Amplify.configure(amplifyconfig);

export default function App() {
  DataStore.start();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}
