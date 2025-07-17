/**
 * Smart ERP + CRM + HR + IT Asset Portal - Complete Indian Business Solution
 * Fully responsive application with GST compliance and multi-user support
 */

import { HashRouter, Route, Routes } from 'react-router';
import { useStore } from './store/useStore';
import AppLayout from './components/Layout/AppLayout';
import LoginForm from './components/Auth/LoginForm';
import Dashboard from './pages/Dashboard';

// CRM Modules
import CRMOverview from './pages/CRM/CRMOverview';
import LeadsManagement from './pages/CRM/LeadsManagement';
import IndianCustomers from './pages/CRM/IndianCustomers';

// ERP Modules
import ERPOverview from './pages/ERP/ERPOverview';
import ProductsManagement from './pages/ERP/ProductsManagement';
import OrdersManagement from './pages/ERP/OrdersManagement';
import InvoiceManagement from './pages/ERP/InvoiceManagement';
import VendorManagement from './pages/ERP/VendorManagement';

// HR Modules
import HRDashboard from './pages/HR/HRDashboard';
import EmployeeManagement from './pages/HR/EmployeeManagement';
import AttendanceManagement from './pages/HR/AttendanceManagement';
import LeaveManagement from './pages/HR/LeaveManagement';
import PayrollManagement from './pages/HR/PayrollManagement';
import PerformanceManagement from './pages/HR/PerformanceManagement';
import RecruitmentManagement from './pages/HR/RecruitmentManagement';
import HRReports from './pages/HR/HRReports';

// IT Asset Portal Modules
import ITAssetDashboard from './pages/ITAsset/ITAssetDashboard';
import AssetManagement from './pages/ITAsset/AssetManagement';
import AssetTracking from './pages/ITAsset/AssetTracking';
import MaintenanceManagement from './pages/ITAsset/MaintenanceManagement';
import SoftwareLicenses from './pages/ITAsset/SoftwareLicenses';
import ITInventory from './pages/ITAsset/ITInventory';
import AssetReports from './pages/ITAsset/AssetReports';

// GST & Indian Compliance
import GSTInvoice from './pages/GST/GSTInvoice';

// Common Modules
import Reports from './pages/Reports';
import AutomationHub from './pages/AutomationHub';
import FileManagement from './pages/FileManagement';
import Settings from './pages/Settings';
import UserManagement from './pages/UserManagement';

export default function App() {
  const { isAuthenticated } = useStore();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <HashRouter>
      <AppLayout>
        <Routes>
          {/* Main Dashboard */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* CRM Routes */}
          <Route path="/crm" element={<CRMOverview />} />
          <Route path="/crm/leads" element={<LeadsManagement />} />
          <Route path="/crm/customers" element={<IndianCustomers />} />

          {/* ERP Routes */}
          <Route path="/erp" element={<ERPOverview />} />
          <Route path="/erp/products" element={<ProductsManagement />} />
          <Route path="/erp/orders" element={<OrdersManagement />} />
          <Route path="/erp/invoices" element={<InvoiceManagement />} />
          <Route path="/erp/vendors" element={<VendorManagement />} />

          {/* HR Routes */}
          <Route path="/hr" element={<HRDashboard />} />
          <Route path="/hr/employees" element={<EmployeeManagement />} />
          <Route path="/hr/attendance" element={<AttendanceManagement />} />
          <Route path="/hr/leave" element={<LeaveManagement />} />
          <Route path="/hr/payroll" element={<PayrollManagement />} />
          <Route path="/hr/performance" element={<PerformanceManagement />} />
          <Route path="/hr/recruitment" element={<RecruitmentManagement />} />
          <Route path="/hr/reports" element={<HRReports />} />

          {/* IT Asset Portal Routes */}
          <Route path="/assets" element={<ITAssetDashboard />} />
          <Route path="/assets/management" element={<AssetManagement />} />
          <Route path="/assets/tracking" element={<AssetTracking />} />
          <Route path="/assets/maintenance" element={<MaintenanceManagement />} />
          <Route path="/assets/software" element={<SoftwareLicenses />} />
          <Route path="/assets/inventory" element={<ITInventory />} />
          <Route path="/assets/reports" element={<AssetReports />} />

          {/* GST & Indian Compliance */}
          <Route path="/gst" element={<GSTInvoice />} />
          <Route path="/gst/invoice" element={<GSTInvoice />} />

          {/* Common Routes */}
          <Route path="/reports" element={<Reports />} />
          <Route path="/automation" element={<AutomationHub />} />
          <Route path="/files" element={<FileManagement />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </AppLayout>
    </HashRouter>
  );
}
