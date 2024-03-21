import { View, Text } from "react-native";
import React from "react";
import { MoodDiaryService } from "./MoodDiaryServices";

export default function InlineMoodCalendar() {
  MoodDiaryService.addDatesForMonth();
  console.log(MoodDiaryService.getDatesArray());

  return (
    <View>
      <Text>InlineMoodCalendar</Text>
    </View>
  );
}
