/**
 * Indian business utility functions for GST, validation, and local customization
 */

import { INDIAN_STATES, GSTCalculation, IndianInvoiceItem, TDS_RATES } from '../types/india';

/**
 * Validate Indian GST number (GSTIN)
 */
export const validateGSTIN = (gstin: string): boolean => {
  if (!gstin || gstin.length !== 15) return false;
  
  const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstinRegex.test(gstin);
};

/**
 * Validate Indian PAN number
 */
export const validatePAN = (pan: string): boolean => {
  if (!pan || pan.length !== 10) return false;
  
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan);
};

/**
 * Validate Indian PIN code
 */
export const validatePincode = (pincode: string): boolean => {
  if (!pincode || pincode.length !== 6) return false;
  
  const pincodeRegex = /^[1-9][0-9]{5}$/;
  return pincodeRegex.test(pincode);
};

/**
 * Validate Indian mobile number
 */
export const validateIndianMobile = (mobile: string): boolean => {
  if (!mobile) return false;
  
  // Remove country code and special characters
  const cleanMobile = mobile.replace(/[\s\-\+\(\)]/g, '');
  const mobileRegex = /^(?:\+91|91)?[6-9]\d{9}$/;
  
  return mobileRegex.test(cleanMobile);
};

/**
 * Validate Aadhar number
 */
export const validateAadhar = (aadhar: string): boolean => {
  if (!aadhar) return false;
  
  const cleanAadhar = aadhar.replace(/\s/g, '');
  return cleanAadhar.length === 12 && /^\d{12}$/.test(cleanAadhar);
};

/**
 * Validate IFSC code
 */
export const validateIFSC = (ifsc: string): boolean => {
  if (!ifsc || ifsc.length !== 11) return false;
  
  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  return ifscRegex.test(ifsc);
};

/**
 * Extract state code from GSTIN
 */
export const getStateCodeFromGSTIN = (gstin: string): string => {
  if (!validateGSTIN(gstin)) return '';
  return gstin.substring(0, 2);
};

/**
 * Get state name from state code
 */
export const getStateName = (stateCode: string): string => {
  const state = INDIAN_STATES.find(s => s.code === stateCode);
  return state ? state.name : '';
};

/**
 * Calculate GST based on place of supply
 */
