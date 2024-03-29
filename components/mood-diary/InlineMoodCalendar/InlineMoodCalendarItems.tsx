import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { MoodDiaryService } from "../MoodDiaryServices";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

export default function InlineMoodCalendarItems({ item }: { item: string }) {
  const monthHeader = MoodDiaryService.displayMonthHeader(item);
  const { moodArr } = useSelector((state: RootState) => state.mood);

  const trimmedItem = item.substring(item.indexOf(" ") + 1);
  const moods = moodArr.find((day) => day.date === item)?.moods;

  return (
    <View>
      {monthHeader && (
        <View style={styles.monthYearContainer}>
          <Text style={styles.monthYearText}>{monthHeader} 2024</Text>
          <View style={styles.monthYearBar}></View>
        </View>
      )}
      <Text style={styles.title}>{trimmedItem}</Text>
      {moods === undefined ? (
        <>
          <Pressable style={styles.moodContainer}>
            <MaterialIcons name={"add"} size={30} />
            <View style={styles.textContainer}>
              <Text style={styles.moodText}>Add a mood</Text>
              <Text style={styles.moodTime}>
                There was no mood logged for this day
              </Text>
            </View>
          </Pressable>
          <View style={{ padding: 8 }} />
        </>
      ) : (
        <>
          {moods.map((mood) => (
            <>
              <Pressable style={styles.moodContainer}>
                <MaterialCommunityIcons
                  name={"emoticon-angry-outline"}
                  size={30}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.moodText}>{mood}</Text>
                  <Text style={styles.moodTime}>10:24</Text>
                </View>
              </Pressable>
            </>
          ))}
          <Pressable style={styles.addContainer}>
            <MaterialIcons name={"add"} size={16} />
            <Text style={styles.moodText}>Add a mood</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "500",
    paddingVertical: 8,
  },
  monthYearContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  monthYearText: {
    fontSize: 15,
    color: "#4A4A4A",
  },
  monthYearBar: {
    flex: 1,
    height: 1,
    backgroundColor: "#4A4A4A",
    marginLeft: 8,
  },
  moodContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    padding: 8,
    marginVertical: 8,
    elevation: 4,
    backgroundColor: "#D19F9F",
    flexDirection: "row",
    alignItems: "center",
  },
  moodText: {
    fontSize: 16,
    fontWeight: "500",
  },
  moodTime: {
    fontSize: 14,
    color: "#4A4A4A",
  },
  textContainer: {
    marginLeft: 8,
  },
  addContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
});
