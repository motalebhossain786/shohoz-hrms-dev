import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Clock, 
  DollarSign,
  Receipt,
  Upload,
  CalendarIcon,
  MapPin,
  Car,
  Plane,
  Train,
  Bus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data types
interface Claim {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  travelDates: {
    from: Date;
    to: Date;
  };
  purpose: string;
  origin: string;
  destination: string;
  transportMode: string;
  distance: number;
  dailyAllowance: number;
  transportCost: number;
  totalAmount: number;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'paid';
  receipts: string[];
  remarks: string;
  adminNotes: string;
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  createdAt: Date;
}

// Mock user roles
type UserRole = 'employee' | 'admin' | 'hr' | 'finance';

const TADAClaims = () => {
  const { toast } = useToast();
  const [currentUser] = useState({ 
    id: '1', 
    name: 'John Doe', 
    role: 'employee' as UserRole,
    department: 'Engineering'
  });
  
  // Mock data
  const [claims, setClaims] = useState<Claim[]>([
    {
      id: '1',
      employeeId: '1',
      employeeName: 'John Doe',
      department: 'Engineering',
      travelDates: { from: new Date('2024-01-15'), to: new Date('2024-01-17') },
      purpose: 'Client Meeting',
      origin: 'Dhaka',
      destination: 'Chittagong',
      transportMode: 'flight',
      distance: 242,
      dailyAllowance: 2000,
      transportCost: 8000,
      totalAmount: 14000,
      status: 'submitted',
      receipts: ['receipt1.pdf', 'receipt2.jpg'],
      remarks: 'Urgent client meeting for project discussion',
      adminNotes: '',
      submittedAt: new Date('2024-01-10'),
      createdAt: new Date('2024-01-10')
    },
    {
      id: '2',
      employeeId: '2',
      employeeName: 'Jane Smith',
      department: 'Sales',
      travelDates: { from: new Date('2024-01-20'), to: new Date('2024-01-22') },
      purpose: 'Training Program',
      origin: 'Dhaka',
      destination: 'Sylhet',
      transportMode: 'bus',
      distance: 300,
      dailyAllowance: 1500,
      transportCost: 2000,
      totalAmount: 6500,
      status: 'approved',
      receipts: ['training_receipt.pdf'],
      remarks: 'Company sponsored training',
      adminNotes: 'Approved as per training policy',
      submittedAt: new Date('2024-01-12'),
      reviewedAt: new Date('2024-01-14'),
      reviewedBy: 'HR Manager',
      createdAt: new Date('2024-01-12')
    }
  ]);

  // Form states
  const [isNewClaimOpen, setIsNewClaimOpen] = useState(false);
  const [isViewClaimOpen, setIsViewClaimOpen] = useState(false);
  const [isEditClaimOpen, setIsEditClaimOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('employee');

  // New claim form state
  const [formData, setFormData] = useState({
    travelFromDate: undefined as Date | undefined,
    travelToDate: undefined as Date | undefined,
    purpose: '',
    origin: '',
    destination: '',
    transportMode: '',
    distance: 0,
    remarks: '',
    receipts: [] as string[]
  });

  // Constants
  const DAILY_ALLOWANCE_RATE = 1000; // Per day
  const TRANSPORT_RATES = {
    flight: 12, // per km
    train: 8,
    bus: 5,
    car: 10
  };

  const STATUS_CONFIG = {
    draft: { label: 'Draft', color: 'bg-slate-500' },
    submitted: { label: 'Submitted', color: 'bg-blue-500' },
    under_review: { label: 'Under Review', color: 'bg-yellow-500' },
    approved: { label: 'Approved', color: 'bg-green-500' },
    rejected: { label: 'Rejected', color: 'bg-red-500' },
    paid: { label: 'Paid', color: 'bg-purple-500' }
  };

  const TRANSPORT_ICONS = {
    flight: Plane,
    train: Train,
    bus: Bus,
    car: Car
  };

  // Calculations
  const calculateDailyAllowance = (fromDate?: Date, toDate?: Date) => {
    if (!fromDate || !toDate) return 0;
    const days = Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return days * DAILY_ALLOWANCE_RATE;
  };

  const calculateTransportCost = (mode: string, distance: number) => {
    const rate = TRANSPORT_RATES[mode as keyof typeof TRANSPORT_RATES] || 0;
    return rate * distance;
  };

  const calculateTotalAmount = () => {
    const dailyAllowance = calculateDailyAllowance(formData.travelFromDate, formData.travelToDate);
    const transportCost = calculateTransportCost(formData.transportMode, formData.distance);
    return dailyAllowance + transportCost;
  };

  // Filtered claims
  const filteredClaims = useMemo(() => {
    return claims.filter(claim => {
      const matchesSearch = claim.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           claim.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           claim.purpose.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || claim.status === statusFilter;
      const matchesDepartment = departmentFilter === 'all' || claim.department === departmentFilter;
      
      // Role-based filtering
      if (currentUserRole === 'employee') {
        return matchesSearch && matchesStatus && matchesDepartment && claim.employeeId === currentUser.id;
      }
      
      return matchesSearch && matchesStatus && matchesDepartment;
    });
  }, [claims, searchTerm, statusFilter, departmentFilter, currentUserRole, currentUser.id]);

  // Analytics
  const analytics = useMemo(() => {
    const totalClaims = claims.length;
    const pendingClaims = claims.filter(c => ['submitted', 'under_review'].includes(c.status)).length;
    const approvedAmount = claims.filter(c => c.status === 'approved').reduce((sum, c) => sum + c.totalAmount, 0);
    const avgProcessingTime = 2.5; // Mock value

    return { totalClaims, pendingClaims, approvedAmount, avgProcessingTime };
  }, [claims]);

  // Handlers
  const handleSubmitClaim = () => {
    if (!formData.travelFromDate || !formData.travelToDate || !formData.purpose || !formData.origin || !formData.destination || !formData.transportMode) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newClaim: Claim = {
      id: (claims.length + 1).toString(),
      employeeId: currentUser.id,
      employeeName: currentUser.name,
      department: currentUser.department,
      travelDates: { from: formData.travelFromDate, to: formData.travelToDate },
      purpose: formData.purpose,
      origin: formData.origin,
      destination: formData.destination,
      transportMode: formData.transportMode,
      distance: formData.distance,
      dailyAllowance: calculateDailyAllowance(formData.travelFromDate, formData.travelToDate),
      transportCost: calculateTransportCost(formData.transportMode, formData.distance),
      totalAmount: calculateTotalAmount(),
      status: 'submitted',
      receipts: formData.receipts,
      remarks: formData.remarks,
      adminNotes: '',
      submittedAt: new Date(),
      createdAt: new Date()
    };

    setClaims([...claims, newClaim]);
    setIsNewClaimOpen(false);
    
    // Reset form
    setFormData({
      travelFromDate: undefined,
      travelToDate: undefined,
      purpose: '',
      origin: '',
      destination: '',
      transportMode: '',
      distance: 0,
      remarks: '',
      receipts: []
    });

    toast({
      title: "Success",
      description: "Claim submitted successfully"
    });
  };

  const handleStatusUpdate = (claimId: string, newStatus: Claim['status'], notes?: string) => {
    setClaims(claims.map(claim => 
      claim.id === claimId 
        ? { 
            ...claim, 
            status: newStatus, 
            adminNotes: notes || claim.adminNotes,
            reviewedAt: new Date(),
            reviewedBy: 'Admin User'
          }
        : claim
    ));

    toast({
      title: "Success",
      description: `Claim ${newStatus.replace('_', ' ')} successfully`
    });
  };

  const handleDeleteClaim = (claimId: string) => {
    setClaims(claims.filter(claim => claim.id !== claimId));
    toast({
      title: "Success",
      description: "Claim deleted successfully"
    });
  };

  const handleExport = () => {
    // Mock export functionality
    const csvContent = filteredClaims.map(claim => 
      `${claim.id},${claim.employeeName},${claim.department},${claim.purpose},${claim.destination},${claim.totalAmount},${claim.status}`
    ).join('\n');
    
    toast({
      title: "Export Successful",
      description: `Exported ${filteredClaims.length} claims to CSV`
    });
  };

  const StatusBadge = ({ status }: { status: Claim['status'] }) => {
    const config = STATUS_CONFIG[status];
    return (
      <Badge className={`${config.color} text-white`}>
        {config.label}
      </Badge>
    );
  };

  const TransportIcon = ({ mode }: { mode: string }) => {
    const Icon = TRANSPORT_ICONS[mode as keyof typeof TRANSPORT_ICONS] || Car;
    return <Icon className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">TA/DA Claims</h1>
          <p className="text-muted-foreground">Manage travel and daily allowance claims</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Role Switcher (for demo) */}
          <Select value={currentUserRole} onValueChange={(value: UserRole) => setCurrentUserRole(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="employee">Employee</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="hr">HR</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={isNewClaimOpen} onOpenChange={setIsNewClaimOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Claim
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Submit New TA/DA Claim</DialogTitle>
                <DialogDescription>
                  Fill in the details for your travel allowance claim
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Travel Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Travel From Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.travelFromDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.travelFromDate ? format(formData.travelFromDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.travelFromDate}
                          onSelect={(date) => setFormData({...formData, travelFromDate: date})}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Travel To Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.travelToDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.travelToDate ? format(formData.travelToDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.travelToDate}
                          onSelect={(date) => setFormData({...formData, travelToDate: date})}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Purpose */}
                <div className="space-y-2">
                  <Label>Purpose of Travel *</Label>
                  <Select value={formData.purpose} onValueChange={(value) => setFormData({...formData, purpose: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="client_meeting">Client Meeting</SelectItem>
                      <SelectItem value="training">Training Program</SelectItem>
                      <SelectItem value="conference">Conference</SelectItem>
                      <SelectItem value="site_visit">Site Visit</SelectItem>
                      <SelectItem value="business_development">Business Development</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Origin & Destination */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Origin *</Label>
                    <Input
                      placeholder="Starting location"
                      value={formData.origin}
                      onChange={(e) => setFormData({...formData, origin: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Destination *</Label>
                    <Input
                      placeholder="Destination location"
                      value={formData.destination}
                      onChange={(e) => setFormData({...formData, destination: e.target.value})}
                    />
                  </div>
                </div>

                {/* Transport Mode & Distance */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Transportation Mode *</Label>
                    <Select value={formData.transportMode} onValueChange={(value) => setFormData({...formData, transportMode: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select transport" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flight">Flight</SelectItem>
                        <SelectItem value="train">Train</SelectItem>
                        <SelectItem value="bus">Bus</SelectItem>
                        <SelectItem value="car">Car</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Total Distance (km)</Label>
                    <Input
                      type="number"
                      placeholder="Distance in km"
                      value={formData.distance}
                      onChange={(e) => setFormData({...formData, distance: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>

                {/* Auto-calculated amounts */}
                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <h4 className="font-semibold">Calculated Amounts</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Daily Allowance:</span>
                      <p className="font-semibold">৳{calculateDailyAllowance(formData.travelFromDate, formData.travelToDate).toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Transport Cost:</span>
                      <p className="font-semibold">৳{calculateTransportCost(formData.transportMode, formData.distance).toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total Amount:</span>
                      <p className="font-bold text-primary">৳{calculateTotalAmount().toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Upload Bills */}
                <div className="space-y-2">
                  <Label>Upload Bills/Receipts</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">Drag & drop files or click to browse</p>
                    <Button variant="outline" size="sm">
                      Choose Files
                    </Button>
                  </div>
                </div>

                {/* Remarks */}
                <div className="space-y-2">
                  <Label>Remarks</Label>
                  <Textarea
                    placeholder="Additional notes or comments"
                    value={formData.remarks}
                    onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsNewClaimOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmitClaim}>
                    Submit Claim
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Claims</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalClaims}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Claims</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{analytics.pendingClaims}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">৳{analytics.approvedAmount.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Processing</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.avgProcessingTime} days</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Claims Management</CardTitle>
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by employee, destination, or purpose..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>

            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Claims Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Claim ID</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Travel Dates</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClaims.map((claim) => (
                  <TableRow key={claim.id}>
                    <TableCell className="font-medium">#{claim.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{claim.employeeName}</div>
                        <div className="text-sm text-muted-foreground">{claim.department}</div>
                      </div>
                    </TableCell>
                    <TableCell>{claim.purpose}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {format(claim.travelDates.from, 'MMM dd')} - {format(claim.travelDates.to, 'MMM dd, yyyy')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <TransportIcon mode={claim.transportMode} />
                        <div>
                          <div className="font-medium">{claim.destination}</div>
                          <div className="text-sm text-muted-foreground">from {claim.origin}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">৳{claim.totalAmount.toLocaleString()}</TableCell>
                    <TableCell>
                      <StatusBadge status={claim.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedClaim(claim);
                            setIsViewClaimOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        {/* Admin/HR Actions */}
                        {['admin', 'hr', 'finance'].includes(currentUserRole) && (
                          <>
                            {claim.status === 'submitted' && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleStatusUpdate(claim.id, 'approved')}
                                  className="text-green-600 hover:text-green-700"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleStatusUpdate(claim.id, 'rejected')}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            {claim.status === 'approved' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleStatusUpdate(claim.id, 'paid')}
                                className="text-purple-600 hover:text-purple-700"
                              >
                                <DollarSign className="h-4 w-4" />
                              </Button>
                            )}
                          </>
                        )}

                        {/* Employee Actions */}
                        {currentUserRole === 'employee' && claim.employeeId === currentUser.id && claim.status === 'draft' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedClaim(claim);
                                setIsEditClaimOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Claim</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this claim? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteClaim(claim.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredClaims.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No claims found matching your criteria
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Claim Dialog */}
      <Dialog open={isViewClaimOpen} onOpenChange={setIsViewClaimOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedClaim && (
            <>
              <DialogHeader>
                <DialogTitle>Claim Details - #{selectedClaim.id}</DialogTitle>
                <DialogDescription>
                  View complete claim information and history
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Status and Basic Info */}
                <div className="flex items-center justify-between">
                  <StatusBadge status={selectedClaim.status} />
                  <div className="text-sm text-muted-foreground">
                    Submitted on {format(selectedClaim.submittedAt, 'PPP')}
                  </div>
                </div>

                {/* Employee Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Employee</Label>
                    <p className="text-sm">{selectedClaim.employeeName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Department</Label>
                    <p className="text-sm">{selectedClaim.department}</p>
                  </div>
                </div>

                {/* Travel Details */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Travel Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Purpose</Label>
                      <p className="text-sm">{selectedClaim.purpose}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Travel Dates</Label>
                      <p className="text-sm">
                        {format(selectedClaim.travelDates.from, 'PPP')} - {format(selectedClaim.travelDates.to, 'PPP')}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Route</Label>
                      <p className="text-sm">{selectedClaim.origin} → {selectedClaim.destination}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Transport</Label>
                      <div className="flex items-center gap-2 text-sm">
                        <TransportIcon mode={selectedClaim.transportMode} />
                        {selectedClaim.transportMode} ({selectedClaim.distance} km)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Financial Breakdown */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Financial Breakdown</h4>
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span>Daily Allowance:</span>
                      <span>৳{selectedClaim.dailyAllowance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transport Cost:</span>
                      <span>৳{selectedClaim.transportCost.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total Amount:</span>
                      <span>৳{selectedClaim.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Remarks */}
                {selectedClaim.remarks && (
                  <div>
                    <Label className="text-sm font-medium">Employee Remarks</Label>
                    <p className="text-sm mt-1 p-3 bg-muted rounded">{selectedClaim.remarks}</p>
                  </div>
                )}

                {/* Admin Notes */}
                {selectedClaim.adminNotes && (
                  <div>
                    <Label className="text-sm font-medium">Admin Notes</Label>
                    <p className="text-sm mt-1 p-3 bg-muted rounded">{selectedClaim.adminNotes}</p>
                  </div>
                )}

                {/* Receipts */}
                {selectedClaim.receipts.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium">Receipts/Bills</Label>
                    <div className="flex gap-2 mt-2">
                      {selectedClaim.receipts.map((receipt, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 border rounded">
                          <Receipt className="h-4 w-4" />
                          <span className="text-sm">{receipt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Admin Actions */}
                {['admin', 'hr', 'finance'].includes(currentUserRole) && selectedClaim.status === 'submitted' && (
                  <div className="flex gap-3 pt-4 border-t">
                    <Button 
                      onClick={() => {
                        handleStatusUpdate(selectedClaim.id, 'approved');
                        setIsViewClaimOpen(false);
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => {
                        handleStatusUpdate(selectedClaim.id, 'rejected');
                        setIsViewClaimOpen(false);
                      }}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TADAClaims;