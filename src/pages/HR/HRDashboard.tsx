/**
 * Fully responsive HR Dashboard with comprehensive metrics and analytics
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { useStore } from '../../store/useStore';
import { 
  Users, 
  Clock, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  UserPlus, 
  AlertCircle,
  CheckCircle,
  Target,
  Briefcase,
  Award,
  ChevronRight,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Phone,
  Mail,
  MapPin,
  Building2
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

// Sample data for charts
const attendanceData = [
  { month: 'Jan', present: 92, absent: 8, late: 5 },
  { month: 'Feb', present: 94, absent: 6, late: 4 },
  { month: 'Mar', present: 88, absent: 12, late: 8 },
  { month: 'Apr', present: 96, absent: 4, late: 3 },
  { month: 'May', present: 91, absent: 9, late: 6 },
  { month: 'Jun', present: 95, absent: 5, late: 2 }
];

const departmentData = [
  { name: 'IT', employees: 45, color: '#3B82F6' },
  { name: 'Sales', employees: 32, color: '#10B981' },
  { name: 'Marketing', employees: 28, color: '#F59E0B' },
  { name: 'HR', employees: 15, color: '#EF4444' },
  { name: 'Finance', employees: 22, color: '#8B5CF6' },
  { name: 'Operations', employees: 38, color: '#06B6D4' }
];

const performanceData = [
  { quarter: 'Q1', excellent: 35, good: 45, average: 15, poor: 5 },
  { quarter: 'Q2', excellent: 42, good: 38, average: 15, poor: 5 },
  { quarter: 'Q3', excellent: 38, good: 42, average: 16, poor: 4 },
  { quarter: 'Q4', excellent: 45, good: 35, average: 15, poor: 5 }
];

const recentActivities = [
  { id: 1, user: 'Rajesh Kumar', action: 'Applied for leave', target: 'Annual Leave', time: '2 hours ago', type: 'leave' },
  { id: 2, user: 'Priya Sharma', action: 'Completed training', target: 'Leadership Skills', time: '4 hours ago', type: 'training' },
  { id: 3, user: 'Amit Patel', action: 'Updated profile', target: 'Personal Information', time: '6 hours ago', type: 'profile' },
  { id: 4, user: 'Sneha Reddy', action: 'Submitted timesheet', target: 'Weekly Hours', time: '8 hours ago', type: 'timesheet' },
  { id: 5, user: 'System', action: 'Payroll processed', target: 'Monthly Salary', time: '12 hours ago', type: 'system' }
];

export default function HRDashboard() {
  const { currentUser, dashboardStats, loading } = useStore();
  const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');

  // Role-based stats calculation
  const getHRStats = () => {
    if (currentUser?.role === 'admin') {
      return {
        totalEmployees: 247,
        activeEmployees: 234,
        onLeave: 13,
        newHires: 8,
        pendingLeaves: 23,
        overdueAppraisals: 12,
        avgSalary: 85000,
        turnoverRate: 3.2,
        attendanceRate: 94.5,
        satisfactionScore: 4.2
      };
    } else if (currentUser?.role === 'manager') {
      return {
        totalEmployees: 45,
        activeEmployees: 42,
        onLeave: 3,
        newHires: 2,
        pendingLeaves: 8,
        overdueAppraisals: 3,
        avgSalary: 75000,
        turnoverRate: 2.1,
        attendanceRate: 96.2,
        satisfactionScore: 4.4
      };
    } else {
      return {
        totalEmployees: 12,
        activeEmployees: 11,
        onLeave: 1,
        newHires: 0,
        pendingLeaves: 2,
        overdueAppraisals: 1,
        avgSalary: 65000,
        turnoverRate: 1.5,
        attendanceRate: 98.1,
        satisfactionScore: 4.6
      };
    }
  };

  const hrStats = getHRStats();

  const kpiCards = [
    {
      title: 'Total Employees',
      value: hrStats.totalEmployees.toString(),
      change: '+5.2%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Active Today',
      value: hrStats.activeEmployees.toString(),
      change: `${hrStats.attendanceRate}%`,
      changeType: 'positive' as const,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: 'On Leave',
      value: hrStats.onLeave.toString(),
      change: '-12%',
      changeType: 'negative' as const,
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      title: 'New Hires',
      value: hrStats.newHires.toString(),
      change: '+25%',
      changeType: 'positive' as const,
      icon: UserPlus,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      title: 'Avg Salary',
      value: `₹${(hrStats.avgSalary / 1000).toFixed(0)}K`,
      change: '+8.5%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      title: 'Satisfaction',
      value: `${hrStats.satisfactionScore}/5`,
      change: '+0.3',
      changeType: 'positive' as const,
      icon: Award,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200'
    }
  ];

  const actionCards = [
    {
      title: 'Pending Leave Approvals',
      value: hrStats.pendingLeaves,
      action: 'Review Now',
      urgency: 'high' as const,
      icon: AlertCircle
    },
    {
      title: 'Overdue Performance Reviews',
      value: hrStats.overdueAppraisals,
      action: 'Schedule Reviews',
      urgency: 'medium' as const,
      icon: Target
    },
    {
      title: 'Expiring Documents',
      value: 6,
      action: 'Update Records',
      urgency: 'low' as const,
      icon: Briefcase
    }
  ];

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading HR Dashboard...</p>
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
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">HR Dashboard</h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">
              Welcome back, {currentUser?.name} ({currentUser?.role})
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
              View Reports
            </Button>
          </div>
        </div>

        {/* KPI Cards - Responsive Grid */}
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

        {/* Action Items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {actionCards.map((card) => {
            const Icon = card.icon;
            const urgencyColors = {
              high: 'border-red-200 bg-red-50',
              medium: 'border-yellow-200 bg-yellow-50',
              low: 'border-green-200 bg-green-50'
            };
            const urgencyTextColors = {
              high: 'text-red-700',
              medium: 'text-yellow-700',
              low: 'text-green-700'
            };
            
            return (
              <Card key={card.title} className={`${urgencyColors[card.urgency]} border hover:shadow-md transition-shadow`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon className={`h-5 w-5 ${urgencyTextColors[card.urgency]}`} />
                        <h3 className="font-medium text-gray-900 text-sm lg:text-base">{card.title}</h3>
                      </div>
                      <p className={`text-2xl font-bold ${urgencyTextColors[card.urgency]} mb-2`}>{card.value}</p>
                      <Button size="sm" variant="outline" className="w-full">
                        {card.action}
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Section - Responsive Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
          {/* Attendance Trends */}
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg font-semibold">Attendance Trends</span>
                <Badge variant="outline">Last 6 Months</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 lg:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={attendanceData}>
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
                    />
                    <Area type="monotone" dataKey="present" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="late" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="absent" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Department Distribution */}
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg font-semibold">Department Distribution</span>
                <Badge variant="outline">Total: {departmentData.reduce((sum, dept) => sum + dept.employees, 0)}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 lg:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      dataKey="employees"
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, employees }) => `${name}: ${employees}`}
                      labelLine={false}
                    >
                      {departmentData.map((entry, index) => (
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

        {/* Performance & Activities */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
          {/* Performance Distribution */}
          <Card className="xl:col-span-2 bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg font-semibold">Performance Distribution</span>
                <Badge variant="outline">Quarterly Reviews</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 lg:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="quarter" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Bar dataKey="excellent" stackId="a" fill="#10B981" />
                    <Bar dataKey="good" stackId="a" fill="#3B82F6" />
                    <Bar dataKey="average" stackId="a" fill="#F59E0B" />
                    <Bar dataKey="poor" stackId="a" fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
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
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions - Mobile Optimized */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { title: 'Add Employee', icon: UserPlus, path: '/hr/employees', color: 'bg-blue-50 hover:bg-blue-100 text-blue-700' },
                { title: 'Leave Requests', icon: Calendar, path: '/hr/leave', color: 'bg-green-50 hover:bg-green-100 text-green-700' },
                { title: 'Payroll', icon: DollarSign, path: '/hr/payroll', color: 'bg-purple-50 hover:bg-purple-100 text-purple-700' },
                { title: 'Attendance', icon: Clock, path: '/hr/attendance', color: 'bg-orange-50 hover:bg-orange-100 text-orange-700' },
                { title: 'Performance', icon: Target, path: '/hr/performance', color: 'bg-pink-50 hover:bg-pink-100 text-pink-700' },
                { title: 'Reports', icon: BarChart3, path: '/hr/reports', color: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700' }
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
