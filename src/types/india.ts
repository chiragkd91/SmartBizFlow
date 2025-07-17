/**
 * Indian-specific type definitions for Smart ERP + CRM
 */

export interface IndianAddress {
  street: string;
  area: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  country: 'India';
}

export interface GSTDetails {
  gstin: string;
  panNumber: string;
  businessName: string;
  registrationType: 'Regular' | 'Composition' | 'Unregistered';
  stateCode: string;
  registrationDate: string;
  address: IndianAddress;
}

export interface HSNCode {
  code: string;
  description: string;
  gstRate: number;
  cessRate?: number;
  category: string;
}

export interface GSTCalculation {
  taxableAmount: number;
  cgstRate: number;
  sgstRate: number;
  igstRate: number;
  cessRate: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  cessAmount: number;
  totalGST: number;
  totalAmount: number;
}

export interface IndianInvoice {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  billingAddress: IndianAddress;
  shippingAddress: IndianAddress;
  customerGST: GSTDetails;
  supplierGST: GSTDetails;
  items: IndianInvoiceItem[];
  gstCalculation: GSTCalculation;
  totalBeforeTax: number;
  totalAfterTax: number;
  paymentTerms: string;
  bankDetails: IndianBankDetails;
  eInvoiceIRN?: string;
  eInvoiceQR?: string;
  transportMode: 'Road' | 'Rail' | 'Air' | 'Ship';
  vehicleNumber?: string;
  placeOfSupply: string;
  reverseCharge: boolean;
}

export interface IndianInvoiceItem {
  id: string;
  description: string;
  hsnCode: string;
  quantity: number;
  unit: string;
  rate: number;
  discount: number;
  taxableAmount: number;
  gstRate: number;
  cessRate: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  cessAmount: number;
  totalAmount: number;
}

export interface IndianBankDetails {
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  branch: string;
  accountType: 'Current' | 'Savings';
  upiId?: string;
}

export interface IndianCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsappNumber?: string;
  gstDetails: GSTDetails;
  address: IndianAddress;
  creditLimit: number;
  paymentTerms: string;
  kycStatus: 'Pending' | 'Verified' | 'Rejected';
  aadharNumber?: string;
  contactPerson: string;
  industry: string;
}

export interface IndianProduct {
  id: string;
  name: string;
  description: string;
  hsnCode: string;
  sku: string;
  category: string;
  brand: string;
  unit: string;
  purchasePrice: number;
  sellingPrice: number;
  mrp: number;
  gstRate: number;
  cessRate?: number;
  stock: number;
  minStock: number;
  maxStock: number;
  location: string;
  batchNumber?: string;
  expiryDate?: string;
  manufacturingDate?: string;
  barcode?: string;
  dimensions?: string;
  weight?: number;
}

export interface GSTReturn {
  id: string;
  period: string; // MM-YYYY
  filingType: 'GSTR1' | 'GSTR3B' | 'GSTR9';
  status: 'Draft' | 'Filed' | 'Late Filed';
  totalSales: number;
  totalPurchases: number;
  outputTax: number;
  inputTaxCredit: number;
  taxPayable: number;
  filedDate?: string;
  dueDate: string;
  penalty?: number;
  interest?: number;
}

export interface IndianPayment {
  id: string;
  invoiceId: string;
  amount: number;
  paymentDate: string;
  paymentMode: 'Cash' | 'Cheque' | 'NEFT' | 'RTGS' | 'IMPS' | 'UPI' | 'Card';
  referenceNumber?: string;
  bankDetails?: IndianBankDetails;
  tdsAmount?: number;
  tdsRate?: number;
  notes?: string;
}

export const INDIAN_STATES = [
  { code: '01', name: 'Jammu and Kashmir' },
  { code: '02', name: 'Himachal Pradesh' },
  { code: '03', name: 'Punjab' },
  { code: '04', name: 'Chandigarh' },
  { code: '05', name: 'Uttarakhand' },
  { code: '06', name: 'Haryana' },
  { code: '07', name: 'Delhi' },
  { code: '08', name: 'Rajasthan' },
  { code: '09', name: 'Uttar Pradesh' },
  { code: '10', name: 'Bihar' },
  { code: '11', name: 'Sikkim' },
  { code: '12', name: 'Arunachal Pradesh' },
  { code: '13', name: 'Nagaland' },
  { code: '14', name: 'Manipur' },
  { code: '15', name: 'Mizoram' },
  { code: '16', name: 'Tripura' },
  { code: '17', name: 'Meghalaya' },
  { code: '18', name: 'Assam' },
  { code: '19', name: 'West Bengal' },
  { code: '20', name: 'Jharkhand' },
  { code: '21', name: 'Odisha' },
  { code: '22', name: 'Chhattisgarh' },
  { code: '23', name: 'Madhya Pradesh' },
  { code: '24', name: 'Gujarat' },
  { code: '25', name: 'Daman and Diu' },
  { code: '26', name: 'Dadra and Nagar Haveli' },
  { code: '27', name: 'Maharashtra' },
  { code: '29', name: 'Karnataka' },
  { code: '30', name: 'Goa' },
  { code: '31', name: 'Lakshadweep' },
  { code: '32', name: 'Kerala' },
  { code: '33', name: 'Tamil Nadu' },
  { code: '34', name: 'Puducherry' },
  { code: '35', name: 'Andaman and Nicobar Islands' },
  { code: '36', name: 'Telangana' },
  { code: '37', name: 'Andhra Pradesh' },
  { code: '38', name: 'Ladakh' }
] as const;

export const COMMON_HSN_CODES = [
  { code: '1006', description: 'Rice', gstRate: 5, category: 'Food' },
  { code: '1701', description: 'Cane or beet sugar', gstRate: 5, category: 'Food' },
  { code: '2710', description: 'Petroleum oils', gstRate: 28, category: 'Fuel' },
  { code: '3004', description: 'Medicaments', gstRate: 12, category: 'Medicine' },
  { code: '4011', description: 'Tyres', gstRate: 28, category: 'Automobile' },
  { code: '5208', description: 'Cotton fabrics', gstRate: 5, category: 'Textile' },
  { code: '6203', description: 'Men\'s clothing', gstRate: 12, category: 'Apparel' },
  { code: '7208', description: 'Iron/Steel sheets', gstRate: 18, category: 'Metal' },
  { code: '8517', description: 'Mobile phones', gstRate: 12, category: 'Electronics' },
  { code: '9404', description: 'Mattresses', gstRate: 28, category: 'Furniture' }
] as const;

export const GST_RATES = [0, 5, 12, 18, 28] as const;

export interface TDSRate {
  section: string;
  description: string;
  rate: number;
  threshold: number;
}

export const TDS_RATES: TDSRate[] = [
  { section: '194C', description: 'Contractor/Sub-contractor', rate: 1, threshold: 30000 },
  { section: '194J', description: 'Professional/Technical Services', rate: 10, threshold: 30000 },
  { section: '194I', description: 'Rent - Plant & Machinery', rate: 2, threshold: 180000 },
  { section: '194IB', description: 'Rent - Land/Building', rate: 5, threshold: 50000 },
  { section: '194H', description: 'Commission/Brokerage', rate: 5, threshold: 15000 }
];
