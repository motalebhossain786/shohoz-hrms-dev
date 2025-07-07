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
import PayrollManagement from "@/pages/PayrollManagement";
import PerformanceManagement from "@/pages/PerformanceManagement";
import TrainingDevelopment from "@/pages/TrainingDevelopment";
import EmployeeExitManagement from "@/pages/EmployeeExitManagement";
import { GitBranch, Calendar, DollarSign, TrendingUp, BookOpen, UserPlus, UserMinus, FileText, HelpCircle, Receipt } from "lucide-react";
import NotFound from "./pages/NotFound";
import Organogram from "./pages/Organogram";
import TalentAcquisition from "./pages/TalentAcquisition";
import EmployeeHandbook from "./pages/EmployeeHandbook";
import HRLettersTemplate from "./pages/HRLettersTemplate";
import OfficialTickets from "./pages/OfficialTickets";
import TADAClaims from "./pages/TADAClaims";

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
              
              <Route path="payroll" element={<PayrollManagement />} />
              
              <Route path="performance" element={<PerformanceManagement />} />
              
              <Route path="training" element={<TrainingDevelopment />} />
              
              <Route path="recruitment" element={<TalentAcquisition />} />
              
              <Route path="exit" element={<EmployeeExitManagement />} />
              
              <Route path="handbook" element={<EmployeeHandbook />} />
              
              <Route path="templates" element={<HRLettersTemplate />} />
              
              <Route path="tickets" element={<OfficialTickets />} />
              
              <Route path="claims" element={<TADAClaims />} />
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
