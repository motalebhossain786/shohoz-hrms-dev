import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { 
  FileText, Plus, Search, Edit, Copy, Download, Trash2, 
  Eye, Save, X, Settings, Filter, ChevronDown, ChevronRight 
} from 'lucide-react';

// Mock data for letter templates
const initialTemplates = [
  {
    id: 1,
    name: "Offer Letter",
    category: "offer_appointment",
    description: "Standard job offer letter template",
    content: `Dear {{employee_name}},

We are pleased to offer you the position of {{designation}} at {{company_name}}, reporting to {{reporting_manager}}.

Your starting salary will be {{salary}} per month, and your employment will commence on {{joining_date}}.

We look forward to welcoming you to our team.

Best regards,
{{hr_manager_name}}
HR Department`,
    lastModified: "2024-01-15",
    isActive: true,
    mergeFields: ["employee_name", "designation", "company_name", "reporting_manager", "salary", "joining_date", "hr_manager_name"]
  },
  {
    id: 2,
    name: "Appointment Letter",
    category: "offer_appointment",
    description: "Official appointment confirmation letter",
    content: `Dear {{employee_name}},

This letter serves to confirm your appointment to the position of {{designation}} in the {{department}} department of {{company_name}}.

Your appointment is effective from {{joining_date}} with a monthly salary of {{salary}}.

Terms and Conditions:
1. Probation period: {{probation_period}} months
2. Working hours: {{working_hours}}
3. Reporting to: {{reporting_manager}}

Please confirm your acceptance by signing and returning this letter.

Sincerely,
{{hr_manager_name}}
Human Resources`,
    lastModified: "2024-01-12",
    isActive: true,
    mergeFields: ["employee_name", "designation", "department", "company_name", "joining_date", "salary", "probation_period", "working_hours", "reporting_manager", "hr_manager_name"]
  },
  {
    id: 3,
    name: "Confirmation Letter",
    category: "employment_lifecycle",
    description: "Employee probation completion confirmation",
    content: `Dear {{employee_name}},

We are pleased to inform you that your probation period has been successfully completed as of {{confirmation_date}}.

You are now confirmed as a permanent employee in the position of {{designation}} with {{company_name}}.

Your performance during the probation period has been satisfactory, and we look forward to your continued contribution.

Congratulations!

Best regards,
{{hr_manager_name}}
HR Department`,
    lastModified: "2024-01-10",
    isActive: true,
    mergeFields: ["employee_name", "confirmation_date", "designation", "company_name", "hr_manager_name"]
  },
  {
    id: 4,
    name: "Experience Letter",
    category: "exit_offboarding",
    description: "Employee work experience certificate",
    content: `TO WHOM IT MAY CONCERN

This is to certify that {{employee_name}} was employed with {{company_name}} from {{joining_date}} to {{last_working_date}}.

During this period, {{employee_name}} worked as {{designation}} in the {{department}} department and reported to {{reporting_manager}}.

{{employee_name}} has shown dedication, professionalism, and contributed positively to our organization.

We wish {{employee_name}} success in future endeavors.

Issued on: {{issue_date}}

{{hr_manager_name}}
HR Manager
{{company_name}}`,
    lastModified: "2024-01-08",
    isActive: true,
    mergeFields: ["employee_name", "company_name", "joining_date", "last_working_date", "designation", "department", "reporting_manager", "issue_date", "hr_manager_name"]
  }
];

const templateCategories = {
  offer_appointment: {
    name: "Offer & Appointment",
    icon: FileText,
    description: "Job offers and appointment letters"
  },
  employment_lifecycle: {
    name: "Employment Lifecycle", 
    icon: FileText,
    description: "Confirmation, promotion, transfer letters"
  },
  banking_joining: {
    name: "Banking & Joining Docs",
    icon: FileText,
    description: "Bank letters and joining documentation"
  },
  legal_contracts: {
    name: "Legal & Contracts",
    icon: FileText,
    description: "NDAs and official agreements"
  },
  disciplinary: {
    name: "Disciplinary Actions",
    icon: FileText,
    description: "Warning and show cause letters"
  },
  exit_offboarding: {
    name: "Exit & Offboarding",
    icon: FileText,
    description: "Experience and termination letters"
  },
  recognition: {
    name: "Recognition",
    icon: FileText,
    description: "Appreciation and recognition letters"
  }
};

const commonMergeFields = [
  "employee_name", "employee_id", "designation", "department", "company_name",
  "joining_date", "salary", "reporting_manager", "hr_manager_name", "issue_date",
  "last_working_date", "probation_period", "working_hours", "confirmation_date"
];

