/**
 * Type definitions for SmartBizFlow Admin Portal
 */

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Staff';
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
  status: 'Active' | 'Inactive';
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'New' | 'Qualified' | 'Won' | 'Lost';
  assignedTo: string;
  source: string;
  value: number;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  category: string;
  description: string;
  status: 'Active' | 'Inactive';
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  amount: number;
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue';
  dueDate: string;
  createdAt: string;
  paidAt?: string;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  contactPerson: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
}

export interface DashboardStats {
  totalLeads: number;
  totalCustomers: number;
  totalProducts: number;
  monthlyRevenue: number;
  pendingOrders: number;
  lowStockItems: number;
}

export interface ChartData {
  name: string;
  value: number;
  month?: string;
  sales?: number;
  revenue?: number;
}

export interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  type: 'login' | 'lead' | 'order' | 'user' | 'system';
}

export interface AutomationRule {
  id: string;
  name: string;
  type: 'email' | 'assignment' | 'notification' | 'report';
  trigger: string;
  condition: string;
  action: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
  lastRun?: string;
}

export interface FileUpload {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
  category: 'contract' | 'invoice' | 'document' | 'image';
}
