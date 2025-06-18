import { getTheme } from "@/themes/colorscheme";
import HomeView from "@/views/HomeView";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { Platform, useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { useEffect } from "react";

export default function App() {
  const colorScheme = useColorScheme();
  const theme = getTheme(colorScheme);

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync(theme.colors.background);
      NavigationBar.setPositionAsync("relative");
    }
  }, [theme.colors.background]);

  return (
    <PaperProvider theme={theme}>
      <StatusBar style="auto" backgroundColor={theme.colors.background} />
      <HomeView />
    </PaperProvider>
  );
}
