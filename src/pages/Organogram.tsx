import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  GitBranch, Plus, Edit, Trash2, Users, Building, 
  Search, Filter, Eye, UserPlus, Settings 
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
    <g>
      <circle r="30" fill="hsl(var(--primary))" stroke="hsl(var(--border))" strokeWidth="2" />
      <text fill="white" strokeWidth="0" x="0" y="5" textAnchor="middle" fontSize="12" fontWeight="bold">
        {nodeDatum.attributes.avatar}
      </text>
      <text fill="hsl(var(--foreground))" strokeWidth="0" x="0" y="50" textAnchor="middle" fontSize="14" fontWeight="600">
        {nodeDatum.name}
      </text>
      <text fill="hsl(var(--muted-foreground))" strokeWidth="0" x="0" y="65" textAnchor="middle" fontSize="12">
        {nodeDatum.attributes.position}
      </text>
      <text fill="hsl(var(--muted-foreground))" strokeWidth="0" x="0" y="80" textAnchor="middle" fontSize="10">
        {nodeDatum.attributes.id}
      </text>
    </g>
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
                  translate={{ x: 400, y: 100 }}
                  separation={{ siblings: 2, nonSiblings: 2 }}
                  renderCustomNodeElement={customNodeElement}
                  nodeSize={{ x: 200, y: 120 }}
                  zoom={0.8}
                  enableLegacyTransitions
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
          {departmentStats.map((dept) => (
            <Card key={dept.department}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{dept.department} Department</span>
                  <Badge variant="secondary">{dept.total} Total</Badge>
                </CardTitle>
                <CardDescription>
                  {dept.active} Active • {dept.total - dept.active} Inactive
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dept.positions.map((pos) => (
                      <div key={pos.position} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                        <div>
                          <p className="font-medium">{pos.position}</p>
                          <p className="text-sm text-muted-foreground">{pos.count} employee(s)</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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