import React, { useState } from 'react';
import { View, StyleSheet, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useApp } from '../context/AppContext';

interface EditBalanceModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function EditBalanceModal({ visible, onClose }: EditBalanceModalProps) {
  const { state, setBalance, formatCurrency } = useApp();
  const [balanceInput, setBalanceInput] = useState(state.balance.toString());

  React.useEffect(() => {
    if (visible) {
      setBalanceInput(state.balance.toString());
    }
  }, [visible, state.balance]);

  const handleSave = () => {
    const newBalance = parseFloat(balanceInput);
    
    if (isNaN(newBalance)) {
      Alert.alert('Error', 'Please enter a valid number');
      return;
    }

    setBalance(newBalance);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Edit Balance</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.body}>
            <Text style={styles.currentBalanceLabel}>Current Balance</Text>
            <Text style={styles.currentBalance}>{formatCurrency(state.balance)}</Text>
            
            <Text style={styles.inputLabel}>New Balance</Text>
            <TextInput
              style={styles.input}
              value={balanceInput}
              onChangeText={setBalanceInput}
              placeholder="0.00"
              keyboardType="decimal-pad"
              placeholderTextColor="#999"
              autoFocus
            />
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '85%',
    maxWidth: 400,
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
  body: {
    padding: 20,
    alignItems: 'center',
  },
  currentBalanceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  currentBalance: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 14,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: '#fafafa',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
});
