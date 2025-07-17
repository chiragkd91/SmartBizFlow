/**
 * Offboarding Management - Complete employee offboarding workflow
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { 
  UserMinus, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Users,
  Calendar,
  FileText,
  Laptop,
  Key,
  Shield,
  Search,
  Filter,
  Plus
} from 'lucide-react';

interface OffboardingProcess {
  id: string;
  employeeName: string;
  employeeId: string;
  department: string;
  position: string;
  lastWorkingDay: string;
  reason: 'Resignation' | 'Termination' | 'Retirement' | 'Transfer';
  status: 'Initiated' | 'In Progress' | 'Completed' | 'Delayed';
  progress: number;
  assignedTo: string;
  tasks: {
    dataBackup: number;
    equipmentReturn: number;
    accessRevocation: number;
    exitInterview: number;
    documentation: number;
  };
}

const mockOffboardingData: OffboardingProcess[] = [
  {
    id: '1',
    employeeName: 'Kavya Sharma',
    employeeId: 'GCI008',
    department: 'Marketing',
    position: 'Marketing Manager',
    lastWorkingDay: '2024-02-15',
    reason: 'Resignation',
    status: 'In Progress',
    progress: 70,
    assignedTo: 'HR Team',
    tasks: {
      dataBackup: 2,
      equipmentReturn: 3,
      accessRevocation: 4,
      exitInterview: 1,
      documentation: 2
    }
  },
  {
    id: '2',
    employeeName: 'Ravi Kumar',
    employeeId: 'GCI009',
    department: 'Sales',
    position: 'Sales Executive',
    lastWorkingDay: '2024-02-20',
    reason: 'Transfer',
    status: 'Initiated',
    progress: 20,
    assignedTo: 'IT Team',
    tasks: {
      dataBackup: 1,
      equipmentReturn: 2,
      accessRevocation: 3,
      exitInterview: 1,
      documentation: 1
    }
  },
  {
    id: '3',
    employeeName: 'Deepak Singh',
    employeeId: 'GCI010',
    department: 'Finance',
    position: 'Senior Accountant',
    lastWorkingDay: '2024-01-31',
    reason: 'Retirement',
    status: 'Completed',
    progress: 100,
    assignedTo: 'HR Team',
    tasks: {
      dataBackup: 2,
      equipmentReturn: 2,
      accessRevocation: 3,
      exitInterview: 1,
      documentation: 3
    }
  }
];

export default function OffboardingManagement() {
  const [offboardingData, setOffboardingData] = useState<OffboardingProcess[]>(mockOffboardingData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterReason, setFilterReason] = useState('all');

  const filteredData = offboardingData.filter(process => {
    const matchesSearch = process.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         process.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || process.status === filterStatus;
    const matchesReason = filterReason === 'all' || process.reason === filterReason;
    
    return matchesSearch && matchesStatus && matchesReason;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Initiated': return 'bg-yellow-100 text-yellow-800';
      case 'Delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReasonColor = (reason: string) => {
    switch (reason) {
      case 'Resignation': return 'bg-blue-100 text-blue-800';
      case 'Termination': return 'bg-red-100 text-red-800';
      case 'Retirement': return 'bg-purple-100 text-purple-800';
      case 'Transfer': return 'bg-green-100 text-green-800';
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

  const totalProcesses = offboardingData.length;
  const inProgress = offboardingData.filter(p => p.status === 'In Progress').length;
  const completed = offboardingData.filter(p => p.status === 'Completed').length;
  const delayed = offboardingData.filter(p => p.status === 'Delayed').length;

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Offboarding Management</h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">
              Manage employee offboarding processes and ensure secure exits
            </p>
          </div>
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Start Offboarding
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
                  placeholder="Search offboarding processes..."
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
                  <SelectItem value="Initiated">Initiated</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Delayed">Delayed</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterReason} onValueChange={setFilterReason}>
                <SelectTrigger>
                  <SelectValue placeholder="All Reasons" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reasons</SelectItem>
                  <SelectItem value="Resignation">Resignation</SelectItem>
                  <SelectItem value="Termination">Termination</SelectItem>
                  <SelectItem value="Retirement">Retirement</SelectItem>
                  <SelectItem value="Transfer">Transfer</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Offboarding Processes */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredData.map((process) => (
            <Card key={process.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{process.employeeName}</CardTitle>
                    <p className="text-sm text-gray-600">{process.employeeId} • {process.position}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={getStatusColor(process.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(process.status)}
                        <span>{process.status}</span>
                      </div>
                    </Badge>
                    <Badge className={getReasonColor(process.reason)}>
                      {process.reason}
                    </Badge>
                  </div>
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
                        className="bg-red-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${process.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Task Categories */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Data Backup', count: process.tasks.dataBackup, icon: FileText, color: 'text-blue-600' },
                      { label: 'Equipment', count: process.tasks.equipmentReturn, icon: Laptop, color: 'text-green-600' },
                      { label: 'Access', count: process.tasks.accessRevocation, icon: Shield, color: 'text-red-600' },
                      { label: 'Exit Interview', count: process.tasks.exitInterview, icon: Users, color: 'text-purple-600' }
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
                      <span>Last Working Day: {new Date(process.lastWorkingDay).toLocaleDateString()}</span>
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
                    <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-700">
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
