/**
 * Access Management - Manage system access requests and permissions
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { 
  Shield, 
  Key, 
  Users, 
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  Search,
  Filter,
  Plus,
  Eye,
  Check,
  X
} from 'lucide-react';

interface AccessRequest {
  id: string;
  requesterName: string;
  requesterId: string;
  requestType: 'New Access' | 'Modify Access' | 'Remove Access' | 'Software Access';
  targetSystem: string;
  accessLevel: string;
  businessJustification: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Implemented';
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  requestDate: string;
  approver?: string;
  approvalDate?: string;
  implementationDate?: string;
}

const mockAccessRequests: AccessRequest[] = [
  {
    id: '1',
    requesterName: 'Rajesh Kumar',
    requesterId: 'GCI001',
    requestType: 'New Access',
    targetSystem: 'HR Management System',
    accessLevel: 'Admin',
    businessJustification: 'Promoted to HR Manager, need admin access for employee management',
    status: 'Pending',
    urgency: 'High',
    requestDate: '2024-01-22'
  },
  {
    id: '2',
    requesterName: 'Priya Sharma',
    requesterId: 'GCI002',
    requestType: 'Software Access',
    targetSystem: 'Adobe Creative Suite',
    accessLevel: 'Full License',
    businessJustification: 'Need design software for marketing campaigns',
    status: 'Approved',
    urgency: 'Medium',
    requestDate: '2024-01-20',
    approver: 'IT Manager',
    approvalDate: '2024-01-21'
  },
  {
    id: '3',
    requesterName: 'Amit Patel',
    requesterId: 'GCI003',
    requestType: 'Modify Access',
    targetSystem: 'Financial Database',
    accessLevel: 'Read-Only',
    businessJustification: 'Role change from Finance Manager to Marketing Specialist',
    status: 'Implemented',
    urgency: 'Low',
    requestDate: '2024-01-18',
    approver: 'Security Team',
    approvalDate: '2024-01-19',
    implementationDate: '2024-01-20'
  },
  {
    id: '4',
    requesterName: 'Sneha Reddy',
    requesterId: 'GCI004',
    requestType: 'Remove Access',
    targetSystem: 'Development Environment',
    accessLevel: 'Full Access',
    businessJustification: 'Employee leaving the company',
    status: 'Rejected',
    urgency: 'Critical',
    requestDate: '2024-01-15',
    approver: 'DevOps Team',
    approvalDate: '2024-01-16'
  }
];

export default function AccessManagement() {
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>(mockAccessRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterUrgency, setFilterUrgency] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const filteredRequests = accessRequests.filter(request => {
    const matchesSearch = request.requesterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.targetSystem.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.requesterId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesUrgency = filterUrgency === 'all' || request.urgency === filterUrgency;
    const matchesType = filterType === 'all' || request.requestType === filterType;
    
    return matchesSearch && matchesStatus && matchesUrgency && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': case 'Implemented': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'New Access': return 'bg-blue-100 text-blue-800';
      case 'Modify Access': return 'bg-purple-100 text-purple-800';
      case 'Remove Access': return 'bg-red-100 text-red-800';
      case 'Software Access': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': case 'Implemented': return <CheckCircle className="h-4 w-4" />;
      case 'Pending': return <Clock className="h-4 w-4" />;
      case 'Rejected': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleApprove = (id: string) => {
    setAccessRequests(prev => prev.map(request => 
      request.id === id 
        ? { ...request, status: 'Approved' as const, approver: 'Current User', approvalDate: new Date().toISOString().split('T')[0] }
        : request
    ));
  };

  const handleReject = (id: string) => {
    setAccessRequests(prev => prev.map(request => 
      request.id === id 
        ? { ...request, status: 'Rejected' as const, approver: 'Current User', approvalDate: new Date().toISOString().split('T')[0] }
        : request
    ));
  };

  const totalRequests = accessRequests.length;
  const pendingRequests = accessRequests.filter(r => r.status === 'Pending').length;
  const approvedRequests = accessRequests.filter(r => r.status === 'Approved').length;
  const criticalRequests = accessRequests.filter(r => r.urgency === 'Critical' && r.status === 'Pending').length;

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Access Management</h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">
              Manage system access requests and user permissions
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Access Request
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Total Requests', value: totalRequests, icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50' },
            { title: 'Pending', value: pendingRequests, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
            { title: 'Approved', value: approvedRequests, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
            { title: 'Critical', value: criticalRequests, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' }
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

        {/* Critical Requests Alert */}
        {criticalRequests > 0 && (
          <Card className="bg-red-50 border-red-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <div>
                  <h3 className="font-medium text-red-900">Critical Access Requests</h3>
                  <p className="text-sm text-red-700">
                    {criticalRequests} critical access request(s) require immediate attention
                  </p>
                </div>
                <Button size="sm" className="bg-red-600 hover:bg-red-700 ml-auto">
                  Review Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search access requests..."
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
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                  <SelectItem value="Implemented">Implemented</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterUrgency} onValueChange={setFilterUrgency}>
                <SelectTrigger>
                  <SelectValue placeholder="All Urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Urgency</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="New Access">New Access</SelectItem>
                  <SelectItem value="Modify Access">Modify Access</SelectItem>
                  <SelectItem value="Remove Access">Remove Access</SelectItem>
                  <SelectItem value="Software Access">Software Access</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                Advanced
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Access Requests */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Access Requests ({filteredRequests.length})</span>
              <Badge variant="outline">{pendingRequests} pending</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-medium text-gray-900">{request.requesterName}</h3>
                        <Badge variant="outline" className="text-xs">{request.requesterId}</Badge>
                        <Badge className={getTypeColor(request.requestType)}>
                          {request.requestType}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>System:</strong> {request.targetSystem} • 
                        <strong> Access Level:</strong> {request.accessLevel}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Justification:</strong> {request.businessJustification}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <Badge className={getStatusColor(request.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(request.status)}
                          <span>{request.status}</span>
                        </div>
                      </Badge>
                      <Badge className={getUrgencyColor(request.urgency)}>
                        {request.urgency}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                    <div>
                      <strong>Request Date:</strong> {new Date(request.requestDate).toLocaleDateString()}
                    </div>
                    {request.approver && (
                      <div>
                        <strong>Approver:</strong> {request.approver}
                      </div>
                    )}
                    {request.implementationDate && (
                      <div>
                        <strong>Implemented:</strong> {new Date(request.implementationDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                    {request.status === 'Pending' && (
                      <>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handleApprove(request.id)}
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-red-600 hover:text-red-700 border-red-300"
                          onClick={() => handleReject(request.id)}
                        >
                          <X className="h-3 w-3 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
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
