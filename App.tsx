import { Provider } from "react-redux";
import { store } from "./redux/store";
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigation from "./navigation/Drawer";
import AuthUI from "./components/auth/AuthUI";
// import { Amplify } from "aws-amplify";
// import amplifyconfig from "./amplifyconfiguration.json";
// import { withAuthenticator } from "@aws-amplify/ui-react-native";
// import { DataStore } from "@aws-amplify/datastore";
// Amplify.configure(amplifyconfig);

export default function App() {
  // DataStore.start();

  return (
    <Provider store={store}>
      <AuthUI type={"Enter Code"} />
      {/* <NavigationContainer>
        <DrawerNavigation />
      </NavigationContainer> */}
    </Provider>
  );
}

// export default withAuthenticator(App);
