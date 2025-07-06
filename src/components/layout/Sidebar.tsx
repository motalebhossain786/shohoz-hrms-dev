import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, Users, GitBranch, Clock, Calendar, 
  DollarSign, TrendingUp, BookOpen, UserPlus, 
  UserMinus, FileText, HelpCircle, Receipt, ChevronLeft, ChevronRight
} from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Employee Management', path: '/employees' },
  { icon: GitBranch, label: 'Organogram', path: '/organogram' },
  { icon: Clock, label: 'Attendance Management', path: '/attendance' },
  { icon: Calendar, label: 'Leave Management', path: '/leave' },
  { icon: DollarSign, label: 'Payroll Management', path: '/payroll' },
  { icon: TrendingUp, label: 'Performance Management', path: '/performance' },
  { icon: BookOpen, label: 'Training & Development', path: '/training' },
  { icon: UserPlus, label: 'Talent Acquisition', path: '/recruitment' },
  { icon: UserMinus, label: 'Employee Exit', path: '/exit' },
  { icon: FileText, label: 'Employee Handbook', path: '/handbook' },
  { icon: FileText, label: 'HR Letters Template', path: '/templates' },
  { icon: HelpCircle, label: 'Official Tickets', path: '/tickets' },
  { icon: Receipt, label: 'TA/DA Claims', path: '/claims' }
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className={cn(
      "bg-sidebar-bg border-r border-border transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">S</span>
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Shohoz</h2>
              <p className="text-xs text-muted-foreground">HRMS</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-accent rounded-md transition-colors"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "sidebar-item",
                isActive ? "sidebar-item-active" : "sidebar-item-inactive",
                isCollapsed && "justify-center"
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon size={18} />
              {!isCollapsed && <span className="ml-3">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;