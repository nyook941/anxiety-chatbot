import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect } from "react";
import InlineMoodCalendar from "./InlineMoodCalendar/InlineMoodCalendar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addToMoodArr } from "../../redux/slices/mood-slice";
import { MoodDiaryService } from "./MoodDiaryServices";

export default function MoodDiary() {
  const { moodArr } = useSelector((state: RootState) => state.mood);
  const dispatch = useDispatch();
  useEffect(() => {
    const mood = {
      date: "March Thursday, 21st",
      moods: ["Happy", "Sad"],
    };
    dispatch(addToMoodArr(mood));
  }, []);
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
