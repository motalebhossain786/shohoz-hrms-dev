import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, XCircle, Calendar, MapPin } from 'lucide-react';

const AttendanceSummary = () => {
  const attendanceData = [
    { label: 'On Time', count: 856, icon: CheckCircle, color: 'text-success' },
    { label: 'Late Arrivals', count: 131, icon: Clock, color: 'text-warning' },
    { label: 'Absent', count: 89, icon: XCircle, color: 'text-destructive' },
    { label: 'On Leave', count: 45, icon: Calendar, color: 'text-info' },
    { label: 'On Visit', count: 23, icon: MapPin, color: 'text-primary' }
  ];

  const pendingItems = [
    { label: 'Leave Applications', count: 12, urgent: true },
    { label: 'Attendance Reconciliation', count: 8, urgent: false },
    { label: 'Visit Applications', count: 5, urgent: false },
    { label: 'On Leave Tomorrow', count: 18, urgent: false }
  ];

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Attendance Summary
        </CardTitle>
        <CardDescription>Today's attendance overview</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Status */}
        <div className="grid grid-cols-2 gap-4">
          {attendanceData.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center space-x-3 p-3 rounded-lg bg-accent/50">
                <Icon className={`h-4 w-4 ${item.color}`} />
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-lg font-bold">{item.count}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pending Items */}
        <div>
          <h4 className="font-medium mb-3">Pending Actions</h4>
          <div className="space-y-2">
            {pendingItems.map((item) => (
              <div key={item.label} className="flex items-center justify-between p-2 rounded bg-muted/50">
                <span className="text-sm">{item.label}</span>
                <Badge variant={item.urgent ? "destructive" : "secondary"}>
                  {item.count}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceSummary;