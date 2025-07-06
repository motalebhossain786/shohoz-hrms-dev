import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

const PayrollOverview = () => {
  const payrollData = {
    lastMonth: {
      headcount: 1198,
      totalDisbursed: '৳12,45,67,890',
      avgSalary: '৳1,03,972'
    },
    currentMonth: {
      headcount: 1234,
      estimatedTotal: '৳12,89,45,670',
      avgSalary: '৳1,04,512'
    },
    salaryHold: {
      count: 8,
      amount: '৳6,78,450'
    }
  };

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          Payroll Overview
        </CardTitle>
        <CardDescription>Monthly salary disbursement summary</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Last Month vs Current */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-4 rounded-lg bg-accent/50">
            <h4 className="font-medium text-sm mb-3">Last Month</h4>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4 items-center">
                <span className="text-xs text-muted-foreground">Headcount</span>
                <span className="text-sm font-medium text-right">{payrollData.lastMonth.headcount}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <span className="text-xs text-muted-foreground">Total Disbursed</span>
                <span className="text-xs font-bold text-success text-right whitespace-nowrap">{payrollData.lastMonth.totalDisbursed}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <span className="text-xs text-muted-foreground">Avg Salary</span>
                <span className="text-xs font-medium text-right whitespace-nowrap">{payrollData.lastMonth.avgSalary}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-primary/10">
            <h4 className="font-medium text-sm mb-3">Current Month</h4>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4 items-center">
                <span className="text-xs text-muted-foreground">Headcount</span>
                <span className="text-sm font-medium text-right">{payrollData.currentMonth.headcount}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <span className="text-xs text-muted-foreground">Estimated Total</span>
                <span className="text-xs font-bold text-primary text-right whitespace-nowrap">{payrollData.currentMonth.estimatedTotal}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <span className="text-xs text-muted-foreground">Avg Salary</span>
                <span className="text-xs font-medium text-right whitespace-nowrap">{payrollData.currentMonth.avgSalary}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Growth Indicator */}
        <div className="flex items-center justify-center p-3 rounded-lg bg-success/10">
          <TrendingUp className="h-4 w-4 text-success mr-2" />
          <span className="text-sm font-medium text-success">
            +3.5% increase from last month
          </span>
        </div>

        {/* Salary Hold */}
        <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-warning" />
              Salary Hold
            </h4>
            <Badge variant="outline" className="text-warning border-warning">
              {payrollData.salaryHold.count} employees
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Amount</span>
            <span className="text-sm font-bold text-warning">{payrollData.salaryHold.amount}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PayrollOverview;