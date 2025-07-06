import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { AddEmployeeForm } from '@/components/employee/AddEmployeeForm';

const AddEmployee = () => {
  const navigate = useNavigate();

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
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add New Employee</h1>
          <p className="text-muted-foreground mt-1">Complete the multi-step form to create a new employee profile</p>
        </div>
      </div>

      <AddEmployeeForm />
    </div>
  );
};

export default AddEmployee;