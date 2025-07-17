/**
 * Database Type Definitions for HR Management System
 * Based on actual PostgreSQL schema from neondb
 * Connection: postgresql://neondb_owner:npg_mnUM9d1OwFJo@ep-falling-leaf-adt7rhys.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
 */

// Base interfaces
export interface BaseEntity {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T = any> {
  data: T | null;
  error?: string;
  message?: string;
  status?: number;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

// Departments table
export interface Department extends BaseEntity {
  name: string;
  description?: string;
  manager_id?: number;
  budget?: number;
  active: boolean;
}

// Roles table
export interface Role extends BaseEntity {
  name: string;
  description?: string;
  level: number;
  permissions?: Record<string, any>;
  active: boolean;
}

// Employees table
export interface Employee extends BaseEntity {
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  department_id?: number;
  role_id?: number;
  manager_id?: number;
  hire_date: string;
  status: 'active' | 'inactive' | 'terminated';
  salary?: number;
  address?: string;
  emergency_contact?: Record<string, any>;
  active: boolean;
  
  // Joined data
  department?: Department;
  role?: Role;
  manager?: Employee;
}

// Onboarding processes table
export interface OnboardingProcess extends BaseEntity {
  employee_id: number;
  status: 'not_started' | 'in_progress' | 'completed' | 'delayed';
  progress: number; // 0-100
  start_date: string;
  expected_completion?: string;
  actual_completion?: string;
  manager_id?: number;
  assigned_equipment?: Record<string, any>;
  accounts_created?: Record<string, any>;
  access_requests?: Record<string, any>;
  notes?: string;
  
  // Joined data
  employee?: Employee;
  manager?: Employee;
}

// Onboarding tasks table
export interface OnboardingTask extends BaseEntity {
  process_id: number;
  task_name: string;
  description?: string;
  category: 'equipment' | 'accounts' | 'access' | 'training' | 'documentation' | 'software' | 'security';
  status: 'pending' | 'in_progress' | 'completed' | 'blocked' | 'overdue';
  assigned_to: string;
  due_date: string;
  completed_date?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimated_time?: string;
  dependencies?: Record<string, any>;
  approval_required: boolean;
  approver?: string;
  notes?: string;
  
  // Joined data
  process?: OnboardingProcess;
}

// Offboarding processes table
export interface OffboardingProcess extends BaseEntity {
  employee_id: number;
  status: 'initiated' | 'in_progress' | 'completed' | 'delayed';
  progress: number; // 0-100
  last_working_day: string;
  reason: 'resignation' | 'termination' | 'retirement' | 'transfer';
  data_backup?: Record<string, any>;
  equipment_return?: Record<string, any>;
  access_revocation?: Record<string, any>;
  exit_interview?: Record<string, any>;
  manager_id?: number;
  notes?: string;
  
  // Joined data
  employee?: Employee;
  manager?: Employee;
}

// IT Assets table
export interface ITAsset extends BaseEntity {
  asset_tag: string;
  name: string;
  category: 'laptop' | 'desktop' | 'monitor' | 'phone' | 'tablet' | 'server' | 'network';
  brand: string;
  model: string;
  serial_number: string;
  purchase_date: string;
  purchase_price: number;
  current_value: number;
  warranty_expiry?: string;
  status: 'active' | 'maintenance' | 'retired' | 'lost' | 'available';
  assigned_to?: number;
  location?: string;
  specifications?: Record<string, any>;
  active: boolean;
  
  // Joined data
  assignee?: Employee;
}

// Software licenses table
export interface SoftwareLicense extends BaseEntity {
  name: string;
  vendor: string;
  license_type: 'subscription' | 'perpetual' | 'volume';
  total_licenses: number;
  used_licenses: number;
  cost_per_license: number;
  renewal_date?: string;
  assigned_employees?: Record<string, any>;
  active: boolean;
}

// Support tickets table
export interface SupportTicket extends BaseEntity {
  ticket_number: string;
  title: string;
  description: string;
  category: 'hardware' | 'software' | 'network' | 'access' | 'email' | 'other';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'waiting' | 'resolved' | 'closed';
  requester_id: number;
  assigned_to?: string;
  resolution_time?: number; // in hours
  resolved_at?: string;
  
  // Joined data
  requester?: Employee;
}

// System environments table
export interface SystemEnvironment extends BaseEntity {
  name: string;
  type: 'development' | 'staging' | 'production' | 'testing';
  status: 'active' | 'maintenance' | 'inactive';
  current_version?: string;
  last_deployment?: string;
  uptime: number; // percentage
  health_score: number; // 0-100
  resources?: Record<string, any>;
  services?: Record<string, any>;
}

// System deployments table
export interface SystemDeployment extends BaseEntity {
  system_name: string;
  version: string;
  environment_id: number;
  deployment_type: 'new_deployment' | 'update' | 'rollback' | 'hotfix';
  status: 'planned' | 'in_progress' | 'deployed' | 'failed' | 'rolled_back';
  scheduled_time: string;
  deployed_time?: string;
  deployed_by: string;
  affected_services?: Record<string, any>;
  rollback_plan?: string;
  health_checks?: Record<string, any>;
  dependencies?: Record<string, any>;
  approval_status: 'pending' | 'approved' | 'rejected';
  approver?: string;
  
  // Joined data
  environment?: SystemEnvironment;
}

// Access requests table
export interface AccessRequest extends BaseEntity {
  requester_id: number;
  request_type: 'new_access' | 'modify_access' | 'remove_access' | 'software_access';
  target_system: string;
  access_level: string;
  business_justification: string;
  status: 'pending' | 'approved' | 'rejected' | 'implemented';
  urgency: 'low' | 'medium' | 'high' | 'critical';
  approver?: string;
  request_date: string;
  approval_date?: string;
  implementation_date?: string;
  
  // Joined data
  requester?: Employee;
}

// Notifications table
export interface Notification extends BaseEntity {
  user_id?: number;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  action_url?: string;
  
  // Joined data
  user?: Employee;
}

// Audit logs table
export interface AuditLog extends BaseEntity {
  user_id: number;
  action: string;
  resource_type: string;
  resource_id?: number;
  old_values?: Record<string, any>;
  new_values?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  
  // Joined data
  user?: Employee;
}

// Database response types
export interface DatabaseApiResponse<T = any> extends ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Dashboard and reporting types
export interface DashboardMetrics {
  totalEmployees: number;
  activeEmployees: number;
  pendingOnboarding: number;
  openTickets: number;
  totalAssets: number;
  availableAssets: number;
  upcomingDeployments: number;
  pendingAccessRequests: number;
}

export interface ReportFilter {
  startDate?: string;
  endDate?: string;
  department?: string;
  status?: string;
  category?: string;
  priority?: string;
}

// Export all types
export type {
  Department,
  Role,
  Employee,
  OnboardingProcess,
  OnboardingTask,
  OffboardingProcess,
  ITAsset,
  SoftwareLicense,
  SupportTicket,
  SystemEnvironment,
  SystemDeployment,
  AccessRequest,
  Notification,
  AuditLog,
  DashboardMetrics,
  ReportFilter
};
