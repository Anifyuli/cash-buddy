import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Category, Transaction } from "@/components/types/type";
import * as FileSystem from "expo-file-system";
import TransactionListItem from "@/components/TransactionListItem";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  
  const db = useSQLiteContext();

  const deleteTransaction = async (id: number) => {
    try {
      await db.withTransactionAsync(async () => {
        await db.runAsync(`DELETE FROM Transactions WHERE id=?;`, [id]);
      });
      
      // Update state setelah menghapus
      setTransactions(prevTransactions => 
        prevTransactions.filter(transaction => transaction.id !== id)
      );
    } catch (err) {
      console.error("Error deleting transaction:", err);
      setError("Failed to delete transaction");
    }
  };

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
          `SELECT * FROM Transactions ORDER BY date DESC`
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
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        <Text>Loading data...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1">
      <TransactionListItem
        transactions={transactions}
        categories={categories}
        deleteTransaction={deleteTransaction}
      />
    </ScrollView>
  );
}
