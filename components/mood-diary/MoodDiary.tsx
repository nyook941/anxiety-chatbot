import {
  Text,
  StyleSheet,
  SafeAreaView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import React from "react";
import { MoodDiaryService } from "./MoodDiaryServices";
import InlineMoodCalendarItems from "./InlineMoodCalendar/InlineMoodCalendarItems";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { setIsScreenScrolled } from "../../redux/slices/general-slice";

export default function MoodDiary() {
  const dispatch = useDispatch();
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const isScrolled = event.nativeEvent.contentOffset.y > 0;
    dispatch(setIsScreenScrolled(isScrolled));
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        keyExtractor={(item) => item}
        ListHeaderComponent={<Text style={styles.title}>Mood Diary</Text>}
        data={MoodDiaryService.getDatesArray()}
        renderItem={({ item }) => <InlineMoodCalendarItems item={item} />}
        showsVerticalScrollIndicator={false}
        onEndReached={() => MoodDiaryService.addDatesForMonth()}
        onScroll={handleScroll}
        scrollEventThrottle={16}
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
