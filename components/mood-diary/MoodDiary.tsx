import { Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { MoodDiaryService } from "./MoodDiaryServices";
import InlineMoodCalendarItems from "./InlineMoodCalendar/InlineMoodCalendarItems";
import { FlatList } from "react-native-gesture-handler";

export default function MoodDiary() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        keyExtractor={(item) => item}
        ListHeaderComponent={<Text style={styles.title}>Mood Diary</Text>}
        data={MoodDiaryService.getDatesArray()}
        renderItem={({ item }) => <InlineMoodCalendarItems item={item} />}
        showsVerticalScrollIndicator={false}
        onEndReached={() => MoodDiaryService.addDatesForMonth()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D19F9F",
    width: "100%",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 48,
    fontWeight: "400",
    marginTop: 76,
  },
});
