import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { AddEmployeeForm } from '@/components/employee/AddEmployeeForm';
import { Card, CardContent } from '@/components/ui/card';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

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
    // Add other employees as needed...
  ];

  useEffect(() => {
    const foundEmployee = employeesData.find(emp => emp.id === id);
    setEmployee(foundEmployee);
  }, [id]);

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
            <p className="text-muted-foreground">The employee you're trying to edit doesn't exist.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          onClick={() => navigate(`/employees/${id}`)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Profile
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Edit Employee</h1>
          <p className="text-muted-foreground mt-1">Update employee profile information</p>
        </div>
      </div>

      {/* Use the same form component (can be enhanced later for edit mode) */}
      <AddEmployeeForm />
    </div>
  );
};

export default EditEmployee;