const HRLettersTemplate = () => {
  const [templates, setTemplates] = useState(initialTemplates);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true);

  // Filter templates based on category and search
  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // CRUD Operations  
  const createTemplate = () => {
    const newTemplate = {
      id: Date.now(),
      name: "New Template",
      category: selectedCategory === "all" ? "offer_appointment" : selectedCategory,
      description: "Template description",
      content: "Template content goes here...\n\nUse merge fields like {{employee_name}} for dynamic content.",
      lastModified: new Date().toISOString().split('T')[0],
      isActive: false,
      mergeFields: ["employee_name"]
    };
    setTemplates(prev => [...prev, newTemplate]);
    setEditingTemplate(newTemplate);
    setIsEditorOpen(true);
  };

  const updateTemplate = (id, updates) => {
    setTemplates(prev => prev.map(template =>
      template.id === id
        ? { ...template, ...updates, lastModified: new Date().toISOString().split('T')[0] }
        : template
    ));
  };

  const deleteTemplate = (id) => {
    setTemplates(prev => prev.filter(template => template.id !== id));
  };

  const duplicateTemplate = (template) => {
    const duplicated = {
      ...template,
      id: Date.now(),
      name: `${template.name} (Copy)`,
      lastModified: new Date().toISOString().split('T')[0]
    };
    setTemplates(prev => [...prev, duplicated]);
  };

  const toggleTemplateStatus = (id) => {
    updateTemplate(id, { isActive: !templates.find(t => t.id === id).isActive });
  };

  // Template Editor Component
  const TemplateEditor = ({ template, onSave, onCancel }) => {
    const [name, setName] = useState(template.name);
    const [description, setDescription] = useState(template.description);
    const [category, setCategory] = useState(template.category);
    const [content, setContent] = useState(template.content);

    const insertMergeField = (field) => {
      setContent(prev => prev + `{{${field}}}`);
    };

    const handleSave = () => {
      const updates = { name, description, category, content };
      onSave(updates);
    };

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Template Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter template name"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(templateCategories).map(([key, cat]) => (
                  <SelectItem key={key} value={key}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Description</label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of this template"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Template Content</label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your template content here..."
            rows={12}
            className="font-mono text-sm"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-3 block">Insert Merge Fields</label>
          <div className="flex flex-wrap gap-2">
            {commonMergeFields.map(field => (
              <Button
                key={field}
                variant="outline"
                size="sm"
                onClick={() => insertMergeField(field)}
                className="text-xs"
              >
                {field}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Template
          </Button>
        </div>
      </div>
    );
  };

  // Template Preview Component
  const TemplatePreview = ({ template }) => {
    const [previewData, setPreviewData] = useState({
      employee_name: "John Doe",
      employee_id: "EMP001",
      designation: "Software Engineer",
      department: "Engineering",
      company_name: "Shohoz",
      joining_date: "2024-02-01",
      salary: "80,000",
      reporting_manager: "Jane Smith",
      hr_manager_name: "Sarah Wilson",
      issue_date: new Date().toLocaleDateString()
    });

    const renderPreview = () => {
      let content = template.content;
      Object.entries(previewData).forEach(([key, value]) => {
        content = content.replace(new RegExp(`{{${key}}}`, 'g'), value);
      });
      return content;
    };

    return (
      <div className="space-y-4">
        <div className="bg-muted/50 p-4 rounded-lg">
          <h3 className="font-medium mb-3">Preview Data</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {Object.entries(previewData).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-muted-foreground">{key}:</span>
                <Input
                  value={value}
                  onChange={(e) => setPreviewData(prev => ({ ...prev, [key]: e.target.value }))}
                  className="h-6 text-xs ml-2"
                />
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="bg-white p-6 border rounded-lg min-h-[400px]">
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
            {renderPreview()}
          </pre>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
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
          <h1 className="text-3xl font-bold text-foreground">HR Letter Templates</h1>
          <p className="text-muted-foreground mt-1">Manage and customize HR document templates</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Admin Mode</span>
            <Switch checked={isAdmin} onCheckedChange={setIsAdmin} />
          </div>
          {isAdmin && (
            <Button onClick={createTemplate}>
              <Plus className="h-4 w-4 mr-2" />
              New Template
            </Button>
          )}
        </div>
      </div>

      {/* Search and Filter */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-64">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {Object.entries(templateCategories).map(([key, category]) => (
                  <SelectItem key={key} value={key}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          const category = templateCategories[template.category];
          return (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <category.icon className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {category.name}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {template.isActive ? (
                      <Badge variant="default" className="text-xs">Active</Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">Draft</Badge>
                    )}
                  </div>
                </div>
                <CardDescription className="text-sm">
                  {template.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="text-xs text-muted-foreground">
                  Last modified: {template.lastModified}
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedTemplate(template);
                      setIsPreviewOpen(true);
                    }}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>

                  {isAdmin && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingTemplate(template);
                          setIsEditorOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => duplicateTemplate(template)}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                    </>
                  )}
                </div>

                {isAdmin && (
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Active:</span>
                      <Switch
                        checked={template.isActive}
                        onCheckedChange={() => toggleTemplateStatus(template.id)}
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTemplate(template.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No templates found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || selectedCategory !== "all" 
                ? "Try adjusting your search or filter criteria"
                : "Get started by creating your first template"
              }
            </p>
            {isAdmin && (
              <Button onClick={createTemplate}>
                <Plus className="h-4 w-4 mr-2" />
                Create Template
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Template Editor Dialog */}
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingTemplate?.id ? 'Edit Template' : 'Create New Template'}
            </DialogTitle>
            <DialogDescription>
              Create or modify letter templates with merge fields for dynamic content.
            </DialogDescription>
          </DialogHeader>
          {editingTemplate && (
            <TemplateEditor
              template={editingTemplate}
              onSave={(updates) => {
                updateTemplate(editingTemplate.id, updates);
                setIsEditorOpen(false);
                setEditingTemplate(null);
              }}
              onCancel={() => {
                setIsEditorOpen(false);
                setEditingTemplate(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Template Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Template Preview: {selectedTemplate?.name}</DialogTitle>
            <DialogDescription>
              Preview how the template will look with sample data
            </DialogDescription>
          </DialogHeader>
          {selectedTemplate && <TemplatePreview template={selectedTemplate} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HRLettersTemplate;