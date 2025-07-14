-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types for various statuses and roles
CREATE TYPE public.user_role AS ENUM ('hr_manager', 'department_head', 'employee');
CREATE TYPE public.employee_status AS ENUM ('active', 'inactive', 'terminated', 'on_leave');
CREATE TYPE public.gender AS ENUM ('male', 'female', 'other');
CREATE TYPE public.marital_status AS ENUM ('single', 'married', 'divorced', 'widowed');
CREATE TYPE public.leave_type AS ENUM ('CL', 'AL', 'ML', 'PL', 'LWP', 'emergency', 'medical');
CREATE TYPE public.leave_status AS ENUM ('pending', 'approved', 'rejected', 'cancelled');
CREATE TYPE public.attendance_type AS ENUM ('check_in', 'check_out', 'break_start', 'break_end');
CREATE TYPE public.ticket_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');
CREATE TYPE public.ticket_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE public.claim_status AS ENUM ('draft', 'submitted', 'under_review', 'approved', 'rejected', 'paid');
CREATE TYPE public.interview_status AS ENUM ('scheduled', 'completed', 'cancelled', 'no_show');
CREATE TYPE public.application_status AS ENUM ('applied', 'screening', 'interview', 'selected', 'rejected', 'hired');

-- Create profiles table for user management
CREATE TABLE public.profiles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    employee_id VARCHAR(20) UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    role user_role DEFAULT 'employee',
    department_id UUID,
    position TEXT,
    hire_date DATE,
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create departments table
CREATE TABLE public.departments (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    head_id UUID REFERENCES public.profiles(id),
    parent_department_id UUID REFERENCES public.departments(id),
    budget DECIMAL(15,2),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add foreign key for department in profiles
ALTER TABLE public.profiles ADD CONSTRAINT fk_profiles_department 
    FOREIGN KEY (department_id) REFERENCES public.departments(id);

-- Create employees table (detailed employee information)
CREATE TABLE public.employees (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    profile_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    date_of_birth DATE,
    gender gender,
    marital_status marital_status,
    nationality TEXT DEFAULT 'Bangladeshi',
    religion TEXT,
    blood_group TEXT,
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    emergency_contact_relation TEXT,
    permanent_address TEXT,
    present_address TEXT,
    nid_number TEXT UNIQUE,
    passport_number TEXT,
    driving_license TEXT,
    tin_number TEXT,
    status employee_status DEFAULT 'active',
    probation_end_date DATE,
    confirmation_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bank_details table
CREATE TABLE public.bank_details (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
    bank_name TEXT NOT NULL,
    branch_name TEXT,
    account_number TEXT NOT NULL,
    routing_number TEXT,
    account_holder_name TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create education table
CREATE TABLE public.education (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
    degree TEXT NOT NULL,
    institution TEXT NOT NULL,
    field_of_study TEXT,
    start_date DATE,
    end_date DATE,
    grade_or_score TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create experience table
CREATE TABLE public.experience (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    position TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    responsibilities TEXT,
    achievements TEXT,
    salary DECIMAL(12,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create skills table
CREATE TABLE public.skills (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL,
    proficiency_level TEXT, -- Beginner, Intermediate, Advanced, Expert
    years_of_experience INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create documents table
CREATE TABLE public.documents (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL, -- CV, NID, Passport, Certificate, etc.
    document_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_size INTEGER,
    uploaded_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create attendance_logs table
CREATE TABLE public.attendance_logs (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    employee_id UUID NOT NULL REFERENCES public.employees(id),
    date DATE NOT NULL,
    check_in_time TIMESTAMP WITH TIME ZONE,
    check_out_time TIMESTAMP WITH TIME ZONE,
    break_start_time TIMESTAMP WITH TIME ZONE,
    break_end_time TIMESTAMP WITH TIME ZONE,
    total_hours DECIMAL(4,2),
    overtime_hours DECIMAL(4,2),
    location TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leave_policies table
CREATE TABLE public.leave_policies (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    leave_type leave_type NOT NULL,
    annual_entitlement INTEGER NOT NULL,
    max_consecutive_days INTEGER,
    min_notice_days INTEGER,
    is_carry_forward BOOLEAN DEFAULT false,
    max_carry_forward_days INTEGER,
    is_encashable BOOLEAN DEFAULT false,
    department_id UUID REFERENCES public.departments(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leave_balances table
CREATE TABLE public.leave_balances (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    employee_id UUID NOT NULL REFERENCES public.employees(id),
    leave_type leave_type NOT NULL,
    year INTEGER NOT NULL,
    total_entitlement INTEGER NOT NULL,
    used_days INTEGER DEFAULT 0,
    remaining_days INTEGER NOT NULL,
    carried_forward INTEGER DEFAULT 0,
    encashed_days INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(employee_id, leave_type, year)
);

-- Create leave_requests table
CREATE TABLE public.leave_requests (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    employee_id UUID NOT NULL REFERENCES public.employees(id),
    leave_type leave_type NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_days INTEGER NOT NULL,
    reason TEXT NOT NULL,
    status leave_status DEFAULT 'pending',
    approved_by UUID REFERENCES public.profiles(id),
    approval_date TIMESTAMP WITH TIME ZONE,
    approval_comments TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create salary_structures table
CREATE TABLE public.salary_structures (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    employee_id UUID NOT NULL REFERENCES public.employees(id),
    basic_salary DECIMAL(12,2) NOT NULL,
    house_rent DECIMAL(12,2) DEFAULT 0,
    medical_allowance DECIMAL(12,2) DEFAULT 0,
    transport_allowance DECIMAL(12,2) DEFAULT 0,
    food_allowance DECIMAL(12,2) DEFAULT 0,
    mobile_allowance DECIMAL(12,2) DEFAULT 0,
    other_allowances DECIMAL(12,2) DEFAULT 0,
    provident_fund_rate DECIMAL(5,2) DEFAULT 0,
    tax_exemption DECIMAL(12,2) DEFAULT 0,
    effective_from DATE NOT NULL,
    effective_to DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payslips table
CREATE TABLE public.payslips (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    employee_id UUID NOT NULL REFERENCES public.employees(id),
    month INTEGER NOT NULL,
    year INTEGER NOT NULL,
    basic_salary DECIMAL(12,2) NOT NULL,
    total_allowances DECIMAL(12,2) DEFAULT 0,
    gross_salary DECIMAL(12,2) NOT NULL,
    provident_fund DECIMAL(12,2) DEFAULT 0,
    income_tax DECIMAL(12,2) DEFAULT 0,
    other_deductions DECIMAL(12,2) DEFAULT 0,
    total_deductions DECIMAL(12,2) DEFAULT 0,
    net_salary DECIMAL(12,2) NOT NULL,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    generated_by UUID REFERENCES public.profiles(id),
    UNIQUE(employee_id, month, year)
);

-- Create support_tickets table
CREATE TABLE public.support_tickets (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    ticket_number TEXT NOT NULL UNIQUE,
    raised_by UUID NOT NULL REFERENCES public.profiles(id),
    assigned_to UUID REFERENCES public.profiles(id),
    category TEXT NOT NULL,
    subject TEXT NOT NULL,
    description TEXT NOT NULL,
    priority ticket_priority DEFAULT 'medium',
    status ticket_status DEFAULT 'open',
    attachment_urls TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- Create ticket_responses table
CREATE TABLE public.ticket_responses (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    ticket_id UUID NOT NULL REFERENCES public.support_tickets(id) ON DELETE CASCADE,
    responder_id UUID NOT NULL REFERENCES public.profiles(id),
    message TEXT NOT NULL,
    attachment_urls TEXT[],
    is_internal BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ta_da_claims table
CREATE TABLE public.ta_da_claims (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    claim_number TEXT NOT NULL UNIQUE,
    employee_id UUID NOT NULL REFERENCES public.employees(id),
    travel_date_from DATE NOT NULL,
    travel_date_to DATE NOT NULL,
    purpose TEXT NOT NULL,
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    transportation_mode TEXT NOT NULL,
    total_distance DECIMAL(8,2),
    daily_allowance DECIMAL(10,2) DEFAULT 0,
    transport_cost DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    receipt_urls TEXT[],
    remarks TEXT,
    status claim_status DEFAULT 'draft',
    reviewed_by UUID REFERENCES public.profiles(id),
    review_comments TEXT,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create performance_reviews table
CREATE TABLE public.performance_reviews (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    employee_id UUID NOT NULL REFERENCES public.employees(id),
    review_period_start DATE NOT NULL,
    review_period_end DATE NOT NULL,
    reviewer_id UUID NOT NULL REFERENCES public.profiles(id),
    jd_achievements TEXT,
    supervisor_feedback TEXT,
    hr_feedback TEXT,
    overall_rating DECIMAL(3,2), -- 1.00 to 5.00
    goals_next_period TEXT,
    development_areas TEXT,
    status TEXT DEFAULT 'draft', -- draft, completed, approved
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create job_requisitions table
CREATE TABLE public.job_requisitions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    job_title TEXT NOT NULL,
    department_id UUID NOT NULL REFERENCES public.departments(id),
    requested_by UUID NOT NULL REFERENCES public.profiles(id),
    positions_count INTEGER NOT NULL,
    job_description TEXT NOT NULL,
    requirements TEXT NOT NULL,
    salary_range TEXT,
    employment_type TEXT DEFAULT 'full_time', -- full_time, part_time, contract
    urgency TEXT DEFAULT 'medium', -- low, medium, high
    status TEXT DEFAULT 'pending', -- pending, approved, rejected, published, closed
    approved_by UUID REFERENCES public.profiles(id),
    approval_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create job_applications table
CREATE TABLE public.job_applications (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    job_requisition_id UUID NOT NULL REFERENCES public.job_requisitions(id),
    applicant_name TEXT NOT NULL,
    applicant_email TEXT NOT NULL,
    applicant_phone TEXT,
    cv_url TEXT NOT NULL,
    cover_letter TEXT,
    status application_status DEFAULT 'applied',
    source TEXT, -- website, referral, linkedin, etc.
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create hr_letter_templates table
CREATE TABLE public.hr_letter_templates (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    template_name TEXT NOT NULL UNIQUE,
    template_type TEXT NOT NULL, -- offer, appointment, confirmation, increment, warning, etc.
    subject TEXT NOT NULL,
    content TEXT NOT NULL,
    placeholders TEXT[], -- array of placeholder names like {employee_name}, {position}
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create company_policies table
CREATE TABLE public.company_policies (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL, -- code_of_conduct, attendance, salary, benefits, etc.
    content TEXT NOT NULL,
    version TEXT DEFAULT '1.0',
    effective_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_profiles_department_id ON public.profiles(department_id);
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_employees_profile_id ON public.employees(profile_id);
CREATE INDEX idx_attendance_logs_employee_date ON public.attendance_logs(employee_id, date);
CREATE INDEX idx_leave_requests_employee_status ON public.leave_requests(employee_id, status);
CREATE INDEX idx_support_tickets_status ON public.support_tickets(status);
CREATE INDEX idx_ta_da_claims_employee_status ON public.ta_da_claims(employee_id, status);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bank_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salary_structures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payslips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ta_da_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_requisitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hr_letter_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_policies ENABLE ROW LEVEL SECURITY;

-- Create helper function to get current user's role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Create helper function to get current user's department
CREATE OR REPLACE FUNCTION public.get_current_user_department()
RETURNS UUID AS $$
  SELECT department_id FROM public.profiles WHERE user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Create helper function to check if user is department head
CREATE OR REPLACE FUNCTION public.is_department_head(dept_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.departments 
    WHERE id = dept_id AND head_id = (
      SELECT id FROM public.profiles WHERE user_id = auth.uid()
    )
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "HR managers can view all profiles" ON public.profiles
  FOR SELECT USING (public.get_current_user_role() = 'hr_manager');

CREATE POLICY "Department heads can view department profiles" ON public.profiles
  FOR SELECT USING (
    public.get_current_user_role() = 'department_head' AND 
    department_id = public.get_current_user_department()
  );

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "HR managers can update all profiles" ON public.profiles
  FOR UPDATE USING (public.get_current_user_role() = 'hr_manager');

CREATE POLICY "HR managers can insert profiles" ON public.profiles
  FOR INSERT WITH CHECK (public.get_current_user_role() = 'hr_manager');

-- Create RLS policies for employees
CREATE POLICY "Users can view their own employee data" ON public.employees
  FOR SELECT USING (
    profile_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "HR managers can view all employee data" ON public.employees
  FOR SELECT USING (public.get_current_user_role() = 'hr_manager');

CREATE POLICY "Department heads can view department employee data" ON public.employees
  FOR SELECT USING (
    public.get_current_user_role() = 'department_head' AND 
    profile_id IN (
      SELECT id FROM public.profiles 
      WHERE department_id = public.get_current_user_department()
    )
  );

-- Create RLS policies for sensitive data (salary, bank details)
CREATE POLICY "Users can view their own salary" ON public.salary_structures
  FOR SELECT USING (
    employee_id = (
      SELECT e.id FROM public.employees e 
      JOIN public.profiles p ON e.profile_id = p.id 
      WHERE p.user_id = auth.uid()
    )
  );

CREATE POLICY "HR managers can view all salaries" ON public.salary_structures
  FOR SELECT USING (public.get_current_user_role() = 'hr_manager');

CREATE POLICY "Users can view their own bank details" ON public.bank_details
  FOR SELECT USING (
    employee_id = (
      SELECT e.id FROM public.employees e 
      JOIN public.profiles p ON e.profile_id = p.id 
      WHERE p.user_id = auth.uid()
    )
  );

CREATE POLICY "HR managers can view all bank details" ON public.bank_details
  FOR SELECT USING (public.get_current_user_role() = 'hr_manager');

-- Create universal policies for HR managers
CREATE POLICY "HR managers full access to departments" ON public.departments
  FOR ALL USING (public.get_current_user_role() = 'hr_manager');

CREATE POLICY "HR managers full access to education" ON public.education
  FOR ALL USING (public.get_current_user_role() = 'hr_manager');

CREATE POLICY "HR managers full access to experience" ON public.experience
  FOR ALL USING (public.get_current_user_role() = 'hr_manager');

CREATE POLICY "HR managers full access to skills" ON public.skills
  FOR ALL USING (public.get_current_user_role() = 'hr_manager');

CREATE POLICY "HR managers full access to documents" ON public.documents
  FOR ALL USING (public.get_current_user_role() = 'hr_manager');

CREATE POLICY "HR managers full access to attendance" ON public.attendance_logs
  FOR ALL USING (public.get_current_user_role() = 'hr_manager');

CREATE POLICY "HR managers full access to leave policies" ON public.leave_policies
  FOR ALL USING (public.get_current_user_role() = 'hr_manager');

CREATE POLICY "HR managers full access to leave balances" ON public.leave_balances
  FOR ALL USING (public.get_current_user_role() = 'hr_manager');

CREATE POLICY "HR managers full access to leave requests" ON public.leave_requests
  FOR ALL USING (public.get_current_user_role() = 'hr_manager');

CREATE POLICY "HR managers full access to payslips" ON public.payslips
  FOR ALL USING (public.get_current_user_role() = 'hr_manager');

CREATE POLICY "HR managers full access to support tickets" ON public.support_tickets
  FOR ALL USING (public.get_current_user_role() = 'hr_manager');

CREATE POLICY "HR managers full access to ticket responses" ON public.ticket_responses
  FOR ALL USING (public.get_current_user_role() = 'hr_manager');

CREATE POLICY "HR managers full access to ta da claims" ON public.ta_da_claims
  FOR ALL USING (public.get_current_user_role() = 'hr_manager');

CREATE POLICY "HR managers full access to performance reviews" ON public.performance_reviews
  FOR ALL USING (public.get_current_user_role() = 'hr_manager');

CREATE POLICY "HR managers full access to job requisitions" ON public.job_requisitions
  FOR ALL USING (public.get_current_user_role() = 'hr_manager');

CREATE POLICY "HR managers full access to job applications" ON public.job_applications
  FOR ALL USING (public.get_current_user_role() = 'hr_manager');

CREATE POLICY "HR managers full access to hr letter templates" ON public.hr_letter_templates
  FOR ALL USING (public.get_current_user_role() = 'hr_manager');

CREATE POLICY "HR managers full access to company policies" ON public.company_policies
  FOR ALL USING (public.get_current_user_role() = 'hr_manager');

-- Create trigger function for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_departments_updated_at BEFORE UPDATE ON public.departments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_employees_updated_at BEFORE UPDATE ON public.employees
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_salary_structures_updated_at BEFORE UPDATE ON public.salary_structures
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_leave_requests_updated_at BEFORE UPDATE ON public.leave_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON public.support_tickets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ta_da_claims_updated_at BEFORE UPDATE ON public.ta_da_claims
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, first_name, last_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', 'Unknown'),
    COALESCE(NEW.raw_user_meta_data->>'last_name', 'User'),
    NEW.email,
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'employee')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();