/**
 * IT Asset Maintenance Management - Schedule and track maintenance activities
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '../../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { 
  Wrench, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  User,
  DollarSign,
  FileText
} from 'lucide-react';

interface MaintenanceRecord {
  id: string;
  assetTag: string;
  assetName: string;
  maintenanceType: string;
  priority: string;
  status: string;
  scheduledDate: string;
  completedDate?: string;
  assignedTo: string;
  cost: number;
  description: string;
  notes?: string;
}

const mockMaintenanceData: MaintenanceRecord[] = [
  {
    id: '1',
    assetTag: 'SRV-001',
    assetName: 'HP ProLiant DL380',
    maintenanceType: 'Preventive',
    priority: 'High',
    status: 'In Progress',
    scheduledDate: '2024-12-06',
    assignedTo: 'IT Support Team',
    cost: 15000,
    description: 'Monthly server maintenance and OS updates'
  },
  {
    id: '2',
    assetTag: 'PR-001',
    assetName: 'Canon imageRUNNER',
    maintenanceType: 'Corrective',
    priority: 'Medium',
    status: 'Scheduled',
    scheduledDate: '2024-12-08',
    assignedTo: 'External Vendor',
    cost: 8500,
    description: 'Fix paper jam issue and replace toner'
  },
  {
    id: '3',
    assetTag: 'LT-003',
    assetName: 'Dell Latitude 7420',
    maintenanceType: 'Preventive',
    priority: 'Low',
    status: 'Completed',
    scheduledDate: '2024-12-01',
    completedDate: '2024-12-01',
    assignedTo: 'Rajesh Kumar',
    cost: 2500,
    description: 'Quarterly laptop maintenance and software updates',
    notes: 'Cleaned fans, updated drivers, installed security patches'
  },
  {
    id: '4',
    assetTag: 'NET-001',
    assetName: 'Cisco Catalyst 2960',
    maintenanceType: 'Emergency',
    priority: 'Critical',
    status: 'Overdue',
    scheduledDate: '2024-12-04',
    assignedTo: 'Network Team',
    cost: 25000,
    description: 'Network switch replacement due to hardware failure'
  }
];

const statusColors = {
  'Scheduled': 'bg-blue-100 text-blue-800',
  'In Progress': 'bg-yellow-100 text-yellow-800',
  'Completed': 'bg-green-100 text-green-800',
  'Overdue': 'bg-red-100 text-red-800',
  'Cancelled': 'bg-gray-100 text-gray-800'
};

const priorityColors = {
  'Low': 'bg-green-100 text-green-800',
  'Medium': 'bg-yellow-100 text-yellow-800',
  'High': 'bg-orange-100 text-orange-800',
  'Critical': 'bg-red-100 text-red-800'
};

export default function MaintenanceManagement() {
  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>(mockMaintenanceData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<MaintenanceRecord | null>(null);
  const [formData, setFormData] = useState<Partial<MaintenanceRecord>>({});

  const filteredRecords = maintenanceRecords.filter(record => {
    const matchesSearch = record.assetTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || record.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || record.priority === selectedPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getMaintenanceStats = () => {
    const total = maintenanceRecords.length;
    const completed = maintenanceRecords.filter(r => r.status === 'Completed').length;
    const inProgress = maintenanceRecords.filter(r => r.status === 'In Progress').length;
    const overdue = maintenanceRecords.filter(r => r.status === 'Overdue').length;
    const totalCost = maintenanceRecords.reduce((sum, r) => sum + r.cost, 0);
    
    return { total, completed, inProgress, overdue, totalCost };
  };

  const stats = getMaintenanceStats();

  const handleAddMaintenance = () => {
    if (!formData.assetTag || !formData.maintenanceType) return;
    
    const newRecord: MaintenanceRecord = {
      id: (maintenanceRecords.length + 1).toString(),
      assetTag: formData.assetTag || '',
      assetName: formData.assetName || '',
      maintenanceType: formData.maintenanceType || '',
      priority: formData.priority || 'Medium',
      status: formData.status || 'Scheduled',
      scheduledDate: formData.scheduledDate || new Date().toISOString().split('T')[0],
      assignedTo: formData.assignedTo || '',
      cost: formData.cost || 0,
      description: formData.description || ''
    };
    
    setMaintenanceRecords([...maintenanceRecords, newRecord]);
    setFormData({});
    setIsAddDialogOpen(false);
  };

  const handleEditRecord = (record: MaintenanceRecord) => {
    setEditingRecord(record);
    setFormData(record);
  };

  const handleUpdateRecord = () => {
    if (!editingRecord || !formData.assetTag) return;
    
    const updatedRecords = maintenanceRecords.map(record =>
      record.id === editingRecord.id ? { ...record, ...formData } : record
    );
    
    setMaintenanceRecords(updatedRecords);
    setEditingRecord(null);
    setFormData({});
  };

  const handleDeleteRecord = (id: string) => {
    setMaintenanceRecords(maintenanceRecords.filter(record => record.id !== id));
  };

  const MaintenanceForm = ({ isEditing = false }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="assetTag">Asset Tag *</Label>
        <Input
          id="assetTag"
          value={formData.assetTag || ''}
          onChange={(e) => setFormData({ ...formData, assetTag: e.target.value })}
          placeholder="SRV-001, LT-001"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="assetName">Asset Name *</Label>
        <Input
          id="assetName"
          value={formData.assetName || ''}
          onChange={(e) => setFormData({ ...formData, assetName: e.target.value })}
          placeholder="HP ProLiant DL380"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="maintenanceType">Maintenance Type *</Label>
        <Select value={formData.maintenanceType || ''} onValueChange={(value) => setFormData({ ...formData, maintenanceType: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Preventive">Preventive</SelectItem>
            <SelectItem value="Corrective">Corrective</SelectItem>
            <SelectItem value="Emergency">Emergency</SelectItem>
            <SelectItem value="Upgrade">Upgrade</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="priority">Priority</Label>
        <Select value={formData.priority || 'Medium'} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Critical">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status || 'Scheduled'} onValueChange={(value) => setFormData({ ...formData, status: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Scheduled">Scheduled</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="scheduledDate">Scheduled Date</Label>
        <Input
          id="scheduledDate"
          type="date"
          value={formData.scheduledDate || ''}
          onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="assignedTo">Assigned To</Label>
        <Input
          id="assignedTo"
          value={formData.assignedTo || ''}
          onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
          placeholder="IT Support Team, External Vendor"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="cost">Estimated Cost (₹)</Label>
        <Input
          id="cost"
          type="number"
          value={formData.cost || ''}
          onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) || 0 })}
          placeholder="15000"
        />
      </div>
      
      <div className="md:col-span-2 space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe the maintenance work to be performed"
          rows={3}
        />
      </div>
      
      {isEditing && (
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={formData.notes || ''}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Additional notes or completion details"
            rows={2}
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Maintenance Management</h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">
              Schedule and track IT asset maintenance activities
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Schedule Maintenance
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Schedule New Maintenance</DialogTitle>
                <DialogDescription>
                  Create a new maintenance schedule for an IT asset
                </DialogDescription>
              </DialogHeader>
              <MaintenanceForm />
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddMaintenance}>Schedule Maintenance</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { title: 'Total Records', value: stats.total, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
            { title: 'Completed', value: stats.completed, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
            { title: 'In Progress', value: stats.inProgress, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
            { title: 'Overdue', value: stats.overdue, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
            { title: 'Total Cost', value: `₹${(stats.totalCost / 1000).toFixed(0)}K`, icon: DollarSign, color: 'text-purple-600', bg: 'bg-purple-50' }
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
                  placeholder="Search maintenance records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="All Priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Records Table */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Maintenance Records ({filteredRecords.length})</span>
              <Badge variant="outline">{filteredRecords.length} of {maintenanceRecords.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium text-gray-900">Asset</th>
                    <th className="text-left p-3 font-medium text-gray-900">Type</th>
                    <th className="text-left p-3 font-medium text-gray-900">Priority</th>
                    <th className="text-left p-3 font-medium text-gray-900">Status</th>
                    <th className="text-left p-3 font-medium text-gray-900">Scheduled Date</th>
                    <th className="text-left p-3 font-medium text-gray-900">Assigned To</th>
                    <th className="text-left p-3 font-medium text-gray-900">Cost</th>
                    <th className="text-left p-3 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record) => (
                    <tr key={record.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div>
                          <p className="font-medium text-gray-900">{record.assetName}</p>
                          <p className="text-xs text-gray-500">{record.assetTag}</p>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge variant="outline">{record.maintenanceType}</Badge>
                      </td>
                      <td className="p-3">
                        <Badge className={priorityColors[record.priority as keyof typeof priorityColors]}>
                          {record.priority}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge className={statusColors[record.status as keyof typeof statusColors]}>
                          {record.status}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-900">{new Date(record.scheduledDate).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-900">{record.assignedTo}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-900">₹{record.cost.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditRecord(record)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteRecord(record.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={!!editingRecord} onOpenChange={() => setEditingRecord(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Maintenance Record</DialogTitle>
              <DialogDescription>
                Update the maintenance information and add completion notes
              </DialogDescription>
            </DialogHeader>
            <MaintenanceForm isEditing={true} />
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingRecord(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateRecord}>Update Record</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