export const calculateGST = (
  taxableAmount: number,
  gstRate: number,
  supplierStateCode: string,
  customerStateCode: string,
  cessRate: number = 0
): GSTCalculation => {
  const isInterState = supplierStateCode !== customerStateCode;
  
  let cgstRate = 0;
  let sgstRate = 0;
  let igstRate = 0;
  
  if (isInterState) {
    // Inter-state: IGST
    igstRate = gstRate;
  } else {
    // Intra-state: CGST + SGST
    cgstRate = gstRate / 2;
    sgstRate = gstRate / 2;
  }
  
  const cgstAmount = (taxableAmount * cgstRate) / 100;
  const sgstAmount = (taxableAmount * sgstRate) / 100;
  const igstAmount = (taxableAmount * igstRate) / 100;
  const cessAmount = (taxableAmount * cessRate) / 100;
  
  const totalGST = cgstAmount + sgstAmount + igstAmount + cessAmount;
  const totalAmount = taxableAmount + totalGST;
  
  return {
    taxableAmount,
    cgstRate,
    sgstRate,
    igstRate,
    cessRate,
    cgstAmount: Math.round(cgstAmount * 100) / 100,
    sgstAmount: Math.round(sgstAmount * 100) / 100,
    igstAmount: Math.round(igstAmount * 100) / 100,
    cessAmount: Math.round(cessAmount * 100) / 100,
    totalGST: Math.round(totalGST * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100
  };
};

/**
 * Calculate TDS amount
 */
export const calculateTDS = (amount: number, section: string): number => {
  const tdsRate = TDS_RATES.find(rate => rate.section === section);
  if (!tdsRate || amount < tdsRate.threshold) return 0;
  
  return Math.round((amount * tdsRate.rate) / 100 * 100) / 100;
};

/**
 * Format Indian currency
 */
export const formatIndianCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Format Indian number with comma separation
 */
export const formatIndianNumber = (num: number): string => {
  return new Intl.NumberFormat('en-IN').format(num);
};

/**
 * Convert number to words (Indian style)
 */
export const numberToWordsIndian = (amount: number): string => {
  const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
  if (amount === 0) return 'Zero';
  
  const croreAmount = Math.floor(amount / 10000000);
  const lakhAmount = Math.floor((amount % 10000000) / 100000);
  const thousandAmount = Math.floor((amount % 100000) / 1000);
  const hundredAmount = Math.floor((amount % 1000) / 100);
  const remainingAmount = amount % 100;
  
  let result = '';
  
  if (croreAmount > 0) {
    result += convertTwoDigits(croreAmount) + ' Crore ';
  }
  
  if (lakhAmount > 0) {
    result += convertTwoDigits(lakhAmount) + ' Lakh ';
  }
  
  if (thousandAmount > 0) {
    result += convertTwoDigits(thousandAmount) + ' Thousand ';
  }
  
  if (hundredAmount > 0) {
    result += units[hundredAmount] + ' Hundred ';
  }
  
  if (remainingAmount > 0) {
    result += convertTwoDigits(remainingAmount);
  }
  
  function convertTwoDigits(num: number): string {
    if (num === 0) return '';
    if (num < 10) return units[num];
    if (num < 20) return teens[num - 10];
    
    const tensDigit = Math.floor(num / 10);
    const unitsDigit = num % 10;
    
    return tens[tensDigit] + (unitsDigit > 0 ? ' ' + units[unitsDigit] : '');
  }
  
  return result.trim() + ' Only';
};

/**
 * Generate Invoice Number (Indian format)
 */
export const generateInvoiceNumber = (companyCode: string, financialYear: string, sequence: number): string => {
  return `${companyCode}/${financialYear}/${sequence.toString().padStart(4, '0')}`;
};

/**
 * Get current Financial Year (April to March)
 */
export const getCurrentFinancialYear = (): string => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-indexed
  
  if (currentMonth >= 3) { // April onwards
    return `${currentYear}-${(currentYear + 1).toString().slice(-2)}`;
  } else { // January to March
    return `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
  }
};

/**
 * Calculate HSN-wise GST summary for GSTR-1
 */
export const calculateHSNSummary = (items: IndianInvoiceItem[]) => {
  const hsnMap = new Map();
  
  items.forEach(item => {
    const key = `${item.hsnCode}-${item.gstRate}`;
    
    if (!hsnMap.has(key)) {
      hsnMap.set(key, {
        hsnCode: item.hsnCode,
        gstRate: item.gstRate,
        taxableAmount: 0,
        cgstAmount: 0,
        sgstAmount: 0,
        igstAmount: 0,
        cessAmount: 0,
        totalAmount: 0,
        quantity: 0,
        unit: item.unit
      });
    }
    
    const existing = hsnMap.get(key);
    existing.taxableAmount += item.taxableAmount;
    existing.cgstAmount += item.cgstAmount;
    existing.sgstAmount += item.sgstAmount;
    existing.igstAmount += item.igstAmount;
    existing.cessAmount += item.cessAmount;
    existing.totalAmount += item.totalAmount;
    existing.quantity += item.quantity;
  });
  
  return Array.from(hsnMap.values());
};

/**
 * Validate and format GSTIN for display
 */
export const formatGSTIN = (gstin: string): string => {
  if (!gstin) return '';
  
  const clean = gstin.replace(/\s/g, '').toUpperCase();
  if (clean.length === 15) {
    return `${clean.slice(0, 2)} ${clean.slice(2, 7)} ${clean.slice(7, 11)} ${clean.slice(11, 12)} ${clean.slice(12, 13)} ${clean.slice(13, 14)} ${clean.slice(14, 15)}`;
  }
  
  return clean;
};

/**
 * Generate QR Code data for e-Invoice
 */
export const generateEInvoiceQR = (invoiceData: any): string => {
  const qrData = {
    Version: '1.1',
    Mode: 'LIVE',
    Tran: {
      TaxSch: 'GST',
      SupTyp: 'B2B',
      RegRev: 'Y',
      IgstOnIntra: 'N'
    },
    Doc: {
      Typ: 'INV',
      No: invoiceData.invoiceNumber,
      Dt: invoiceData.invoiceDate
    },
    Seller: {
      Gstin: invoiceData.supplierGST.gstin,
      LglNm: invoiceData.supplierGST.businessName,
      Addr1: invoiceData.supplierGST.address.street,
      Loc: invoiceData.supplierGST.address.city,
      Pin: invoiceData.supplierGST.address.pincode,
      Stcd: invoiceData.supplierGST.stateCode
    },
    Buyer: {
      Gstin: invoiceData.customerGST.gstin,
      LglNm: invoiceData.customerGST.businessName,
      Addr1: invoiceData.customerGST.address.street,
      Loc: invoiceData.customerGST.address.city,
      Pin: invoiceData.customerGST.address.pincode,
      Stcd: invoiceData.customerGST.stateCode
    },
    ValDtls: {
      AssVal: invoiceData.totalBeforeTax,
      CgstVal: invoiceData.gstCalculation.cgstAmount,
      SgstVal: invoiceData.gstCalculation.sgstAmount,
      IgstVal: invoiceData.gstCalculation.igstAmount,
      CesVal: invoiceData.gstCalculation.cessAmount,
      TotInvVal: invoiceData.totalAfterTax
    }
  };
  
  return JSON.stringify(qrData);
};

export default {
  validateGSTIN,
  validatePAN,
  validatePincode,
  validateIndianMobile,
  validateAadhar,
  validateIFSC,
  calculateGST,
  calculateTDS,
  formatIndianCurrency,
  formatIndianNumber,
  numberToWordsIndian,
  generateInvoiceNumber,
  getCurrentFinancialYear,
  calculateHSNSummary,
  formatGSTIN,
  generateEInvoiceQR
};
