import { router, usePathname } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

export default function NotFoundView() {
  const theme = useTheme();
  const pathname = usePathname();

  const handleGoHome = () => {
    // Check if can go back, otherwise redirect to home
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/"); // or router.push("/")
    }
  };

  const handleTryAgain = () => {
    // Navigate to the same path to "refresh" the page
    router.replace(pathname);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* 404 Icon */}
        <MaterialIcons
          name="error-outline"
          size={80}
          color={theme.colors.outline}
          style={styles.icon}
        />

        {/* Title and description */}
        <Text variant="headlineMedium" style={styles.title}>
          Oops! Page Not Found
        </Text>
        <Text
          variant="bodyLarge"
          style={[styles.description, { color: theme.colors.onSurfaceVariant }]}
        >
          The page you're looking for doesn't exist or has been moved.
        </Text>

        {/* Action buttons */}
        <View style={styles.buttonContainer}>
          <Button
            icon="home"
            mode="contained"
            onPress={handleGoHome}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Back to Home
          </Button>

          <Button
            icon="refresh"
            mode="outlined"
            onPress={handleTryAgain}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Try Again
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  icon: {
    marginBottom: 24,
  },
  title: {
    textAlign: "center",
    marginBottom: 12,
    fontWeight: "bold",
  },
  description: {
    textAlign: "center",
    marginBottom: 32,
    paddingHorizontal: 16,
    lineHeight: 24,
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 200,
    gap: 12,
  },
  button: {
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});
