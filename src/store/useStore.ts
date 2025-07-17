/**
 * Unified store for Smart ERP + CRM + HR Portal
 * Complete Indian business solution with multi-module support
 */

import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department?: string;
  phone?: string;
  status: string;
  permissions: string[];
  created_at: string;
  last_login?: string;
  password_hash: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  gstin?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  status: string;
  created_at: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: string;
  source: string;
  value: number;
  created_at: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  hsn_code?: string;
  gst_rate?: number;
  created_at: string;
}

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  salary: number;
  joining_date: string;
  status: string;
  employee_id: string;
}

interface DashboardStats {
  // CRM Stats
  totalCustomers: number;
  activeLeads: number;
  conversionRate: number;
  
  // ERP Stats
  totalProducts: number;
  totalOrders: number;
  monthlyRevenue: number;
  
  // HR Stats
  totalEmployees: number;
  presentToday: number;
  pendingLeaves: number;
  
  // GST Stats
  monthlyGST: number;
  gstCompliance: number;
  
  // Overall
  customerSatisfaction: number;
  systemUptime: number;
  totalRevenue: number;
}

interface StoreState {
  // Loading states
  loading: boolean;
  error: string | null;
  
  // Authentication
  currentUser: User | null;
  isAuthenticated: boolean;
  
  // Dashboard
  dashboardStats: DashboardStats;
  
  // Data
  users: User[];
  customers: Customer[];
  leads: Lead[];
  products: Product[];
  employees: Employee[];
  
  // Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Authentication actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  
  // Dashboard actions
  loadDashboardData: () => Promise<void>;
  
  // Data actions
  loadUsers: () => Promise<void>;
  loadCustomers: () => Promise<void>;
  loadLeads: () => Promise<void>;
  loadProducts: () => Promise<void>;
  loadEmployees: () => Promise<void>;
  
  // Initialize app
  initializeApp: () => Promise<void>;
}

