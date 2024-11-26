import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Category, Transaction } from "@/assets/types/db";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const db = useSQLiteContext();

  useEffect(() => {
    db.withTransactionAsync(async () => {
      await getData();
    });
  }, [db]);

  async function getData() {
    const result = await db.getAllAsync(`SELECT * FROM Transactions`);
    console.log(result);
  }

  return (
    <View>
      <SQLiteProvider databaseName="buddyDB.db">
        <Text>Home</Text>
      </SQLiteProvider>
    </View>
  );
}
