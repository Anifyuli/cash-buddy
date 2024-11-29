import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense, useEffect, useState } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import * as Db from "@/components/utils/db";

export default function Layout() {
  const [dbLoaded, setDbLoaded] = useState<boolean>(false);

  useEffect(() => {
    Db.loadDatabase()
      .then(() => {
        setDbLoaded(true);
      })
      .catch((e) => console.error("Error loading database:", e));
  }, []);

  if (!dbLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
        <Text>Loading database...</Text>
      </View>
    );
  }

  return (
    <Suspense
      fallback={
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" />
          <Text>Loading app...</Text>
        </View>
      }
    >
      <SQLiteProvider useSuspense databaseName="buddyDB.db">
        <Stack screenOptions={{ headerShown: false }} />
      </SQLiteProvider>
    </Suspense>
  );
}
