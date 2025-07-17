/**
 * Onboarding Management - Complete employee onboarding workflow
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { 
  UserPlus, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Users,
  Calendar,
  FileText,
  Laptop,
  Key,
  GraduationCap,
  Search,
  Filter,
  Plus
} from 'lucide-react';

interface OnboardingProcess {
  id: string;
  employeeName: string;
  employeeId: string;
  department: string;
  position: string;
  startDate: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Delayed';
  progress: number;
  assignedTo: string;
  tasks: {
    equipment: number;
    accounts: number;
    access: number;
    training: number;
    documentation: number;
  };
}

const mockOnboardingData: OnboardingProcess[] = [
  {
    id: '1',
    employeeName: 'Arjun Sharma',
    employeeId: 'GCI001',
    department: 'IT',
    position: 'Software Engineer',
    startDate: '2024-01-15',
    status: 'In Progress',
    progress: 65,
    assignedTo: 'Rajesh Kumar',
    tasks: {
      equipment: 3,
      accounts: 2,
      access: 4,
      training: 1,
      documentation: 2
    }
  },
  {
    id: '2',
    employeeName: 'Priya Patel',
    employeeId: 'GCI002',
    department: 'Sales',
    position: 'Sales Executive',
    startDate: '2024-01-20',
    status: 'Not Started',
    progress: 0,
    assignedTo: 'Amit Singh',
    tasks: {
      equipment: 2,
      accounts: 3,
      access: 2,
      training: 2,
      documentation: 1
    }
  },
  {
    id: '3',
    employeeName: 'Rohit Gupta',
    employeeId: 'GCI003',
    department: 'Marketing',
    position: 'Marketing Specialist',
    startDate: '2024-01-10',
    status: 'Completed',
    progress: 100,
    assignedTo: 'Neha Sharma',
    tasks: {
      equipment: 2,
      accounts: 2,
      access: 3,
      training: 1,
      documentation: 1
    }
  }
];

export default function OnboardingManagement() {
  const [onboardingData, setOnboardingData] = useState<OnboardingProcess[]>(mockOnboardingData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');

  const filteredData = onboardingData.filter(process => {
    const matchesSearch = process.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         process.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || process.status === filterStatus;
    const matchesDepartment = filterDepartment === 'all' || process.department === filterDepartment;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Not Started': return 'bg-gray-100 text-gray-800';
      case 'Delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="h-4 w-4" />;
      case 'In Progress': return <Clock className="h-4 w-4" />;
      case 'Delayed': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const totalProcesses = onboardingData.length;
  const inProgress = onboardingData.filter(p => p.status === 'In Progress').length;
  const completed = onboardingData.filter(p => p.status === 'Completed').length;
  const delayed = onboardingData.filter(p => p.status === 'Delayed').length;

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Onboarding Management</h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">
              Manage employee onboarding processes and track progress
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Start Onboarding
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Total Processes', value: totalProcesses, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
            { title: 'In Progress', value: inProgress, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
            { title: 'Completed', value: completed, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
            { title: 'Delayed', value: delayed, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' }
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className={`${stat.bg} border-0 shadow-sm`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-600">{stat.title}</p>
                    </div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Filters */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search onboarding processes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Delayed">Delayed</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="All Departments" />
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
              
              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Onboarding Processes */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredData.map((process) => (
            <Card key={process.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{process.employeeName}</CardTitle>
                    <p className="text-sm text-gray-600">{process.employeeId} • {process.position}</p>
                  </div>
                  <Badge className={getStatusColor(process.status)}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(process.status)}
                      <span>{process.status}</span>
                    </div>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{process.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${process.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Task Categories */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Equipment', count: process.tasks.equipment, icon: Laptop, color: 'text-blue-600' },
                      { label: 'Accounts', count: process.tasks.accounts, icon: Key, color: 'text-green-600' },
                      { label: 'Access', count: process.tasks.access, icon: Users, color: 'text-purple-600' },
                      { label: 'Training', count: process.tasks.training, icon: GraduationCap, color: 'text-orange-600' }
                    ].map((task) => {
                      const Icon = task.icon;
                      return (
                        <div key={task.label} className="flex items-center space-x-2 text-sm">
                          <Icon className={`h-4 w-4 ${task.color}`} />
                          <span className="text-gray-600">{task.label}:</span>
                          <span className="font-medium">{task.count}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Details */}
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>Start Date: {new Date(process.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>Assigned to: {process.assignedTo}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      View Details
                    </Button>
                    <Button size="sm" className="flex-1">
                      Manage Tasks
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
