import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  DollarSign, Plus, Edit, Trash2, Download, Send, Calculator, 
  TrendingUp, Award, Gift, CreditCard, FileText, Calendar as CalendarIcon,
  Users, Building, Clock, Percent, Receipt, CheckCircle, AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// Mock Data
const mockEmployees = [
  { id: 1, name: 'John Doe', department: 'Engineering', grade: 'Senior', basicSalary: 80000, totalSalary: 95000, status: 'Active' },
  { id: 2, name: 'Jane Smith', department: 'HR', grade: 'Mid', basicSalary: 60000, totalSalary: 72000, status: 'Active' },
  { id: 3, name: 'Mike Johnson', department: 'Finance', grade: 'Junior', basicSalary: 45000, totalSalary: 55000, status: 'Active' },
];

const mockSalaryStructures = [
  { id: 1, grade: 'Senior', basic: 80000, hra: 8000, medical: 3000, conveyance: 4000, total: 95000 },
  { id: 2, grade: 'Mid', basic: 60000, hra: 6000, medical: 3000, conveyance: 3000, total: 72000 },
  { id: 3, grade: 'Junior', basic: 45000, hra: 4500, medical: 2500, conveyance: 3000, total: 55000 },
];

const mockLoans = [
  { id: 1, employeeName: 'John Doe', amount: 100000, installment: 10000, remaining: 60000, status: 'Active', nextDue: '2024-08-01' },
  { id: 2, employeeName: 'Jane Smith', amount: 50000, installment: 5000, remaining: 25000, status: 'Active', nextDue: '2024-08-01' },
];

const mockBonuses = [
  { id: 1, employeeName: 'John Doe', type: 'Festival', amount: 25000, month: 'July 2024', status: 'Paid' },
  { id: 2, employeeName: 'Jane Smith', type: 'Performance', amount: 15000, month: 'June 2024', status: 'Approved' },
  { id: 3, employeeName: 'Mike Johnson', type: 'One-Time', amount: 10000, month: 'July 2024', status: 'Pending' },
];

const mockPayslips = [
  { id: 1, employeeName: 'John Doe', month: 'July 2024', gross: 95000, deductions: 15000, net: 80000, status: 'Generated' },
  { id: 2, employeeName: 'Jane Smith', month: 'July 2024', gross: 72000, deductions: 12000, net: 60000, status: 'Sent' },
];

