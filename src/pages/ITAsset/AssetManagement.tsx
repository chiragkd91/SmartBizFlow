/**
 * IT Asset Management - CRUD operations for all IT assets
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Label } from '../../components/ui/label';
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
import { Textarea } from '../../components/ui/textarea';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Monitor, 
  Laptop, 
  Server, 
  Smartphone,
  Printer,
  Wifi,
  QrCode,
  Calendar,
  DollarSign,
  User,
  MapPin,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface Asset {
  id: string;
  assetTag: string;
  name: string;
  category: string;
  brand: string;
  model: string;
  serialNumber: string;
  status: string;
  assignedTo?: string;
  location: string;
  purchaseDate: string;
  purchasePrice: number;
  warranty: string;
  description: string;
}

const mockAssets: Asset[] = [
  {
    id: '1',
    assetTag: 'LT-001',
    name: 'MacBook Pro 16"',
    category: 'Laptop',
    brand: 'Apple',
    model: 'MacBook Pro',
    serialNumber: 'MBP2023001',
    status: 'Active',
    assignedTo: 'Rajesh Kumar',
    location: 'Mumbai Office',
    purchaseDate: '2023-01-15',
    purchasePrice: 180000,
    warranty: '2025-01-15',
    description: 'High-performance laptop for development team'
  },
  {
    id: '2',
    assetTag: 'DT-001',
    name: 'Dell OptiPlex 7090',
    category: 'Desktop',
    brand: 'Dell',
    model: 'OptiPlex 7090',
    serialNumber: 'DLL2023001',
    status: 'Active',
    assignedTo: 'Priya Sharma',
    location: 'Delhi Office',
    purchaseDate: '2023-02-20',
    purchasePrice: 85000,
    warranty: '2026-02-20',
    description: 'Business desktop for HR department'
  },
  {
    id: '3',
    assetTag: 'SRV-001',
    name: 'HP ProLiant DL380',
    category: 'Server',
    brand: 'HP',
    model: 'ProLiant DL380',
    serialNumber: 'HPE2023001',
    status: 'Active',
    assignedTo: 'IT Department',
    location: 'Data Center',
    purchaseDate: '2023-03-10',
    purchasePrice: 350000,
    warranty: '2028-03-10',
    description: 'Main application server'
  },
  {
    id: '4',
    assetTag: 'PR-001',
    name: 'Canon imageRUNNER',
    category: 'Printer',
    brand: 'Canon',
    model: 'imageRUNNER ADVANCE',
    serialNumber: 'CAN2023001',
    status: 'Under Maintenance',
    location: 'Bangalore Office',
    purchaseDate: '2023-04-05',
    purchasePrice: 125000,
    warranty: '2025-04-05',
    description: 'Multi-function printer for office use'
  },
  {
    id: '5',
    assetTag: 'MB-001',
    name: 'iPhone 14 Pro',
    category: 'Mobile',
    brand: 'Apple',
    model: 'iPhone 14 Pro',
    serialNumber: 'IPH2023001',
    status: 'Active',
    assignedTo: 'Amit Patel',
    location: 'Chennai Office',
    purchaseDate: '2023-05-12',
    purchasePrice: 95000,
    warranty: '2024-05-12',
    description: 'Company mobile device'
  }
];

const categoryIcons = {
  'Laptop': Laptop,
  'Desktop': Monitor,
  'Server': Server,
  'Mobile': Smartphone,
  'Printer': Printer,
  'Network': Wifi
};

const statusColors = {
  'Active': 'bg-green-100 text-green-800',
  'Under Maintenance': 'bg-yellow-100 text-yellow-800',
  'Retired': 'bg-gray-100 text-gray-800',
  'Lost/Stolen': 'bg-red-100 text-red-800'
};

export default function AssetManagement() {
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [formData, setFormData] = useState<Partial<Asset>>({});

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.assetTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || asset.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddAsset = () => {
    if (!formData.name || !formData.category) return;
    
    const newAsset: Asset = {
      id: (assets.length + 1).toString(),
      assetTag: formData.assetTag || `AST-${String(assets.length + 1).padStart(3, '0')}`,
      name: formData.name || '',
      category: formData.category || '',
      brand: formData.brand || '',
      model: formData.model || '',
      serialNumber: formData.serialNumber || '',
      status: formData.status || 'Active',
      assignedTo: formData.assignedTo,
      location: formData.location || '',
      purchaseDate: formData.purchaseDate || new Date().toISOString().split('T')[0],
      purchasePrice: formData.purchasePrice || 0,
      warranty: formData.warranty || '',
      description: formData.description || ''
    };
    
    setAssets([...assets, newAsset]);
    setFormData({});
    setIsAddDialogOpen(false);
  };

  const handleEditAsset = (asset: Asset) => {
    setEditingAsset(asset);
    setFormData(asset);
  };

  const handleUpdateAsset = () => {
    if (!editingAsset || !formData.name) return;
    
    const updatedAssets = assets.map(asset =>
      asset.id === editingAsset.id ? { ...asset, ...formData } : asset
    );
    
    setAssets(updatedAssets);
    setEditingAsset(null);
    setFormData({});
  };

  const handleDeleteAsset = (id: string) => {
    setAssets(assets.filter(asset => asset.id !== id));
  };

  const AssetForm = ({ isEditing = false }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="assetTag">Asset Tag</Label>
        <Input
          id="assetTag"
          value={formData.assetTag || ''}
          onChange={(e) => setFormData({ ...formData, assetTag: e.target.value })}
          placeholder="AST-001"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="name">Asset Name *</Label>
        <Input
          id="name"
          value={formData.name || ''}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="MacBook Pro 16"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="category">Category *</Label>
        <Select value={formData.category || ''} onValueChange={(value) => setFormData({ ...formData, category: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Laptop">Laptop</SelectItem>
            <SelectItem value="Desktop">Desktop</SelectItem>
            <SelectItem value="Server">Server</SelectItem>
            <SelectItem value="Mobile">Mobile</SelectItem>
            <SelectItem value="Printer">Printer</SelectItem>
            <SelectItem value="Network">Network Equipment</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="brand">Brand</Label>
        <Input
          id="brand"
          value={formData.brand || ''}
          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
          placeholder="Apple, Dell, HP"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="model">Model</Label>
        <Input
          id="model"
          value={formData.model || ''}
          onChange={(e) => setFormData({ ...formData, model: e.target.value })}
          placeholder="MacBook Pro, OptiPlex"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="serialNumber">Serial Number</Label>
        <Input
          id="serialNumber"
          value={formData.serialNumber || ''}
          onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
          placeholder="Unique serial number"
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
            <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
            <SelectItem value="Retired">Retired</SelectItem>
            <SelectItem value="Lost/Stolen">Lost/Stolen</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="assignedTo">Assigned To</Label>
        <Input
          id="assignedTo"
          value={formData.assignedTo || ''}
          onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
          placeholder="Employee name"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={formData.location || ''}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="Mumbai Office, Data Center"
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
        <Label htmlFor="purchasePrice">Purchase Price (₹)</Label>
        <Input
          id="purchasePrice"
          type="number"
          value={formData.purchasePrice || ''}
          onChange={(e) => setFormData({ ...formData, purchasePrice: parseFloat(e.target.value) || 0 })}
          placeholder="100000"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="warranty">Warranty Expiry</Label>
        <Input
          id="warranty"
          type="date"
          value={formData.warranty || ''}
          onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
        />
      </div>
      
      <div className="md:col-span-2 space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Asset description and notes"
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
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Asset Management</h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">
              Manage and track all IT assets across your organization
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Asset
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Asset</DialogTitle>
                <DialogDescription>
                  Enter the details for the new IT asset
                </DialogDescription>
              </DialogHeader>
              <AssetForm />
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddAsset}>Add Asset</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search assets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Laptop">Laptop</SelectItem>
                  <SelectItem value="Desktop">Desktop</SelectItem>
                  <SelectItem value="Server">Server</SelectItem>
                  <SelectItem value="Mobile">Mobile</SelectItem>
                  <SelectItem value="Printer">Printer</SelectItem>
                  <SelectItem value="Network">Network</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
                  <SelectItem value="Retired">Retired</SelectItem>
                  <SelectItem value="Lost/Stolen">Lost/Stolen</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Assets Table */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Assets ({filteredAssets.length})</span>
              <Badge variant="outline">{filteredAssets.length} of {assets.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium text-gray-900">Asset</th>
                    <th className="text-left p-3 font-medium text-gray-900">Category</th>
                    <th className="text-left p-3 font-medium text-gray-900">Status</th>
                    <th className="text-left p-3 font-medium text-gray-900">Assigned To</th>
                    <th className="text-left p-3 font-medium text-gray-900">Location</th>
                    <th className="text-left p-3 font-medium text-gray-900">Value</th>
                    <th className="text-left p-3 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssets.map((asset) => {
                    const CategoryIcon = categoryIcons[asset.category as keyof typeof categoryIcons] || Monitor;
                    return (
                      <tr key={asset.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <CategoryIcon className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{asset.name}</p>
                              <p className="text-xs text-gray-500">{asset.assetTag}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline">{asset.category}</Badge>
                        </td>
                        <td className="p-3">
                          <Badge className={statusColors[asset.status as keyof typeof statusColors]}>
                            {asset.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-900">{asset.assignedTo || 'Unassigned'}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-900">{asset.location}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-900">₹{asset.purchasePrice.toLocaleString()}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditAsset(asset)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteAsset(asset.id)}
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
        <Dialog open={!!editingAsset} onOpenChange={() => setEditingAsset(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Asset</DialogTitle>
              <DialogDescription>
                Update the asset information
              </DialogDescription>
            </DialogHeader>
            <AssetForm isEditing={true} />
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingAsset(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateAsset}>Update Asset</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
