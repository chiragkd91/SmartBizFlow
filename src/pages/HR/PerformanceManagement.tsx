/**
 * Comprehensive Performance Management System
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { 
  Target, 
  TrendingUp, 
  Award, 
  Star,
  Users,
  Calendar,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Clock,
  Eye,
  Edit,
  Plus,
  Search,
  Filter,
  Download
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

interface PerformanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  position: string;
  reviewPeriod: string;
  overallRating: number;
  goals: {
    completed: number;
    total: number;
  };
  competencies: {
    technical: number;
    communication: number;
    leadership: number;
    teamwork: number;
    problemSolving: number;
  };
  status: 'Completed' | 'In Progress' | 'Pending' | 'Overdue';
  reviewDate: string;
  reviewer: string;
  nextReviewDate: string;
}

const performanceTrends = [
  { period: 'Q1 2023', excellent: 25, good: 45, average: 25, poor: 5 },
  { period: 'Q2 2023', excellent: 30, good: 40, average: 25, poor: 5 },
  { period: 'Q3 2023', excellent: 28, good: 42, average: 25, poor: 5 },
  { period: 'Q4 2023', excellent: 35, good: 40, average: 20, poor: 5 },
  { period: 'Q1 2024', excellent: 40, good: 35, average: 20, poor: 5 }
];

const departmentPerformance = [
  { department: 'IT', avgRating: 4.2, employees: 45 },
  { department: 'Sales', avgRating: 4.5, employees: 32 },
  { department: 'Marketing', avgRating: 4.1, employees: 28 },
  { department: 'HR', avgRating: 4.3, employees: 15 },
  { department: 'Finance', avgRating: 4.0, employees: 22 }
];

const mockPerformanceRecords: PerformanceRecord[] = [
  {
    id: '1',
    employeeId: 'GCI001',
    employeeName: 'Rajesh Kumar',
    department: 'IT',
    position: 'Senior Software Engineer',
    reviewPeriod: 'Q4 2023',
    overallRating: 4.5,
    goals: { completed: 8, total: 10 },
    competencies: {
      technical: 4.5,
      communication: 4.0,
      leadership: 3.5,
      teamwork: 4.5,
      problemSolving: 4.0
    },
    status: 'Completed',
    reviewDate: '2024-01-15',
    reviewer: 'Amit Sharma',
    nextReviewDate: '2024-04-15'
  },
  {
    id: '2',
    employeeId: 'GCI002',
    employeeName: 'Priya Sharma',
    department: 'Sales',
    position: 'Sales Manager',
    reviewPeriod: 'Q4 2023',
    overallRating: 4.8,
    goals: { completed: 9, total: 10 },
    competencies: {
      technical: 4.0,
      communication: 5.0,
      leadership: 4.5,
      teamwork: 5.0,
      problemSolving: 4.5
    },
    status: 'Completed',
    reviewDate: '2024-01-10',
    reviewer: 'Vikram Singh',
    nextReviewDate: '2024-04-10'
  },
  {
    id: '3',
    employeeId: 'GCI003',
    employeeName: 'Amit Patel',
    department: 'Marketing',
    position: 'Marketing Specialist',
    reviewPeriod: 'Q4 2023',
    overallRating: 0,
    goals: { completed: 0, total: 8 },
    competencies: {
      technical: 0,
      communication: 0,
      leadership: 0,
      teamwork: 0,
      problemSolving: 0
    },
    status: 'In Progress',
    reviewDate: '',
    reviewer: 'Neha Gupta',
    nextReviewDate: '2024-02-15'
  }
];

export default function PerformanceManagement() {
  const [performanceRecords, setPerformanceRecords] = useState<PerformanceRecord[]>(mockPerformanceRecords);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('Q4 2023');

  const filteredRecords = performanceRecords.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || record.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="h-4 w-4" />;
      case 'In Progress': return <Clock className="h-4 w-4" />;
      case 'Pending': return <AlertTriangle className="h-4 w-4" />;
      case 'Overdue': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const totalReviews = filteredRecords.length;
  const completedReviews = filteredRecords.filter(r => r.status === 'Completed').length;
  const avgRating = filteredRecords.filter(r => r.overallRating > 0).reduce((sum, r) => sum + r.overallRating, 0) / 
                   filteredRecords.filter(r => r.overallRating > 0).length || 0;
  const overdueReviews = filteredRecords.filter(r => r.status === 'Overdue').length;

  const kpiCards = [
    {
      title: 'Total Reviews',
      value: totalReviews.toString(),
      subtitle: selectedPeriod,
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Completed',
      value: `${completedReviews}/${totalReviews}`,
      subtitle: `${((completedReviews/totalReviews)*100).toFixed(0)}% completion`,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: 'Average Rating',
      value: avgRating.toFixed(1),
      subtitle: 'Out of 5.0',
      icon: Award,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      title: 'Overdue',
      value: overdueReviews.toString(),
      subtitle: 'Requires attention',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Performance Management</h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">
              Track employee performance, goals, and conduct reviews
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export Reports
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  New Review
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create Performance Review</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <p className="text-sm text-gray-600">
                    Create a new performance review cycle or individual review.
                  </p>
                  <div className="flex gap-2">
                    <Button className="flex-1">Individual Review</Button>
                    <Button variant="outline" className="flex-1">Review Cycle</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.title} className={`${card.bgColor} ${card.borderColor} border shadow-sm hover:shadow-md transition-shadow`}>
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${card.bgColor}`}>
                      <Icon className={`h-5 w-5 ${card.color}`} />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg lg:text-2xl font-bold text-gray-900">{card.value}</p>
                    <p className="text-sm text-gray-600">{card.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{card.subtitle}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
          {/* Performance Trends */}
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg font-semibold">Performance Trends</span>
                <Badge variant="outline">Last 5 Quarters</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 lg:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceTrends}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="period" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Area type="monotone" dataKey="excellent" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="good" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="average" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="poor" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Department Performance */}
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Department Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 lg:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentPerformance}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="department" className="text-xs" />
                    <YAxis className="text-xs" domain={[3.5, 5]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Bar dataKey="avgRating" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              <div className="flex-1 w-full lg:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search performance reviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Q4 2023">Q4 2023</SelectItem>
                    <SelectItem value="Q3 2023">Q3 2023</SelectItem>
                    <SelectItem value="Q2 2023">Q2 2023</SelectItem>
                    <SelectItem value="Q1 2023">Q1 2023</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Records Table */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Performance Reviews ({filteredRecords.length})</span>
              <Badge variant="outline">{selectedPeriod}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Employee</TableHead>
                    <TableHead className="hidden md:table-cell">Goals Progress</TableHead>
                    <TableHead className="hidden lg:table-cell">Overall Rating</TableHead>
                    <TableHead className="hidden xl:table-cell">Review Period</TableHead>
                    <TableHead className="hidden sm:table-cell">Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Next Review</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{record.employeeName}</p>
                            <p className="text-sm text-gray-500">{record.employeeId} • {record.department}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(record.goals.completed / record.goals.total) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">
                            {record.goals.completed}/{record.goals.total}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {record.overallRating > 0 ? (
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {getRatingStars(record.overallRating)}
                            </div>
                            <span className="font-medium">{record.overallRating.toFixed(1)}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">Not rated</span>
                        )}
                      </TableCell>
                      <TableCell className="hidden xl:table-cell">
                        <span className="text-sm">{record.reviewPeriod}</span>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge className={getStatusColor(record.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(record.status)}
                            <span>{record.status}</span>
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <span className="text-sm text-gray-600">{record.nextReviewDate}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
