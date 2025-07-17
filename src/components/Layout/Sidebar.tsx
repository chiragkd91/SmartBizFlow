/**
 * Responsive sidebar navigation for Smart ERP + CRM + HR + IT Asset Portal
 * Includes role-based navigation and mobile-friendly design
 */

import { useState } from 'react';
import { useLocation } from 'react-router';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { useStore } from '../../store/useStore';
import {
  LayoutDashboard,
  Users,
  Package,
  TrendingUp,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
  ChevronDown,
  Building2,
  ShoppingCart,
  UserCheck,
  Receipt,
  BarChart3,
  Zap,
  FolderOpen,
  Shield,
  Calendar,
  DollarSign,
  Target,
  Award,
  UserPlus,
  ClipboardList,
  Laptop,
  Monitor,
  Wrench,
  Key,
  HardDrive,
  QrCode,
  Database
} from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: any;
  badge?: string;
  children?: NavItem[];
  permissions?: string[];
}

const navigationItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    permissions: ['dashboard.view']
  },
  {
    title: 'CRM Portal',
    href: '/crm',
    icon: TrendingUp,
    badge: 'CRM',
    permissions: ['crm.view'],
    children: [
      { title: 'CRM Overview', href: '/crm', icon: BarChart3, permissions: ['crm.view'] },
      { title: 'Leads Management', href: '/crm/leads', icon: Users, permissions: ['leads.view'] },
      { title: 'Customer Management', href: '/crm/customers', icon: UserCheck, permissions: ['customers.view'] }
    ]
  },
  {
    title: 'ERP Portal',
    href: '/erp',
    icon: Package,
    badge: 'ERP',
    permissions: ['erp.view'],
    children: [
      { title: 'ERP Overview', href: '/erp', icon: BarChart3, permissions: ['erp.view'] },
      { title: 'Products', href: '/erp/products', icon: Package, permissions: ['products.view'] },
      { title: 'Orders', href: '/erp/orders', icon: ShoppingCart, permissions: ['orders.view'] },
      { title: 'Invoices', href: '/erp/invoices', icon: Receipt, permissions: ['invoices.view'] },
      { title: 'Vendors', href: '/erp/vendors', icon: Building2, permissions: ['vendors.view'] }
    ]
  },
  {
    title: 'HR Portal',
    href: '/hr',
    icon: Users,
    badge: 'HR',
    permissions: ['hr.view'],
    children: [
      { title: 'HR Dashboard', href: '/hr', icon: LayoutDashboard, permissions: ['hr.view'] },
      { title: 'Employees', href: '/hr/employees', icon: Users, permissions: ['employees.view'] },
      { title: 'Attendance', href: '/hr/attendance', icon: Calendar, permissions: ['attendance.view'] },
      { title: 'Leave Management', href: '/hr/leave', icon: ClipboardList, permissions: ['leave.view'] },
      { title: 'Payroll', href: '/hr/payroll', icon: DollarSign, permissions: ['payroll.view'] },
      { title: 'Performance', href: '/hr/performance', icon: Target, permissions: ['performance.view'] },
      { title: 'Recruitment', href: '/hr/recruitment', icon: UserPlus, permissions: ['recruitment.view'] },
      { title: 'HR Reports', href: '/hr/reports', icon: BarChart3, permissions: ['hr.view'] }
    ]
  },
  {
    title: 'IT Asset Portal',
    href: '/assets',
    icon: Laptop,
    badge: 'IT',
    permissions: ['assets.view'],
    children: [
      { title: 'Asset Dashboard', href: '/assets', icon: LayoutDashboard, permissions: ['assets.view'] },
      { title: 'Asset Management', href: '/assets/management', icon: Monitor, permissions: ['assets.view'] },
      { title: 'Asset Tracking', href: '/assets/tracking', icon: QrCode, permissions: ['assets.view'] },
      { title: 'Maintenance', href: '/assets/maintenance', icon: Wrench, permissions: ['assets.view'] },
      { title: 'Software Licenses', href: '/assets/software', icon: Key, permissions: ['assets.view'] },
      { title: 'IT Inventory', href: '/assets/inventory', icon: HardDrive, permissions: ['assets.view'] },
      { title: 'Asset Reports', href: '/assets/reports', icon: BarChart3, permissions: ['assets.view'] }
    ]
  },
  {
    title: 'GST & Invoicing',
    href: '/gst',
    icon: FileText,
    badge: 'GST',
    permissions: ['gst.view']
  },
  {
    title: 'Reports & Analytics',
    href: '/reports',
    icon: BarChart3,
    permissions: ['reports.view']
  },
  {
    title: 'Automation Hub',
    href: '/automation',
    icon: Zap,
    permissions: ['automation.view']
  },
  {
    title: 'File Management',
    href: '/files',
    icon: FolderOpen,
    permissions: ['files.view']
  },
  {
    title: 'User Management',
    href: '/users',
    icon: Shield,
    permissions: ['users.view']
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    permissions: ['settings.view']
  }
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation();
  const { currentUser, logout } = useStore();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const hasPermission = (permissions: string[] = []) => {
    if (!currentUser) return false;
    if (currentUser.role === 'admin') return true;
    return permissions.some(permission => currentUser.permissions.includes(permission));
  };

  const isActive = (href: string) => {
    if (href === '/dashboard' && (location.pathname === '/' || location.pathname === '/dashboard')) {
      return true;
    }
    return location.pathname === href || (href !== '/dashboard' && location.pathname.startsWith(href));
  };

  const filteredNavItems = navigationItems.filter(item => hasPermission(item.permissions));

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out z-50 lg:relative lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } w-72 lg:w-64 xl:w-72`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <img 
                src="https://pub-cdn.sider.ai/u/U0Y3HGVYKOY/web-coder/68696f720dd11641ee25c3cd/resource/90441119-b118-4ef3-a4e2-cd32f4917cfb.png" 
                alt="Global Cyber IT Logo" 
                className="h-8 w-auto"
              />
              <div>
                <h2 className="text-lg font-bold text-gray-900">Global Cyber IT</h2>
                <p className="text-xs text-gray-600">Business Portal</p>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                {currentUser?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {currentUser?.name}
                </p>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={currentUser?.role === 'admin' ? 'default' : 'secondary'} 
                    className="text-xs capitalize"
                  >
                    {currentUser?.role}
                  </Badge>
                  <span className="text-xs text-gray-500">{currentUser?.department}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-1">
              {filteredNavItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                const hasChildren = item.children && item.children.length > 0;
                const isExpanded = expandedItems.includes(item.title);

                return (
                  <div key={item.title}>
                    <Button
                      variant={active && !hasChildren ? "default" : "ghost"}
                      className={`w-full justify-start h-auto p-3 ${
                        active && !hasChildren
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => {
                        if (hasChildren) {
                          toggleExpanded(item.title);
                        } else {
                          window.location.href = item.href;
                          onClose();
                        }
                      }}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      <span className="flex-1 text-left text-sm font-medium">{item.title}</span>
                      {item.badge && (
                        <Badge 
                          variant="secondary" 
                          className="ml-2 text-xs bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 border-orange-200"
                        >
                          {item.badge}
                        </Badge>
                      )}
                      {hasChildren && (
                        <ChevronRight 
                          className={`ml-2 h-4 w-4 transition-transform ${
                            isExpanded ? 'transform rotate-90' : ''
                          }`} 
                        />
                      )}
                    </Button>

                    {/* Children */}
                    {hasChildren && isExpanded && (
                      <div className="ml-6 mt-1 space-y-1 border-l-2 border-gray-100 pl-4">
                        {item.children?.filter(child => hasPermission(child.permissions)).map((child) => {
                          const ChildIcon = child.icon;
                          const childActive = isActive(child.href);

                          return (
                            <Button
                              key={child.title}
                              variant={childActive ? "default" : "ghost"}
                              className={`w-full justify-start h-auto p-2 ${
                                childActive
                                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                                  : 'text-gray-600 hover:bg-gray-50'
                              }`}
                              onClick={() => {
                                window.location.href = child.href;
                                onClose();
                              }}
                            >
                              <ChildIcon className="mr-3 h-4 w-4" />
                              <span className="text-sm">{child.title}</span>
                            </Button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <Button
              variant="outline"
              className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-4 w-4" />
              <span className="text-sm">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
