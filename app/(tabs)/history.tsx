import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function History() {
  const { state, formatCurrency } = useApp();

  if (state.transactions.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>History</Text>
        </View>
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📜</Text>
          <Text style={styles.emptyTitle}>No transactions yet</Text>
          <Text style={styles.emptySubtitle}>Your transaction history will appear here</Text>
        </View>
      </View>
    );
  }

  // Group transactions by date
  const groupedTransactions = state.transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(transaction);
    return acc;
  }, {} as Record<string, typeof state.transactions>);

  const renderTransaction = (transaction: typeof state.transactions[0]) => (
    <View key={transaction.id} style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <View style={[
          styles.iconContainer, 
          { backgroundColor: transaction.type === 'income' ? '#E8F5E9' : '#FFEBEE' }
        ]}>
          <Text style={styles.icon}>{transaction.type === 'income' ? '↓' : '↑'}</Text>
        </View>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionDescription}>{transaction.description}</Text>
          <Text style={styles.transactionCategory}>{transaction.category}</Text>
        </View>
      </View>
      <Text style={[
        styles.transactionAmount,
        { color: transaction.type === 'income' ? '#4CAF50' : '#F44336' }
      ]}>
        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
      </View>
      
      {Object.entries(groupedTransactions).map(([date, transactions]) => (
        <View key={date} style={styles.dateGroup}>
          <Text style={styles.dateHeader}>{date}</Text>
          {transactions.map(renderTransaction)}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 15,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  dateGroup: {
    marginTop: 20,
  },
  dateHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  transactionCategory: {
    fontSize: 13,
    color: '#666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
