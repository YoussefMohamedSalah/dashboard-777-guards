
import { Employee } from "./Employee";

export interface Project {
  id: string;
  name: string;
  description: string | null;
  customer_details: { id: string; name: string };
  kpi: number;
  longitude: number | null;
  latitude: number | null;
  thumbnail?: File;
  bid_value: number;
  duration: number | null;
  project_status: string;
  delivery_date: string;
  contract_date: string;
  contract_number: string | null;
  sites_count: number;
  buildings_count: number;
  floors_count: number;
  total_budget: number;
  po_budget: number;
  po_expenses: number;
  pc_budget: number;
  pc_expenses: number;
  staff_budget: number;
  staff_expenses: number;
  subcontractor_budget: number;
  subcontractor_expenses: number;
  comments: { id: number; userId: string; userName: string; comment: string; createdAt: string }[];
  comments_count: number | null;
  members_count: number | null;
  manager: { id: string; name: string };
  assistants?: Employee[];
  members: any[];
  managers: Employee[];
  users: Employee[];
  tasks?: any[];
  progress?: { date: string; percentage: number }[];
  total_progress_percentage: number;

  kpi_records: ProjectKpi[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectKpi {
  id: string;
  date: string;
  total_kpi: number;
  project: Project;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectAttachment {
  id?: number;
  files: File[];
  project?: number;
  task?: number;
}
