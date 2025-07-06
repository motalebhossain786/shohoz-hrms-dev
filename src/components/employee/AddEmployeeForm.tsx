import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Check, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Import form sections
import { PersonalInfoSection } from './form-sections/PersonalInfoSection';
import { AddressSection } from './form-sections/AddressSection';
import { BankDetailsSection } from './form-sections/BankDetailsSection';
import { EducationSection } from './form-sections/EducationSection';
import { SkillsSection } from './form-sections/SkillsSection';
import { ExperienceSection } from './form-sections/ExperienceSection';
import { DocumentsSection } from './form-sections/DocumentsSection';
import { JobDetailsSection } from './form-sections/JobDetailsSection';

const formSteps = [
  { id: 1, title: 'Personal & Family Info', component: PersonalInfoSection },
  { id: 2, title: 'Address Details', component: AddressSection },
  { id: 3, title: 'Bank Details', component: BankDetailsSection },
  { id: 4, title: 'Education & Training', component: EducationSection },
  { id: 5, title: 'Skills & Languages', component: SkillsSection },
  { id: 6, title: 'Experience History', component: ExperienceSection },
  { id: 7, title: 'Documents Upload', component: DocumentsSection },
  { id: 8, title: 'Job Details & Access', component: JobDetailsSection },
];

export const AddEmployeeForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const progress = (currentStep / formSteps.length) * 100;
  const CurrentStepComponent = formSteps.find(step => step.id === currentStep)?.component;

  const handleNext = () => {
    // Mark current step as completed
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    
    // Save progress toast
    toast.success(`Step ${currentStep} completed successfully!`);
    
    if (currentStep < formSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId);
  };

  const handleSave = () => {
    // Mark current step as completed
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    toast.success('Progress saved successfully!');
  };

  const handleSubmit = () => {
    // Mark all steps as completed
    const allSteps = formSteps.map(step => step.id);
    setCompletedSteps(allSteps);
    
    toast.success('Employee profile created successfully!', {
      description: 'The new employee has been added to the system.',
    });
    
    // Navigate back to employee list after a delay
    setTimeout(() => {
      navigate('/employees');
    }, 2000);
  };

  const updateFormData = (stepData: any) => {
    setFormData({ ...formData, ...stepData });
  };

  return (
    <div className="space-y-6">
      {/* Progress Section */}
      <Card className="dashboard-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Employee Registration Progress</CardTitle>
            <Badge variant="outline" className="text-primary border-primary">
              Step {currentStep} of {formSteps.length}
            </Badge>
          </div>
          <Progress value={progress} className="w-full mt-4" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
            {formSteps.map((step) => (
              <button
                key={step.id}
                onClick={() => handleStepClick(step.id)}
                className={`
                  p-3 rounded-lg text-sm font-medium transition-colors text-center
                  ${currentStep === step.id 
                    ? 'bg-primary text-primary-foreground' 
                    : completedSteps.includes(step.id)
                    ? 'bg-success/10 text-success hover:bg-success/20'
                    : 'bg-muted text-muted-foreground hover:bg-accent'
                  }
                `}
              >
                <div className="flex items-center justify-center mb-1">
                  {completedSteps.includes(step.id) ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>
                <div className="text-xs leading-tight">{step.title}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form Section */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Step {currentStep}: {formSteps.find(step => step.id === currentStep)?.title}
            {completedSteps.includes(currentStep) && (
              <Check className="h-5 w-5 text-success" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {CurrentStepComponent && (
            <CurrentStepComponent 
              data={formData}
              onUpdate={updateFormData}
            />
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={handleSave}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save Progress
          </Button>

          {currentStep < formSteps.length ? (
            <Button
              onClick={handleNext}
              className="flex items-center gap-2"
            >
              Save & Continue
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="flex items-center gap-2 bg-success hover:bg-success/90"
            >
              Complete Registration
              <Check className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};