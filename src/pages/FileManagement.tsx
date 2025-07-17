/**
 * File Management page with document upload and organization
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { formatRelativeTime } from '../lib/utils';
import { 
  Upload, 
  Search, 
  Filter,
  FolderOpen,
  FileText,
  Image,
  Film,
  Music,
  Archive,
  Download,
  Eye,
  Edit,
  Trash2,
  Share,
  Star,
  MoreVertical,
  Plus,
  Grid3X3,
  List,
  SortAsc
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';

const mockFiles = [
  {
    id: '1',
    name: 'Q4_2024_Financial_Report.pdf',
    type: 'PDF',
    size: '2.3 MB',
    category: 'document',
    folder: 'Financial Reports',
    uploadedBy: 'Sarah Johnson',
    uploadedAt: '2024-01-15T10:30:00Z',
    lastModified: '2024-01-15T10:30:00Z',
    thumbnail: 'https://pub-cdn.sider.ai/u/U0Y3HGVYKOY/web-coder/68696f720dd11641ee25c3cd/resource/84a883bd-7d58-4860-ad33-bec34df3be70.jpg',
    tags: ['financial', 'quarterly', 'report'],
    isStarred: true,
    isShared: false,
  },
  {
    id: '2',
    name: 'Cybersecurity_Policy_2024.docx',
    type: 'DOCX',
    size: '856 KB',
    category: 'document',
    folder: 'Policies',
    uploadedBy: 'Michael Chen',
    uploadedAt: '2024-01-14T14:20:00Z',
    lastModified: '2024-01-14T16:45:00Z',
    thumbnail: 'https://pub-cdn.sider.ai/u/U0Y3HGVYKOY/web-coder/68696f720dd11641ee25c3cd/resource/df54daed-0db5-4ac5-8fb7-155b1e3b965e.jpg',
    tags: ['policy', 'security', 'compliance'],
    isStarred: false,
    isShared: true,
  },
  {
    id: '3',
    name: 'Client_Presentation_TechNova.pptx',
    type: 'PPTX',
    size: '15.2 MB',
    category: 'presentation',
    folder: 'Client Presentations',
    uploadedBy: 'Emily Davis',
    uploadedAt: '2024-01-13T09:15:00Z',
    lastModified: '2024-01-13T11:30:00Z',
    thumbnail: 'https://pub-cdn.sider.ai/u/U0Y3HGVYKOY/web-coder/68696f720dd11641ee25c3cd/resource/79ea7028-28cb-4845-bba8-9853711cc1a2.jpg',
    tags: ['presentation', 'client', 'technova'],
    isStarred: true,
    isShared: true,
  },
  {
    id: '4',
    name: 'Employee_Handbook_2024.pdf',
    type: 'PDF',
    size: '4.1 MB',
    category: 'document',
    folder: 'HR Documents',
    uploadedBy: 'HR Department',
    uploadedAt: '2024-01-12T13:45:00Z',
    lastModified: '2024-01-12T13:45:00Z',
    thumbnail: 'https://pub-cdn.sider.ai/u/U0Y3HGVYKOY/web-coder/68696f720dd11641ee25c3cd/resource/42c6102f-ea28-46fc-a3ce-9fa72255143d.jpg',
    tags: ['hr', 'handbook', 'policies'],
    isStarred: false,
    isShared: false,
  },
  {
    id: '5',
    name: 'Product_Demo_Video.mp4',
    type: 'MP4',
    size: '125.6 MB',
    category: 'video',
    folder: 'Marketing Assets',
    uploadedBy: 'Marketing Team',
    uploadedAt: '2024-01-11T16:20:00Z',
    lastModified: '2024-01-11T16:20:00Z',
    thumbnail: 'https://pub-cdn.sider.ai/u/U0Y3HGVYKOY/web-coder/68696f720dd11641ee25c3cd/resource/e5db3871-2f8b-4383-8ac4-8249b7958bba.jpg',
    tags: ['video', 'demo', 'marketing'],
    isStarred: true,
    isShared: true,
  },
];

const folders = [
  { name: 'Financial Reports', count: 12, color: 'bg-blue-100 text-blue-800' },
  { name: 'Policies', count: 8, color: 'bg-green-100 text-green-800' },
  { name: 'Client Presentations', count: 15, color: 'bg-purple-100 text-purple-800' },
  { name: 'HR Documents', count: 6, color: 'bg-orange-100 text-orange-800' },
  { name: 'Marketing Assets', count: 23, color: 'bg-pink-100 text-pink-800' },
  { name: 'Legal Documents', count: 4, color: 'bg-red-100 text-red-800' },
];

export default function FileManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  const filteredFiles = mockFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFolder = selectedFolder === 'all' || file.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
      case 'docx':
      case 'doc':
        return FileText;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return Image;
      case 'mp4':
      case 'avi':
      case 'mov':
        return Film;
      case 'mp3':
      case 'wav':
        return Music;
      case 'zip':
      case 'rar':
        return Archive;
      default:
        return FileText;
    }
  };

  const getFileTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf': return 'bg-red-100 text-red-800';
      case 'docx': case 'doc': return 'bg-blue-100 text-blue-800';
      case 'pptx': case 'ppt': return 'bg-orange-100 text-orange-800';
      case 'xlsx': case 'xls': return 'bg-green-100 text-green-800';
      case 'jpg': case 'jpeg': case 'png': return 'bg-purple-100 text-purple-800';
      case 'mp4': case 'avi': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalFiles = mockFiles.length;
  const totalSize = mockFiles.reduce((sum, file) => {
    const sizeInMB = parseFloat(file.size.replace(/[^\d.]/g, ''));
    return sum + sizeInMB;
  }, 0);
  const sharedFiles = mockFiles.filter(file => file.isShared).length;
  const starredFiles = mockFiles.filter(file => file.isStarred).length;

  const kpiCards = [
    {
      title: 'Total Files',
      value: totalFiles.toString(),
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Storage Used',
      value: `${totalSize.toFixed(1)} MB`,
      icon: Archive,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Shared Files',
      value: sharedFiles.toString(),
      icon: Share,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Starred Files',
      value: starredFiles.toString(),
      icon: Star,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-white min-h-screen">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">File Management</h1>
          <p className="text-gray-600">Organize and manage your business documents securely</p>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Upload className="h-4 w-4 mr-2" />
              Upload Files
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Upload New Files</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">Drop files here</p>
                <p className="text-gray-600 mb-4">or click to browse</p>
                <Button variant="outline">Choose Files</Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="folder">Folder</Label>
                  <select id="folder" className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="">Select folder</option>
                    {folders.map(folder => (
                      <option key={folder.name} value={folder.name}>{folder.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input id="tags" placeholder="Add tags (comma separated)" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsUploadDialogOpen(false)}>
                  Upload
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

      {/* Folders Grid */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle>Folders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {folders.map((folder) => (
              <div
                key={folder.name}
                className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedFolder(folder.name)}
              >
                <FolderOpen className="h-12 w-12 text-blue-600 mb-2" />
                <p className="font-medium text-center">{folder.name}</p>
                <Badge className={folder.color}>
                  {folder.count} files
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* File Management */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Files
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedFolder}
                onChange={(e) => setSelectedFolder(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Folders</option>
                {folders.map(folder => (
                  <option key={folder.name} value={folder.name}>{folder.name}</option>
                ))}
              </select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">
                <SortAsc className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </div>
          </div>

          {viewMode === 'list' ? (
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Folder</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Modified</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFiles.map((file) => {
                    const FileIcon = getFileIcon(file.type);
                    return (
                      <TableRow key={file.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <FileIcon className="h-5 w-5 text-gray-500" />
                            <div>
                              <p className="font-medium flex items-center gap-2">
                                {file.name}
                                {file.isStarred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                                {file.isShared && <Share className="h-4 w-4 text-blue-500" />}
                              </p>
                              <div className="flex gap-1 mt-1">
                                {file.tags.map(tag => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getFileTypeColor(file.type)}>
                            {file.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{file.size}</TableCell>
                        <TableCell>{file.folder}</TableCell>
                        <TableCell>{file.uploadedBy}</TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {formatRelativeTime(file.lastModified)}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                Preview
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share className="mr-2 h-4 w-4" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Rename
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredFiles.map((file) => {
                const FileIcon = getFileIcon(file.type);
                return (
                  <div key={file.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-3">
                        <img
                          src={file.thumbnail}
                          alt={file.name}
                          className="h-16 w-16 object-cover rounded-lg"
                        />
                        <div className="absolute top-0 right-0">
                          {file.isStarred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                        </div>
                      </div>
                      <p className="font-medium text-sm truncate w-full" title={file.name}>
                        {file.name}
                      </p>
                      <Badge className={getFileTypeColor(file.type)} size="sm">
                        {file.type}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">{file.size}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
