/**
 * Database Configuration for HR Management System
 * Neon PostgreSQL Database Configuration
 * Connection: postgresql://neondb_owner:npg_mnUM9d1OwFJo@ep-falling-leaf-adt7rhys.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
 */

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  ssl: boolean;
  connectionString: string;
}

export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
}

// Environment variables with fallbacks
const getEnvVar = (key: string, defaultValue: string = ''): string => {
  return process.env[key] || defaultValue;
};

// Neon PostgreSQL configuration
export const databaseConfig: DatabaseConfig = {
  host: getEnvVar('DB_HOST', 'ep-falling-leaf-adt7rhys.c-2.us-east-1.aws.neon.tech'),
  port: parseInt(getEnvVar('DB_PORT', '5432')),
  database: getEnvVar('DB_NAME', 'neondb'),
  username: getEnvVar('DB_USER', 'neondb_owner'),
  password: getEnvVar('DB_PASSWORD', 'npg_mnUM9d1OwFJo'),
  ssl: true, // Neon requires SSL
  connectionString: getEnvVar(
    'DATABASE_URL', 
    'postgresql://neondb_owner:npg_mnUM9d1OwFJo@ep-falling-leaf-adt7rhys.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require'
  ),
};

// API configuration
export const apiConfig: ApiConfig = {
  baseUrl: getEnvVar('REACT_APP_API_BASE_URL', 'http://localhost:5000'),
  timeout: parseInt(getEnvVar('API_TIMEOUT', '30000')),
  retryAttempts: parseInt(getEnvVar('API_RETRY_ATTEMPTS', '3')),
  retryDelay: parseInt(getEnvVar('API_RETRY_DELAY', '1000')),
};

// Application configuration
export const appConfig = {
  name: getEnvVar('APP_NAME', 'HR Management System'),
  version: getEnvVar('APP_VERSION', '1.0.0'),
  environment: getEnvVar('NODE_ENV', 'development'),
  port: parseInt(getEnvVar('PORT', '3000')),
};

// Database table names (matching your schema)
export const tableNames = {
  departments: 'departments',
  roles: 'roles',
  employees: 'employees',
  onboarding_processes: 'onboarding_processes',
  onboarding_tasks: 'onboarding_tasks',
  offboarding_processes: 'offboarding_processes',
  it_assets: 'it_assets',
  software_licenses: 'software_licenses',
  support_tickets: 'support_tickets',
  system_environments: 'system_environments',
  system_deployments: 'system_deployments',
  access_requests: 'access_requests',
  notifications: 'notifications',
  audit_logs: 'audit_logs',
};

// Security configuration
export const securityConfig = {
  jwtSecret: getEnvVar('JWT_SECRET', 'your-super-secret-jwt-key'),
  jwtExpiresIn: getEnvVar('JWT_EXPIRES_IN', '24h'),
  bcryptRounds: parseInt(getEnvVar('BCRYPT_ROUNDS', '12')),
  sessionSecret: getEnvVar('SESSION_SECRET', 'your-session-secret'),
};

// Feature flags based on your schema
export const featureFlags = {
  enableOnboarding: true,
  enableOffboarding: true,
  enableAssetManagement: true,
  enableSoftwareLicenses: true,
  enableSupportTickets: true,
  enableSystemDeployments: true,
  enableAccessRequests: true,
  enableNotifications: true,
  enableAuditLogging: true,
};

export default {
  database: databaseConfig,
  api: apiConfig,
  app: appConfig,
  tables: tableNames,
  security: securityConfig,
  features: featureFlags,
};
