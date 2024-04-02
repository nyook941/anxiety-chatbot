import { Provider } from "react-redux";
import { store } from "./redux/store";
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigation from "./navigation/Drawer";
import { Amplify } from "aws-amplify";
import amplifyconfig from "./src/amplifyconfiguration.json";
import { withAuthenticator } from "@aws-amplify/ui-react-native";
Amplify.configure(amplifyconfig);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <DrawerNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default withAuthenticator(App);
