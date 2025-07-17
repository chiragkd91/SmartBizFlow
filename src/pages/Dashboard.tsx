/**
 * Unified Dashboard for Smart ERP + CRM + HR Portal
 * Comprehensive overview with Indian business metrics
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useStore } from '../store/useStore';
import { 
  Users, 
  TrendingUp, 
  ShoppingCart, 
  DollarSign, 
  Package, 
  FileText, 
  UserCheck, 
  Clock,
  Calendar,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Phone,
  Mail,
  MapPin,
  Building2,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Award,
  Receipt,
  Briefcase,
  Globe,
  Shield,
  Truck,
  UserPlus
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line
} from 'recharts';

// Sample data for comprehensive dashboard
const salesData = [
  { month: 'Jan', sales: 4500000, orders: 45, gst: 810000 },
  { month: 'Feb', sales: 5200000, orders: 52, gst: 936000 },
  { month: 'Mar', sales: 4800000, orders: 48, gst: 864000 },
  { month: 'Apr', sales: 6100000, orders: 61, gst: 1098000 },
  { month: 'May', sales: 5900000, orders: 59, gst: 1062000 },
  { month: 'Jun', sales: 6800000, orders: 68, gst: 1224000 }
];

const departmentData = [
  { name: 'IT', employees: 45, revenue: 12500000, color: '#3B82F6' },
  { name: 'Sales', employees: 32, revenue: 8900000, color: '#10B981' },
  { name: 'Marketing', employees: 28, revenue: 3200000, color: '#F59E0B' },
  { name: 'HR', employees: 15, revenue: 0, color: '#EF4444' },
  { name: 'Finance', employees: 22, revenue: 1800000, color: '#8B5CF6' },
  { name: 'Operations', employees: 38, revenue: 5600000, color: '#06B6D4' }
];

const recentActivities = [
  { id: 1, user: 'Rajesh Kumar', action: 'Created new invoice', target: 'INV-2024-001', time: '2 hours ago', type: 'invoice', module: 'ERP' },
  { id: 2, user: 'Priya Sharma', action: 'Updated customer', target: 'Tata Motors Ltd', time: '4 hours ago', type: 'customer', module: 'CRM' },
  { id: 3, user: 'Amit Patel', action: 'Processed payroll', target: 'December 2024', time: '6 hours ago', type: 'payroll', module: 'HR' },
  { id: 4, user: 'Sneha Reddy', action: 'Generated GST report', target: 'Q4 2024', time: '8 hours ago', type: 'gst', module: 'GST' },
  { id: 5, user: 'System', action: 'Automated backup', target: 'Daily Backup', time: '12 hours ago', type: 'system', module: 'System' }
];

export default function Dashboard() {
  const { currentUser, dashboardStats, loading } = useStore();
  const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');

  // Role-based comprehensive stats
  const getUnifiedStats = () => {
    if (currentUser?.role === 'admin') {
      return {
        // CRM Stats
        totalCustomers: 1247,
        activeLeads: 156,
        conversionRate: 24.5,
        
        // ERP Stats
        totalProducts: 2341,
        totalOrders: 847,
        monthlyRevenue: 68500000,
        
        // HR Stats
        totalEmployees: 180,
        presentToday: 168,
        pendingLeaves: 23,
        
        // GST Stats
        monthlyGST: 12330000,
        gstCompliance: 98.5,
        
        // Overall
        customerSatisfaction: 4.6,
        systemUptime: 99.9,
        totalRevenue: 342500000
      };
    } else if (currentUser?.role === 'manager') {
      return {
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
      return {
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
  };

  const unifiedStats = getUnifiedStats();

  const kpiCards = [
    {
      title: 'Total Revenue',
      value: `₹${(unifiedStats.totalRevenue / 10000000).toFixed(1)}Cr`,
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      module: 'Finance'
    },
    {
      title: 'Active Customers',
      value: unifiedStats.totalCustomers.toString(),
      change: '+8.3%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      module: 'CRM'
    },
    {
      title: 'Total Products',
      value: unifiedStats.totalProducts.toString(),
      change: '+5.2%',
      changeType: 'positive' as const,
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      module: 'ERP'
    },
    {
      title: 'Total Employees',
      value: unifiedStats.totalEmployees.toString(),
      change: '+3.8%',
      changeType: 'positive' as const,
      icon: UserCheck,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      module: 'HR'
    },
    {
      title: 'Monthly GST',
      value: `₹${(unifiedStats.monthlyGST / 100000).toFixed(1)}L`,
      change: '+15.2%',
      changeType: 'positive' as const,
      icon: Receipt,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      module: 'GST'
    },
    {
      title: 'System Uptime',
      value: `${unifiedStats.systemUptime}%`,
      change: '+0.1%',
      changeType: 'positive' as const,
      icon: Activity,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      module: 'System'
    }
  ];

  const quickActions = [
    { title: 'Add Customer', path: '/crm/customers', icon: UserPlus, color: 'bg-blue-50 hover:bg-blue-100 text-blue-700' },
    { title: 'Create Invoice', path: '/erp/invoices', icon: FileText, color: 'bg-green-50 hover:bg-green-100 text-green-700' },
    { title: 'Add Product', path: '/erp/products', icon: Package, color: 'bg-purple-50 hover:bg-purple-100 text-purple-700' },
    { title: 'New Employee', path: '/hr/employees', icon: UserCheck, color: 'bg-orange-50 hover:bg-orange-100 text-orange-700' },
    { title: 'GST Report', path: '/gst/reports', icon: Receipt, color: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700' },
    { title: 'View Reports', path: '/reports', icon: BarChart3, color: 'bg-pink-50 hover:bg-pink-100 text-pink-700' }
  ];

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Smart ERP + CRM + HR Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Smart ERP + CRM + HR Portal
            </h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">
              Welcome back, {currentUser?.name} ({currentUser?.role}) - Complete Indian Business Solution
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="today">Today</option>
              <option value="thisWeek">This Week</option>
              <option value="thisMonth">This Month</option>
              <option value="thisQuarter">This Quarter</option>
              <option value="thisYear">This Year</option>
            </select>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Full Reports
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {kpiCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.title} className={`${card.bgColor} ${card.borderColor} border shadow-sm hover:shadow-md transition-shadow`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${card.bgColor}`}>
                      <Icon className={`h-5 w-5 ${card.color}`} />
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        card.changeType === 'positive' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {card.change}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{card.module}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg lg:text-2xl font-bold text-gray-900">{card.value}</p>
                    <p className="text-xs lg:text-sm text-gray-600 truncate">{card.title}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
          {/* Revenue Trends */}
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg font-semibold">Revenue & GST Trends</span>
                <Badge variant="outline">Last 6 Months</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 lg:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                      formatter={(value, name) => [
                        name === 'sales' ? `₹${(value / 100000).toFixed(1)}L` : 
                        name === 'gst' ? `₹${(value / 100000).toFixed(1)}L` : value,
                        name === 'sales' ? 'Revenue' : 
                        name === 'gst' ? 'GST' : 'Orders'
                      ]}
                    />
                    <Area type="monotone" dataKey="sales" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="gst" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Department Performance */}
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg font-semibold">Department Performance</span>
                <Badge variant="outline">Revenue + Employees</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 lg:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="name" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                      formatter={(value, name) => [
                        name === 'revenue' ? `₹${(value / 100000).toFixed(1)}L` : value,
                        name === 'revenue' ? 'Revenue' : 'Employees'
                      ]}
                    />
                    <Bar dataKey="employees" fill="#3B82F6" />
                    <Bar dataKey="revenue" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Recent Activities */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
          {/* Quick Actions */}
          <Card className="xl:col-span-2 bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={action.title}
                      variant="ghost"
                      className={`h-auto p-4 flex flex-col items-center space-y-2 ${action.color} transition-colors`}
                      onClick={() => window.location.href = action.path}
                    >
                      <Icon className="h-6 w-6" />
                      <span className="text-xs font-medium text-center">{action.title}</span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Activity className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.user}
                      </p>
                      <p className="text-xs text-gray-600 truncate">
                        {activity.action} • {activity.target}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-500">{activity.time}</p>
                        <Badge variant="outline" className="text-xs">
                          {activity.module}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Business Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Customer Satisfaction', value: `${unifiedStats.customerSatisfaction}/5`, icon: Star, color: 'text-yellow-600' },
            { title: 'Lead Conversion', value: `${unifiedStats.conversionRate}%`, icon: TrendingUp, color: 'text-green-600' },
            { title: 'GST Compliance', value: `${unifiedStats.gstCompliance}%`, icon: Shield, color: 'text-blue-600' },
            { title: 'Present Today', value: `${unifiedStats.presentToday}/${unifiedStats.totalEmployees}`, icon: Clock, color: 'text-purple-600' }
          ].map((insight) => {
            const Icon = insight.icon;
            return (
              <Card key={insight.title} className="bg-white shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{insight.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{insight.value}</p>
                    </div>
                    <Icon className={`h-8 w-8 ${insight.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