const PayrollManagement = () => {
  const [activeTab, setActiveTab] = useState('salary-structure');
  const [employees, setEmployees] = useState(mockEmployees);
  const [salaryStructures, setSalaryStructures] = useState(mockSalaryStructures);
  const [loans, setLoans] = useState(mockLoans);
  const [bonuses, setBonuses] = useState(mockBonuses);
  const [payslips, setPayslips] = useState(mockPayslips);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const { toast } = useToast();

  // Form states
  const [salaryForm, setSalaryForm] = useState({
    grade: '',
    basic: '',
    hra: '',
    medical: '',
    conveyance: '',
  });

  const [loanForm, setLoanForm] = useState({
    employeeId: '',
    amount: '',
    installment: '',
    purpose: '',
    startDate: '',
  });

  const [bonusForm, setBonusForm] = useState({
    employeeId: '',
    type: '',
    amount: '',
    reason: '',
    month: '',
  });

  const handleSaveSalaryStructure = () => {
    const total = parseInt(salaryForm.basic) + parseInt(salaryForm.hra) + parseInt(salaryForm.medical) + parseInt(salaryForm.conveyance);
    const newStructure = {
      id: Date.now(),
      grade: salaryForm.grade,
      basic: parseInt(salaryForm.basic),
      hra: parseInt(salaryForm.hra),
      medical: parseInt(salaryForm.medical),
      conveyance: parseInt(salaryForm.conveyance),
      total,
    };
    
    setSalaryStructures([...salaryStructures, newStructure]);
    setSalaryForm({ grade: '', basic: '', hra: '', medical: '', conveyance: '' });
    setIsDialogOpen(false);
    toast({ title: "Success", description: "Salary structure saved successfully!" });
  };

  const handleSaveLoan = () => {
    const newLoan = {
      id: Date.now(),
      employeeName: employees.find(e => e.id === parseInt(loanForm.employeeId))?.name || '',
      amount: parseInt(loanForm.amount),
      installment: parseInt(loanForm.installment),
      remaining: parseInt(loanForm.amount),
      status: 'Active',
      nextDue: loanForm.startDate,
    };
    
    setLoans([...loans, newLoan]);
    setLoanForm({ employeeId: '', amount: '', installment: '', purpose: '', startDate: '' });
    setIsDialogOpen(false);
    toast({ title: "Success", description: "Employee loan created successfully!" });
  };

  const handleSaveBonus = () => {
    const newBonus = {
      id: Date.now(),
      employeeName: employees.find(e => e.id === parseInt(bonusForm.employeeId))?.name || '',
      type: bonusForm.type,
      amount: parseInt(bonusForm.amount),
      month: bonusForm.month,
      status: 'Pending',
    };
    
    setBonuses([...bonuses, newBonus]);
    setBonusForm({ employeeId: '', type: '', amount: '', reason: '', month: '' });
    setIsDialogOpen(false);
    toast({ title: "Success", description: "Bonus created successfully!" });
  };

  const handleApproveBonus = (id: number) => {
    setBonuses(bonuses.map(bonus => 
      bonus.id === id ? { ...bonus, status: 'Approved' } : bonus
    ));
    toast({ title: "Success", description: "Bonus approved successfully!" });
  };

  const handleGeneratePayslip = (employeeId: number) => {
    const employee = employees.find(e => e.id === employeeId);
    if (!employee) return;

    const newPayslip = {
      id: Date.now(),
      employeeName: employee.name,
      month: format(new Date(), 'MMMM yyyy'),
      gross: employee.totalSalary,
      deductions: Math.floor(employee.totalSalary * 0.15),
      net: Math.floor(employee.totalSalary * 0.85),
      status: 'Generated',
    };

    setPayslips([...payslips, newPayslip]);
    toast({ title: "Success", description: `Payslip generated for ${employee.name}` });
  };

  const handleSendPayslip = (id: number) => {
    setPayslips(payslips.map(payslip => 
      payslip.id === id ? { ...payslip, status: 'Sent' } : payslip
    ));
    toast({ title: "Success", description: "Payslip sent via email!" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Payroll Management</h2>
          <p className="text-muted-foreground">Manage salary structures, bonuses, loans, and payroll processing</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
          <Button>
            <Calculator className="mr-2 h-4 w-4" />
            Process Payroll
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="salary-structure">Salary Structure</TabsTrigger>
          <TabsTrigger value="loans-bonuses">Loans & Bonuses</TabsTrigger>
          <TabsTrigger value="payslips">Payslips & Tax</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Salary Structure Tab */}
        <TabsContent value="salary-structure" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{employees.length}</div>
                <p className="text-xs text-muted-foreground">Active employees</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Payroll</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">৳{employees.reduce((sum, emp) => sum + emp.totalSalary, 0).toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Monthly cost</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Salary</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">৳{Math.floor(employees.reduce((sum, emp) => sum + emp.totalSalary, 0) / employees.length).toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Per employee</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Structures</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{salaryStructures.length}</div>
                <p className="text-xs text-muted-foreground">Grade levels</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Salary Structures</CardTitle>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Structure
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create Salary Structure</DialogTitle>
                        <DialogDescription>Define salary components for a grade level</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="grade" className="text-right">Grade</Label>
                          <Select onValueChange={(value) => setSalaryForm({...salaryForm, grade: value})}>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select grade" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Executive">Executive</SelectItem>
                              <SelectItem value="Senior">Senior</SelectItem>
                              <SelectItem value="Mid">Mid</SelectItem>
                              <SelectItem value="Junior">Junior</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="basic" className="text-right">Basic Salary</Label>
                          <Input
                            id="basic"
                            type="number"
                            value={salaryForm.basic}
                            onChange={(e) => setSalaryForm({...salaryForm, basic: e.target.value})}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="hra" className="text-right">House Rent</Label>
                          <Input
                            id="hra"
                            type="number"
                            value={salaryForm.hra}
                            onChange={(e) => setSalaryForm({...salaryForm, hra: e.target.value})}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="medical" className="text-right">Medical</Label>
                          <Input
                            id="medical"
                            type="number"
                            value={salaryForm.medical}
                            onChange={(e) => setSalaryForm({...salaryForm, medical: e.target.value})}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="conveyance" className="text-right">Conveyance</Label>
                          <Input
                            id="conveyance"
                            type="number"
                            value={salaryForm.conveyance}
                            onChange={(e) => setSalaryForm({...salaryForm, conveyance: e.target.value})}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleSaveSalaryStructure}>Save Structure</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Grade</TableHead>
                      <TableHead>Basic</TableHead>
                      <TableHead>HRA</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salaryStructures.map((structure) => (
                      <TableRow key={structure.id}>
                        <TableCell className="font-medium">{structure.grade}</TableCell>
                        <TableCell>৳{structure.basic.toLocaleString()}</TableCell>
                        <TableCell>৳{structure.hra.toLocaleString()}</TableCell>
                        <TableCell>৳{structure.total.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Employee Salary Assignment</CardTitle>
                <CardDescription>Assign salary structures to employees</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Salary</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{employee.grade}</Badge>
                        </TableCell>
                        <TableCell>৳{employee.totalSalary.toLocaleString()}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Loans & Bonuses Tab */}
        <TabsContent value="loans-bonuses" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loans.filter(l => l.status === 'Active').length}</div>
                <p className="text-xs text-muted-foreground">Ongoing loans</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">৳{loans.reduce((sum, loan) => sum + loan.remaining, 0).toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Remaining amount</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bonuses Paid</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">৳{bonuses.filter(b => b.status === 'Paid').reduce((sum, b) => sum + b.amount, 0).toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{bonuses.filter(b => b.status === 'Pending').length}</div>
                <p className="text-xs text-muted-foreground">Awaiting approval</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Employee Loans</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Loan
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create Employee Loan</DialogTitle>
                        <DialogDescription>Set up a new loan with installment details</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="employee" className="text-right">Employee</Label>
                          <Select onValueChange={(value) => setLoanForm({...loanForm, employeeId: value})}>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select employee" />
                            </SelectTrigger>
                            <SelectContent>
                              {employees.map(emp => (
                                <SelectItem key={emp.id} value={emp.id.toString()}>{emp.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="amount" className="text-right">Loan Amount</Label>
                          <Input
                            id="amount"
                            type="number"
                            value={loanForm.amount}
                            onChange={(e) => setLoanForm({...loanForm, amount: e.target.value})}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="installment" className="text-right">Monthly Installment</Label>
                          <Input
                            id="installment"
                            type="number"
                            value={loanForm.installment}
                            onChange={(e) => setLoanForm({...loanForm, installment: e.target.value})}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="purpose" className="text-right">Purpose</Label>
                          <Textarea
                            id="purpose"
                            value={loanForm.purpose}
                            onChange={(e) => setLoanForm({...loanForm, purpose: e.target.value})}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="startDate" className="text-right">Start Date</Label>
                          <Input
                            id="startDate"
                            type="date"
                            value={loanForm.startDate}
                            onChange={(e) => setLoanForm({...loanForm, startDate: e.target.value})}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button onClick={handleSaveLoan}>Create Loan</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Remaining</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loans.map((loan) => {
                      const progress = ((loan.amount - loan.remaining) / loan.amount) * 100;
                      return (
                        <TableRow key={loan.id}>
                          <TableCell className="font-medium">{loan.employeeName}</TableCell>
                          <TableCell>৳{loan.amount.toLocaleString()}</TableCell>
                          <TableCell>৳{loan.remaining.toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <Progress value={progress} className="w-full" />
                              <p className="text-xs text-muted-foreground">{Math.floor(progress)}% paid</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <FileText className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Bonuses & Incentives</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Bonus
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create Bonus</DialogTitle>
                        <DialogDescription>Set up bonus payment for employee</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="bonusEmployee" className="text-right">Employee</Label>
                          <Select onValueChange={(value) => setBonusForm({...bonusForm, employeeId: value})}>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select employee" />
                            </SelectTrigger>
                            <SelectContent>
                              {employees.map(emp => (
                                <SelectItem key={emp.id} value={emp.id.toString()}>{emp.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="bonusType" className="text-right">Type</Label>
                          <Select onValueChange={(value) => setBonusForm({...bonusForm, type: value})}>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select bonus type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Festival">Festival Bonus</SelectItem>
                              <SelectItem value="Performance">Performance Bonus</SelectItem>
                              <SelectItem value="One-Time">One-Time Bonus</SelectItem>
                              <SelectItem value="KPI">KPI Bonus</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="bonusAmount" className="text-right">Amount</Label>
                          <Input
                            id="bonusAmount"
                            type="number"
                            value={bonusForm.amount}
                            onChange={(e) => setBonusForm({...bonusForm, amount: e.target.value})}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="bonusMonth" className="text-right">Month</Label>
                          <Input
                            id="bonusMonth"
                            type="month"
                            value={bonusForm.month}
                            onChange={(e) => setBonusForm({...bonusForm, month: e.target.value})}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="bonusReason" className="text-right">Reason</Label>
                          <Textarea
                            id="bonusReason"
                            value={bonusForm.reason}
                            onChange={(e) => setBonusForm({...bonusForm, reason: e.target.value})}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button onClick={handleSaveBonus}>Create Bonus</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bonuses.map((bonus) => (
                      <TableRow key={bonus.id}>
                        <TableCell className="font-medium">{bonus.employeeName}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{bonus.type}</Badge>
                        </TableCell>
                        <TableCell>৳{bonus.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={bonus.status === 'Paid' ? 'default' : bonus.status === 'Approved' ? 'secondary' : 'outline'}
                          >
                            {bonus.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {bonus.status === 'Pending' && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleApproveBonus(bonus.id)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payslips & Tax Tab */}
        <TabsContent value="payslips" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Generated Payslips</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{payslips.length}</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tax Deducted</CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">৳{payslips.reduce((sum, p) => sum + (p.gross - p.net), 0).toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Monthly deductions</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Net Payroll</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">৳{payslips.reduce((sum, p) => sum + p.net, 0).toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">After deductions</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sent Payslips</CardTitle>
                <Send className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{payslips.filter(p => p.status === 'Sent').length}</div>
                <p className="text-xs text-muted-foreground">Email delivered</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Payslip Generation</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      Bulk Generate
                    </Button>
                    <Button>
                      <Send className="mr-2 h-4 w-4" />
                      Send All
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Employee Payslips</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Employee</TableHead>
                            <TableHead>Generate</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {employees.map((employee) => (
                            <TableRow key={employee.id}>
                              <TableCell className="font-medium">{employee.name}</TableCell>
                              <TableCell>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleGeneratePayslip(employee.id)}
                                >
                                  <FileText className="mr-2 h-4 w-4" />
                                  Generate
                                </Button>
                              </TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Generated Payslips</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Employee</TableHead>
                            <TableHead>Month</TableHead>
                            <TableHead>Net Pay</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {payslips.map((payslip) => (
                            <TableRow key={payslip.id}>
                              <TableCell className="font-medium">{payslip.employeeName}</TableCell>
                              <TableCell>{payslip.month}</TableCell>
                              <TableCell>৳{payslip.net.toLocaleString()}</TableCell>
                              <TableCell>
                                <Badge variant={payslip.status === 'Sent' ? 'default' : 'secondary'}>
                                  {payslip.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleSendPayslip(payslip.id)}
                                    disabled={payslip.status === 'Sent'}
                                  >
                                    <Send className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tax Management (BD Compliance)</CardTitle>
                <CardDescription>Manage tax calculations and certificates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <Button className="h-20 flex-col">
                    <Receipt className="h-6 w-6 mb-2" />
                    Generate Tax Certificates
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <FileText className="h-6 w-6 mb-2" />
                    Tax Challan Generator
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Download className="h-6 w-6 mb-2" />
                    Tax Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payroll Reports</CardTitle>
                <CardDescription>Generate comprehensive payroll and salary reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Button variant="outline" className="h-20 flex-col">
                    <Users className="h-6 w-6 mb-2" />
                    Employee Salary Report
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Building className="h-6 w-6 mb-2" />
                    Department Summary
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <TrendingUp className="h-6 w-6 mb-2" />
                    Salary History
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Award className="h-6 w-6 mb-2" />
                    Bonus Summary
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <CreditCard className="h-6 w-6 mb-2" />
                    Loan Reports
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Percent className="h-6 w-6 mb-2" />
                    Tax Reports
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Average Salary by Department</Label>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Engineering</span>
                        <span className="font-medium">৳80,000</span>
                      </div>
                      <Progress value={80} />
                      <div className="flex justify-between items-center">
                        <span className="text-sm">HR</span>
                        <span className="font-medium">৳60,000</span>
                      </div>
                      <Progress value={60} />
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Finance</span>
                        <span className="font-medium">৳45,000</span>
                      </div>
                      <Progress value={45} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Payroll Cost Breakdown</Label>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Basic Salary</span>
                        <span className="font-medium">75%</span>
                      </div>
                      <Progress value={75} />
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Allowances</span>
                        <span className="font-medium">15%</span>
                      </div>
                      <Progress value={15} />
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Bonuses</span>
                        <span className="font-medium">10%</span>
                      </div>
                      <Progress value={10} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payroll Configuration</CardTitle>
                <CardDescription>Configure payroll processing settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Auto-generate payslips</Label>
                    <p className="text-sm text-muted-foreground">Automatically generate payslips at month end</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email payslips</Label>
                    <p className="text-sm text-muted-foreground">Send payslips via email to employees</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Include overtime in payroll</Label>
                    <p className="text-sm text-muted-foreground">Calculate overtime pay automatically</p>
                  </div>
                  <Switch />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="payrollDate">Payroll Processing Date</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="25">25th of every month</SelectItem>
                        <SelectItem value="30">30th of every month</SelectItem>
                        <SelectItem value="1">1st of next month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select defaultValue="BDT">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BDT">Bangladeshi Taka (৳)</SelectItem>
                        <SelectItem value="USD">US Dollar ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tax Configuration</CardTitle>
                <CardDescription>Configure tax calculation rules</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="taxYear">Tax Year</Label>
                    <Select defaultValue="2024">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024-2025</SelectItem>
                        <SelectItem value="2023">2023-2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxRate">Default Tax Rate (%)</Label>
                    <Input id="taxRate" type="number" defaultValue="15" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Auto-calculate tax</Label>
                    <p className="text-sm text-muted-foreground">Calculate tax based on BD tax slabs</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PayrollManagement;