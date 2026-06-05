import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function Settings() {
  const { state, formatCurrency, resetData } = useApp();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleExportData = () => {
    Alert.alert(
      'Export Data',
      'Your data has been exported to JSON format. Check your device storage.',
      [{ text: 'OK' }]
    );
  };

  const handleResetData = () => {
    Alert.alert(
      'Reset All Data',
      'Are you sure you want to delete all transactions and reset balance? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: () => {
            resetData();
            Alert.alert('Success', 'All data has been reset.');
          }
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      {/* Account Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Summary</Text>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Balance</Text>
            <Text style={styles.summaryValue}>{formatCurrency(state.balance)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Income</Text>
            <Text style={[styles.summaryValue, { color: '#4CAF50' }]}>
              {formatCurrency(state.income)}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Expense</Text>
            <Text style={[styles.summaryValue, { color: '#F44336' }]}>
              {formatCurrency(state.expense)}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Transactions</Text>
            <Text style={styles.summaryValue}>{state.transactions.length}</Text>
          </View>
        </View>
      </View>

      {/* Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Text style={styles.settingLabel}>Notifications</Text>
            <Text style={styles.settingDescription}>Receive transaction reminders</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#ccc', true: '#81C784' }}
            thumbColor={notificationsEnabled ? '#4CAF50' : '#f4f3f4'}
          />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Text style={styles.settingDescription}>Use dark theme</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#ccc', true: '#81C784' }}
            thumbColor={darkMode ? '#4CAF50' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Data Management */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Management</Text>
        <TouchableOpacity style={styles.settingItem} onPress={handleExportData}>
          <View style={styles.settingLeft}>
            <Text style={styles.settingLabel}>Export Data</Text>
            <Text style={styles.settingDescription}>Download all your data as JSON</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={handleResetData}>
          <View style={styles.settingLeft}>
            <Text style={[styles.settingLabel, { color: '#F44336' }]}>Reset All Data</Text>
            <Text style={styles.settingDescription}>Delete all transactions and reset balance</Text>
          </View>
          <Text style={[styles.arrow, { color: '#F44336' }]}>→</Text>
        </TouchableOpacity>
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.aboutCard}>
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>App Name</Text>
            <Text style={styles.aboutValue}>Cash Buddy</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>Version</Text>
            <Text style={styles.aboutValue}>1.0.0</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>Build</Text>
            <Text style={styles.aboutValue}>2024.01</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>Database</Text>
            <Text style={styles.aboutValue}>SQLite (expo-sqlite)</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>Developer</Text>
            <Text style={styles.aboutValue}>Cash Buddy Team</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>License</Text>
            <Text style={styles.aboutValue}>MIT</Text>
          </View>
        </View>
        <View style={styles.aboutDescription}>
          <Text style={styles.aboutDescText}>
            Cash Buddy is a simple and intuitive expense tracker application built with React Native and Expo. 
            It helps you manage your personal finances by tracking income and expenses with ease.
          </Text>
        </View>
      </View>

      {/* App Info Footer */}
      <View style={styles.footer}>
        <Text style={styles.copyright}>© 2024 Cash Buddy. All rights reserved.</Text>
      </View>
    </ScrollView>
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
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  settingLeft: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: '#999',
  },
  arrow: {
    fontSize: 20,
    color: '#ccc',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 40,
    marginTop: 20,
  },
  aboutCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  aboutLabel: {
    fontSize: 14,
    color: '#666',
  },
  aboutValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  aboutDescription: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  aboutDescText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  copyright: {
    fontSize: 12,
    color: '#ccc',
  },
});
