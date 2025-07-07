import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Users, Plus, FileText, Calendar, Mail, Upload, Download, 
  CheckCircle, Clock, AlertCircle, User, Building, 
  DollarSign, MessageSquare, Star, Eye, Edit, Trash2,
  UserPlus, Briefcase, GraduationCap, Award, Send
} from 'lucide-react';
import { useForm } from 'react-hook-form';

// Mock Data
const mockRequisitions = [
  {
    id: 1,
    department: 'Engineering',
    position: 'Senior Software Developer',
    justification: 'Expansion of development team',
    urgency: 'High',
    jobGrade: 'Grade 7',
    status: 'Approved',
    createdDate: '2024-01-15',
    budget: 120000
  },
  {
    id: 2,
    department: 'Marketing',
    position: 'Digital Marketing Manager',
    justification: 'New product launch',
    urgency: 'Medium',
    jobGrade: 'Grade 6',
    status: 'Pending',
    createdDate: '2024-01-20',
    budget: 85000
  }
];

const mockJobPostings = [
  {
    id: 1,
    title: 'Senior Software Developer',
    department: 'Engineering',
    location: 'Dhaka, Bangladesh',
    experience: '3-5 years',
    status: 'Active',
    applications: 24,
    postedDate: '2024-01-18'
  },
  {
    id: 2,
    title: 'Digital Marketing Manager',
    department: 'Marketing',
    location: 'Dhaka, Bangladesh',
    experience: '2-4 years',
    status: 'Draft',
    applications: 0,
    postedDate: '2024-01-22'
  }
];

const mockCandidates = [
  {
    id: 1,
    name: 'Ahmed Hassan',
    position: 'Senior Software Developer',
    experience: '4 years',
    skills: ['React', 'Node.js', 'TypeScript'],
    status: 'Interview Scheduled',
    score: 85,
    email: 'ahmed.hassan@email.com',
    phone: '+880 1234567890'
  },
  {
    id: 2,
    name: 'Fatima Rahman',
    position: 'Senior Software Developer',
    experience: '5 years',
    skills: ['Python', 'Django', 'PostgreSQL'],
    status: 'CV Screening',
    score: 92,
    email: 'fatima.rahman@email.com',
    phone: '+880 1234567891'
  }
];

const mockInterviews = [
  {
    id: 1,
    candidateName: 'Ahmed Hassan',
    position: 'Senior Software Developer',
    round: 'Technical Round',
    interviewer: 'John Smith',
    date: '2024-01-25',
    time: '2:00 PM',
    status: 'Completed',
    feedback: 'Strong technical skills, good communication',
    rating: 4
  },
  {
    id: 2,
    candidateName: 'Fatima Rahman',
    position: 'Senior Software Developer',
    round: 'HR Round',
    interviewer: 'Sarah Johnson',
    date: '2024-01-26',
    time: '10:00 AM',
    status: 'Scheduled',
    feedback: '',
    rating: 0
  }
];

const mockOnboarding = [
  {
    id: 1,
    name: 'Ahmed Hassan',
    position: 'Senior Software Developer',
    joinDate: '2024-02-01',
    status: 'Documents Pending',
    progress: 65,
    email: 'ahmed.hassan@company.com',
    employeeId: 'EMP001'
  }
];

