import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, X } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface SkillsProps {
  data?: any;
  onUpdate: (data: any) => void;
}

export const SkillsSection: React.FC<SkillsProps> = ({ data, onUpdate }) => {
  const [skillsData, setSkillsData] = useState({
    technicalSkills: [
      { name: '', proficiency: 3, yearsOfExperience: '' }
    ],
    softSkills: [],
    languages: [
      { language: '', proficiency: 'native', reading: 5, writing: 5, speaking: 5 }
    ],
    customSkills: [],
    newSkillInput: '',
    newSoftSkillInput: '',
    ...data
  });

  const updateTechnicalSkill = (index: number, field: string, value: any) => {
    const updated = {
      ...skillsData,
      technicalSkills: skillsData.technicalSkills.map((skill, i) => 
        i === index ? { ...skill, [field]: value } : skill
      )
    };
    setSkillsData(updated);
    onUpdate(updated);
  };

  const addTechnicalSkill = () => {
    const updated = {
      ...skillsData,
      technicalSkills: [
        ...skillsData.technicalSkills,
        { name: '', proficiency: 3, yearsOfExperience: '' }
      ]
    };
    setSkillsData(updated);
    onUpdate(updated);
  };

  const removeTechnicalSkill = (index: number) => {
    if (skillsData.technicalSkills.length > 1) {
      const updated = {
        ...skillsData,
        technicalSkills: skillsData.technicalSkills.filter((_, i) => i !== index)
      };
      setSkillsData(updated);
      onUpdate(updated);
    }
  };

  const addSoftSkill = () => {
    if (skillsData.newSoftSkillInput.trim()) {
      const updated = {
        ...skillsData,
        softSkills: [...skillsData.softSkills, skillsData.newSoftSkillInput.trim()],
        newSoftSkillInput: ''
      };
      setSkillsData(updated);
      onUpdate(updated);
    }
  };

  const removeSoftSkill = (skillToRemove: string) => {
    const updated = {
      ...skillsData,
      softSkills: skillsData.softSkills.filter(skill => skill !== skillToRemove)
    };
    setSkillsData(updated);
    onUpdate(updated);
  };

  const updateLanguage = (index: number, field: string, value: any) => {
    const updated = {
      ...skillsData,
      languages: skillsData.languages.map((lang, i) => 
        i === index ? { ...lang, [field]: value } : lang
      )
    };
    setSkillsData(updated);
    onUpdate(updated);
  };

  const addLanguage = () => {
    const updated = {
      ...skillsData,
      languages: [
        ...skillsData.languages,
        { language: '', proficiency: 'intermediate', reading: 3, writing: 3, speaking: 3 }
      ]
    };
    setSkillsData(updated);
    onUpdate(updated);
  };

  const removeLanguage = (index: number) => {
    if (skillsData.languages.length > 1) {
      const updated = {
        ...skillsData,
        languages: skillsData.languages.filter((_, i) => i !== index)
      };
      setSkillsData(updated);
      onUpdate(updated);
    }
  };

  const predefinedSoftSkills = [
    'Communication', 'Leadership', 'Teamwork', 'Problem Solving', 'Time Management',
    'Critical Thinking', 'Adaptability', 'Creativity', 'Emotional Intelligence',
    'Conflict Resolution', 'Negotiation', 'Project Management', 'Decision Making',
    'Attention to Detail', 'Work Ethic', 'Customer Service', 'Presentation Skills'
  ];

  const commonLanguages = [
    'English', 'Bengali', 'Hindi', 'Urdu', 'Arabic', 'French', 'Spanish', 
    'German', 'Chinese', 'Japanese', 'Korean', 'Russian', 'Italian', 'Portuguese'
  ];

  const proficiencyLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'elementary', label: 'Elementary' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'upper-intermediate', label: 'Upper Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'native', label: 'Native' }
  ];

  const getProficiencyLabel = (value: number) => {
    if (value <= 1) return 'Beginner';
    if (value <= 2) return 'Elementary';
    if (value <= 3) return 'Intermediate';
    if (value <= 4) return 'Advanced';
    return 'Expert';
  };

  return (
    <div className="space-y-8">
      {/* Technical Skills */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Technical Skills</CardTitle>
          <Button onClick={addTechnicalSkill} size="sm" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Skill
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {skillsData.technicalSkills.map((skill, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Technical Skill {index + 1}</h4>
                {skillsData.technicalSkills.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeTechnicalSkill(index)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Skill Name *</Label>
                  <Input
                    value={skill.name}
                    onChange={(e) => updateTechnicalSkill(index, 'name', e.target.value)}
                    placeholder="e.g., JavaScript, Python, Adobe Photoshop"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Years of Experience</Label>
                  <Input
                    value={skill.yearsOfExperience}
                    onChange={(e) => updateTechnicalSkill(index, 'yearsOfExperience', e.target.value)}
                    placeholder="e.g., 2-3 years"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Proficiency Level</Label>
                  <Badge variant="outline">{getProficiencyLabel(skill.proficiency)}</Badge>
                </div>
                <Slider
                  value={[skill.proficiency]}
                  onValueChange={(value) => updateTechnicalSkill(index, 'proficiency', value[0])}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Beginner</span>
                  <span>Expert</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Soft Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Soft Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={skillsData.newSoftSkillInput}
              onChange={(e) => setSkillsData({ ...skillsData, newSoftSkillInput: e.target.value })}
              placeholder="Enter a soft skill"
              onKeyPress={(e) => e.key === 'Enter' && addSoftSkill()}
            />
            <Button onClick={addSoftSkill} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
          
          <div className="space-y-3">
            <Label>Suggested Skills (click to add):</Label>
            <div className="flex flex-wrap gap-2">
              {predefinedSoftSkills
                .filter(skill => !skillsData.softSkills.includes(skill))
                .map((skill) => (
                <Button
                  key={skill}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const updated = {
                      ...skillsData,
                      softSkills: [...skillsData.softSkills, skill]
                    };
                    setSkillsData(updated);
                    onUpdate(updated);
                  }}
                  className="text-xs"
                >
                  + {skill}
                </Button>
              ))}
            </div>
          </div>
          
          {skillsData.softSkills.length > 0 && (
            <div className="space-y-2">
              <Label>Selected Soft Skills:</Label>
              <div className="flex flex-wrap gap-2">
                {skillsData.softSkills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <button
                      onClick={() => removeSoftSkill(skill)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Language Proficiency */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Language Proficiency</CardTitle>
          <Button onClick={addLanguage} size="sm" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Language
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {skillsData.languages.map((language, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Language {index + 1}</h4>
                {skillsData.languages.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeLanguage(index)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Language *</Label>
                  <Select 
                    value={language.language} 
                    onValueChange={(value) => updateLanguage(index, 'language', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {commonLanguages.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Overall Proficiency</Label>
                  <Select 
                    value={language.proficiency} 
                    onValueChange={(value) => updateLanguage(index, 'proficiency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select proficiency" />
                    </SelectTrigger>
                    <SelectContent>
                      {proficiencyLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Detailed Skills */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label>Reading</Label>
                    <Badge variant="outline">{getProficiencyLabel(language.reading)}</Badge>
                  </div>
                  <Slider
                    value={[language.reading]}
                    onValueChange={(value) => updateLanguage(index, 'reading', value[0])}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label>Writing</Label>
                    <Badge variant="outline">{getProficiencyLabel(language.writing)}</Badge>
                  </div>
                  <Slider
                    value={[language.writing]}
                    onValueChange={(value) => updateLanguage(index, 'writing', value[0])}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label>Speaking</Label>
                    <Badge variant="outline">{getProficiencyLabel(language.speaking)}</Badge>
                  </div>
                  <Slider
                    value={[language.speaking]}
                    onValueChange={(value) => updateLanguage(index, 'speaking', value[0])}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
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