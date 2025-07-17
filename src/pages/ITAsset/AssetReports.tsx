/**
 * IT Asset Reports and Analytics - Comprehensive reporting dashboard
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { 
  BarChart3, 
  Download, 
  Calendar, 
  TrendingUp,
  PieChart,
  FileText,
  Filter,
  Printer,
  Mail,
  Share2
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

// Sample data for reports
const assetValueTrend = [
  { month: 'Jan', value: 7200000, depreciation: 120000 },
  { month: 'Feb', value: 7450000, depreciation: 125000 },
  { month: 'Mar', value: 7680000, depreciation: 130000 },
  { month: 'Apr', value: 8100000, depreciation: 135000 },
  { month: 'May', value: 8350000, depreciation: 140000 },
  { month: 'Jun', value: 8500000, depreciation: 145000 }
];

const categoryUtilization = [
  { category: 'Laptops', utilized: 85, total: 100 },
  { category: 'Desktops', utilized: 72, total: 85 },
  { category: 'Servers', utilized: 95, total: 100 },
  { category: 'Printers', utilized: 60, total: 75 },
  { category: 'Mobile Devices', utilized: 78, total: 90 },
  { category: 'Network Equipment', utilized: 88, total: 95 }
];

const maintenanceCosts = [
  { month: 'Jan', preventive: 45000, corrective: 28000, emergency: 15000 },
  { month: 'Feb', preventive: 52000, corrective: 22000, emergency: 8000 },
  { month: 'Mar', preventive: 48000, corrective: 35000, emergency: 12000 },
  { month: 'Apr', preventive: 55000, corrective: 30000, emergency: 18000 },
  { month: 'May', preventive: 58000, corrective: 25000, emergency: 10000 },
  { month: 'Jun', preventive: 60000, corrective: 32000, emergency: 22000 }
];

const assetAgeDistribution = [
  { age: '0-1 Year', count: 45, color: '#10B981' },
  { age: '1-2 Years', count: 35, color: '#3B82F6' },
  { age: '2-3 Years', count: 28, color: '#F59E0B' },
  { age: '3-4 Years', count: 22, color: '#EF4444' },
  { age: '4+ Years', count: 15, color: '#6B7280' }
];

const locationPerformance = [
  { location: 'Mumbai', assets: 45, uptime: 99.2, issues: 3 },
  { location: 'Delhi', assets: 38, uptime: 98.8, issues: 5 },
  { location: 'Bangalore', assets: 42, uptime: 99.5, issues: 2 },
  { location: 'Chennai', assets: 35, uptime: 98.5, issues: 6 },
  { location: 'Pune', assets: 25, uptime: 99.1, issues: 4 }
];

export default function AssetReports() {
  const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');
  const [selectedReport, setSelectedReport] = useState('overview');

  const reportTypes = [
    { id: 'overview', name: 'Asset Overview', icon: BarChart3 },
    { id: 'utilization', name: 'Utilization Report', icon: TrendingUp },
    { id: 'maintenance', name: 'Maintenance Report', icon: FileText },
    { id: 'financial', name: 'Financial Report', icon: PieChart },
    { id: 'compliance', name: 'Compliance Report', icon: FileText }
  ];

  const generateReport = (type: string) => {
    // In a real application, this would generate and download the actual report
    console.log(`Generating ${type} report for ${selectedPeriod}`);
    alert(`${type} report generated successfully!`);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Asset Reports</h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">
              Comprehensive analytics and reports for IT asset management
            </p>
          </div>
          <div className="flex gap-2">
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
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>

        {/* Report Type Selection */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Report Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {reportTypes.map((report) => {
                const Icon = report.icon;
                return (
                  <Button
                    key={report.id}
                    variant={selectedReport === report.id ? "default" : "outline"}
                    className={`h-auto p-4 flex flex-col items-center space-y-2 ${
                      selectedReport === report.id 
                        ? 'bg-blue-600 text-white' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedReport(report.id)}
                  >
                    <Icon className="h-6 w-6" />
                    <span className="text-sm font-medium text-center">{report.name}</span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Total Assets', value: '185', change: '+12', icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50' },
            { title: 'Asset Value', value: '₹8.5Cr', change: '+15%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
            { title: 'Utilization Rate', value: '87%', change: '+3%', icon: PieChart, color: 'text-purple-600', bg: 'bg-purple-50' },
            { title: 'Maintenance Cost', value: '₹1.2L', change: '-8%', icon: FileText, color: 'text-orange-600', bg: 'bg-orange-50' }
          ].map((metric) => {
            const Icon = metric.icon;
            return (
              <Card key={metric.title} className={`${metric.bg} border-0 shadow-sm`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                      <p className="text-sm text-gray-600">{metric.title}</p>
                    </div>
                    <div className="text-right">
                      <Icon className={`h-8 w-8 ${metric.color} mb-2`} />
                      <Badge variant="outline" className="text-xs">
                        {metric.change}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Asset Value Trend */}
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span>Asset Value Trend</span>
                <Button size="sm" variant="outline" onClick={() => generateReport('asset-value')}>
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 lg:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={assetValueTrend}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      formatter={(value: any, name: string) => [
                        `₹${(value / 100000).toFixed(1)}L`,
                        name === 'value' ? 'Asset Value' : 'Depreciation'
                      ]}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3B82F6" 
                      fill="#3B82F6" 
                      fillOpacity={0.2} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="depreciation" 
                      stroke="#EF4444" 
                      fill="#EF4444" 
                      fillOpacity={0.2} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Asset Age Distribution */}
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span>Asset Age Distribution</span>
                <Button size="sm" variant="outline" onClick={() => generateReport('asset-age')}>
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 lg:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      dataKey="count"
                      data={assetAgeDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ age, count }) => `${age}: ${count}`}
                      labelLine={false}
                    >
                      {assetAgeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Utilization and Maintenance */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Category Utilization */}
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span>Category Utilization</span>
                <Button size="sm" variant="outline" onClick={() => generateReport('utilization')}>
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 lg:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryUtilization} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis type="number" className="text-xs" />
                    <YAxis dataKey="category" type="category" className="text-xs" width={80} />
                    <Tooltip />
                    <Bar dataKey="utilized" fill="#10B981" />
                    <Bar dataKey="total" fill="#E5E7EB" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Maintenance Costs */}
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span>Maintenance Costs</span>
                <Button size="sm" variant="outline" onClick={() => generateReport('maintenance')}>
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 lg:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={maintenanceCosts}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      formatter={(value: any) => `₹${(value / 1000).toFixed(0)}K`}
                    />
                    <Area type="monotone" dataKey="preventive" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="corrective" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="emergency" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Location Performance Table */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <span>Location Performance</span>
              <Button size="sm" variant="outline" onClick={() => generateReport('location-performance')}>
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium text-gray-900">Location</th>
                    <th className="text-left p-3 font-medium text-gray-900">Total Assets</th>
                    <th className="text-left p-3 font-medium text-gray-900">Uptime %</th>
                    <th className="text-left p-3 font-medium text-gray-900">Open Issues</th>
                    <th className="text-left p-3 font-medium text-gray-900">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {locationPerformance.map((location) => (
                    <tr key={location.location} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium text-gray-900">{location.location}</td>
                      <td className="p-3 text-gray-900">{location.assets}</td>
                      <td className="p-3">
                        <Badge className={location.uptime >= 99 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {location.uptime}%
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge className={location.issues <= 3 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {location.issues}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              location.uptime >= 99 ? 'bg-green-500' : 
                              location.uptime >= 98 ? 'bg-yellow-500' : 
                              'bg-red-500'
                            }`}
                            style={{ width: `${location.uptime}%` }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Export Options */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Export & Share Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" onClick={() => generateReport('pdf')}>
                <FileText className="h-6 w-6 text-red-600" />
                <span className="text-sm">Export PDF</span>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" onClick={() => generateReport('excel')}>
                <BarChart3 className="h-6 w-6 text-green-600" />
                <span className="text-sm">Export Excel</span>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" onClick={() => generateReport('print')}>
                <Printer className="h-6 w-6 text-blue-600" />
                <span className="text-sm">Print Report</span>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" onClick={() => generateReport('email')}>
                <Mail className="h-6 w-6 text-purple-600" />
                <span className="text-sm">Email Report</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Scheduled Reports */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Scheduled Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Weekly Asset Summary', frequency: 'Every Monday', nextRun: '2024-12-09', recipients: '3 recipients' },
                { name: 'Monthly Utilization Report', frequency: 'First of month', nextRun: '2025-01-01', recipients: '5 recipients' },
                { name: 'Quarterly Financial Report', frequency: 'Quarterly', nextRun: '2025-01-01', recipients: '2 recipients' }
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{report.name}</h4>
                    <p className="text-sm text-gray-600">{report.frequency} • Next run: {report.nextRun}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{report.recipients}</Badge>
                    <Button size="sm" variant="outline">Edit</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
