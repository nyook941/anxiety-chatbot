import { Text, Pressable, StyleSheet } from "react-native";
import React from "react";

export default function SuggestedChat({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <Pressable style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#A9A9A9",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: "100%",
    elevation: 8,
    backgroundColor: "#3A2D2D",
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 5,
  },
  subtitle: {
    color: "white",
    fontSize: 16,
    opacity: 0.6,
  },
});
