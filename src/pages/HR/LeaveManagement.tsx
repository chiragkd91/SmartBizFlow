/**
 * Comprehensive Leave Management System with approvals and calendar integration
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { Calendar } from '../../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Briefcase,
  Heart,
  Plane,
  Baby,
  GraduationCap,
  Home,
  AlertTriangle,
  Eye,
  Check,
  X,
  MessageCircle
} from 'lucide-react';
import { Textarea } from '../../components/ui/textarea';
import { format, addDays, differenceInDays } from 'date-fns';

interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';
  appliedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  comments?: string;
}

const LEAVE_TYPES = [
  { value: 'annual', label: 'Annual Leave', icon: Plane, color: 'bg-blue-100 text-blue-800' },
  { value: 'sick', label: 'Sick Leave', icon: Heart, color: 'bg-red-100 text-red-800' },
  { value: 'maternity', label: 'Maternity Leave', icon: Baby, color: 'bg-pink-100 text-pink-800' },
  { value: 'paternity', label: 'Paternity Leave', icon: User, color: 'bg-green-100 text-green-800' },
  { value: 'personal', label: 'Personal Leave', icon: Home, color: 'bg-purple-100 text-purple-800' },
  { value: 'study', label: 'Study Leave', icon: GraduationCap, color: 'bg-yellow-100 text-yellow-800' },
  { value: 'emergency', label: 'Emergency Leave', icon: AlertTriangle, color: 'bg-orange-100 text-orange-800' }
];

const mockLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    employeeId: 'GCI001',
    employeeName: 'Rajesh Kumar',
    department: 'IT',
    leaveType: 'annual',
    startDate: '2024-02-15',
    endDate: '2024-02-19',
    days: 5,
    reason: 'Family vacation to Goa',
    status: 'Pending',
    appliedDate: '2024-01-20'
  },
  {
    id: '2',
    employeeId: 'GCI002',
    employeeName: 'Priya Sharma',
    department: 'Sales',
    leaveType: 'sick',
    startDate: '2024-01-22',
    endDate: '2024-01-23',
    days: 2,
    reason: 'Fever and flu symptoms',
    status: 'Approved',
    appliedDate: '2024-01-21',
    approvedBy: 'Vikram Singh',
    approvedDate: '2024-01-21'
  },
  {
    id: '3',
    employeeId: 'GCI003',
    employeeName: 'Amit Patel',
    department: 'Marketing',
    leaveType: 'personal',
    startDate: '2024-03-01',
    endDate: '2024-03-03',
    days: 3,
    reason: 'House shifting',
    status: 'Pending',
    appliedDate: '2024-01-18'
  },
  {
    id: '4',
    employeeId: 'GCI004',
    employeeName: 'Sneha Reddy',
    department: 'HR',
    leaveType: 'maternity',
    startDate: '2024-04-01',
    endDate: '2024-07-30',
    days: 120,
    reason: 'Maternity leave for childbirth',
    status: 'Approved',
    appliedDate: '2024-01-10',
    approvedBy: 'Ravi Kumar',
    approvedDate: '2024-01-12'
  },
  {
    id: '5',
    employeeId: 'GCI005',
    employeeName: 'Arjun Singh',
    department: 'Finance',
    leaveType: 'annual',
    startDate: '2024-02-05',
    endDate: '2024-02-07',
    days: 3,
    reason: 'Wedding anniversary celebration',
    status: 'Rejected',
    appliedDate: '2024-01-15',
    approvedBy: 'Meera Joshi',
    approvedDate: '2024-01-16',
    comments: 'Peak period, please reschedule'
  }
];

export default function LeaveManagement() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(mockLeaveRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterLeaveType, setFilterLeaveType] = useState('all');
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'requests' | 'calendar'>('requests');
  const [selectedDateRange, setSelectedDateRange] = useState<{start: Date | undefined, end: Date | undefined}>({
    start: undefined,
    end: undefined
  });

  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const filteredRequests = leaveRequests.filter(request => {
    const matchesSearch = request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || request.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesLeaveType = filterLeaveType === 'all' || request.leaveType === filterLeaveType;
    
    return matchesSearch && matchesDepartment && matchesStatus && matchesLeaveType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckCircle className="h-4 w-4" />;
      case 'Rejected': return <XCircle className="h-4 w-4" />;
      case 'Pending': return <Clock className="h-4 w-4" />;
      case 'Cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getLeaveTypeDetails = (type: string) => {
    return LEAVE_TYPES.find(lt => lt.value === type) || LEAVE_TYPES[0];
  };

  const handleApprove = (id: string) => {
    setLeaveRequests(prev => prev.map(request => 
      request.id === id 
        ? { ...request, status: 'Approved' as const, approvedBy: 'Current User', approvedDate: new Date().toISOString().split('T')[0] }
        : request
    ));
  };

  const handleReject = (id: string, comments?: string) => {
    setLeaveRequests(prev => prev.map(request => 
      request.id === id 
        ? { ...request, status: 'Rejected' as const, approvedBy: 'Current User', approvedDate: new Date().toISOString().split('T')[0], comments }
        : request
    ));
  };

  const calculateDays = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      return differenceInDays(end, start) + 1;
    }
    return 0;
  };

  const handleApplyLeave = () => {
    const newRequest: LeaveRequest = {
      id: Date.now().toString(),
      employeeId: 'GCI006',
      employeeName: 'Current User',
      department: 'IT',
      leaveType: formData.leaveType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      days: calculateDays(),
      reason: formData.reason,
      status: 'Pending',
      appliedDate: new Date().toISOString().split('T')[0]
    };
    
    setLeaveRequests(prev => [newRequest, ...prev]);
    setIsApplyDialogOpen(false);
    setFormData({ leaveType: '', startDate: '', endDate: '', reason: '' });
  };

  const totalRequests = leaveRequests.length;
  const pendingRequests = leaveRequests.filter(r => r.status === 'Pending').length;
  const approvedRequests = leaveRequests.filter(r => r.status === 'Approved').length;
  const totalDaysRequested = leaveRequests.reduce((sum, r) => sum + r.days, 0);

  const kpiCards = [
    {
      title: 'Total Requests',
      value: totalRequests.toString(),
      subtitle: 'This month',
      icon: Briefcase,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Pending Approval',
      value: pendingRequests.toString(),
      subtitle: 'Requires action',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      title: 'Approved',
      value: approvedRequests.toString(),
      subtitle: 'This month',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: 'Total Days',
      value: totalDaysRequested.toString(),
      subtitle: 'Days requested',
      icon: CalendarIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Leave Management</h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">
              Manage employee leave requests and maintain leave balance records
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex gap-1 border rounded-md p-1 bg-white">
              <Button
                variant={viewMode === 'requests' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('requests')}
                className="text-xs"
              >
                Requests
              </Button>
              <Button
                variant={viewMode === 'calendar' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('calendar')}
                className="text-xs"
              >
                Calendar
              </Button>
            </div>
            <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Apply Leave
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Apply for Leave</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div>
                    <Label htmlFor="leaveType">Leave Type *</Label>
                    <Select value={formData.leaveType} onValueChange={(value) => setFormData(prev => ({ ...prev, leaveType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select leave type" />
                      </SelectTrigger>
                      <SelectContent>
                        {LEAVE_TYPES.map((type) => {
                          const Icon = type.icon;
                          return (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center space-x-2">
                                <Icon className="h-4 w-4" />
                                <span>{type.label}</span>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Start Date *</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">End Date *</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                      />
                    </div>
                  </div>

                  {formData.startDate && formData.endDate && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">
                        <strong>Duration:</strong> {calculateDays()} day{calculateDays() !== 1 ? 's' : ''}
                      </p>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="reason">Reason *</Label>
                    <Textarea
                      id="reason"
                      value={formData.reason}
                      onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                      placeholder="Please provide a detailed reason for your leave request"
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsApplyDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleApplyLeave}>
                      Submit Application
                    </Button>
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
                    <p className="text-2xl lg:text-3xl font-bold text-gray-900">{card.value}</p>
                    <p className="text-sm text-gray-600">{card.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{card.subtitle}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions for Pending Approvals */}
        {pendingRequests > 0 && (
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-yellow-500 rounded-full">
                    <AlertTriangle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-yellow-900">
                      {pendingRequests} Leave Request{pendingRequests > 1 ? 's' : ''} Pending Approval
                    </h3>
                    <p className="text-sm text-yellow-700">Review and approve pending leave requests</p>
                  </div>
                </div>
                <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                  Review Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters and Search */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              <div className="flex-1 w-full lg:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search leave requests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
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
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterLeaveType} onValueChange={setFilterLeaveType}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Leave Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {LEAVE_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leave Requests Table */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Leave Requests ({filteredRequests.length})</span>
              <Badge variant="outline">{filterStatus === 'all' ? 'All Requests' : filterStatus}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Employee</TableHead>
                    <TableHead className="hidden md:table-cell">Leave Type</TableHead>
                    <TableHead className="hidden lg:table-cell">Duration</TableHead>
                    <TableHead className="hidden xl:table-cell">Dates</TableHead>
                    <TableHead className="hidden sm:table-cell">Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Applied Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => {
                    const leaveType = getLeaveTypeDetails(request.leaveType);
                    const Icon = leaveType.icon;
                    
                    return (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <User className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{request.employeeName}</p>
                              <p className="text-sm text-gray-500">{request.employeeId} • {request.department}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center space-x-2">
                            <Icon className="h-4 w-4 text-gray-500" />
                            <Badge className={leaveType.color}>
                              {leaveType.label}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="text-center">
                            <span className="font-semibold text-lg">{request.days}</span>
                            <p className="text-xs text-gray-500">day{request.days !== 1 ? 's' : ''}</p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden xl:table-cell">
                          <div className="text-sm">
                            <p className="font-medium">{format(new Date(request.startDate), 'MMM dd')}</p>
                            <p className="text-gray-500">to {format(new Date(request.endDate), 'MMM dd, yyyy')}</p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge className={getStatusColor(request.status)}>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(request.status)}
                              <span>{request.status}</span>
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className="text-sm text-gray-600">
                            {format(new Date(request.appliedDate), 'MMM dd, yyyy')}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              {request.status === 'Pending' && (
                                <>
                                  <DropdownMenuItem onClick={() => handleApprove(request.id)} className="text-green-600">
                                    <Check className="mr-2 h-4 w-4" />
                                    Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleReject(request.id)} className="text-red-600">
                                    <X className="mr-2 h-4 w-4" />
                                    Reject
                                  </DropdownMenuItem>
                                </>
                              )}
                              <DropdownMenuItem>
                                <MessageCircle className="mr-2 h-4 w-4" />
                                Add Comment
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
