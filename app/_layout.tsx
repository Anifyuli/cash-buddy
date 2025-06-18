import { getTheme } from "@/themes/colorscheme";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform, useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
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
      <StatusBar
        style={colorScheme === "dark" ? "light" : "dark"}
        backgroundColor={theme.colors.surface}
        translucent={false}
      />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.surface,
          },
          headerTintColor: theme.colors.onSurface,
          headerTitleStyle: {
            fontWeight: theme.fonts.headlineSmall.fontWeight,
            fontSize: theme.fonts.headlineSmall.fontSize,
          },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Cash Buddy",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="history"
          options={{
            title: "Transaction Histories",
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            title: "Settings",
          }}
        />
        <Stack.Screen
          name="+not-found"
          options={{
            title: "Page not Found",
            headerShown: false,
          }}
        />
      </Stack>
    </PaperProvider>
  );
}
