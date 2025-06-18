import HeadingSection from "@/components/HeadingSection";
import HistoryFAB from "@/components/HistoryFAB";
import ItemListProvider from "@/components/ItemListProvider";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeView() {
  const theme = useTheme();

  return (
    <>
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <View>
          <HeadingSection />
        </View>
        <View style={styles.listContainer}>
          <ItemListProvider />
        </View>
        <HistoryFAB />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  listContainer: {
    flex: 1,
  },
});
