import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeadingSection from '../../components/HeadingSection';
import ItemListProvider from '../../components/ItemListProvider';
import AddTransactionModal from '../../components/AddTransactionModal';
import EditBalanceModal from '../../components/EditBalanceModal';
import { Transaction } from '../../types';

export default function Home() {
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isEditBalanceModalVisible, setEditBalanceModalVisible] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const handleAddTransaction = () => {
    setEditingTransaction(null);
    setAddModalVisible(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setAddModalVisible(true);
  };

  const handleCloseModal = () => {
    setAddModalVisible(false);
    setEditingTransaction(null);
  };

  return (
    <View style={styles.container}>
      <HeadingSection onEditBalance={() => setEditBalanceModalVisible(true)} />
      
      <ItemListProvider
        onAddTransaction={handleAddTransaction}
        onEditTransaction={handleEditTransaction}
      />

      <AddTransactionModal
        visible={isAddModalVisible}
        onClose={handleCloseModal}
        editingTransaction={editingTransaction}
      />

      <EditBalanceModal
        visible={isEditBalanceModalVisible}
        onClose={() => setEditBalanceModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
