/**
 * Login form component with User Portal support and Forgot Password functionality
 */

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Loader2, 
  Building2, 
  Shield, 
  TrendingUp, 
  Users, 
  ArrowLeft, 
  Mail, 
  CheckCircle, 
  Key,
  Phone,
  Lock,
  UserCheck,
  Eye,
  Crown,
  Star
} from 'lucide-react';
import { useStore } from '../../store/useStore';

type AuthScreen = 'login' | 'forgot-password' | 'reset-success';
type UserType = 'admin' | 'user';

interface ForgotPasswordData {
  email: string;
  phone: string;
  userType: UserType;
}

export default function LoginForm() {
  const [email, setEmail] = useState('admin@globalcyberit.com');
  const [password, setPassword] = useState('admin123');
  const [currentScreen, setCurrentScreen] = useState<AuthScreen>('login');
  const [forgotData, setForgotData] = useState<ForgotPasswordData>({
    email: '',
    phone: '',
    userType: 'admin'
  });
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState<string | null>(null);
  const [forgotSuccess, setForgotSuccess] = useState(false);
  
  const { login, loading, error, initializeApp } = useStore();

  // Initialize the application when component mounts
  useEffect(() => {
    console.log('🔄 LoginForm mounted - initializing app');
    initializeApp();
  }, [initializeApp]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🔐 Form submitted - attempting login with:', { email, password });
    
    try {
      const success = await login(email, password);
      console.log('🔍 Login result:', success);
      
      if (success) {
        console.log('✅ Login successful - user should be redirected');
      } else {
        console.log('❌ Login failed');
      }
    } catch (error) {
      console.error('❌ Login error:', error);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotError(null);

    try {
      // Simulate forgot password process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(forgotData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Validate phone format (Indian)
      const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
      if (!phoneRegex.test(forgotData.phone)) {
        throw new Error('Please enter a valid Indian phone number');
      }

      // Check if valid demo credentials
      const validEmails = [
        'admin@globalcyberit.com',
        'rajesh@globalcyberit.com',
        'priya@globalcyberit.com', 
        'amit@globalcyberit.com',
        'sneha@globalcyberit.com'
      ];

      if (validEmails.includes(forgotData.email)) {
        setForgotSuccess(true);
        setCurrentScreen('reset-success');
      } else {
        throw new Error('No account found with this email address');
      }
    } catch (error: any) {
      setForgotError(error.message);
    } finally {
      setForgotLoading(false);
    }
  };

  const resetForgotForm = () => {
    setForgotData({
      email: '',
      phone: '',
      userType: 'admin'
    });
    setForgotError(null);
    setForgotSuccess(false);
    setCurrentScreen('login');
  };

  const quickLogin = (userEmail: string, userPassword: string) => {
    console.log('🚀 Quick login clicked:', { userEmail, userPassword });
    setEmail(userEmail);
    setPassword(userPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <img 
                src="https://pub-cdn.sider.ai/u/U0Y3HGVYKOY/web-coder/68696f720dd11641ee25c3cd/resource/90441119-b118-4ef3-a4e2-cd32f4917cfb.png" 
                alt="Global Cyber IT Logo" 
                className="h-16 w-auto"
              />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-slate-800 to-green-600 bg-clip-text text-transparent">
              Enterprise HR System
            </h1>
            <p className="text-xl text-gray-600">
              Indian GST Support & Multi-User Portal
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-orange-100">
              <div className="flex items-center space-x-3 mb-3">
                <Building2 className="h-8 w-8 text-orange-600" />
                <h3 className="font-semibold text-gray-800">GST Compliant</h3>
              </div>
              <p className="text-sm text-gray-600">
                Full Indian GST support with automatic tax calculations and e-Invoice generation
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
              <div className="flex items-center space-x-3 mb-3">
                <Users className="h-8 w-8 text-green-600" />
                <h3 className="font-semibold text-gray-800">Multi-User Portal</h3>
              </div>
              <p className="text-sm text-gray-600">
                Role-based access with Admin, Manager, Staff, and Viewer permissions
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
              <div className="flex items-center space-x-3 mb-3">
                <TrendingUp className="h-8 w-8 text-blue-600" />
                <h3 className="font-semibold text-gray-800">Business Analytics</h3>
              </div>
              <p className="text-sm text-gray-600">
                Real-time dashboards with Indian business metrics and HR reporting
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100">
              <div className="flex items-center space-x-3 mb-3">
                <Shield className="h-8 w-8 text-purple-600" />
                <h3 className="font-semibold text-gray-800">Secure & Scalable</h3>
              </div>
              <p className="text-sm text-gray-600">
                Enterprise-grade security with role-based access and complete audit trails
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Login/Forgot Password Forms */}
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-2xl border-0">
            {/* Login Screen */}
            {currentScreen === 'login' && (
              <>
                <CardHeader className="text-center pb-8">
                  <div className="mx-auto mb-4 lg:hidden">
                    <img 
                      src="https://pub-cdn.sider.ai/u/U0Y3HGVYKOY/web-coder/68696f720dd11641ee25c3cd/resource/90441119-b118-4ef3-a4e2-cd32f4917cfb.png" 
                      alt="Global Cyber IT Logo" 
                      className="h-12 w-auto mx-auto"
                    />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    Welcome Back
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Sign in to your Enterprise HR System
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="h-11"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="h-11"
                        required
                      />
                    </div>

                    {/* Forgot Password Link */}
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={() => setCurrentScreen('forgot-password')}
                        className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                      >
                        Forgot Password?
                      </button>
                    </div>

                    {error && (
                      <Alert className="border-red-200 bg-red-50">
                        <AlertDescription className="text-red-700">
                          {error}
                        </AlertDescription>
                      </Alert>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full h-11 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-medium"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing In...
                        </>
                      ) : (
                        'Sign In'
                      )}
                    </Button>
                  </form>

                  {/* HR User Portal Demo Credentials */}
                  <div className="mt-8 space-y-4">
                    <h4 className="font-medium text-gray-800 text-center">Demo HR Portal Accounts:</h4>
                    
                    {/* Admin Account */}
                    <div className="p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border border-red-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Shield className="h-4 w-4 text-red-600" />
                          <span className="font-semibold text-red-700">HR Administrator</span>
                          <Star className="h-3 w-3 text-red-500" />
                        </div>
                        <button
                          onClick={() => quickLogin('admin@globalcyberit.com', 'admin123')}
                          className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                        >
                          Quick Login
                        </button>
                      </div>
                      <div className="text-sm text-red-600 space-y-1">
                        <p><strong>Email:</strong> admin@globalcyberit.com</p>
                        <p><strong>Password:</strong> admin123</p>
                        <p className="text-xs">Full access to all HR modules, user management, settings</p>
                      </div>
                    </div>

                    {/* HR Manager Account */}
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="h-4 w-4 text-blue-600" />
                          <span className="font-semibold text-blue-700">HR Manager</span>
                        </div>
                        <button
                          onClick={() => quickLogin('rajesh@globalcyberit.com', 'user123')}
                          className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                        >
                          Quick Login
                        </button>
                      </div>
                      <div className="text-sm text-blue-600 space-y-1">
                        <p><strong>Email:</strong> rajesh@globalcyberit.com</p>
                        <p><strong>Password:</strong> user123</p>
                        <p className="text-xs">Employee management, attendance, leave approvals</p>
                      </div>
                    </div>

                    {/* Staff Accounts */}
                    <div className="grid grid-cols-1 gap-3">
                      <div className="p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <UserCheck className="h-4 w-4 text-green-600" />
                            <span className="font-semibold text-green-700 text-sm">HR Staff</span>
                          </div>
                          <button
                            onClick={() => quickLogin('priya@globalcyberit.com', 'user123')}
                            className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                          >
                            Login
                          </button>
                        </div>
                        <div className="text-xs text-green-600">
                          <p><strong>Email:</strong> priya@globalcyberit.com</p>
                          <p>Employee records, recruitment, basic reports</p>
                        </div>
                      </div>

                      <div className="p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <UserCheck className="h-4 w-4 text-purple-600" />
                            <span className="font-semibold text-purple-700 text-sm">Payroll Staff</span>
                          </div>
                          <button
                            onClick={() => quickLogin('amit@globalcyberit.com', 'user123')}
                            className="text-xs bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700"
                          >
                            Login
                          </button>
                        </div>
                        <div className="text-xs text-purple-600">
                          <p><strong>Email:</strong> amit@globalcyberit.com</p>
                          <p>Payroll processing, attendance, performance</p>
                        </div>
                      </div>

                      <div className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Eye className="h-4 w-4 text-gray-600" />
                            <span className="font-semibold text-gray-700 text-sm">Finance Viewer</span>
                          </div>
                          <button
                            onClick={() => quickLogin('sneha@globalcyberit.com', 'user123')}
                            className="text-xs bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700"
                          >
                            Login
                          </button>
                        </div>
                        <div className="text-xs text-gray-600">
                          <p><strong>Email:</strong> sneha@globalcyberit.com</p>
                          <p>View-only access to payroll and reports</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                      © 2024 Global Cyber IT. All rights reserved.
                    </p>
                  </div>
                </CardContent>
              </>
            )}

            {/* Forgot Password Screen */}
            {currentScreen === 'forgot-password' && (
              <>
                <CardHeader className="text-center pb-6">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full flex items-center justify-center mb-4">
                    <Key className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    Reset Password
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Enter your details to reset your password
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleForgotPassword} className="space-y-6">
                    {/* User Type Selection */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-gray-700">Account Type</Label>
                      <Tabs 
                        value={forgotData.userType} 
                        onValueChange={(value) => setForgotData(prev => ({ ...prev, userType: value as UserType }))}
                        className="w-full"
                      >
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="admin" className="flex items-center space-x-2">
                            <Shield className="h-4 w-4" />
                            <span>Admin</span>
                          </TabsTrigger>
                          <TabsTrigger value="user" className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>User</span>
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="forgot-email" className="text-sm font-medium text-gray-700">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="forgot-email"
                          type="email"
                          value={forgotData.email}
                          onChange={(e) => setForgotData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="Enter your registered email"
                          className="h-11 pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="forgot-phone" className="text-sm font-medium text-gray-700">
                        Phone Number
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="forgot-phone"
                          type="tel"
                          value={forgotData.phone}
                          onChange={(e) => setForgotData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+91 9876543210"
                          className="h-11 pl-10"
                          required
                        />
                      </div>
                      <p className="text-xs text-gray-500">Enter your registered phone number for verification</p>
                    </div>

                    {forgotError && (
                      <Alert className="border-red-200 bg-red-50">
                        <AlertDescription className="text-red-700">
                          {forgotError}
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-3">
                      <Button 
                        type="submit" 
                        className="w-full h-11 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-medium"
                        disabled={forgotLoading}
                      >
                        {forgotLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending Reset Instructions...
                          </>
                        ) : (
                          'Send Reset Instructions'
                        )}
                      </Button>

                      <Button 
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentScreen('login')}
                        className="w-full h-11"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Login
                      </Button>
                    </div>
                  </form>

                  {/* Demo Info for Forgot Password */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                    <h4 className="font-medium text-gray-800 mb-2">Valid Demo Reset Emails:</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Admin:</strong> admin@globalcyberit.com</p>
                      <p><strong>Users:</strong> rajesh@, priya@, amit@, sneha@globalcyberit.com</p>
                      <p><strong>Phone:</strong> Any valid Indian format (+91 9876543210)</p>
                    </div>
                  </div>
                </CardContent>
              </>
            )}

            {/* Reset Success Screen */}
            {currentScreen === 'reset-success' && (
              <>
                <CardHeader className="text-center pb-6">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    Reset Instructions Sent
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Check your email and phone for password reset instructions
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div className="space-y-2">
                        <h4 className="font-medium text-green-800">Instructions Sent Successfully</h4>
                        <div className="text-sm text-green-700 space-y-1">
                          <p>• Email sent to: <strong>{forgotData.email}</strong></p>
                          <p>• SMS sent to: <strong>{forgotData.phone}</strong></p>
                          <p>• Account type: <strong>{forgotData.userType === 'admin' ? 'Administrator' : 'User'}</strong></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-800">Next Steps:</h4>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-medium text-xs">1</div>
                        <span>Check your email inbox and spam folder</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-medium text-xs">2</div>
                        <span>Check your phone for SMS with reset code</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-medium text-xs">3</div>
                        <span>Follow the instructions to create a new password</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-medium text-xs">4</div>
                        <span>Login with your new password</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      onClick={resetForgotForm}
                      className="w-full h-11 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-medium"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Login
                    </Button>

                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentScreen('forgot-password')}
                      className="w-full h-11"
                    >
                      Send Again
                    </Button>
                  </div>

                  {/* Demo Notice */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                    <div className="flex items-start space-x-2">
                      <Lock className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <div className="text-sm text-yellow-800">
                        <strong>Demo Mode:</strong> In production, you would receive actual email and SMS with secure reset links.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
