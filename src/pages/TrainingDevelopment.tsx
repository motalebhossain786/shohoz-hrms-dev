import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import {
  BookOpen, Users, TrendingUp, Target, Plus, Edit, Trash2,
  Calendar as CalendarIcon, FileText, Video, Link, Award,
  AlertTriangle, CheckCircle, Clock, Star, Filter, Search,
  Upload, Download, Eye, BarChart3, PieChart, User
} from 'lucide-react';

// Mock Data
const mockTrainingSessions = [
  {
    id: 1,
    title: 'React Development Fundamentals',
    department: 'Engineering',
    trainer: 'John Smith',
    duration: '40 hours',
    status: 'Active',
    participants: 12,
    completionRate: 75,
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    materials: ['react-basics.pdf', 'component-video.mp4'],
    description: 'Comprehensive React training for frontend developers'
  },
  {
    id: 2,
    title: 'Leadership Skills Workshop',
    department: 'Management',
    trainer: 'Sarah Johnson',
    duration: '20 hours',
    status: 'Completed',
    participants: 8,
    completionRate: 100,
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    materials: ['leadership-guide.pdf'],
    description: 'Essential leadership skills for team managers'
  },
  {
    id: 3,
    title: 'Digital Marketing Strategy',
    department: 'Marketing',
    trainer: 'Mike Wilson',
    duration: '30 hours',
    status: 'Planned',
    participants: 6,
    completionRate: 0,
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    materials: [],
    description: 'Modern digital marketing techniques and strategies'
  }
];

const mockEmployees = [
  {
    id: 1,
    name: 'Alice Cooper',
    department: 'Engineering',
    position: 'Frontend Developer',
    supervisor: 'John Smith',
    performanceScore: 3.2,
    targetScore: 4.0,
    skillGaps: ['Advanced React', 'TypeScript', 'Testing'],
    assignedTrainings: ['React Development Fundamentals'],
    completedTrainings: ['JavaScript Basics'],
    developmentGoals: [
      { goal: 'Master React Hooks', deadline: '2024-04-01', progress: 60 },
      { goal: 'Complete TypeScript Certification', deadline: '2024-05-01', progress: 30 }
    ]
  },
  {
    id: 2,
    name: 'Bob Johnson',
    department: 'Marketing',
    position: 'Marketing Specialist',
    supervisor: 'Sarah Wilson',
    performanceScore: 3.8,
    targetScore: 4.2,
    skillGaps: ['SEO Optimization', 'Analytics'],
    assignedTrainings: ['Digital Marketing Strategy'],
    completedTrainings: ['Content Marketing Basics'],
    developmentGoals: [
      { goal: 'Google Analytics Certification', deadline: '2024-03-15', progress: 80 },
      { goal: 'SEO Best Practices', deadline: '2024-04-15', progress: 45 }
    ]
  }
];

const mockDepartments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];
const mockSkills = ['React', 'TypeScript', 'Leadership', 'Communication', 'Project Management', 'Data Analysis', 'SEO', 'Design'];

