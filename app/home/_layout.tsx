import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "Cash Buddy",
        headerTitleAlign: "center",
      }}
    />
  );
}
