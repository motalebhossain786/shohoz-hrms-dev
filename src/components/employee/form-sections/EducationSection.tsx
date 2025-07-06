import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus, Trash2, Upload } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface EducationProps {
  data?: any;
  onUpdate: (data: any) => void;
}

export const EducationSection: React.FC<EducationProps> = ({ data, onUpdate }) => {
  const [educationData, setEducationData] = useState({
    educationHistory: [
      {
        degree: '',
        institution: '',
        fieldOfStudy: '',
        startDate: null as Date | null,
        endDate: null as Date | null,
        grade: '',
        isCompleted: true,
        certificateFile: null
      }
    ],
    trainings: [
      {
        title: '',
        provider: '',
        startDate: null as Date | null,
        endDate: null as Date | null,
        certificateNumber: '',
        certificateFile: null
      }
    ],
    certifications: [
      {
        name: '',
        issuingOrganization: '',
        issueDate: null as Date | null,
        expiryDate: null as Date | null,
        certificateId: '',
        certificateFile: null
      }
    ],
    ...data
  });

  const updateEducation = (index: number, field: string, value: any) => {
    const updated = {
      ...educationData,
      educationHistory: educationData.educationHistory.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    };
    setEducationData(updated);
    onUpdate(updated);
  };

  const addEducation = () => {
    const updated = {
      ...educationData,
      educationHistory: [
        ...educationData.educationHistory,
        {
          degree: '',
          institution: '',
          fieldOfStudy: '',
          startDate: null,
          endDate: null,
          grade: '',
          isCompleted: true,
          certificateFile: null
        }
      ]
    };
    setEducationData(updated);
    onUpdate(updated);
  };

  const removeEducation = (index: number) => {
    if (educationData.educationHistory.length > 1) {
      const updated = {
        ...educationData,
        educationHistory: educationData.educationHistory.filter((_, i) => i !== index)
      };
      setEducationData(updated);
      onUpdate(updated);
    }
  };

  const updateTraining = (index: number, field: string, value: any) => {
    const updated = {
      ...educationData,
      trainings: educationData.trainings.map((training, i) => 
        i === index ? { ...training, [field]: value } : training
      )
    };
    setEducationData(updated);
    onUpdate(updated);
  };

  const addTraining = () => {
    const updated = {
      ...educationData,
      trainings: [
        ...educationData.trainings,
        {
          title: '',
          provider: '',
          startDate: null,
          endDate: null,
          certificateNumber: '',
          certificateFile: null
        }
      ]
    };
    setEducationData(updated);
    onUpdate(updated);
  };

  const removeTraining = (index: number) => {
    if (educationData.trainings.length > 1) {
      const updated = {
        ...educationData,
        trainings: educationData.trainings.filter((_, i) => i !== index)
      };
      setEducationData(updated);
      onUpdate(updated);
    }
  };

  const updateCertification = (index: number, field: string, value: any) => {
    const updated = {
      ...educationData,
      certifications: educationData.certifications.map((cert, i) => 
        i === index ? { ...cert, [field]: value } : cert
      )
    };
    setEducationData(updated);
    onUpdate(updated);
  };

  const addCertification = () => {
    const updated = {
      ...educationData,
      certifications: [
        ...educationData.certifications,
        {
          name: '',
          issuingOrganization: '',
          issueDate: null,
          expiryDate: null,
          certificateId: '',
          certificateFile: null
        }
      ]
    };
    setEducationData(updated);
    onUpdate(updated);
  };

  const removeCertification = (index: number) => {
    if (educationData.certifications.length > 1) {
      const updated = {
        ...educationData,
        certifications: educationData.certifications.filter((_, i) => i !== index)
      };
      setEducationData(updated);
      onUpdate(updated);
    }
  };

  const degreeOptions = [
    'High School Diploma',
    'Associate Degree',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'Doctoral Degree',
    'Professional Certificate',
    'Diploma',
    'Other'
  ];

  return (
    <div className="space-y-8">
      {/* Education History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Education History</CardTitle>
          <Button onClick={addEducation} size="sm" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Education
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {educationData.educationHistory.map((education, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Education {index + 1}</h4>
                {educationData.educationHistory.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeEducation(index)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Degree/Level *</Label>
                  <Select 
                    value={education.degree} 
                    onValueChange={(value) => updateEducation(index, 'degree', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select degree" />
                    </SelectTrigger>
                    <SelectContent>
                      {degreeOptions.map((degree) => (
                        <SelectItem key={degree} value={degree}>
                          {degree}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Institution *</Label>
                  <Input
                    value={education.institution}
                    onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                    placeholder="Enter institution name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Field of Study</Label>
                  <Input
                    value={education.fieldOfStudy}
                    onChange={(e) => updateEducation(index, 'fieldOfStudy', e.target.value)}
                    placeholder="Enter field of study"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Grade/GPA</Label>
                  <Input
                    value={education.grade}
                    onChange={(e) => updateEducation(index, 'grade', e.target.value)}
                    placeholder="Enter grade or GPA"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !education.startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {education.startDate ? format(education.startDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={education.startDate || undefined}
                        onSelect={(date) => updateEducation(index, 'startDate', date)}
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !education.endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {education.endDate ? format(education.endDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={education.endDate || undefined}
                        onSelect={(date) => updateEducation(index, 'endDate', date)}
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Certificate/Diploma Upload</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                  <div className="mt-2">
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG up to 5MB</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Training & Professional Development */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Training & Professional Development</CardTitle>
          <Button onClick={addTraining} size="sm" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Training
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {educationData.trainings.map((training, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Training {index + 1}</h4>
                {educationData.trainings.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeTraining(index)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Training Title *</Label>
                  <Input
                    value={training.title}
                    onChange={(e) => updateTraining(index, 'title', e.target.value)}
                    placeholder="Enter training title"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Training Provider *</Label>
                  <Input
                    value={training.provider}
                    onChange={(e) => updateTraining(index, 'provider', e.target.value)}
                    placeholder="Enter training provider"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !training.startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {training.startDate ? format(training.startDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={training.startDate || undefined}
                        onSelect={(date) => updateTraining(index, 'startDate', date)}
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !training.endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {training.endDate ? format(training.endDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={training.endDate || undefined}
                        onSelect={(date) => updateTraining(index, 'endDate', date)}
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label>Certificate Number</Label>
                  <Input
                    value={training.certificateNumber}
                    onChange={(e) => updateTraining(index, 'certificateNumber', e.target.value)}
                    placeholder="Enter certificate number"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Certificate Upload</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                  <div className="mt-2">
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG up to 5MB</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Professional Certifications */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Professional Certifications</CardTitle>
          <Button onClick={addCertification} size="sm" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Certification
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {educationData.certifications.map((cert, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Certification {index + 1}</h4>
                {educationData.certifications.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeCertification(index)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Certification Name *</Label>
                  <Input
                    value={cert.name}
                    onChange={(e) => updateCertification(index, 'name', e.target.value)}
                    placeholder="Enter certification name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Issuing Organization *</Label>
                  <Input
                    value={cert.issuingOrganization}
                    onChange={(e) => updateCertification(index, 'issuingOrganization', e.target.value)}
                    placeholder="Enter issuing organization"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Issue Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !cert.issueDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {cert.issueDate ? format(cert.issueDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={cert.issueDate || undefined}
                        onSelect={(date) => updateCertification(index, 'issueDate', date)}
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label>Expiry Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !cert.expiryDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {cert.expiryDate ? format(cert.expiryDate, "PPP") : "No expiry"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={cert.expiryDate || undefined}
                        onSelect={(date) => updateCertification(index, 'expiryDate', date)}
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label>Certificate ID</Label>
                  <Input
                    value={cert.certificateId}
                    onChange={(e) => updateCertification(index, 'certificateId', e.target.value)}
                    placeholder="Enter certificate ID"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Certificate Upload</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                  <div className="mt-2">
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG up to 5MB</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};