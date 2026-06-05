import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';

interface HeadingSectionProps {
  onEditBalance?: () => void;
}

export default function HeadingSection({ onEditBalance }: HeadingSectionProps) {
  const { state, formatCurrency } = useApp();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cash Buddy</Text>
        <TouchableOpacity onPress={onEditBalance} style={styles.editButton}>
          <Text style={styles.editButtonText}>✏️</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.balanceSection}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>{formatCurrency(state.balance)}</Text>
      </View>
      
      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Text style={styles.incomeLabel}>Income</Text>
          <Text style={styles.incomeAmount}>{formatCurrency(state.income)}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryItem}>
          <Text style={styles.expenseLabel}>Expense</Text>
          <Text style={styles.expenseAmount}>{formatCurrency(state.expense)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4CAF50',
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  editButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  editButtonText: {
    fontSize: 16,
  },
  balanceSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  incomeLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  incomeAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 20,
  },
  expenseLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  expenseAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});