// Comprehensive demo users for all modules
const DEFAULT_USERS: User[] = [
  {
    id: '1',
    name: 'Super Admin',
    email: 'admin@globalcyberit.com',
    password_hash: 'admin123',
    role: 'admin',
    department: 'IT',
    phone: '+91 9876543210',
    status: 'active',
    permissions: [
      // CRM permissions
      'crm.view', 'crm.create', 'crm.edit', 'crm.delete',
      'customers.view', 'customers.create', 'customers.edit', 'customers.delete',
      'leads.view', 'leads.create', 'leads.edit', 'leads.delete',
      
      // ERP permissions
      'erp.view', 'erp.create', 'erp.edit', 'erp.delete',
      'products.view', 'products.create', 'products.edit', 'products.delete',
      'orders.view', 'orders.create', 'orders.edit', 'orders.delete',
      'invoices.view', 'invoices.create', 'invoices.edit', 'invoices.delete',
      'vendors.view', 'vendors.create', 'vendors.edit', 'vendors.delete',
      
      // HR permissions
      'hr.view', 'hr.create', 'hr.edit', 'hr.delete',
      'employees.view', 'employees.create', 'employees.edit', 'employees.delete',
      'attendance.view', 'attendance.create', 'attendance.edit', 'attendance.delete',
      'leave.view', 'leave.create', 'leave.edit', 'leave.delete',
      'payroll.view', 'payroll.create', 'payroll.edit', 'payroll.delete',
      'performance.view', 'performance.create', 'performance.edit', 'performance.delete',
      'recruitment.view', 'recruitment.create', 'recruitment.edit', 'recruitment.delete',
      
      // GST & Reports
      'gst.view', 'gst.create', 'gst.edit', 'gst.delete',
      'reports.view', 'reports.export',
      
      // System permissions
      'dashboard.view', 'settings.view', 'settings.edit',
      'users.view', 'users.create', 'users.edit', 'users.delete',
      'automation.view', 'files.view'
    ],
    created_at: '2024-01-01T00:00:00Z',
    last_login: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    email: 'rajesh@globalcyberit.com',
    password_hash: 'user123',
    role: 'manager',
    department: 'Sales',
    phone: '+91 9876543211',
    status: 'active',
    permissions: [
      'crm.view', 'crm.create', 'crm.edit',
      'customers.view', 'customers.create', 'customers.edit',
      'leads.view', 'leads.create', 'leads.edit',
      'erp.view', 'products.view', 'orders.view', 'orders.create', 'orders.edit',
      'invoices.view', 'invoices.create',
      'hr.view', 'employees.view',
      'reports.view', 'dashboard.view'
    ],
    created_at: '2024-01-15T10:30:00Z',
    last_login: '2024-12-05T14:20:00Z'
  },
  {
    id: '3',
    name: 'Priya Sharma',
    email: 'priya@globalcyberit.com',
    password_hash: 'user123',
    role: 'staff',
    department: 'HR',
    phone: '+91 9876543212',
    status: 'active',
    permissions: [
      'hr.view', 'employees.view', 'employees.create', 'employees.edit',
      'attendance.view', 'attendance.edit',
      'leave.view', 'leave.edit',
      'recruitment.view', 'recruitment.create',
      'crm.view', 'customers.view',
      'reports.view', 'dashboard.view'
    ],
    created_at: '2024-02-10T14:20:00Z',
    last_login: '2024-12-04T11:15:00Z'
  },
  {
    id: '4',
    name: 'Amit Patel',
    email: 'amit@globalcyberit.com',
    password_hash: 'user123',
    role: 'staff',
    department: 'Accounts',
    phone: '+91 9876543213',
    status: 'active',
    permissions: [
      'erp.view', 'invoices.view', 'invoices.create', 'invoices.edit',
      'gst.view', 'gst.create',
      'vendors.view', 'vendors.create',
      'payroll.view', 'reports.view', 'dashboard.view'
    ],
    created_at: '2024-03-05T09:15:00Z',
    last_login: '2024-12-03T16:40:00Z'
  },
  {
    id: '5',
    name: 'Sneha Reddy',
    email: 'sneha@globalcyberit.com',
    password_hash: 'user123',
    role: 'viewer',
    department: 'Management',
    phone: '+91 9876543214',
    status: 'active',
    permissions: [
      'dashboard.view', 'reports.view',
      'crm.view', 'customers.view', 'leads.view',
      'erp.view', 'products.view', 'orders.view',
      'hr.view', 'employees.view',
      'gst.view'
    ],
    created_at: '2024-04-12T11:00:00Z',
    last_login: '2024-12-02T09:30:00Z'
  }
];

