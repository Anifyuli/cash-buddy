import { ActivityIndicator, Text, View } from "react-native";
import { Suspense, useEffect, useState } from "react";
import { SQLiteProvider } from "expo-sqlite";
import * as Db from "../utils/db";
import Home from "./home";

export default function Index() {
  const [dbLoaded, setDbLoaded] = useState<boolean>(false);
  useEffect(() => {
    Db.loadDatabase()
      .then(() => {
        setDbLoaded(true);
      })
      .catch((e) => console.error(e));
  }, []);
  if (!dbLoaded)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} />
        <Text>Loading...</Text>
      </View>
    );
  return (
    <Suspense
      fallback={
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "red",
          }}
        >
          <ActivityIndicator size={"large"} />
          <Text>Loading database...</Text>
        </View>
      }
    >
      <SQLiteProvider useSuspense databaseName="buddyDB.db">
        <Home></Home>
      </SQLiteProvider>
    </Suspense>
  );
}
