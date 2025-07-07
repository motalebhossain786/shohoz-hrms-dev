import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Edit, Plus, Search, BookOpen, Users, Clock, DollarSign, Settings, Eye, EyeOff, Trash2, Save } from 'lucide-react';

// Mock data structure
const initialHandbookData = {
  company: {
    welcome: "Welcome to Shohoz! We're excited to have you join our dynamic team. This handbook will guide you through our culture, policies, and everything you need to know to succeed here.",
    mission: "To revolutionize transportation and logistics through innovative technology solutions that connect people and businesses across Bangladesh.",
    vision: "To become the leading super app platform in Bangladesh, empowering millions through seamless digital experiences.",
    values: ["Innovation", "Integrity", "Customer-Centricity", "Teamwork", "Excellence"],
    history: [
      { year: "2015", event: "Shohoz founded with a vision to digitize Bangladesh's transport sector" },
      { year: "2017", event: "Launched bus ticketing platform, revolutionizing inter-city travel" },
      { year: "2019", event: "Expanded to ride-sharing and logistics services" },
      { year: "2021", event: "Became Bangladesh's first transport unicorn" },
      { year: "2023", event: "Launched comprehensive super app platform" }
    ],
    structure: {
      ceo: "Maliha Quadir",
      departments: ["Engineering", "Product", "Marketing", "Operations", "HR", "Finance"]
    }
  },
  policies: [
    {
      id: 1,
      title: "Equal Employment Opportunity (EEO) Policy",
      content: "Shohoz is committed to providing equal employment opportunities to all employees and applicants regardless of race, religion, gender, age, nationality, or physical ability.",
      published: true,
      lastUpdated: "2024-01-15"
    },
    {
      id: 2,
      title: "Anti-Harassment & Discrimination Policy",
      content: "We maintain a zero-tolerance policy toward harassment and discrimination. All employees have the right to work in an environment free from harassment.",
      published: true,
      lastUpdated: "2024-01-10"
    },
    {
      id: 3,
      title: "Code of Conduct & Ethics",
      content: "All employees are expected to maintain the highest standards of professional conduct, integrity, and ethical behavior in all business dealings.",
      published: true,
      lastUpdated: "2024-01-08"
    }
  ],
  workHours: {
    officeHours: "9:00 AM - 6:00 PM (Monday to Friday)",
    shifts: "Standard Day Shift, Flexible timing with core hours 10 AM - 4 PM",
    remoteWork: "Hybrid model - 3 days office, 2 days remote per week",
    overtime: "Overtime compensation as per Bangladesh Labor Law",
    breaks: "1 hour lunch break, 15-minute tea breaks (morning & afternoon)"
  },
  benefits: {
    salary: "Competitive salary structure with annual performance reviews",
    bonuses: "Performance-based bonuses, festival bonuses as per company policy",
    providentFund: "Company contributes 10% of basic salary to PF",
    insurance: "Comprehensive health insurance for employee and family",
    travelAllowance: "Monthly transport allowance and business travel reimbursement"
  },
  hrmsGuide: [
    {
      title: "Getting Started with HRMS",
      content: "Your complete guide to accessing and using the Shohoz HRMS platform effectively."
    },
    {
      title: "Leave Management",
      content: "How to apply for leaves, check balances, and manage your time-off requests."
    },
    {
      title: "Payroll & Benefits",
      content: "Understanding your payslip, tax deductions, and benefit entitlements."
    }
  ]
};

