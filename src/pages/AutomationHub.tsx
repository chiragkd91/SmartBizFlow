/**
 * Automation Hub page with workflow management and automation rules
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { formatRelativeTime } from '../lib/utils';
import { 
  Bot, 
  Zap, 
  Clock, 
  CheckCircle,
  Search, 
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Plus,
  Play,
  Pause,
  Settings,
  Mail,
  Bell,
  FileText,
  Users,
  Calendar,
  Target
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Textarea } from '../components/ui/textarea';

const mockAutomationRules = [
  {
    id: 'AUTO-001',
    name: 'Lead Follow-up Email',
    type: 'Email',
    trigger: 'New Lead Created',
    condition: 'Lead Score > 70',
    action: 'Send welcome email sequence',
    status: 'Active',
    createdAt: '2024-01-10T00:00:00Z',
    lastRun: '2024-01-15T14:30:00Z',
    runCount: 45,
    successRate: 98.5,
    icon: Mail,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    id: 'AUTO-002',
    name: 'Low Stock Alert',
    type: 'Notification',
    trigger: 'Inventory Level Check',
    condition: 'Stock < Minimum Level',
    action: 'Send alert to inventory manager',
    status: 'Active',
    createdAt: '2024-01-08T00:00:00Z',
    lastRun: '2024-01-15T08:00:00Z',
    runCount: 12,
    successRate: 100,
    icon: Bell,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  {
    id: 'AUTO-003',
    name: 'Invoice Overdue Reminder',
    type: 'Email',
    trigger: 'Daily Schedule',
    condition: 'Invoice Past Due > 7 days',
    action: 'Send overdue payment reminder',
    status: 'Active',
    createdAt: '2024-01-05T00:00:00Z',
    lastRun: '2024-01-15T09:00:00Z',
    runCount: 28,
    successRate: 95.2,
    icon: FileText,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    id: 'AUTO-004',
    name: 'Lead Assignment',
    type: 'Assignment',
    trigger: 'New Lead Created',
    condition: 'Lead Source = Website',
    action: 'Auto-assign to sales rep',
    status: 'Paused',
    createdAt: '2024-01-12T00:00:00Z',
    lastRun: '2024-01-14T16:45:00Z',
    runCount: 23,
    successRate: 100,
    icon: Users,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    id: 'AUTO-005',
    name: 'Weekly Sales Report',
    type: 'Report',
    trigger: 'Weekly Schedule',
    condition: 'Every Monday 9 AM',
    action: 'Generate and email sales report',
    status: 'Active',
    createdAt: '2024-01-01T00:00:00Z',
    lastRun: '2024-01-15T09:00:00Z',
    runCount: 8,
    successRate: 100,
    icon: Target,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
];

export default function AutomationHub() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredRules = mockAutomationRules.filter(rule => {
    const matchesSearch = rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rule.trigger.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || rule.type.toLowerCase() === filterType;
    const matchesStatus = filterStatus === 'all' || rule.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Paused': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Email': return 'bg-blue-100 text-blue-800';
      case 'Notification': return 'bg-red-100 text-red-800';
      case 'Assignment': return 'bg-green-100 text-green-800';
      case 'Report': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalRules = filteredRules.length;
  const activeRules = filteredRules.filter(rule => rule.status === 'Active').length;
  const totalRuns = filteredRules.reduce((sum, rule) => sum + rule.runCount, 0);
  const avgSuccessRate = filteredRules.reduce((sum, rule) => sum + rule.successRate, 0) / filteredRules.length;

  const kpiCards = [
    {
      title: 'Total Rules',
      value: totalRules.toString(),
      icon: Bot,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Active Rules',
      value: activeRules.toString(),
      icon: Zap,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Runs',
      value: totalRuns.toString(),
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Success Rate',
      value: `${avgSuccessRate.toFixed(1)}%`,
      icon: CheckCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-white min-h-screen">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Automation Hub</h1>
          <p className="text-gray-600">Manage automated workflows and business rules</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Rule
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create Automation Rule</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="ruleName">Rule Name</Label>
                <Input id="ruleName" placeholder="Enter rule name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ruleType">Type</Label>
                  <select id="ruleType" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select type</option>
                    <option value="email">Email</option>
                    <option value="notification">Notification</option>
                    <option value="assignment">Assignment</option>
                    <option value="report">Report</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="trigger">Trigger</Label>
                  <select id="trigger" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select trigger</option>
                    <option value="new-lead">New Lead Created</option>
                    <option value="low-stock">Low Stock Alert</option>
                    <option value="schedule">Scheduled Time</option>
                    <option value="invoice-overdue">Invoice Overdue</option>
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="condition">Condition</Label>
                <Input id="condition" placeholder="Enter condition (e.g., Lead Score > 70)" />
              </div>
              <div>
                <Label htmlFor="action">Action</Label>
                <Textarea id="action" placeholder="Describe the action to be taken..." />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  Create Rule
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAutomationRules.slice(0, 3).map((rule) => {
          const Icon = rule.icon;
          return (
            <Card key={rule.id} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-full ${rule.bgColor}`}>
                    <Icon className={`h-5 w-5 ${rule.color}`} />
                  </div>
                  <Badge className={getStatusColor(rule.status)}>
                    {rule.status}
                  </Badge>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">{rule.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{rule.action}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{rule.runCount} runs</span>
                  <span>{rule.successRate}% success</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Automation Rules Table */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle>Automation Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search automation rules..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="email">Email</option>
                <option value="notification">Notification</option>
                <option value="assignment">Assignment</option>
                <option value="report">Report</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rule Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Trigger</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Runs</TableHead>
                  <TableHead>Success Rate</TableHead>
                  <TableHead>Last Run</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${rule.bgColor}`}>
                          <rule.icon className={`h-4 w-4 ${rule.color}`} />
                        </div>
                        <div>
                          <p className="font-medium">{rule.name}</p>
                          <p className="text-sm text-gray-500">{rule.action}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(rule.type)}>
                        {rule.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {rule.trigger}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(rule.status)}>
                        {rule.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {rule.runCount}
                    </TableCell>
                    <TableCell>
                      <span className={`font-medium ${rule.successRate >= 95 ? 'text-green-600' : rule.successRate >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {rule.successRate}%
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {formatRelativeTime(rule.lastRun)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          title={rule.status === 'Active' ? 'Pause' : 'Resume'}
                        >
                          {rule.status === 'Active' ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
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
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Rule
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings className="mr-2 h-4 w-4" />
                              Configure
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
  );
}
