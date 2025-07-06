import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus, Trash2, Upload } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface JobDetailsProps {
  data?: any;
  onUpdate: (data: any) => void;
}

export const JobDetailsSection: React.FC<JobDetailsProps> = ({ data, onUpdate }) => {
  const [jobData, setJobData] = useState({
    // Job Information
    jobTitle: '',
    department: '',
    reportingManager: '',
    employeeType: '',
    workLocation: '',
    joinDate: null as Date | null,
    probationPeriod: '',
    salary: '',
    
    // Employee Status
    employeeStatus: 'active',
    
    // Official Job Descriptions
    jobDescriptions: {
      joining: '',
      afterConfirmation: '',
      afterPromotion: ''
    },
    
    // Duty Pattern
    dutyPattern: 'regular',
    shiftDetails: '',
    
    // Job Life Cycle
    confirmationHistory: [
      {
        date: null as Date | null,
        status: '',
        remarks: '',
        document: null
      }
    ],
    
    incrementPromotionHistory: [
      {
        date: null as Date | null,
        type: 'increment',
        previousPosition: '',
        newPosition: '',
        salaryChange: '',
        effectiveDate: null as Date | null,
        remarks: ''
      }
    ],
    
    disciplinaryActions: {
      officialWarnings: [
        {
          date: null as Date | null,
          reason: '',
          action: '',
          severity: 'low',
          document: null
        }
      ],
      incidentalReports: [
        {
          date: null as Date | null,
          incidentType: '',
          description: '',
          actionTaken: '',
          followUpRequired: false
        }
      ]
    },
    
    // Access & Assets
    fingerAccess: false,
    doorAccess: false,
    accessAreas: [],
    
    employeeAssets: [
      {
        assetType: '',
        assetName: '',
        assetId: '',
        assignedDate: null as Date | null,
        condition: 'new',
        value: ''
      }
    ],
    
    // Benefits
    fringeBenefits: {
      healthInsurance: false,
      lifeInsurance: false,
      transportAllowance: false,
      mealAllowance: false,
      mobileAllowance: false,
      other: []
    },
    
    // Official Access Request
    systemAccess: [],
    
    ...data
  });

  const updateField = (field: string, value: any) => {
    const updated = { ...jobData, [field]: value };
    setJobData(updated);
    onUpdate(updated);
  };

  const updateNestedField = (section: string, field: string, value: any) => {
    const updated = {
      ...jobData,
      [section]: {
        ...jobData[section],
        [field]: value
      }
    };
    setJobData(updated);
    onUpdate(updated);
  };

  const addToArray = (arrayPath: string, newItem: any) => {
    const pathParts = arrayPath.split('.');
    let updated = { ...jobData };
    
    if (pathParts.length === 1) {
      updated[pathParts[0]] = [...jobData[pathParts[0]], newItem];
    } else if (pathParts.length === 2) {
      updated[pathParts[0]] = {
        ...jobData[pathParts[0]],
        [pathParts[1]]: [...jobData[pathParts[0]][pathParts[1]], newItem]
      };
    }
    
    setJobData(updated);
    onUpdate(updated);
  };

  const removeFromArray = (arrayPath: string, index: number) => {
    const pathParts = arrayPath.split('.');
    let updated = { ...jobData };
    
    if (pathParts.length === 1) {
      updated[pathParts[0]] = jobData[pathParts[0]].filter((_, i) => i !== index);
    } else if (pathParts.length === 2) {
      updated[pathParts[0]] = {
        ...jobData[pathParts[0]],
        [pathParts[1]]: jobData[pathParts[0]][pathParts[1]].filter((_, i) => i !== index)
      };
    }
    
    setJobData(updated);
    onUpdate(updated);
  };

  const departments = [
    'Human Resources', 'Engineering', 'Marketing', 'Sales', 'Finance', 
    'Operations', 'Customer Service', 'IT', 'Legal', 'Administration'
  ];

  const employeeTypes = [
    'Permanent', 'Contract', 'Temporary', 'Intern', 'Consultant', 'Part-time'
  ];

  const assetTypes = [
    'Laptop', 'Desktop', 'Mobile Phone', 'Tablet', 'Monitor', 'Keyboard', 
    'Mouse', 'Headset', 'ID Card', 'Access Card', 'Uniform', 'Other'
  ];

  const systemAccessTypes = [
    'Email', 'HRMS', 'ERP', 'CRM', 'Project Management', 'File Server', 
    'VPN', 'Database', 'Admin Panel', 'Time Tracking', 'Other'
  ];

  return (
    <div className="space-y-8">
      {/* Basic Job Information */}
      <Card>
        <CardHeader>
          <CardTitle>Job Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Job Title *</Label>
              <Input
                value={jobData.jobTitle}
                onChange={(e) => updateField('jobTitle', e.target.value)}
                placeholder="Enter job title"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Department *</Label>
              <Select value={jobData.department} onValueChange={(value) => updateField('department', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Reporting Manager *</Label>
              <Input
                value={jobData.reportingManager}
                onChange={(e) => updateField('reportingManager', e.target.value)}
                placeholder="Enter reporting manager name"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Employee Type *</Label>
              <Select value={jobData.employeeType} onValueChange={(value) => updateField('employeeType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select employee type" />
                </SelectTrigger>
                <SelectContent>
                  {employeeTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Work Location</Label>
              <Input
                value={jobData.workLocation}
                onChange={(e) => updateField('workLocation', e.target.value)}
                placeholder="Enter work location"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Joining Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !jobData.joinDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {jobData.joinDate ? format(jobData.joinDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={jobData.joinDate || undefined}
                    onSelect={(date) => updateField('joinDate', date)}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label>Probation Period</Label>
              <Input
                value={jobData.probationPeriod}
                onChange={(e) => updateField('probationPeriod', e.target.value)}
                placeholder="e.g., 3 months"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Salary</Label>
              <Input
                value={jobData.salary}
                onChange={(e) => updateField('salary', e.target.value)}
                placeholder="Enter salary amount"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employee Status */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>Current Status *</Label>
            <Select value={jobData.employeeStatus} onValueChange={(value) => updateField('employeeStatus', value)}>
              <SelectTrigger className="w-full md:w-1/3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Official Job Descriptions */}
      <Card>
        <CardHeader>
          <CardTitle>Official Job Descriptions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Joining JD</Label>
            <Textarea
              value={jobData.jobDescriptions.joining}
              onChange={(e) => updateNestedField('jobDescriptions', 'joining', e.target.value)}
              placeholder="Enter job description at the time of joining"
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <Label>JD after Confirmation</Label>
            <Textarea
              value={jobData.jobDescriptions.afterConfirmation}
              onChange={(e) => updateNestedField('jobDescriptions', 'afterConfirmation', e.target.value)}
              placeholder="Enter job description after confirmation"
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <Label>JD after Promotion</Label>
            <Textarea
              value={jobData.jobDescriptions.afterPromotion}
              onChange={(e) => updateNestedField('jobDescriptions', 'afterPromotion', e.target.value)}
              placeholder="Enter job description after promotion"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Duty Pattern */}
      <Card>
        <CardHeader>
          <CardTitle>Duty Pattern</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Work Pattern *</Label>
            <Select value={jobData.dutyPattern} onValueChange={(value) => updateField('dutyPattern', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select duty pattern" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="regular">Regular (9 AM - 5 PM)</SelectItem>
                <SelectItem value="shifting">Shifting</SelectItem>
                <SelectItem value="flexible">Flexible Hours</SelectItem>
                <SelectItem value="remote">Remote Work</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {jobData.dutyPattern === 'shifting' && (
            <div className="space-y-2">
              <Label>Shift Details</Label>
              <Textarea
                value={jobData.shiftDetails}
                onChange={(e) => updateField('shiftDetails', e.target.value)}
                placeholder="Enter shift timings and rotation details"
                rows={3}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Employee Assets */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Employee Assets</CardTitle>
          <Button 
            onClick={() => addToArray('employeeAssets', {
              assetType: '', assetName: '', assetId: '', assignedDate: null, condition: 'new', value: ''
            })}
            size="sm" 
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Asset
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {jobData.employeeAssets.map((asset, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Asset {index + 1}</h4>
                {jobData.employeeAssets.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFromArray('employeeAssets', index)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Asset Type</Label>
                  <Select 
                    value={asset.assetType} 
                    onValueChange={(value) => {
                      const updated = [...jobData.employeeAssets];
                      updated[index] = { ...updated[index], assetType: value };
                      updateField('employeeAssets', updated);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select asset type" />
                    </SelectTrigger>
                    <SelectContent>
                      {assetTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Asset Name</Label>
                  <Input
                    value={asset.assetName}
                    onChange={(e) => {
                      const updated = [...jobData.employeeAssets];
                      updated[index] = { ...updated[index], assetName: e.target.value };
                      updateField('employeeAssets', updated);
                    }}
                    placeholder="Enter asset name/model"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Asset ID</Label>
                  <Input
                    value={asset.assetId}
                    onChange={(e) => {
                      const updated = [...jobData.employeeAssets];
                      updated[index] = { ...updated[index], assetId: e.target.value };
                      updateField('employeeAssets', updated);
                    }}
                    placeholder="Enter asset ID"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Assigned Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !asset.assignedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {asset.assignedDate ? format(asset.assignedDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={asset.assignedDate || undefined}
                        onSelect={(date) => {
                          const updated = [...jobData.employeeAssets];
                          updated[index] = { ...updated[index], assignedDate: date };
                          updateField('employeeAssets', updated);
                        }}
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label>Condition</Label>
                  <Select 
                    value={asset.condition}
                    onValueChange={(value) => {
                      const updated = [...jobData.employeeAssets];
                      updated[index] = { ...updated[index], condition: value };
                      updateField('employeeAssets', updated);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Value</Label>
                  <Input
                    value={asset.value}
                    onChange={(e) => {
                      const updated = [...jobData.employeeAssets];
                      updated[index] = { ...updated[index], value: e.target.value };
                      updateField('employeeAssets', updated);
                    }}
                    placeholder="Enter asset value"
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Access & Security */}
      <Card>
        <CardHeader>
          <CardTitle>Finger & Door Access</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="fingerAccess"
                checked={jobData.fingerAccess}
                onCheckedChange={(checked) => updateField('fingerAccess', checked)}
              />
              <Label htmlFor="fingerAccess">Fingerprint Access</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="doorAccess"
                checked={jobData.doorAccess}
                onCheckedChange={(checked) => updateField('doorAccess', checked)}
              />
              <Label htmlFor="doorAccess">Door Access Card</Label>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Access Areas</Label>
            <Input
              value={jobData.accessAreas.join(', ')}
              onChange={(e) => updateField('accessAreas', e.target.value.split(', ').filter(area => area.trim()))}
              placeholder="Enter accessible areas (comma separated)"
            />
          </div>
        </CardContent>
      </Card>

      {/* System Access */}
      <Card>
        <CardHeader>
          <CardTitle>Official Access Request</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {systemAccessTypes.map((accessType) => (
              <div key={accessType} className="flex items-center space-x-2">
                <Checkbox
                  id={`access-${accessType}`}
                  checked={jobData.systemAccess.includes(accessType)}
                  onCheckedChange={(checked) => {
                    const current = jobData.systemAccess;
                    const updated = checked 
                      ? [...current, accessType]
                      : current.filter(item => item !== accessType);
                    updateField('systemAccess', updated);
                  }}
                />
                <Label htmlFor={`access-${accessType}`} className="text-sm">
                  {accessType}
                </Label>
              </div>
            ))}
          </div>
          
          {jobData.systemAccess.length > 0 && (
            <div className="space-y-2">
              <Label>Selected Access:</Label>
              <div className="flex flex-wrap gap-2">
                {jobData.systemAccess.map((access) => (
                  <Badge key={access} variant="secondary">
                    {access}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};