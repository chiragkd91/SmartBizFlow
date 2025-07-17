/**
 * Comprehensive Settings page for Global Cyber IT Admin Portal
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Textarea } from '../components/ui/textarea';
import { Separator } from '../components/ui/separator';
import { 
  Settings as SettingsIcon,
  Building,
  Mail,
  Shield,
  Bell,
  Globe,
  Palette,
  Database,
  Users,
  Lock,
  Zap,
  Calendar,
  Download,
  Upload,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  Copy,
  Server,
  Smartphone,
  Monitor
} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { useStore } from '../store/useStore';

interface CompanySettings {
  name: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  timezone: string;
  currency: string;
  language: string;
  fiscalYearStart: string;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: number;
  passwordPolicy: {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
    expirationDays: number;
  };
  ipWhitelist: string[];
  auditLogging: boolean;
  encryptionEnabled: boolean;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  newLeadAlert: boolean;
  lowStockAlert: boolean;
  overdueInvoiceAlert: boolean;
  systemMaintenanceAlert: boolean;
  weeklyReports: boolean;
  monthlyReports: boolean;
}

interface IntegrationSettings {
  smtpEnabled: boolean;
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword: string;
  smtpEncryption: string;
  apiKey: string;
  webhookUrl: string;
  backupEnabled: boolean;
  backupFrequency: string;
  backupLocation: string;
}

export default function Settings() {
  const { currentUser } = useStore();
  const [activeTab, setActiveTab] = useState('company');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const [companySettings, setCompanySettings] = useState<CompanySettings>({
    name: 'Global Cyber IT',
    logo: 'https://pub-cdn.sider.ai/u/U0Y3HGVYKOY/web-coder/68696f720dd11641ee25c3cd/resource/230c9bb3-027c-4cbd-b776-54ac3adaf347.jpg',
    address: '123 Technology Drive, Cyber City, CA 94105',
    phone: '+1 (555) 123-4567',
    email: 'contact@globalcyberit.com',
    website: 'https://www.globalcyberit.com',
    timezone: 'America/Los_Angeles',
    currency: 'USD',
    language: 'en',
    fiscalYearStart: 'January'
  });

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordPolicy: {
      minLength: 12,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      expirationDays: 90
    },
    ipWhitelist: ['192.168.1.0/24', '10.0.0.0/8'],
    auditLogging: true,
    encryptionEnabled: true
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    newLeadAlert: true,
    lowStockAlert: true,
    overdueInvoiceAlert: true,
    systemMaintenanceAlert: true,
    weeklyReports: true,
    monthlyReports: true
  });

  const [integrationSettings, setIntegrationSettings] = useState<IntegrationSettings>({
    smtpEnabled: true,
    smtpHost: 'smtp.globalcyberit.com',
    smtpPort: 587,
    smtpUsername: 'noreply@globalcyberit.com',
    smtpPassword: '••••••••••••',
    smtpEncryption: 'TLS',
    apiKey: 'gci_sk_1234567890abcdef',
    webhookUrl: 'https://api.globalcyberit.com/webhooks',
    backupEnabled: true,
    backupFrequency: 'daily',
    backupLocation: 'AWS S3'
  });

  const handleSave = async (section: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUnsavedChanges(false);
      // Show success message
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    // Reset to original values
    setUnsavedChanges(false);
  };

  const generateApiKey = () => {
    const newKey = 'gci_sk_' + Math.random().toString(36).substr(2, 32);
    setIntegrationSettings(prev => ({ ...prev, apiKey: newKey }));
    setUnsavedChanges(true);
  };

  const testEmailConnection = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Email connection test successful!');
    } catch (error) {
      alert('Email connection test failed!');
    } finally {
      setLoading(false);
    }
  };

  const exportSettings = () => {
    const settings = {
      company: companySettings,
      security: securitySettings,
      notifications: notificationSettings,
      integrations: integrationSettings
    };
    
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'global-cyber-it-settings.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6 bg-white min-h-screen">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600">Configure and manage Global Cyber IT system preferences</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportSettings}>
            <Download className="h-4 w-4 mr-2" />
            Export Settings
          </Button>
          {unsavedChanges && (
            <Badge variant="destructive">Unsaved Changes</Badge>
          )}
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="company" className="flex items-center space-x-2">
            <Building className="h-4 w-4" />
            <span>Company</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center space-x-2">
            <Zap className="h-4 w-4" />
            <span>Integrations</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center space-x-2">
            <Server className="h-4 w-4" />
            <span>System</span>
          </TabsTrigger>
        </TabsList>

        {/* Company Settings */}
        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="h-5 w-5" />
                <span>Company Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={companySettings.name}
                      onChange={(e) => {
                        setCompanySettings(prev => ({ ...prev, name: e.target.value }));
                        setUnsavedChanges(true);
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyEmail">Email</Label>
                    <Input
                      id="companyEmail"
                      type="email"
                      value={companySettings.email}
                      onChange={(e) => {
                        setCompanySettings(prev => ({ ...prev, email: e.target.value }));
                        setUnsavedChanges(true);
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyPhone">Phone</Label>
                    <Input
                      id="companyPhone"
                      value={companySettings.phone}
                      onChange={(e) => {
                        setCompanySettings(prev => ({ ...prev, phone: e.target.value }));
                        setUnsavedChanges(true);
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyWebsite">Website</Label>
                    <Input
                      id="companyWebsite"
                      value={companySettings.website}
                      onChange={(e) => {
                        setCompanySettings(prev => ({ ...prev, website: e.target.value }));
                        setUnsavedChanges(true);
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="companyAddress">Address</Label>
                    <Textarea
                      id="companyAddress"
                      value={companySettings.address}
                      onChange={(e) => {
                        setCompanySettings(prev => ({ ...prev, address: e.target.value }));
                        setUnsavedChanges(true);
                      }}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={companySettings.timezone}
                      onValueChange={(value) => {
                        setCompanySettings(prev => ({ ...prev, timezone: value }));
                        setUnsavedChanges(true);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time</SelectItem>
                        <SelectItem value="America/Chicago">Central Time</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <Select
                      value={companySettings.currency}
                      onValueChange={(value) => {
                        setCompanySettings(prev => ({ ...prev, currency: value }));
                        setUnsavedChanges(true);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={companySettings.language}
                      onValueChange={(value) => {
                        setCompanySettings(prev => ({ ...prev, language: value }));
                        setUnsavedChanges(true);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={handleReset}>
                  Reset
                </Button>
                <Button onClick={() => handleSave('company')} disabled={loading}>
                  {loading ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security & Authentication</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-600">Require 2FA for all users</p>
                    </div>
                    <Switch
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked) => {
                        setSecuritySettings(prev => ({ ...prev, twoFactorAuth: checked }));
                        setUnsavedChanges(true);
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => {
                        setSecuritySettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }));
                        setUnsavedChanges(true);
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Audit Logging</Label>
                      <p className="text-sm text-gray-600">Log all user activities</p>
                    </div>
                    <Switch
                      checked={securitySettings.auditLogging}
                      onCheckedChange={(checked) => {
                        setSecuritySettings(prev => ({ ...prev, auditLogging: checked }));
                        setUnsavedChanges(true);
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Data Encryption</Label>
                      <p className="text-sm text-gray-600">Encrypt sensitive data at rest</p>
                    </div>
                    <Switch
                      checked={securitySettings.encryptionEnabled}
                      onCheckedChange={(checked) => {
                        setSecuritySettings(prev => ({ ...prev, encryptionEnabled: checked }));
                        setUnsavedChanges(true);
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Password Policy</Label>
                    <div className="space-y-3 mt-2 p-4 border rounded-md">
                      <div>
                        <Label htmlFor="minLength">Minimum Length</Label>
                        <Input
                          id="minLength"
                          type="number"
                          value={securitySettings.passwordPolicy.minLength}
                          onChange={(e) => {
                            setSecuritySettings(prev => ({
                              ...prev,
                              passwordPolicy: {
                                ...prev.passwordPolicy,
                                minLength: parseInt(e.target.value)
                              }
                            }));
                            setUnsavedChanges(true);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="requireUppercase"
                            checked={securitySettings.passwordPolicy.requireUppercase}
                            onChange={(e) => {
                              setSecuritySettings(prev => ({
                                ...prev,
                                passwordPolicy: {
                                  ...prev.passwordPolicy,
                                  requireUppercase: e.target.checked
                                }
                              }));
                              setUnsavedChanges(true);
                            }}
                          />
                          <Label htmlFor="requireUppercase">Require uppercase letters</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="requireNumbers"
                            checked={securitySettings.passwordPolicy.requireNumbers}
                            onChange={(e) => {
                              setSecuritySettings(prev => ({
                                ...prev,
                                passwordPolicy: {
                                  ...prev.passwordPolicy,
                                  requireNumbers: e.target.checked
                                }
                              }));
                              setUnsavedChanges(true);
                            }}
                          />
                          <Label htmlFor="requireNumbers">Require numbers</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="requireSpecialChars"
                            checked={securitySettings.passwordPolicy.requireSpecialChars}
                            onChange={(e) => {
                              setSecuritySettings(prev => ({
                                ...prev,
                                passwordPolicy: {
                                  ...prev.passwordPolicy,
                                  requireSpecialChars: e.target.checked
                                }
                              }));
                              setUnsavedChanges(true);
                            }}
                          />
                          <Label htmlFor="requireSpecialChars">Require special characters</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={handleReset}>
                  Reset
                </Button>
                <Button onClick={() => handleSave('security')} disabled={loading}>
                  {loading ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Notification Channels</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-gray-600">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) => {
                          setNotificationSettings(prev => ({ ...prev, emailNotifications: checked }));
                          setUnsavedChanges(true);
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-gray-600">Receive critical alerts via SMS</p>
                      </div>
                      <Switch
                        checked={notificationSettings.smsNotifications}
                        onCheckedChange={(checked) => {
                          setNotificationSettings(prev => ({ ...prev, smsNotifications: checked }));
                          setUnsavedChanges(true);
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-gray-600">Browser push notifications</p>
                      </div>
                      <Switch
                        checked={notificationSettings.pushNotifications}
                        onCheckedChange={(checked) => {
                          setNotificationSettings(prev => ({ ...prev, pushNotifications: checked }));
                          setUnsavedChanges(true);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Alert Types</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>New Lead Alerts</Label>
                      <Switch
                        checked={notificationSettings.newLeadAlert}
                        onCheckedChange={(checked) => {
                          setNotificationSettings(prev => ({ ...prev, newLeadAlert: checked }));
                          setUnsavedChanges(true);
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Low Stock Alerts</Label>
                      <Switch
                        checked={notificationSettings.lowStockAlert}
                        onCheckedChange={(checked) => {
                          setNotificationSettings(prev => ({ ...prev, lowStockAlert: checked }));
                          setUnsavedChanges(true);
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Overdue Invoice Alerts</Label>
                      <Switch
                        checked={notificationSettings.overdueInvoiceAlert}
                        onCheckedChange={(checked) => {
                          setNotificationSettings(prev => ({ ...prev, overdueInvoiceAlert: checked }));
                          setUnsavedChanges(true);
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>System Maintenance Alerts</Label>
                      <Switch
                        checked={notificationSettings.systemMaintenanceAlert}
                        onCheckedChange={(checked) => {
                          setNotificationSettings(prev => ({ ...prev, systemMaintenanceAlert: checked }));
                          setUnsavedChanges(true);
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Weekly Reports</Label>
                      <Switch
                        checked={notificationSettings.weeklyReports}
                        onCheckedChange={(checked) => {
                          setNotificationSettings(prev => ({ ...prev, weeklyReports: checked }));
                          setUnsavedChanges(true);
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Monthly Reports</Label>
                      <Switch
                        checked={notificationSettings.monthlyReports}
                        onCheckedChange={(checked) => {
                          setNotificationSettings(prev => ({ ...prev, monthlyReports: checked }));
                          setUnsavedChanges(true);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={handleReset}>
                  Reset
                </Button>
                <Button onClick={() => handleSave('notifications')} disabled={loading}>
                  {loading ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integration Settings */}
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Email Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>SMTP Integration</Label>
                  <p className="text-sm text-gray-600">Enable email sending capabilities</p>
                </div>
                <Switch
                  checked={integrationSettings.smtpEnabled}
                  onCheckedChange={(checked) => {
                    setIntegrationSettings(prev => ({ ...prev, smtpEnabled: checked }));
                    setUnsavedChanges(true);
                  }}
                />
              </div>
              {integrationSettings.smtpEnabled && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="smtpHost">SMTP Host</Label>
                    <Input
                      id="smtpHost"
                      value={integrationSettings.smtpHost}
                      onChange={(e) => {
                        setIntegrationSettings(prev => ({ ...prev, smtpHost: e.target.value }));
                        setUnsavedChanges(true);
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtpPort">SMTP Port</Label>
                    <Input
                      id="smtpPort"
                      type="number"
                      value={integrationSettings.smtpPort}
                      onChange={(e) => {
                        setIntegrationSettings(prev => ({ ...prev, smtpPort: parseInt(e.target.value) }));
                        setUnsavedChanges(true);
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtpUsername">Username</Label>
                    <Input
                      id="smtpUsername"
                      value={integrationSettings.smtpUsername}
                      onChange={(e) => {
                        setIntegrationSettings(prev => ({ ...prev, smtpUsername: e.target.value }));
                        setUnsavedChanges(true);
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtpPassword">Password</Label>
                    <div className="relative">
                      <Input
                        id="smtpPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={integrationSettings.smtpPassword}
                        onChange={(e) => {
                          setIntegrationSettings(prev => ({ ...prev, smtpPassword: e.target.value }));
                          setUnsavedChanges(true);
                        }}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex space-x-2">
                <Button variant="outline" onClick={testEmailConnection} disabled={loading}>
                  {loading ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  )}
                  Test Connection
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>API & Webhooks</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="apiKey">API Key</Label>
                <div className="flex space-x-2">
                  <Input
                    id="apiKey"
                    value={integrationSettings.apiKey}
                    readOnly
                    className="font-mono"
                  />
                  <Button variant="outline" onClick={() => navigator.clipboard.writeText(integrationSettings.apiKey)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" onClick={generateApiKey}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mt-1">Use this key for API authentication</p>
              </div>
              <div>
                <Label htmlFor="webhookUrl">Webhook URL</Label>
                <Input
                  id="webhookUrl"
                  value={integrationSettings.webhookUrl}
                  onChange={(e) => {
                    setIntegrationSettings(prev => ({ ...prev, webhookUrl: e.target.value }));
                    setUnsavedChanges(true);
                  }}
                />
                <p className="text-sm text-gray-600 mt-1">Endpoint for receiving webhook notifications</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Backup & Recovery</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Automatic Backups</Label>
                  <p className="text-sm text-gray-600">Enable automated data backups</p>
                </div>
                <Switch
                  checked={integrationSettings.backupEnabled}
                  onCheckedChange={(checked) => {
                    setIntegrationSettings(prev => ({ ...prev, backupEnabled: checked }));
                    setUnsavedChanges(true);
                  }}
                />
              </div>
              {integrationSettings.backupEnabled && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="backupFrequency">Backup Frequency</Label>
                    <Select
                      value={integrationSettings.backupFrequency}
                      onValueChange={(value) => {
                        setIntegrationSettings(prev => ({ ...prev, backupFrequency: value }));
                        setUnsavedChanges(true);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="backupLocation">Backup Location</Label>
                    <Select
                      value={integrationSettings.backupLocation}
                      onValueChange={(value) => {
                        setIntegrationSettings(prev => ({ ...prev, backupLocation: value }));
                        setUnsavedChanges(true);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AWS S3">AWS S3</SelectItem>
                        <SelectItem value="Google Cloud">Google Cloud Storage</SelectItem>
                        <SelectItem value="Azure">Azure Blob Storage</SelectItem>
                        <SelectItem value="Local">Local Storage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Backup
                </Button>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Restore Backup
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <Button onClick={() => handleSave('integrations')} disabled={loading}>
              {loading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Changes
            </Button>
          </div>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Monitor className="h-5 w-5" />
                <span>System Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">System Version:</span>
                    <span className="text-sm">v2.1.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Database:</span>
                    <span className="text-sm">PostgreSQL 14.2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Server:</span>
                    <span className="text-sm">AWS EC2 t3.large</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Uptime:</span>
                    <span className="text-sm">15 days, 7 hours</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">CPU Usage:</span>
                    <span className="text-sm">24%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Memory Usage:</span>
                    <span className="text-sm">3.2 GB / 8 GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Storage:</span>
                    <span className="text-sm">45 GB / 100 GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Last Backup:</span>
                    <span className="text-sm">2 hours ago</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Maintenance & Updates</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-800">System is up to date</span>
                </div>
                <p className="text-sm text-blue-700 mt-1">Last updated: January 15, 2024</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Check for Updates
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Schedule Maintenance
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Schedule Maintenance</DialogTitle>
                      <DialogDescription>
                        Schedule a maintenance window for system updates and optimizations.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="maintenanceDate">Maintenance Date</Label>
                        <Input id="maintenanceDate" type="datetime-local" />
                      </div>
                      <div>
                        <Label htmlFor="maintenanceDuration">Duration (hours)</Label>
                        <Input id="maintenanceDuration" type="number" placeholder="2" />
                      </div>
                      <div>
                        <Label htmlFor="maintenanceNotes">Notes</Label>
                        <Textarea id="maintenanceNotes" placeholder="Describe the maintenance activities..." />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Schedule Maintenance</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
