import HeadingSection from "@/components/HeadingSection";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeView() {
  const theme = useTheme();

  return (
    <>
      <StatusBar style="auto" backgroundColor={theme.colors.background} />
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <HeadingSection />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
