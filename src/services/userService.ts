/**
 * User service for managing user operations
 */

import { User } from '../types';
import { query } from '../lib/database';

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: string;
  department?: string;
  phone?: string;
  permissions?: string[];
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  role?: string;
  department?: string;
  phone?: string;
  status?: string;
  permissions?: string[];
}

export interface UserStats {
  total_users: string;
  active_users: string;
  inactive_users: string;
}

/**
 * Get all users from the database
 */
export async function getAllUsers(): Promise<User[]> {
  try {
    const result = await query('SELECT * FROM users ORDER BY created_at DESC');
    return result.rows.map(row => ({
      ...row,
      permissions: row.permissions ? JSON.parse(row.permissions) : []
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
}

/**
 * Get user by ID
 */
export async function getUserById(id: string): Promise<User | null> {
  try {
    const result = await query('SELECT * FROM users WHERE id = ?', [id]);
    if (result.rows.length === 0) return null;
    
    const user = result.rows[0];
    return {
      ...user,
      permissions: user.permissions ? JSON.parse(user.permissions) : []
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const result = await query('SELECT * FROM users WHERE email = ?', [email]);
    if (result.rows.length === 0) return null;
    
    const user = result.rows[0];
    return {
      ...user,
      permissions: user.permissions ? JSON.parse(user.permissions) : []
    };
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw new Error('Failed to fetch user');
  }
}

/**
 * Create a new user
 */
export async function createUser(userData: CreateUserData): Promise<User> {
  try {
    // Check if email already exists
    const existingUser = await getUserByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const result = await query(
      `INSERT INTO users (name, email, password_hash, role, department, phone, status, permissions)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userData.name,
        userData.email,
        userData.password, // In production, this should be hashed
        userData.role,
        userData.department || null,
        userData.phone || null,
        'active',
        JSON.stringify(userData.permissions || [])
      ]
    );

    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

/**
 * Update user
 */
export async function updateUser(id: string, updates: UpdateUserData): Promise<User> {
  try {
    const setClause = [];
    const values = [];

    if (updates.name !== undefined) {
      setClause.push('name = ?');
      values.push(updates.name);
    }
    if (updates.email !== undefined) {
      setClause.push('email = ?');
      values.push(updates.email);
    }
    if (updates.role !== undefined) {
      setClause.push('role = ?');
      values.push(updates.role);
    }
    if (updates.department !== undefined) {
      setClause.push('department = ?');
      values.push(updates.department);
    }
    if (updates.phone !== undefined) {
      setClause.push('phone = ?');
      values.push(updates.phone);
    }
    if (updates.status !== undefined) {
      setClause.push('status = ?');
      values.push(updates.status);
    }
    if (updates.permissions !== undefined) {
      setClause.push('permissions = ?');
      values.push(JSON.stringify(updates.permissions));
    }

    values.push(id);

    await query(
      `UPDATE users SET ${setClause.join(', ')} WHERE id = ?`,
      values
    );

    const updatedUser = await getUserById(id);
    if (!updatedUser) {
      throw new Error('User not found after update');
    }

    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

/**
 * Delete user
 */
export async function deleteUser(id: string): Promise<void> {
  try {
    await query('DELETE FROM users WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user');
  }
}

/**
 * Update user's last login time
 */
export async function updateLastLogin(id: string): Promise<void> {
  try {
    await query(
      'UPDATE users SET last_login = ? WHERE id = ?',
      [new Date().toISOString(), id]
    );
  } catch (error) {
    console.error('Error updating last login:', error);
    // Don't throw error for last login update failure
  }
}

/**
 * Get user statistics
 */
export async function getUserStats(): Promise<UserStats> {
  try {
    const totalResult = await query('SELECT COUNT(*) as count FROM users');
    const activeResult = await query('SELECT COUNT(*) as count FROM users WHERE status = ?', ['active']);
    const inactiveResult = await query('SELECT COUNT(*) as count FROM users WHERE status = ?', ['inactive']);

    return {
      total_users: totalResult.rows[0]?.count?.toString() || '0',
      active_users: activeResult.rows[0]?.count?.toString() || '0',
      inactive_users: inactiveResult.rows[0]?.count?.toString() || '0'
    };
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return {
      total_users: '0',
      active_users: '0',
      inactive_users: '0'
    };
  }
}

/**
 * Change user password
 */
export async function changePassword(id: string, newPassword: string): Promise<void> {
  try {
    await query(
      'UPDATE users SET password_hash = ? WHERE id = ?',
      [newPassword, id] // In production, hash the password
    );
  } catch (error) {
    console.error('Error changing password:', error);
    throw new Error('Failed to change password');
  }
}

/**
 * Get users by role
 */
export async function getUsersByRole(role: string): Promise<User[]> {
  try {
    const result = await query('SELECT * FROM users WHERE role = ?', [role]);
    return result.rows.map(row => ({
      ...row,
      permissions: row.permissions ? JSON.parse(row.permissions) : []
    }));
  } catch (error) {
    console.error('Error fetching users by role:', error);
    throw new Error('Failed to fetch users');
  }
}
