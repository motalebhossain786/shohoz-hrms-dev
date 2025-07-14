export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      attendance_logs: {
        Row: {
          break_end_time: string | null
          break_start_time: string | null
          check_in_time: string | null
          check_out_time: string | null
          created_at: string | null
          date: string
          employee_id: string
          id: string
          location: string | null
          notes: string | null
          overtime_hours: number | null
          total_hours: number | null
        }
        Insert: {
          break_end_time?: string | null
          break_start_time?: string | null
          check_in_time?: string | null
          check_out_time?: string | null
          created_at?: string | null
          date: string
          employee_id: string
          id?: string
          location?: string | null
          notes?: string | null
          overtime_hours?: number | null
          total_hours?: number | null
        }
        Update: {
          break_end_time?: string | null
          break_start_time?: string | null
          check_in_time?: string | null
          check_out_time?: string | null
          created_at?: string | null
          date?: string
          employee_id?: string
          id?: string
          location?: string | null
          notes?: string | null
          overtime_hours?: number | null
          total_hours?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_logs_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      bank_details: {
        Row: {
          account_holder_name: string
          account_number: string
          bank_name: string
          branch_name: string | null
          created_at: string | null
          employee_id: string
          id: string
          is_primary: boolean | null
          routing_number: string | null
          updated_at: string | null
        }
        Insert: {
          account_holder_name: string
          account_number: string
          bank_name: string
          branch_name?: string | null
          created_at?: string | null
          employee_id: string
          id?: string
          is_primary?: boolean | null
          routing_number?: string | null
          updated_at?: string | null
        }
        Update: {
          account_holder_name?: string
          account_number?: string
          bank_name?: string
          branch_name?: string | null
          created_at?: string | null
          employee_id?: string
          id?: string
          is_primary?: boolean | null
          routing_number?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bank_details_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      company_policies: {
        Row: {
          category: string
          content: string
          created_at: string | null
          created_by: string | null
          effective_date: string
          id: string
          is_active: boolean | null
          title: string
          updated_at: string | null
          version: string | null
        }
        Insert: {
          category: string
          content: string
          created_at?: string | null
          created_by?: string | null
          effective_date: string
          id?: string
          is_active?: boolean | null
          title: string
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          category?: string
          content?: string
          created_at?: string | null
          created_by?: string | null
          effective_date?: string
          id?: string
          is_active?: boolean | null
          title?: string
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_policies_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          budget: number | null
          created_at: string | null
          description: string | null
          head_id: string | null
          id: string
          is_active: boolean | null
          name: string
          parent_department_id: string | null
          updated_at: string | null
        }
        Insert: {
          budget?: number | null
          created_at?: string | null
          description?: string | null
          head_id?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          parent_department_id?: string | null
          updated_at?: string | null
        }
        Update: {
          budget?: number | null
          created_at?: string | null
          description?: string | null
          head_id?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          parent_department_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "departments_head_id_fkey"
            columns: ["head_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "departments_parent_department_id_fkey"
            columns: ["parent_department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          created_at: string | null
          document_name: string
          document_type: string
          employee_id: string
          file_size: number | null
          file_url: string
          id: string
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string | null
          document_name: string
          document_type: string
          employee_id: string
          file_size?: number | null
          file_url: string
          id?: string
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string | null
          document_name?: string
          document_type?: string
          employee_id?: string
          file_size?: number | null
          file_url?: string
          id?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      education: {
        Row: {
          created_at: string | null
          degree: string
          employee_id: string
          end_date: string | null
          field_of_study: string | null
          grade_or_score: string | null
          id: string
          institution: string
          start_date: string | null
        }
        Insert: {
          created_at?: string | null
          degree: string
          employee_id: string
          end_date?: string | null
          field_of_study?: string | null
          grade_or_score?: string | null
          id?: string
          institution: string
          start_date?: string | null
        }
        Update: {
          created_at?: string | null
          degree?: string
          employee_id?: string
          end_date?: string | null
          field_of_study?: string | null
          grade_or_score?: string | null
          id?: string
          institution?: string
          start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "education_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          blood_group: string | null
          confirmation_date: string | null
          created_at: string | null
          date_of_birth: string | null
          driving_license: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          emergency_contact_relation: string | null
          gender: Database["public"]["Enums"]["gender"] | null
          id: string
          marital_status: Database["public"]["Enums"]["marital_status"] | null
          nationality: string | null
          nid_number: string | null
          passport_number: string | null
          permanent_address: string | null
          present_address: string | null
          probation_end_date: string | null
          profile_id: string
          religion: string | null
          status: Database["public"]["Enums"]["employee_status"] | null
          tin_number: string | null
          updated_at: string | null
        }
        Insert: {
          blood_group?: string | null
          confirmation_date?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          driving_license?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relation?: string | null
          gender?: Database["public"]["Enums"]["gender"] | null
          id?: string
          marital_status?: Database["public"]["Enums"]["marital_status"] | null
          nationality?: string | null
          nid_number?: string | null
          passport_number?: string | null
          permanent_address?: string | null
          present_address?: string | null
          probation_end_date?: string | null
          profile_id: string
          religion?: string | null
          status?: Database["public"]["Enums"]["employee_status"] | null
          tin_number?: string | null
          updated_at?: string | null
        }
        Update: {
          blood_group?: string | null
          confirmation_date?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          driving_license?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relation?: string | null
          gender?: Database["public"]["Enums"]["gender"] | null
          id?: string
          marital_status?: Database["public"]["Enums"]["marital_status"] | null
          nationality?: string | null
          nid_number?: string | null
          passport_number?: string | null
          permanent_address?: string | null
          present_address?: string | null
          probation_end_date?: string | null
          profile_id?: string
          religion?: string | null
          status?: Database["public"]["Enums"]["employee_status"] | null
          tin_number?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employees_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      experience: {
        Row: {
          achievements: string | null
          company_name: string
          created_at: string | null
          employee_id: string
          end_date: string | null
          id: string
          position: string
          responsibilities: string | null
          salary: number | null
          start_date: string
        }
        Insert: {
          achievements?: string | null
          company_name: string
          created_at?: string | null
          employee_id: string
          end_date?: string | null
          id?: string
          position: string
          responsibilities?: string | null
          salary?: number | null
          start_date: string
        }
        Update: {
          achievements?: string | null
          company_name?: string
          created_at?: string | null
          employee_id?: string
          end_date?: string | null
          id?: string
          position?: string
          responsibilities?: string | null
          salary?: number | null
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      hr_letter_templates: {
        Row: {
          content: string
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
          placeholders: string[] | null
          subject: string
          template_name: string
          template_type: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          placeholders?: string[] | null
          subject: string
          template_name: string
          template_type: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          placeholders?: string[] | null
          subject?: string
          template_name?: string
          template_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hr_letter_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          applicant_email: string
          applicant_name: string
          applicant_phone: string | null
          cover_letter: string | null
          created_at: string | null
          cv_url: string
          id: string
          job_requisition_id: string
          notes: string | null
          source: string | null
          status: Database["public"]["Enums"]["application_status"] | null
          updated_at: string | null
        }
        Insert: {
          applicant_email: string
          applicant_name: string
          applicant_phone?: string | null
          cover_letter?: string | null
          created_at?: string | null
          cv_url: string
          id?: string
          job_requisition_id: string
          notes?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
        }
        Update: {
          applicant_email?: string
          applicant_name?: string
          applicant_phone?: string | null
          cover_letter?: string | null
          created_at?: string | null
          cv_url?: string
          id?: string
          job_requisition_id?: string
          notes?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_requisition_id_fkey"
            columns: ["job_requisition_id"]
            isOneToOne: false
            referencedRelation: "job_requisitions"
            referencedColumns: ["id"]
          },
        ]
      }
      job_requisitions: {
        Row: {
          approval_date: string | null
          approved_by: string | null
          created_at: string | null
          department_id: string
          employment_type: string | null
          id: string
          job_description: string
          job_title: string
          positions_count: number
          requested_by: string
          requirements: string
          salary_range: string | null
          status: string | null
          updated_at: string | null
          urgency: string | null
        }
        Insert: {
          approval_date?: string | null
          approved_by?: string | null
          created_at?: string | null
          department_id: string
          employment_type?: string | null
          id?: string
          job_description: string
          job_title: string
          positions_count: number
          requested_by: string
          requirements: string
          salary_range?: string | null
          status?: string | null
          updated_at?: string | null
          urgency?: string | null
        }
        Update: {
          approval_date?: string | null
          approved_by?: string | null
          created_at?: string | null
          department_id?: string
          employment_type?: string | null
          id?: string
          job_description?: string
          job_title?: string
          positions_count?: number
          requested_by?: string
          requirements?: string
          salary_range?: string | null
          status?: string | null
          updated_at?: string | null
          urgency?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_requisitions_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_requisitions_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_requisitions_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      leave_balances: {
        Row: {
          carried_forward: number | null
          created_at: string | null
          employee_id: string
          encashed_days: number | null
          id: string
          leave_type: Database["public"]["Enums"]["leave_type"]
          remaining_days: number
          total_entitlement: number
          updated_at: string | null
          used_days: number | null
          year: number
        }
        Insert: {
          carried_forward?: number | null
          created_at?: string | null
          employee_id: string
          encashed_days?: number | null
          id?: string
          leave_type: Database["public"]["Enums"]["leave_type"]
          remaining_days: number
          total_entitlement: number
          updated_at?: string | null
          used_days?: number | null
          year: number
        }
        Update: {
          carried_forward?: number | null
          created_at?: string | null
          employee_id?: string
          encashed_days?: number | null
          id?: string
          leave_type?: Database["public"]["Enums"]["leave_type"]
          remaining_days?: number
          total_entitlement?: number
          updated_at?: string | null
          used_days?: number | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "leave_balances_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      leave_policies: {
        Row: {
          annual_entitlement: number
          created_at: string | null
          department_id: string | null
          id: string
          is_carry_forward: boolean | null
          is_encashable: boolean | null
          leave_type: Database["public"]["Enums"]["leave_type"]
          max_carry_forward_days: number | null
          max_consecutive_days: number | null
          min_notice_days: number | null
          updated_at: string | null
        }
        Insert: {
          annual_entitlement: number
          created_at?: string | null
          department_id?: string | null
          id?: string
          is_carry_forward?: boolean | null
          is_encashable?: boolean | null
          leave_type: Database["public"]["Enums"]["leave_type"]
          max_carry_forward_days?: number | null
          max_consecutive_days?: number | null
          min_notice_days?: number | null
          updated_at?: string | null
        }
        Update: {
          annual_entitlement?: number
          created_at?: string | null
          department_id?: string | null
          id?: string
          is_carry_forward?: boolean | null
          is_encashable?: boolean | null
          leave_type?: Database["public"]["Enums"]["leave_type"]
          max_carry_forward_days?: number | null
          max_consecutive_days?: number | null
          min_notice_days?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leave_policies_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      leave_requests: {
        Row: {
          approval_comments: string | null
          approval_date: string | null
          approved_by: string | null
          created_at: string | null
          employee_id: string
          end_date: string
          id: string
          leave_type: Database["public"]["Enums"]["leave_type"]
          reason: string
          start_date: string
          status: Database["public"]["Enums"]["leave_status"] | null
          total_days: number
          updated_at: string | null
        }
        Insert: {
          approval_comments?: string | null
          approval_date?: string | null
          approved_by?: string | null
          created_at?: string | null
          employee_id: string
          end_date: string
          id?: string
          leave_type: Database["public"]["Enums"]["leave_type"]
          reason: string
          start_date: string
          status?: Database["public"]["Enums"]["leave_status"] | null
          total_days: number
          updated_at?: string | null
        }
        Update: {
          approval_comments?: string | null
          approval_date?: string | null
          approved_by?: string | null
          created_at?: string | null
          employee_id?: string
          end_date?: string
          id?: string
          leave_type?: Database["public"]["Enums"]["leave_type"]
          reason?: string
          start_date?: string
          status?: Database["public"]["Enums"]["leave_status"] | null
          total_days?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leave_requests_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leave_requests_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      payslips: {
        Row: {
          basic_salary: number
          employee_id: string
          generated_at: string | null
          generated_by: string | null
          gross_salary: number
          id: string
          income_tax: number | null
          month: number
          net_salary: number
          other_deductions: number | null
          provident_fund: number | null
          total_allowances: number | null
          total_deductions: number | null
          year: number
        }
        Insert: {
          basic_salary: number
          employee_id: string
          generated_at?: string | null
          generated_by?: string | null
          gross_salary: number
          id?: string
          income_tax?: number | null
          month: number
          net_salary: number
          other_deductions?: number | null
          provident_fund?: number | null
          total_allowances?: number | null
          total_deductions?: number | null
          year: number
        }
        Update: {
          basic_salary?: number
          employee_id?: string
          generated_at?: string | null
          generated_by?: string | null
          gross_salary?: number
          id?: string
          income_tax?: number | null
          month?: number
          net_salary?: number
          other_deductions?: number | null
          provident_fund?: number | null
          total_allowances?: number | null
          total_deductions?: number | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "payslips_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payslips_generated_by_fkey"
            columns: ["generated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      performance_reviews: {
        Row: {
          created_at: string | null
          development_areas: string | null
          employee_id: string
          goals_next_period: string | null
          hr_feedback: string | null
          id: string
          jd_achievements: string | null
          overall_rating: number | null
          review_period_end: string
          review_period_start: string
          reviewer_id: string
          status: string | null
          supervisor_feedback: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          development_areas?: string | null
          employee_id: string
          goals_next_period?: string | null
          hr_feedback?: string | null
          id?: string
          jd_achievements?: string | null
          overall_rating?: number | null
          review_period_end: string
          review_period_start: string
          reviewer_id: string
          status?: string | null
          supervisor_feedback?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          development_areas?: string | null
          employee_id?: string
          goals_next_period?: string | null
          hr_feedback?: string | null
          id?: string
          jd_achievements?: string | null
          overall_rating?: number | null
          review_period_end?: string
          review_period_start?: string
          reviewer_id?: string
          status?: string | null
          supervisor_feedback?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "performance_reviews_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "performance_reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          department_id: string | null
          email: string
          employee_id: string | null
          first_name: string
          hire_date: string | null
          id: string
          is_active: boolean | null
          last_name: string
          phone: string | null
          position: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          department_id?: string | null
          email: string
          employee_id?: string | null
          first_name: string
          hire_date?: string | null
          id?: string
          is_active?: boolean | null
          last_name: string
          phone?: string | null
          position?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          department_id?: string | null
          email?: string
          employee_id?: string | null
          first_name?: string
          hire_date?: string | null
          id?: string
          is_active?: boolean | null
          last_name?: string
          phone?: string | null
          position?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_profiles_department"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      salary_structures: {
        Row: {
          basic_salary: number
          created_at: string | null
          effective_from: string
          effective_to: string | null
          employee_id: string
          food_allowance: number | null
          house_rent: number | null
          id: string
          is_active: boolean | null
          medical_allowance: number | null
          mobile_allowance: number | null
          other_allowances: number | null
          provident_fund_rate: number | null
          tax_exemption: number | null
          transport_allowance: number | null
          updated_at: string | null
        }
        Insert: {
          basic_salary: number
          created_at?: string | null
          effective_from: string
          effective_to?: string | null
          employee_id: string
          food_allowance?: number | null
          house_rent?: number | null
          id?: string
          is_active?: boolean | null
          medical_allowance?: number | null
          mobile_allowance?: number | null
          other_allowances?: number | null
          provident_fund_rate?: number | null
          tax_exemption?: number | null
          transport_allowance?: number | null
          updated_at?: string | null
        }
        Update: {
          basic_salary?: number
          created_at?: string | null
          effective_from?: string
          effective_to?: string | null
          employee_id?: string
          food_allowance?: number | null
          house_rent?: number | null
          id?: string
          is_active?: boolean | null
          medical_allowance?: number | null
          mobile_allowance?: number | null
          other_allowances?: number | null
          provident_fund_rate?: number | null
          tax_exemption?: number | null
          transport_allowance?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "salary_structures_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          created_at: string | null
          employee_id: string
          id: string
          proficiency_level: string | null
          skill_name: string
          years_of_experience: number | null
        }
        Insert: {
          created_at?: string | null
          employee_id: string
          id?: string
          proficiency_level?: string | null
          skill_name: string
          years_of_experience?: number | null
        }
        Update: {
          created_at?: string | null
          employee_id?: string
          id?: string
          proficiency_level?: string | null
          skill_name?: string
          years_of_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "skills_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          assigned_to: string | null
          attachment_urls: string[] | null
          category: string
          created_at: string | null
          description: string
          id: string
          priority: Database["public"]["Enums"]["ticket_priority"] | null
          raised_by: string
          resolved_at: string | null
          status: Database["public"]["Enums"]["ticket_status"] | null
          subject: string
          ticket_number: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          attachment_urls?: string[] | null
          category: string
          created_at?: string | null
          description: string
          id?: string
          priority?: Database["public"]["Enums"]["ticket_priority"] | null
          raised_by: string
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["ticket_status"] | null
          subject: string
          ticket_number: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          attachment_urls?: string[] | null
          category?: string
          created_at?: string | null
          description?: string
          id?: string
          priority?: Database["public"]["Enums"]["ticket_priority"] | null
          raised_by?: string
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["ticket_status"] | null
          subject?: string
          ticket_number?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_raised_by_fkey"
            columns: ["raised_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ta_da_claims: {
        Row: {
          claim_number: string
          created_at: string | null
          daily_allowance: number | null
          destination: string
          employee_id: string
          id: string
          origin: string
          purpose: string
          receipt_urls: string[] | null
          remarks: string | null
          review_comments: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["claim_status"] | null
          total_amount: number
          total_distance: number | null
          transport_cost: number | null
          transportation_mode: string
          travel_date_from: string
          travel_date_to: string
          updated_at: string | null
        }
        Insert: {
          claim_number: string
          created_at?: string | null
          daily_allowance?: number | null
          destination: string
          employee_id: string
          id?: string
          origin: string
          purpose: string
          receipt_urls?: string[] | null
          remarks?: string | null
          review_comments?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["claim_status"] | null
          total_amount: number
          total_distance?: number | null
          transport_cost?: number | null
          transportation_mode: string
          travel_date_from: string
          travel_date_to: string
          updated_at?: string | null
        }
        Update: {
          claim_number?: string
          created_at?: string | null
          daily_allowance?: number | null
          destination?: string
          employee_id?: string
          id?: string
          origin?: string
          purpose?: string
          receipt_urls?: string[] | null
          remarks?: string | null
          review_comments?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["claim_status"] | null
          total_amount?: number
          total_distance?: number | null
          transport_cost?: number | null
          transportation_mode?: string
          travel_date_from?: string
          travel_date_to?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ta_da_claims_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ta_da_claims_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_responses: {
        Row: {
          attachment_urls: string[] | null
          created_at: string | null
          id: string
          is_internal: boolean | null
          message: string
          responder_id: string
          ticket_id: string
        }
        Insert: {
          attachment_urls?: string[] | null
          created_at?: string | null
          id?: string
          is_internal?: boolean | null
          message: string
          responder_id: string
          ticket_id: string
        }
        Update: {
          attachment_urls?: string[] | null
          created_at?: string | null
          id?: string
          is_internal?: boolean | null
          message?: string
          responder_id?: string
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_responses_responder_id_fkey"
            columns: ["responder_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_responses_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_department: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["user_role"]
      }
      is_department_head: {
        Args: { dept_id: string }
        Returns: boolean
      }
    }
    Enums: {
      application_status:
        | "applied"
        | "screening"
        | "interview"
        | "selected"
        | "rejected"
        | "hired"
      attendance_type: "check_in" | "check_out" | "break_start" | "break_end"
      claim_status:
        | "draft"
        | "submitted"
        | "under_review"
        | "approved"
        | "rejected"
        | "paid"
      employee_status: "active" | "inactive" | "terminated" | "on_leave"
      gender: "male" | "female" | "other"
      interview_status: "scheduled" | "completed" | "cancelled" | "no_show"
      leave_status: "pending" | "approved" | "rejected" | "cancelled"
      leave_type: "CL" | "AL" | "ML" | "PL" | "LWP" | "emergency" | "medical"
      marital_status: "single" | "married" | "divorced" | "widowed"
      ticket_priority: "low" | "medium" | "high" | "urgent"
      ticket_status: "open" | "in_progress" | "resolved" | "closed"
      user_role: "hr_manager" | "department_head" | "employee"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      application_status: [
        "applied",
        "screening",
        "interview",
        "selected",
        "rejected",
        "hired",
      ],
      attendance_type: ["check_in", "check_out", "break_start", "break_end"],
      claim_status: [
        "draft",
        "submitted",
        "under_review",
        "approved",
        "rejected",
        "paid",
      ],
      employee_status: ["active", "inactive", "terminated", "on_leave"],
      gender: ["male", "female", "other"],
      interview_status: ["scheduled", "completed", "cancelled", "no_show"],
      leave_status: ["pending", "approved", "rejected", "cancelled"],
      leave_type: ["CL", "AL", "ML", "PL", "LWP", "emergency", "medical"],
      marital_status: ["single", "married", "divorced", "widowed"],
      ticket_priority: ["low", "medium", "high", "urgent"],
      ticket_status: ["open", "in_progress", "resolved", "closed"],
      user_role: ["hr_manager", "department_head", "employee"],
    },
  },
} as const
