import { View, Text, ActivityIndicator } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Category, Transaction } from "@/assets/types/db";
import * as FileSystem from "expo-file-system";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const db = useSQLiteContext();

  useEffect(() => {
    const getData = async () => {
      try {
        // Debug: Verify database exists
        const dbPath = `${FileSystem.documentDirectory}SQLite/buddyDB.db`;
        const fileInfo = await FileSystem.getInfoAsync(dbPath);
        console.log("Database path:", dbPath);
        console.log("Database exists:", fileInfo.exists);

        // Get transactions
        const transactionsResult = await db.getAllAsync(
          `SELECT * FROM Transactions`
        );
        console.log("Transactions:", transactionsResult);
        setTransactions(transactionsResult as Transaction[]);

        // Get categories
        const categoriesResult = await db.getAllAsync(
          `SELECT * FROM Categories`
        );
        console.log("Categories:", categoriesResult);
        setCategories(categoriesResult as Category[]);

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data from database");
        setIsLoading(false);
      }
    };

    getData();
  }, [db]);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading data...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Transactions</Text>
      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <View
            key={transaction.id}
            style={{
              marginBottom: 8,
              padding: 8,
              backgroundColor: "#f0f0f0",
              borderRadius: 8,
            }}
          >
            <Text>ID: {transaction.id}</Text>
            {/* Sesuaikan dengan struktur data Transaction Anda */}
          </View>
        ))
      ) : (
        <Text>No transactions found</Text>
      )}
    </View>
  );
}
