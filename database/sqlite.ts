import * as SQLite from 'expo-sqlite';

const DB_NAME = 'cashbuddy.db';

export interface TransactionRow {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: string;
}

export interface SettingsRow {
  key: string;
  value: string;
}

class Database {
  private db: SQLite.SQLiteDatabase | null = null;

  async initialize(): Promise<void> {
    this.db = await SQLite.openDatabaseAsync(DB_NAME);
    
    // Create transactions table
    await this.db.execAsync(`
      CREATE TABLE IF NOT EXISTS transactions (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        amount REAL NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        date TEXT NOT NULL
      );
    `);

    // Create settings table
    await this.db.execAsync(`
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      );
    `);

    // Create balance setting if not exists
    await this.db.runAsync(`
      INSERT OR IGNORE INTO settings (key, value) VALUES ('balance', '0');
    `);
  }

  async getBalance(): Promise<number> {
    if (!this.db) throw new Error('Database not initialized');
    
    const result = await this.db.getFirstAsync<{ value: string }>(
      'SELECT value FROM settings WHERE key = ?',
      ['balance']
    );
    
    return result ? parseFloat(result.value) : 0;
  }

  async setBalance(balance: number): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    
    await this.db.runAsync(
      'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
      ['balance', balance.toString()]
    );
  }

  async getAllTransactions(): Promise<TransactionRow[]> {
    if (!this.db) throw new Error('Database not initialized');
    
    const rows = await this.db.getAllAsync<TransactionRow>(
      'SELECT * FROM transactions ORDER BY date DESC'
    );
    
    return rows || [];
  }

  async addTransaction(transaction: TransactionRow): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    
    await this.db.runAsync(
      `INSERT INTO transactions (id, type, amount, description, category, date) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        transaction.id,
        transaction.type,
        transaction.amount,
        transaction.description,
        transaction.category,
        transaction.date
      ]
    );
  }

  async deleteTransaction(id: string): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    
    await this.db.runAsync(
      'DELETE FROM transactions WHERE id = ?',
      [id]
    );
  }

  async updateTransaction(transaction: TransactionRow): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    
    await this.db.runAsync(
      `UPDATE transactions 
       SET type = ?, amount = ?, description = ?, category = ?, date = ? 
       WHERE id = ?`,
      [
        transaction.type,
        transaction.amount,
        transaction.description,
        transaction.category,
        transaction.date,
        transaction.id
      ]
    );
  }

  async resetAllData(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    
    await this.db.runAsync('DELETE FROM transactions');
    await this.setBalance(0);
  }

  async exportData(): Promise<string> {
    if (!this.db) throw new Error('Database not initialized');
    
    const transactions = await this.getAllTransactions();
    const balance = await this.getBalance();
    
    const data = {
      balance,
      transactions,
      exportedAt: new Date().toISOString()
    };
    
    return JSON.stringify(data, null, 2);
  }
}

export const database = new Database();