export const useStore = create<StoreState>((set, get) => ({
  // Initial state
  loading: false,
  error: null,
  currentUser: null,
  isAuthenticated: false,
  dashboardStats: {
    totalCustomers: 0,
    activeLeads: 0,
    conversionRate: 0,
    totalProducts: 0,
    totalOrders: 0,
    monthlyRevenue: 0,
    totalEmployees: 0,
    presentToday: 0,
    pendingLeaves: 0,
    monthlyGST: 0,
    gstCompliance: 0,
    customerSatisfaction: 0,
    systemUptime: 0,
    totalRevenue: 0
  },
  users: [],
  customers: [],
  leads: [],
  products: [],
  employees: [],

  // Actions
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),

  // Authentication system
  login: async (email: string, password: string) => {
    console.log('🔐 Login attempt:', { email, password });
    set({ loading: true, error: null });
    
    try {
      // Simulate login delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in default users
      const user = DEFAULT_USERS.find(u => 
        u.email.toLowerCase() === email.toLowerCase() && 
        u.password_hash === password
      );
      
      console.log('👤 User found:', user);
      
      if (user) {
        set({ 
          currentUser: user, 
          isAuthenticated: true, 
          loading: false,
          error: null
        });
        
        // Load dashboard data after successful login
        await get().loadDashboardData();
        
        console.log('✅ Login successful');
        return true;
      } else {
        set({ 
          error: 'Invalid email or password', 
          loading: false,
          isAuthenticated: false,
          currentUser: null
        });
        console.log('❌ Login failed');
        return false;
      }
    } catch (error) {
      console.error('🚨 Login error:', error);
      set({ 
        error: 'Login failed. Please try again.', 
        loading: false,
        isAuthenticated: false,
        currentUser: null
      });
      return false;
    }
  },

  logout: () => {
    set({ 
      currentUser: null, 
      isAuthenticated: false,
      dashboardStats: {
        totalCustomers: 0,
        activeLeads: 0,
        conversionRate: 0,
        totalProducts: 0,
        totalOrders: 0,
        monthlyRevenue: 0,
        totalEmployees: 0,
        presentToday: 0,
        pendingLeaves: 0,
        monthlyGST: 0,
        gstCompliance: 0,
        customerSatisfaction: 0,
        systemUptime: 0,
        totalRevenue: 0
      }
    });
  },

  // Dashboard data loading
  loadDashboardData: async () => {
    const { currentUser } = get();
    if (!currentUser) return;

    set({ loading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Role-based stats
      let stats = {
        totalCustomers: 0,
        activeLeads: 0,
        conversionRate: 0,
        totalProducts: 0,
        totalOrders: 0,
        monthlyRevenue: 0,
        totalEmployees: 0,
        presentToday: 0,
        pendingLeaves: 0,
        monthlyGST: 0,
        gstCompliance: 0,
        customerSatisfaction: 0,
        systemUptime: 0,
        totalRevenue: 0
      };

      if (currentUser.role === 'admin') {
        stats = {
          totalCustomers: 1247,
          activeLeads: 156,
          conversionRate: 24.5,
          totalProducts: 2341,
          totalOrders: 847,
          monthlyRevenue: 68500000,
          totalEmployees: 180,
          presentToday: 168,
          pendingLeaves: 23,
          monthlyGST: 12330000,
          gstCompliance: 98.5,
          customerSatisfaction: 4.6,
          systemUptime: 99.9,
          totalRevenue: 342500000
        };
      } else if (currentUser.role === 'manager') {
        stats = {
          totalCustomers: 247,
          activeLeads: 32,
          conversionRate: 28.2,
          totalProducts: 456,
          totalOrders: 123,
          monthlyRevenue: 12500000,
          totalEmployees: 25,
          presentToday: 24,
          pendingLeaves: 4,
          monthlyGST: 2250000,
          gstCompliance: 99.2,
          customerSatisfaction: 4.7,
          systemUptime: 99.8,
          totalRevenue: 85600000
        };
      } else {
        stats = {
          totalCustomers: 89,
          activeLeads: 12,
          conversionRate: 31.5,
          totalProducts: 145,
          totalOrders: 45,
          monthlyRevenue: 4200000,
          totalEmployees: 8,
          presentToday: 8,
          pendingLeaves: 1,
          monthlyGST: 756000,
          gstCompliance: 99.5,
          customerSatisfaction: 4.8,
          systemUptime: 99.9,
          totalRevenue: 28500000
        };
      }

      set({ dashboardStats: stats, loading: false });
    } catch (error) {
      set({ error: 'Failed to load dashboard data', loading: false });
    }
  },

  // Data loading functions
  loadUsers: async () => {
    set({ loading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ users: DEFAULT_USERS, loading: false });
    } catch (error) {
      set({ error: 'Failed to load users', loading: false });
    }
  },

  loadCustomers: async () => {
    set({ loading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      // Sample customers data would go here
      set({ customers: [], loading: false });
    } catch (error) {
      set({ error: 'Failed to load customers', loading: false });
    }
  },

  loadLeads: async () => {
    set({ loading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      // Sample leads data would go here
      set({ leads: [], loading: false });
    } catch (error) {
      set({ error: 'Failed to load leads', loading: false });
    }
  },

  loadProducts: async () => {
    set({ loading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      // Sample products data would go here
      set({ products: [], loading: false });
    } catch (error) {
      set({ error: 'Failed to load products', loading: false });
    }
  },

  loadEmployees: async () => {
    set({ loading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      // Sample employees data would go here
      set({ employees: [], loading: false });
    } catch (error) {
      set({ error: 'Failed to load employees', loading: false });
    }
  },

  // Initialize app
  initializeApp: async () => {
    set({ loading: true });
    try {
      // Load initial data
      await Promise.all([
        get().loadUsers(),
        get().loadCustomers(),
        get().loadLeads(),
        get().loadProducts(),
        get().loadEmployees()
      ]);
      set({ loading: false });
    } catch (error) {
      set({ error: 'Failed to initialize app', loading: false });
    }
  }
}));
