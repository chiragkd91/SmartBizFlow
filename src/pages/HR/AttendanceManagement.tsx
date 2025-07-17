/**
 * Fully responsive Attendance Management with real-time tracking
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Calendar } from '../../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { 
  Clock, 
  Calendar as CalendarIcon, 
  Users, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Search,
  Filter,
  Download,
  Upload,
  TrendingUp,
  BarChart3,
  MapPin,
  Camera,
  Smartphone,
  Wifi
} from 'lucide-react';
import { format } from 'date-fns';
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
  Cell
} from 'recharts';

interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'Present' | 'Absent' | 'Late' | 'Half Day' | 'Work From Home';
  workingHours: number;
  overtime: number;
  location: string;
  notes?: string;
}

const weeklyData = [
  { day: 'Mon', present: 245, absent: 12, late: 8, wfh: 15 },
  { day: 'Tue', present: 252, absent: 8, late: 5, wfh: 18 },
  { day: 'Wed', present: 248, absent: 10, late: 7, wfh: 16 },
  { day: 'Thu', present: 250, absent: 9, late: 6, wfh: 14 },
  { day: 'Fri', present: 255, absent: 5, late: 4, wfh: 20 },
  { day: 'Sat', present: 180, absent: 85, late: 2, wfh: 25 },
];

const statusDistribution = [
  { name: 'Present', value: 85, color: '#10B981' },
  { name: 'Late', value: 8, color: '#F59E0B' },
  { name: 'Absent', value: 4, color: '#EF4444' },
  { name: 'WFH', value: 3, color: '#3B82F6' }
];

const mockAttendanceData: AttendanceRecord[] = [
  {
    id: '1',
    employeeId: 'GCI001',
    employeeName: 'Rajesh Kumar',
    department: 'IT',
    date: '2024-01-15',
    checkIn: '09:00',
    checkOut: '18:30',
    status: 'Present',
    workingHours: 8.5,
    overtime: 0.5,
    location: 'Office - Mumbai'
  },
  {
    id: '2',
    employeeId: 'GCI002',
    employeeName: 'Priya Sharma',
    department: 'Sales',
    date: '2024-01-15',
    checkIn: '09:15',
    checkOut: '18:00',
    status: 'Late',
    workingHours: 8,
    overtime: 0,
    location: 'Office - Delhi'
  },
  {
    id: '3',
    employeeId: 'GCI003',
    employeeName: 'Amit Patel',
    department: 'Marketing',
    date: '2024-01-15',
    checkIn: '10:00',
    checkOut: '19:00',
    status: 'Work From Home',
    workingHours: 8,
    overtime: 1,
    location: 'Home - Bangalore'
  },
  {
    id: '4',
    employeeId: 'GCI004',
    employeeName: 'Sneha Reddy',
    department: 'HR',
    date: '2024-01-15',
    checkIn: '--',
    checkOut: '--',
    status: 'Absent',
    workingHours: 0,
    overtime: 0,
    location: '--',
    notes: 'Sick Leave'
  },
  {
    id: '5',
    employeeId: 'GCI005',
    employeeName: 'Arjun Singh',
    department: 'Finance',
    date: '2024-01-15',
    checkIn: '09:00',
    checkOut: '14:00',
    status: 'Half Day',
    workingHours: 4,
    overtime: 0,
    location: 'Office - Pune'
  }
];

export default function AttendanceManagement() {
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>(mockAttendanceData);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const filteredData = attendanceData.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || record.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present': return 'bg-green-100 text-green-800';
      case 'Late': return 'bg-yellow-100 text-yellow-800';
      case 'Absent': return 'bg-red-100 text-red-800';
      case 'Half Day': return 'bg-orange-100 text-orange-800';
      case 'Work From Home': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Present': return <CheckCircle className="h-4 w-4" />;
      case 'Late': return <AlertTriangle className="h-4 w-4" />;
      case 'Absent': return <XCircle className="h-4 w-4" />;
      case 'Half Day': return <Clock className="h-4 w-4" />;
      case 'Work From Home': return <Wifi className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const totalEmployees = 280;
  const presentToday = filteredData.filter(r => r.status === 'Present' || r.status === 'Work From Home').length;
  const lateToday = filteredData.filter(r => r.status === 'Late').length;
  const absentToday = filteredData.filter(r => r.status === 'Absent').length;
  const avgWorkingHours = filteredData.reduce((sum, r) => sum + r.workingHours, 0) / filteredData.length || 0;

  const kpiCards = [
    {
      title: 'Total Present',
      value: presentToday.toString(),
      percentage: `${((presentToday / totalEmployees) * 100).toFixed(1)}%`,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: 'Late Arrivals',
      value: lateToday.toString(),
      percentage: `${((lateToday / totalEmployees) * 100).toFixed(1)}%`,
      icon: AlertTriangle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      title: 'Absent Today',
      value: absentToday.toString(),
      percentage: `${((absentToday / totalEmployees) * 100).toFixed(1)}%`,
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      title: 'Avg Hours',
      value: avgWorkingHours.toFixed(1),
      percentage: 'hours/day',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Attendance Management</h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">
              Track and manage employee attendance with real-time monitoring
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex gap-1 border rounded-md p-1 bg-white">
              <Button
                variant={viewMode === 'daily' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('daily')}
                className="text-xs"
              >
                Daily
              </Button>
              <Button
                variant={viewMode === 'weekly' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('weekly')}
                className="text-xs"
              >
                Weekly
              </Button>
              <Button
                variant={viewMode === 'monthly' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('monthly')}
                className="text-xs"
              >
                Monthly
              </Button>
            </div>
            <Button variant="outline" className="flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Button>
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
                    <span className="text-xs font-medium text-gray-500">{card.percentage}</span>
                  </div>
                  <div>
                    <p className="text-2xl lg:text-3xl font-bold text-gray-900">{card.value}</p>
                    <p className="text-sm text-gray-600">{card.title}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Real-time Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-600 rounded-full">
                  <Camera className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900">Facial Recognition Check-in</h3>
                  <p className="text-sm text-blue-700">Enable contactless attendance</p>
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Enable
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-600 rounded-full">
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-green-900">Mobile App Integration</h3>
                  <p className="text-sm text-green-700">GPS-based attendance tracking</p>
                </div>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Setup
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-600 rounded-full">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-purple-900">Geo-fencing</h3>
                  <p className="text-sm text-purple-700">Location-based attendance validation</p>
                </div>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
          {/* Weekly Attendance Trends */}
          <Card className="xl:col-span-2 bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg font-semibold">Weekly Attendance Trends</span>
                <Badge variant="outline">This Week</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 lg:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="day" className="text-xs" />
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
                    <Area type="monotone" dataKey="wfh" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="late" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="absent" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Status Distribution */}
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Today's Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 lg:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      dataKey="value"
                      data={statusDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, value }) => `${name}: ${value}%`}
                      labelLine={false}
                    >
                      {statusDistribution.map((entry, index) => (
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

        {/* Filters and Search */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              <div className="flex-1 w-full lg:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-40 justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "MMM dd, yyyy") : "Pick date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

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
                    <SelectItem value="Present">Present</SelectItem>
                    <SelectItem value="Late">Late</SelectItem>
                    <SelectItem value="Absent">Absent</SelectItem>
                    <SelectItem value="Half Day">Half Day</SelectItem>
                    <SelectItem value="Work From Home">Work From Home</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Records */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Attendance Records ({filteredData.length})</span>
              <Badge variant="outline">
                {selectedDate ? format(selectedDate, "MMM dd, yyyy") : "Today"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Employee</TableHead>
                    <TableHead className="hidden md:table-cell">Department</TableHead>
                    <TableHead className="hidden lg:table-cell">Check In</TableHead>
                    <TableHead className="hidden lg:table-cell">Check Out</TableHead>
                    <TableHead className="hidden xl:table-cell">Working Hours</TableHead>
                    <TableHead className="hidden sm:table-cell">Status</TableHead>
                    <TableHead className="hidden xl:table-cell">Location</TableHead>
                    <TableHead className="hidden lg:table-cell">Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{record.employeeName}</p>
                            <p className="text-sm text-gray-500">{record.employeeId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline">{record.department}</Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <span className="font-mono text-sm">{record.checkIn}</span>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <span className="font-mono text-sm">{record.checkOut}</span>
                      </TableCell>
                      <TableCell className="hidden xl:table-cell">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{record.workingHours}h</span>
                          {record.overtime > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              +{record.overtime}h OT
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge className={getStatusColor(record.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(record.status)}
                            <span>{record.status}</span>
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden xl:table-cell">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span className="text-sm text-gray-600 truncate">{record.location}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <span className="text-sm text-gray-600">{record.notes || '--'}</span>
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
