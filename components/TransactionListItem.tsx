import React from "react";
import { View } from "react-native";
import { List, Text } from "react-native-paper";

type TransactionListItemProps = {
  title: string;
  description: string;
  icon: string;
  amount: number;
  type: string;
};

export default function TransactionListItem({
  title,
  description,
  icon,
  amount,
  type,
}: TransactionListItemProps) {
  const getAmountColor = (amount: number) => {
    return amount > 0 ? "#4CAF50" : "#F44336"; // Green for positive, red for negative
  };

  const formatAmount = (amount: number) => {
    const isPositive = amount > 0;
    const formattedAmount = Math.abs(amount).toLocaleString("id-ID");
    return `${isPositive ? "+" : "-"} Rp ${formattedAmount}`;
  };

  return (
    <List.Item
      title={title}
      description={description}
      left={(props) => <List.Icon {...props} icon={icon} />}
      right={() => (
        <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
          <Text
            style={{
              color: getAmountColor(amount),
              fontWeight: "bold",
              fontSize: 14,
            }}
          >
            {formatAmount(amount)}
          </Text>
        </View>
      )}
      titleStyle={{ fontWeight: "600" }}
      descriptionStyle={{ fontSize: 12, opacity: 0.7 }}
    />
  );
}
