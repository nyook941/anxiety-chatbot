import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Title({
  title,
  subtitle,
  altSubtitle = null,
}: {
  title: string;
  subtitle: string;
  altSubtitle?: string | null;
}) {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.mainSubtitle}>{subtitle}</Text>
      {altSubtitle && <Text style={styles.altSub}>{altSubtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontWeight: "500",
    fontSize: 24,
  },
  mainSubtitle: {
    color: "white",
    fontSize: 16,
  },
  titleContainer: {
    position: "absolute",
    top: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  altSub: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
