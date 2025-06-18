import React from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

interface FABProps {
  onPress?: () => void;
  icon?: string;
  label?: string,
  size?: number;
}

export default function HistoryFAB({
  onPress,
  icon = "history",
  label = "History",
  size = 64,
}: FABProps) {
  return (
    <FAB customSize={size} mode="flat" icon={icon} label={label} style={styles.fab} onPress={onPress} />
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
