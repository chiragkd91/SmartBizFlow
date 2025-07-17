/**
 * System Management - Manage system environments and deployments
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { 
  Server, 
  Globe, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Activity,
  Zap,
  Settings,
  Database,
  Shield,
  Search,
  Filter,
  Plus,
  TrendingUp
} from 'lucide-react';

interface SystemEnvironment {
  id: string;
  name: string;
  type: 'Development' | 'Staging' | 'Production' | 'Testing';
  status: 'Active' | 'Maintenance' | 'Inactive';
  currentVersion: string;
  lastDeployment: string;
  uptime: number;
  healthScore: number;
  services: number;
  resources: {
    cpu: number;
    memory: number;
    storage: number;
  };
}

interface Deployment {
  id: string;
  systemName: string;
  version: string;
  environment: string;
  type: 'New Deployment' | 'Update' | 'Rollback' | 'Hotfix';
  status: 'Planned' | 'In Progress' | 'Deployed' | 'Failed' | 'Rolled Back';
  scheduledTime: string;
  deployedBy: string;
  approvalStatus: 'Pending' | 'Approved' | 'Rejected';
}

const mockEnvironments: SystemEnvironment[] = [
  {
    id: '1',
    name: 'Production ERP',
    type: 'Production',
    status: 'Active',
    currentVersion: 'v2.1.3',
    lastDeployment: '2024-01-15T10:30:00Z',
    uptime: 99.9,
    healthScore: 98,
    services: 12,
    resources: {
      cpu: 65,
      memory: 72,
      storage: 58
    }
  },
  {
    id: '2',
    name: 'Staging CRM',
    type: 'Staging',
    status: 'Active',
    currentVersion: 'v1.8.2',
    lastDeployment: '2024-01-20T14:15:00Z',
    uptime: 98.5,
    healthScore: 95,
    services: 8,
    resources: {
      cpu: 45,
      memory: 55,
      storage: 40
    }
  },
  {
    id: '3',
    name: 'Development Portal',
    type: 'Development',
    status: 'Maintenance',
    currentVersion: 'v2.2.0-beta',
    lastDeployment: '2024-01-22T09:00:00Z',
    uptime: 95.2,
    healthScore: 87,
    services: 6,
    resources: {
      cpu: 30,
      memory: 38,
      storage: 25
    }
  }
];

const mockDeployments: Deployment[] = [
  {
    id: '1',
    systemName: 'HR Management System',
    version: 'v2.1.4',
    environment: 'Production',
    type: 'Update',
    status: 'Planned',
    scheduledTime: '2024-01-25T18:00:00Z',
    deployedBy: 'DevOps Team',
    approvalStatus: 'Approved'
  },
  {
    id: '2',
    systemName: 'CRM Portal',
    version: 'v1.9.0',
    environment: 'Staging',
    type: 'New Deployment',
    status: 'In Progress',
    scheduledTime: '2024-01-23T16:00:00Z',
    deployedBy: 'IT Team',
    approvalStatus: 'Approved'
  },
  {
    id: '3',
    systemName: 'Asset Management',
    version: 'v1.2.1',
    environment: 'Production',
    type: 'Hotfix',
    status: 'Deployed',
    scheduledTime: '2024-01-22T12:00:00Z',
    deployedBy: 'DevOps Team',
    approvalStatus: 'Approved'
  }
];

export default function SystemManagement() {
  const [environments, setEnvironments] = useState<SystemEnvironment[]>(mockEnvironments);
  const [deployments, setDeployments] = useState<Deployment[]>(mockDeployments);
  const [activeTab, setActiveTab] = useState<'environments' | 'deployments'>('environments');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': case 'Deployed': case 'Approved': return 'bg-green-100 text-green-800';
      case 'Maintenance': case 'In Progress': case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': case 'Failed': case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Planned': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Production': return 'bg-red-100 text-red-800';
      case 'Staging': return 'bg-yellow-100 text-yellow-800';
      case 'Development': return 'bg-blue-100 text-blue-800';
      case 'Testing': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  const totalEnvironments = environments.length;
  const activeEnvironments = environments.filter(e => e.status === 'Active').length;
  const totalDeployments = deployments.length;
  const pendingDeployments = deployments.filter(d => d.status === 'Planned').length;

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">System Management</h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">
              Manage system environments and deployment workflows
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Deployment
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Environments', value: totalEnvironments, icon: Server, color: 'text-blue-600', bg: 'bg-blue-50' },
            { title: 'Active Systems', value: activeEnvironments, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
            { title: 'Deployments', value: totalDeployments, icon: Zap, color: 'text-purple-600', bg: 'bg-purple-50' },
            { title: 'Pending', value: pendingDeployments, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' }
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

        {/* Tab Navigation */}
        <div className="flex gap-1 border-b border-gray-200 bg-white rounded-t-lg">
          <button
            onClick={() => setActiveTab('environments')}
            className={`px-4 py-3 font-medium text-sm transition-colors ${
              activeTab === 'environments'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Environments ({environments.length})
          </button>
          <button
            onClick={() => setActiveTab('deployments')}
            className={`px-4 py-3 font-medium text-sm transition-colors ${
              activeTab === 'deployments'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Deployments ({deployments.length})
          </button>
        </div>

        {/* Filters */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {activeTab === 'environments' ? (
                    <>
                      <SelectItem value="Production">Production</SelectItem>
                      <SelectItem value="Staging">Staging</SelectItem>
                      <SelectItem value="Development">Development</SelectItem>
                      <SelectItem value="Testing">Testing</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="New Deployment">New Deployment</SelectItem>
                      <SelectItem value="Update">Update</SelectItem>
                      <SelectItem value="Rollback">Rollback</SelectItem>
                      <SelectItem value="Hotfix">Hotfix</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {activeTab === 'environments' ? (
                    <>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="Planned">Planned</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Deployed">Deployed</SelectItem>
                      <SelectItem value="Failed">Failed</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        {activeTab === 'environments' ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {environments.map((env) => (
              <Card key={env.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{env.name}</CardTitle>
                      <p className="text-sm text-gray-600">Version {env.currentVersion}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge className={getTypeColor(env.type)}>
                        {env.type}
                      </Badge>
                      <Badge className={getStatusColor(env.status)}>
                        {env.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Health Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{env.uptime}%</p>
                        <p className="text-xs text-gray-600">Uptime</p>
                      </div>
                      <div className="text-center">
                        <p className={`text-2xl font-bold ${getHealthColor(env.healthScore)}`}>
                          {env.healthScore}
                        </p>
                        <p className="text-xs text-gray-600">Health Score</p>
                      </div>
                    </div>

                    {/* Resource Usage */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>CPU</span>
                        <span>{env.resources.cpu}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${env.resources.cpu}%` }}
                        />
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>Memory</span>
                        <span>{env.resources.memory}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${env.resources.memory}%` }}
                        />
                      </div>
                    </div>

                    {/* Services */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Database className="h-4 w-4 text-blue-600" />
                        <span>Services: {env.services}</span>
                      </div>
                      <span className="text-gray-500">
                        Last Deploy: {new Date(env.lastDeployment).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        Monitor
                      </Button>
                      <Button size="sm" className="flex-1">
                        Manage
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Deployment Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deployments.map((deployment) => (
                  <div key={deployment.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{deployment.systemName}</h3>
                        <p className="text-sm text-gray-600">
                          {deployment.version} → {deployment.environment}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(deployment.status)}>
                          {deployment.status}
                        </Badge>
                        <Badge className={getStatusColor(deployment.approvalStatus)}>
                          {deployment.approvalStatus}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-purple-600" />
                        <span>Type: {deployment.type}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span>Scheduled: {new Date(deployment.scheduledTime).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span>By: {deployment.deployedBy}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2 mt-3">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      {deployment.status === 'Planned' && (
                        <Button size="sm">
                          Deploy Now
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
