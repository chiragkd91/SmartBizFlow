/**
 * Lead service for managing lead operations
 */

import { Lead } from '../types';
import { query } from '../lib/database';

export interface CreateLeadData {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  source?: string;
  value?: number;
  status?: string;
  notes?: string;
}

export interface UpdateLeadData {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  source?: string;
  value?: number;
  status?: string;
  notes?: string;
}

export interface LeadStats {
  total_leads: string;
  new_leads: string;
  qualified_leads: string;
  won_leads: string;
  won_value: string;
}

/**
 * Get all leads from the database
 */
export async function getAllLeads(): Promise<Lead[]> {
  try {
    const result = await query('SELECT * FROM leads ORDER BY created_at DESC');
    return result.rows;
  } catch (error) {
    console.error('Error fetching leads:', error);
    throw new Error('Failed to fetch leads');
  }
}

/**
 * Get lead by ID
 */
export async function getLeadById(id: string): Promise<Lead | null> {
  try {
    const result = await query('SELECT * FROM leads WHERE id = ?', [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error('Error fetching lead:', error);
    throw new Error('Failed to fetch lead');
  }
}

/**
 * Create a new lead
 */
export async function createLead(leadData: CreateLeadData): Promise<Lead> {
  try {
    const result = await query(
      `INSERT INTO leads (name, email, phone, company, source, value, status, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        leadData.name,
        leadData.email || null,
        leadData.phone || null,
        leadData.company || null,
        leadData.source || 'manual',
        leadData.value || 0,
        leadData.status || 'new',
        leadData.notes || null
      ]
    );

    return result.rows[0];
  } catch (error) {
    console.error('Error creating lead:', error);
    throw error;
  }
}

/**
 * Update lead
 */
export async function updateLead(id: string, updates: UpdateLeadData): Promise<Lead> {
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
    if (updates.phone !== undefined) {
      setClause.push('phone = ?');
      values.push(updates.phone);
    }
    if (updates.company !== undefined) {
      setClause.push('company = ?');
      values.push(updates.company);
    }
    if (updates.source !== undefined) {
      setClause.push('source = ?');
      values.push(updates.source);
    }
    if (updates.value !== undefined) {
      setClause.push('value = ?');
      values.push(updates.value);
    }
    if (updates.status !== undefined) {
      setClause.push('status = ?');
      values.push(updates.status);
    }
    if (updates.notes !== undefined) {
      setClause.push('notes = ?');
      values.push(updates.notes);
    }

    values.push(id);

    await query(
      `UPDATE leads SET ${setClause.join(', ')} WHERE id = ?`,
      values
    );

    const updatedLead = await getLeadById(id);
    if (!updatedLead) {
      throw new Error('Lead not found after update');
    }

    return updatedLead;
  } catch (error) {
    console.error('Error updating lead:', error);
    throw error;
  }
}

/**
 * Delete lead
 */
export async function deleteLead(id: string): Promise<void> {
  try {
    await query('DELETE FROM leads WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error deleting lead:', error);
    throw new Error('Failed to delete lead');
  }
}

/**
 * Get lead statistics
 */
export async function getLeadStats(): Promise<LeadStats> {
  try {
    const totalResult = await query('SELECT COUNT(*) as count FROM leads');
    const newResult = await query('SELECT COUNT(*) as count FROM leads WHERE status = ?', ['new']);
    const qualifiedResult = await query('SELECT COUNT(*) as count FROM leads WHERE status = ?', ['qualified']);
    const wonResult = await query('SELECT COUNT(*) as count FROM leads WHERE status = ?', ['won']);
    const wonValueResult = await query('SELECT SUM(value) as total FROM leads WHERE status = ?', ['won']);

    return {
      total_leads: totalResult.rows[0]?.count?.toString() || '0',
      new_leads: newResult.rows[0]?.count?.toString() || '0',
      qualified_leads: qualifiedResult.rows[0]?.count?.toString() || '0',
      won_leads: wonResult.rows[0]?.count?.toString() || '0',
      won_value: wonValueResult.rows[0]?.total?.toString() || '0'
    };
  } catch (error) {
    console.error('Error fetching lead stats:', error);
    return {
      total_leads: '0',
      new_leads: '0',
      qualified_leads: '0',
      won_leads: '0',
      won_value: '0'
    };
  }
}

/**
 * Get leads by status
 */
export async function getLeadsByStatus(status: string): Promise<Lead[]> {
  try {
    const result = await query('SELECT * FROM leads WHERE status = ?', [status]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching leads by status:', error);
    throw new Error('Failed to fetch leads');
  }
}

/**
 * Search leads
 */
export async function searchLeads(searchTerm: string): Promise<Lead[]> {
  try {
    const result = await query(
      'SELECT * FROM leads WHERE name LIKE ? OR email LIKE ? OR company LIKE ?',
      [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]
    );
    return result.rows;
  } catch (error) {
    console.error('Error searching leads:', error);
    throw new Error('Failed to search leads');
  }
}
