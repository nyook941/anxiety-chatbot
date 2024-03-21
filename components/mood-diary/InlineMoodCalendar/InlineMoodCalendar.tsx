import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { MoodDiaryService } from "../MoodDiaryServices";
import InlineMoodCalendarItems from "./InlineMoodCalendarItems";

export default function InlineMoodCalendar() {
  // MoodDiaryService.addDatesForMonth();
  console.log(MoodDiaryService.getDatesArray());

  return (
    <View style={styles.container}>
      <FlatList
        data={MoodDiaryService.getDatesArray()}
        renderItem={({ item }) => <InlineMoodCalendarItems item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
