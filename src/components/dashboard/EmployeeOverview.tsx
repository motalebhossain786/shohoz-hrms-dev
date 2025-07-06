import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, UserCheck, UserX, TrendingUp, TrendingDown } from 'lucide-react';

const EmployeeOverview = () => {
  const companies = [
    { name: 'Shohoz', active: 892, inactive: 23, color: 'bg-primary' },
    { name: 'SSV JV', active: 245, inactive: 12, color: 'bg-success' },
    { name: 'Viajar', active: 97, inactive: 8, color: 'bg-info' }
  ];

  const inactiveReasons = [
    { reason: 'Incomplete Profile', count: 28 },
    { reason: 'Ex-employee', count: 15 }
  ];

  const monthlyStats = {
    newHires: 23,
    resigned: 12,
    turnoverRate: '2.1%'
  };

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Employee Overview
        </CardTitle>
        <CardDescription>Active and inactive employee statistics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Active Employees by Company */}
        <div>
          <h4 className="font-medium mb-3">Active Employees</h4>
          <div className="space-y-3">
            {companies.map((company) => (
              <div key={company.name} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${company.color}`}></div>
                  <span className="font-medium">{company.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-success">
                    <UserCheck className="h-4 w-4" />
                    <span className="font-medium">{company.active}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <UserX className="h-4 w-4" />
                    <span>{company.inactive}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inactive Breakdown */}
        <div>
          <h4 className="font-medium mb-3">Inactive Breakdown</h4>
          <div className="space-y-2">
            {inactiveReasons.map((item) => (
              <div key={item.reason} className="flex justify-between items-center p-2 rounded bg-muted/50">
                <span className="text-sm">{item.reason}</span>
                <Badge variant="outline">{item.count}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 rounded bg-success/10">
            <TrendingUp className="h-4 w-4 text-success mx-auto mb-1" />
            <p className="text-lg font-bold text-success">{monthlyStats.newHires}</p>
            <p className="text-xs text-muted-foreground">New Hires</p>
          </div>
          <div className="text-center p-3 rounded bg-warning/10">
            <TrendingDown className="h-4 w-4 text-warning mx-auto mb-1" />
            <p className="text-lg font-bold text-warning">{monthlyStats.resigned}</p>
            <p className="text-xs text-muted-foreground">Resigned</p>
          </div>
          <div className="text-center p-3 rounded bg-info/10">
            <div className="h-4 w-4 bg-info rounded-full mx-auto mb-1"></div>
            <p className="text-lg font-bold text-info">{monthlyStats.turnoverRate}</p>
            <p className="text-xs text-muted-foreground">Turnover</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeOverview;