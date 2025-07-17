/**
 * API Service Layer - Integration with Neon PostgreSQL Backend
 * Based on actual database schema from neondb
 * Connection: postgresql://neondb_owner:npg_mnUM9d1OwFJo@ep-falling-leaf-adt7rhys.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
 */

import { databaseConfig } from '../config/database';
import type { 
  Employee, 
  Department,
  Role,
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
  ApiResponse,
  QueryParams,
  DatabaseApiResponse,
  DashboardMetrics
} from '../types/database';

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: {
    name: string;
    description: string;
  };
}

class ApiService {
  private baseUrl: string;
  private token: string | null = null;
  private dbConfig = databaseConfig;

  constructor(baseUrl: string = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000') {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem('auth_token');
  }

  /**
   * Set authentication token
   */
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  /**
   * Clear authentication token
   */
  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  /**
   * Make authenticated HTTP request
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<DatabaseApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      defaultHeaders.Authorization = `Bearer ${this.token}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        return {
          data: null,
          error: data.message || 'Request failed',
          status: response.status,
        };
      }

      return {
        data,
        status: response.status,
      };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Network error',
        status: 0,
      };
    }
  }

  /**
   * Authentication methods
   */
  async login(username: string, password: string): Promise<ApiResponse<{ token: string; user: User }>> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  async logout(): Promise<ApiResponse<void>> {
    const response = await this.request('/auth/logout', { method: 'POST' });
    this.clearToken();
    return response;
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.request('/auth/me');
  }

