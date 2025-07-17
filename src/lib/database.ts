/**
 * Database layer for Smart ERP + CRM
 * Handles data persistence using localStorage for browser compatibility
 */

import { User, Lead, Product } from '../types';

// Database interface
export interface DatabaseQuery {
  sql: string;
  params?: any[];
}

// Simple in-memory database with localStorage persistence
class Database {
  private storage: Storage;
  private tables: { [key: string]: any[] } = {};

  constructor() {
    this.storage = localStorage;
    this.loadTables();
  }

  private loadTables(): void {
    try {
      const storedTables = this.storage.getItem('smarterp_tables');
      if (storedTables) {
        this.tables = JSON.parse(storedTables);
      }
    } catch (error) {
      console.error('Error loading tables from storage:', error);
      this.tables = {};
    }
  }

  private saveTables(): void {
    try {
      this.storage.setItem('smarterp_tables', JSON.stringify(this.tables));
    } catch (error) {
      console.error('Error saving tables to storage:', error);
    }
  }

  private getTable(tableName: string): any[] {
    if (!this.tables[tableName]) {
      this.tables[tableName] = [];
    }
    return this.tables[tableName];
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  query(sql: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const trimmedSql = sql.trim().toLowerCase();
        
        if (trimmedSql.startsWith('select')) {
          resolve(this.handleSelect(sql, params));
        } else if (trimmedSql.startsWith('insert')) {
          resolve(this.handleInsert(sql, params));
        } else if (trimmedSql.startsWith('update')) {
          resolve(this.handleUpdate(sql, params));
        } else if (trimmedSql.startsWith('delete')) {
          resolve(this.handleDelete(sql, params));
        } else if (trimmedSql.startsWith('create')) {
          resolve(this.handleCreate(sql, params));
        } else {
          resolve({ rows: [], rowCount: 0 });
        }
      } catch (error) {
        console.error('Database query error:', error);
        reject(error);
      }
    });
  }

  private handleSelect(sql: string, params: any[]): any {
    const tableName = this.extractTableName(sql);
    const table = this.getTable(tableName);
    
    if (sql.includes('COUNT(*)')) {
      return { rows: [{ count: table.length }], rowCount: 1 };
    }
    
    if (sql.includes('WHERE')) {
      const filtered = this.filterRows(table, sql, params);
      return { rows: filtered, rowCount: filtered.length };
    }
    
    return { rows: table, rowCount: table.length };
  }

  private handleInsert(sql: string, params: any[]): any {
    const tableName = this.extractTableName(sql);
    const table = this.getTable(tableName);
    
    const newRecord = this.createRecord(sql, params);
    newRecord.id = this.generateId();
    newRecord.created_at = new Date().toISOString();
    newRecord.updated_at = new Date().toISOString();
    
    table.push(newRecord);
    this.saveTables();
    
    return { rows: [newRecord], rowCount: 1 };
  }

  private handleUpdate(sql: string, params: any[]): any {
    const tableName = this.extractTableName(sql);
    const table = this.getTable(tableName);
    
    const whereClause = this.extractWhereClause(sql);
    const updates = this.extractUpdates(sql, params);
    
    let updatedCount = 0;
    table.forEach(record => {
      if (this.matchesWhere(record, whereClause, params)) {
        Object.assign(record, updates);
        record.updated_at = new Date().toISOString();
        updatedCount++;
      }
    });
    
    this.saveTables();
    return { rows: [], rowCount: updatedCount };
  }

  private handleDelete(sql: string, params: any[]): any {
    const tableName = this.extractTableName(sql);
    const table = this.getTable(tableName);
    
    const whereClause = this.extractWhereClause(sql);
    const initialLength = table.length;
    
    this.tables[tableName] = table.filter(record => 
      !this.matchesWhere(record, whereClause, params)
    );
    
    this.saveTables();
    return { rows: [], rowCount: initialLength - this.tables[tableName].length };
  }

  private handleCreate(sql: string, params: any[]): any {
    const tableName = this.extractTableName(sql);
    if (!this.tables[tableName]) {
      this.tables[tableName] = [];
    }
    this.saveTables();
    return { rows: [], rowCount: 0 };
  }

  private extractTableName(sql: string): string {
    const matches = sql.match(/(?:FROM|INTO|UPDATE|CREATE TABLE)\s+(\w+)/i);
    return matches ? matches[1] : 'unknown';
  }

  private extractWhereClause(sql: string): string {
    const matches = sql.match(/WHERE\s+(.+?)(?:\s+ORDER|\s+GROUP|\s+LIMIT|$)/i);
    return matches ? matches[1] : '';
  }

  private extractUpdates(sql: string, params: any[]): any {
    const setClause = sql.match(/SET\s+(.+?)\s+WHERE/i);
    const updates: any = {};
    
    if (setClause) {
      const pairs = setClause[1].split(',');
      pairs.forEach((pair, index) => {
        const [key] = pair.trim().split('=');
        updates[key.trim()] = params[index];
      });
    }
    
    return updates;
  }

  private createRecord(sql: string, params: any[]): any {
    const columnsMatch = sql.match(/\(([^)]+)\)/);
    const record: any = {};
    
    if (columnsMatch) {
      const columns = columnsMatch[1].split(',').map(col => col.trim());
      columns.forEach((col, index) => {
        record[col] = params[index];
      });
    }
    
    return record;
  }

  private filterRows(table: any[], sql: string, params: any[]): any[] {
    const whereClause = this.extractWhereClause(sql);
    return table.filter(record => this.matchesWhere(record, whereClause, params));
  }

  private matchesWhere(record: any, whereClause: string, params: any[]): boolean {
    if (!whereClause) return true;
    
    // Simple WHERE clause matching
    if (whereClause.includes('=')) {
      const [field] = whereClause.split('=');
      const fieldName = field.trim();
      return record[fieldName] === params[params.length - 1];
    }
    
    return true;
  }
}

