import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import TransactionListItem from "./TransactionListItem";

const TRANSACTION_DATA = [
  {
    id: "txn_001",
    title: "Transfer to John Doe",
    description: "Dec 10, 2024 • 14:30 • Rp 500,000",
    amount: -500000,
    type: "transfer",
    icon: "bank-transfer",
    date: "2024-12-10T14:30:00Z",
  },
  {
    id: "txn_002",
    title: "Salary Payment",
    description: "Dec 9, 2024 • 08:00 • Rp 8,500,000",
    amount: 8500000,
    type: "income",
    icon: "cash-plus",
    date: "2024-12-09T08:00:00Z",
  },
  {
    id: "txn_003",
    title: "Grocery Shopping",
    description: "Dec 8, 2024 • 19:45 • Rp 350,000",
    amount: -350000,
    type: "expense",
    icon: "cart",
    date: "2024-12-08T19:45:00Z",
  },
  {
    id: "txn_004",
    title: "Online Investment",
    description: "Dec 7, 2024 • 10:15 • Rp 1,000,000",
    amount: -1000000,
    type: "investment",
    icon: "trending-up",
    date: "2024-12-07T10:15:00Z",
  },
  {
    id: "txn_005",
    title: "Refund from Store",
    description: "Dec 6, 2024 • 16:20 • Rp 125,000",
    amount: 125000,
    type: "refund",
    icon: "cash-refund",
    date: "2024-12-06T16:20:00Z",
  },
  {
    id: "txn_006",
    title: "Electricity Bill",
    description: "Dec 5, 2024 • 11:30 • Rp 275,000",
    amount: -275000,
    type: "bill",
    icon: "lightning-bolt",
    date: "2024-12-05T11:30:00Z",
  },
  {
    id: "txn_007",
    title: "Freelance Payment",
    description: "Dec 4, 2024 • 15:45 • Rp 2,500,000",
    amount: 2500000,
    type: "income",
    icon: "briefcase",
    date: "2024-12-04T15:45:00Z",
  },
  {
    id: "txn_008",
    title: "Restaurant Dinner",
    description: "Dec 3, 2024 • 20:00 • Rp 450,000",
    amount: -450000,
    type: "expense",
    icon: "silverware-fork-knife",
    date: "2024-12-03T20:00:00Z",
  },
  {
    id: "txn_009",
    title: "ATM Withdrawal",
    description: "Dec 2, 2024 • 12:15 • Rp 1,000,000",
    amount: -1000000,
    type: "withdrawal",
    icon: "credit-card",
    date: "2024-12-02T12:15:00Z",
  },
  {
    id: "txn_010",
    title: "Cashback Reward",
    description: "Dec 1, 2024 • 09:30 • Rp 50,000",
    amount: 50000,
    type: "reward",
    icon: "gift",
    date: "2024-12-01T09:30:00Z",
  },
];

export default function ItemListProvider() {
  return (
    <View style={styles.container}>
      <Text
        variant="headlineMedium"
        style={{ textAlign: "center", marginBottom: 16 }}
      >
        Transaction History
      </Text>
      <FlatList
        data={TRANSACTION_DATA}
        renderItem={({ item }) => (
          <TransactionListItem
            title={item.title}
            description={item.description}
            icon={item.icon}
            amount={item.amount}
            type={item.type}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={true}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        style={{ flex: 1 }}
        ItemSeparatorComponent={() => (
          <View
            style={{ height: 1, backgroundColor: "#E0E0E0", marginLeft: 16 }}
          />
        )}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
});
