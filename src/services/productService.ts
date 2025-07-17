/**
 * Product service for managing product operations
 */

import { Product } from '../types';
import { query } from '../lib/database';

export interface CreateProductData {
  name: string;
  description?: string;
  price: number;
  cost?: number;
  stock_quantity?: number;
  category?: string;
  sku?: string;
  hsn_code?: string;
  gst_rate?: number;
}

export interface UpdateProductData {
  name?: string;
  description?: string;
  price?: number;
  cost?: number;
  stock_quantity?: number;
  category?: string;
  sku?: string;
  hsn_code?: string;
  gst_rate?: number;
  status?: string;
}

export interface ProductStats {
  total_products: string;
  low_stock_items: string;
  out_of_stock: string;
  total_value: string;
}

/**
 * Get all products from the database
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const result = await query('SELECT * FROM products ORDER BY created_at DESC');
    return result.rows;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
}

/**
 * Get product by ID
 */
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const result = await query('SELECT * FROM products WHERE id = ?', [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error('Failed to fetch product');
  }
}

/**
 * Create a new product
 */
export async function createProduct(productData: CreateProductData): Promise<Product> {
  try {
    const result = await query(
      `INSERT INTO products (name, description, price, cost, stock_quantity, category, sku, hsn_code, gst_rate)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        productData.name,
        productData.description || null,
        productData.price,
        productData.cost || 0,
        productData.stock_quantity || 0,
        productData.category || 'general',
        productData.sku || null,
        productData.hsn_code || null,
        productData.gst_rate || 18
      ]
    );

    return result.rows[0];
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

/**
 * Update product
 */
export async function updateProduct(id: string, updates: UpdateProductData): Promise<Product> {
  try {
    const setClause = [];
    const values = [];

    if (updates.name !== undefined) {
      setClause.push('name = ?');
      values.push(updates.name);
    }
    if (updates.description !== undefined) {
      setClause.push('description = ?');
      values.push(updates.description);
    }
    if (updates.price !== undefined) {
      setClause.push('price = ?');
      values.push(updates.price);
    }
    if (updates.cost !== undefined) {
      setClause.push('cost = ?');
      values.push(updates.cost);
    }
    if (updates.stock_quantity !== undefined) {
      setClause.push('stock_quantity = ?');
      values.push(updates.stock_quantity);
    }
    if (updates.category !== undefined) {
      setClause.push('category = ?');
      values.push(updates.category);
    }
    if (updates.sku !== undefined) {
      setClause.push('sku = ?');
      values.push(updates.sku);
    }
    if (updates.hsn_code !== undefined) {
      setClause.push('hsn_code = ?');
      values.push(updates.hsn_code);
    }
    if (updates.gst_rate !== undefined) {
      setClause.push('gst_rate = ?');
      values.push(updates.gst_rate);
    }

    values.push(id);

    await query(
      `UPDATE products SET ${setClause.join(', ')} WHERE id = ?`,
      values
    );

    const updatedProduct = await getProductById(id);
    if (!updatedProduct) {
      throw new Error('Product not found after update');
    }

    return updatedProduct;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

/**
 * Delete product
 */
export async function deleteProduct(id: string): Promise<void> {
  try {
    await query('DELETE FROM products WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Failed to delete product');
  }
}

/**
 * Get product statistics
 */
export async function getProductStats(): Promise<ProductStats> {
  try {
    const totalResult = await query('SELECT COUNT(*) as count FROM products');
    const lowStockResult = await query('SELECT COUNT(*) as count FROM products WHERE stock_quantity < 10');
    const outOfStockResult = await query('SELECT COUNT(*) as count FROM products WHERE stock_quantity = 0');
    const totalValueResult = await query('SELECT SUM(price * stock_quantity) as total FROM products');

    return {
      total_products: totalResult.rows[0]?.count?.toString() || '0',
      low_stock_items: lowStockResult.rows[0]?.count?.toString() || '0',
      out_of_stock: outOfStockResult.rows[0]?.count?.toString() || '0',
      total_value: totalValueResult.rows[0]?.total?.toString() || '0'
    };
  } catch (error) {
    console.error('Error fetching product stats:', error);
    return {
      total_products: '0',
      low_stock_items: '0',
      out_of_stock: '0',
      total_value: '0'
    };
  }
}

/**
 * Get products by category
 */
export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const result = await query('SELECT * FROM products WHERE category = ?', [category]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw new Error('Failed to fetch products');
  }
}

/**
 * Search products
 */
export async function searchProducts(searchTerm: string): Promise<Product[]> {
  try {
    const result = await query(
      'SELECT * FROM products WHERE name LIKE ? OR description LIKE ? OR sku LIKE ?',
      [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]
    );
    return result.rows;
  } catch (error) {
    console.error('Error searching products:', error);
    throw new Error('Failed to search products');
  }
}

/**
 * Update product stock
 */
export async function updateProductStock(id: string, quantity: number): Promise<Product> {
  try {
    await query(
      'UPDATE products SET stock_quantity = ? WHERE id = ?',
      [quantity, id]
    );

    const updatedProduct = await getProductById(id);
    if (!updatedProduct) {
      throw new Error('Product not found after stock update');
    }

    return updatedProduct;
  } catch (error) {
    console.error('Error updating product stock:', error);
    throw error;
  }
}
