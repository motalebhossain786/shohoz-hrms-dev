import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, Briefcase, FileText, Cake, Award, Calendar, CheckCircle } from 'lucide-react';

const NotificationsReminders = () => {
  const notifications = [
    {
      type: 'vacancy',
      icon: Briefcase,
      title: 'Senior Software Engineer - Engineering',
      description: 'Applications deadline: Dec 25, 2024',
      urgent: true,
      color: 'text-primary'
    },
    {
      type: 'notice',
      icon: FileText,
      title: 'Year-end Performance Review Process',
      description: 'All departments must complete by Dec 31',
      urgent: false,
      color: 'text-info'
    }
  ];

  const upcomingEvents = [
    {
      type: 'birthday',
      icon: Cake,
      title: 'Sarah Wilson',
      description: 'Birthday tomorrow',
      date: 'Dec 20',
      color: 'text-success'
    },
    {
      type: 'anniversary',
      icon: Award,
      title: 'Mike Johnson',
      description: '3 years work anniversary',
      date: 'Dec 22',
      color: 'text-warning'
    }
  ];

  const confirmations = [
    {
      type: 'upcoming',
      title: 'Employee Confirmations Due',
      count: 12,
      description: 'Next 30 days',
      color: 'bg-info/10',
      textColor: 'text-info'
    },
    {
      type: 'overdue',
      title: 'Confirmations Overdue',
      count: 3,
      description: 'Immediate attention required',
      color: 'bg-destructive/10',
      textColor: 'text-destructive'
    }
  ];

  const assessments = [
    {
      type: 'upcoming',
      title: 'Performance Assessments Due',
      count: 28,
      description: 'Next 15 days',
      color: 'bg-warning/10',
      textColor: 'text-warning'
    },
    {
      type: 'overdue',
      title: 'Assessments Overdue',
      count: 7,
      description: 'Past deadline',
      color: 'bg-destructive/10',
      textColor: 'text-destructive'
    }
  ];

  return (
    <Card className="dashboard-card col-span-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Notifications & Reminders
        </CardTitle>
        <CardDescription>Important announcements and upcoming events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Announcements */}
          <div className="space-y-4">
            <h4 className="font-medium">Recent Announcements</h4>
            <div className="space-y-3">
              {notifications.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="p-3 rounded-lg bg-accent/50 border-l-4 border-l-primary">
                    <div className="flex items-start space-x-3">
                      <Icon className={`h-4 w-4 mt-1 ${item.color}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium truncate">{item.title}</p>
                          {item.urgent && <Badge variant="destructive" className="text-xs">Urgent</Badge>}
                        </div>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="space-y-4">
            <h4 className="font-medium">Upcoming Events</h4>
            <div className="space-y-3">
              {upcomingEvents.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="p-3 rounded-lg bg-accent/50">
                    <div className="flex items-center space-x-3">
                      <Icon className={`h-4 w-4 ${item.color}`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {item.date}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Employee Confirmations */}
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Employee Confirmations
            </h4>
            <div className="space-y-3">
              {confirmations.map((item, index) => (
                <div key={index} className={`p-3 rounded-lg ${item.color}`}>
                  <div className="text-center">
                    <p className={`text-2xl font-bold ${item.textColor}`}>{item.count}</p>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Assessments */}
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Performance Assessments
            </h4>
            <div className="space-y-3">
              {assessments.map((item, index) => (
                <div key={index} className={`p-3 rounded-lg ${item.color}`}>
                  <div className="text-center">
                    <p className={`text-2xl font-bold ${item.textColor}`}>{item.count}</p>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsReminders;