/**
 * Asset Tracking with QR Code scanning and real-time location monitoring
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { 
  QrCode, 
  MapPin, 
  Calendar, 
  User, 
  Search, 
  Filter,
  Scan,
  History,
  AlertTriangle,
  CheckCircle,
  Clock,
  Monitor,
  Laptop,
  Server,
  Smartphone
} from 'lucide-react';

interface TrackingEntry {
  id: string;
  assetTag: string;
  assetName: string;
  action: string;
  location: string;
  user: string;
  timestamp: string;
  notes?: string;
}

const mockTrackingData: TrackingEntry[] = [
  {
    id: '1',
    assetTag: 'LT-001',
    assetName: 'MacBook Pro 16"',
    action: 'Check-out',
    location: 'Mumbai Office - Floor 3',
    user: 'Rajesh Kumar',
    timestamp: '2024-12-06T09:30:00Z',
    notes: 'Assigned for development work'
  },
  {
    id: '2',
    assetTag: 'DT-001',
    assetName: 'Dell OptiPlex 7090',
    action: 'Location Update',
    location: 'Delhi Office - HR Department',
    user: 'Priya Sharma',
    timestamp: '2024-12-06T08:15:00Z',
    notes: 'Moved to new workstation'
  },
  {
    id: '3',
    assetTag: 'SRV-001',
    assetName: 'HP ProLiant DL380',
    action: 'Maintenance Start',
    location: 'Data Center - Rack A1',
    user: 'IT Support',
    timestamp: '2024-12-05T16:45:00Z',
    notes: 'Scheduled maintenance for OS updates'
  },
  {
    id: '4',
    assetTag: 'PR-001',
    assetName: 'Canon imageRUNNER',
    action: 'Issue Reported',
    location: 'Bangalore Office - Print Room',
    user: 'Sneha Reddy',
    timestamp: '2024-12-05T14:20:00Z',
    notes: 'Paper jam and toner low'
  },
  {
    id: '5',
    assetTag: 'MB-001',
    assetName: 'iPhone 14 Pro',
    action: 'Check-in',
    location: 'Chennai Office - Reception',
    user: 'Amit Patel',
    timestamp: '2024-12-05T11:30:00Z',
    notes: 'Device returned after assignment completion'
  }
];

const actionColors = {
  'Check-out': 'bg-blue-100 text-blue-800',
  'Check-in': 'bg-green-100 text-green-800',
  'Location Update': 'bg-yellow-100 text-yellow-800',
  'Maintenance Start': 'bg-orange-100 text-orange-800',
  'Maintenance Complete': 'bg-emerald-100 text-emerald-800',
  'Issue Reported': 'bg-red-100 text-red-800',
  'Issue Resolved': 'bg-purple-100 text-purple-800'
};

export default function AssetTracking() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState('all');
  const [trackingData, setTrackingData] = useState<TrackingEntry[]>(mockTrackingData);
  const [scanMode, setScanMode] = useState(false);
  const [scannedCode, setScannedCode] = useState('');

  const filteredTracking = trackingData.filter(entry => {
    const matchesSearch = entry.assetTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = selectedAction === 'all' || entry.action === selectedAction;
    
    return matchesSearch && matchesAction;
  });

  const handleQRScan = () => {
    setScanMode(true);
    // In a real application, this would open camera for QR scanning
    // For demo, we'll simulate scanning
    setTimeout(() => {
      setScannedCode('LT-001');
      setScanMode(false);
      // Add tracking entry for scanned asset
      const newEntry: TrackingEntry = {
        id: (trackingData.length + 1).toString(),
        assetTag: 'LT-001',
        assetName: 'MacBook Pro 16"',
        action: 'Location Update',
        location: 'Current Location',
        user: 'Current User',
        timestamp: new Date().toISOString(),
        notes: 'QR Code scanned'
      };
      setTrackingData([newEntry, ...trackingData]);
    }, 2000);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString()
    };
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Asset Tracking</h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">
              Track asset movements and activities in real-time
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handleQRScan}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={scanMode}
            >
              {scanMode ? (
                <>
                  <Scan className="h-4 w-4 mr-2 animate-pulse" />
                  Scanning...
                </>
              ) : (
                <>
                  <QrCode className="h-4 w-4 mr-2" />
                  Scan QR Code
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Active Assets', value: '98', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
            { title: 'In Transit', value: '5', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
            { title: 'Under Maintenance', value: '8', icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50' },
            { title: 'Recent Activities', value: '23', icon: History, color: 'text-blue-600', bg: 'bg-blue-50' }
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className={`${stat.bg} border-0 shadow-sm`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-600">{stat.title}</p>
                    </div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Filters */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by asset tag, name, or user..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <select
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Actions</option>
                <option value="Check-out">Check-out</option>
                <option value="Check-in">Check-in</option>
                <option value="Location Update">Location Update</option>
                <option value="Maintenance Start">Maintenance Start</option>
                <option value="Issue Reported">Issue Reported</option>
              </select>
              
              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Scans */}
        {scannedCode && (
          <Card className="bg-green-50 border-green-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <QrCode className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-green-900">QR Code Scanned Successfully</p>
                  <p className="text-sm text-green-700">Asset Tag: {scannedCode} - Location updated</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tracking History */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Tracking History</span>
              <Badge variant="outline">{filteredTracking.length} entries</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTracking.map((entry) => {
                const timestamp = formatTimestamp(entry.timestamp);
                return (
                  <div key={entry.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-shrink-0">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <History className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-medium text-gray-900">{entry.assetName}</h3>
                          <Badge variant="outline" className="text-xs">{entry.assetTag}</Badge>
                          <Badge className={actionColors[entry.action as keyof typeof actionColors]}>
                            {entry.action}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-900">{timestamp.date}</p>
                          <p className="text-xs text-gray-500">{timestamp.time}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-700">{entry.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-700">{entry.user}</span>
                        </div>
                      </div>
                      
                      {entry.notes && (
                        <div className="mt-2 p-2 bg-white rounded border-l-4 border-blue-500">
                          <p className="text-sm text-gray-600 italic">{entry.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* QR Code Generation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Generate QR Codes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Asset Tag
                </label>
                <Input placeholder="Enter asset tag (e.g., LT-001)" />
              </div>
              <Button className="w-full">
                <QrCode className="h-4 w-4 mr-2" />
                Generate QR Code
              </Button>
              <div className="p-8 bg-gray-50 rounded-lg text-center">
                <div className="w-32 h-32 bg-white mx-auto rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 mt-2">QR Code will appear here</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Tracking Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-sm">1</div>
                  <div>
                    <h4 className="font-medium text-gray-900">Scan Asset QR Code</h4>
                    <p className="text-sm text-gray-600">Use the scan button or mobile app to scan asset QR codes</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-sm">2</div>
                  <div>
                    <h4 className="font-medium text-gray-900">Update Location</h4>
                    <p className="text-sm text-gray-600">Automatic location detection or manual entry</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-sm">3</div>
                  <div>
                    <h4 className="font-medium text-gray-900">Add Notes</h4>
                    <p className="text-sm text-gray-600">Include relevant information about the asset status</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-sm">4</div>
                  <div>
                    <h4 className="font-medium text-gray-900">Track History</h4>
                    <p className="text-sm text-gray-600">View complete movement and activity history</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