const TalentAcquisition = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [requisitions, setRequisitions] = useState(mockRequisitions);
  const [jobPostings, setJobPostings] = useState(mockJobPostings);
  const [candidates, setCandidates] = useState(mockCandidates);
  const [interviews, setInterviews] = useState(mockInterviews);
  const [onboardingList, setOnboardingList] = useState(mockOnboarding);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showRequisitionDialog, setShowRequisitionDialog] = useState(false);
  const [showJobPostingDialog, setShowJobPostingDialog] = useState(false);
  const [showInterviewDialog, setShowInterviewDialog] = useState(false);
  const [showOnboardingDialog, setShowOnboardingDialog] = useState(false);

  const form = useForm();

  // Dashboard Stats
  const stats = {
    totalRequisitions: requisitions.length,
    activePostings: jobPostings.filter(j => j.status === 'Active').length,
    scheduledInterviews: interviews.filter(i => i.status === 'Scheduled').length,
    onboardingInProgress: onboardingList.filter(o => o.status !== 'Completed').length
  };

  const handleCreateRequisition = (data: any) => {
    const newRequisition = {
      id: requisitions.length + 1,
      ...data,
      status: 'Pending',
      createdDate: new Date().toISOString().split('T')[0]
    };
    setRequisitions([...requisitions, newRequisition]);
    setShowRequisitionDialog(false);
    form.reset();
  };

  const handleCreateJobPosting = (data: any) => {
    const newPosting = {
      id: jobPostings.length + 1,
      ...data,
      status: 'Draft',
      applications: 0,
      postedDate: new Date().toISOString().split('T')[0]
    };
    setJobPostings([...jobPostings, newPosting]);
    setShowJobPostingDialog(false);
    form.reset();
  };

  const handleScheduleInterview = (data: any) => {
    const newInterview = {
      id: interviews.length + 1,
      ...data,
      status: 'Scheduled',
      feedback: '',
      rating: 0
    };
    setInterviews([...interviews, newInterview]);
    setShowInterviewDialog(false);
    form.reset();
  };

  const handleStartOnboarding = (candidate: any) => {
    const newOnboarding = {
      id: onboardingList.length + 1,
      name: candidate.name,
      position: candidate.position,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'Documents Pending',
      progress: 0,
      email: candidate.email,
      employeeId: `EMP${String(onboardingList.length + 1).padStart(3, '0')}`
    };
    setOnboardingList([...onboardingList, newOnboarding]);
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Approved': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Active': 'bg-blue-100 text-blue-800',
      'Draft': 'bg-gray-100 text-gray-800',
      'Completed': 'bg-green-100 text-green-800',
      'Scheduled': 'bg-orange-100 text-orange-800',
      'CV Screening': 'bg-purple-100 text-purple-800',
      'Interview Scheduled': 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Talent Acquisition</h1>
          <p className="text-muted-foreground">Manage the complete hiring lifecycle</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowRequisitionDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Requisition
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="requisitions">Requisitions</TabsTrigger>
          <TabsTrigger value="postings">Job Postings</TabsTrigger>
          <TabsTrigger value="candidates">Candidates</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
          <TabsTrigger value="offers">Offers</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Requisitions</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalRequisitions}</div>
                <p className="text-xs text-muted-foreground">Active hiring requests</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Job Postings</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activePostings}</div>
                <p className="text-xs text-muted-foreground">Live job advertisements</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Scheduled Interviews</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.scheduledInterviews}</div>
                <p className="text-xs text-muted-foreground">Upcoming interviews</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Onboarding Progress</CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.onboardingInProgress}</div>
                <p className="text-xs text-muted-foreground">New joiners in process</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Requisitions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {requisitions.slice(0, 3).map((req) => (
                    <div key={req.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{req.position}</p>
                        <p className="text-sm text-muted-foreground">{req.department}</p>
                      </div>
                      <Badge className={getStatusColor(req.status)}>
                        {req.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Interviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {interviews.filter(i => i.status === 'Scheduled').slice(0, 3).map((interview) => (
                    <div key={interview.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{interview.candidateName}</p>
                        <p className="text-sm text-muted-foreground">{interview.date} at {interview.time}</p>
                      </div>
                      <Badge className={getStatusColor(interview.status)}>
                        {interview.round}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Requisitions Tab */}
        <TabsContent value="requisitions" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Hiring Requisitions</h2>
            <Button onClick={() => setShowRequisitionDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Requisition
            </Button>
          </div>

          <Card>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Position</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Urgency</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requisitions.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell className="font-medium">{req.position}</TableCell>
                      <TableCell>{req.department}</TableCell>
                      <TableCell>
                        <Badge className={req.urgency === 'High' ? 'bg-red-100 text-red-800' : 
                                       req.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                                       'bg-green-100 text-green-800'}>
                          {req.urgency}
                        </Badge>
                      </TableCell>
                      <TableCell>${req.budget?.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(req.status)}>
                          {req.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          {req.status === 'Approved' && (
                            <Button variant="outline" size="sm" onClick={() => setShowJobPostingDialog(true)}>
                              <Send className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Job Postings Tab */}
        <TabsContent value="postings" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Job Postings</h2>
            <Button onClick={() => setShowJobPostingDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Job Posting
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobPostings.map((posting) => (
              <Card key={posting.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{posting.title}</CardTitle>
                    <Badge className={getStatusColor(posting.status)}>
                      {posting.status}
                    </Badge>
                  </div>
                  <CardDescription>{posting.department}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Building className="w-4 h-4 mr-2" />
                      {posting.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      {posting.experience}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-2" />
                      {posting.applications} applications
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Candidates Tab */}
        <TabsContent value="candidates" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Candidate Management</h2>
            <div className="flex gap-2">
              <Input placeholder="Search candidates..." className="w-64" />
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Import CVs
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Skills</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {candidates.map((candidate) => (
                    <TableRow key={candidate.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{candidate.name}</p>
                          <p className="text-sm text-muted-foreground">{candidate.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{candidate.position}</TableCell>
                      <TableCell>{candidate.experience}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.slice(0, 2).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{candidate.skills.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={candidate.score} className="w-16" />
                          <span className="text-sm">{candidate.score}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(candidate.status)}>
                          {candidate.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setShowInterviewDialog(true)}>
                            <Calendar className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleStartOnboarding(candidate)}>
                            <UserPlus className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Interviews Tab */}
        <TabsContent value="interviews" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Interview Management</h2>
            <Button onClick={() => setShowInterviewDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Schedule Interview
            </Button>
          </div>

          <Card>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Round</TableHead>
                    <TableHead>Interviewer</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {interviews.map((interview) => (
                    <TableRow key={interview.id}>
                      <TableCell className="font-medium">{interview.candidateName}</TableCell>
                      <TableCell>{interview.position}</TableCell>
                      <TableCell>{interview.round}</TableCell>
                      <TableCell>{interview.interviewer}</TableCell>
                      <TableCell>
                        <div>
                          <p>{interview.date}</p>
                          <p className="text-sm text-muted-foreground">{interview.time}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(interview.status)}>
                          {interview.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {interview.rating > 0 && (
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < interview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Offers Tab */}
        <TabsContent value="offers" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Offer Management</h2>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Generate Offer
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Salary Negotiation</CardTitle>
                <CardDescription>Manage salary discussions and approvals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Candidate Name</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select candidate" />
                    </SelectTrigger>
                    <SelectContent>
                      {candidates.map((candidate) => (
                        <SelectItem key={candidate.id} value={candidate.name}>
                          {candidate.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Proposed Salary</Label>
                  <Input type="number" placeholder="Enter amount" />
                </div>
                <div className="space-y-2">
                  <Label>Benefits Package</Label>
                  <Textarea placeholder="List benefits and perks" />
                </div>
                <Button className="w-full">Submit for Approval</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Offer Letter Template</CardTitle>
                <CardDescription>Generate official offer letters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg bg-muted/50">
                  <h3 className="font-semibold mb-2">Offer Letter Preview</h3>
                  <div className="text-sm space-y-1">
                    <p><strong>Position:</strong> Senior Software Developer</p>
                    <p><strong>Department:</strong> Engineering</p>
                    <p><strong>Salary:</strong> $120,000 per annum</p>
                    <p><strong>Start Date:</strong> February 1, 2024</p>
                    <p><strong>Benefits:</strong> Health insurance, PF, Bonus</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Generate
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Onboarding Tab */}
        <TabsContent value="onboarding" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Employee Onboarding</h2>
            <Button onClick={() => setShowOnboardingDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Start Onboarding
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {onboardingList.map((employee) => (
              <Card key={employee.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{employee.name}</CardTitle>
                      <CardDescription>{employee.position} • {employee.employeeId}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(employee.status)}>
                      {employee.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Onboarding Progress</span>
                        <span>{employee.progress}%</span>
                      </div>
                      <Progress value={employee.progress} />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Personal Details</h4>
                        <Badge variant="outline" className="w-full justify-center">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Complete
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Documents</h4>
                        <Badge variant="outline" className="w-full justify-center">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Digital Signature</h4>
                        <Badge variant="outline" className="w-full justify-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Required
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Resources</h4>
                        <Badge variant="outline" className="w-full justify-center">
                          <Clock className="w-3 h-3 mr-1" />
                          Requested
                        </Badge>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="w-4 h-4 mr-2" />
                        Send Welcome Email
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Appointment Letter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <h2 className="text-2xl font-bold">Recruitment Reports</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Hiring Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Time to Fill</span>
                    <span className="font-semibold">21 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost per Hire</span>
                    <span className="font-semibold">$2,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Source Effectiveness</span>
                    <span className="font-semibold">65%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Offer Acceptance Rate</span>
                    <span className="font-semibold">78%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pipeline Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Applications Received</span>
                    <span className="font-semibold">156</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>CV Screening</span>
                    <span className="font-semibold">89</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Interviews Scheduled</span>
                    <span className="font-semibold">34</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Offers Extended</span>
                    <span className="font-semibold">12</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <Dialog open={showRequisitionDialog} onOpenChange={setShowRequisitionDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Requisition</DialogTitle>
            <DialogDescription>Submit a new hiring request for approval</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateRequisition)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Engineering">Engineering</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Sales">Sales</SelectItem>
                            <SelectItem value="HR">Human Resources</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter position title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="justification"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Justification</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Explain why this position is needed" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="urgency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Urgency Level</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select urgency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="jobGrade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Grade</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select grade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Grade 5">Grade 5</SelectItem>
                            <SelectItem value="Grade 6">Grade 6</SelectItem>
                            <SelectItem value="Grade 7">Grade 7</SelectItem>
                            <SelectItem value="Grade 8">Grade 8</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Annual budget" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowRequisitionDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">Submit Requisition</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={showJobPostingDialog} onOpenChange={setShowJobPostingDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Job Posting</DialogTitle>
            <DialogDescription>Create a new job advertisement</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateJobPosting)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter job title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Engineering">Engineering</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Sales">Sales</SelectItem>
                            <SelectItem value="HR">Human Resources</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Job location" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience Required</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 2-4 years" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowJobPostingDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Posting</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={showInterviewDialog} onOpenChange={setShowInterviewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Interview</DialogTitle>
            <DialogDescription>Schedule a new interview session</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleScheduleInterview)} className="space-y-4">
              <FormField
                control={form.control}
                name="candidateName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Candidate</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select candidate" />
                        </SelectTrigger>
                        <SelectContent>
                          {candidates.map((candidate) => (
                            <SelectItem key={candidate.id} value={candidate.name}>
                              {candidate.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="round"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interview Round</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select round" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="HR Round">HR Round</SelectItem>
                            <SelectItem value="Technical Round">Technical Round</SelectItem>
                            <SelectItem value="Final Round">Final Round</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="interviewer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interviewer</FormLabel>
                      <FormControl>
                        <Input placeholder="Interviewer name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowInterviewDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">Schedule Interview</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TalentAcquisition;