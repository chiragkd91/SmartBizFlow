/**
 * Central Route Configuration for Smart ERP + CRM + HR + IT Asset Portal
 * Comprehensive routing system with lazy loading and error boundaries
 */

import { lazy } from 'react';

// Lazy load all components for better performance
const Dashboard = lazy(() => import('../pages/Dashboard'));

// CRM Modules
const CRMOverview = lazy(() => import('../pages/CRM/CRMOverview'));
const LeadsManagement = lazy(() => import('../pages/CRM/LeadsManagement'));
const IndianCustomers = lazy(() => import('../pages/CRM/IndianCustomers'));

// ERP Modules
const ERPOverview = lazy(() => import('../pages/ERP/ERPOverview'));
const ProductsManagement = lazy(() => import('../pages/ERP/ProductsManagement'));
const OrdersManagement = lazy(() => import('../pages/ERP/OrdersManagement'));
const InvoiceManagement = lazy(() => import('../pages/ERP/InvoiceManagement'));
const VendorManagement = lazy(() => import('../pages/ERP/VendorManagement'));

// HR Modules
const HRDashboard = lazy(() => import('../pages/HR/HRDashboard'));
const EmployeeManagement = lazy(() => import('../pages/HR/EmployeeManagement'));
const AttendanceManagement = lazy(() => import('../pages/HR/AttendanceManagement'));
const LeaveManagement = lazy(() => import('../pages/HR/LeaveManagement'));
const PayrollManagement = lazy(() => import('../pages/HR/PayrollManagement'));
const PerformanceManagement = lazy(() => import('../pages/HR/PerformanceManagement'));
const RecruitmentManagement = lazy(() => import('../pages/HR/RecruitmentManagement'));
const HRReports = lazy(() => import('../pages/HR/HRReports'));

// IT Asset Portal Modules
const ITAssetDashboard = lazy(() => import('../pages/ITAsset/ITAssetDashboard'));
const AssetManagement = lazy(() => import('../pages/ITAsset/AssetManagement'));
const AssetTracking = lazy(() => import('../pages/ITAsset/AssetTracking'));
const MaintenanceManagement = lazy(() => import('../pages/ITAsset/MaintenanceManagement'));
const SoftwareLicenses = lazy(() => import('../pages/ITAsset/SoftwareLicenses'));
const ITInventory = lazy(() => import('../pages/ITAsset/ITInventory'));
const AssetReports = lazy(() => import('../pages/ITAsset/AssetReports'));

// GST & Compliance
const GSTInvoice = lazy(() => import('../pages/GST/GSTInvoice'));

// Common Modules
const Reports = lazy(() => import('../pages/Reports'));
const AutomationHub = lazy(() => import('../pages/AutomationHub'));
const FileManagement = lazy(() => import('../pages/FileManagement'));
const Settings = lazy(() => import('../pages/Settings'));
const UserManagement = lazy(() => import('../pages/UserManagement'));

// Missing Components - Create fallback components
const OnboardingManagement = lazy(() => import('../pages/HR/OnboardingManagement'));
const OffboardingManagement = lazy(() => import('../pages/HR/OffboardingManagement'));
const SystemManagement = lazy(() => import('../pages/ITAsset/SystemManagement'));
const AccessManagement = lazy(() => import('../pages/ITAsset/AccessManagement'));
const SupportTickets = lazy(() => import('../pages/ITAsset/SupportTickets'));

export interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  title: string;
  description: string;
  module: 'dashboard' | 'crm' | 'erp' | 'hr' | 'it-asset' | 'gst' | 'common';
  icon?: string;
  permissions?: string[];
  exact?: boolean;
}

