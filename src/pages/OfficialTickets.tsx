import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus, Search, Filter, Download, MessageSquare, Clock, CheckCircle, XCircle, AlertCircle, Eye, FileText, Users, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Mock data
const mockTickets = [
  {
    id: 'TCK-001',
    title: 'Payroll Discrepancy in November Salary',
    requestType: 'Payroll',
    priority: 'High',
    status: 'Open',
    description: 'There seems to be a discrepancy in my November salary calculation. The overtime hours were not calculated correctly.',
    createdBy: 'John Doe',
    employeeId: 'EMP-001',
    department: 'Engineering',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    assignedTo: 'Sarah Wilson',
    comments: [
      {
        id: 1,
        author: 'John Doe',
        message: 'I worked 15 hours of overtime but only 10 hours are reflected in my payslip.',
        timestamp: '2024-01-15T10:30:00Z',
        isInternal: false
      }
    ],
    attachments: ['payslip_november.pdf']
  },
  {
    id: 'TCK-002',
    title: 'Leave Application Not Approved',
    requestType: 'HR',
    priority: 'Medium',
    status: 'In Progress',
    description: 'My leave application for next week has been pending for 5 days without any response.',
    createdBy: 'Jane Smith',
    employeeId: 'EMP-002',
    department: 'Marketing',
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-16T09:15:00Z',
    assignedTo: 'Mike Johnson',
    comments: [
      {
        id: 1,
        author: 'Jane Smith',
        message: 'I need this approved urgently as I have already made travel arrangements.',
        timestamp: '2024-01-14T14:20:00Z',
        isInternal: false
      },
      {
        id: 2,
        author: 'Mike Johnson',
        message: 'Checking with your manager for approval.',
        timestamp: '2024-01-16T09:15:00Z',
        isInternal: false
      }
    ],
    attachments: []
  },
  {
    id: 'TCK-003',
    title: 'Laptop Performance Issues',
    requestType: 'IT',
    priority: 'Low',
    status: 'Resolved',
    description: 'My laptop has been running slowly and crashes frequently during video calls.',
    createdBy: 'Robert Brown',
    employeeId: 'EMP-003',
    department: 'Sales',
    createdAt: '2024-01-10T11:45:00Z',
    updatedAt: '2024-01-16T16:30:00Z',
    assignedTo: 'Tech Support',
    comments: [
      {
        id: 1,
        author: 'Robert Brown',
        message: 'The issue started last week after the Windows update.',
        timestamp: '2024-01-10T11:45:00Z',
        isInternal: false
      },
      {
        id: 2,
        author: 'Tech Support',
        message: 'Laptop has been serviced and RAM upgraded. Issue resolved.',
        timestamp: '2024-01-16T16:30:00Z',
        isInternal: false
      }
    ],
    attachments: ['system_report.txt']
  },
  {
    id: 'TCK-004',
    title: 'Travel Reimbursement Delay',
    requestType: 'Travel',
    priority: 'Medium',
    status: 'Closed',
    description: 'My travel expenses from last month business trip have not been reimbursed yet.',
    createdBy: 'Emily Davis',
    employeeId: 'EMP-004',
    department: 'Business Development',
    createdAt: '2024-01-05T09:00:00Z',
    updatedAt: '2024-01-15T17:00:00Z',
    assignedTo: 'Finance Team',
    comments: [
      {
        id: 1,
        author: 'Emily Davis',
        message: 'I submitted all receipts and forms on time.',
        timestamp: '2024-01-05T09:00:00Z',
        isInternal: false
      },
      {
        id: 2,
        author: 'Finance Team',
        message: 'Reimbursement processed and transferred to your account.',
        timestamp: '2024-01-15T17:00:00Z',
        isInternal: false
      }
    ],
    attachments: ['receipts.pdf', 'travel_form.pdf']
  }
];

const ticketFormSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  requestType: z.string().min(1, 'Please select a request type'),
  priority: z.string().min(1, 'Please select a priority'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

const commentFormSchema = z.object({
  message: z.string().min(1, 'Comment cannot be empty'),
});

type TicketFormData = z.infer<typeof ticketFormSchema>;
type CommentFormData = z.infer<typeof commentFormSchema>;

const OfficialTickets = () => {
  const [tickets, setTickets] = useState(mockTickets);
  const [selectedTicket, setSelectedTicket] = useState<typeof mockTickets[0] | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentUser] = useState({ role: 'admin', name: 'Admin User', id: 'ADM-001' }); // Mock current user

  const ticketForm = useForm<TicketFormData>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      title: '',
      requestType: '',
      priority: '',
      description: '',
    },
  });

  const commentForm = useForm<CommentFormData>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      message: '',
    },
  });

  // Filter tickets based on search and filters
  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      const matchesSearch = 
        ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.createdBy.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
      const matchesType = typeFilter === 'all' || ticket.requestType === typeFilter;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesType;
    });
  }, [tickets, searchQuery, statusFilter, priorityFilter, typeFilter]);

  // Calculate analytics
  const analytics = useMemo(() => {
    const total = tickets.length;
    const open = tickets.filter(t => t.status === 'Open').length;
    const inProgress = tickets.filter(t => t.status === 'In Progress').length;
    const resolved = tickets.filter(t => t.status === 'Resolved').length;
    const closed = tickets.filter(t => t.status === 'Closed').length;
    
    const avgResolutionTime = '2.5 days'; // Mock calculation
    
    return { total, open, inProgress, resolved, closed, avgResolutionTime };
  }, [tickets]);

  const handleCreateTicket = (data: TicketFormData) => {
    const newTicket = {
      id: `TCK-${String(tickets.length + 1).padStart(3, '0')}`,
      title: data.title,
      requestType: data.requestType,
      priority: data.priority,
      status: 'Open',
      description: data.description,
      createdBy: currentUser.name,
      employeeId: currentUser.id,
      department: 'Admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assignedTo: 'Unassigned',
      comments: [],
      attachments: []
    };
    
    setTickets(prev => [newTicket, ...prev]);
    setIsCreateDialogOpen(false);
    ticketForm.reset();
    toast({
      title: "Ticket Created",
      description: `Ticket ${newTicket.id} has been created successfully.`,
    });
  };

  const handleAddComment = (data: CommentFormData) => {
    if (!selectedTicket) return;
    
    const newComment = {
      id: selectedTicket.comments.length + 1,
      author: currentUser.name,
      message: data.message,
      timestamp: new Date().toISOString(),
      isInternal: false
    };
    
    const updatedTicket = {
      ...selectedTicket,
      comments: [...selectedTicket.comments, newComment],
      updatedAt: new Date().toISOString()
    };
    
    setTickets(prev => 
      prev.map(ticket => 
        ticket.id === selectedTicket.id ? updatedTicket : ticket
      )
    );
    
    setSelectedTicket(updatedTicket);
    commentForm.reset();
    toast({
      title: "Comment Added",
      description: "Your comment has been added to the ticket.",
    });
  };

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    setTickets(prev => 
      prev.map(ticket => 
        ticket.id === ticketId 
          ? { ...ticket, status: newStatus, updatedAt: new Date().toISOString() }
          : ticket
      )
    );
    
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket(prev => prev ? { ...prev, status: newStatus } : null);
    }
    
    toast({
      title: "Status Updated",
      description: `Ticket status changed to ${newStatus}.`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Open': return <AlertCircle className="h-4 w-4" />;
      case 'In Progress': return <Clock className="h-4 w-4" />;
      case 'Resolved': return <CheckCircle className="h-4 w-4" />;
      case 'Closed': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'destructive';
      case 'In Progress': return 'default';
      case 'Resolved': return 'secondary';
      case 'Closed': return 'outline';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'secondary';
      default: return 'default';
    }
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your ticket report is being generated and will be downloaded shortly.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Official Tickets</h1>
          <p className="text-muted-foreground">
            Manage internal support requests and queries
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Raise a Ticket
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Ticket</DialogTitle>
                <DialogDescription>
                  Fill in the details below to raise a new support ticket.
                </DialogDescription>
              </DialogHeader>
              <Form {...ticketForm}>
                <form onSubmit={ticketForm.handleSubmit(handleCreateTicket)} className="space-y-4">
                  <FormField
                    control={ticketForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ticket Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Brief description of the issue" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={ticketForm.control}
                      name="requestType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Request Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="HR">HR</SelectItem>
                              <SelectItem value="Payroll">Payroll</SelectItem>
                              <SelectItem value="IT">IT</SelectItem>
                              <SelectItem value="Travel">Travel</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={ticketForm.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Priority</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Low">Low</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="High">High</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={ticketForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Provide detailed information about your request or issue"
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Create Ticket</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="tickets" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tickets">All Tickets</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tickets" className="space-y-4">
          {/* Filters and Search */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filter & Search</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[300px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search tickets by title, description, or ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Payroll">Payroll</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="Travel">Travel</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tickets Table */}
          <Card>
            <CardHeader>
              <CardTitle>Tickets ({filteredTickets.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">{ticket.id}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{ticket.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{ticket.requestType}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPriorityColor(ticket.priority) as any}>
                          {ticket.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(ticket.status) as any} className="flex items-center gap-1 w-fit">
                          {getStatusIcon(ticket.status)}
                          {ticket.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{ticket.createdBy}</TableCell>
                      <TableCell>{ticket.assignedTo}</TableCell>
                      <TableCell>{new Date(ticket.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedTicket(ticket);
                              setIsDetailDialogOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {currentUser.role === 'admin' && (
                            <Select
                              value={ticket.status}
                              onValueChange={(value) => handleStatusChange(ticket.id, value)}
                            >
                              <SelectTrigger className="w-[120px] h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Open">Open</SelectItem>
                                <SelectItem value="In Progress">In Progress</SelectItem>
                                <SelectItem value="Resolved">Resolved</SelectItem>
                                <SelectItem value="Closed">Closed</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredTickets.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No tickets found matching your criteria.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          {/* Analytics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.total}</div>
                <p className="text-xs text-muted-foreground">All time</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
                <AlertCircle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.open}</div>
                <p className="text-xs text-muted-foreground">Requires attention</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                <Clock className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.inProgress}</div>
                <p className="text-xs text-muted-foreground">Being worked on</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Resolution</CardTitle>
                <Calendar className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.avgResolutionTime}</div>
                <p className="text-xs text-muted-foreground">Resolution time</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-destructive" />
                      Open
                    </span>
                    <span className="font-semibold">{analytics.open}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      In Progress
                    </span>
                    <span className="font-semibold">{analytics.inProgress}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Resolved
                    </span>
                    <span className="font-semibold">{analytics.resolved}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-gray-500" />
                      Closed
                    </span>
                    <span className="font-semibold">{analytics.closed}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="font-medium">TCK-001 Status Changed</div>
                    <div className="text-muted-foreground">Changed to Open • 2 hours ago</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">New Comment Added</div>
                    <div className="text-muted-foreground">TCK-002 • 4 hours ago</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">TCK-003 Resolved</div>
                    <div className="text-muted-foreground">Laptop issue fixed • 1 day ago</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">TCK-004 Closed</div>
                    <div className="text-muted-foreground">Travel reimbursement completed • 2 days ago</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Ticket Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          {selectedTicket && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  {selectedTicket.id}: {selectedTicket.title}
                  <Badge variant={getStatusColor(selectedTicket.status) as any} className="flex items-center gap-1">
                    {getStatusIcon(selectedTicket.status)}
                    {selectedTicket.status}
                  </Badge>
                </DialogTitle>
                <DialogDescription>
                  Created by {selectedTicket.createdBy} on{' '}
                  {new Date(selectedTicket.createdAt).toLocaleString()}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                {/* Ticket Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Type</div>
                    <Badge variant="outline">{selectedTicket.requestType}</Badge>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Priority</div>
                    <Badge variant={getPriorityColor(selectedTicket.priority) as any}>
                      {selectedTicket.priority}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Assigned To</div>
                    <div className="text-sm">{selectedTicket.assignedTo}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Department</div>
                    <div className="text-sm">{selectedTicket.department}</div>
                  </div>
                </div>
                
                {/* Description */}
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-2">Description</div>
                  <div className="p-3 bg-muted rounded-md text-sm">
                    {selectedTicket.description}
                  </div>
                </div>
                
                {/* Attachments */}
                {selectedTicket.attachments.length > 0 && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-2">Attachments</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedTicket.attachments.map((attachment, index) => (
                        <Badge key={index} variant="outline" className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {attachment}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Comments */}
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Comments ({selectedTicket.comments.length})
                  </div>
                  
                  <div className="space-y-3 max-h-[300px] overflow-y-auto">
                    {selectedTicket.comments.map((comment) => (
                      <div key={comment.id} className="p-3 bg-muted rounded-md">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium text-sm">{comment.author}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(comment.timestamp).toLocaleString()}
                          </div>
                        </div>
                        <div className="text-sm">{comment.message}</div>
                      </div>
                    ))}
                    
                    {selectedTicket.comments.length === 0 && (
                      <div className="text-center py-4 text-muted-foreground text-sm">
                        No comments yet. Be the first to add a comment.
                      </div>
                    )}
                  </div>
                  
                  {/* Add Comment Form */}
                  <Form {...commentForm}>
                    <form onSubmit={commentForm.handleSubmit(handleAddComment)} className="mt-4 space-y-3">
                      <FormField
                        control={commentForm.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea 
                                placeholder="Add a comment..."
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-end">
                        <Button type="submit" size="sm">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Add Comment
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OfficialTickets;