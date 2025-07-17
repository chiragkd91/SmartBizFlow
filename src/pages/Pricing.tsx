/**
 * Pricing and Business Models page for Smart ERP + CRM
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Check, 
  Star, 
  Building2, 
  Users, 
  Crown, 
  Calendar,
  CreditCard,
  Shield,
  Zap,
  BarChart3,
  Settings,
  Smartphone,
  Globe,
  HeadphonesIcon,
  ArrowRight,
  IndianRupee,
  TrendingUp,
  Award,
  Target
} from 'lucide-react';

const Pricing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'license' | 'saas' | 'whitelabel'>('license');

  const licenseModels = [
    {
      type: 'Small Business',
      icon: Building2,
      price: '₹75,000 - ₹1.5 Lakh',
      description: 'Perfect for startups and small businesses',
      features: [
        'Basic ERP Module',
        'CRM with Lead Management',
        'GST Compliant Invoicing',
        'Inventory Management',
        'Basic Reporting',
        'Email Support',
        'Up to 5 Users',
        'Indian Tax Compliance'
      ],
      excludes: [
        'Automation Workflows',
        'Advanced Analytics',
        'API Access',
        'Custom Modules'
      ],
      popular: false,
      color: 'from-green-500 to-green-600'
    },
    {
      type: 'Mid-size Firm',
      icon: Users,
      price: '₹2 Lakh - ₹5 Lakh',
      description: 'Ideal for growing businesses with automation needs',
      features: [
        'Complete ERP + CRM Suite',
        'Automation Workflows',
        'Advanced Reports & Analytics',
        'Multi-location Support',
        'Role-based Access Control',
        'Priority Support',
        'Up to 50 Users',
        'API Integration',
        'Custom Dashboard',
        'GST Returns Automation'
      ],
      excludes: [
        'White-label Options',
        'Custom Development'
      ],
      popular: true,
      color: 'from-blue-500 to-blue-600'
    },
    {
      type: 'Enterprise',
      icon: Crown,
      price: '₹6 Lakh - ₹15 Lakh+',
      description: 'Complete solution for large organizations',
      features: [
        'Full ERP + CRM Suite',
        'Advanced Analytics & BI',
        'Complete API Access',
        'Custom Module Development',
        'Unlimited Users',
        'Dedicated Support Manager',
        'Training & Onboarding',
        'Multi-tenant Architecture',
        'Advanced Security Features',
        'Custom Integrations',
        'White-label Ready',
        'Enterprise SLA'
      ],
      excludes: [],
      popular: false,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const saasPlans = [
    {
      name: 'Starter Plan',
      price: '₹999 - ₹1,999',
      period: '/month',
      users: '5 Users',
      description: 'Essential tools for small teams',
      features: [
        'CRM & Lead Management',
        'Basic Inventory Management',
        'GST Invoicing',
        'Email Support',
        'Mobile App Access',
        'Basic Reports'
      ],
      annual: '₹9,999/year (2 months free)',
      color: 'border-green-200',
      buttonColor: 'bg-green-600 hover:bg-green-700'
    },
    {
      name: 'Professional',
      price: '₹2,999 - ₹5,999',
      period: '/month',
      users: '20 Users',
      description: 'Advanced features for growing businesses',
      features: [
        'Everything in Starter',
        'Automation Workflows',
        'Advanced Analytics',
        'Multi-location Support',
        'Priority Support',
        'API Access',
        'Custom Fields',
        'Advanced GST Features'
      ],
      annual: '₹29,999/year (4 months free)',
      popular: true,
      color: 'border-blue-500',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Enterprise',
      price: '₹10,000+',
      period: '/month',
      users: 'Unlimited',
      description: 'Complete solution with custom support',
      features: [
        'Everything in Professional',
        'Custom Module Development',
        'Dedicated Account Manager',
        'Advanced Security',
        'Custom Integrations',
        'Training & Onboarding',
        'White-label Options',
        'Enterprise SLA'
      ],
      annual: '₹99,999/year (Enterprise discount)',
      color: 'border-purple-200',
      buttonColor: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  const whiteLabelOptions = [
    {
      type: 'Per Client License',
      price: '₹1 Lakh - ₹5 Lakh',
      description: 'Custom branding for individual clients',
      features: [
        'Client\'s Logo & Branding',
        'Custom Color Scheme',
        'White-label Documentation',
        'Reseller Support',
        'Basic Customization',
        'Setup & Training'
      ],
      bestFor: 'Software Resellers, Consultants',
      icon: Target
    },
    {
      type: 'Unlimited License',
      price: '₹10 Lakh - ₹25 Lakh+',
      description: 'Complete white-label solution',
      features: [
        'Unlimited Client Deployments',
        'Full Source Code Access',
        'Complete Rebranding Rights',
        'Custom Module Development',
        'Ongoing Technical Support',
        'Marketing Materials',
        'Training & Certification',
        'Revenue Sharing Options'
      ],
      bestFor: 'System Integrators, Large Partners',
      icon: Award
    }
  ];

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-orange-50 via-white to-green-50 min-h-screen">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <img 
            src="https://pub-cdn.sider.ai/u/U0Y3HGVYKOY/web-coder/68696f720dd11641ee25c3cd/resource/90441119-b118-4ef3-a4e2-cd32f4917cfb.png" 
            alt="Global Cyber IT Logo" 
            className="h-12 w-auto"
          />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-slate-800 to-green-600 bg-clip-text text-transparent">
            Smart ERP + CRM Pricing
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choose the perfect plan for your business. All plans include Indian GST support, 
          mobile access, and comprehensive training.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="flex bg-white rounded-lg p-1 shadow-lg border border-gray-200">
          <button
            onClick={() => setActiveTab('license')}
            className={`px-6 py-3 rounded-md font-medium transition-all ${
              activeTab === 'license'
                ? 'bg-orange-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <CreditCard className="inline-block w-4 h-4 mr-2" />
            One-time License
          </button>
          <button
            onClick={() => setActiveTab('saas')}
            className={`px-6 py-3 rounded-md font-medium transition-all ${
              activeTab === 'saas'
                ? 'bg-orange-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Calendar className="inline-block w-4 h-4 mr-2" />
            SaaS Subscription
          </button>
          <button
            onClick={() => setActiveTab('whitelabel')}
            className={`px-6 py-3 rounded-md font-medium transition-all ${
              activeTab === 'whitelabel'
                ? 'bg-orange-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Shield className="inline-block w-4 h-4 mr-2" />
            White-Label
          </button>
        </div>
      </div>

      {/* One-time License Model */}
      {activeTab === 'license' && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-800">One-time License Model</h2>
            <p className="text-gray-600">Pay once, use forever. Perfect for businesses who prefer ownership.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {licenseModels.map((model, index) => {
              const Icon = model.icon;
              return (
                <Card 
                  key={index} 
                  className={`relative overflow-hidden border-2 ${
                    model.popular ? 'border-orange-500 shadow-xl scale-105' : 'border-gray-200'
                  } transition-all hover:shadow-lg`}
                >
                  {model.popular && (
                    <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-r ${model.color} flex items-center justify-center mb-4`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-800">{model.type}</CardTitle>
                    <div className="flex items-center justify-center space-x-1">
                      <IndianRupee className="h-5 w-5 text-orange-600" />
                      <span className="text-3xl font-bold text-orange-600">{model.price}</span>
                    </div>
                    <p className="text-gray-600">{model.description}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-green-700 flex items-center">
                        <Check className="h-4 w-4 mr-2" />
                        Included Features
                      </h4>
                      <ul className="space-y-2">
                        {model.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm">
                            <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {model.excludes.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-500">Not Included</h4>
                        <ul className="space-y-2">
                          {model.excludes.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-500">
                              <span className="h-4 w-4 mr-2 flex-shrink-0">×</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Button 
                      className={`w-full bg-gradient-to-r ${model.color} text-white hover:opacity-90 transition-all`}
                    >
                      Get Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* SaaS Subscription Model */}
      {activeTab === 'saas' && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-800">SaaS Subscription Model</h2>
            <p className="text-gray-600">Flexible monthly plans with no upfront costs. Scale as you grow.</p>
            <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span>Annual plans include significant discounts</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {saasPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative ${plan.color} ${
                  plan.popular ? 'shadow-xl scale-105 border-2' : ''
                } transition-all hover:shadow-lg`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-orange-500 text-white px-4 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Recommended
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center">
                      <span className="text-3xl font-bold text-gray-800">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{plan.users}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                    <div className="text-sm text-green-700 font-medium">Annual Pricing</div>
                    <div className="text-green-800 font-bold">{plan.annual}</div>
                  </div>

                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button className={`w-full ${plan.buttonColor} text-white`}>
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    14-day free trial • No credit card required
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* White-Label Model */}
      {activeTab === 'whitelabel' && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-800">White-Label Licensing</h2>
            <p className="text-gray-600">Resell our solution with your own branding. Perfect for partners and integrators.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {whiteLabelOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <Card key={index} className="border-2 border-gray-200 hover:shadow-lg transition-all">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold">{option.type}</CardTitle>
                    <div className="flex items-center justify-center space-x-1">
                      <IndianRupee className="h-5 w-5 text-indigo-600" />
                      <span className="text-3xl font-bold text-indigo-600">{option.price}</span>
                    </div>
                    <p className="text-gray-600">{option.description}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                      <div className="text-sm font-medium text-indigo-700">Best For:</div>
                      <div className="text-indigo-800">{option.bestFor}</div>
                    </div>

                    <ul className="space-y-2">
                      {option.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90">
                      Contact Sales
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom CTA Section */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h3>
        <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
          Join hundreds of Indian businesses already using our Smart ERP + CRM solution. 
          Get a personalized demo and see how we can help streamline your operations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3">
            <HeadphonesIcon className="mr-2 h-5 w-5" />
            Schedule Demo
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-orange-800 px-8 py-3">
            <Smartphone className="mr-2 h-5 w-5" />
            Contact Sales: +91 98765 43210
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h4 className="font-semibold">GST Compliant</h4>
          <p className="text-sm text-gray-600">100% Indian tax compliance</p>
        </div>
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Smartphone className="h-6 w-6 text-blue-600" />
          </div>
          <h4 className="font-semibold">Mobile Ready</h4>
          <p className="text-sm text-gray-600">Works on all devices</p>
        </div>
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
            <Globe className="h-6 w-6 text-purple-600" />
          </div>
          <h4 className="font-semibold">Cloud Based</h4>
          <p className="text-sm text-gray-600">Access from anywhere</p>
        </div>
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
            <HeadphonesIcon className="h-6 w-6 text-orange-600" />
          </div>
          <h4 className="font-semibold">24/7 Support</h4>
          <p className="text-sm text-gray-600">Always here to help</p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