export const routes: RouteConfig[] = [
  // Dashboard
  {
    path: '/',
    component: Dashboard,
    title: 'Dashboard',
    description: 'Main dashboard with overview metrics',
    module: 'dashboard',
    exact: true
  },
  {
    path: '/dashboard',
    component: Dashboard,
    title: 'Dashboard',
    description: 'Main dashboard with overview metrics',
    module: 'dashboard'
  },

  // CRM Routes
  {
    path: '/crm',
    component: CRMOverview,
    title: 'CRM Overview',
    description: 'Customer relationship management overview',
    module: 'crm'
  },
  {
    path: '/crm/overview',
    component: CRMOverview,
    title: 'CRM Overview',
    description: 'Customer relationship management overview',
    module: 'crm'
  },
  {
    path: '/crm/leads',
    component: LeadsManagement,
    title: 'Leads Management',
    description: 'Manage and track sales leads',
    module: 'crm'
  },
  {
    path: '/crm/customers',
    component: IndianCustomers,
    title: 'Customer Management',
    description: 'Manage customer relationships and data',
    module: 'crm'
  },

  // ERP Routes
  {
    path: '/erp',
    component: ERPOverview,
    title: 'ERP Overview',
    description: 'Enterprise resource planning overview',
    module: 'erp'
  },
  {
    path: '/erp/overview',
    component: ERPOverview,
    title: 'ERP Overview',
    description: 'Enterprise resource planning overview',
    module: 'erp'
  },
  {
    path: '/erp/products',
    component: ProductsManagement,
    title: 'Products Management',
    description: 'Manage product catalog and inventory',
    module: 'erp'
  },
  {
    path: '/erp/orders',
    component: OrdersManagement,
    title: 'Orders Management',
    description: 'Manage customer orders and fulfillment',
    module: 'erp'
  },
  {
    path: '/erp/invoices',
    component: InvoiceManagement,
    title: 'Invoice Management',
    description: 'Manage invoices and billing',
    module: 'erp'
  },
  {
    path: '/erp/vendors',
    component: VendorManagement,
    title: 'Vendor Management',
    description: 'Manage supplier relationships',
    module: 'erp'
  },

  // HR Routes
  {
    path: '/hr',
    component: HRDashboard,
    title: 'HR Dashboard',
    description: 'Human resources dashboard and overview',
    module: 'hr'
  },
  {
    path: '/hr/dashboard',
    component: HRDashboard,
    title: 'HR Dashboard',
    description: 'Human resources dashboard and overview',
    module: 'hr'
  },
  {
    path: '/hr/employees',
    component: EmployeeManagement,
    title: 'Employee Management',
    description: 'Manage employee records and information',
    module: 'hr'
  },
  {
    path: '/hr/attendance',
    component: AttendanceManagement,
    title: 'Attendance Management',
    description: 'Track and manage employee attendance',
    module: 'hr'
  },
  {
    path: '/hr/leave',
    component: LeaveManagement,
    title: 'Leave Management',
    description: 'Manage employee leave requests and approvals',
    module: 'hr'
  },
  {
    path: '/hr/payroll',
    component: PayrollManagement,
    title: 'Payroll Management',
    description: 'Manage employee payroll and compensation',
    module: 'hr'
  },
  {
    path: '/hr/performance',
    component: PerformanceManagement,
    title: 'Performance Management',
    description: 'Track and manage employee performance',
    module: 'hr'
  },
  {
    path: '/hr/recruitment',
    component: RecruitmentManagement,
    title: 'Recruitment Management',
    description: 'Manage hiring and recruitment processes',
    module: 'hr'
  },
  {
    path: '/hr/reports',
    component: HRReports,
    title: 'HR Reports',
    description: 'Generate HR analytics and reports',
    module: 'hr'
  },
  {
    path: '/hr/onboarding',
    component: OnboardingManagement,
    title: 'Onboarding Management',
    description: 'Manage employee onboarding processes',
    module: 'hr'
  },
  {
    path: '/hr/offboarding',
    component: OffboardingManagement,
    title: 'Offboarding Management',
    description: 'Manage employee offboarding processes',
    module: 'hr'
  },

  // IT Asset Portal Routes
  {
    path: '/assets',
    component: ITAssetDashboard,
    title: 'IT Asset Dashboard',
    description: 'IT asset management dashboard and overview',
    module: 'it-asset'
  },
  {
    path: '/assets/dashboard',
    component: ITAssetDashboard,
    title: 'IT Asset Dashboard',
    description: 'IT asset management dashboard and overview',
    module: 'it-asset'
  },
  {
    path: '/assets/management',
    component: AssetManagement,
    title: 'Asset Management',
    description: 'Manage IT assets and equipment',
    module: 'it-asset'
  },
  {
    path: '/assets/tracking',
    component: AssetTracking,
    title: 'Asset Tracking',
    description: 'Track asset locations and movements',
    module: 'it-asset'
  },
  {
    path: '/assets/maintenance',
    component: MaintenanceManagement,
    title: 'Maintenance Management',
    description: 'Schedule and track asset maintenance',
    module: 'it-asset'
  },
  {
    path: '/assets/software',
    component: SoftwareLicenses,
    title: 'Software Licenses',
    description: 'Manage software licenses and compliance',
    module: 'it-asset'
  },
  {
    path: '/assets/inventory',
    component: ITInventory,
    title: 'IT Inventory',
    description: 'Manage IT inventory and stock levels',
    module: 'it-asset'
  },
  {
    path: '/assets/reports',
    component: AssetReports,
    title: 'Asset Reports',
    description: 'Generate IT asset analytics and reports',
    module: 'it-asset'
  },
  {
    path: '/assets/system',
    component: SystemManagement,
    title: 'System Management',
    description: 'Manage system environments and deployments',
    module: 'it-asset'
  },
  {
    path: '/assets/access',
    component: AccessManagement,
    title: 'Access Management',
    description: 'Manage system access requests',
    module: 'it-asset'
  },
  {
    path: '/assets/support',
    component: SupportTickets,
    title: 'Support Tickets',
    description: 'Manage IT support tickets and issues',
    module: 'it-asset'
  },

  // GST & Compliance Routes
  {
    path: '/gst',
    component: GSTInvoice,
    title: 'GST Management',
    description: 'Manage GST compliance and invoicing',
    module: 'gst'
  },
  {
    path: '/gst/invoice',
    component: GSTInvoice,
    title: 'GST Invoice',
    description: 'Create and manage GST compliant invoices',
    module: 'gst'
  },

  // Common Routes
  {
    path: '/reports',
    component: Reports,
    title: 'Reports',
    description: 'Generate comprehensive business reports',
    module: 'common'
  },
  {
    path: '/automation',
    component: AutomationHub,
    title: 'Automation Hub',
    description: 'Manage business automation and workflows',
    module: 'common'
  },
  {
    path: '/files',
    component: FileManagement,
    title: 'File Management',
    description: 'Manage documents and files',
    module: 'common'
  },
  {
    path: '/users',
    component: UserManagement,
    title: 'User Management',
    description: 'Manage system users and permissions',
    module: 'common'
  },
  {
    path: '/settings',
    component: Settings,
    title: 'Settings',
    description: 'Configure system settings and preferences',
    module: 'common'
  }
];

