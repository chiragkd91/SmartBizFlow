/**
 * Vendor Management page with supplier relationship management
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { formatCurrency, formatRelativeTime } from '../../lib/utils';
import { 
  Truck, 
  DollarSign, 
  TrendingUp, 
  Clock,
  Search, 
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Plus,
  Building,
  Phone,
  Mail,
  MapPin,
  Star,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import { Textarea } from '../../components/ui/textarea';

const mockVendors = [
  {
    id: '1',
    name: 'TechSupply Solutions',
    contactPerson: 'Robert Johnson',
    email: 'robert@techsupply.com',
    phone: '+1 (555) 123-4567',
    address: '123 Technology Drive, San Francisco, CA 94105',
    category: 'Technology',
    status: 'Active',
    rating: 4.8,
    totalOrders: 145,
    totalValue: 485000,
    lastOrder: '2024-01-15T10:30:00Z',
    paymentTerms: 'Net 30',
    deliveryTime: '3-5 days',
    avatar: 'https://pub-cdn.sider.ai/u/U0Y3HGVYKOY/web-coder/68696f720dd11641ee25c3cd/resource/1089a251-4860-467a-87fa-506e508bfc0d.jpg',
    products: ['Laptops', 'Software Licenses', 'Network Equipment'],
    performance: 98,
    onTimeDelivery: 96,
  },
  {
    id: '2',
    name: 'SecureCloud Infrastructure',
    contactPerson: 'Maria Rodriguez',
    email: 'maria@securecloud.com',
    phone: '+1 (555) 234-5678',
    address: '456 Cloud Avenue, Seattle, WA 98101',
    category: 'Cloud Services',
    status: 'Active',
    rating: 4.9,
    totalOrders: 89,
    totalValue: 725000,
    lastOrder: '2024-01-14T14:20:00Z',
    paymentTerms: 'Net 15',
    deliveryTime: '1-2 days',
    avatar: 'https://pub-cdn.sider.ai/u/U0Y3HGVYKOY/web-coder/68696f720dd11641ee25c3cd/resource/3d6f64c9-4edb-403d-9fc2-1bdd3d83a61f.jpg',
    products: ['Cloud Storage', 'Security Services', 'Backup Solutions'],
    performance: 99,
    onTimeDelivery: 98,
  },
  {
    id: '3',
    name: 'CyberGuard Systems',
    contactPerson: 'David Chen',
    email: 'david@cyberguard.com',
    phone: '+1 (555) 345-6789',
    address: '789 Security Boulevard, Austin, TX 78701',
    category: 'Cybersecurity',
    status: 'Active',
    rating: 4.7,
    totalOrders: 67,
    totalValue: 325000,
    lastOrder: '2024-01-13T09:15:00Z',
    paymentTerms: 'Net 45',
    deliveryTime: '2-4 days',
    avatar: 'https://pub-cdn.sider.ai/u/U0Y3HGVYKOY/web-coder/68696f720dd11641ee25c3cd/resource/2b2dfa8f-59bf-49a3-9843-5a577b0ba1ac.jpg',
    products: ['Firewalls', 'Security Software', 'Consulting Services'],
    performance: 94,
    onTimeDelivery: 92,
  },
  {
    id: '4',
    name: 'Office Plus Supplies',
    contactPerson: 'Jennifer Wilson',
    email: 'jennifer@officeplus.com',
    phone: '+1 (555) 456-7890',
    address: '321 Business Park, Chicago, IL 60601',
    category: 'Office Supplies',
    status: 'Pending Review',
    rating: 4.2,
    totalOrders: 203,
    totalValue: 125000,
    lastOrder: '2024-01-10T16:45:00Z',
    paymentTerms: 'Net 30',
    deliveryTime: '5-7 days',
    avatar: 'https://pub-cdn.sider.ai/u/U0Y3HGVYKOY/web-coder/68696f720dd11641ee25c3cd/resource/7ff897b0-0150-4cfa-9949-407f36f97bcb.jpg',
    products: ['Office Furniture', 'Stationery', 'Equipment'],
    performance: 87,
    onTimeDelivery: 85,
  },
];

const recentOrders = [
  {
    id: 'PO-001',
    vendor: 'TechSupply Solutions',
    amount: 15500,
    status: 'Delivered',
    orderDate: '2024-01-15T10:30:00Z',
    deliveryDate: '2024-01-18T14:00:00Z',
    items: 8,
  },
  {
    id: 'PO-002',
    vendor: 'SecureCloud Infrastructure',
    amount: 25000,
    status: 'In Transit',
    orderDate: '2024-01-14T14:20:00Z',
    deliveryDate: '2024-01-19T09:00:00Z',
    items: 3,
  },
  {
    id: 'PO-003',
    vendor: 'CyberGuard Systems',
    amount: 8750,
    status: 'Processing',
    orderDate: '2024-01-13T09:15:00Z',
    deliveryDate: '2024-01-20T16:00:00Z',
    items: 5,
  },
];

export default function VendorManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredVendors = mockVendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || vendor.category.toLowerCase() === filterCategory;
    const matchesStatus = filterStatus === 'all' || vendor.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending Review': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const totalVendors = filteredVendors.length;
  const activeVendors = filteredVendors.filter(vendor => vendor.status === 'Active').length;
  const totalSpend = filteredVendors.reduce((sum, vendor) => sum + vendor.totalValue, 0);
  const avgRating = filteredVendors.reduce((sum, vendor) => sum + vendor.rating, 0) / filteredVendors.length;

  const kpiCards = [
    {
      title: 'Total Vendors',
      value: totalVendors.toString(),
      icon: Truck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Active Vendors',
      value: activeVendors.toString(),
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Spend',
      value: formatCurrency(totalSpend),
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Avg Rating',
      value: avgRating.toFixed(1),
      icon: Star,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-white min-h-screen">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vendor Management</h1>
          <p className="text-gray-600">Manage supplier relationships and procurement</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Vendor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Vendor</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[600px] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="vendorName">Company Name</Label>
                  <Input id="vendorName" placeholder="Enter company name" />
                </div>
                <div>
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input id="contactPerson" placeholder="Contact person name" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="vendor@company.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+1 (555) 123-4567" />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" placeholder="Complete business address..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select id="category" className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="">Select category</option>
                    <option value="technology">Technology</option>
                    <option value="cloud-services">Cloud Services</option>
                    <option value="cybersecurity">Cybersecurity</option>
                    <option value="office-supplies">Office Supplies</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="paymentTerms">Payment Terms</Label>
                  <select id="paymentTerms" className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="">Select terms</option>
                    <option value="net-15">Net 15</option>
                    <option value="net-30">Net 30</option>
                    <option value="net-45">Net 45</option>
                    <option value="net-60">Net 60</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="deliveryTime">Delivery Time</Label>
                  <Input id="deliveryTime" placeholder="e.g., 3-5 days" />
                </div>
                <div>
                  <Label htmlFor="products">Products/Services</Label>
                  <Input id="products" placeholder="Comma separated list" />
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  Add Vendor
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

      {/* Recent Orders */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle>Recent Purchase Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Truck className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.vendor}</p>
                    <p className="text-xs text-gray-500">{order.items} items</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(order.amount)}</p>
                  <Badge className={getOrderStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatRelativeTime(order.orderDate)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Vendor Directory */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle>Vendor Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Categories</option>
                <option value="technology">Technology</option>
                <option value="cloud services">Cloud Services</option>
                <option value="cybersecurity">Cybersecurity</option>
                <option value="office supplies">Office Supplies</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending review">Pending Review</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={vendor.avatar}
                          alt={vendor.name}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium">{vendor.name}</p>
                          <p className="text-sm text-gray-500">{vendor.contactPerson}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div className="flex items-center space-x-1">
                          <Mail className="h-3 w-3 text-gray-400" />
                          <span>{vendor.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="h-3 w-3 text-gray-400" />
                          <span>{vendor.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{vendor.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        {getRatingStars(vendor.rating)}
                        <span className="text-sm text-gray-600 ml-1">({vendor.rating})</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{vendor.totalOrders}</TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(vendor.totalValue)}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(vendor.status)}>
                        {vendor.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
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
                            Edit Vendor
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Building className="mr-2 h-4 w-4" />
                            Create Order
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
