import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Edit, Mail, Building, Users, Calendar, Phone, MapPin } from 'lucide-react';

const EmployeeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock employee data (in real app, this would come from API)
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
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      phone: '+880 1712-345678',
      joinDate: '2021-03-15',
      address: 'Dhanmondi, Dhaka, Bangladesh',
      supervisor: 'Jane Smith',
      salary: '৳85,000'
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
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      phone: '+880 1712-345679',
      joinDate: '2020-08-20',
      address: 'Gulshan, Dhaka, Bangladesh',
      supervisor: 'Michael Brown',
      salary: '৳75,000'
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
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      phone: '+880 1712-345680',
      joinDate: '2022-01-10',
      address: 'Banani, Dhaka, Bangladesh',
      supervisor: 'Lisa Garcia',
      salary: '৳60,000'
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
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      phone: '+880 1712-345681',
      joinDate: '2023-06-01',
      address: 'Uttara, Dhaka, Bangladesh',
      supervisor: 'David Brown',
      salary: '৳50,000'
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
      profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      phone: '+880 1712-345682',
      joinDate: '2019-11-15',
      address: 'Mirpur, Dhaka, Bangladesh',
      supervisor: 'Sarah Wilson',
      salary: '৳65,000'
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
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      phone: '+880 1712-345683',
      joinDate: '2020-04-12',
      address: 'Bashundhara, Dhaka, Bangladesh',
      supervisor: 'John Doe',
      salary: '৳80,000'
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
      profileImage: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=face',
      phone: '+880 1712-345684',
      joinDate: '2023-09-01',
      address: 'Wari, Dhaka, Bangladesh',
      supervisor: 'John Doe',
      salary: '৳25,000'
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
      profileImage: 'https://images.unsplash.com/photo-1549351512-c5e12b11e283?w=150&h=150&fit=crop&crop=face',
      phone: '+880 1712-345685',
      joinDate: '2021-07-20',
      address: 'Mohammadpur, Dhaka, Bangladesh',
      supervisor: 'Sarah Wilson',
      salary: '৳55,000'
    }
  ];

  const employee = employeesData.find(emp => emp.id === id);

  if (!employee) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/employees')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Employee List
          </Button>
        </div>
        <Card className="dashboard-card">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Employee Not Found</h2>
            <p className="text-muted-foreground">The employee profile you're looking for doesn't exist.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/employees')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Employee List
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Employee Profile</h1>
            <p className="text-muted-foreground mt-1">View and manage employee information</p>
          </div>
        </div>
        <Button 
          className="hrms-button-primary"
          onClick={() => navigate(`/employees/${id}/edit`)}
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      {/* Employee Profile Header */}
      <Card className="dashboard-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={employee.profileImage} alt={employee.name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                {employee.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold">{employee.name}</h2>
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
              </div>
              <p className="text-lg text-muted-foreground mb-1">{employee.role}</p>
              <p className="text-sm text-muted-foreground mb-2">{employee.id} • {employee.company}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {employee.email}
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {employee.phone}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employee Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Employment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Department:</span>
              <span className="font-medium">{employee.department}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Employment Type:</span>
              <span className="font-medium">{employee.employmentType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Join Date:</span>
              <span className="font-medium">{new Date(employee.joinDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Supervisor:</span>
              <span className="font-medium">{employee.supervisor}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Salary:</span>
              <span className="font-medium text-primary">{employee.salary}</span>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Company:</span>
              <span className="font-medium">{employee.company}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium">{employee.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone:</span>
              <span className="font-medium">{employee.phone}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Address:</span>
              <p className="font-medium mt-1">{employee.address}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Information Placeholder */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
          <CardDescription>Complete employee profile information would be displayed here</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This section would contain additional employee information such as education, skills, 
            experience, documents, and other relevant details from the comprehensive employee form.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeProfile;