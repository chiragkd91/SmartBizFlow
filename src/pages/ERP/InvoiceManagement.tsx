/**
 * Invoice Management page with comprehensive billing and payment tracking
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { formatCurrency, formatRelativeTime } from '../../lib/utils';
import { 
  Receipt, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle,
  Search, 
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Mail,
  Calendar,
  Clock,
  Building
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

const mockInvoices = [
  {
    id: 'INV-2024-001',
    customerName: 'TechNova Solutions',
    customerEmail: 'billing@technova.com',
    amount: 15750,
    taxAmount: 1260,
    totalAmount: 17010,
    status: 'Paid',
    dueDate: '2024-01-30T00:00:00Z',
    issueDate: '2024-01-15T00:00:00Z',
    paidDate: '2024-01-28T14:30:00Z',
    paymentMethod: 'Bank Transfer',
    items: [
      { description: 'Enterprise Security Suite License', quantity: 5, rate: 2500, total: 12500 },
      { description: 'Implementation Services', quantity: 1, rate: 3250, total: 3250 }
    ],
    notes: 'Annual license renewal with implementation support',
    terms: 'Net 30',
    avatar: 'https://pub-cdn.sider.ai/u/U0Y3HGVYKOY/web-coder/68696f720dd11641ee25c3cd/resource/0de1a3ec-e9ad-4727-9e27-a7a00a130e18.jpg',
  },
  {
    id: 'INV-2024-002',
    customerName: 'CyberSecure Corp',
    customerEmail: 'accounts@cybersecure.com',
    amount: 28500,
    taxAmount: 2280,
    totalAmount: 30780,
    status: 'Overdue',
    dueDate: '2024-01-20T00:00:00Z',
    issueDate: '2024-01-05T00:00:00Z',
    paidDate: null,
    paymentMethod: null,
    items: [
      { description: 'Cloud Infrastructure Setup', quantity: 1, rate: 15000, total: 15000 },
      { description: 'Security Audit Services', quantity: 1, rate: 8500, total: 8500 },
      { description: 'Training Sessions', quantity: 10, rate: 500, total: 5000 }
    ],
    notes: 'Comprehensive security infrastructure upgrade',
    terms: 'Net 15',
    avatar: 'https://pub-cdn.sider.ai/u/U0Y3HGVYKOY/web-coder/68696f720dd11641ee25c3cd/resource/78e2e761-555c-4dca-8346-8113cc56dbb6.jpg',
  },
  {
    id: 'INV-2024-003',
    customerName: 'DataFlow Industries',
    customerEmail: 'finance@dataflow.com',
    amount: 12200,
    taxAmount: 976,
    totalAmount: 13176,
    status: 'Sent',
    dueDate: '2024-02-15T00:00:00Z',
    issueDate: '2024-01-16T00:00:00Z',
    paidDate: null,
    paymentMethod: null,
    items: [
      { description: 'Data Analytics Platform', quantity: 1, rate: 8000, total: 8000 },
      { description: 'Consulting Hours', quantity: 21, rate: 200, total: 4200 }
    ],
    notes: 'Custom analytics solution implementation',
    terms: 'Net 30',
    avatar: 'https://pub-cdn.sider.ai/u/U0Y3HGVYKOY/web-coder/68696f720dd11641ee25c3cd/resource/79652622-a74e-4081-a2c3-b18df97dff38.jpg',
  },
  {
    id: 'INV-2024-004',
    customerName: 'SmartCloud Enterprises',
    customerEmail: 'billing@smartcloud.com',
    amount: 22750,
    taxAmount: 1820,
    totalAmount: 24570,
    status: 'Draft',
    dueDate: '2024-02-20T00:00:00Z',
    issueDate: '2024-01-17T00:00:00Z',
    paidDate: null,
    paymentMethod: null,
    items: [
      { description: 'Cloud Migration Services', quantity: 1, rate: 18000, total: 18000 },
      { description: 'Support Package (6 months)', quantity: 1, rate: 4750, total: 4750 }
    ],
    notes: 'Enterprise cloud migration with extended support',
    terms: 'Net 45',
    avatar: 'https://pub-cdn.sider.ai/u/U0Y3HGVYKOY/web-coder/68696f720dd11641ee25c3cd/resource/3f0a2f5e-d94f-43d4-8722-dbd830eab030.jpg',
  },
];

const paymentHistory = [
  {
    id: '1',
    invoiceId: 'INV-2024-001',
    amount: 17010,
    paymentDate: '2024-01-28T14:30:00Z',
    method: 'Bank Transfer',
    reference: 'TXN-789456123',
    customer: 'TechNova Solutions',
  },
  {
    id: '2',
    invoiceId: 'INV-2023-245',
    amount: 8950,
    paymentDate: '2024-01-25T10:15:00Z',
    method: 'Credit Card',
    reference: 'CC-456789012',
    customer: 'GlobalTech Ltd',
  },
  {
    id: '3',
    invoiceId: 'INV-2023-238',
    amount: 15600,
    paymentDate: '2024-01-22T16:45:00Z',
    method: 'Wire Transfer',
    reference: 'WIRE-123456789',
    customer: 'Innovation Corp',
  },
];

export default function InvoiceManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<typeof mockInvoices[0] | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || invoice.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Sent': return 'bg-blue-100 text-blue-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysOverdue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = today.getTime() - due.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const totalInvoices = filteredInvoices.length;
  const totalAmount = filteredInvoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0);
  const paidAmount = filteredInvoices.filter(inv => inv.status === 'Paid').reduce((sum, invoice) => sum + invoice.totalAmount, 0);
  const overdueAmount = filteredInvoices.filter(inv => inv.status === 'Overdue').reduce((sum, invoice) => sum + invoice.totalAmount, 0);

  const kpiCards = [
    {
      title: 'Total Invoices',
      value: totalInvoices.toString(),
      icon: Receipt,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Amount',
      value: formatCurrency(totalAmount),
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Paid Amount',
      value: formatCurrency(paidAmount),
      icon: CheckCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Overdue Amount',
      value: formatCurrency(overdueAmount),
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  const viewInvoiceDetails = (invoice: typeof mockInvoices[0]) => {
    setSelectedInvoice(invoice);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6 bg-white min-h-screen">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoice Management</h1>
          <p className="text-gray-600">Manage billing, payments, and financial tracking</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Create New Invoice</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[600px] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customer">Customer</Label>
                  <select id="customer" className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="">Select customer</option>
                    <option value="technova">TechNova Solutions</option>
                    <option value="cybersecure">CyberSecure Corp</option>
                    <option value="dataflow">DataFlow Industries</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" type="date" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="terms">Payment Terms</Label>
                  <select id="terms" className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="">Select terms</option>
                    <option value="net-15">Net 15</option>
                    <option value="net-30">Net 30</option>
                    <option value="net-45">Net 45</option>
                    <option value="net-60">Net 60</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <select id="currency" className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                    <option value="gbp">GBP</option>
                  </select>
                </div>
              </div>
              
              {/* Invoice Items */}
              <div className="space-y-4">
                <Label>Invoice Items</Label>
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-4 gap-2 text-sm font-medium text-gray-600">
                    <span>Description</span>
                    <span>Quantity</span>
                    <span>Rate</span>
                    <span>Total</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <Input placeholder="Service/Product description" />
                    <Input type="number" placeholder="1" />
                    <Input type="number" placeholder="0.00" />
                    <Input type="number" placeholder="0.00" disabled />
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input id="taxRate" type="number" placeholder="8.0" />
                </div>
                <div>
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input id="discount" type="number" placeholder="0.0" />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Invoice notes or terms..." />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Save as Draft
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>
                  Create & Send
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

      {/* Recent Payments */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentHistory.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">{payment.invoiceId}</p>
                    <p className="text-sm text-gray-600">{payment.customer}</p>
                    <p className="text-xs text-gray-500">{payment.method} - {payment.reference}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">{formatCurrency(payment.amount)}</p>
                  <p className="text-sm text-gray-500">
                    {formatRelativeTime(payment.paymentDate)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Invoice Management */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle>Invoice Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="sent">Sent</option>
                <option value="overdue">Overdue</option>
                <option value="draft">Draft</option>
              </select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={invoice.avatar}
                          alt={invoice.customerName}
                          className="h-8 w-8 rounded object-cover"
                        />
                        <div>
                          <p className="font-medium">{invoice.id}</p>
                          <p className="text-sm text-gray-500">{invoice.terms}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{invoice.customerName}</p>
                        <p className="text-sm text-gray-500">{invoice.customerEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{formatCurrency(invoice.totalAmount)}</p>
                        <p className="text-sm text-gray-500">Tax: {formatCurrency(invoice.taxAmount)}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge className={getStatusColor(invoice.status)}>
                          {invoice.status}
                        </Badge>
                        {invoice.status === 'Overdue' && (
                          <p className="text-xs text-red-600">
                            {getDaysOverdue(invoice.dueDate)} days overdue
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {new Date(invoice.issueDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => viewInvoiceDetails(invoice)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Invoice
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Reminder
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
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

      {/* Invoice Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Invoice Details - {selectedInvoice?.id}</DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-6 max-h-[600px] overflow-y-auto">
              {/* Invoice Header */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900">Bill To:</h3>
                  <p className="text-lg font-medium">{selectedInvoice.customerName}</p>
                  <p className="text-gray-600">{selectedInvoice.customerEmail}</p>
                </div>
                <div className="text-right">
                  <h3 className="font-medium text-gray-900">Invoice Details:</h3>
                  <p><span className="text-gray-600">Issue Date:</span> {new Date(selectedInvoice.issueDate).toLocaleDateString()}</p>
                  <p><span className="text-gray-600">Due Date:</span> {new Date(selectedInvoice.dueDate).toLocaleDateString()}</p>
                  <p><span className="text-gray-600">Terms:</span> {selectedInvoice.terms}</p>
                </div>
              </div>

              {/* Invoice Items */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Items:</h3>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Rate</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedInvoice.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.description}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{formatCurrency(item.rate)}</TableCell>
                          <TableCell>{formatCurrency(item.total)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Invoice Totals */}
              <div className="border-t pt-4">
                <div className="flex justify-end">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>{formatCurrency(selectedInvoice.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>{formatCurrency(selectedInvoice.taxAmount)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total:</span>
                      <span>{formatCurrency(selectedInvoice.totalAmount)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status and Payment Info */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900">Status:</h3>
                  <Badge className={getStatusColor(selectedInvoice.status)}>
                    {selectedInvoice.status}
                  </Badge>
                  {selectedInvoice.paidDate && (
                    <p className="text-sm text-gray-600 mt-1">
                      Paid on {new Date(selectedInvoice.paidDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                {selectedInvoice.paymentMethod && (
                  <div>
                    <h3 className="font-medium text-gray-900">Payment Method:</h3>
                    <p className="text-gray-600">{selectedInvoice.paymentMethod}</p>
                  </div>
                )}
              </div>

              {/* Notes */}
              {selectedInvoice.notes && (
                <div>
                  <h3 className="font-medium text-gray-900">Notes:</h3>
                  <p className="text-gray-600">{selectedInvoice.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
