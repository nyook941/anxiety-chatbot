import { StyleSheet, View } from "react-native";
import Chatbot from "./components/chatbot/Chatbot";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import MoodDiary from "./components/mood-diary/MoodDiary";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        {/* <Chatbot /> */}
        <MoodDiary />
      </View>
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