  /**
   * Department Management
   */
  async getDepartments(params?: QueryParams): Promise<DatabaseApiResponse<Department[]>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    
    return this.request(`/api/departments${queryParams.toString() ? `?${queryParams}` : ''}`);
  }

  async createDepartment(department: Partial<Department>): Promise<DatabaseApiResponse<Department>> {
    return this.request('/api/departments', {
      method: 'POST',
      body: JSON.stringify(department),
    });
  }

  async updateDepartment(id: number, department: Partial<Department>): Promise<DatabaseApiResponse<Department>> {
    return this.request(`/api/departments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(department),
    });
  }

  /**
   * Role Management
   */
  async getRoles(params?: QueryParams): Promise<DatabaseApiResponse<Role[]>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    
    return this.request(`/api/roles${queryParams.toString() ? `?${queryParams}` : ''}`);
  }

  async createRole(role: Partial<Role>): Promise<DatabaseApiResponse<Role>> {
    return this.request('/api/roles', {
      method: 'POST',
      body: JSON.stringify(role),
    });
  }

  /**
   * Employee Management
   */
  async getEmployees(params?: QueryParams & { department_id?: number; status?: string }): Promise<DatabaseApiResponse<Employee[]>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.department_id) queryParams.append('department_id', params.department_id.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.search) queryParams.append('search', params.search);
    
    return this.request(`/api/employees${queryParams.toString() ? `?${queryParams}` : ''}`);
  }

  async getEmployee(id: number): Promise<DatabaseApiResponse<Employee>> {
    return this.request(`/api/employees/${id}`);
  }

  async createEmployee(employee: Partial<Employee>): Promise<DatabaseApiResponse<Employee>> {
    return this.request('/api/employees', {
      method: 'POST',
      body: JSON.stringify(employee),
    });
  }

  async updateEmployee(id: number, employee: Partial<Employee>): Promise<DatabaseApiResponse<Employee>> {
    return this.request(`/api/employees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(employee),
    });
  }

  async deleteEmployee(id: number): Promise<DatabaseApiResponse<void>> {
    return this.request(`/api/employees/${id}`, {
      method: 'DELETE',
    });
  }

  /**
   * Onboarding Management
   */
  async getOnboardingProcesses(params?: QueryParams & { status?: string }): Promise<DatabaseApiResponse<OnboardingProcess[]>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.search) queryParams.append('search', params.search);
    
    return this.request(`/api/onboarding/processes${queryParams.toString() ? `?${queryParams}` : ''}`);
  }

  async getOnboardingProcess(id: number): Promise<DatabaseApiResponse<OnboardingProcess>> {
    return this.request(`/api/onboarding/processes/${id}`);
  }

  async createOnboardingProcess(process: Partial<OnboardingProcess>): Promise<DatabaseApiResponse<OnboardingProcess>> {
    return this.request('/api/onboarding/processes', {
      method: 'POST',
      body: JSON.stringify(process),
    });
  }

  async updateOnboardingProcess(id: number, process: Partial<OnboardingProcess>): Promise<DatabaseApiResponse<OnboardingProcess>> {
    return this.request(`/api/onboarding/processes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(process),
    });
  }

  async getOnboardingTasks(processId: number): Promise<DatabaseApiResponse<OnboardingTask[]>> {
    return this.request(`/api/onboarding/processes/${processId}/tasks`);
  }

  async updateOnboardingTask(processId: number, taskId: number, task: Partial<OnboardingTask>): Promise<DatabaseApiResponse<OnboardingTask>> {
    return this.request(`/api/onboarding/processes/${processId}/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(task),
    });
  }

  async completeOnboardingTask(processId: number, taskId: number, notes?: string): Promise<ApiResponse<void>> {
    return this.request(`/api/onboarding/processes/${processId}/tasks/${taskId}/complete`, {
      method: 'POST',
      body: JSON.stringify({ notes }),
    });
  }

  /**
   * Offboarding Management
   */
  async getOffboardingProcesses(params?: QueryParams & { status?: string }): Promise<DatabaseApiResponse<OffboardingProcess[]>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.search) queryParams.append('search', params.search);
    
    return this.request(`/api/offboarding/processes${queryParams.toString() ? `?${queryParams}` : ''}`);
  }

  async createOffboardingProcess(employeeId: number, lastWorkingDay: string, reason: string): Promise<DatabaseApiResponse<OffboardingProcess>> {
    return this.request('/api/offboarding/processes', {
      method: 'POST',
      body: JSON.stringify({ 
        employee_id: employeeId, 
        last_working_day: lastWorkingDay,
        reason 
      }),
    });
  }

  /**
   * IT Asset Management
   */
  async getITAssets(params?: QueryParams & { category?: string; status?: string; assigned_to?: number }): Promise<DatabaseApiResponse<ITAsset[]>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.category) queryParams.append('category', params.category);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.assigned_to) queryParams.append('assigned_to', params.assigned_to.toString());
    if (params?.search) queryParams.append('search', params.search);
    
    return this.request(`/api/it-assets${queryParams.toString() ? `?${queryParams}` : ''}`);
  }

  async getITAsset(id: number): Promise<DatabaseApiResponse<ITAsset>> {
    return this.request(`/api/it-assets/${id}`);
  }

  async createITAsset(asset: Partial<ITAsset>): Promise<DatabaseApiResponse<ITAsset>> {
    return this.request('/api/it-assets', {
      method: 'POST',
      body: JSON.stringify(asset),
    });
  }

  async updateITAsset(id: number, asset: Partial<ITAsset>): Promise<DatabaseApiResponse<ITAsset>> {
    return this.request(`/api/it-assets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(asset),
    });
  }

  async deleteITAsset(id: number): Promise<DatabaseApiResponse<void>> {
    return this.request(`/api/it-assets/${id}`, {
      method: 'DELETE',
    });
  }

  async assignAsset(assetId: number, employeeId: number): Promise<ApiResponse<void>> {
    return this.request(`/api/it-assets/${assetId}/assign`, {
      method: 'POST',
      body: JSON.stringify({ employee_id: employeeId }),
    });
  }

  async unassignAsset(assetId: number): Promise<ApiResponse<void>> {
    return this.request(`/api/it-assets/${assetId}/unassign`, {
      method: 'POST',
    });
  }

  /**
   * Software License Management
   */
  async getSoftwareLicenses(params?: QueryParams): Promise<DatabaseApiResponse<SoftwareLicense[]>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    
    return this.request(`/api/software-licenses${queryParams.toString() ? `?${queryParams}` : ''}`);
  }

  async createSoftwareLicense(license: Partial<SoftwareLicense>): Promise<DatabaseApiResponse<SoftwareLicense>> {
    return this.request('/api/software-licenses', {
      method: 'POST',
      body: JSON.stringify(license),
    });
  }

  async updateSoftwareLicense(id: number, license: Partial<SoftwareLicense>): Promise<DatabaseApiResponse<SoftwareLicense>> {
    return this.request(`/api/software-licenses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(license),
    });
  }

  /**
   * Support Ticket Management
   */
  async getSupportTickets(params?: QueryParams & { status?: string; priority?: string; requester_id?: number }): Promise<DatabaseApiResponse<SupportTicket[]>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.priority) queryParams.append('priority', params.priority);
    if (params?.requester_id) queryParams.append('requester_id', params.requester_id.toString());
    if (params?.search) queryParams.append('search', params.search);
    
    return this.request(`/api/support-tickets${queryParams.toString() ? `?${queryParams}` : ''}`);
  }

  async getSupportTicket(id: number): Promise<DatabaseApiResponse<SupportTicket>> {
    return this.request(`/api/support-tickets/${id}`);
  }

  async createSupportTicket(ticket: Partial<SupportTicket>): Promise<DatabaseApiResponse<SupportTicket>> {
    return this.request('/api/support-tickets', {
      method: 'POST',
      body: JSON.stringify(ticket),
    });
  }

  async updateSupportTicket(id: number, ticket: Partial<SupportTicket>): Promise<DatabaseApiResponse<SupportTicket>> {
    return this.request(`/api/support-tickets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(ticket),
    });
  }

  /**
   * System Environment Management
   */
  async getSystemEnvironments(params?: QueryParams): Promise<DatabaseApiResponse<SystemEnvironment[]>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    
    return this.request(`/api/system-environments${queryParams.toString() ? `?${queryParams}` : ''}`);
  }

  async createSystemEnvironment(environment: Partial<SystemEnvironment>): Promise<DatabaseApiResponse<SystemEnvironment>> {
    return this.request('/api/system-environments', {
      method: 'POST',
      body: JSON.stringify(environment),
    });
  }

  /**
   * System Deployment Management
   */
  async getSystemDeployments(params?: QueryParams & { status?: string; environment_id?: number }): Promise<DatabaseApiResponse<SystemDeployment[]>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.environment_id) queryParams.append('environment_id', params.environment_id.toString());
    if (params?.search) queryParams.append('search', params.search);
    
    return this.request(`/api/system-deployments${queryParams.toString() ? `?${queryParams}` : ''}`);
  }

  async createSystemDeployment(deployment: Partial<SystemDeployment>): Promise<DatabaseApiResponse<SystemDeployment>> {
    return this.request('/api/system-deployments', {
      method: 'POST',
      body: JSON.stringify(deployment),
    });
  }

  async updateDeploymentStatus(id: number, status: string, notes?: string): Promise<ApiResponse<void>> {
    return this.request(`/api/system-deployments/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, notes }),
    });
  }

  /**
   * Access Request Management
   */
  async getAccessRequests(params?: QueryParams & { status?: string; requester_id?: number }): Promise<DatabaseApiResponse<AccessRequest[]>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.requester_id) queryParams.append('requester_id', params.requester_id.toString());
    if (params?.search) queryParams.append('search', params.search);
    
    return this.request(`/api/access-requests${queryParams.toString() ? `?${queryParams}` : ''}`);
  }

  async createAccessRequest(request: Partial<AccessRequest>): Promise<DatabaseApiResponse<AccessRequest>> {
    return this.request('/api/access-requests', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async approveAccessRequest(id: number, approver: string): Promise<ApiResponse<void>> {
    return this.request(`/api/access-requests/${id}/approve`, {
      method: 'PUT',
      body: JSON.stringify({ approver }),
    });
  }

  async rejectAccessRequest(id: number, approver: string): Promise<ApiResponse<void>> {
    return this.request(`/api/access-requests/${id}/reject`, {
      method: 'PUT',
      body: JSON.stringify({ approver }),
    });
  }

  /**
   * Notification Management
   */
  async getNotifications(userId?: number): Promise<DatabaseApiResponse<Notification[]>> {
    const queryParams = new URLSearchParams();
    if (userId) queryParams.append('user_id', userId.toString());
    
    return this.request(`/api/notifications${queryParams.toString() ? `?${queryParams}` : ''}`);
  }

  async createNotification(notification: Partial<Notification>): Promise<DatabaseApiResponse<Notification>> {
    return this.request('/api/notifications', {
      method: 'POST',
      body: JSON.stringify(notification),
    });
  }

  async markNotificationRead(id: number): Promise<ApiResponse<void>> {
    return this.request(`/api/notifications/${id}/read`, { 
      method: 'PUT' 
    });
  }

  /**
   * Audit Log Management
   */
  async getAuditLogs(params?: QueryParams & { user_id?: number; resource_type?: string }): Promise<DatabaseApiResponse<AuditLog[]>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.user_id) queryParams.append('user_id', params.user_id.toString());
    if (params?.resource_type) queryParams.append('resource_type', params.resource_type);
    if (params?.search) queryParams.append('search', params.search);
    
    return this.request(`/api/audit-logs${queryParams.toString() ? `?${queryParams}` : ''}`);
  }

  /**
   * Dashboard and Analytics
   */
  async getDashboardMetrics(): Promise<ApiResponse<DashboardMetrics>> {
    return this.request('/api/dashboard/metrics');
  }

  async getHRAnalytics(timeframe: string = '30d'): Promise<ApiResponse<any>> {
    return this.request(`/api/analytics/hr?timeframe=${timeframe}`);
  }

  async getITAnalytics(timeframe: string = '30d'): Promise<ApiResponse<any>> {
    return this.request(`/api/analytics/it?timeframe=${timeframe}`);
  }

  /**
   * File Upload
   */
  async uploadFile(file: File, category: string = 'general'): Promise<ApiResponse<{ url: string; filename: string }>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);

    return this.request('/api/upload', {
      method: 'POST',
      body: formData,
      headers: {
        // Remove Content-Type to let browser set it with boundary for FormData
        Authorization: this.token ? `Bearer ${this.token}` : '',
      },
    });
  }

  /**
   * Export functionality
   */
  async exportData(type: string, format: string = 'xlsx', filters?: any): Promise<Blob> {
    const queryParams = new URLSearchParams({ type, format });
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value as string);
      });
    }

    const response = await fetch(`${this.baseUrl}/api/export?${queryParams}`, {
      headers: {
        Authorization: this.token ? `Bearer ${this.token}` : '',
      },
    });

    if (!response.ok) {
      throw new Error('Export failed');
    }

    return response.blob();
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
