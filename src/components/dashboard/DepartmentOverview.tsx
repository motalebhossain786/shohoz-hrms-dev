import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GitBranch } from 'lucide-react';

const DepartmentOverview = () => {
  const departments = [
    { name: 'Engineering', count: 312, percentage: 25.3, color: 'bg-primary' },
    { name: 'Sales & Marketing', count: 245, percentage: 19.9, color: 'bg-success' },
    { name: 'Customer Support', count: 189, percentage: 15.3, color: 'bg-info' },
    { name: 'Operations', count: 156, percentage: 12.6, color: 'bg-warning' },
    { name: 'Finance', count: 98, percentage: 7.9, color: 'bg-destructive' },
    { name: 'Human Resources', count: 67, percentage: 5.4, color: 'bg-accent-foreground' },
    { name: 'Legal & Admin', count: 45, percentage: 3.6, color: 'bg-muted-foreground' },
    { name: 'Others', count: 122, percentage: 9.9, color: 'bg-border' }
  ];

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitBranch className="h-5 w-5 text-primary" />
          Department Overview
        </CardTitle>
        <CardDescription>Manpower distribution by department</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {departments.map((dept) => (
            <div key={dept.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${dept.color}`}></div>
                  <span className="text-sm font-medium">{dept.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold">{dept.count}</span>
                  <span className="text-xs text-muted-foreground ml-1">
                    ({dept.percentage}%)
                  </span>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${dept.color}`}
                  style={{ width: `${dept.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DepartmentOverview;