/**
 * Reports page with comprehensive analytics and export functionality
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { formatCurrency, formatRelativeTime } from '../lib/utils';
import { 
  BarChart3, 
  FileDown, 
  TrendingUp, 
  Users,
  Package,
  DollarSign,
  Calendar,
  Filter,
  Download,
  Mail,
  Printer,
  Share,
  Eye
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';

const monthlyData = [
  { month: 'Jan', revenue: 125000, leads: 45, customers: 23, orders: 67 },
  { month: 'Feb', revenue: 142000, leads: 52, customers: 28, orders: 78 },
  { month: 'Mar', revenue: 138000, leads: 48, customers: 25, orders: 72 },
  { month: 'Apr', revenue: 165000, leads: 61, customers: 34, orders: 89 },
  { month: 'May', revenue: 184000, leads: 68, customers: 38, orders: 95 },
  { month: 'Jun', revenue: 201000, leads: 75, customers: 42, orders: 102 },
];

const salesByCategory = [
  { name: 'Security Software', value: 35, revenue: 180000, color: '#3B82F6' },
  { name: 'Cloud Services', value: 28, revenue: 145000, color: '#10B981' },
  { name: 'IT Consulting', value: 22, revenue: 115000, color: '#F59E0B' },
  { name: 'Hardware', value: 15, revenue: 78000, color: '#EF4444' },
];

const topPerformers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Senior Sales Manager',
    avatar: 'https://pub-cdn.sider.ai/u/U0Y3HGVYKOY/web-coder/68696f720dd11641ee25c3cd/resource/d918a8e2-20ae-487d-85b7-fe8d193391af.jpg',
    leadsConverted: 34,
    revenue: 245000,
    deals: 23,
    performance: 98,
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Account Executive',
    avatar: 'https://pub-cdn.sider.ai/u/U0Y3HGVYKOY/web-coder/68696f720dd11641ee25c3cd/resource/4b6c6090-81af-4812-b079-73a9b66700a6.jpg',
    leadsConverted: 28,
    revenue: 198000,
    deals: 19,
    performance: 94,
  },
  {
    id: '3',
    name: 'Emily Davis',
    role: 'Sales Representative',
    avatar: 'https://pub-cdn.sider.ai/u/U0Y3HGVYKOY/web-coder/68696f720dd11641ee25c3cd/resource/78ff6b41-c16d-447d-8bf2-11668c62ba33.jpg',
    leadsConverted: 22,
    revenue: 156000,
    deals: 15,
    performance: 89,
  },
];

const reportTemplates = [
  {
    id: '1',
    name: 'Monthly Sales Report',
    description: 'Comprehensive monthly sales performance analysis',
    category: 'Sales',
    lastGenerated: '2024-01-15T09:00:00Z',
    format: 'PDF',
    size: '2.3 MB',
  },
  {
    id: '2',
    name: 'Lead Conversion Analysis',
    description: 'Detailed lead pipeline and conversion metrics',
    category: 'CRM',
    lastGenerated: '2024-01-14T16:30:00Z',
    format: 'Excel',
    size: '1.8 MB',
  },
  {
    id: '3',
    name: 'Inventory Summary',
    description: 'Current stock levels and movement analysis',
    category: 'Inventory',
    lastGenerated: '2024-01-13T11:15:00Z',
    format: 'PDF',
    size: '1.2 MB',
  },
];

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const kpiCards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(1155000),
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+15.3%',
    },
    {
      title: 'Total Leads',
      value: '349',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12.8%',
    },
    {
      title: 'Conversion Rate',
      value: '24.6%',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+3.2%',
    },
    {
      title: 'Active Products',
      value: '567',
      icon: Package,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '+8.1%',
    },
  ];

  const exportReport = (format: string, reportName: string) => {
    // Mock export functionality
    console.log(`Exporting ${reportName} as ${format}`);
    // In real implementation, this would trigger actual export
  };

  return (
    <div className="p-6 space-y-6 bg-white min-h-screen">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600">Comprehensive business intelligence and reporting dashboard</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <FileDown className="h-4 w-4 mr-2" />
            Export Dashboard
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                    <p className="text-sm text-green-600 mt-1">{card.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-full ${card.bgColor}`}>
                    <Icon className={`h-6 w-6 ${card.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Revenue Trend Analysis
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.1}
                  name="Revenue"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sales by Category */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle>Sales Distribution by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={salesByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {salesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle>Top Sales Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div key={performer.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={performer.avatar}
                        alt={performer.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">{performer.name}</p>
                      <p className="text-sm text-gray-600">{performer.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(performer.revenue)}</p>
                    <p className="text-sm text-gray-600">{performer.deals} deals</p>
                    <Badge variant={performer.performance >= 95 ? 'default' : 'secondary'}>
                      {performer.performance}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Report Templates */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle>Available Report Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportTemplates.map((template) => (
                <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{template.name}</p>
                      <p className="text-sm text-gray-600">{template.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline">{template.category}</Badge>
                        <span className="text-xs text-gray-500">
                          Last: {formatRelativeTime(template.lastGenerated)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => exportReport(template.format, template.name)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle>Comprehensive Performance Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="revenue" fill="#3B82F6" name="Revenue" />
              <Line yAxisId="right" type="monotone" dataKey="leads" stroke="#10B981" name="Leads" />
              <Line yAxisId="right" type="monotone" dataKey="customers" stroke="#F59E0B" name="Customers" />
              <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#EF4444" name="Orders" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
