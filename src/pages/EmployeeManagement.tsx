import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

const EmployeeManagement = () => {
  const employees = [
    { id: 1, name: 'John Doe', email: 'john@shohoz.com', department: 'Engineering', role: 'Senior Developer', status: 'Active', avatar: 'JD' },
    { id: 2, name: 'Sarah Wilson', email: 'sarah@shohoz.com', department: 'Marketing', role: 'Marketing Manager', status: 'Active', avatar: 'SW' },
    { id: 3, name: 'Mike Johnson', email: 'mike@shohoz.com', department: 'Sales', role: 'Sales Executive', status: 'On Leave', avatar: 'MJ' },
    { id: 4, name: 'Emily Chen', email: 'emily@shohoz.com', department: 'HR', role: 'HR Specialist', status: 'Active', avatar: 'EC' },
    { id: 5, name: 'David Brown', email: 'david@shohoz.com', department: 'Finance', role: 'Accountant', status: 'Inactive', avatar: 'DB' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            Employee Management
          </h1>
          <p className="text-muted-foreground mt-2">Manage employee records, profiles, and information</p>
        </div>
        <Button 
          className="hrms-button-primary"
          onClick={() => window.location.href = '/employees/add'}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Employee
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">1,234</div>
              <p className="text-sm text-muted-foreground">Total Employees</p>
            </div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">1,191</div>
              <p className="text-sm text-muted-foreground">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">43</div>
              <p className="text-sm text-muted-foreground">Inactive</p>
            </div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-info">23</div>
              <p className="text-sm text-muted-foreground">New This Month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Employee Directory</CardTitle>
          <CardDescription>Search and manage employee records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search employees..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Employee List */}
          <div className="space-y-4">
            {employees.map((employee) => (
              <div key={employee.id} className="flex items-center justify-between p-4 rounded-lg bg-accent/50 hover:bg-accent transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                    {employee.avatar}
                  </div>
                  <div>
                    <h3 className="font-medium">{employee.name}</h3>
                    <p className="text-sm text-muted-foreground">{employee.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium">{employee.role}</p>
                    <p className="text-sm text-muted-foreground">{employee.department}</p>
                  </div>
                  <Badge 
                    variant={employee.status === 'Active' ? 'default' : employee.status === 'On Leave' ? 'secondary' : 'outline'}
                    className={
                      employee.status === 'Active' ? 'status-badge-active' : 
                      employee.status === 'On Leave' ? 'status-badge-warning' : 
                      'status-badge-inactive'
                    }
                  >
                    {employee.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeManagement;