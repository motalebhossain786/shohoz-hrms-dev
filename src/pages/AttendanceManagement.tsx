import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Calendar, CheckCircle, XCircle, AlertCircle, Edit, Trash2, Plus, Download, MapPin, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AttendanceManagement = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [editingRecord, setEditingRecord] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [editingOutOfOffice, setEditingOutOfOffice] = useState(null);
  const [creatingRoster, setCreatingRoster] = useState(false);
  const [editingRoster, setEditingRoster] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([
    { 
      id: 1, 
      employeeId: 'EMP001',
      name: 'John Doe', 
      department: 'Engineering',
      company: 'Shohoz Ltd',
      checkIn: '09:00 AM', 
      checkOut: '06:00 PM', 
      status: 'Present', 
      late: false,
      date: '2024-01-15',
      location: 'Office',
      notes: ''
    },
    { 
      id: 2, 
      employeeId: 'EMP002',
      name: 'Sarah Wilson', 
      department: 'Marketing',
      company: 'Shohoz Ltd',
      checkIn: '09:15 AM', 
      checkOut: '06:00 PM', 
      status: 'Present', 
      late: true,
      date: '2024-01-15',
      location: 'Office',
      notes: 'Late due to traffic'
    },
    { 
      id: 3, 
      employeeId: 'EMP003',
      name: 'Mike Johnson', 
      department: 'HR',
      company: 'Shohoz Ltd',
      checkIn: '-', 
      checkOut: '-', 
      status: 'On Leave', 
      late: false,
      date: '2024-01-15',
      location: 'N/A',
      notes: 'Annual leave'
    },
    { 
      id: 4, 
      employeeId: 'EMP004',
      name: 'Emily Chen', 
      department: 'Finance',
      company: 'Shohoz Ltd',
      checkIn: '08:45 AM', 
      checkOut: '05:30 PM', 
      status: 'Present', 
      late: false,
      date: '2024-01-15',
      location: 'Office',
      notes: ''
    },
    { 
      id: 5, 
      employeeId: 'EMP005',
      name: 'David Brown', 
      department: 'Engineering',
      company: 'Shohoz Ltd',
      checkIn: '-', 
      checkOut: '-', 
      status: 'Absent', 
      late: false,
      date: '2024-01-15',
      location: 'N/A',
      notes: 'No show'
    },
    { 
      id: 6, 
      employeeId: 'EMP006',
      name: 'Maria Garcia', 
      department: 'Sales',
      company: 'Shohoz Ltd',
      checkIn: '08:30 AM', 
      checkOut: '07:00 PM', 
      status: 'Out of Office', 
      late: false,
      date: '2024-01-15',
      location: 'Client Site - Dhaka',
      notes: 'Client meeting at Dhaka office'
    }
  ]);

  const [outOfOfficeRecords, setOutOfOfficeRecords] = useState([
    {
      id: 1,
      employeeId: 'EMP006',
      name: 'Maria Garcia',
      department: 'Sales',
      purpose: 'Client Meeting',
      location: 'Dhaka Office',
      startTime: '08:30 AM',
      endTime: '07:00 PM',
      date: '2024-01-15',
      status: 'Active'
    },
    {
      id: 2,
      employeeId: 'EMP007',
      name: 'James Wilson',
      department: 'Engineering',
      purpose: 'Site Visit',
      location: 'Chittagong Branch',
      startTime: '09:00 AM',
      endTime: '05:00 PM',
      date: '2024-01-15',
      status: 'Completed'
    }
  ]);

  const departments = ['Engineering', 'Marketing', 'HR', 'Finance', 'Sales'];
  const companies = ['Shohoz', 'SSV JV', 'Viajar'];

  const filteredRecords = attendanceRecords.filter(record => {
    const departmentMatch = selectedDepartment === 'all' || record.department === selectedDepartment;
    const companyMatch = selectedCompany === 'all' || record.company === selectedCompany;
    const searchMatch = searchQuery === '' || 
      record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
    
    let dateMatch = true;
    if (dateFrom && dateTo) {
      const recordDate = new Date(record.date);
      const fromDate = new Date(dateFrom);
      const toDate = new Date(dateTo);
      dateMatch = recordDate >= fromDate && recordDate <= toDate;
    } else if (dateFrom) {
      dateMatch = new Date(record.date) >= new Date(dateFrom);
    } else if (dateTo) {
      dateMatch = new Date(record.date) <= new Date(dateTo);
    }
    
    return departmentMatch && companyMatch && searchMatch && dateMatch;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Present': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'Absent': return <XCircle className="h-4 w-4 text-destructive" />;
      case 'On Leave': return <Calendar className="h-4 w-4 text-info" />;
      case 'Out of Office': return <MapPin className="h-4 w-4 text-warning" />;
      default: return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const handleAddRecord = (newRecord) => {
    const record = {
      ...newRecord,
      id: Math.max(...attendanceRecords.map(r => r.id)) + 1,
      date: selectedDate
    };
    setAttendanceRecords([...attendanceRecords, record]);
    toast({
      title: "Success",
      description: "Attendance record added successfully",
    });
  };

  const handleUpdateRecord = (updatedRecord) => {
    setAttendanceRecords(attendanceRecords.map(record => 
      record.id === updatedRecord.id ? updatedRecord : record
    ));
    setEditingRecord(null);
    toast({
      title: "Success",
      description: "Attendance record updated successfully",
    });
  };

  const handleDeleteRecord = (id) => {
    setAttendanceRecords(attendanceRecords.filter(record => record.id !== id));
    toast({
      title: "Success",
      description: "Attendance record deleted successfully",
    });
  };

  const AttendanceForm = ({ record = null, onSave, onCancel }) => {
    const [formData, setFormData] = useState(record || {
      employeeId: '',
      name: '',
      department: '',
      company: '',
      checkIn: '',
      checkOut: '',
      status: 'Present',
      location: 'Office',
      notes: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="employeeId">Employee ID</Label>
            <Input
              id="employeeId"
              value={formData.employeeId}
              onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="name">Employee Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="department">Department</Label>
            <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="company">Company</Label>
            <Select value={formData.company} onValueChange={(value) => setFormData({...formData, company: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select company" />
              </SelectTrigger>
              <SelectContent>
                {companies.map(company => (
                  <SelectItem key={company} value={company}>{company}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="checkIn">Check In</Label>
            <Input
              id="checkIn"
              type="time"
              value={formData.checkIn}
              onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="checkOut">Check Out</Label>
            <Input
              id="checkOut"
              type="time"
              value={formData.checkOut}
              onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Present">Present</SelectItem>
                <SelectItem value="Absent">Absent</SelectItem>
                <SelectItem value="On Leave">On Leave</SelectItem>
                <SelectItem value="Out of Office">Out of Office</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            placeholder="Office, Client Site, etc."
          />
        </div>

        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            placeholder="Additional notes..."
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="hrms-button-primary">
            {record ? 'Update' : 'Add'} Record
          </Button>
        </div>
      </form>
    );
  };

  const OutOfOfficeForm = ({ record = null, onSave, onCancel }) => {
    const [formData, setFormData] = useState(record || {
      employeeId: '',
      name: '',
      department: '',
      purpose: '',
      location: '',
      startTime: '',
      endTime: '',
      date: '',
      notes: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="employeeId">Employee ID</Label>
            <Input
              id="employeeId"
              value={formData.employeeId}
              onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="name">Employee Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="department">Department</Label>
            <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="purpose">Purpose</Label>
            <Input
              id="purpose"
              value={formData.purpose}
              onChange={(e) => setFormData({...formData, purpose: e.target.value})}
              placeholder="Client Meeting, Site Visit, etc."
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="Address or site name"
              required
            />
          </div>
          <div>
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              id="startTime"
              type="time"
              value={formData.startTime}
              onChange={(e) => setFormData({...formData, startTime: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="endTime">End Time</Label>
            <Input
              id="endTime"
              type="time"
              value={formData.endTime}
              onChange={(e) => setFormData({...formData, endTime: e.target.value})}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            required
          />
        </div>

        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            placeholder="Additional notes or instructions..."
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="hrms-button-primary">
            {record ? 'Update' : 'Create'} Assignment
          </Button>
        </div>
      </form>
    );
  };

  const RosterForm = ({ roster = null, onSave, onCancel }) => {
    const [formData, setFormData] = useState(roster || {
      department: '',
      dutyType: '',
      dateFrom: '',
      dateTo: '',
      selectedEmployees: [],
      notes: ''
    });

    const [availableEmployees] = useState([
      { id: 'EMP001', name: 'John Doe', department: 'Engineering' },
      { id: 'EMP002', name: 'Sarah Wilson', department: 'Marketing' },
      { id: 'EMP003', name: 'Mike Johnson', department: 'HR' },
      { id: 'EMP004', name: 'Emily Chen', department: 'Finance' },
      { id: 'EMP005', name: 'David Brown', department: 'Engineering' },
      { id: 'EMP006', name: 'Maria Garcia', department: 'Sales' }
    ]);

    const filteredEmployees = availableEmployees.filter(emp => 
      formData.department === '' || emp.department === formData.department
    );

    const handleEmployeeToggle = (employeeId) => {
      setFormData(prev => ({
        ...prev,
        selectedEmployees: prev.selectedEmployees.includes(employeeId)
          ? prev.selectedEmployees.filter(id => id !== employeeId)
          : [...prev.selectedEmployees, employeeId]
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="department">Department</Label>
            <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="dutyType">Duty Type</Label>
            <Input
              id="dutyType"
              value={formData.dutyType}
              onChange={(e) => setFormData({...formData, dutyType: e.target.value})}
              placeholder="Regular Shift, Field Work, etc."
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="dateFrom">From Date</Label>
            <Input
              id="dateFrom"
              type="date"
              value={formData.dateFrom}
              onChange={(e) => setFormData({...formData, dateFrom: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="dateTo">To Date</Label>
            <Input
              id="dateTo"
              type="date"
              value={formData.dateTo}
              onChange={(e) => setFormData({...formData, dateTo: e.target.value})}
              required
            />
          </div>
        </div>

        <div>
          <Label>Select Employees</Label>
          <div className="max-h-48 overflow-y-auto border rounded-lg p-3 space-y-2">
            {filteredEmployees.map(employee => (
              <div key={employee.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={employee.id}
                  checked={formData.selectedEmployees.includes(employee.id)}
                  onChange={() => handleEmployeeToggle(employee.id)}
                  className="rounded"
                />
                <label htmlFor={employee.id} className="text-sm flex-1">
                  {employee.name} ({employee.id}) - {employee.department}
                </label>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {formData.selectedEmployees.length} employee(s) selected
          </p>
        </div>

        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            placeholder="Additional notes or instructions..."
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="hrms-button-primary">
            {roster ? 'Update' : 'Create'} Roster
          </Button>
        </div>
      </form>
    );
  };

  const handleUpdateOutOfOffice = (updatedRecord) => {
    setOutOfOfficeRecords(outOfOfficeRecords.map(record => 
      record.id === updatedRecord.id ? { ...updatedRecord, status: 'Active' } : record
    ));
    setEditingOutOfOffice(null);
    toast({
      title: "Success",
      description: "Out of Office assignment updated successfully",
    });
  };

  const handleCreateRoster = (newRoster) => {
    const roster = {
      ...newRoster,
      id: Date.now(),
      status: 'Active'
    };
    setCreatingRoster(false);
    toast({
      title: "Success",
      description: "New roster created successfully",
    });
  };

  const handleUpdateRoster = (updatedRoster) => {
    setEditingRoster(null);
    toast({
      title: "Success",
      description: "Roster updated successfully",
    });
  };

  const calculateStats = () => {
    const present = filteredRecords.filter(r => r.status === 'Present').length;
    const absent = filteredRecords.filter(r => r.status === 'Absent').length;
    const onLeave = filteredRecords.filter(r => r.status === 'On Leave').length;
    const late = filteredRecords.filter(r => r.late).length;
    const outOfOffice = filteredRecords.filter(r => r.status === 'Out of Office').length;
    const total = filteredRecords.length;
    const attendanceRate = total > 0 ? Math.round(((present + outOfOffice) / total) * 100) : 0;

    return { present, absent, onLeave, late, outOfOffice, attendanceRate };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Clock className="h-8 w-8 text-primary" />
            Attendance Management
          </h1>
          <p className="text-muted-foreground mt-2">Track and manage employee attendance records</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="hrms-button-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Record
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Attendance Record</DialogTitle>
                <DialogDescription>
                  Add a new attendance record for an employee
                </DialogDescription>
              </DialogHeader>
              <AttendanceForm 
                onSave={handleAddRecord}
                onCancel={() => {}}
              />
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="dashboard-card">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Label className="text-sm font-medium">Filters:</Label>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="search" className="text-sm">Search:</Label>
              <Input
                id="search"
                placeholder="Employee name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="dateFrom" className="text-sm">From:</Label>
              <Input
                id="dateFrom"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-auto"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="dateTo" className="text-sm">To:</Label>
              <Input
                id="dateTo"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-auto"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="department" className="text-sm">Department:</Label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="company" className="text-sm">Company:</Label>
              <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  {companies.map(company => (
                    <SelectItem key={company} value={company}>{company}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="text-center">
              <CheckCircle className="h-6 w-6 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold text-success">{stats.present}</div>
              <p className="text-sm text-muted-foreground">Present</p>
            </div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="text-center">
              <AlertCircle className="h-6 w-6 text-warning mx-auto mb-2" />
              <div className="text-2xl font-bold text-warning">{stats.late}</div>
              <p className="text-sm text-muted-foreground">Late</p>
            </div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="text-center">
              <XCircle className="h-6 w-6 text-destructive mx-auto mb-2" />
              <div className="text-2xl font-bold text-destructive">{stats.absent}</div>
              <p className="text-sm text-muted-foreground">Absent</p>
            </div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="text-center">
              <Calendar className="h-6 w-6 text-info mx-auto mb-2" />
              <div className="text-2xl font-bold text-info">{stats.onLeave}</div>
              <p className="text-sm text-muted-foreground">On Leave</p>
            </div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="text-center">
              <MapPin className="h-6 w-6 text-warning mx-auto mb-2" />
              <div className="text-2xl font-bold text-warning">{stats.outOfOffice}</div>
              <p className="text-sm text-muted-foreground">Out of Office</p>
            </div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="w-6 h-6 bg-primary rounded mx-auto mb-2"></div>
              <div className="text-2xl font-bold text-primary">{stats.attendanceRate}%</div>
              <p className="text-sm text-muted-foreground">Attendance Rate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="attendance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="attendance">Attendance Records</TabsTrigger>
          <TabsTrigger value="outofoffice">Out of Office</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="roster">Roster Duty</TabsTrigger>
        </TabsList>

        <TabsContent value="attendance">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Daily Attendance Records</CardTitle>
              <CardDescription>Manage employee attendance for {selectedDate}</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id} className="hover:bg-accent/50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                            {record.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium">{record.name}</p>
                            <p className="text-sm text-muted-foreground">{record.employeeId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{record.department}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {record.checkIn || '-'}
                          {record.late && <Badge variant="outline" className="status-badge-warning text-xs">Late</Badge>}
                        </div>
                      </TableCell>
                      <TableCell>{record.checkOut || '-'}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(record.status)}
                          <Badge 
                            variant={record.status === 'Present' ? 'default' : 'outline'}
                            className={
                              record.status === 'Present' ? 'status-badge-active' : 
                              record.status === 'On Leave' ? 'status-badge-warning' : 
                              record.status === 'Out of Office' ? 'status-badge-warning' :
                              'status-badge-inactive'
                            }
                          >
                            {record.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{record.location}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingRecord(record)}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Edit Attendance Record</DialogTitle>
                                <DialogDescription>
                                  Update attendance record for {record.name}
                                </DialogDescription>
                              </DialogHeader>
                              <AttendanceForm 
                                record={record}
                                onSave={handleUpdateRecord}
                                onCancel={() => setEditingRecord(null)}
                              />
                            </DialogContent>
                          </Dialog>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteRecord(record.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
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

        <TabsContent value="outofoffice">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Out of Office Assignments</CardTitle>
              <CardDescription>Manage field work and external duty assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {outOfOfficeRecords.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-4 rounded-lg bg-accent/50">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-warning rounded-full flex items-center justify-center text-warning-foreground font-medium">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">{record.name}</h3>
                        <p className="text-sm text-muted-foreground">{record.department} • {record.employeeId}</p>
                        <p className="text-sm text-muted-foreground">{record.purpose} at {record.location}</p>
                        <p className="text-xs text-muted-foreground">{record.startTime} - {record.endTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant={record.status === 'Active' ? 'default' : 'secondary'}
                        className={record.status === 'Active' ? 'status-badge-active' : 'status-badge-inactive'}
                      >
                        {record.status}
                      </Badge>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => setEditingOutOfOffice(record)}>
                            <Edit className="h-3 w-3 mr-1" />
                            Edit Assignment
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Edit Out of Office Assignment</DialogTitle>
                            <DialogDescription>
                              Update assignment details for {record.name}
                            </DialogDescription>
                          </DialogHeader>
                          <OutOfOfficeForm 
                            record={record}
                            onSave={handleUpdateOutOfOffice}
                            onCancel={() => setEditingOutOfOffice(null)}
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Summary */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Daily Summary Report</CardTitle>
                <CardDescription>Attendance overview for selected date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-success/10 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Present</span>
                        <CheckCircle className="h-4 w-4 text-success" />
                      </div>
                      <div className="text-2xl font-bold text-success">{stats.present}</div>
                    </div>
                    <div className="bg-destructive/10 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Absent</span>
                        <XCircle className="h-4 w-4 text-destructive" />
                      </div>
                      <div className="text-2xl font-bold text-destructive">{stats.absent}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-warning/10 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Late</span>
                        <AlertCircle className="h-4 w-4 text-warning" />
                      </div>
                      <div className="text-2xl font-bold text-warning">{stats.late}</div>
                    </div>
                    <div className="bg-info/10 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">On Leave</span>
                        <Calendar className="h-4 w-4 text-info" />
                      </div>
                      <div className="text-2xl font-bold text-info">{stats.onLeave}</div>
                    </div>
                  </div>
                  <Button className="w-full hrms-button-primary">
                    <Download className="h-4 w-4 mr-2" />
                    Export Daily Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Summary */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Monthly Summary</CardTitle>
                <CardDescription>Attendance trends for this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Attendance</span>
                      <span className="font-bold text-primary">{stats.attendanceRate}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${stats.attendanceRate}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {departments.map(dept => {
                      const deptRecords = attendanceRecords.filter(r => r.department === dept);
                      const deptPresent = deptRecords.filter(r => r.status === 'Present' || r.status === 'Out of Office').length;
                      const deptRate = deptRecords.length > 0 ? Math.round((deptPresent / deptRecords.length) * 100) : 0;
                      
                      return (
                        <div key={dept} className="flex justify-between items-center p-2 rounded bg-accent/30">
                          <span className="text-sm font-medium">{dept}</span>
                          <span className="text-sm text-muted-foreground">{deptRate}%</span>
                        </div>
                      );
                    })}
                  </div>
                  
                  <Button className="w-full hrms-button-primary">
                    <Download className="h-4 w-4 mr-2" />
                    Export Monthly Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="roster">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Roster Duty Management</CardTitle>
              <CardDescription>Manage team rosters and duty assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Weekly Roster</h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="hrms-button-primary" onClick={() => setCreatingRoster(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create New Roster
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Create New Roster</DialogTitle>
                        <DialogDescription>
                          Create a new roster assignment for a department
                        </DialogDescription>
                      </DialogHeader>
                      <RosterForm 
                        onSave={handleCreateRoster}
                        onCancel={() => setCreatingRoster(false)}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead>Assigned Staff</TableHead>
                      <TableHead>Duty Type</TableHead>
                      <TableHead>Date Range</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { dept: 'Engineering', staff: 12, duty: 'Regular Shift', range: 'Jan 15-21, 2024', status: 'Active' },
                      { dept: 'Sales', staff: 8, duty: 'Field Work', range: 'Jan 15-21, 2024', status: 'Active' },
                      { dept: 'HR', staff: 5, duty: 'Office Support', range: 'Jan 15-21, 2024', status: 'Pending' }
                    ].map((roster, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{roster.dept}</TableCell>
                        <TableCell>{roster.staff} employees</TableCell>
                        <TableCell>{roster.duty}</TableCell>
                        <TableCell>{roster.range}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={roster.status === 'Active' ? 'default' : 'secondary'}
                            className={roster.status === 'Active' ? 'status-badge-active' : 'status-badge-warning'}
                          >
                            {roster.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" onClick={() => setEditingRoster(roster)}>
                                  <Edit className="h-3 w-3" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-3xl">
                                <DialogHeader>
                                  <DialogTitle>Edit Roster</DialogTitle>
                                  <DialogDescription>
                                    Update roster assignment for {roster.dept} department
                                  </DialogDescription>
                                </DialogHeader>
                                <RosterForm 
                                  roster={roster}
                                  onSave={handleUpdateRoster}
                                  onCancel={() => setEditingRoster(null)}
                                />
                              </DialogContent>
                            </Dialog>
                            <Button size="sm" variant="outline">
                              <Download className="h-3 w-3" />
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AttendanceManagement;