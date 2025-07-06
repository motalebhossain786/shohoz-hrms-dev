import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import AuthGuard from "@/components/auth/AuthGuard";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import MainLayout from "@/components/layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import EmployeeManagement from "@/pages/EmployeeManagement";
import AddEmployee from "@/pages/AddEmployee";
import EmployeeProfile from "@/pages/EmployeeProfile";
import EditEmployee from "@/pages/EditEmployee";
import AttendanceManagement from "@/pages/AttendanceManagement";
import ModulePlaceholder from "@/pages/ModulePlaceholder";
import LeaveManagement from "@/pages/LeaveManagement";
import { GitBranch, Calendar, DollarSign, TrendingUp, BookOpen, UserPlus, UserMinus, FileText, HelpCircle, Receipt } from "lucide-react";
import NotFound from "./pages/NotFound";
import Organogram from "./pages/Organogram";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route element={
              <AuthGuard>
                <MainLayout />
              </AuthGuard>
            }>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="employees" element={<EmployeeManagement />} />
              <Route path="employees/add" element={<AddEmployee />} />
              <Route path="employees/:id" element={<EmployeeProfile />} />
              <Route path="employees/:id/edit" element={<EditEmployee />} />
              <Route path="attendance" element={<AttendanceManagement />} />
              
              {/* Module Placeholders */}
              <Route path="organogram" element={<Organogram />} />
              
              <Route path="leave" element={<LeaveManagement />} />
              
              <Route path="payroll" element={
                <ModulePlaceholder 
                  title="Payroll Management" 
                  description="Comprehensive payroll processing and management"
                  icon={DollarSign}
                  features={[
                    "Salary calculation and processing",
                    "Tax and deduction management",
                    "Payslip generation and distribution",
                    "Payroll reports and analytics",
                    "Integration with accounting systems"
                  ]}
                />
              } />
              
              <Route path="performance" element={
                <ModulePlaceholder 
                  title="Performance Management" 
                  description="Employee performance tracking and evaluation"
                  icon={TrendingUp}
                  features={[
                    "Performance review cycles",
                    "Goal setting and tracking",
                    "360-degree feedback",
                    "Performance analytics and reporting",
                    "Development planning"
                  ]}
                />
              } />
              
              <Route path="training" element={
                <ModulePlaceholder 
                  title="Training & Development" 
                  description="Employee learning and development programs"
                  icon={BookOpen}
                  features={[
                    "Training program management",
                    "Course catalog and enrollment",
                    "Learning progress tracking",
                    "Certification management",
                    "Training effectiveness analytics"
                  ]}
                />
              } />
              
              <Route path="recruitment" element={
                <ModulePlaceholder 
                  title="Talent Acquisition" 
                  description="Recruitment and onboarding processes"
                  icon={UserPlus}
                  features={[
                    "Job posting and application management",
                    "Candidate screening and evaluation",
                    "Interview scheduling and feedback",
                    "Onboarding workflow automation",
                    "Recruitment analytics and reporting"
                  ]}
                />
              } />
              
              <Route path="exit" element={
                <ModulePlaceholder 
                  title="Employee Exit Management" 
                  description="Manage employee offboarding and exit processes"
                  icon={UserMinus}
                  features={[
                    "Exit interview scheduling",
                    "Asset return tracking",
                    "Final settlement calculations",
                    "Knowledge transfer documentation",
                    "Exit analytics and insights"
                  ]}
                />
              } />
              
              <Route path="handbook" element={
                <ModulePlaceholder 
                  title="Employee Handbook" 
                  description="Centralized knowledge base and policies"
                  icon={FileText}
                  features={[
                    "Policy and procedure documentation",
                    "Employee guidelines and FAQs",
                    "Searchable knowledge base",
                    "Version control and updates",
                    "Acknowledgment tracking"
                  ]}
                />
              } />
              
              <Route path="templates" element={
                <ModulePlaceholder 
                  title="HR Letters Template" 
                  description="Standardized HR document templates"
                  icon={FileText}
                  features={[
                    "Letter template library",
                    "Automated document generation",
                    "Digital signature integration",
                    "Template customization",
                    "Document version control"
                  ]}
                />
              } />
              
              <Route path="tickets" element={
                <ModulePlaceholder 
                  title="Official Tickets" 
                  description="Employee request and support ticket system"
                  icon={HelpCircle}
                  features={[
                    "Ticket creation and tracking",
                    "Priority and category management",
                    "Assignment and escalation rules",
                    "Communication and updates",
                    "Resolution analytics"
                  ]}
                />
              } />
              
              <Route path="claims" element={
                <ModulePlaceholder 
                  title="TA/DA Claims" 
                  description="Travel and daily allowance claim management"
                  icon={Receipt}
                  features={[
                    "Expense claim submission",
                    "Receipt upload and verification",
                    "Approval workflow automation",
                    "Reimbursement processing",
                    "Expense analytics and reporting"
                  ]}
                />
              } />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
