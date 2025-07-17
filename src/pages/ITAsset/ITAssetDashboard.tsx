/**
 * IT Asset Management Dashboard with comprehensive asset tracking and analytics
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { useStore } from '../../store/useStore';
import { 
  Monitor, 
  Laptop, 
  Server, 
  Smartphone, 
  Wrench, 
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Activity,
  QrCode,
  Calendar,
  Database,
  Wifi,
  HardDrive,
  Key,
  Shield,
  Users,
  MapPin
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar
} from 'recharts';

// Sample data for IT Asset Dashboard
const assetTypeData = [
  { name: 'Laptops', value: 45, color: '#3B82F6' },
  { name: 'Desktops', value: 32, color: '#10B981' },
  { name: 'Servers', value: 8, color: '#F59E0B' },
  { name: 'Printers', value: 15, color: '#EF4444' },
  { name: 'Mobile Devices', value: 28, color: '#8B5CF6' },
  { name: 'Network Equipment', value: 12, color: '#06B6D4' }
];

const maintenanceData = [
  { month: 'Jan', scheduled: 12, completed: 10, overdue: 2 },
  { month: 'Feb', scheduled: 15, completed: 14, overdue: 1 },
  { month: 'Mar', scheduled: 18, completed: 16, overdue: 2 },
  { month: 'Apr', scheduled: 14, completed: 13, overdue: 1 },
  { month: 'May', scheduled: 16, completed: 15, overdue: 1 },
  { month: 'Jun', scheduled: 20, completed: 18, overdue: 2 }
];

const assetStatusData = [
  { status: 'Active', count: 98, color: '#10B981' },
  { status: 'Under Maintenance', count: 8, color: '#F59E0B' },
  { status: 'Retired', count: 15, color: '#6B7280' },
  { status: 'Lost/Stolen', count: 2, color: '#EF4444' }
];

export default function ITAssetDashboard() {
  const { currentUser, loading } = useStore();
  const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');

  const assetMetrics = {
    totalAssets: 140,
    activeAssets: 98,
    underMaintenance: 8,
    totalValue: 8500000,
    monthlyDepreciation: 75000,
    utilizationRate: 87.5,
    complianceScore: 94.2,
    pendingMaintenances: 5
  };

  const kpiCards = [
    {
      title: 'Total Assets',
      value: assetMetrics.totalAssets.toString(),
      change: '+12',
      changeType: 'positive' as const,
      icon: Monitor,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Active Assets',
      value: assetMetrics.activeAssets.toString(),
      change: `${(assetMetrics.activeAssets / assetMetrics.totalAssets * 100).toFixed(1)}%`,
      changeType: 'positive' as const,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: 'Under Maintenance',
      value: assetMetrics.underMaintenance.toString(),
      change: '-2',
      changeType: 'negative' as const,
      icon: Wrench,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      title: 'Asset Value',
      value: `₹${(assetMetrics.totalValue / 1000000).toFixed(1)}M`,
      change: '+5.2%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      title: 'Utilization Rate',
      value: `${assetMetrics.utilizationRate}%`,
      change: '+2.3%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      title: 'Compliance Score',
      value: `${assetMetrics.complianceScore}%`,
      change: '+1.8%',
      changeType: 'positive' as const,
      icon: Shield,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    }
  ];

  const recentActivities = [
    { id: 1, user: 'System', action: 'Asset check-in', asset: 'Laptop LT-001', time: '5 minutes ago', type: 'checkin' },
    { id: 2, user: 'Rajesh Kumar', action: 'Requested laptop', asset: 'MacBook Pro', time: '15 minutes ago', type: 'request' },
    { id: 3, user: 'IT Support', action: 'Completed maintenance', asset: 'Server SRV-03', time: '1 hour ago', type: 'maintenance' },
    { id: 4, user: 'Priya Sharma', action: 'Reported issue', asset: 'Printer PR-05', time: '2 hours ago', type: 'issue' },
    { id: 5, user: 'System', action: 'License renewal', asset: 'Microsoft Office', time: '3 hours ago', type: 'license' }
  ];

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading IT Asset Dashboard...</p>
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
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">IT Asset Dashboard</h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">
              Welcome {currentUser?.name} - Manage and track your IT assets
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
              <QrCode className="h-4 w-4 mr-2" />
              Scan Asset
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
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      card.changeType === 'positive' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {card.change}
                    </span>
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
          {/* Asset Distribution */}
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg font-semibold">Asset Distribution</span>
                <Badge variant="outline">Total: {assetTypeData.reduce((sum, asset) => sum + asset.value, 0)}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 lg:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      dataKey="value"
                      data={assetTypeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, value }) => `${name}: ${value}`}
                      labelLine={false}
                    >
                      {assetTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Maintenance Trends */}
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg font-semibold">Maintenance Trends</span>
                <Badge variant="outline">Last 6 Months</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 lg:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={maintenanceData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip />
                    <Area type="monotone" dataKey="completed" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="overdue" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Asset Status & Activities */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
          {/* Asset Status */}
          <Card className="xl:col-span-1 bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Asset Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {assetStatusData.map((status) => (
                  <div key={status.status} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: status.color }}></div>
                      <span className="text-sm font-medium text-gray-900">{status.status}</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{status.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="xl:col-span-2 bg-white shadow-sm">
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
                      <p className="text-sm font-medium text-gray-900">
                        {activity.user} • {activity.action}
                      </p>
                      <p className="text-xs text-gray-600 truncate">
                        Asset: {activity.asset}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { title: 'Add Asset', icon: Monitor, path: '/assets/management', color: 'bg-blue-50 hover:bg-blue-100 text-blue-700' },
                { title: 'Track Asset', icon: QrCode, path: '/assets/tracking', color: 'bg-green-50 hover:bg-green-100 text-green-700' },
                { title: 'Maintenance', icon: Wrench, path: '/assets/maintenance', color: 'bg-orange-50 hover:bg-orange-100 text-orange-700' },
                { title: 'Software', icon: Key, path: '/assets/software', color: 'bg-purple-50 hover:bg-purple-100 text-purple-700' },
                { title: 'Inventory', icon: Database, path: '/assets/inventory', color: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700' },
                { title: 'Reports', icon: Activity, path: '/assets/reports', color: 'bg-pink-50 hover:bg-pink-100 text-pink-700' }
              ].map((action) => {
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
      </div>
    </div>
  );
}
