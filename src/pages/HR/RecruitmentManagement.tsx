/**
 * Comprehensive Recruitment Management System
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { 
  UserPlus, 
  Briefcase, 
  Users, 
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Star,
  Phone,
  Mail,
  MapPin,
  Download,
  Send,
  Plus,
  Search,
  Filter,
  Building2,
  GraduationCap,
  TrendingUp
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';

interface JobOpening {
  id: string;
  title: string;
  department: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  experience: string;
  location: string;
  salaryRange: string;
  status: 'Active' | 'Closed' | 'On Hold';
  applicants: number;
  posted: string;
  deadline: string;
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: number;
  location: string;
  source: string;
  status: 'Applied' | 'Screening' | 'Interview' | 'Offered' | 'Hired' | 'Rejected';
  rating: number;
  appliedDate: string;
  nextStep: string;
}

const recruitmentData = [
  { month: 'Aug', applications: 120, interviews: 45, hired: 8 },
  { month: 'Sep', applications: 135, interviews: 52, hired: 12 },
  { month: 'Oct', applications: 142, interviews: 48, hired: 10 },
  { month: 'Nov', applications: 158, interviews: 62, hired: 15 },
  { month: 'Dec', applications: 167, interviews: 55, hired: 11 },
  { month: 'Jan', applications: 180, interviews: 68, hired: 18 }
];

const sourceData = [
  { name: 'Job Portals', value: 45, color: '#3B82F6' },
  { name: 'Referrals', value: 30, color: '#10B981' },
  { name: 'Social Media', value: 15, color: '#F59E0B' },
  { name: 'Campus', value: 10, color: '#EF4444' }
];

const mockJobOpenings: JobOpening[] = [
  {
    id: '1',
    title: 'Senior React Developer',
    department: 'IT',
    type: 'Full-time',
    experience: '3-5 years',
    location: 'Mumbai, Maharashtra',
    salaryRange: '₹8-12 LPA',
    status: 'Active',
    applicants: 45,
    posted: '2024-01-15',
    deadline: '2024-02-15'
  },
  {
    id: '2',
    title: 'Sales Manager',
    department: 'Sales',
    type: 'Full-time',
    experience: '5-8 years',
    location: 'Delhi, India',
    salaryRange: '₹12-18 LPA',
    status: 'Active',
    applicants: 32,
    posted: '2024-01-20',
    deadline: '2024-02-20'
  },
  {
    id: '3',
    title: 'Marketing Intern',
    department: 'Marketing',
    type: 'Internship',
    experience: '0-1 years',
    location: 'Bangalore, Karnataka',
    salaryRange: '₹15-25K/month',
    status: 'Active',
    applicants: 78,
    posted: '2024-01-10',
    deadline: '2024-02-10'
  }
];

const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Arjun Patel',
    email: 'arjun.patel@email.com',
    phone: '+91 98765 43210',
    position: 'Senior React Developer',
    experience: 4,
    location: 'Mumbai, Maharashtra',
    source: 'Job Portal',
    status: 'Interview',
    rating: 4.5,
    appliedDate: '2024-01-18',
    nextStep: 'Technical Round - Jan 25'
  },
  {
    id: '2',
    name: 'Kavya Sharma',
    email: 'kavya.sharma@email.com',
    phone: '+91 98765 43211',
    position: 'Sales Manager',
    experience: 6,
    location: 'Delhi, India',
    source: 'Referral',
    status: 'Offered',
    rating: 4.8,
    appliedDate: '2024-01-22',
    nextStep: 'Offer Response Due - Jan 30'
  },
  {
    id: '3',
    name: 'Rohit Kumar',
    email: 'rohit.kumar@email.com',
    phone: '+91 98765 43212',
    position: 'Marketing Intern',
    experience: 0,
    location: 'Bangalore, Karnataka',
    source: 'Campus',
    status: 'Screening',
    rating: 4.2,
    appliedDate: '2024-01-12',
    nextStep: 'HR Screening - Jan 26'
  }
];

export default function RecruitmentManagement() {
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>(mockJobOpenings);
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState<'jobs' | 'candidates'>('jobs');

  const filteredJobs = jobOpenings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || job.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || job.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || candidate.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getJobStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      case 'On Hold': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCandidateStatusColor = (status: string) => {
    switch (status) {
      case 'Applied': return 'bg-blue-100 text-blue-800';
      case 'Screening': return 'bg-yellow-100 text-yellow-800';
      case 'Interview': return 'bg-purple-100 text-purple-800';
      case 'Offered': return 'bg-green-100 text-green-800';
      case 'Hired': return 'bg-emerald-100 text-emerald-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const totalJobs = jobOpenings.length;
  const activeJobs = jobOpenings.filter(j => j.status === 'Active').length;
  const totalApplications = candidates.length;
  const interviewsScheduled = candidates.filter(c => c.status === 'Interview').length;

  const kpiCards = [
    {
      title: 'Active Jobs',
      value: `${activeJobs}/${totalJobs}`,
      subtitle: 'Open positions',
      icon: Briefcase,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Applications',
      value: totalApplications.toString(),
      subtitle: 'This month',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: 'Interviews',
      value: interviewsScheduled.toString(),
      subtitle: 'Scheduled',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      title: 'Hired',
      value: candidates.filter(c => c.status === 'Hired').length.toString(),
      subtitle: 'This month',
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Recruitment Management</h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">
              Manage job openings, candidates, and hiring pipeline
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Post New Job
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Post New Job Opening</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <p className="text-sm text-gray-600">
                    Create a new job opening and start recruiting top talent.
                  </p>
                  <Button className="w-full">Create Job Posting</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.title} className={`${card.bgColor} ${card.borderColor} border shadow-sm hover:shadow-md transition-shadow`}>
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${card.bgColor}`}>
                      <Icon className={`h-5 w-5 ${card.color}`} />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg lg:text-2xl font-bold text-gray-900">{card.value}</p>
                    <p className="text-sm text-gray-600">{card.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{card.subtitle}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
          {/* Recruitment Funnel */}
          <Card className="xl:col-span-2 bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg font-semibold">Recruitment Funnel</span>
                <Badge variant="outline">Last 6 Months</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 lg:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={recruitmentData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Area type="monotone" dataKey="applications" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="interviews" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="hired" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Source Distribution */}
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Application Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 lg:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      dataKey="value"
                      data={sourceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, value }) => `${name}: ${value}%`}
                      labelLine={false}
                    >
                      {sourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 border-b border-gray-200 bg-white rounded-t-lg">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-3 font-medium text-sm transition-colors ${
              activeTab === 'jobs'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Job Openings ({filteredJobs.length})
          </button>
          <button
            onClick={() => setActiveTab('candidates')}
            className={`px-4 py-3 font-medium text-sm transition-colors ${
              activeTab === 'candidates'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Candidates ({filteredCandidates.length})
          </button>
        </div>

        {/* Filters */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              <div className="flex-1 w-full lg:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder={activeTab === 'jobs' ? 'Search job openings...' : 'Search candidates...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                {activeTab === 'jobs' && (
                  <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="IT">IT</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="HR">HR</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                )}

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {activeTab === 'jobs' ? (
                      <>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                        <SelectItem value="On Hold">On Hold</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="Applied">Applied</SelectItem>
                        <SelectItem value="Screening">Screening</SelectItem>
                        <SelectItem value="Interview">Interview</SelectItem>
                        <SelectItem value="Offered">Offered</SelectItem>
                        <SelectItem value="Hired">Hired</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Tables */}
        {activeTab === 'jobs' ? (
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Job Openings ({filteredJobs.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Position</TableHead>
                      <TableHead className="hidden md:table-cell">Department</TableHead>
                      <TableHead className="hidden lg:table-cell">Experience</TableHead>
                      <TableHead className="hidden xl:table-cell">Salary Range</TableHead>
                      <TableHead className="hidden sm:table-cell">Applicants</TableHead>
                      <TableHead className="hidden lg:table-cell">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredJobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium text-gray-900">{job.title}</p>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <MapPin className="h-3 w-3" />
                              <span>{job.location}</span>
                              <Badge variant="outline" className="text-xs">{job.type}</Badge>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="outline">{job.department}</Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">{job.experience}</TableCell>
                        <TableCell className="hidden xl:table-cell font-medium">{job.salaryRange}</TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">{job.applicants}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <Badge className={getJobStatusColor(job.status)}>
                            {job.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Send className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Candidates ({filteredCandidates.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Candidate</TableHead>
                      <TableHead className="hidden md:table-cell">Position</TableHead>
                      <TableHead className="hidden lg:table-cell">Experience</TableHead>
                      <TableHead className="hidden xl:table-cell">Rating</TableHead>
                      <TableHead className="hidden sm:table-cell">Status</TableHead>
                      <TableHead className="hidden lg:table-cell">Next Step</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCandidates.map((candidate) => (
                      <TableRow key={candidate.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium text-gray-900">{candidate.name}</p>
                            <div className="flex items-center space-x-3 text-xs text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Mail className="h-3 w-3" />
                                <span>{candidate.email}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Phone className="h-3 w-3" />
                                <span>{candidate.phone}</span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <span className="text-sm">{candidate.position}</span>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex items-center space-x-1">
                            <GraduationCap className="h-4 w-4 text-gray-400" />
                            <span>{candidate.experience} years</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden xl:table-cell">
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {getRatingStars(candidate.rating)}
                            </div>
                            <span className="text-sm font-medium">{candidate.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge className={getCandidateStatusColor(candidate.status)}>
                            {candidate.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className="text-xs text-gray-600">{candidate.nextStep}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Phone className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
