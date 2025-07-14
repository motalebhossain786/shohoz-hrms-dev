-- Create storage bucket for HR documents
INSERT INTO storage.buckets (id, name, public) VALUES ('hr-documents', 'hr-documents', false);

-- Create storage policies for hr-documents bucket
CREATE POLICY "Users can upload their own documents" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'hr-documents' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own documents" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'hr-documents' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "HR managers can view all hr documents" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'hr-documents' AND 
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() AND role = 'hr_manager'
    )
  );

CREATE POLICY "HR managers can upload any hr documents" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'hr-documents' AND 
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() AND role = 'hr_manager'
    )
  );

-- Insert some sample departments
INSERT INTO public.departments (name, description) VALUES 
  ('Human Resources', 'Manages employee relations, recruitment, and company policies'),
  ('Engineering', 'Software development and technical operations'),
  ('Marketing', 'Brand promotion, digital marketing, and customer acquisition'),
  ('Finance', 'Financial planning, accounting, and budget management'),
  ('Operations', 'Day-to-day business operations and process optimization');

-- Insert sample leave policies
INSERT INTO public.leave_policies (leave_type, annual_entitlement, max_consecutive_days, min_notice_days, is_carry_forward, max_carry_forward_days, is_encashable) VALUES
  ('CL', 12, 3, 1, true, 6, true),
  ('AL', 15, 10, 7, true, 5, false),
  ('ML', 90, 90, 30, false, 0, false),
  ('PL', 10, 5, 3, false, 0, false),
  ('LWP', 30, 15, 7, false, 0, false),
  ('emergency', 3, 1, 0, false, 0, false),
  ('medical', 21, 14, 1, false, 0, false);

-- Insert sample HR letter templates
INSERT INTO public.hr_letter_templates (template_name, template_type, subject, content, placeholders) VALUES
  ('Appointment Letter', 'appointment', 'Appointment Letter - {position}', 
   'Dear {employee_name},\n\nWe are pleased to offer you the position of {position} at our company.\n\nYour employment will commence on {start_date} with a probationary period of {probation_period} months.\n\nYour monthly salary will be BDT {salary}.\n\nBest regards,\nHR Department', 
   ARRAY['employee_name', 'position', 'start_date', 'probation_period', 'salary']),
  
  ('Confirmation Letter', 'confirmation', 'Confirmation of Employment - {employee_name}',
   'Dear {employee_name},\n\nWe are pleased to confirm your permanent employment as {position} effective from {confirmation_date}.\n\nYour performance during the probationary period has been satisfactory.\n\nCongratulations!\n\nBest regards,\nHR Department',
   ARRAY['employee_name', 'position', 'confirmation_date']),
   
  ('Experience Certificate', 'experience', 'Experience Certificate - {employee_name}',
   'To Whom It May Concern,\n\nThis is to certify that {employee_name} was employed with our organization from {start_date} to {end_date} as {position}.\n\nDuring this period, their conduct and performance were satisfactory.\n\nWe wish them success in their future endeavors.\n\nBest regards,\nHR Department',
   ARRAY['employee_name', 'start_date', 'end_date', 'position']);

-- Insert sample company policies
INSERT INTO public.company_policies (title, category, content, effective_date) VALUES
  ('Code of Conduct', 'code_of_conduct', 
   'All employees are expected to maintain the highest standards of professional conduct...',
   '2024-01-01'),
  
  ('Attendance Policy', 'attendance',
   'Regular attendance is essential for maintaining productivity and team collaboration...',
   '2024-01-01'),
   
  ('Remote Work Policy', 'remote_work',
   'Employees may work remotely with prior approval from their department head...',
   '2024-01-01'),
   
  ('Leave Policy', 'leave',
   'The company provides various types of leave to ensure work-life balance...',
   '2024-01-01');