const EmployeeHandbook = () => {
  const [handbookData, setHandbookData] = useState(initialHandbookData);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true); // Mock admin role
  const [selectedTab, setSelectedTab] = useState('company');

  // Search functionality
  const filteredPolicies = handbookData.policies.filter(policy =>
    policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // CRUD Operations
  const addPolicy = () => {
    const newPolicy = {
      id: Date.now(),
      title: "New Policy",
      content: "Policy content goes here...",
      published: false,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setHandbookData(prev => ({
      ...prev,
      policies: [...prev.policies, newPolicy]
    }));
    setEditingPolicy(newPolicy.id);
  };

  const updatePolicy = (id, updates) => {
    setHandbookData(prev => ({
      ...prev,
      policies: prev.policies.map(policy =>
        policy.id === id
          ? { ...policy, ...updates, lastUpdated: new Date().toISOString().split('T')[0] }
          : policy
      )
    }));
  };

  const deletePolicy = (id) => {
    setHandbookData(prev => ({
      ...prev,
      policies: prev.policies.filter(policy => policy.id !== id)
    }));
  };

  const togglePolicyStatus = (id) => {
    updatePolicy(id, { published: !handbookData.policies.find(p => p.id === id).published });
  };

  const PolicyEditor = ({ policy, onSave, onCancel }) => {
    const [title, setTitle] = useState(policy.title);
    const [content, setContent] = useState(policy.content);

    return (
      <div className="space-y-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Policy title"
        />
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Policy content"
          rows={6}
        />
        <div className="flex gap-2">
          <Button onClick={() => onSave({ title, content })}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Employee Handbook</h1>
          <p className="text-muted-foreground mt-1">Your comprehensive guide to working at Shohoz</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Admin Mode</span>
            <Switch checked={isAdmin} onCheckedChange={setIsAdmin} />
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search handbook..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="company" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Company
          </TabsTrigger>
          <TabsTrigger value="policies" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Policies
          </TabsTrigger>
          <TabsTrigger value="work-hours" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Work Hours
          </TabsTrigger>
          <TabsTrigger value="benefits" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Benefits
          </TabsTrigger>
          <TabsTrigger value="hrms-guide" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            HRMS Guide
          </TabsTrigger>
        </TabsList>

        {/* About the Company */}
        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                About Shohoz
              </CardTitle>
              <CardDescription>Learn about our company, mission, and values</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Welcome Message */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Welcome Message</h3>
                  {isAdmin && (
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {handbookData.company.welcome}
                </p>
              </div>

              <Separator />

              {/* Mission & Vision */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Mission</h3>
                  <p className="text-muted-foreground">{handbookData.company.mission}</p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Vision</h3>
                  <p className="text-muted-foreground">{handbookData.company.vision}</p>
                </div>
              </div>

              <Separator />

              {/* Core Values */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Core Values</h3>
                <div className="flex flex-wrap gap-2">
                  {handbookData.company.values.map((value, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {value}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Company History */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Company Timeline</h3>
                <div className="space-y-4">
                  {handbookData.company.history.map((milestone, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <Badge variant="outline" className="min-w-fit">
                        {milestone.year}
                      </Badge>
                      <p className="text-muted-foreground">{milestone.event}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Employment Policies */}
        <TabsContent value="policies" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Employment Policies
                  </CardTitle>
                  <CardDescription>Company policies and guidelines</CardDescription>
                </div>
                {isAdmin && (
                  <Button onClick={addPolicy}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Policy
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {filteredPolicies.map((policy) => (
                  <AccordionItem key={policy.id} value={`policy-${policy.id}`}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center justify-between w-full pr-4">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{policy.title}</span>
                          <div className="flex items-center gap-2">
                            {policy.published ? (
                              <Badge variant="default" className="text-xs">
                                <Eye className="h-3 w-3 mr-1" />
                                Published
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="text-xs">
                                <EyeOff className="h-3 w-3 mr-1" />
                                Draft
                              </Badge>
                            )}
                            <span className="text-xs text-muted-foreground">
                              Updated: {policy.lastUpdated}
                            </span>
                          </div>
                        </div>
                        {isAdmin && (
                          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingPolicy(policy.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => togglePolicyStatus(policy.id)}
                            >
                              {policy.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deletePolicy(policy.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      {editingPolicy === policy.id ? (
                        <PolicyEditor
                          policy={policy}
                          onSave={(updates) => {
                            updatePolicy(policy.id, updates);
                            setEditingPolicy(null);
                          }}
                          onCancel={() => setEditingPolicy(null)}
                        />
                      ) : (
                        <p className="text-muted-foreground leading-relaxed">
                          {policy.content}
                        </p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Work Hours & Attendance */}
        <TabsContent value="work-hours" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Work Hours & Attendance
              </CardTitle>
              <CardDescription>Guidelines for working hours, attendance, and time management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Office Hours</h3>
                    <p className="text-muted-foreground">{handbookData.workHours.officeHours}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Shift Details</h3>
                    <p className="text-muted-foreground">{handbookData.workHours.shifts}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Remote Work Policy</h3>
                    <p className="text-muted-foreground">{handbookData.workHours.remoteWork}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Overtime Rules</h3>
                    <p className="text-muted-foreground">{handbookData.workHours.overtime}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Breaks & Meal Periods</h3>
                    <p className="text-muted-foreground">{handbookData.workHours.breaks}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compensation & Benefits */}
        <TabsContent value="benefits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Compensation & Benefits
              </CardTitle>
              <CardDescription>Information about salary, benefits, and financial policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Salary Structure</h3>
                    <p className="text-muted-foreground">{handbookData.benefits.salary}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Performance Bonuses</h3>
                    <p className="text-muted-foreground">{handbookData.benefits.bonuses}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Provident Fund</h3>
                    <p className="text-muted-foreground">{handbookData.benefits.providentFund}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Health Insurance</h3>
                    <p className="text-muted-foreground">{handbookData.benefits.insurance}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Travel Allowance</h3>
                    <p className="text-muted-foreground">{handbookData.benefits.travelAllowance}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* HRMS Guide */}
        <TabsContent value="hrms-guide" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                How to Use Shohoz HRMS
              </CardTitle>
              <CardDescription>Your guide to navigating and using the HRMS platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {handbookData.hrmsGuide.map((guide, index) => (
                  <Card key={index} className="p-4">
                    <h3 className="font-semibold mb-2">{guide.title}</h3>
                    <p className="text-muted-foreground text-sm">{guide.content}</p>
                    <Button variant="outline" size="sm" className="mt-3">
                      View Guide
                    </Button>
                  </Card>
                ))}
              </div>
              
              <Separator className="my-6" />
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                  <Users className="h-6 w-6" />
                  <span className="text-xs">Employee Management</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                  <Calendar className="h-6 w-6" />
                  <span className="text-xs">Leave Management</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                  <Clock className="h-6 w-6" />
                  <span className="text-xs">Attendance</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                  <DollarSign className="h-6 w-6" />
                  <span className="text-xs">Payroll</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeeHandbook;