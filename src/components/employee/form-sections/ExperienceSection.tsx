import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus, Trash2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface ExperienceProps {
  data?: any;
  onUpdate: (data: any) => void;
}

export const ExperienceSection: React.FC<ExperienceProps> = ({ data, onUpdate }) => {
  const [experienceData, setExperienceData] = useState({
    workExperience: [
      {
        jobTitle: '',
        company: '',
        department: '',
        employmentType: '',
        startDate: null as Date | null,
        endDate: null as Date | null,
        isCurrentJob: false,
        salary: '',
        responsibilities: '',
        achievements: '',
        reasonForLeaving: '',
        supervisorName: '',
        supervisorContact: ''
      }
    ],
    references: [
      {
        name: '',
        jobTitle: '',
        company: '',
        relationship: '',
        email: '',
        phone: '',
        address: ''
      }
    ],
    ...data
  });

  const updateWorkExperience = (index: number, field: string, value: any) => {
    const updated = {
      ...experienceData,
      workExperience: experienceData.workExperience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    };
    setExperienceData(updated);
    onUpdate(updated);
  };

  const addWorkExperience = () => {
    const updated = {
      ...experienceData,
      workExperience: [
        ...experienceData.workExperience,
        {
          jobTitle: '',
          company: '',
          department: '',
          employmentType: '',
          startDate: null,
          endDate: null,
          isCurrentJob: false,
          salary: '',
          responsibilities: '',
          achievements: '',
          reasonForLeaving: '',
          supervisorName: '',
          supervisorContact: ''
        }
      ]
    };
    setExperienceData(updated);
    onUpdate(updated);
  };

  const removeWorkExperience = (index: number) => {
    if (experienceData.workExperience.length > 1) {
      const updated = {
        ...experienceData,
        workExperience: experienceData.workExperience.filter((_, i) => i !== index)
      };
      setExperienceData(updated);
      onUpdate(updated);
    }
  };

  const updateReference = (index: number, field: string, value: string) => {
    const updated = {
      ...experienceData,
      references: experienceData.references.map((ref, i) => 
        i === index ? { ...ref, [field]: value } : ref
      )
    };
    setExperienceData(updated);
    onUpdate(updated);
  };

  const addReference = () => {
    const updated = {
      ...experienceData,
      references: [
        ...experienceData.references,
        {
          name: '',
          jobTitle: '',
          company: '',
          relationship: '',
          email: '',
          phone: '',
          address: ''
        }
      ]
    };
    setExperienceData(updated);
    onUpdate(updated);
  };

  const removeReference = (index: number) => {
    if (experienceData.references.length > 1) {
      const updated = {
        ...experienceData,
        references: experienceData.references.filter((_, i) => i !== index)
      };
      setExperienceData(updated);
      onUpdate(updated);
    }
  };

  const employmentTypes = [
    'Full-time',
    'Part-time',
    'Contract',
    'Temporary',
    'Freelance',
    'Internship',
    'Consultant'
  ];

  const relationshipTypes = [
    'Direct Supervisor',
    'Manager',
    'Colleague',
    'Client',
    'Business Partner',
    'Professor/Teacher',
    'Mentor',
    'Other'
  ];

  return (
    <div className="space-y-8">
      {/* Work Experience */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Work Experience & Employment History</CardTitle>
          <Button onClick={addWorkExperience} size="sm" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Experience
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {experienceData.workExperience.map((experience, index) => (
            <div key={index} className="border rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Experience {index + 1}</h4>
                {experienceData.workExperience.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeWorkExperience(index)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Job Title *</Label>
                  <Input
                    value={experience.jobTitle}
                    onChange={(e) => updateWorkExperience(index, 'jobTitle', e.target.value)}
                    placeholder="Enter job title"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Company *</Label>
                  <Input
                    value={experience.company}
                    onChange={(e) => updateWorkExperience(index, 'company', e.target.value)}
                    placeholder="Enter company name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Input
                    value={experience.department}
                    onChange={(e) => updateWorkExperience(index, 'department', e.target.value)}
                    placeholder="Enter department"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Employment Type</Label>
                  <Select 
                    value={experience.employmentType} 
                    onValueChange={(value) => updateWorkExperience(index, 'employmentType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
                    <SelectContent>
                      {employmentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !experience.startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {experience.startDate ? format(experience.startDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={experience.startDate || undefined}
                        onSelect={(date) => updateWorkExperience(index, 'startDate', date)}
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <div className="space-y-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          disabled={experience.isCurrentJob}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !experience.endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {experience.isCurrentJob 
                            ? "Current Position" 
                            : experience.endDate 
                            ? format(experience.endDate, "PPP") 
                            : "Select date"
                          }
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={experience.endDate || undefined}
                          onSelect={(date) => updateWorkExperience(index, 'endDate', date)}
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`currentJob-${index}`}
                        checked={experience.isCurrentJob}
                        onCheckedChange={(checked) => {
                          updateWorkExperience(index, 'isCurrentJob', checked);
                          if (checked) {
                            updateWorkExperience(index, 'endDate', null);
                          }
                        }}
                      />
                      <Label htmlFor={`currentJob-${index}`} className="text-sm font-normal">
                        This is my current job
                      </Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Salary Range</Label>
                  <Input
                    value={experience.salary}
                    onChange={(e) => updateWorkExperience(index, 'salary', e.target.value)}
                    placeholder="e.g., 50,000 - 60,000 BDT"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Supervisor Name</Label>
                  <Input
                    value={experience.supervisorName}
                    onChange={(e) => updateWorkExperience(index, 'supervisorName', e.target.value)}
                    placeholder="Enter supervisor's name"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label>Supervisor Contact</Label>
                  <Input
                    value={experience.supervisorContact}
                    onChange={(e) => updateWorkExperience(index, 'supervisorContact', e.target.value)}
                    placeholder="Enter supervisor's email or phone"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Key Responsibilities</Label>
                  <Textarea
                    value={experience.responsibilities}
                    onChange={(e) => updateWorkExperience(index, 'responsibilities', e.target.value)}
                    placeholder="Describe your main responsibilities and duties..."
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Major Achievements</Label>
                  <Textarea
                    value={experience.achievements}
                    onChange={(e) => updateWorkExperience(index, 'achievements', e.target.value)}
                    placeholder="Highlight your key achievements and accomplishments..."
                    rows={3}
                  />
                </div>
                
                {!experience.isCurrentJob && (
                  <div className="space-y-2">
                    <Label>Reason for Leaving</Label>
                    <Textarea
                      value={experience.reasonForLeaving}
                      onChange={(e) => updateWorkExperience(index, 'reasonForLeaving', e.target.value)}
                      placeholder="Briefly explain your reason for leaving..."
                      rows={2}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* References */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Professional References</CardTitle>
          <Button onClick={addReference} size="sm" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Reference
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {experienceData.references.map((reference, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Reference {index + 1}</h4>
                {experienceData.references.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeReference(index)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input
                    value={reference.name}
                    onChange={(e) => updateReference(index, 'name', e.target.value)}
                    placeholder="Enter reference's name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Job Title *</Label>
                  <Input
                    value={reference.jobTitle}
                    onChange={(e) => updateReference(index, 'jobTitle', e.target.value)}
                    placeholder="Enter their job title"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Company/Organization *</Label>
                  <Input
                    value={reference.company}
                    onChange={(e) => updateReference(index, 'company', e.target.value)}
                    placeholder="Enter company name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Relationship *</Label>
                  <Select 
                    value={reference.relationship} 
                    onValueChange={(value) => updateReference(index, 'relationship', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      {relationshipTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Email Address *</Label>
                  <Input
                    type="email"
                    value={reference.email}
                    onChange={(e) => updateReference(index, 'email', e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Phone Number *</Label>
                  <Input
                    value={reference.phone}
                    onChange={(e) => updateReference(index, 'phone', e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label>Address</Label>
                  <Textarea
                    value={reference.address}
                    onChange={(e) => updateReference(index, 'address', e.target.value)}
                    placeholder="Enter address (optional)"
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};