const TrainingDevelopment = () => {
  const [trainingSessions, setTrainingSessions] = useState(mockTrainingSessions);
  const [employees, setEmployees] = useState(mockEmployees);
  const [isCreateTrainingOpen, setIsCreateTrainingOpen] = useState(false);
  const [isGapAnalysisOpen, setIsGapAnalysisOpen] = useState(false);
  const [isRecommendationOpen, setIsRecommendationOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [filters, setFilters] = useState({
    department: '',
    status: '',
    search: ''
  });

  // Training Session Form State
  const [trainingForm, setTrainingForm] = useState({
    title: '',
    department: '',
    trainer: '',
    duration: '',
    description: '',
    startDate: null,
    endDate: null,
    materials: []
  });

  // GAP Analysis Form State
  const [gapAnalysisForm, setGapAnalysisForm] = useState({
    employeeId: '',
    currentSkills: [],
    requiredSkills: [],
    performanceGaps: '',
    recommendedTrainings: []
  });

  // Recommendation Form State
  const [recommendationForm, setRecommendationForm] = useState({
    employeeId: '',
    trainingTopic: '',
    skillArea: '',
    materials: '',
    deadline: null,
    targetScore: ''
  });

  const handleCreateTraining = () => {
    const newTraining = {
      id: trainingSessions.length + 1,
      ...trainingForm,
      status: 'Planned',
      participants: 0,
      completionRate: 0,
      startDate: trainingForm.startDate ? format(trainingForm.startDate, 'yyyy-MM-dd') : '',
      endDate: trainingForm.endDate ? format(trainingForm.endDate, 'yyyy-MM-dd') : '',
      materials: trainingForm.materials || []
    };

    setTrainingSessions([...trainingSessions, newTraining]);
    setTrainingForm({
      title: '',
      department: '',
      trainer: '',
      duration: '',
      description: '',
      startDate: null,
      endDate: null,
      materials: []
    });
    setIsCreateTrainingOpen(false);
    toast({
      title: "Training Session Created",
      description: "New training session has been successfully created."
    });
  };

  const handleGapAnalysis = () => {
    const employee = employees.find(emp => emp.id === parseInt(gapAnalysisForm.employeeId));
    if (employee) {
      const updatedEmployee = {
        ...employee,
        skillGaps: gapAnalysisForm.requiredSkills.filter(skill => 
          !gapAnalysisForm.currentSkills.includes(skill)
        )
      };
      
      setEmployees(employees.map(emp => 
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      ));
      
      setGapAnalysisForm({
        employeeId: '',
        currentSkills: [],
        requiredSkills: [],
        performanceGaps: '',
        recommendedTrainings: []
      });
      setIsGapAnalysisOpen(false);
      toast({
        title: "GAP Analysis Completed",
        description: "Skill gaps have been identified and recorded."
      });
    }
  };

  const handleRecommendation = () => {
    const employee = employees.find(emp => emp.id === parseInt(recommendationForm.employeeId));
    if (employee) {
      const newGoal = {
        goal: recommendationForm.trainingTopic,
        deadline: recommendationForm.deadline ? format(recommendationForm.deadline, 'yyyy-MM-dd') : '',
        progress: 0
      };
      
      const updatedEmployee = {
        ...employee,
        developmentGoals: [...employee.developmentGoals, newGoal]
      };
      
      setEmployees(employees.map(emp => 
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      ));
      
      setRecommendationForm({
        employeeId: '',
        trainingTopic: '',
        skillArea: '',
        materials: '',
        deadline: null,
        targetScore: ''
      });
      setIsRecommendationOpen(false);
      toast({
        title: "Training Recommended",
        description: "Training recommendation has been assigned to the employee."
      });
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Planned': { variant: 'secondary', icon: Clock },
      'Active': { variant: 'default', icon: CheckCircle },
      'Completed': { variant: 'outline', icon: Award }
    };
    
    const config = statusConfig[status] || statusConfig['Planned'];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon size={12} />
        {status}
      </Badge>
    );
  };

  const filteredTrainingSessions = trainingSessions.filter(session => {
    return (
      (filters.department === '' || session.department === filters.department) &&
      (filters.status === '' || session.status === filters.status) &&
      (filters.search === '' || 
        session.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        session.trainer.toLowerCase().includes(filters.search.toLowerCase())
      )
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Training & Development</h1>
          <p className="text-muted-foreground">Manage employee skill development and training programs</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            Analytics
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active Trainings</p>
                <p className="text-2xl font-bold">{trainingSessions.filter(t => t.status === 'Active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Participants</p>
                <p className="text-2xl font-bold">{trainingSessions.reduce((sum, t) => sum + t.participants, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Avg Completion</p>
                <p className="text-2xl font-bold">{Math.round(trainingSessions.reduce((sum, t) => sum + t.completionRate, 0) / trainingSessions.length)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Skill Gaps</p>
                <p className="text-2xl font-bold">{employees.reduce((sum, emp) => sum + emp.skillGaps.length, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="training-library" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="training-library">Training Library</TabsTrigger>
          <TabsTrigger value="gap-analysis">GAP Analysis</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="progress-tracking">Progress Tracking</TabsTrigger>
        </TabsList>

        {/* Training Library Tab */}
        <TabsContent value="training-library" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search training sessions..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-64"
                />
              </div>
              <Select value={filters.department} onValueChange={(value) => setFilters({ ...filters, department: value })}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Departments</SelectItem>
                  {mockDepartments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Status</SelectItem>
                  <SelectItem value="Planned">Planned</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Dialog open={isCreateTrainingOpen} onOpenChange={setIsCreateTrainingOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Training
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Training Session</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Training Title</Label>
                      <Input
                        id="title"
                        value={trainingForm.title}
                        onChange={(e) => setTrainingForm({ ...trainingForm, title: e.target.value })}
                        placeholder="Enter training title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select value={trainingForm.department} onValueChange={(value) => setTrainingForm({ ...trainingForm, department: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockDepartments.map(dept => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="trainer">Trainer</Label>
                      <Input
                        id="trainer"
                        value={trainingForm.trainer}
                        onChange={(e) => setTrainingForm({ ...trainingForm, trainer: e.target.value })}
                        placeholder="Enter trainer name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        value={trainingForm.duration}
                        onChange={(e) => setTrainingForm({ ...trainingForm, duration: e.target.value })}
                        placeholder="e.g., 40 hours"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {trainingForm.startDate ? format(trainingForm.startDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={trainingForm.startDate}
                            onSelect={(date) => setTrainingForm({ ...trainingForm, startDate: date })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {trainingForm.endDate ? format(trainingForm.endDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={trainingForm.endDate}
                            onSelect={(date) => setTrainingForm({ ...trainingForm, endDate: date })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={trainingForm.description}
                      onChange={(e) => setTrainingForm({ ...trainingForm, description: e.target.value })}
                      placeholder="Enter training description"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Training Materials</Label>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Files
                      </Button>
                      <Button variant="outline" size="sm">
                        <Link className="mr-2 h-4 w-4" />
                        Add Links
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateTrainingOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateTraining}>
                    Create Training
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {filteredTrainingSessions.map((session) => (
              <Card key={session.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold">{session.title}</h3>
                        {getStatusBadge(session.status)}
                      </div>
                      <p className="text-muted-foreground mb-4">{session.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="font-medium">Department</p>
                          <p className="text-muted-foreground">{session.department}</p>
                        </div>
                        <div>
                          <p className="font-medium">Trainer</p>
                          <p className="text-muted-foreground">{session.trainer}</p>
                        </div>
                        <div>
                          <p className="font-medium">Duration</p>
                          <p className="text-muted-foreground">{session.duration}</p>
                        </div>
                        <div>
                          <p className="font-medium">Participants</p>
                          <p className="text-muted-foreground">{session.participants}</p>
                        </div>
                      </div>
                      {session.status === 'Active' && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium">Completion Progress</p>
                            <p className="text-sm text-muted-foreground">{session.completionRate}%</p>
                          </div>
                          <Progress value={session.completionRate} className="h-2" />
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* GAP Analysis Tab */}
        <TabsContent value="gap-analysis" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Skill GAP Analysis</h2>
              <p className="text-muted-foreground">Identify skill gaps and recommend development paths</p>
            </div>
            <Dialog open={isGapAnalysisOpen} onOpenChange={setIsGapAnalysisOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New GAP Analysis
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Conduct GAP Analysis</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label>Select Employee</Label>
                    <Select value={gapAnalysisForm.employeeId} onValueChange={(value) => setGapAnalysisForm({ ...gapAnalysisForm, employeeId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
                      <SelectContent>
                        {employees.map(emp => (
                          <SelectItem key={emp.id} value={emp.id.toString()}>
                            {emp.name} - {emp.position}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Current Skills</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {mockSkills.map(skill => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox
                            id={`current-${skill}`}
                            checked={gapAnalysisForm.currentSkills.includes(skill)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setGapAnalysisForm({
                                  ...gapAnalysisForm,
                                  currentSkills: [...gapAnalysisForm.currentSkills, skill]
                                });
                              } else {
                                setGapAnalysisForm({
                                  ...gapAnalysisForm,
                                  currentSkills: gapAnalysisForm.currentSkills.filter(s => s !== skill)
                                });
                              }
                            }}
                          />
                          <Label htmlFor={`current-${skill}`} className="text-sm">{skill}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Required Skills</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {mockSkills.map(skill => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox
                            id={`required-${skill}`}
                            checked={gapAnalysisForm.requiredSkills.includes(skill)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setGapAnalysisForm({
                                  ...gapAnalysisForm,
                                  requiredSkills: [...gapAnalysisForm.requiredSkills, skill]
                                });
                              } else {
                                setGapAnalysisForm({
                                  ...gapAnalysisForm,
                                  requiredSkills: gapAnalysisForm.requiredSkills.filter(s => s !== skill)
                                });
                              }
                            }}
                          />
                          <Label htmlFor={`required-${skill}`} className="text-sm">{skill}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="performance-gaps">Performance Gaps</Label>
                    <Textarea
                      id="performance-gaps"
                      value={gapAnalysisForm.performanceGaps}
                      onChange={(e) => setGapAnalysisForm({ ...gapAnalysisForm, performanceGaps: e.target.value })}
                      placeholder="Describe performance gaps and areas for improvement"
                      rows={3}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsGapAnalysisOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleGapAnalysis}>
                    Save Analysis
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {employees.map((employee) => (
              <Card key={employee.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{employee.name}</h3>
                          <p className="text-sm text-muted-foreground">{employee.position} • {employee.department}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="font-medium mb-2">Performance Score</p>
                          <div className="flex items-center space-x-2">
                            <Progress value={(employee.performanceScore / 5) * 100} className="h-2 flex-1" />
                            <span className="text-sm">{employee.performanceScore}/5.0</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Target: {employee.targetScore}/5.0</p>
                        </div>
                        <div>
                          <p className="font-medium mb-2">Skill Gaps</p>
                          <div className="flex flex-wrap gap-1">
                            {employee.skillGaps.map((gap, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                <AlertTriangle className="mr-1 h-3 w-3" />
                                {gap}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="font-medium mb-2">Assigned Trainings</p>
                          <div className="space-y-1">
                            {employee.assignedTrainings.map((training, index) => (
                              <p key={index} className="text-sm text-muted-foreground">{training}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Recommend Training
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Training Recommendations</h2>
              <p className="text-muted-foreground">Assign personalized development paths</p>
            </div>
            <Dialog open={isRecommendationOpen} onOpenChange={setIsRecommendationOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Recommendation
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create Training Recommendation</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label>Select Employee</Label>
                    <Select value={recommendationForm.employeeId} onValueChange={(value) => setRecommendationForm({ ...recommendationForm, employeeId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
                      <SelectContent>
                        {employees.map(emp => (
                          <SelectItem key={emp.id} value={emp.id.toString()}>
                            {emp.name} - {emp.position}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="training-topic">Training Topic</Label>
                      <Input
                        id="training-topic"
                        value={recommendationForm.trainingTopic}
                        onChange={(e) => setRecommendationForm({ ...recommendationForm, trainingTopic: e.target.value })}
                        placeholder="Enter training topic"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="skill-area">Skill Area</Label>
                      <Select value={recommendationForm.skillArea} onValueChange={(value) => setRecommendationForm({ ...recommendationForm, skillArea: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select skill area" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockSkills.map(skill => (
                            <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="materials">Training Materials</Label>
                    <Textarea
                      id="materials"
                      value={recommendationForm.materials}
                      onChange={(e) => setRecommendationForm({ ...recommendationForm, materials: e.target.value })}
                      placeholder="Enter training materials or links"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Target Deadline</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {recommendationForm.deadline ? format(recommendationForm.deadline, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={recommendationForm.deadline}
                            onSelect={(date) => setRecommendationForm({ ...recommendationForm, deadline: date })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="target-score">Target Score</Label>
                      <Input
                        id="target-score"
                        value={recommendationForm.targetScore}
                        onChange={(e) => setRecommendationForm({ ...recommendationForm, targetScore: e.target.value })}
                        placeholder="e.g., 4.5"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsRecommendationOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleRecommendation}>
                    Create Recommendation
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Recommended Training</TableHead>
                <TableHead>Skill Area</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.flatMap(emp => 
                emp.developmentGoals.map((goal, index) => (
                  <TableRow key={`${emp.id}-${index}`}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{emp.name}</p>
                        <p className="text-sm text-muted-foreground">{emp.position}</p>
                      </div>
                    </TableCell>
                    <TableCell>{goal.goal}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {emp.skillGaps[0] || 'General'}
                      </Badge>
                    </TableCell>
                    <TableCell>{goal.deadline}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={goal.progress} className="h-2 w-16" />
                        <span className="text-sm">{goal.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Progress Tracking Tab */}
        <TabsContent value="progress-tracking" className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Development Progress Tracking</h2>
            <p className="text-muted-foreground">Monitor employee development goals and outcomes</p>
          </div>

          <div className="grid gap-4">
            {employees.map((employee) => (
              <Card key={employee.id}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p>{employee.name}</p>
                      <p className="text-sm font-normal text-muted-foreground">{employee.position} • {employee.department}</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium mb-2">Development Goals</p>
                        <div className="space-y-3">
                          {employee.developmentGoals.map((goal, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">{goal.goal}</p>
                                <span className="text-xs text-muted-foreground">{goal.deadline}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Progress value={goal.progress} className="h-2 flex-1" />
                                <span className="text-sm">{goal.progress}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="font-medium mb-2">Training History</p>
                        <div className="space-y-2">
                          {employee.completedTrainings.map((training, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-sm">{training}</span>
                            </div>
                          ))}
                          {employee.assignedTrainings.map((training, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-yellow-600" />
                              <span className="text-sm">{training}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        Update Progress
                      </Button>
                      <Button variant="outline" size="sm">
                        Add Goal
                      </Button>
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

export default TrainingDevelopment;