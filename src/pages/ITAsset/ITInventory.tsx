/**
 * IT Inventory Management - Complete inventory tracking and management
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { 
  Database, 
  Package, 
  AlertTriangle, 
  TrendingDown, 
  Search,
  Filter,
  Download,
  Upload,
  BarChart3,
  Monitor,
  Laptop,
  Server,
  Smartphone,
  Printer,
  Wifi
} from 'lucide-react';

interface InventoryItem {
  id: string;
  category: string;
  itemName: string;
  brand: string;
  model: string;
  totalStock: number;
  availableStock: number;
  allocatedStock: number;
  minimumStock: number;
  unitPrice: number;
  totalValue: number;
  location: string;
  lastUpdated: string;
}

const mockInventoryData: InventoryItem[] = [
  {
    id: '1',
    category: 'Laptop',
    itemName: 'MacBook Pro 16"',
    brand: 'Apple',
    model: 'M2 Pro',
    totalStock: 25,
    availableStock: 8,
    allocatedStock: 17,
    minimumStock: 5,
    unitPrice: 180000,
    totalValue: 4500000,
    location: 'Mumbai Warehouse',
    lastUpdated: '2024-12-06'
  },
  {
    id: '2',
    category: 'Desktop',
    itemName: 'Dell OptiPlex',
    brand: 'Dell',
    model: '7090',
    totalStock: 15,
    availableStock: 3,
    allocatedStock: 12,
    minimumStock: 3,
    unitPrice: 85000,
    totalValue: 1275000,
    location: 'Delhi Warehouse',
    lastUpdated: '2024-12-05'
  },
  {
    id: '3',
    category: 'Server',
    itemName: 'HP ProLiant',
    brand: 'HP',
    model: 'DL380 Gen10',
    totalStock: 4,
    availableStock: 1,
    allocatedStock: 3,
    minimumStock: 2,
    unitPrice: 350000,
    totalValue: 1400000,
    location: 'Data Center',
    lastUpdated: '2024-12-04'
  },
  {
    id: '4',
    category: 'Mobile',
    itemName: 'iPhone 14 Pro',
    brand: 'Apple',
    model: '256GB',
    totalStock: 20,
    availableStock: 12,
    allocatedStock: 8,
    minimumStock: 5,
    unitPrice: 95000,
    totalValue: 1900000,
    location: 'Mumbai Warehouse',
    lastUpdated: '2024-12-06'
  },
  {
    id: '5',
    category: 'Printer',
    itemName: 'Canon imageRUNNER',
    brand: 'Canon',
    model: 'ADVANCE 4535i',
    totalStock: 8,
    availableStock: 2,
    allocatedStock: 6,
    minimumStock: 2,
    unitPrice: 125000,
    totalValue: 1000000,
    location: 'Bangalore Warehouse',
    lastUpdated: '2024-12-03'
  },
  {
    id: '6',
    category: 'Network',
    itemName: 'Cisco Catalyst',
    brand: 'Cisco',
    model: '2960-X',
    totalStock: 12,
    availableStock: 4,
    allocatedStock: 8,
    minimumStock: 3,
    unitPrice: 75000,
    totalValue: 900000,
    location: 'Chennai Warehouse',
    lastUpdated: '2024-12-02'
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

export default function ITInventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventoryData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || item.location === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const getInventoryStats = () => {
    const totalValue = inventory.reduce((sum, item) => sum + item.totalValue, 0);
    const totalItems = inventory.reduce((sum, item) => sum + item.totalStock, 0);
    const availableItems = inventory.reduce((sum, item) => sum + item.availableStock, 0);
    const lowStockItems = inventory.filter(item => item.availableStock <= item.minimumStock).length;
    const categories = [...new Set(inventory.map(item => item.category))].length;
    const locations = [...new Set(inventory.map(item => item.location))].length;
    
    return { totalValue, totalItems, availableItems, lowStockItems, categories, locations };
  };

  const stats = getInventoryStats();

  const getStockStatus = (available: number, minimum: number) => {
    if (available === 0) return { status: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    if (available <= minimum) return { status: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
    return { status: 'In Stock', color: 'bg-green-100 text-green-800' };
  };

  const getUtilizationPercentage = (allocated: number, total: number) => {
    return Math.round((allocated / total) * 100);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">IT Inventory</h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">
              Track and manage IT asset inventory across all locations
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="text-green-600 border-green-300 hover:bg-green-50">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" className="text-blue-600 border-blue-300 hover:bg-blue-50">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {[
            { title: 'Total Value', value: `₹${(stats.totalValue / 10000000).toFixed(1)}Cr`, icon: Database, color: 'text-blue-600', bg: 'bg-blue-50' },
            { title: 'Total Items', value: stats.totalItems, icon: Package, color: 'text-green-600', bg: 'bg-green-50' },
            { title: 'Available', value: stats.availableItems, icon: BarChart3, color: 'text-purple-600', bg: 'bg-purple-50' },
            { title: 'Low Stock', value: stats.lowStockItems, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
            { title: 'Categories', value: stats.categories, icon: Monitor, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { title: 'Locations', value: stats.locations, icon: TrendingDown, color: 'text-orange-600', bg: 'bg-orange-50' }
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

        {/* Low Stock Alerts */}
        {stats.lowStockItems > 0 && (
          <Card className="bg-red-50 border-red-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <div>
                  <h3 className="font-medium text-red-900">Low Stock Alert</h3>
                  <p className="text-sm text-red-700">
                    {stats.lowStockItems} item(s) are running low on stock. Consider reordering soon.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search inventory..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="Laptop">Laptop</option>
                <option value="Desktop">Desktop</option>
                <option value="Server">Server</option>
                <option value="Mobile">Mobile</option>
                <option value="Printer">Printer</option>
                <option value="Network">Network</option>
              </select>
              
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Locations</option>
                <option value="Mumbai Warehouse">Mumbai Warehouse</option>
                <option value="Delhi Warehouse">Delhi Warehouse</option>
                <option value="Bangalore Warehouse">Bangalore Warehouse</option>
                <option value="Chennai Warehouse">Chennai Warehouse</option>
                <option value="Data Center">Data Center</option>
              </select>
              
              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Table */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Inventory Items ({filteredInventory.length})</span>
              <Badge variant="outline">{filteredInventory.length} of {inventory.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium text-gray-900">Item</th>
                    <th className="text-left p-3 font-medium text-gray-900">Stock Status</th>
                    <th className="text-left p-3 font-medium text-gray-900">Available/Total</th>
                    <th className="text-left p-3 font-medium text-gray-900">Utilization</th>
                    <th className="text-left p-3 font-medium text-gray-900">Unit Price</th>
                    <th className="text-left p-3 font-medium text-gray-900">Total Value</th>
                    <th className="text-left p-3 font-medium text-gray-900">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.map((item) => {
                    const CategoryIcon = categoryIcons[item.category as keyof typeof categoryIcons] || Monitor;
                    const stockStatus = getStockStatus(item.availableStock, item.minimumStock);
                    const utilizationPercent = getUtilizationPercentage(item.allocatedStock, item.totalStock);
                    
                    return (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <CategoryIcon className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{item.itemName}</p>
                              <p className="text-xs text-gray-500">{item.brand} {item.model}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className={stockStatus.color}>
                            {stockStatus.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="text-center">
                            <p className="font-medium text-gray-900">{item.availableStock}/{item.totalStock}</p>
                            <p className="text-xs text-gray-500">Min: {item.minimumStock}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>{item.allocatedStock} allocated</span>
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
                          <span className="text-gray-900">₹{item.unitPrice.toLocaleString()}</span>
                        </td>
                        <td className="p-3">
                          <span className="text-gray-900">₹{item.totalValue.toLocaleString()}</span>
                        </td>
                        <td className="p-3">
                          <span className="text-gray-900">{item.location}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Category Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(
                  inventory.reduce((acc, item) => {
                    if (!acc[item.category]) {
                      acc[item.category] = { total: 0, value: 0, available: 0 };
                    }
                    acc[item.category].total += item.totalStock;
                    acc[item.category].value += item.totalValue;
                    acc[item.category].available += item.availableStock;
                    return acc;
                  }, {} as Record<string, { total: number; value: number; available: number }>)
                ).map(([category, data]) => {
                  const Icon = categoryIcons[category as keyof typeof categoryIcons] || Monitor;
                  return (
                    <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">{category}</p>
                          <p className="text-sm text-gray-600">{data.available}/{data.total} available</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">₹{(data.value / 100000).toFixed(1)}L</p>
                        <p className="text-sm text-gray-600">{Math.round((data.available / data.total) * 100)}% available</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Location Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(
                  inventory.reduce((acc, item) => {
                    if (!acc[item.location]) {
                      acc[item.location] = { items: 0, value: 0 };
                    }
                    acc[item.location].items += item.totalStock;
                    acc[item.location].value += item.totalValue;
                    return acc;
                  }, {} as Record<string, { items: number; value: number }>)
                ).map(([location, data]) => (
                  <div key={location} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{location}</p>
                      <p className="text-sm text-gray-600">{data.items} items</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">₹{(data.value / 100000).toFixed(1)}L</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
