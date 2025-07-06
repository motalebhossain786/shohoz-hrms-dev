import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus, Trash2, Upload } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface PersonalInfoProps {
  data?: any;
  onUpdate: (data: any) => void;
}

export const PersonalInfoSection: React.FC<PersonalInfoProps> = ({ data, onUpdate }) => {
  const [personalInfo, setPersonalInfo] = useState({
    employeeId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: null as Date | null,
    gender: '',
    maritalStatus: '',
    bloodGroup: '',
    nationality: '',
    religion: '',
    profilePhoto: null,
    emergencyContacts: [
      { name: '', relationship: '', phone: '', address: '' }
    ],
    familyMembers: [
      { name: '', relationship: '', dateOfBirth: null as Date | null, occupation: '' }
    ],
    ...data
  });

  const updateField = (field: string, value: any) => {
    const updated = { ...personalInfo, [field]: value };
    setPersonalInfo(updated);
    onUpdate(updated);
  };

  const addEmergencyContact = () => {
    const updated = {
      ...personalInfo,
      emergencyContacts: [...personalInfo.emergencyContacts, { name: '', relationship: '', phone: '', address: '' }]
    };
    setPersonalInfo(updated);
    onUpdate(updated);
  };

  const removeEmergencyContact = (index: number) => {
    const updated = {
      ...personalInfo,
      emergencyContacts: personalInfo.emergencyContacts.filter((_, i) => i !== index)
    };
    setPersonalInfo(updated);
    onUpdate(updated);
  };

  const updateEmergencyContact = (index: number, field: string, value: string) => {
    const updated = {
      ...personalInfo,
      emergencyContacts: personalInfo.emergencyContacts.map((contact, i) => 
        i === index ? { ...contact, [field]: value } : contact
      )
    };
    setPersonalInfo(updated);
    onUpdate(updated);
  };

  const addFamilyMember = () => {
    const updated = {
      ...personalInfo,
      familyMembers: [...personalInfo.familyMembers, { name: '', relationship: '', dateOfBirth: null, occupation: '' }]
    };
    setPersonalInfo(updated);
    onUpdate(updated);
  };

  const removeFamilyMember = (index: number) => {
    const updated = {
      ...personalInfo,
      familyMembers: personalInfo.familyMembers.filter((_, i) => i !== index)
    };
    setPersonalInfo(updated);
    onUpdate(updated);
  };

  const updateFamilyMember = (index: number, field: string, value: any) => {
    const updated = {
      ...personalInfo,
      familyMembers: personalInfo.familyMembers.map((member, i) => 
        i === index ? { ...member, [field]: value } : member
      )
    };
    setPersonalInfo(updated);
    onUpdate(updated);
  };

  return (
    <div className="space-y-8">
      {/* Basic Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee ID *</Label>
              <Input
                id="employeeId"
                value={personalInfo.employeeId}
                onChange={(e) => updateField('employeeId', e.target.value)}
                placeholder="Enter employee ID"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={personalInfo.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
                placeholder="Enter first name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={personalInfo.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
                placeholder="Enter last name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={personalInfo.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="Enter email address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={personalInfo.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="Enter phone number"
              />
            </div>
            <div className="space-y-2">
              <Label>Date of Birth *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !personalInfo.dateOfBirth && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {personalInfo.dateOfBirth ? format(personalInfo.dateOfBirth, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={personalInfo.dateOfBirth || undefined}
                    onSelect={(date) => updateField('dateOfBirth', date)}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>Gender *</Label>
              <Select value={personalInfo.gender} onValueChange={(value) => updateField('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Marital Status</Label>
              <Select value={personalInfo.maritalStatus} onValueChange={(value) => updateField('maritalStatus', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select marital status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="divorced">Divorced</SelectItem>
                  <SelectItem value="widowed">Widowed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Blood Group</Label>
              <Select value={personalInfo.bloodGroup} onValueChange={(value) => updateField('bloodGroup', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Nationality</Label>
              <Input
                value={personalInfo.nationality}
                onChange={(e) => updateField('nationality', e.target.value)}
                placeholder="Enter nationality"
              />
            </div>
            <div className="space-y-2">
              <Label>Religion</Label>
              <Input
                value={personalInfo.religion}
                onChange={(e) => updateField('religion', e.target.value)}
                placeholder="Enter religion"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Profile Photo</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <div className="mt-4">
                <Button variant="outline" className="mb-2">
                  Choose File
                </Button>
                <p className="text-sm text-muted-foreground">PNG, JPG up to 5MB</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Emergency Contacts</CardTitle>
          <Button onClick={addEmergencyContact} size="sm" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Contact
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {personalInfo.emergencyContacts.map((contact, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Contact {index + 1}</h4>
                {personalInfo.emergencyContacts.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeEmergencyContact(index)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name *</Label>
                  <Input
                    value={contact.name}
                    onChange={(e) => updateEmergencyContact(index, 'name', e.target.value)}
                    placeholder="Enter contact name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Relationship *</Label>
                  <Input
                    value={contact.relationship}
                    onChange={(e) => updateEmergencyContact(index, 'relationship', e.target.value)}
                    placeholder="Enter relationship"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number *</Label>
                  <Input
                    value={contact.phone}
                    onChange={(e) => updateEmergencyContact(index, 'phone', e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input
                    value={contact.address}
                    onChange={(e) => updateEmergencyContact(index, 'address', e.target.value)}
                    placeholder="Enter address"
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Family Members */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Family Members</CardTitle>
          <Button onClick={addFamilyMember} size="sm" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Member
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {personalInfo.familyMembers.map((member, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Family Member {index + 1}</h4>
                {personalInfo.familyMembers.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFamilyMember(index)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={member.name}
                    onChange={(e) => updateFamilyMember(index, 'name', e.target.value)}
                    placeholder="Enter name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Relationship</Label>
                  <Input
                    value={member.relationship}
                    onChange={(e) => updateFamilyMember(index, 'relationship', e.target.value)}
                    placeholder="Enter relationship"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Date of Birth</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !member.dateOfBirth && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {member.dateOfBirth ? format(member.dateOfBirth, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={member.dateOfBirth || undefined}
                        onSelect={(date) => updateFamilyMember(index, 'dateOfBirth', date)}
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Occupation</Label>
                  <Input
                    value={member.occupation}
                    onChange={(e) => updateFamilyMember(index, 'occupation', e.target.value)}
                    placeholder="Enter occupation"
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