// Route helpers
export const getRouteByPath = (path: string): RouteConfig | undefined => {
  return routes.find(route => route.path === path);
};

export const getRoutesByModule = (module: RouteConfig['module']): RouteConfig[] => {
  return routes.filter(route => route.module === module);
};

export const getAllRoutes = (): RouteConfig[] => {
  return routes;
};

// Navigation menu structure
export const navigationMenu = {
  main: [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: 'BarChart3',
      module: 'dashboard'
    }
  ],
  modules: [
    {
      title: 'CRM',
      icon: 'Users',
      module: 'crm',
      children: [
        { title: 'Overview', path: '/crm' },
        { title: 'Leads', path: '/crm/leads' },
        { title: 'Customers', path: '/crm/customers' }
      ]
    },
    {
      title: 'ERP',
      icon: 'Package',
      module: 'erp',
      children: [
        { title: 'Overview', path: '/erp' },
        { title: 'Products', path: '/erp/products' },
        { title: 'Orders', path: '/erp/orders' },
        { title: 'Invoices', path: '/erp/invoices' },
        { title: 'Vendors', path: '/erp/vendors' }
      ]
    },
    {
      title: 'HR Management',
      icon: 'UserCheck',
      module: 'hr',
      children: [
        { title: 'Dashboard', path: '/hr' },
        { title: 'Employees', path: '/hr/employees' },
        { title: 'Attendance', path: '/hr/attendance' },
        { title: 'Leave', path: '/hr/leave' },
        { title: 'Payroll', path: '/hr/payroll' },
        { title: 'Performance', path: '/hr/performance' },
        { title: 'Recruitment', path: '/hr/recruitment' },
        { title: 'Onboarding', path: '/hr/onboarding' },
        { title: 'Offboarding', path: '/hr/offboarding' },
        { title: 'Reports', path: '/hr/reports' }
      ]
    },
    {
      title: 'IT Asset Portal',
      icon: 'Monitor',
      module: 'it-asset',
      children: [
        { title: 'Dashboard', path: '/assets' },
        { title: 'Asset Management', path: '/assets/management' },
        { title: 'Asset Tracking', path: '/assets/tracking' },
        { title: 'Maintenance', path: '/assets/maintenance' },
        { title: 'Software Licenses', path: '/assets/software' },
        { title: 'IT Inventory', path: '/assets/inventory' },
        { title: 'System Management', path: '/assets/system' },
        { title: 'Access Management', path: '/assets/access' },
        { title: 'Support Tickets', path: '/assets/support' },
        { title: 'Reports', path: '/assets/reports' }
      ]
    },
    {
      title: 'GST & Compliance',
      icon: 'Receipt',
      module: 'gst',
      children: [
        { title: 'GST Invoice', path: '/gst' }
      ]
    }
  ],
  common: [
    { title: 'Reports', path: '/reports', icon: 'FileText' },
    { title: 'Automation', path: '/automation', icon: 'Zap' },
    { title: 'Files', path: '/files', icon: 'Folder' },
    { title: 'Users', path: '/users', icon: 'Users' },
    { title: 'Settings', path: '/settings', icon: 'Settings' }
  ]
};

export default routes;
