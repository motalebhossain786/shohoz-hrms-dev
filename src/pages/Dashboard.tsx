import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AttendanceSummary from '@/components/dashboard/AttendanceSummary';
import EmployeeOverview from '@/components/dashboard/EmployeeOverview';
import DepartmentOverview from '@/components/dashboard/DepartmentOverview';
import PayrollOverview from '@/components/dashboard/PayrollOverview';
import NotificationsReminders from '@/components/dashboard/NotificationsReminders';
import EmployeeBreakdown from '@/components/dashboard/EmployeeBreakdown';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <Badge variant="outline" className="text-primary border-primary">
          Live Data
        </Badge>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">1,234</div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">987</div>
            <p className="text-xs text-muted-foreground">
              80% attendance rate
            </p>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Leave</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">45</div>
            <p className="text-xs text-muted-foreground">
              12 pending approvals
            </p>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Hires</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">23</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceSummary />
        <EmployeeOverview />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DepartmentOverview />
        <EmployeeBreakdown />
      </div>

      <PayrollOverview />

      <NotificationsReminders />
    </div>
  );
};

export default Dashboard;