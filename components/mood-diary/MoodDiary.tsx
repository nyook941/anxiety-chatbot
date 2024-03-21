import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import InlineMoodCalendar from "./InlineMoodCalendar";

export default function MoodDiary() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mood Diary</Text>
      <InlineMoodCalendar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D19F9F",
    width: "100%",
    padding: 16,
  },
  title: {
    fontSize: 48,
    fontWeight: "400",
  },
});