// Global database instance
let dbInstance: Database;

/**
 * Initialize the database connection
 */
export function initializeDatabase(): boolean {
  try {
    dbInstance = new Database();
    console.log('Database initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    return false;
  }
}

/**
 * Get database instance
 */
export function getDatabase(): Database {
  if (!dbInstance) {
    initializeDatabase();
  }
  return dbInstance;
}

/**
 * Execute a database query
 */
export async function query(sql: string, params?: any[]): Promise<any> {
  const db = getDatabase();
  return db.query(sql, params || []);
}

/**
 * Create all required tables
 */
export async function createTables(): Promise<void> {
  const db = getDatabase();
  
  // Create tables
  await db.query(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL,
    department TEXT,
    phone TEXT,
    status TEXT DEFAULT 'active',
    created_at TEXT,
    updated_at TEXT,
    last_login TEXT
  )`);

  await db.query(`CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    company TEXT,
    status TEXT DEFAULT 'new',
    source TEXT,
    value REAL,
    created_at TEXT,
    updated_at TEXT
  )`);

  await db.query(`CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price REAL,
    cost REAL,
    stock_quantity INTEGER,
    category TEXT,
    sku TEXT,
    created_at TEXT,
    updated_at TEXT
  )`);

  // Create default admin user if not exists
  try {
    const existingAdmin = await db.query(
      'SELECT * FROM users WHERE email = ?',
      ['admin@globalcyberit.com']
    );

    if (existingAdmin.rows.length === 0) {
      await db.query(
        `INSERT INTO users (name, email, password_hash, role, department, phone, status)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          'Admin User',
          'admin@globalcyberit.com',
          'admin123',
          'admin',
          'IT',
          '+91 9876543210',
          'active'
        ]
      );
      console.log('Default admin user created');
    }
  } catch (error) {
    console.error('Error creating default admin user:', error);
  }
}
