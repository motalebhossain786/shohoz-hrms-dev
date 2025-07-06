import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const AttendanceManagement = () => {
  const todayAttendance = [
    { id: 1, name: 'John Doe', checkIn: '09:00 AM', checkOut: '-', status: 'Present', late: false },
    { id: 2, name: 'Sarah Wilson', checkIn: '09:15 AM', checkOut: '06:00 PM', status: 'Present', late: true },
    { id: 3, name: 'Mike Johnson', checkIn: '-', checkOut: '-', status: 'On Leave', late: false },
    { id: 4, name: 'Emily Chen', checkIn: '08:45 AM', checkOut: '05:30 PM', status: 'Present', late: false },
    { id: 5, name: 'David Brown', checkIn: '-', checkOut: '-', status: 'Absent', late: false }
  ];

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
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            View Calendar
          </Button>
          <Button className="hrms-button-primary">Generate Report</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="text-center">
              <CheckCircle className="h-6 w-6 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold text-success">987</div>
              <p className="text-sm text-muted-foreground">Present Today</p>
            </div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="text-center">
              <AlertCircle className="h-6 w-6 text-warning mx-auto mb-2" />
              <div className="text-2xl font-bold text-warning">131</div>
              <p className="text-sm text-muted-foreground">Late Arrivals</p>
            </div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="text-center">
              <XCircle className="h-6 w-6 text-destructive mx-auto mb-2" />
              <div className="text-2xl font-bold text-destructive">89</div>
              <p className="text-sm text-muted-foreground">Absent</p>
            </div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="text-center">
              <Calendar className="h-6 w-6 text-info mx-auto mb-2" />
              <div className="text-2xl font-bold text-info">45</div>
              <p className="text-sm text-muted-foreground">On Leave</p>
            </div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="w-6 h-6 bg-primary rounded mx-auto mb-2"></div>
              <div className="text-2xl font-bold text-primary">80%</div>
              <p className="text-sm text-muted-foreground">Attendance Rate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Attendance */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Today's Attendance</CardTitle>
          <CardDescription>Real-time attendance tracking for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todayAttendance.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 rounded-lg bg-accent/50">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                    {record.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-medium">{record.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Check-in: {record.checkIn}</span>
                      <span>Check-out: {record.checkOut}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {record.late && record.status === 'Present' && (
                    <Badge variant="outline" className="status-badge-warning">
                      Late
                    </Badge>
                  )}
                  <Badge 
                    variant={record.status === 'Present' ? 'default' : record.status === 'On Leave' ? 'secondary' : 'outline'}
                    className={
                      record.status === 'Present' ? 'status-badge-active' : 
                      record.status === 'On Leave' ? 'status-badge-warning' : 
                      'status-badge-inactive'
                    }
                  >
                    {record.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pending Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Pending Attendance Reconciliation</CardTitle>
            <CardDescription>Attendance discrepancies requiring approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Alex Thompson', date: 'Dec 18, 2024', reason: 'Late check-in', type: 'Late Entry' },
                { name: 'Lisa Wang', date: 'Dec 17, 2024', reason: 'Missed check-out', type: 'Missing Record' },
                { name: 'Robert Kim', date: 'Dec 16, 2024', reason: 'Early departure', type: 'Early Leave' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded bg-warning/10">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.date} - {item.reason}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{item.type}</Badge>
                    <Button size="sm" variant="outline">Review</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Visit Requests</CardTitle>
            <CardDescription>Employee visit and field work requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Maria Garcia', purpose: 'Client Meeting', location: 'Dhaka, Bangladesh', status: 'Pending' },
                { name: 'James Wilson', purpose: 'Site Visit', location: 'Chittagong, Bangladesh', status: 'Approved' },
                { name: 'Anna Lee', purpose: 'Training Session', location: 'Sylhet, Bangladesh', status: 'Pending' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded bg-info/10">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.purpose} - {item.location}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={item.status === 'Approved' ? 'default' : 'secondary'}
                      className={item.status === 'Approved' ? 'status-badge-active' : 'status-badge-warning'}
                    >
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttendanceManagement;