/**
 * Indian GST Invoice Management with full compliance features
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { INDIAN_STATES, COMMON_HSN_CODES, GST_RATES, IndianInvoice, IndianInvoiceItem } from '../../types/india';
import { formatIndianCurrency, calculateGST, validateGSTIN, numberToWordsIndian, generateInvoiceNumber, getCurrentFinancialYear } from '../../lib/indianUtils';
import { 
  Receipt, 
  Plus, 
  Trash2, 
  Download, 
  Send, 
  Eye, 
  Calculator,
  QrCode,
  Printer,
  FileText,
  Building2,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { Textarea } from '../../components/ui/textarea';

export default function GSTInvoice() {
  const [invoice, setInvoice] = useState<Partial<IndianInvoice>>({
    invoiceNumber: generateInvoiceNumber('GCI', getCurrentFinancialYear(), 1),
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    items: [],
    placeOfSupply: '27', // Maharashtra
    transportMode: 'Road',
    reverseCharge: false
  });

  const [currentItem, setCurrentItem] = useState<Partial<IndianInvoiceItem>>({
    description: '',
    hsnCode: '',
    quantity: 1,
    unit: 'PCS',
    rate: 0,
    discount: 0,
    gstRate: 18,
    cessRate: 0
  });

  const [supplierGST] = useState({
    gstin: '27ABCDE1234F1Z5',
    panNumber: 'ABCDE1234F',
    businessName: 'Global Cyber IT Solutions Pvt Ltd',
    stateCode: '27',
    address: {
      street: 'Tech Park, Sector 15',
      area: 'CBD Belapur',
      city: 'Navi Mumbai',
      district: 'Thane',
      state: 'Maharashtra',
      pincode: '400614',
      country: 'India' as const
    }
  });

  const [customerGST, setCustomerGST] = useState({
    gstin: '29XYZAB1234C1Z2',
    panNumber: 'XYZAB1234C',
    businessName: 'Tech Innovations Pvt Ltd',
    stateCode: '29',
    address: {
      street: 'Innovation Hub, Electronic City',
      area: 'Phase 1',
      city: 'Bangalore',
      district: 'Bangalore',
      state: 'Karnataka',
      pincode: '560100',
      country: 'India' as const
    }
  });

  const addItem = () => {
    if (!currentItem.description || !currentItem.hsnCode) return;

    const taxableAmount = (currentItem.quantity || 0) * (currentItem.rate || 0) - (currentItem.discount || 0);
    const gstCalc = calculateGST(
      taxableAmount,
      currentItem.gstRate || 0,
      supplierGST.stateCode,
      customerGST.stateCode,
      currentItem.cessRate || 0
    );

    const newItem: IndianInvoiceItem = {
      id: Date.now().toString(),
      description: currentItem.description!,
      hsnCode: currentItem.hsnCode!,
      quantity: currentItem.quantity || 0,
      unit: currentItem.unit || 'PCS',
      rate: currentItem.rate || 0,
      discount: currentItem.discount || 0,
      taxableAmount,
      gstRate: currentItem.gstRate || 0,
      cessRate: currentItem.cessRate || 0,
      cgstAmount: gstCalc.cgstAmount,
      sgstAmount: gstCalc.sgstAmount,
      igstAmount: gstCalc.igstAmount,
      cessAmount: gstCalc.cessAmount,
      totalAmount: gstCalc.totalAmount
    };

    setInvoice(prev => ({
      ...prev,
      items: [...(prev.items || []), newItem]
    }));

    // Reset current item
    setCurrentItem({
      description: '',
      hsnCode: '',
      quantity: 1,
      unit: 'PCS',
      rate: 0,
      discount: 0,
      gstRate: 18,
      cessRate: 0
    });
  };

  const removeItem = (itemId: string) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items?.filter(item => item.id !== itemId) || []
    }));
  };

  const calculateTotals = () => {
    const items = invoice.items || [];
    const totalBeforeTax = items.reduce((sum, item) => sum + item.taxableAmount, 0);
    const totalCGST = items.reduce((sum, item) => sum + item.cgstAmount, 0);
    const totalSGST = items.reduce((sum, item) => sum + item.sgstAmount, 0);
    const totalIGST = items.reduce((sum, item) => sum + item.igstAmount, 0);
    const totalCess = items.reduce((sum, item) => sum + item.cessAmount, 0);
    const totalAfterTax = items.reduce((sum, item) => sum + item.totalAmount, 0);

    return {
      totalBeforeTax,
      totalCGST,
      totalSGST,
      totalIGST,
      totalCess,
      totalGST: totalCGST + totalSGST + totalIGST + totalCess,
      totalAfterTax
    };
  };

  const totals = calculateTotals();
  const isInterState = supplierGST.stateCode !== customerGST.stateCode;

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">GST Invoice Generator</h1>
          <p className="text-gray-600">Create GST compliant invoices with automatic tax calculations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Send className="h-4 w-4 mr-2" />
            Send Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Invoice Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Invoice Header */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Receipt className="h-5 w-5" />
                <span>Invoice Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="invoiceNumber">Invoice Number</Label>
                  <Input
                    id="invoiceNumber"
                    value={invoice.invoiceNumber || ''}
                    onChange={(e) => setInvoice(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="invoiceDate">Invoice Date</Label>
                  <Input
                    id="invoiceDate"
                    type="date"
                    value={invoice.invoiceDate || ''}
                    onChange={(e) => setInvoice(prev => ({ ...prev, invoiceDate: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={invoice.dueDate || ''}
                    onChange={(e) => setInvoice(prev => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="placeOfSupply">Place of Supply</Label>
                  <Select
                    value={invoice.placeOfSupply}
                    onValueChange={(value) => setInvoice(prev => ({ ...prev, placeOfSupply: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDIAN_STATES.map((state) => (
                        <SelectItem key={state.code} value={state.code}>
                          {state.code} - {state.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="transportMode">Transport Mode</Label>
                  <Select
                    value={invoice.transportMode}
                    onValueChange={(value: any) => setInvoice(prev => ({ ...prev, transportMode: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Road">Road</SelectItem>
                      <SelectItem value="Rail">Rail</SelectItem>
                      <SelectItem value="Air">Air</SelectItem>
                      <SelectItem value="Ship">Ship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Billing Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Supplier Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5" />
                  <span>Supplier Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium text-lg">{supplierGST.businessName}</p>
                  <p className="text-sm text-gray-600">GSTIN: {supplierGST.gstin}</p>
                  <p className="text-sm text-gray-600">PAN: {supplierGST.panNumber}</p>
                </div>
                <div className="text-sm">
                  <p>{supplierGST.address.street}</p>
                  <p>{supplierGST.address.area}, {supplierGST.address.city}</p>
                  <p>{supplierGST.address.state} - {supplierGST.address.pincode}</p>
                </div>
              </CardContent>
            </Card>

            {/* Customer Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5" />
                  <span>Bill To</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label htmlFor="customerName">Business Name</Label>
                  <Input
                    id="customerName"
                    value={customerGST.businessName}
                    onChange={(e) => setCustomerGST(prev => ({ ...prev, businessName: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="customerGSTIN">GSTIN</Label>
                  <Input
                    id="customerGSTIN"
                    value={customerGST.gstin}
                    onChange={(e) => setCustomerGST(prev => ({ ...prev, gstin: e.target.value }))}
                    className={validateGSTIN(customerGST.gstin) ? '' : 'border-red-500'}
                  />
                  {!validateGSTIN(customerGST.gstin) && (
                    <p className="text-red-500 text-xs mt-1">Invalid GSTIN format</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="customerAddress">Address</Label>
                  <Textarea
                    id="customerAddress"
                    value={`${customerGST.address.street}, ${customerGST.address.city}, ${customerGST.address.state} - ${customerGST.address.pincode}`}
                    onChange={(e) => {
                      const parts = e.target.value.split(', ');
                      setCustomerGST(prev => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          street: parts[0] || '',
                          city: parts[1] || '',
                          state: parts[2]?.split(' - ')[0] || '',
                          pincode: parts[2]?.split(' - ')[1] || ''
                        }
                      }));
                    }}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Items Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Invoice Items</span>
                <Badge variant={isInterState ? 'default' : 'secondary'}>
                  {isInterState ? 'Inter-State (IGST)' : 'Intra-State (CGST+SGST)'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add Item Form */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-medium mb-3">Add New Item</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={currentItem.description || ''}
                      onChange={(e) => setCurrentItem(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Product/Service description"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hsnCode">HSN/SAC Code</Label>
                    <Select
                      value={currentItem.hsnCode}
                      onValueChange={(value) => {
                        const hsn = COMMON_HSN_CODES.find(h => h.code === value);
                        setCurrentItem(prev => ({
                          ...prev,
                          hsnCode: value,
                          gstRate: hsn?.gstRate || 18
                        }));
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select HSN" />
                      </SelectTrigger>
                      <SelectContent>
                        {COMMON_HSN_CODES.map((hsn) => (
                          <SelectItem key={hsn.code} value={hsn.code}>
                            {hsn.code} - {hsn.description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={currentItem.quantity || 0}
                      onChange={(e) => setCurrentItem(prev => ({ ...prev, quantity: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Unit</Label>
                    <Select
                      value={currentItem.unit}
                      onValueChange={(value) => setCurrentItem(prev => ({ ...prev, unit: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PCS">PCS</SelectItem>
                        <SelectItem value="KG">KG</SelectItem>
                        <SelectItem value="METER">METER</SelectItem>
                        <SelectItem value="LITER">LITER</SelectItem>
                        <SelectItem value="BOX">BOX</SelectItem>
                        <SelectItem value="SET">SET</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="rate">Rate (₹)</Label>
                    <Input
                      id="rate"
                      type="number"
                      value={currentItem.rate || 0}
                      onChange={(e) => setCurrentItem(prev => ({ ...prev, rate: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="discount">Discount (₹)</Label>
                    <Input
                      id="discount"
                      type="number"
                      value={currentItem.discount || 0}
                      onChange={(e) => setCurrentItem(prev => ({ ...prev, discount: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="gstRate">GST Rate (%)</Label>
                    <Select
                      value={currentItem.gstRate?.toString()}
                      onValueChange={(value) => setCurrentItem(prev => ({ ...prev, gstRate: parseInt(value) }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {GST_RATES.map((rate) => (
                          <SelectItem key={rate} value={rate.toString()}>
                            {rate}%
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button onClick={addItem} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </div>
                </div>
              </div>

              {/* Items List */}
              {invoice.items && invoice.items.length > 0 && (
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-3 font-medium">Description</th>
                        <th className="text-left p-3 font-medium">HSN</th>
                        <th className="text-right p-3 font-medium">Qty</th>
                        <th className="text-right p-3 font-medium">Rate</th>
                        <th className="text-right p-3 font-medium">Taxable</th>
                        <th className="text-right p-3 font-medium">GST</th>
                        <th className="text-right p-3 font-medium">Total</th>
                        <th className="text-center p-3 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoice.items.map((item) => (
                        <tr key={item.id} className="border-t">
                          <td className="p-3">{item.description}</td>
                          <td className="p-3">{item.hsnCode}</td>
                          <td className="p-3 text-right">{item.quantity} {item.unit}</td>
                          <td className="p-3 text-right">{formatIndianCurrency(item.rate)}</td>
                          <td className="p-3 text-right">{formatIndianCurrency(item.taxableAmount)}</td>
                          <td className="p-3 text-right">
                            {formatIndianCurrency(item.cgstAmount + item.sgstAmount + item.igstAmount + item.cessAmount)}
                          </td>
                          <td className="p-3 text-right font-medium">{formatIndianCurrency(item.totalAmount)}</td>
                          <td className="p-3 text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Summary & Actions */}
        <div className="space-y-6">
          {/* Tax Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="h-5 w-5" />
                <span>Tax Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-medium">{formatIndianCurrency(totals.totalBeforeTax)}</span>
              </div>
              
              {isInterState ? (
                <div className="flex justify-between">
                  <span>IGST:</span>
                  <span className="font-medium">{formatIndianCurrency(totals.totalIGST)}</span>
                </div>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span>CGST:</span>
                    <span className="font-medium">{formatIndianCurrency(totals.totalCGST)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SGST:</span>
                    <span className="font-medium">{formatIndianCurrency(totals.totalSGST)}</span>
                  </div>
                </>
              )}
              
              {totals.totalCess > 0 && (
                <div className="flex justify-between">
                  <span>Cess:</span>
                  <span className="font-medium">{formatIndianCurrency(totals.totalCess)}</span>
                </div>
              )}
              
              <div className="border-t pt-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>{formatIndianCurrency(totals.totalAfterTax)}</span>
                </div>
              </div>
              
              <div className="text-xs text-gray-600 mt-2">
                <p className="font-medium">Amount in Words:</p>
                <p>{numberToWordsIndian(Math.round(totals.totalAfterTax))}</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <QrCode className="h-4 w-4 mr-2" />
                Generate e-Invoice QR
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Printer className="h-4 w-4 mr-2" />
                Print Invoice
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="h-4 w-4 mr-2" />
                Email to Customer
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Upload to GSTR-1
              </Button>
            </CardContent>
          </Card>

          {/* GST Compliance Status */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">GSTIN Validation</span>
                <Badge variant={validateGSTIN(customerGST.gstin) ? 'default' : 'destructive'}>
                  {validateGSTIN(customerGST.gstin) ? 'Valid' : 'Invalid'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">HSN Codes</span>
                <Badge variant="default">Valid</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Tax Calculation</span>
                <Badge variant="default">Accurate</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">e-Invoice Ready</span>
                <Badge variant="secondary">Yes</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
