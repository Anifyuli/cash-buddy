import { Dispatch, SetStateAction } from "react";
import { Category, Transaction } from "./types/type";
import { TouchableOpacity, View, Text } from "react-native";
import TransactionItem from "@/components/TransactionItem";

export default function TransactionListItem({
  transactions,
  categories,
  deleteTransaction,
}: {
  transactions: Transaction[];
  categories: Category[];
  deleteTransaction: (id: number) => Promise<void>;
}) {
  return (
    <View
      style={{
        gap: 15,
        marginBottom: 10,
        padding: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
      }}
    >
      {transactions.length > 0 ? (
        transactions.map((transaction) => {
          const categoryForCurrentItem = categories.find(
            (category) => category.id === transaction.category_id
          );
          return (
            <TouchableOpacity
              key={transaction.id}
              activeOpacity={0.7}
              onPress={() => deleteTransaction(transaction.id)}
            >
              <TransactionItem
                transaction={transaction}
                categoryInfo={categoryForCurrentItem}
              />
            </TouchableOpacity>
          );
        })
      ) : (
        <Text>Transaction not found</Text>
      )}
    </View>
  );
}
