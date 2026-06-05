import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useApp } from '../context/AppContext';
import { TransactionType } from '../types';

interface AddTransactionModalProps {
  visible: boolean;
  onClose: () => void;
  editingTransaction?: Transaction | null;
}

interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: string;
  date: string;
}

const CATEGORIES = [
  'Food',
  'Transport',
  'Shopping',
  'Entertainment',
  'Bills',
  'Healthcare',
  'Salary',
  'Investment',
  'Gift',
  'Other',
];

export default function AddTransactionModal({ visible, onClose, editingTransaction }: AddTransactionModalProps) {
  const { addTransaction, updateTransaction } = useApp();
  
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Other');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  React.useEffect(() => {
    if (editingTransaction) {
      setType(editingTransaction.type);
      setAmount(editingTransaction.amount.toString());
      setDescription(editingTransaction.description);
      setCategory(editingTransaction.category);
      setDate(editingTransaction.date.split('T')[0]);
    } else {
      resetForm();
    }
  }, [editingTransaction, visible]);

  const resetForm = () => {
    setType('expense');
    setAmount('');
    setDescription('');
    setCategory('Other');
    setDate(new Date().toISOString().split('T')[0]);
  };

  const handleSubmit = () => {
    if (!amount || !description) {
      alert('Please fill in all required fields');
      return;
    }

    const transactionData = {
      type,
      amount: parseFloat(amount),
      description,
      category,
      date: new Date(date).toISOString(),
    };

    if (editingTransaction) {
      updateTransaction({ ...editingTransaction, ...transactionData });
    } else {
      addTransaction(transactionData);
    }

    resetForm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalOverlay}
      >
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.form}>
            {/* Type Selection */}
            <View style={styles.typeSelector}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  type === 'income' && styles.typeButtonActive,
                  type === 'income' && styles.typeButtonIncome,
                ]}
                onPress={() => setType('income')}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    type === 'income' && styles.typeButtonTextActive,
                  ]}
                >
                  Income
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  type === 'expense' && styles.typeButtonActive,
                  type === 'expense' && styles.typeButtonExpense,
                ]}
                onPress={() => setType('expense')}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    type === 'expense' && styles.typeButtonTextActive,
                  ]}
                >
                  Expense
                </Text>
              </TouchableOpacity>
            </View>

            {/* Amount */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Amount *</Text>
              <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                keyboardType="decimal-pad"
                placeholderTextColor="#999"
              />
            </View>

            {/* Description */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description *</Text>
              <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="What was this for?"
                placeholderTextColor="#999"
              />
            </View>

            {/* Category */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Category</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.categoryContainer}>
                  {CATEGORIES.map((cat) => (
                    <TouchableOpacity
                      key={cat}
                      style={[
                        styles.categoryChip,
                        category === cat && styles.categoryChipActive,
                      ]}
                      onPress={() => setCategory(cat)}
                    >
                      <Text
                        style={[
                          styles.categoryChipText,
                          category === cat && styles.categoryChipTextActive,
                        ]}
                      >
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Date */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date</Text>
              <TextInput
                style={styles.input}
                value={date}
                onChangeText={setDate}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#999"
              />
            </View>
          </ScrollView>

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              type === 'income' ? styles.submitButtonIncome : styles.submitButtonExpense,
            ]}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>
              {editingTransaction ? 'Update' : 'Add'} {type === 'income' ? 'Income' : 'Expense'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    padding: 20,
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  typeButtonActive: {
    borderWidth: 2,
  },
  typeButtonIncome: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  typeButtonExpense: {
    borderColor: '#F44336',
    backgroundColor: '#FFEBEE',
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  typeButtonTextActive: {
    color: '#fff',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fafafa',
  },
  categoryContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryChipActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  categoryChipText: {
    fontSize: 14,
    color: '#666',
  },
  categoryChipTextActive: {
    color: '#fff',
  },
  submitButton: {
    margin: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonIncome: {
    backgroundColor: '#4CAF50',
  },
  submitButtonExpense: {
    backgroundColor: '#F44336',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
