import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Plus, Search, Filter, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';

const EmployeeManagement = () => {
  const navigate = useNavigate();
  
  // Enhanced employee data with more fields
  const employeesData = [
    { 
      id: 'EMP001', 
      name: 'John Doe', 
      email: 'john@shohoz.com', 
      department: 'Engineering', 
      role: 'Senior Developer', 
      status: 'Active',
      company: 'Shohoz',
      employmentType: 'Permanent',
      avatar: 'JD',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    { 
      id: 'EMP002', 
      name: 'Sarah Wilson', 
      email: 'sarah@shohoz.com', 
      department: 'Marketing', 
      role: 'Marketing Manager', 
      status: 'Active',
      company: 'Shohoz',
      employmentType: 'Permanent',
      avatar: 'SW',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    { 
      id: 'EMP003', 
      name: 'Mike Johnson', 
      email: 'mike@ssvjv.com', 
      department: 'Sales', 
      role: 'Sales Executive', 
      status: 'On Leave',
      company: 'SSV JV',
      employmentType: 'Permanent',
      avatar: 'MJ',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    { 
      id: 'EMP004', 
      name: 'Emily Chen', 
      email: 'emily@shohoz.com', 
      department: 'HR', 
      role: 'HR Specialist', 
      status: 'Active',
      company: 'Shohoz',
      employmentType: 'Probationary',
      avatar: 'EC',
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    { 
      id: 'EMP005', 
      name: 'David Brown', 
      email: 'david@shohoz.com', 
      department: 'Finance', 
      role: 'Accountant', 
      status: 'Inactive',
      company: 'Shohoz',
      employmentType: 'Permanent',
      avatar: 'DB',
      profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    { 
      id: 'EMP006', 
      name: 'Lisa Garcia', 
      email: 'lisa@viajar.com', 
      department: 'Operations', 
      role: 'Operations Manager', 
      status: 'Active',
      company: 'Viajar',
      employmentType: 'Permanent',
      avatar: 'LG',
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
    },
    { 
      id: 'EMP007', 
      name: 'James Wilson', 
      email: 'james@shohoz.com', 
      department: 'Engineering', 
      role: 'Junior Developer', 
      status: 'Active',
      company: 'Shohoz',
      employmentType: 'Intern',
      avatar: 'JW',
      profileImage: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=face'
    },
    { 
      id: 'EMP008', 
      name: 'Maria Rodriguez', 
      email: 'maria@ssvjv.com', 
      department: 'Marketing', 
      role: 'Content Specialist', 
      status: 'Resigned',
      company: 'SSV JV',
      employmentType: 'Permanent',
      avatar: 'MR',
      profileImage: 'https://images.unsplash.com/photo-1549351512-c5e12b11e283?w=150&h=150&fit=crop&crop=face'
    }
  ];

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Get unique values for filter options
  const departments = [...new Set(employeesData.map(emp => emp.department))];
  const companies = [...new Set(employeesData.map(emp => emp.company))];
  const employmentTypes = [...new Set(employeesData.map(emp => emp.employmentType))];
  const statuses = [...new Set(employeesData.map(emp => emp.status))];

  // Filter employees based on search and filters
  const filteredEmployees = useMemo(() => {
    return employeesData.filter(employee => {
      const matchesSearch = searchTerm === '' || 
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.company.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = departmentFilter === '' || employee.department === departmentFilter;
      const matchesCompany = companyFilter === '' || employee.company === companyFilter;
      const matchesEmploymentType = employmentTypeFilter === '' || employee.employmentType === employmentTypeFilter;
      const matchesStatus = statusFilter === '' || employee.status === statusFilter;

      return matchesSearch && matchesDepartment && matchesCompany && matchesEmploymentType && matchesStatus;
    });
  }, [searchTerm, departmentFilter, companyFilter, employmentTypeFilter, statusFilter, employeesData]);

  const handleViewProfile = (employeeId: string) => {
    navigate(`/employees/${employeeId}`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDepartmentFilter('');
    setCompanyFilter('');
    setEmploymentTypeFilter('');
    setStatusFilter('');
  };

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
          <CardTitle>Employee Directory ({filteredEmployees.length} employees)</CardTitle>
          <CardDescription>Search and manage employee records</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name, ID, role, or company..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>

          {/* Filter Options */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={companyFilter} onValueChange={setCompanyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Companies</SelectItem>
                {companies.map(company => (
                  <SelectItem key={company} value={company}>{company}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={employmentTypeFilter} onValueChange={setEmploymentTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Employment Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                {employmentTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Employee List */}
          <div className="space-y-4">
            {filteredEmployees.map((employee) => (
              <div key={employee.id} className="flex items-center justify-between p-4 rounded-lg bg-accent/50 hover:bg-accent transition-colors">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={employee.profileImage} alt={employee.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                      {employee.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{employee.name}</h3>
                    <p className="text-sm text-muted-foreground">{employee.email}</p>
                    <p className="text-xs text-muted-foreground">{employee.id} • {employee.company}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right hidden md:block">
                    <p className="font-medium">{employee.role}</p>
                    <p className="text-sm text-muted-foreground">{employee.department}</p>
                    <p className="text-xs text-muted-foreground">{employee.employmentType}</p>
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
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewProfile(employee.id)}
                    className="hover:bg-primary hover:text-primary-foreground"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Profile
                  </Button>
                </div>
              </div>
            ))}
            
            {filteredEmployees.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No employees found matching your criteria.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeManagement;