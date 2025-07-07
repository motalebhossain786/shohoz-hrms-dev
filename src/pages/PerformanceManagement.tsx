import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';
import { 
  Users, 
  TrendingUp, 
  FileText, 
  Award, 
  Target, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Star,
  Download,
  Edit3,
  Trash2,
  Plus,
  Search,
  Filter,
  Eye,
  Send,
  BookOpen,
  Brain,
  BarChart3
} from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  status: 'pending' | 'in-review' | 'approved' | 'completed';
  period: string;
  selfAssessmentComplete: boolean;
  supervisorReviewComplete: boolean;
  hrEvaluationComplete: boolean;
  managementApprovalComplete: boolean;
  overallScore: number;
  succession: 'ready-now' | 'future-leader' | 'needs-development' | 'none';
}

interface KPI {
  id: string;
  description: string;
  target: string;
  achievement: string;
  score: number;
  comments: string;
}

interface Assessment {
  employeeId: string;
  selfAssessment: {
    goalsAchieved: number;
    skillsDevelopment: number;
    collaboration: number;
    innovation: number;
    comments: string;
  };
  supervisorAssessment: {
    performance: number;
    reliability: number;
    leadership: number;
    communication: number;
    recommendation: string;
    comments: string;
  };
  hrEvaluation: {
    discipline: number;
    attendance: number;
    leaveManagement: number;
    officeEtiquette: number;
    behavior: number;
    comments: string;
  };
  managementOpinion: {
    direction: string;
    nextSteps: string;
    approved: boolean;
    comments: string;
  };
}

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Sarah Ahmed',
    department: 'Engineering',
    position: 'Senior Developer',
    status: 'pending',
    period: '2024 Q4',
    selfAssessmentComplete: false,
    supervisorReviewComplete: false,
    hrEvaluationComplete: false,
    managementApprovalComplete: false,
    overallScore: 0,
    succession: 'none'
  },
  {
    id: '2',
    name: 'Rahul Khan',
    department: 'Marketing',
    position: 'Marketing Manager',
    status: 'in-review',
    period: '2024 Q4',
    selfAssessmentComplete: true,
    supervisorReviewComplete: true,
    hrEvaluationComplete: false,
    managementApprovalComplete: false,
    overallScore: 85,
    succession: 'future-leader'
  },
  {
    id: '3',
    name: 'Fatima Rahman',
    department: 'HR',
    position: 'HR Specialist',
    status: 'approved',
    period: '2024 Q4',
    selfAssessmentComplete: true,
    supervisorReviewComplete: true,
    hrEvaluationComplete: true,
    managementApprovalComplete: true,
    overallScore: 92,
    succession: 'ready-now'
  }
];

const mockKPIs: KPI[] = [
  {
    id: '1',
    description: 'Complete 5 major projects',
    target: '5 projects',
    achievement: '6 projects',
    score: 95,
    comments: 'Exceeded expectations by delivering one additional project'
  },
  {
    id: '2',
    description: 'Maintain 95% code quality score',
    target: '95%',
    achievement: '97%',
    score: 100,
    comments: 'Consistently maintained high code quality standards'
  },
  {
    id: '3',
    description: 'Lead 2 training sessions',
    target: '2 sessions',
    achievement: '3 sessions',
    score: 90,
    comments: 'Conducted additional training on new technologies'
  }
];

