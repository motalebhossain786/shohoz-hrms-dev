import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  GitBranch, Plus, Edit, Trash2, Users, Building, 
  Search, Filter, Eye, UserPlus, Settings, Calendar 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Tree from 'react-d3-tree';

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  company: string;
  dateOfJoining: string;
  avatar: string;
  profileImage: string;
  email: string;
  status: string;
  reportingTo?: string;
}

interface TreeNode {
  name: string;
  attributes: {
    id: string;
    position: string;
    department: string;
    company: string;
    dateOfJoining: string;
    avatar: string;
    profileImage: string;
    email: string;
    status: string;
  };
  children?: TreeNode[];
}

const Organogram = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Dummy organizational data
  const [employees] = useState<Employee[]>([
    {
      id: 'EMP001',
      name: 'John Smith',
      position: 'Chief Executive Officer',
      department: 'Executive',
      company: 'Shohoz',
      dateOfJoining: '2018-01-15',
      avatar: 'JS',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      email: 'john.smith@shohoz.com',
      status: 'Active'
    },
    {
      id: 'EMP002',
      name: 'Sarah Wilson',
      position: 'Chief Operating Officer',
      department: 'Operations',
      company: 'Shohoz',
      dateOfJoining: '2019-03-20',
      avatar: 'SW',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      email: 'sarah.wilson@shohoz.com',
      status: 'Active',
      reportingTo: 'EMP001'
    },
    {
      id: 'EMP003',
      name: 'Mike Johnson',
      position: 'Head of Engineering',
      department: 'Engineering',
      company: 'Shohoz',
      dateOfJoining: '2020-06-10',
      avatar: 'MJ',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      email: 'mike.johnson@shohoz.com',
      status: 'Active',
      reportingTo: 'EMP002'
    },
    {
      id: 'EMP004',
      name: 'Emily Chen',
      position: 'Head of HR',
      department: 'HR',
      company: 'Shohoz',
      dateOfJoining: '2020-08-15',
      avatar: 'EC',
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      email: 'emily.chen@shohoz.com',
      status: 'Active',
      reportingTo: 'EMP002'
    },
    {
      id: 'EMP005',
      name: 'David Brown',
      position: 'Senior Developer',
      department: 'Engineering',
      company: 'Shohoz',
      dateOfJoining: '2021-02-01',
      avatar: 'DB',
      profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      email: 'david.brown@shohoz.com',
      status: 'Active',
      reportingTo: 'EMP003'
    },
    {
      id: 'EMP006',
      name: 'Lisa Garcia',
      position: 'Marketing Manager',
      department: 'Marketing',
      company: 'Shohoz',
      dateOfJoining: '2021-05-10',
      avatar: 'LG',
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      email: 'lisa.garcia@shohoz.com',
      status: 'Active',
      reportingTo: 'EMP002'
    },
    {
      id: 'EMP007',
      name: 'James Wilson',
      position: 'Junior Developer',
      department: 'Engineering',
      company: 'Shohoz',
      dateOfJoining: '2022-01-15',
      avatar: 'JW',
      profileImage: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=face',
      email: 'james.wilson@shohoz.com',
      status: 'Active',
      reportingTo: 'EMP003'
    },
    {
      id: 'EMP008',
      name: 'Maria Rodriguez',
      position: 'HR Specialist',
      department: 'HR',
      company: 'Shohoz',
      dateOfJoining: '2022-03-01',
      avatar: 'MR',
      profileImage: 'https://images.unsplash.com/photo-1549351512-c5e12b11e283?w=150&h=150&fit=crop&crop=face',
      email: 'maria.rodriguez@shohoz.com',
      status: 'Active',
      reportingTo: 'EMP004'
    }
  ]);

  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [viewMode, setViewMode] = useState<'tree' | 'headcount'>('tree');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Get unique departments and companies
  const departments = [...new Set(employees.map(emp => emp.department))];
  const companies = [...new Set(employees.map(emp => emp.company))];

  // Filter employees based on selected filters
  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
      const matchesCompany = selectedCompany === 'all' || employee.company === selectedCompany;
      return matchesDepartment && matchesCompany;
    });
  }, [employees, selectedDepartment, selectedCompany]);

  // Build tree structure
  const buildTreeData = (employees: Employee[]): TreeNode[] => {
    const employeeMap = new Map(employees.map(emp => [emp.id, emp]));
    const rootNodes: TreeNode[] = [];
    const childNodes = new Map<string, TreeNode[]>();

    employees.forEach(employee => {
      const node: TreeNode = {
        name: employee.name,
        attributes: {
          id: employee.id,
          position: employee.position,
          department: employee.department,
          company: employee.company,
          dateOfJoining: employee.dateOfJoining,
          avatar: employee.avatar,
          profileImage: employee.profileImage,
          email: employee.email,
          status: employee.status
        }
      };

      if (!employee.reportingTo) {
        rootNodes.push(node);
      } else {
        if (!childNodes.has(employee.reportingTo)) {
          childNodes.set(employee.reportingTo, []);
        }
        childNodes.get(employee.reportingTo)!.push(node);
      }
    });

    const attachChildren = (node: TreeNode) => {
      const children = childNodes.get(node.attributes.id);
      if (children) {
        node.children = children;
        children.forEach(attachChildren);
      }
    };

    rootNodes.forEach(attachChildren);
    return rootNodes;
  };

  const treeData = buildTreeData(filteredEmployees);

  // Calculate department headcount
  const departmentStats = useMemo(() => {
    const stats = new Map<string, { total: number; active: number; positions: Map<string, number> }>();
    
    filteredEmployees.forEach(employee => {
      if (!stats.has(employee.department)) {
        stats.set(employee.department, { total: 0, active: 0, positions: new Map() });
      }
      
      const deptStats = stats.get(employee.department)!;
      deptStats.total++;
      if (employee.status === 'Active') deptStats.active++;
      
      const currentCount = deptStats.positions.get(employee.position) || 0;
      deptStats.positions.set(employee.position, currentCount + 1);
    });
    
    return Array.from(stats.entries()).map(([dept, data]) => ({
      department: dept,
      total: data.total,
      active: data.active,
      positions: Array.from(data.positions.entries()).map(([pos, count]) => ({ position: pos, count }))
    }));
  }, [filteredEmployees]);

  const handleAddEmployee = () => {
    setIsAddDialogOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsEditDialogOpen(true);
  };

  const handleDeleteEmployee = (employee: Employee) => {
    toast({
      title: "Employee Removed",
      description: `${employee.name} has been removed from the organization.`
    });
  };

  const customNodeElement = ({ nodeDatum }: any) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <g 
            onClick={() => navigate(`/employees/${nodeDatum.attributes.id}`)}
            style={{ cursor: 'pointer' }}
            className="hover:opacity-80 transition-opacity"
          >
            {/* Enhanced node with profile image */}
            <foreignObject x="-50" y="-50" width="100" height="100">
              <div className="flex flex-col items-center p-2 bg-background border border-border rounded-lg shadow-sm">
                <Avatar className="h-12 w-12 mb-2">
                  <AvatarImage src={nodeDatum.attributes.profileImage} alt={nodeDatum.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                    {nodeDatum.attributes.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <p className="text-xs font-semibold text-foreground truncate w-20">{nodeDatum.name}</p>
                  <p className="text-xs text-muted-foreground truncate w-20">{nodeDatum.attributes.id}</p>
                </div>
              </div>
            </foreignObject>
            
            {/* Additional info displayed below */}
            <text fill="hsl(var(--foreground))" strokeWidth="0" x="0" y="70" textAnchor="middle" fontSize="11" fontWeight="600">
              {nodeDatum.attributes.position}
            </text>
            <text fill="hsl(var(--muted-foreground))" strokeWidth="0" x="0" y="85" textAnchor="middle" fontSize="10">
              <tspan>DoJ: {new Date(nodeDatum.attributes.dateOfJoining).toLocaleDateString()}</tspan>
            </text>
          </g>
        </TooltipTrigger>
        <TooltipContent>
          <div className="p-2">
            <p className="font-semibold">{nodeDatum.name}</p>
            <p className="text-sm">{nodeDatum.attributes.position}</p>
            <p className="text-sm text-muted-foreground">{nodeDatum.attributes.department}</p>
            <p className="text-sm text-muted-foreground">ID: {nodeDatum.attributes.id}</p>
            <p className="text-sm text-muted-foreground">DoJ: {new Date(nodeDatum.attributes.dateOfJoining).toLocaleDateString()}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <GitBranch className="h-8 w-8 text-primary" />
            Organogram
          </h1>
          <p className="text-muted-foreground mt-2">Visualize and manage organizational structure</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setViewMode(viewMode === 'tree' ? 'headcount' : 'tree')}>
            {viewMode === 'tree' ? <Users className="h-4 w-4 mr-2" /> : <GitBranch className="h-4 w-4 mr-2" />}
            {viewMode === 'tree' ? 'View Headcount' : 'View Tree'}
          </Button>
          <Button onClick={handleAddEmployee}>
            <Plus className="h-4 w-4 mr-2" />
            Add Position
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter the organizational view</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Department</Label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Company</Label>
              <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                <SelectTrigger>
                  <SelectValue placeholder="All Companies" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  {companies.map(company => (
                    <SelectItem key={company} value={company}>{company}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" onClick={() => {
                setSelectedDepartment('all');
                setSelectedCompany('all');
              }}>
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      {viewMode === 'tree' ? (
        <Card>
          <CardHeader>
            <CardTitle>Organizational Tree</CardTitle>
            <CardDescription>Interactive hierarchy visualization ({filteredEmployees.length} employees)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[600px] w-full border border-border rounded-lg bg-background">
              {treeData.length > 0 ? (
                <Tree
                  data={treeData}
                  orientation="vertical"
                  translate={{ x: 400, y: 150 }}
                  separation={{ siblings: 2.5, nonSiblings: 2.5 }}
                  renderCustomNodeElement={customNodeElement}
                  nodeSize={{ x: 220, y: 150 }}
                  zoom={0.7}
                  enableLegacyTransitions
                  zoomable
                  draggable
                  collapsible={false}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <GitBranch className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No employees found matching the selected filters.</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {departments.map((department) => {
            const deptEmployees = filteredEmployees.filter(emp => emp.department === department);
            if (deptEmployees.length === 0) return null;
            
            return (
              <Card key={department}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{department} Department</span>
                    <Badge variant="secondary">{deptEmployees.length} Employees</Badge>
                  </CardTitle>
                  <CardDescription>
                    {deptEmployees.filter(emp => emp.status === 'Active').length} Active • {deptEmployees.filter(emp => emp.status !== 'Active').length} Inactive
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {deptEmployees.map((employee) => (
                        <div key={employee.id} className="flex items-center justify-between p-4 bg-accent/30 rounded-lg border border-border hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={employee.profileImage} alt={employee.name} />
                              <AvatarFallback className="bg-primary text-primary-foreground text-sm font-bold">
                                {employee.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-foreground">{employee.name}</p>
                              <p className="text-sm text-muted-foreground">{employee.id}</p>
                              <p className="text-sm font-medium">{employee.position}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Calendar className="h-3 w-3 text-muted-foreground" />
                                <p className="text-xs text-muted-foreground">
                                  DoJ: {new Date(employee.dateOfJoining).toLocaleDateString()}
                                </p>
                                <Badge 
                                  variant={employee.status === 'Active' ? 'default' : 'secondary'}
                                  className="ml-2 text-xs"
                                >
                                  {employee.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => navigate(`/employees/${employee.id}`)}
                              className="w-20"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => navigate(`/employees/${employee.id}/edit`)}
                              className="w-20"
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add Employee Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Position</DialogTitle>
            <DialogDescription>Create a new organizational position</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Position Title</Label>
              <Input placeholder="Enter position title" />
            </div>
            <div>
              <Label>Department</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Reporting To</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select supervisor" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map(emp => (
                    <SelectItem key={emp.id} value={emp.id}>{emp.name} - {emp.position}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea placeholder="Position description..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              setIsAddDialogOpen(false);
              toast({ title: "Position Added", description: "New position has been created successfully." });
            }}>Create Position</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Employee Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Position</DialogTitle>
            <DialogDescription>Update organizational position details</DialogDescription>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-4">
              <div>
                <Label>Position Title</Label>
                <Input defaultValue={selectedEmployee.position} />
              </div>
              <div>
                <Label>Department</Label>
                <Select defaultValue={selectedEmployee.department}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Status</Label>
                <Select defaultValue={selectedEmployee.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              setIsEditDialogOpen(false);
              toast({ title: "Position Updated", description: "Position details have been updated successfully." });
            }}>Update Position</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Organogram;