import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { 
  UserMinus, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Eye,
  Download,
  Upload,
  Search,
  Plus,
  Calendar,
  User,
  Building,
  DollarSign,
  Shield,
  MessageSquare
} from 'lucide-react';

interface ResignationRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  position: string;
  submissionDate: string;
  lastWorkingDate: string;
  reason: string;
  status: 'pending' | 'supervisor_approved' | 'hr_review' | 'accounts_clearance' | 'completed' | 'rejected';
  supervisorComments?: string;
  hrComments?: string;
  noticePeriodCompliance: boolean;
  exitInterviewCompleted: boolean;
  clearanceStatus: {
    devices: boolean;
    access: boolean;
    documents: boolean;
    financial: boolean;
  };
}

interface ExitInterview {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  interviewDate: string;
  completed: boolean;
  responses: {
    overallExperience: string;
    workEnvironment: string;
    managementFeedback: string;
    improvements: string;
    recommendation: string;
  };
}

const EmployeeExitManagement = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('hr');

  // Mock data
  const [resignations, setResignations] = useState<ResignationRequest[]>([
    {
      id: '1',
      employeeId: 'EMP001',
      employeeName: 'John Smith',
      department: 'Engineering',
      position: 'Senior Developer',
      submissionDate: '2024-01-15',
      lastWorkingDate: '2024-02-15',
      reason: 'Career Growth',
      status: 'supervisor_approved',
      supervisorComments: 'Approved with recommendations for knowledge transfer',
      noticePeriodCompliance: true,
      exitInterviewCompleted: false,
      clearanceStatus: {
        devices: false,
        access: false,
        documents: false,
        financial: false
      }
    },
    {
      id: '2',
      employeeId: 'EMP002',
      employeeName: 'Sarah Johnson',
      department: 'Marketing',
      position: 'Marketing Manager',
      submissionDate: '2024-01-10',
      lastWorkingDate: '2024-02-10',
      reason: 'Personal Reasons',
      status: 'hr_review',
      supervisorComments: 'Good performer, approved for exit',
      noticePeriodCompliance: true,
      exitInterviewCompleted: true,
      clearanceStatus: {
        devices: true,
        access: false,
        documents: true,
        financial: false
      }
    },
    {
      id: '3',
      employeeId: 'EMP003',
      employeeName: 'Mike Wilson',
      department: 'Sales',
      position: 'Sales Executive',
      submissionDate: '2024-01-20',
      lastWorkingDate: '2024-02-20',
      reason: 'Better Opportunity',
      status: 'completed',
      supervisorComments: 'Completed successfully',
      hrComments: 'All clearances completed',
      noticePeriodCompliance: true,
      exitInterviewCompleted: true,
      clearanceStatus: {
        devices: true,
        access: true,
        documents: true,
        financial: true
      }
    }
  ]);

  const [exitInterviews, setExitInterviews] = useState<ExitInterview[]>([
    {
      id: '1',
      employeeId: 'EMP002',
      employeeName: 'Sarah Johnson',
      department: 'Marketing',
      interviewDate: '2024-01-25',
      completed: true,
      responses: {
        overallExperience: 'Positive experience overall',
        workEnvironment: 'Collaborative and supportive',
        managementFeedback: 'Good leadership and guidance',
        improvements: 'Better work-life balance policies',
        recommendation: 'Yes, would recommend to others'
      }
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'supervisor_approved': return 'bg-blue-100 text-blue-800';
      case 'hr_review': return 'bg-purple-100 text-purple-800';
      case 'accounts_clearance': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusProgress = (status: string) => {
    switch (status) {
      case 'pending': return 20;
      case 'supervisor_approved': return 40;
      case 'hr_review': return 60;
      case 'accounts_clearance': return 80;
      case 'completed': return 100;
      default: return 0;
    }
  };

  const filteredResignations = resignations.filter(resignation => {
    const matchesStatus = filterStatus === 'all' || resignation.status === filterStatus;
    const matchesSearch = resignation.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resignation.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleApproveResignation = (id: string) => {
    setResignations(prev => prev.map(resignation => 
      resignation.id === id 
        ? { ...resignation, status: 'hr_review' as const }
        : resignation
    ));
    toast({
      title: "Resignation Approved",
      description: "The resignation has been approved and forwarded to HR.",
    });
  };

  const handleRejectResignation = (id: string) => {
    setResignations(prev => prev.map(resignation => 
      resignation.id === id 
        ? { ...resignation, status: 'rejected' as const }
        : resignation
    ));
    toast({
      title: "Resignation Rejected",
      description: "The resignation has been rejected.",
      variant: "destructive"
    });
  };

  const handleClearanceUpdate = (id: string, clearanceType: keyof ResignationRequest['clearanceStatus']) => {
    setResignations(prev => prev.map(resignation => 
      resignation.id === id 
        ? { 
            ...resignation, 
            clearanceStatus: {
              ...resignation.clearanceStatus,
              [clearanceType]: !resignation.clearanceStatus[clearanceType]
            }
          }
        : resignation
    ));
  };

  const generateDocument = (type: 'experience' | 'release', employeeName: string) => {
    toast({
      title: `${type === 'experience' ? 'Experience' : 'Release'} Letter Generated`,
      description: `${type === 'experience' ? 'Experience' : 'Release'} letter for ${employeeName} has been generated successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <UserMinus className="h-8 w-8 text-primary" />
            Employee Exit Management
          </h1>
          <p className="text-muted-foreground mt-2">Manage resignation processing and offboarding workflow</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="employee">Employee</SelectItem>
              <SelectItem value="supervisor">Supervisor</SelectItem>
              <SelectItem value="hr">HR Manager</SelectItem>
              <SelectItem value="accounts">Accounts</SelectItem>
            </SelectContent>
          </Select>
          {selectedRole === 'employee' && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="hrms-button-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Submit Resignation
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Submit Resignation</DialogTitle>
                  <DialogDescription>
                    Fill out the resignation form to begin the exit process
                  </DialogDescription>
                </DialogHeader>
                <ResignationForm />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="resignations">Resignations</TabsTrigger>
          <TabsTrigger value="interviews">Exit Interviews</TabsTrigger>
          <TabsTrigger value="clearance">Clearance</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="dashboard-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending Resignations</p>
                    <p className="text-2xl font-bold text-foreground">
                      {resignations.filter(r => r.status === 'pending').length}
                    </p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                    <p className="text-2xl font-bold text-foreground">
                      {resignations.filter(r => ['supervisor_approved', 'hr_review', 'accounts_clearance'].includes(r.status)).length}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed Exits</p>
                    <p className="text-2xl font-bold text-foreground">
                      {resignations.filter(r => r.status === 'completed').length}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Exit Interviews</p>
                    <p className="text-2xl font-bold text-foreground">{exitInterviews.length}</p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Recent Exit Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resignations.slice(0, 5).map((resignation) => (
                  <div key={resignation.id} className="flex items-center justify-between p-4 rounded-lg bg-accent/50">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{resignation.employeeName}</p>
                        <p className="text-sm text-muted-foreground">{resignation.department}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(resignation.status)}>
                        {resignation.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">{resignation.submissionDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resignations Tab */}
        <TabsContent value="resignations" className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="supervisor_approved">Supervisor Approved</SelectItem>
                <SelectItem value="hr_review">HR Review</SelectItem>
                <SelectItem value="accounts_clearance">Accounts Clearance</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6">
            {filteredResignations.map((resignation) => (
              <Card key={resignation.id} className="dashboard-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-3">
                        <User className="h-5 w-5" />
                        {resignation.employeeName}
                      </CardTitle>
                      <CardDescription>
                        {resignation.position} • {resignation.department}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(resignation.status)}>
                      {resignation.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Exit Progress</span>
                      <span>{getStatusProgress(resignation.status)}%</span>
                    </div>
                    <Progress value={getStatusProgress(resignation.status)} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Submission Date</p>
                      <p className="font-medium">{resignation.submissionDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Working Date</p>
                      <p className="font-medium">{resignation.lastWorkingDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Reason</p>
                      <p className="font-medium">{resignation.reason}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Notice Period</p>
                      <p className="font-medium">
                        {resignation.noticePeriodCompliance ? (
                          <CheckCircle className="h-4 w-4 text-green-500 inline" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500 inline" />
                        )}
                      </p>
                    </div>
                  </div>

                  {resignation.supervisorComments && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Supervisor Comments</p>
                      <p className="text-sm bg-accent/50 p-2 rounded">{resignation.supervisorComments}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {selectedRole === 'supervisor' && resignation.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          onClick={() => handleApproveResignation(resignation.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRejectResignation(resignation.id)}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </>
                    )}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Resignation Details - {resignation.employeeName}</DialogTitle>
                        </DialogHeader>
                        <ResignationDetails resignation={resignation} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Exit Interviews Tab */}
        <TabsContent value="interviews" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Exit Interviews</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="hrms-button-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Interview
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Exit Interview Form</DialogTitle>
                </DialogHeader>
                <ExitInterviewForm />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6">
            {exitInterviews.map((interview) => (
              <Card key={interview.id} className="dashboard-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{interview.employeeName}</CardTitle>
                      <CardDescription>{interview.department}</CardDescription>
                    </div>
                    <Badge className={interview.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                      {interview.completed ? 'Completed' : 'Pending'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-muted-foreground">Interview Date</p>
                      <p className="font-medium">{interview.interviewDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <p className="font-medium">{interview.completed ? 'Completed' : 'Scheduled'}</p>
                    </div>
                  </div>
                  
                  {interview.completed && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Responses
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Exit Interview Responses - {interview.employeeName}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          {Object.entries(interview.responses).map(([key, value]) => (
                            <div key={key}>
                              <p className="font-medium capitalize text-sm">
                                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                              </p>
                              <p className="text-sm text-muted-foreground bg-accent/50 p-2 rounded mt-1">
                                {value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Clearance Tab */}
        <TabsContent value="clearance" className="space-y-6">
          <h2 className="text-xl font-semibold">Employee Clearance Status</h2>
          
          <div className="grid gap-6">
            {resignations.filter(r => r.status !== 'pending' && r.status !== 'rejected').map((resignation) => (
              <Card key={resignation.id} className="dashboard-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <User className="h-5 w-5" />
                    {resignation.employeeName}
                  </CardTitle>
                  <CardDescription>{resignation.department}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm">Devices</span>
                      </div>
                      <Button
                        size="sm"
                        variant={resignation.clearanceStatus.devices ? "default" : "outline"}
                        onClick={() => handleClearanceUpdate(resignation.id, 'devices')}
                      >
                        {resignation.clearanceStatus.devices ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm">Access</span>
                      </div>
                      <Button
                        size="sm"
                        variant={resignation.clearanceStatus.access ? "default" : "outline"}
                        onClick={() => handleClearanceUpdate(resignation.id, 'access')}
                      >
                        {resignation.clearanceStatus.access ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm">Documents</span>
                      </div>
                      <Button
                        size="sm"
                        variant={resignation.clearanceStatus.documents ? "default" : "outline"}
                        onClick={() => handleClearanceUpdate(resignation.id, 'documents')}
                      >
                        {resignation.clearanceStatus.documents ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm">Financial</span>
                      </div>
                      <Button
                        size="sm"
                        variant={resignation.clearanceStatus.financial ? "default" : "outline"}
                        onClick={() => handleClearanceUpdate(resignation.id, 'financial')}
                      >
                        {resignation.clearanceStatus.financial ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <h2 className="text-xl font-semibold">Document Generation</h2>
          
          <div className="grid gap-6">
            {resignations.filter(r => r.status !== 'pending' && r.status !== 'rejected').map((resignation) => (
              <Card key={resignation.id} className="dashboard-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <FileText className="h-5 w-5" />
                    {resignation.employeeName}
                  </CardTitle>
                  <CardDescription>{resignation.position} • {resignation.department}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border">
                      <h4 className="font-medium mb-2">Experience Letter</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Generate experience letter for completed notice period
                      </p>
                      <div className="flex gap-2">
                        <Button 
                          size="sm"
                          onClick={() => generateDocument('experience', resignation.employeeName)}
                          disabled={!resignation.noticePeriodCompliance}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Generate
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border">
                      <h4 className="font-medium mb-2">Release Letter</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Generate final release letter after clearance
                      </p>
                      <div className="flex gap-2">
                        <Button 
                          size="sm"
                          onClick={() => generateDocument('release', resignation.employeeName)}
                          disabled={resignation.status !== 'completed'}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Generate
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Resignation Form Component
const ResignationForm = () => {
  const [formData, setFormData] = useState({
    reason: '',
    lastWorkingDate: '',
    comments: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Resignation Submitted",
      description: "Your resignation has been submitted to your supervisor for review.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="reason">Reason for Resignation</Label>
        <Select value={formData.reason} onValueChange={(value) => setFormData({...formData, reason: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Select reason" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="career_growth">Career Growth</SelectItem>
            <SelectItem value="personal_reasons">Personal Reasons</SelectItem>
            <SelectItem value="better_opportunity">Better Opportunity</SelectItem>
            <SelectItem value="relocation">Relocation</SelectItem>
            <SelectItem value="health_reasons">Health Reasons</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="lastWorkingDate">Last Working Date</Label>
        <Input
          id="lastWorkingDate"
          type="date"
          value={formData.lastWorkingDate}
          onChange={(e) => setFormData({...formData, lastWorkingDate: e.target.value})}
          required
        />
      </div>

      <div>
        <Label htmlFor="comments">Additional Comments</Label>
        <Textarea
          id="comments"
          value={formData.comments}
          onChange={(e) => setFormData({...formData, comments: e.target.value})}
          placeholder="Any additional comments or feedback..."
          rows={4}
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline">Cancel</Button>
        <Button type="submit">Submit Resignation</Button>
      </div>
    </form>
  );
};

// Resignation Details Component
const ResignationDetails = ({ resignation }: { resignation: ResignationRequest }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Employee</p>
          <p className="font-medium">{resignation.employeeName}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Department</p>
          <p className="font-medium">{resignation.department}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Position</p>
          <p className="font-medium">{resignation.position}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Status</p>
          <Badge className={getStatusColor(resignation.status)}>
            {resignation.status.replace('_', ' ').toUpperCase()}
          </Badge>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <p className="text-sm text-muted-foreground mb-2">Resignation Timeline</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Submission Date</span>
            <span>{resignation.submissionDate}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Last Working Date</span>
            <span>{resignation.lastWorkingDate}</span>
          </div>
        </div>
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-2">Reason</p>
        <p className="text-sm bg-accent/50 p-2 rounded">{resignation.reason}</p>
      </div>

      {resignation.supervisorComments && (
        <div>
          <p className="text-sm text-muted-foreground mb-2">Supervisor Comments</p>
          <p className="text-sm bg-accent/50 p-2 rounded">{resignation.supervisorComments}</p>
        </div>
      )}
    </div>
  );
};

// Exit Interview Form Component
const ExitInterviewForm = () => {
  const [responses, setResponses] = useState({
    overallExperience: '',
    workEnvironment: '',
    managementFeedback: '',
    improvements: '',
    recommendation: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Exit Interview Completed",
      description: "Thank you for your feedback. Your responses have been recorded.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label>How would you rate your overall experience with the company?</Label>
        <Textarea
          value={responses.overallExperience}
          onChange={(e) => setResponses({...responses, overallExperience: e.target.value})}
          placeholder="Share your overall experience..."
          rows={3}
        />
      </div>

      <div>
        <Label>How would you describe the work environment and team dynamics?</Label>
        <Textarea
          value={responses.workEnvironment}
          onChange={(e) => setResponses({...responses, workEnvironment: e.target.value})}
          placeholder="Describe the work environment..."
          rows={3}
        />
      </div>

      <div>
        <Label>Any feedback on management and leadership?</Label>
        <Textarea
          value={responses.managementFeedback}
          onChange={(e) => setResponses({...responses, managementFeedback: e.target.value})}
          placeholder="Share feedback on management..."
          rows={3}
        />
      </div>

      <div>
        <Label>What improvements would you suggest for the company?</Label>
        <Textarea
          value={responses.improvements}
          onChange={(e) => setResponses({...responses, improvements: e.target.value})}
          placeholder="Suggest improvements..."
          rows={3}
        />
      </div>

      <div>
        <Label>Would you recommend this company to others?</Label>
        <Select value={responses.recommendation} onValueChange={(value) => setResponses({...responses, recommendation: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Select recommendation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Yes, definitely</SelectItem>
            <SelectItem value="maybe">Maybe, with conditions</SelectItem>
            <SelectItem value="no">No, I wouldn't</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline">Save Draft</Button>
        <Button type="submit">Submit Interview</Button>
      </div>
    </form>
  );
};

// Helper function (moved outside component to avoid re-declaration)
const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'supervisor_approved': return 'bg-blue-100 text-blue-800';
    case 'hr_review': return 'bg-purple-100 text-purple-800';
    case 'accounts_clearance': return 'bg-orange-100 text-orange-800';
    case 'completed': return 'bg-green-100 text-green-800';
    case 'rejected': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default EmployeeExitManagement;