const PerformanceManagement = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showNewAssessment, setShowNewAssessment] = useState(false);
  const [kpis, setKPIs] = useState<KPI[]>(mockKPIs);
  const [assessmentData, setAssessmentData] = useState<Assessment>({
    employeeId: '',
    selfAssessment: {
      goalsAchieved: 0,
      skillsDevelopment: 0,
      collaboration: 0,
      innovation: 0,
      comments: ''
    },
    supervisorAssessment: {
      performance: 0,
      reliability: 0,
      leadership: 0,
      communication: 0,
      recommendation: '',
      comments: ''
    },
    hrEvaluation: {
      discipline: 0,
      attendance: 0,
      leaveManagement: 0,
      officeEtiquette: 0,
      behavior: 0,
      comments: ''
    },
    managementOpinion: {
      direction: '',
      nextSteps: '',
      approved: false,
      comments: ''
    }
  });

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || employee.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || employee.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-review': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSuccessionColor = (succession: string) => {
    switch (succession) {
      case 'ready-now': return 'bg-green-100 text-green-800';
      case 'future-leader': return 'bg-blue-100 text-blue-800';
      case 'needs-development': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStartAssessment = (employee: Employee) => {
    setSelectedEmployee(employee);
    setAssessmentData({
      ...assessmentData,
      employeeId: employee.id
    });
    setShowNewAssessment(true);
  };

  const handleSaveAssessment = () => {
    if (selectedEmployee) {
      const updatedEmployees = employees.map(emp =>
        emp.id === selectedEmployee.id
          ? { ...emp, status: 'in-review' as const, selfAssessmentComplete: true }
          : emp
      );
      setEmployees(updatedEmployees);
      toast({
        title: "Assessment Saved",
        description: "Self-assessment has been saved successfully.",
      });
      setShowNewAssessment(false);
    }
  };

  const handleSupervisorReview = (employeeId: string) => {
    const updatedEmployees = employees.map(emp =>
      emp.id === employeeId
        ? { ...emp, supervisorReviewComplete: true, overallScore: 85 }
        : emp
    );
    setEmployees(updatedEmployees);
    toast({
      title: "Supervisor Review Completed",
      description: "Supervisor assessment has been submitted.",
    });
  };

  const handleHRApproval = (employeeId: string) => {
    const updatedEmployees = employees.map(emp =>
      emp.id === employeeId
        ? { ...emp, hrEvaluationComplete: true }
        : emp
    );
    setEmployees(updatedEmployees);
    toast({
      title: "HR Evaluation Completed",
      description: "HR evaluation has been submitted.",
    });
  };

  const handleFinalApproval = (employeeId: string) => {
    const updatedEmployees = employees.map(emp =>
      emp.id === employeeId
        ? { 
            ...emp, 
            managementApprovalComplete: true, 
            status: 'approved' as const,
            overallScore: 92
          }
        : emp
    );
    setEmployees(updatedEmployees);
    toast({
      title: "Final Approval Completed",
      description: "Performance review has been approved by management.",
    });
  };

  const handleGenerateIncrementLetter = (employee: Employee) => {
    toast({
      title: "Increment Letter Generated",
      description: `Increment letter for ${employee.name} has been generated and is ready for download.`,
    });
  };

  const handleSuccessionUpdate = (employeeId: string, succession: string) => {
    const updatedEmployees = employees.map(emp =>
      emp.id === employeeId
        ? { ...emp, succession: succession as any }
        : emp
    );
    setEmployees(updatedEmployees);
    toast({
      title: "Succession Planning Updated",
      description: "Employee succession category has been updated.",
    });
  };

  const addNewKPI = () => {
    const newKPI: KPI = {
      id: String(kpis.length + 1),
      description: '',
      target: '',
      achievement: '',
      score: 0,
      comments: ''
    };
    setKPIs([...kpis, newKPI]);
  };

  const updateKPI = (id: string, field: keyof KPI, value: string | number) => {
    setKPIs(kpis.map(kpi =>
      kpi.id === id ? { ...kpi, [field]: value } : kpi
    ));
  };

  const deleteKPI = (id: string) => {
    setKPIs(kpis.filter(kpi => kpi.id !== id));
    toast({
      title: "KPI Deleted",
      description: "KPI has been removed from the assessment.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Performance Management</h1>
          <p className="text-muted-foreground">Manage employee performance evaluations and reviews</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowNewAssessment(true)} className="gap-2">
            <Plus size={16} />
            New Assessment
          </Button>
          <Button variant="outline" className="gap-2">
            <Download size={16} />
            Export Reports
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-review">In Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="succession">Succession Planning</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{employees.length}</div>
                <p className="text-xs text-muted-foreground">Under review</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {employees.filter(e => e.status === 'pending').length}
                </div>
                <p className="text-xs text-muted-foreground">Awaiting assessment</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Reviews</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {employees.filter(e => e.status === 'approved').length}
                </div>
                <p className="text-xs text-muted-foreground">This quarter</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(employees.reduce((sum, e) => sum + e.overallScore, 0) / employees.length)}
                </div>
                <p className="text-xs text-muted-foreground">Performance rating</p>
              </CardContent>
            </Card>
          </div>

          {/* Employee List */}
          <Card>
            <CardHeader>
              <CardTitle>Employee Performance Overview</CardTitle>
              <CardDescription>Track performance review progress for all employees</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Succession</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-muted-foreground">{employee.position}</div>
                        </div>
                      </TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(employee.status)}>
                          {employee.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Progress 
                            value={
                              (employee.selfAssessmentComplete ? 25 : 0) +
                              (employee.supervisorReviewComplete ? 25 : 0) +
                              (employee.hrEvaluationComplete ? 25 : 0) +
                              (employee.managementApprovalComplete ? 25 : 0)
                            } 
                            className="w-[60px]" 
                          />
                          <div className="text-xs text-muted-foreground">
                            {Math.round(
                              ((employee.selfAssessmentComplete ? 25 : 0) +
                              (employee.supervisorReviewComplete ? 25 : 0) +
                              (employee.hrEvaluationComplete ? 25 : 0) +
                              (employee.managementApprovalComplete ? 25 : 0))
                            )}%
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          {employee.overallScore}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={employee.succession}
                          onValueChange={(value) => handleSuccessionUpdate(employee.id, value)}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">Not Set</SelectItem>
                            <SelectItem value="ready-now">Ready Now</SelectItem>
                            <SelectItem value="future-leader">Future Leader</SelectItem>
                            <SelectItem value="needs-development">Needs Development</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStartAssessment(employee)}
                          >
                            <Eye size={14} />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleGenerateIncrementLetter(employee)}
                          >
                            <Download size={14} />
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

        <TabsContent value="assessments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Workflow</CardTitle>
              <CardDescription>Manage the complete assessment process from self-evaluation to final approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Workflow Steps */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                      1
                    </div>
                    <span className="font-medium">Self Assessment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                      2
                    </div>
                    <span className="font-medium">Supervisor Review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                      3
                    </div>
                    <span className="font-medium">HR Evaluation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                      4
                    </div>
                    <span className="font-medium">Final Approval</span>
                  </div>
                </div>

                {/* Assessment Actions */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">KPI Tracking</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">JD vs Achievement</span>
                          <Button variant="outline" size="sm" onClick={addNewKPI}>
                            <Plus size={14} />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {kpis.slice(0, 3).map((kpi) => (
                            <div key={kpi.id} className="flex items-center justify-between text-sm">
                              <span className="truncate">{kpi.description || 'New KPI'}</span>
                              <Badge variant="secondary">{kpi.score}%</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Self Assessment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-sm text-muted-foreground">
                          Employee self-evaluation form
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Goal Achievement</span>
                            <span>85%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Skills Development</span>
                            <span>90%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Collaboration</span>
                            <span>88%</span>
                          </div>
                        </div>
                        <Button size="sm" className="w-full">
                          Start Assessment
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Supervisor Review</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-sm text-muted-foreground">
                          Manager evaluation and recommendations
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Performance</span>
                            <span>Excellent</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Leadership</span>
                            <span>Good</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Communication</span>
                            <span>Outstanding</span>
                          </div>
                        </div>
                        <Button size="sm" className="w-full" onClick={() => handleSupervisorReview('1')}>
                          Submit Review
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">HR Evaluation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-sm text-muted-foreground">
                          HR assessment criteria
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Discipline</span>
                            <span>Excellent</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Attendance</span>
                            <span>Good</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Behavior</span>
                            <span>Outstanding</span>
                          </div>
                        </div>
                        <Button size="sm" className="w-full" onClick={() => handleHRApproval('1')}>
                          Complete Evaluation
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* KPI Management Table */}
          <Card>
            <CardHeader>
              <CardTitle>KPI Management</CardTitle>
              <CardDescription>Manage Job Description targets vs actual achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>KPI Description</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Achievement</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Comments</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {kpis.map((kpi) => (
                    <TableRow key={kpi.id}>
                      <TableCell>
                        <Input
                          value={kpi.description}
                          onChange={(e) => updateKPI(kpi.id, 'description', e.target.value)}
                          placeholder="Enter KPI description"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={kpi.target}
                          onChange={(e) => updateKPI(kpi.id, 'target', e.target.value)}
                          placeholder="Target value"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={kpi.achievement}
                          onChange={(e) => updateKPI(kpi.id, 'achievement', e.target.value)}
                          placeholder="Actual achievement"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={kpi.score}
                          onChange={(e) => updateKPI(kpi.id, 'score', parseInt(e.target.value))}
                          min="0"
                          max="100"
                          className="w-20"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={kpi.comments}
                          onChange={(e) => updateKPI(kpi.id, 'comments', e.target.value)}
                          placeholder="Comments"
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteKPI(kpi.id)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="succession" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Succession Planning</CardTitle>
              <CardDescription>Identify and develop future leaders within the organization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Ready Now */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-green-600">Ready Now</CardTitle>
                    <CardDescription>High performers ready for immediate promotion</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {employees.filter(e => e.succession === 'ready-now').map((employee) => (
                        <div key={employee.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{employee.name}</div>
                            <div className="text-sm text-muted-foreground">{employee.department}</div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">{employee.overallScore}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Future Leaders */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-600">Future Leaders</CardTitle>
                    <CardDescription>Potential leaders with development needs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {employees.filter(e => e.succession === 'future-leader').map((employee) => (
                        <div key={employee.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{employee.name}</div>
                            <div className="text-sm text-muted-foreground">{employee.department}</div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">{employee.overallScore}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Needs Development */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-orange-600">Needs Development</CardTitle>
                    <CardDescription>Requires improvement and training</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {employees.filter(e => e.succession === 'needs-development').map((employee) => (
                        <div key={employee.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{employee.name}</div>
                            <div className="text-sm text-muted-foreground">{employee.department}</div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">{employee.overallScore}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Reports</CardTitle>
              <CardDescription>Comprehensive performance analytics and reporting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Department Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Engineering</span>
                        <div className="flex items-center gap-2">
                          <Progress value={92} className="w-20" />
                          <span className="text-sm">92%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Marketing</span>
                        <div className="flex items-center gap-2">
                          <Progress value={85} className="w-20" />
                          <span className="text-sm">85%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>HR</span>
                        <div className="flex items-center gap-2">
                          <Progress value={88} className="w-20" />
                          <span className="text-sm">88%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Finance</span>
                        <div className="flex items-center gap-2">
                          <Progress value={90} className="w-20" />
                          <span className="text-sm">90%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Assessment Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Completed</span>
                        <Badge className="bg-green-100 text-green-800">
                          {employees.filter(e => e.status === 'approved').length}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>In Review</span>
                        <Badge className="bg-blue-100 text-blue-800">
                          {employees.filter(e => e.status === 'in-review').length}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Pending</span>
                        <Badge className="bg-yellow-100 text-yellow-800">
                          {employees.filter(e => e.status === 'pending').length}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-4 mt-6">
                <Button className="gap-2">
                  <Download size={16} />
                  Export Performance Report
                </Button>
                <Button variant="outline" className="gap-2">
                  <BarChart3 size={16} />
                  Generate Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Assessment Modal */}
      <Dialog open={showNewAssessment} onOpenChange={setShowNewAssessment}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Employee Performance Assessment</DialogTitle>
            <DialogDescription>
              Complete the performance evaluation for {selectedEmployee?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <Tabs defaultValue="self-assessment" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="self-assessment">Self Assessment</TabsTrigger>
                <TabsTrigger value="supervisor">Supervisor Review</TabsTrigger>
                <TabsTrigger value="hr">HR Evaluation</TabsTrigger>
                <TabsTrigger value="management">Management</TabsTrigger>
              </TabsList>
              
              <TabsContent value="self-assessment" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label>Goals Achievement</Label>
                    <Slider
                      value={[assessmentData.selfAssessment.goalsAchieved]}
                      onValueChange={(value) => setAssessmentData({
                        ...assessmentData,
                        selfAssessment: { ...assessmentData.selfAssessment, goalsAchieved: value[0] }
                      })}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                    <div className="text-sm text-muted-foreground mt-1">
                      {assessmentData.selfAssessment.goalsAchieved}%
                    </div>
                  </div>
                  <div>
                    <Label>Skills Development</Label>
                    <Slider
                      value={[assessmentData.selfAssessment.skillsDevelopment]}
                      onValueChange={(value) => setAssessmentData({
                        ...assessmentData,
                        selfAssessment: { ...assessmentData.selfAssessment, skillsDevelopment: value[0] }
                      })}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                    <div className="text-sm text-muted-foreground mt-1">
                      {assessmentData.selfAssessment.skillsDevelopment}%
                    </div>
                  </div>
                  <div>
                    <Label>Collaboration</Label>
                    <Slider
                      value={[assessmentData.selfAssessment.collaboration]}
                      onValueChange={(value) => setAssessmentData({
                        ...assessmentData,
                        selfAssessment: { ...assessmentData.selfAssessment, collaboration: value[0] }
                      })}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                    <div className="text-sm text-muted-foreground mt-1">
                      {assessmentData.selfAssessment.collaboration}%
                    </div>
                  </div>
                  <div>
                    <Label>Innovation</Label>
                    <Slider
                      value={[assessmentData.selfAssessment.innovation]}
                      onValueChange={(value) => setAssessmentData({
                        ...assessmentData,
                        selfAssessment: { ...assessmentData.selfAssessment, innovation: value[0] }
                      })}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                    <div className="text-sm text-muted-foreground mt-1">
                      {assessmentData.selfAssessment.innovation}%
                    </div>
                  </div>
                  <div>
                    <Label>Comments</Label>
                    <Textarea
                      value={assessmentData.selfAssessment.comments}
                      onChange={(e) => setAssessmentData({
                        ...assessmentData,
                        selfAssessment: { ...assessmentData.selfAssessment, comments: e.target.value }
                      })}
                      placeholder="Additional comments..."
                      className="mt-2"
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="supervisor" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label>Performance Rating</Label>
                    <Select
                      value={assessmentData.supervisorAssessment.performance.toString()}
                      onValueChange={(value) => setAssessmentData({
                        ...assessmentData,
                        supervisorAssessment: { ...assessmentData.supervisorAssessment, performance: parseInt(value) }
                      })}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Poor</SelectItem>
                        <SelectItem value="2">Below Average</SelectItem>
                        <SelectItem value="3">Average</SelectItem>
                        <SelectItem value="4">Good</SelectItem>
                        <SelectItem value="5">Excellent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Reliability</Label>
                    <Slider
                      value={[assessmentData.supervisorAssessment.reliability]}
                      onValueChange={(value) => setAssessmentData({
                        ...assessmentData,
                        supervisorAssessment: { ...assessmentData.supervisorAssessment, reliability: value[0] }
                      })}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                    <div className="text-sm text-muted-foreground mt-1">
                      {assessmentData.supervisorAssessment.reliability}%
                    </div>
                  </div>
                  <div>
                    <Label>Recommendation</Label>
                    <Select
                      value={assessmentData.supervisorAssessment.recommendation}
                      onValueChange={(value) => setAssessmentData({
                        ...assessmentData,
                        supervisorAssessment: { ...assessmentData.supervisorAssessment, recommendation: value }
                      })}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select recommendation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="promotion">Promotion</SelectItem>
                        <SelectItem value="increment">Increment</SelectItem>
                        <SelectItem value="training">Additional Training</SelectItem>
                        <SelectItem value="maintain">Maintain Current Role</SelectItem>
                        <SelectItem value="improvement">Performance Improvement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Supervisor Comments</Label>
                    <Textarea
                      value={assessmentData.supervisorAssessment.comments}
                      onChange={(e) => setAssessmentData({
                        ...assessmentData,
                        supervisorAssessment: { ...assessmentData.supervisorAssessment, comments: e.target.value }
                      })}
                      placeholder="Detailed feedback and recommendations..."
                      className="mt-2"
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="hr" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label>Discipline</Label>
                    <Slider
                      value={[assessmentData.hrEvaluation.discipline]}
                      onValueChange={(value) => setAssessmentData({
                        ...assessmentData,
                        hrEvaluation: { ...assessmentData.hrEvaluation, discipline: value[0] }
                      })}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                    <div className="text-sm text-muted-foreground mt-1">
                      {assessmentData.hrEvaluation.discipline}%
                    </div>
                  </div>
                  <div>
                    <Label>Attendance</Label>
                    <Slider
                      value={[assessmentData.hrEvaluation.attendance]}
                      onValueChange={(value) => setAssessmentData({
                        ...assessmentData,
                        hrEvaluation: { ...assessmentData.hrEvaluation, attendance: value[0] }
                      })}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                    <div className="text-sm text-muted-foreground mt-1">
                      {assessmentData.hrEvaluation.attendance}%
                    </div>
                  </div>
                  <div>
                    <Label>Leave Management</Label>
                    <Slider
                      value={[assessmentData.hrEvaluation.leaveManagement]}
                      onValueChange={(value) => setAssessmentData({
                        ...assessmentData,
                        hrEvaluation: { ...assessmentData.hrEvaluation, leaveManagement: value[0] }
                      })}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                    <div className="text-sm text-muted-foreground mt-1">
                      {assessmentData.hrEvaluation.leaveManagement}%
                    </div>
                  </div>
                  <div>
                    <Label>Office Etiquette</Label>
                    <Slider
                      value={[assessmentData.hrEvaluation.officeEtiquette]}
                      onValueChange={(value) => setAssessmentData({
                        ...assessmentData,
                        hrEvaluation: { ...assessmentData.hrEvaluation, officeEtiquette: value[0] }
                      })}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                    <div className="text-sm text-muted-foreground mt-1">
                      {assessmentData.hrEvaluation.officeEtiquette}%
                    </div>
                  </div>
                  <div>
                    <Label>Behavior</Label>
                    <Slider
                      value={[assessmentData.hrEvaluation.behavior]}
                      onValueChange={(value) => setAssessmentData({
                        ...assessmentData,
                        hrEvaluation: { ...assessmentData.hrEvaluation, behavior: value[0] }
                      })}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                    <div className="text-sm text-muted-foreground mt-1">
                      {assessmentData.hrEvaluation.behavior}%
                    </div>
                  </div>
                  <div>
                    <Label>HR Comments</Label>
                    <Textarea
                      value={assessmentData.hrEvaluation.comments}
                      onChange={(e) => setAssessmentData({
                        ...assessmentData,
                        hrEvaluation: { ...assessmentData.hrEvaluation, comments: e.target.value }
                      })}
                      placeholder="HR evaluation comments..."
                      className="mt-2"
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="management" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label>Management Direction</Label>
                    <Select
                      value={assessmentData.managementOpinion.direction}
                      onValueChange={(value) => setAssessmentData({
                        ...assessmentData,
                        managementOpinion: { ...assessmentData.managementOpinion, direction: value }
                      })}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select direction" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="approve">Approve Recommendations</SelectItem>
                        <SelectItem value="reassess">Require Re-assessment</SelectItem>
                        <SelectItem value="modify">Modify Recommendations</SelectItem>
                        <SelectItem value="reject">Reject Assessment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Next Steps</Label>
                    <Textarea
                      value={assessmentData.managementOpinion.nextSteps}
                      onChange={(e) => setAssessmentData({
                        ...assessmentData,
                        managementOpinion: { ...assessmentData.managementOpinion, nextSteps: e.target.value }
                      })}
                      placeholder="Define next steps and action items..."
                      className="mt-2"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="final-approval"
                      checked={assessmentData.managementOpinion.approved}
                      onCheckedChange={(checked) => setAssessmentData({
                        ...assessmentData,
                        managementOpinion: { ...assessmentData.managementOpinion, approved: checked as boolean }
                      })}
                    />
                    <Label htmlFor="final-approval">Grant Final Approval</Label>
                  </div>
                  <div>
                    <Label>Management Comments</Label>
                    <Textarea
                      value={assessmentData.managementOpinion.comments}
                      onChange={(e) => setAssessmentData({
                        ...assessmentData,
                        managementOpinion: { ...assessmentData.managementOpinion, comments: e.target.value }
                      })}
                      placeholder="Final management comments..."
                      className="mt-2"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setShowNewAssessment(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveAssessment}>
                Save Assessment
              </Button>
              <Button onClick={() => handleFinalApproval('1')}>
                Final Approval
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PerformanceManagement;