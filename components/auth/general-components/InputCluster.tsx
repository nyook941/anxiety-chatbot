import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
} from "react-native";
import React from "react";
import { InputTitlePlaceholder } from "../../../models/general-models";

export default function InputCluster({
  inputArr,
}: {
  inputArr: InputTitlePlaceholder[];
}) {
  return (
    <KeyboardAvoidingView>
      {inputArr.map((item) => (
        <View key={item.title}>
          <Text style={styles.title}>{item.title}</Text>
          <TextInput
            style={styles.input}
            placeholder={item.placeHolder}
            placeholderTextColor={"#7D7D7D"}
          />
        </View>
      ))}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#D9D9D9",
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginTop: 8,
    marginBottom: 16,
  },
});
