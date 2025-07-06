import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users2, User } from 'lucide-react';

const EmployeeBreakdown = () => {
  const genderBreakdown = [
    { label: 'Male', count: 742, percentage: 60.1, color: 'bg-primary' },
    { label: 'Female', count: 492, percentage: 39.9, color: 'bg-success' }
  ];

  const typeBreakdown = [
    { label: 'Permanent', count: 856, percentage: 69.4, color: 'bg-primary' },
    { label: 'Probationary', count: 234, percentage: 19.0, color: 'bg-info' },
    { label: 'Contractual', count: 89, percentage: 7.2, color: 'bg-warning' },
    { label: 'Intern', count: 34, percentage: 2.8, color: 'bg-success' },
    { label: 'Consultant', count: 21, percentage: 1.7, color: 'bg-destructive' }
  ];

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users2 className="h-5 w-5 text-primary" />
          Employee Breakdown
        </CardTitle>
        <CardDescription>Demographics and employment types</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Gender Breakdown */}
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <User className="h-4 w-4" />
            By Gender
          </h4>
          <div className="space-y-3">
            {genderBreakdown.map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold">{item.count}</span>
                    <span className="text-xs text-muted-foreground ml-1">
                      ({item.percentage}%)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Employment Type Breakdown */}
        <div>
          <h4 className="font-medium mb-3">By Employment Type</h4>
          <div className="space-y-2">
            {typeBreakdown.map((item) => (
              <div key={item.label} className="flex justify-between items-center p-2 rounded bg-muted/50">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                  <span className="text-sm">{item.label}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium">{item.count}</span>
                  <span className="text-xs text-muted-foreground ml-1">
                    ({item.percentage}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeBreakdown;