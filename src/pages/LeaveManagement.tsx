import React, { useState } from 'react';
import { Calendar, Clock, Users, Settings, FileText, Bell, Plus, Edit, Trash2, Eye, Check, X, AlertCircle, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';

interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: string;
  startDate: Date;
  endDate: Date;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';
  appliedDate: Date;
  approver?: string;
  attachments?: string[];
}

interface LeaveType {
  id: string;
  name: string;
  code: string;
  maxDays: number;
  carryForward: boolean;
  encashment: boolean;
  eligibility: string;
  color: string;
}

interface LeaveBalance {
  employeeId: string;
  leaveType: string;
  allocated: number;
  used: number;
  balance: number;
  carryForward: number;
}

interface Holiday {
  date: Date;
  name: string;
  type: 'Public' | 'Optional' | 'Company';
  description: string;
}

const LeaveManagement = () => {
  const [activeTab, setActiveTab] = useState('applications');
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  // Mock data
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: '1',
      employeeId: 'EMP001',
      employeeName: 'Ahmed Rahman',
      leaveType: 'AL',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-01-17'),
      days: 3,
      reason: 'Family vacation',
      status: 'Pending',
      appliedDate: new Date('2024-01-10'),
    },
    {
      id: '2',
      employeeId: 'EMP002',
      employeeName: 'Fatima Khan',
      leaveType: 'ML',
      startDate: new Date('2024-01-20'),
      endDate: new Date('2024-01-22'),
      days: 3,
      reason: 'Medical checkup',
      status: 'Approved',
      appliedDate: new Date('2024-01-12'),
      approver: 'HR Manager',
    },
  ]);

  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([
    { id: '1', name: 'Annual Leave', code: 'AL', maxDays: 21, carryForward: true, encashment: true, eligibility: 'All employees', color: 'bg-green-500' },
    { id: '2', name: 'Casual Leave', code: 'CL', maxDays: 10, carryForward: false, encashment: false, eligibility: 'All employees', color: 'bg-blue-500' },
    { id: '3', name: 'Medical Leave', code: 'ML', maxDays: 14, carryForward: false, encashment: false, eligibility: 'All employees', color: 'bg-red-500' },
    { id: '4', name: 'Leave Without Pay', code: 'LWP', maxDays: 30, carryForward: false, encashment: false, eligibility: 'All employees', color: 'bg-gray-500' },
    { id: '5', name: 'Maternity Leave', code: 'MAT', maxDays: 112, carryForward: false, encashment: false, eligibility: 'Female employees', color: 'bg-pink-500' },
  ]);

  const [leaveBalances] = useState<LeaveBalance[]>([
    { employeeId: 'EMP001', leaveType: 'AL', allocated: 21, used: 5, balance: 16, carryForward: 2 },
    { employeeId: 'EMP001', leaveType: 'CL', allocated: 10, used: 3, balance: 7, carryForward: 0 },
    { employeeId: 'EMP001', leaveType: 'ML', allocated: 14, used: 0, balance: 14, carryForward: 0 },
  ]);

  const [holidays] = useState<Holiday[]>([
    { date: new Date('2024-02-21'), name: 'International Mother Language Day', type: 'Public', description: 'National holiday commemorating language martyrs' },
    { date: new Date('2024-03-17'), name: 'Birthday of Sheikh Mujibur Rahman', type: 'Public', description: 'National Day and the Birthday of the Father of the Nation' },
    { date: new Date('2024-03-26'), name: 'Independence Day', type: 'Public', description: 'Independence Day of Bangladesh' },
    { date: new Date('2024-04-14'), name: 'Pohela Boishakh', type: 'Public', description: 'Bengali New Year' },
    { date: new Date('2024-05-01'), name: 'May Day', type: 'Public', description: 'International Workers Day' },
  ]);

  const handleSubmitLeave = (formData: any) => {
    const newRequest: LeaveRequest = {
      id: Date.now().toString(),
      employeeId: 'EMP001',
      employeeName: 'Current User',
      leaveType: formData.leaveType,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      days: formData.days,
      reason: formData.reason,
      status: 'Pending',
      appliedDate: new Date(),
    };

    setLeaveRequests([...leaveRequests, newRequest]);
    setShowApplicationModal(false);
    toast({ title: "Success", description: "Leave application submitted successfully" });
  };

  const handleApproveReject = (requestId: string, action: 'Approved' | 'Rejected') => {
    setLeaveRequests(leaveRequests.map(req => 
      req.id === requestId 
        ? { ...req, status: action, approver: 'Current Manager' }
        : req
    ));
    setShowApprovalModal(false);
    toast({ 
      title: "Success", 
      description: `Leave request ${action.toLowerCase()} successfully` 
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Approved': 'bg-green-100 text-green-800 border-green-200',
      'Rejected': 'bg-red-100 text-red-800 border-red-200',
      'Cancelled': 'bg-gray-100 text-gray-800 border-gray-200',
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || variants.Pending}>
        {status}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <Check className="h-4 w-4 text-green-600" />;
      case 'Rejected': return <X className="h-4 w-4 text-red-600" />;
      case 'Cancelled': return <X className="h-4 w-4 text-gray-600" />;
      default: return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const filteredRequests = leaveRequests.filter(request => {
    if (filterStatus !== 'all' && request.status !== filterStatus) return false;
    if (dateRange.from && dateRange.to) {
      const requestDate = request.appliedDate;
      const fromDate = new Date(dateRange.from);
      const toDate = new Date(dateRange.to);
      if (requestDate < fromDate || requestDate > toDate) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leave Management</h1>
          <p className="text-muted-foreground">Manage leave requests, balances, and policies</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setShowApplicationModal(true)} className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Apply Leave
          </Button>
          <Button variant="outline">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Requests</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {leaveRequests.filter(r => r.status === 'Pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved This Month</p>
                <p className="text-2xl font-bold text-green-600">
                  {leaveRequests.filter(r => r.status === 'Approved').length}
                </p>
              </div>
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available Balance</p>
                <p className="text-2xl font-bold text-blue-600">
                  {leaveBalances.reduce((acc, bal) => acc + bal.balance, 0)}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Upcoming Holidays</p>
                <p className="text-2xl font-bold text-purple-600">
                  {holidays.filter(h => h.date > new Date()).length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="balances">Balances</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* Leave Applications Tab */}
        <TabsContent value="applications" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label>Status Filter</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>From Date</Label>
                  <Input 
                    type="date" 
                    value={dateRange.from}
                    onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
                  />
                </div>
                <div>
                  <Label>To Date</Label>
                  <Input 
                    type="date" 
                    value={dateRange.to}
                    onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setFilterStatus('all');
                      setDateRange({ from: '', to: '' });
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Leave Requests Table */}
          <Card>
            <CardHeader>
              <CardTitle>Leave Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{request.employeeName}</p>
                          <p className="text-sm text-muted-foreground">{request.employeeId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{request.leaveType}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{format(request.startDate, 'MMM dd')} - {format(request.endDate, 'MMM dd')}</p>
                        </div>
                      </TableCell>
                      <TableCell>{request.days}</TableCell>
                      <TableCell>{format(request.appliedDate, 'MMM dd, yyyy')}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(request.status)}
                          {getStatusBadge(request.status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedRequest(request);
                              setShowApprovalModal(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {request.status === 'Pending' && (
                            <>
                              <Button 
                                size="sm" 
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleApproveReject(request.id, 'Approved')}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleApproveReject(request.id, 'Rejected')}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
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

        {/* Leave Balances Tab */}
        <TabsContent value="balances" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Balance Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Leave Balance Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {leaveBalances.map((balance) => (
                  <div key={balance.leaveType} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{balance.leaveType}</span>
                      <span className="text-sm text-muted-foreground">
                        {balance.balance}/{balance.allocated}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(balance.balance / balance.allocated) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Used: {balance.used}</span>
                      <span>Available: {balance.balance}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Encashment Form */}
            <Card>
              <CardHeader>
                <CardTitle>Leave Encashment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Leave Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AL">Annual Leave (AL)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Days to Encash</Label>
                  <Input type="number" placeholder="Enter days" max="10" />
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-sm text-yellow-800">
                    💡 Maximum 10 days can be encashed per year. Rate: 1 day = Basic Salary/30
                  </p>
                </div>
                <Button className="w-full">Apply for Encashment</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Policies Tab */}
        <TabsContent value="policies" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Leave Policies</h3>
            <Button onClick={() => setShowPolicyModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Policy
            </Button>
          </div>

          <div className="grid gap-4">
            {leaveTypes.map((type) => (
              <Card key={type.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-4 h-4 rounded-full ${type.color}`}></div>
                      <div>
                        <h4 className="font-medium">{type.name} ({type.code})</h4>
                        <p className="text-sm text-muted-foreground">{type.eligibility}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Max Days</p>
                        <p className="font-semibold">{type.maxDays}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">Carry Forward</Label>
                        <Switch checked={type.carryForward} />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">Encashment</Label>
                        <Switch checked={type.encashment} />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Calendar Tab */}
        <TabsContent value="calendar" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Holiday Calendar 2024</CardTitle>
                </CardHeader>
                <CardContent>
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    modifiers={{
                      holiday: holidays.map(h => h.date),
                    }}
                    modifiersStyles={{
                      holiday: { backgroundColor: '#dc2626', color: 'white' }
                    }}
                  />
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Holidays</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {holidays
                    .filter(h => h.date > new Date())
                    .slice(0, 5)
                    .map((holiday, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{holiday.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(holiday.date, 'MMM dd, yyyy')}
                        </p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {holiday.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-semibold">Employee Leave Summary</h3>
                <p className="text-sm text-muted-foreground mb-3">Detailed leave report by employee</p>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <h3 className="font-semibold">Department Summary</h3>
                <p className="text-sm text-muted-foreground mb-3">Department-wise leave analytics</p>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Settings className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <h3 className="font-semibold">Policy Compliance</h3>
                <p className="text-sm text-muted-foreground mb-3">Leave policy adherence report</p>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Leave Summary Report</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>AL Used</TableHead>
                    <TableHead>CL Used</TableHead>
                    <TableHead>ML Used</TableHead>
                    <TableHead>Total Days</TableHead>
                    <TableHead>Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Ahmed Rahman</TableCell>
                    <TableCell>Engineering</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>8</TableCell>
                    <TableCell>37</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Fatima Khan</TableCell>
                    <TableCell>HR</TableCell>
                    <TableCell>10</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>15</TableCell>
                    <TableCell>30</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { id: 1, type: 'approval', message: 'Ahmed Rahman\'s leave request approved', time: '2 hours ago', icon: Check, color: 'text-green-600' },
                { id: 2, type: 'request', message: 'New leave request from Fatima Khan', time: '4 hours ago', icon: Clock, color: 'text-yellow-600' },
                { id: 3, type: 'reminder', message: 'Holiday: Independence Day approaching', time: '1 day ago', icon: AlertCircle, color: 'text-blue-600' },
                { id: 4, type: 'balance', message: 'Leave balance updated for Engineering dept', time: '2 days ago', icon: Calendar, color: 'text-purple-600' },
              ].map((notification) => (
                <div key={notification.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <notification.icon className={`h-5 w-5 ${notification.color}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Mark Read
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Leave Application Modal */}
      <Dialog open={showApplicationModal} onOpenChange={setShowApplicationModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Apply for Leave</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleSubmitLeave({
              leaveType: formData.get('leaveType'),
              startDate: formData.get('startDate'),
              endDate: formData.get('endDate'),
              days: parseInt(formData.get('days') as string),
              reason: formData.get('reason'),
            });
          }} className="space-y-4">
            <div>
              <Label>Leave Type</Label>
              <Select name="leaveType" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  {leaveTypes.map(type => (
                    <SelectItem key={type.id} value={type.code}>{type.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Date</Label>
                <Input type="date" name="startDate" required />
              </div>
              <div>
                <Label>End Date</Label>
                <Input type="date" name="endDate" required />
              </div>
            </div>
            <div>
              <Label>Number of Days</Label>
              <Input type="number" name="days" placeholder="Auto-calculated" />
            </div>
            <div>
              <Label>Reason</Label>
              <Textarea name="reason" placeholder="Enter reason for leave" required />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setShowApplicationModal(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit Application</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Leave Approval Modal */}
      <Dialog open={showApprovalModal} onOpenChange={setShowApprovalModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Leave Request Details</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-muted-foreground">Employee</Label>
                  <p className="font-medium">{selectedRequest.employeeName}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Leave Type</Label>
                  <p className="font-medium">{selectedRequest.leaveType}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Duration</Label>
                  <p className="font-medium">
                    {format(selectedRequest.startDate, 'MMM dd')} - {format(selectedRequest.endDate, 'MMM dd')}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Days</Label>
                  <p className="font-medium">{selectedRequest.days}</p>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Reason</Label>
                <p className="text-sm mt-1 p-2 bg-gray-50 rounded">{selectedRequest.reason}</p>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-muted-foreground">Current Status:</Label>
                {getStatusBadge(selectedRequest.status)}
              </div>
              {selectedRequest.status === 'Pending' && (
                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => handleApproveReject(selectedRequest.id, 'Approved')}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button 
                    className="flex-1" 
                    variant="destructive"
                    onClick={() => handleApproveReject(selectedRequest.id, 'Rejected')}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Policy Configuration Modal */}
      <Dialog open={showPolicyModal} onOpenChange={setShowPolicyModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Configure Leave Policy</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <div>
              <Label>Policy Name</Label>
              <Input placeholder="e.g., Paternity Leave" />
            </div>
            <div>
              <Label>Policy Code</Label>
              <Input placeholder="e.g., PAT" />
            </div>
            <div>
              <Label>Maximum Days</Label>
              <Input type="number" placeholder="e.g., 15" />
            </div>
            <div>
              <Label>Eligibility</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select eligibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All employees</SelectItem>
                  <SelectItem value="male">Male employees</SelectItem>
                  <SelectItem value="female">Female employees</SelectItem>
                  <SelectItem value="permanent">Permanent employees</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label>Carry Forward Allowed</Label>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <Label>Encashment Allowed</Label>
              <Switch />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setShowPolicyModal(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Policy</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeaveManagement;