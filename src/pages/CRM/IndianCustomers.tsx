/**
 * Indian Customer Management with GST compliance and local features
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { INDIAN_STATES, IndianCustomer } from '../../types/india';
import { formatIndianCurrency, validateGSTIN, validatePAN, validatePincode, validateIndianMobile, validateAadhar } from '../../lib/indianUtils';
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Building2,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  MessageCircle,
  FileText,
  TrendingUp
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

const INDIAN_INDUSTRIES = [
  'Information Technology',
  'Manufacturing',
  'Healthcare',
  'Education',
  'Retail',
  'Financial Services',
  'Real Estate',
  'Automobile',
  'Textiles',
  'Food & Beverages',
  'Pharmaceuticals',
  'Construction',
  'Transportation',
  'Energy',
  'Others'
];

const PAYMENT_TERMS = [
  'Immediate',
  'Net 7',
  'Net 15',
  'Net 30',
  'Net 45',
  'Net 60',
  '2/10 Net 30',
  'Cash on Delivery',
  'Advance Payment'
];

const mockIndianCustomers: IndianCustomer[] = [
  {
    id: '1',
    name: 'Tech Innovations Pvt Ltd',
    email: 'contact@techinnovations.in',
    phone: '+91 98765 43210',
    whatsappNumber: '+91 98765 43210',
    contactPerson: 'Rajesh Kumar',
    industry: 'Information Technology',
    creditLimit: 500000,
    paymentTerms: 'Net 30',
    kycStatus: 'Verified',
    aadharNumber: '1234 5678 9012',
    gstDetails: {
      gstin: '29ABCDE1234F1Z5',
      panNumber: 'ABCDE1234F',
      businessName: 'Tech Innovations Pvt Ltd',
      registrationType: 'Regular',
      stateCode: '29',
      registrationDate: '2020-04-01',
      address: {
        street: 'Innovation Hub, Electronic City',
        area: 'Phase 1',
        city: 'Bangalore',
        district: 'Bangalore Urban',
        state: 'Karnataka',
        pincode: '560100',
        country: 'India'
      }
    },
    address: {
      street: 'Innovation Hub, Electronic City',
      area: 'Phase 1',
      city: 'Bangalore',
      district: 'Bangalore Urban',
      state: 'Karnataka',
      pincode: '560100',
      country: 'India'
    }
  },
  {
    id: '2',
    name: 'Maharashtra Manufacturing Co',
    email: 'orders@maharashtra-mfg.com',
    phone: '+91 22 2345 6789',
    whatsappNumber: '+91 98876 54321',
    contactPerson: 'Priya Sharma',
    industry: 'Manufacturing',
    creditLimit: 1000000,
    paymentTerms: 'Net 45',
    kycStatus: 'Verified',
    gstDetails: {
      gstin: '27XYZAB1234C1Z2',
      panNumber: 'XYZAB1234C',
      businessName: 'Maharashtra Manufacturing Co',
      registrationType: 'Regular',
      stateCode: '27',
      registrationDate: '2018-07-01',
      address: {
        street: 'Industrial Estate, Aurangabad',
        area: 'MIDC Area',
        city: 'Aurangabad',
        district: 'Aurangabad',
        state: 'Maharashtra',
        pincode: '431001',
        country: 'India'
      }
    },
    address: {
      street: 'Industrial Estate, Aurangabad',
      area: 'MIDC Area',
      city: 'Aurangabad',
      district: 'Aurangabad',
      state: 'Maharashtra',
      pincode: '431001',
      country: 'India'
    }
  }
];

export default function IndianCustomers() {
  const [customers, setCustomers] = useState<IndianCustomer[]>(mockIndianCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('all');
  const [filterKyc, setFilterKyc] = useState('all');
  const [filterIndustry, setFilterIndustry] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<IndianCustomer | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const [formData, setFormData] = useState<Partial<IndianCustomer>>({
    name: '',
    email: '',
    phone: '',
    whatsappNumber: '',
    contactPerson: '',
    industry: '',
    creditLimit: 0,
    paymentTerms: 'Net 30',
    kycStatus: 'Pending',
    gstDetails: {
      gstin: '',
      panNumber: '',
      businessName: '',
      registrationType: 'Regular',
      stateCode: '',
      registrationDate: new Date().toISOString().split('T')[0],
      address: {
        street: '',
        area: '',
        city: '',
        district: '',
        state: '',
        pincode: '',
        country: 'India'
      }
    },
    address: {
      street: '',
      area: '',
      city: '',
      district: '',
      state: '',
      pincode: '',
      country: 'India'
    }
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name?.trim()) errors.name = 'Company name is required';
    if (!formData.email?.trim()) errors.email = 'Email is required';
    if (!formData.phone?.trim()) errors.phone = 'Phone is required';
    else if (!validateIndianMobile(formData.phone)) errors.phone = 'Invalid Indian mobile number';
    
    if (!formData.contactPerson?.trim()) errors.contactPerson = 'Contact person is required';
    if (!formData.industry) errors.industry = 'Industry is required';
    
    if (formData.gstDetails?.gstin && !validateGSTIN(formData.gstDetails.gstin)) {
      errors.gstin = 'Invalid GSTIN format';
    }
    
    if (formData.gstDetails?.panNumber && !validatePAN(formData.gstDetails.panNumber)) {
      errors.pan = 'Invalid PAN format';
    }
    
    if (formData.address?.pincode && !validatePincode(formData.address.pincode)) {
      errors.pincode = 'Invalid PIN code';
    }
    
    if (formData.aadharNumber && !validateAadhar(formData.aadharNumber)) {
      errors.aadhar = 'Invalid Aadhar number';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const newCustomer: IndianCustomer = {
      id: Date.now().toString(),
      ...formData as IndianCustomer
    };

    setCustomers(prev => [...prev, newCustomer]);
    setIsAddDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      whatsappNumber: '',
      contactPerson: '',
      industry: '',
      creditLimit: 0,
      paymentTerms: 'Net 30',
      kycStatus: 'Pending',
      gstDetails: {
        gstin: '',
        panNumber: '',
        businessName: '',
        registrationType: 'Regular',
        stateCode: '',
        registrationDate: new Date().toISOString().split('T')[0],
        address: {
          street: '',
          area: '',
          city: '',
          district: '',
          state: '',
          pincode: '',
          country: 'India'
        }
      },
      address: {
        street: '',
        area: '',
        city: '',
        district: '',
        state: '',
        pincode: '',
        country: 'India'
      }
    });
    setFormErrors({});
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.gstDetails.gstin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = filterState === 'all' || customer.gstDetails.stateCode === filterState;
    const matchesKyc = filterKyc === 'all' || customer.kycStatus.toLowerCase() === filterKyc;
    const matchesIndustry = filterIndustry === 'all' || customer.industry === filterIndustry;
    
    return matchesSearch && matchesState && matchesKyc && matchesIndustry;
  });

  const getKycStatusColor = (status: string) => {
    switch (status) {
      case 'Verified': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getKycStatusIcon = (status: string) => {
    switch (status) {
      case 'Verified': return <CheckCircle className="h-4 w-4" />;
      case 'Pending': return <Clock className="h-4 w-4" />;
      case 'Rejected': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const totalCustomers = filteredCustomers.length;
  const verifiedCustomers = filteredCustomers.filter(c => c.kycStatus === 'Verified').length;
  const totalCreditLimit = filteredCustomers.reduce((sum, c) => sum + c.creditLimit, 0);
  const pendingKyc = filteredCustomers.filter(c => c.kycStatus === 'Pending').length;

  const kpiCards = [
    { title: 'Total Customers', value: totalCustomers.toString(), icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { title: 'Verified KYC', value: verifiedCustomers.toString(), icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50' },
    { title: 'Total Credit Limit', value: formatIndianCurrency(totalCreditLimit), icon: CreditCard, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { title: 'Pending KYC', value: pendingKyc.toString(), icon: Clock, color: 'text-orange-600', bgColor: 'bg-orange-50' },
  ];

  return (
    <div className="p-6 space-y-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Indian Customer Management</h1>
          <p className="text-gray-600">Manage customers with GST compliance and KYC verification</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[600px] overflow-y-auto">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Company Name *</Label>
                    <Input
                      id="name"
                      value={formData.name || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className={formErrors.name ? 'border-red-500' : ''}
                    />
                    {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="contactPerson">Contact Person *</Label>
                    <Input
                      id="contactPerson"
                      value={formData.contactPerson || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                      className={formErrors.contactPerson ? 'border-red-500' : ''}
                    />
                    {formErrors.contactPerson && <p className="text-red-500 text-xs mt-1">{formErrors.contactPerson}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className={formErrors.email ? 'border-red-500' : ''}
                    />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      value={formData.phone || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+91 98765 43210"
                      className={formErrors.phone ? 'border-red-500' : ''}
                    />
                    {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="whatsapp">WhatsApp Number</Label>
                    <Input
                      id="whatsapp"
                      value={formData.whatsappNumber || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <Label htmlFor="industry">Industry *</Label>
                    <Select
                      value={formData.industry}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}
                    >
                      <SelectTrigger className={formErrors.industry ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDIAN_INDUSTRIES.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formErrors.industry && <p className="text-red-500 text-xs mt-1">{formErrors.industry}</p>}
                  </div>
                </div>
              </div>

              {/* GST Details */}
              <div className="space-y-4">
                <h3 className="font-medium text-lg">GST Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="gstin">GSTIN</Label>
                    <Input
                      id="gstin"
                      value={formData.gstDetails?.gstin || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        gstDetails: { ...prev.gstDetails!, gstin: e.target.value.toUpperCase() }
                      }))}
                      placeholder="27ABCDE1234F1Z5"
                      className={formErrors.gstin ? 'border-red-500' : ''}
                    />
                    {formErrors.gstin && <p className="text-red-500 text-xs mt-1">{formErrors.gstin}</p>}
                  </div>
                  <div>
                    <Label htmlFor="pan">PAN Number</Label>
                    <Input
                      id="pan"
                      value={formData.gstDetails?.panNumber || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        gstDetails: { ...prev.gstDetails!, panNumber: e.target.value.toUpperCase() }
                      }))}
                      placeholder="ABCDE1234F"
                      className={formErrors.pan ? 'border-red-500' : ''}
                    />
                    {formErrors.pan && <p className="text-red-500 text-xs mt-1">{formErrors.pan}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="registrationType">Registration Type</Label>
                    <Select
                      value={formData.gstDetails?.registrationType}
                      onValueChange={(value: any) => setFormData(prev => ({
                        ...prev,
                        gstDetails: { ...prev.gstDetails!, registrationType: value }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Regular">Regular</SelectItem>
                        <SelectItem value="Composition">Composition</SelectItem>
                        <SelectItem value="Unregistered">Unregistered</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="aadhar">Aadhar Number (Optional)</Label>
                    <Input
                      id="aadhar"
                      value={formData.aadharNumber || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, aadharNumber: e.target.value }))}
                      placeholder="1234 5678 9012"
                      className={formErrors.aadhar ? 'border-red-500' : ''}
                    />
                    {formErrors.aadhar && <p className="text-red-500 text-xs mt-1">{formErrors.aadhar}</p>}
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Address Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      value={formData.address?.street || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        address: { ...prev.address!, street: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="area">Area/Locality</Label>
                    <Input
                      id="area"
                      value={formData.address?.area || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        address: { ...prev.address!, area: e.target.value }
                      }))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.address?.city || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        address: { ...prev.address!, city: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Select
                      value={formData.address?.state}
                      onValueChange={(value) => {
                        const state = INDIAN_STATES.find(s => s.name === value);
                        setFormData(prev => ({
                          ...prev,
                          address: { ...prev.address!, state: value },
                          gstDetails: { ...prev.gstDetails!, stateCode: state?.code || '' }
                        }));
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDIAN_STATES.map((state) => (
                          <SelectItem key={state.code} value={state.name}>
                            {state.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="pincode">PIN Code</Label>
                    <Input
                      id="pincode"
                      value={formData.address?.pincode || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        address: { ...prev.address!, pincode: e.target.value }
                      }))}
                      placeholder="400001"
                      className={formErrors.pincode ? 'border-red-500' : ''}
                    />
                    {formErrors.pincode && <p className="text-red-500 text-xs mt-1">{formErrors.pincode}</p>}
                  </div>
                </div>
              </div>

              {/* Business Details */}
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Business Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="creditLimit">Credit Limit (₹)</Label>
                    <Input
                      id="creditLimit"
                      type="number"
                      value={formData.creditLimit || 0}
                      onChange={(e) => setFormData(prev => ({ ...prev, creditLimit: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="paymentTerms">Payment Terms</Label>
                    <Select
                      value={formData.paymentTerms}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, paymentTerms: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {PAYMENT_TERMS.map((term) => (
                          <SelectItem key={term} value={term}>
                            {term}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>
                  Add Customer
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

      {/* Customer Management */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle>Customer Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={filterState} onValueChange={setFilterState}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All States" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {INDIAN_STATES.map((state) => (
                    <SelectItem key={state.code} value={state.code}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterKyc} onValueChange={setFilterKyc}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="All KYC" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All KYC</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterIndustry} onValueChange={setFilterIndustry}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="All Industries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {INDIAN_INDUSTRIES.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>GSTIN</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Credit Limit</TableHead>
                  <TableHead>KYC Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-gray-500">{customer.contactPerson}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div className="flex items-center space-x-1">
                          <Mail className="h-3 w-3 text-gray-400" />
                          <span>{customer.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="h-3 w-3 text-gray-400" />
                          <span>{customer.phone}</span>
                        </div>
                        {customer.whatsappNumber && (
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-3 w-3 text-green-500" />
                            <span className="text-green-600">WhatsApp</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-mono">{customer.gstDetails.gstin}</p>
                        <Badge variant="outline" className="mt-1">
                          {customer.gstDetails.registrationType}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{customer.address.city}, {customer.address.state}</p>
                        <p className="text-gray-500">{customer.address.pincode}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{customer.industry}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatIndianCurrency(customer.creditLimit)}
                    </TableCell>
                    <TableCell>
                      <Badge className={getKycStatusColor(customer.kycStatus)}>
                        <div className="flex items-center space-x-1">
                          {getKycStatusIcon(customer.kycStatus)}
                          <span>{customer.kycStatus}</span>
                        </div>
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
                          <DropdownMenuItem onClick={() => {
                            setSelectedCustomer(customer);
                            setIsViewDialogOpen(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Customer
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            Generate Invoice
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Send WhatsApp
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

      {/* Customer Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-6 max-h-[600px] overflow-y-auto">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Company Information</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Name:</span> {selectedCustomer.name}</p>
                    <p><span className="font-medium">Contact Person:</span> {selectedCustomer.contactPerson}</p>
                    <p><span className="font-medium">Industry:</span> {selectedCustomer.industry}</p>
                    <p><span className="font-medium">Email:</span> {selectedCustomer.email}</p>
                    <p><span className="font-medium">Phone:</span> {selectedCustomer.phone}</p>
                    {selectedCustomer.whatsappNumber && (
                      <p><span className="font-medium">WhatsApp:</span> {selectedCustomer.whatsappNumber}</p>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">GST Information</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">GSTIN:</span> {selectedCustomer.gstDetails.gstin}</p>
                    <p><span className="font-medium">PAN:</span> {selectedCustomer.gstDetails.panNumber}</p>
                    <p><span className="font-medium">Registration Type:</span> {selectedCustomer.gstDetails.registrationType}</p>
                    <p><span className="font-medium">State Code:</span> {selectedCustomer.gstDetails.stateCode}</p>
                    {selectedCustomer.aadharNumber && (
                      <p><span className="font-medium">Aadhar:</span> {selectedCustomer.aadharNumber}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Address</h3>
                <p>
                  {selectedCustomer.address.street}, {selectedCustomer.address.area}<br/>
                  {selectedCustomer.address.city}, {selectedCustomer.address.district}<br/>
                  {selectedCustomer.address.state} - {selectedCustomer.address.pincode}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Business Details</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Credit Limit:</span> {formatIndianCurrency(selectedCustomer.creditLimit)}</p>
                    <p><span className="font-medium">Payment Terms:</span> {selectedCustomer.paymentTerms}</p>
                    <p><span className="font-medium">KYC Status:</span> 
                      <Badge className={`ml-2 ${getKycStatusColor(selectedCustomer.kycStatus)}`}>
                        {selectedCustomer.kycStatus}
                      </Badge>
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Create Invoice
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Send WhatsApp
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      View Analytics
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
