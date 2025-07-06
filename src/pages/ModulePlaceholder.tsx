import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface ModulePlaceholderProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  comingSoon?: boolean;
}

const ModulePlaceholder: React.FC<ModulePlaceholderProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  features,
  comingSoon = false 
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Icon className="h-8 w-8 text-primary" />
            {title}
            {comingSoon && <Badge variant="outline" className="ml-3">Coming Soon</Badge>}
          </h1>
          <p className="text-muted-foreground mt-2">{description}</p>
        </div>
        <Button className="hrms-button-primary" disabled={comingSoon}>
          Get Started
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Module Overview */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Module Overview</CardTitle>
            <CardDescription>Key features and capabilities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-accent/50">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-20 flex flex-col" disabled={comingSoon}>
                <Icon className="h-6 w-6 mb-2" />
                <span className="text-sm">Create New</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col" disabled={comingSoon}>
                <Icon className="h-6 w-6 mb-2" />
                <span className="text-sm">View All</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col" disabled={comingSoon}>
                <Icon className="h-6 w-6 mb-2" />
                <span className="text-sm">Reports</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col" disabled={comingSoon}>
                <Icon className="h-6 w-6 mb-2" />
                <span className="text-sm">Settings</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Message */}
      <Card className="dashboard-card">
        <CardContent className="p-6">
          <div className="text-center">
            <Icon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">
              {comingSoon ? 'Coming Soon' : 'Ready to Get Started'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {comingSoon 
                ? 'This module is currently under development and will be available soon.'
                : 'This module is ready for configuration and use. Contact your administrator to get started.'
              }
            </p>
            {!comingSoon && (
              <Button className="hrms-button-primary">
                Configure Module
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModulePlaceholder;