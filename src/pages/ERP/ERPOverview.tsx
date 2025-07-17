/**
 * ERP Overview page with enterprise resource planning features
 */

import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { formatCurrency, formatRelativeTime } from '../../lib/utils';
import { 
  Package, 
  ShoppingCart, 
  FileText, 
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Truck,
  Users,
  Plus,
  Eye,
  Edit
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';

const recentOrders = [
  {
    id: 'ORD-001',
    customer: 'Acme Corporation',
    amount: 12500,
    status: 'Processing',
    date: '2024-01-15T10:30:00Z',
    items: 5,
  },
  {
    id: 'ORD-002',
    customer: 'Tech Solutions Inc',
    amount: 8750,
    status: 'Shipped',
    date: '2024-01-14T14:20:00Z',
    items: 3,
  },
  {
    id: 'ORD-003',
    customer: 'Global Industries',
    amount: 25000,
    status: 'Delivered',
    date: '2024-01-13T09:15:00Z',
    items: 12,
  },
];

const lowStockItems = [
  {
    id: 'SKU-001',
    name: 'Laptop Computer',
    category: 'Electronics',
    currentStock: 5,
    minStock: 10,
    supplier: 'Tech Supplier Co',
    lastOrdered: '2024-01-10T00:00:00Z',
  },
  {
    id: 'SKU-002',
    name: 'Office Chair',
    category: 'Furniture',
    currentStock: 3,
    minStock: 8,
    supplier: 'Furniture Plus',
    lastOrdered: '2024-01-08T00:00:00Z',
  },
  {
    id: 'SKU-003',
    name: 'Wireless Mouse',
    category: 'Electronics',
    currentStock: 12,
    minStock: 20,
    supplier: 'Tech Supplier Co',
    lastOrdered: '2024-01-05T00:00:00Z',
  },
];

const pendingInvoices = [
  {
    id: 'INV-001',
    customer: 'Enterprise Corp',
    amount: 15000,
    dueDate: '2024-01-20T00:00:00Z',
    status: 'Overdue',
    daysPastDue: 5,
  },
  {
    id: 'INV-002',
    customer: 'Startup Hub',
    amount: 5500,
    dueDate: '2024-01-25T00:00:00Z',
    status: 'Pending',
    daysPastDue: 0,
  },
  {
    id: 'INV-003',
    customer: 'Modern Solutions',
    amount: 8200,
    dueDate: '2024-01-18T00:00:00Z',
    status: 'Overdue',
    daysPastDue: 2,
  },
];

export default function ERPOverview() {
  const getOrderStatusVariant = (status: string) => {
    switch (status) {
      case 'Processing': return 'secondary';
      case 'Shipped': return 'default';
      case 'Delivered': return 'default';
      case 'Cancelled': return 'destructive';
      default: return 'default';
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInvoiceStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const kpiCards = [
    {
      title: 'Total Products',
      value: '234',
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+5%',
    },
    {
      title: 'Active Orders',
      value: '45',
      icon: ShoppingCart,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+12%',
    },
    {
      title: 'Monthly Revenue',
      value: formatCurrency(125400),
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+8%',
    },
    {
      title: 'Low Stock Items',
      value: '12',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      change: '+3',
    },
    {
      title: 'Pending Invoices',
      value: '18',
      icon: FileText,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '-2',
    },
    {
      title: 'Suppliers',
      value: '56',
      icon: Truck,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      change: '+1',
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-white min-h-screen">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Enterprise Resource Planning</h1>
          <p className="text-gray-600">Manage your business operations and resources</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            View Reports
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Quick Actions
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                    <p className="text-sm text-green-600 mt-1">{card.change} from last month</p>
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

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Orders
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <ShoppingCart className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                      <p className="text-xs text-gray-500">{order.items} items</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(order.amount)}</p>
                    <Badge className={getOrderStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatRelativeTime(order.date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Low Stock Alerts
              <Button variant="outline" size="sm">
                Manage Inventory
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg border-red-200 bg-red-50">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.category}</p>
                      <p className="text-xs text-gray-500">Supplier: {item.supplier}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-600">
                      {item.currentStock} / {item.minStock}
                    </p>
                    <Badge variant="destructive">Low Stock</Badge>
                    <p className="text-xs text-gray-500 mt-1">
                      Last ordered: {formatRelativeTime(item.lastOrdered)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Invoices */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Pending Invoices
            <Button variant="outline" size="sm">
              Manage Invoices
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Days Past Due</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.customer}</TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(invoice.amount)}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge className={getInvoiceStatusColor(invoice.status)}>
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {invoice.daysPastDue > 0 ? (
                        <span className="text-red-600 font-medium">
                          {invoice.daysPastDue} days
                        </span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
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
