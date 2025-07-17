/**
 * Software License Management - Track and manage software licenses and subscriptions
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
  Key, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Users,
  DollarSign,
  Download,
  Clock,
  Shield
} from 'lucide-react';

interface SoftwareLicense {
  id: string;
  softwareName: string;
  vendor: string;
  licenseType: string;
  licenseKey?: string;
  totalLicenses: number;
  usedLicenses: number;
  purchaseDate: string;
  expiryDate: string;
  cost: number;
  renewalCost?: number;
  status: string;
  assignedUsers: string[];
  description: string;
  notes?: string;
}

const mockLicenseData: SoftwareLicense[] = [
  {
    id: '1',
    softwareName: 'Microsoft Office 365',
    vendor: 'Microsoft',
    licenseType: 'Subscription',
    licenseKey: 'XXXXX-XXXXX-XXXXX-XXXXX',
    totalLicenses: 50,
    usedLicenses: 42,
    purchaseDate: '2024-01-01',
    expiryDate: '2024-12-31',
    cost: 250000,
    renewalCost: 275000,
    status: 'Active',
    assignedUsers: ['Rajesh Kumar', 'Priya Sharma', 'Amit Patel'],
    description: 'Office productivity suite with email and collaboration tools'
  },
  {
    id: '2',
    softwareName: 'Adobe Creative Suite',
    vendor: 'Adobe',
    licenseType: 'Subscription',
    licenseKey: 'YYYYY-YYYYY-YYYYY-YYYYY',
    totalLicenses: 10,
    usedLicenses: 8,
    purchaseDate: '2024-02-15',
    expiryDate: '2025-02-14',
    cost: 180000,
    renewalCost: 195000,
    status: 'Active',
    assignedUsers: ['Design Team'],
    description: 'Creative software suite for design and multimedia'
  },
  {
    id: '3',
    softwareName: 'Windows Server 2022',
    vendor: 'Microsoft',
    licenseType: 'Perpetual',
    licenseKey: 'ZZZZZ-ZZZZZ-ZZZZZ-ZZZZZ',
    totalLicenses: 2,
    usedLicenses: 2,
    purchaseDate: '2023-06-10',
    expiryDate: '2028-06-10',
    cost: 125000,
    status: 'Active',
    assignedUsers: ['Server Infrastructure'],
    description: 'Server operating system for data center'
  },
  {
    id: '4',
    softwareName: 'Antivirus Enterprise',
    vendor: 'Symantec',
    licenseType: 'Subscription',
    licenseKey: 'AAAAA-AAAAA-AAAAA-AAAAA',
    totalLicenses: 100,
    usedLicenses: 95,
    purchaseDate: '2024-03-01',
    expiryDate: '2024-12-15',
    cost: 85000,
    renewalCost: 92000,
    status: 'Expiring Soon',
    assignedUsers: ['All Employees'],
    description: 'Enterprise antivirus and security solution'
  },
  {
    id: '5',
    softwareName: 'AutoCAD 2024',
    vendor: 'Autodesk',
    licenseType: 'Subscription',
    licenseKey: 'BBBBB-BBBBB-BBBBB-BBBBB',
    totalLicenses: 5,
    usedLicenses: 3,
    purchaseDate: '2024-04-01',
    expiryDate: '2023-11-30',
    cost: 95000,
    status: 'Expired',
    assignedUsers: ['Engineering Team'],
    description: 'Computer-aided design software for engineering'
  }
];

const statusColors = {
  'Active': 'bg-green-100 text-green-800',
  'Expiring Soon': 'bg-yellow-100 text-yellow-800',
  'Expired': 'bg-red-100 text-red-800',
  'Suspended': 'bg-gray-100 text-gray-800'
};

const licenseTypeColors = {
  'Subscription': 'bg-blue-100 text-blue-800',
  'Perpetual': 'bg-purple-100 text-purple-800',
  'Trial': 'bg-orange-100 text-orange-800',
  'Open Source': 'bg-green-100 text-green-800'
};

export default function SoftwareLicenses() {
  const [licenses, setLicenses] = useState<SoftwareLicense[]>(mockLicenseData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingLicense, setEditingLicense] = useState<SoftwareLicense | null>(null);
  const [formData, setFormData] = useState<Partial<SoftwareLicense>>({});

  const filteredLicenses = licenses.filter(license => {
    const matchesSearch = license.softwareName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         license.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || license.status === selectedStatus;
    const matchesType = selectedType === 'all' || license.licenseType === selectedType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getLicenseStats = () => {
    const total = licenses.length;
    const active = licenses.filter(l => l.status === 'Active').length;
    const expiringSoon = licenses.filter(l => l.status === 'Expiring Soon').length;
    const expired = licenses.filter(l => l.status === 'Expired').length;
    const totalCost = licenses.reduce((sum, l) => sum + l.cost, 0);
    const totalUsage = licenses.reduce((sum, l) => sum + l.usedLicenses, 0);
    const totalAvailable = licenses.reduce((sum, l) => sum + l.totalLicenses, 0);
    
    return { total, active, expiringSoon, expired, totalCost, totalUsage, totalAvailable };
  };

  const stats = getLicenseStats();

  const handleAddLicense = () => {
    if (!formData.softwareName || !formData.vendor) return;
    
    const newLicense: SoftwareLicense = {
      id: (licenses.length + 1).toString(),
      softwareName: formData.softwareName || '',
      vendor: formData.vendor || '',
      licenseType: formData.licenseType || 'Subscription',
      licenseKey: formData.licenseKey,
      totalLicenses: formData.totalLicenses || 1,
      usedLicenses: formData.usedLicenses || 0,
      purchaseDate: formData.purchaseDate || new Date().toISOString().split('T')[0],
      expiryDate: formData.expiryDate || '',
      cost: formData.cost || 0,
      renewalCost: formData.renewalCost,
      status: formData.status || 'Active',
      assignedUsers: formData.assignedUsers || [],
      description: formData.description || ''
    };
    
    setLicenses([...licenses, newLicense]);
    setFormData({});
    setIsAddDialogOpen(false);
  };

  const handleEditLicense = (license: SoftwareLicense) => {
    setEditingLicense(license);
    setFormData(license);
  };

  const handleUpdateLicense = () => {
    if (!editingLicense || !formData.softwareName) return;
    
    const updatedLicenses = licenses.map(license =>
      license.id === editingLicense.id ? { ...license, ...formData } : license
    );
    
    setLicenses(updatedLicenses);
    setEditingLicense(null);
    setFormData({});
  };

  const handleDeleteLicense = (id: string) => {
    setLicenses(licenses.filter(license => license.id !== id));
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUtilizationPercentage = (used: number, total: number) => {
    return Math.round((used / total) * 100);
  };

  const LicenseForm = ({ isEditing = false }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="softwareName">Software Name *</Label>
        <Input
          id="softwareName"
          value={formData.softwareName || ''}
          onChange={(e) => setFormData({ ...formData, softwareName: e.target.value })}
          placeholder="Microsoft Office 365"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="vendor">Vendor *</Label>
        <Input
          id="vendor"
          value={formData.vendor || ''}
          onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
          placeholder="Microsoft, Adobe, Oracle"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="licenseType">License Type</Label>
        <Select value={formData.licenseType || 'Subscription'} onValueChange={(value) => setFormData({ ...formData, licenseType: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Subscription">Subscription</SelectItem>
            <SelectItem value="Perpetual">Perpetual</SelectItem>
            <SelectItem value="Trial">Trial</SelectItem>
            <SelectItem value="Open Source">Open Source</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="licenseKey">License Key</Label>
        <Input
          id="licenseKey"
          value={formData.licenseKey || ''}
          onChange={(e) => setFormData({ ...formData, licenseKey: e.target.value })}
          placeholder="XXXXX-XXXXX-XXXXX-XXXXX"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="totalLicenses">Total Licenses</Label>
        <Input
          id="totalLicenses"
          type="number"
          value={formData.totalLicenses || ''}
          onChange={(e) => setFormData({ ...formData, totalLicenses: parseInt(e.target.value) || 0 })}
          placeholder="10"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="usedLicenses">Used Licenses</Label>
        <Input
          id="usedLicenses"
          type="number"
          value={formData.usedLicenses || ''}
          onChange={(e) => setFormData({ ...formData, usedLicenses: parseInt(e.target.value) || 0 })}
          placeholder="8"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="purchaseDate">Purchase Date</Label>
        <Input
          id="purchaseDate"
          type="date"
          value={formData.purchaseDate || ''}
          onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="expiryDate">Expiry Date</Label>
        <Input
          id="expiryDate"
          type="date"
          value={formData.expiryDate || ''}
          onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="cost">Purchase Cost (₹)</Label>
        <Input
          id="cost"
          type="number"
          value={formData.cost || ''}
          onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) || 0 })}
          placeholder="250000"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="renewalCost">Renewal Cost (₹)</Label>
        <Input
          id="renewalCost"
          type="number"
          value={formData.renewalCost || ''}
          onChange={(e) => setFormData({ ...formData, renewalCost: parseFloat(e.target.value) || 0 })}
          placeholder="275000"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status || 'Active'} onValueChange={(value) => setFormData({ ...formData, status: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Expiring Soon">Expiring Soon</SelectItem>
            <SelectItem value="Expired">Expired</SelectItem>
            <SelectItem value="Suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="md:col-span-2 space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Software description and usage details"
          rows={3}
        />
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Software Licenses</h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">
              Manage software licenses and track compliance
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add License
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Software License</DialogTitle>
                <DialogDescription>
                  Enter the details for the new software license
                </DialogDescription>
              </DialogHeader>
              <LicenseForm />
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddLicense}>Add License</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {[
            { title: 'Total Licenses', value: stats.total, icon: Key, color: 'text-blue-600', bg: 'bg-blue-50' },
            { title: 'Active', value: stats.active, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
            { title: 'Expiring Soon', value: stats.expiringSoon, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
            { title: 'Expired', value: stats.expired, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
            { title: 'Total Cost', value: `₹${(stats.totalCost / 100000).toFixed(1)}L`, icon: DollarSign, color: 'text-purple-600', bg: 'bg-purple-50' },
            { title: 'Utilization', value: `${Math.round((stats.totalUsage / stats.totalAvailable) * 100)}%`, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' }
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className={`${stat.bg} border-0 shadow-sm`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg lg:text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-xs lg:text-sm text-gray-600">{stat.title}</p>
                    </div>
                    <Icon className={`h-6 w-6 lg:h-8 lg:w-8 ${stat.color}`} />
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
                  placeholder="Search software licenses..."
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
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Expiring Soon">Expiring Soon</SelectItem>
                  <SelectItem value="Expired">Expired</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Subscription">Subscription</SelectItem>
                  <SelectItem value="Perpetual">Perpetual</SelectItem>
                  <SelectItem value="Trial">Trial</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Licenses Table */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Software Licenses ({filteredLicenses.length})</span>
              <Badge variant="outline">{filteredLicenses.length} of {licenses.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium text-gray-900">Software</th>
                    <th className="text-left p-3 font-medium text-gray-900">Type</th>
                    <th className="text-left p-3 font-medium text-gray-900">License Usage</th>
                    <th className="text-left p-3 font-medium text-gray-900">Status</th>
                    <th className="text-left p-3 font-medium text-gray-900">Expiry</th>
                    <th className="text-left p-3 font-medium text-gray-900">Cost</th>
                    <th className="text-left p-3 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLicenses.map((license) => {
                    const daysUntilExpiry = getDaysUntilExpiry(license.expiryDate);
                    const utilizationPercent = getUtilizationPercentage(license.usedLicenses, license.totalLicenses);
                    
                    return (
                      <tr key={license.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div>
                            <p className="font-medium text-gray-900">{license.softwareName}</p>
                            <p className="text-xs text-gray-500">{license.vendor}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className={licenseTypeColors[license.licenseType as keyof typeof licenseTypeColors]}>
                            {license.licenseType}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>{license.usedLicenses}/{license.totalLicenses}</span>
                              <span className="text-gray-500">{utilizationPercent}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  utilizationPercent >= 90 ? 'bg-red-500' : 
                                  utilizationPercent >= 75 ? 'bg-yellow-500' : 
                                  'bg-green-500'
                                }`}
                                style={{ width: `${utilizationPercent}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className={statusColors[license.status as keyof typeof statusColors]}>
                            {license.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div>
                            <p className="text-gray-900">{new Date(license.expiryDate).toLocaleDateString()}</p>
                            {daysUntilExpiry > 0 && daysUntilExpiry <= 30 && (
                              <p className="text-xs text-orange-600">{daysUntilExpiry} days left</p>
                            )}
                            {daysUntilExpiry <= 0 && (
                              <p className="text-xs text-red-600">Expired</p>
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-900">₹{license.cost.toLocaleString()}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditLicense(license)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteLicense(license.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={!!editingLicense} onOpenChange={() => setEditingLicense(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Software License</DialogTitle>
              <DialogDescription>
                Update the software license information
              </DialogDescription>
            </DialogHeader>
            <LicenseForm isEditing={true} />
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingLicense(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateLicense}>Update License</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
