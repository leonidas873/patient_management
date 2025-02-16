/* eslint-disable no-unused-vars */
export interface ResponseError {
  message: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  role: Role;
  clinic?: string;
}

export interface Disease {
  id: number;
  name: string;
  description: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
  role: Role;
}

export interface Symptom {
  name: string;
  noteDate: string;
  severity: number;
}

export interface Condition {
  disease: string;
  symptoms: Symptom[];
}

export interface FinancialRecord {
  service: string;
  amount: number;
  date: string;
}

export interface PersonalInfo {
  name: string;
  surname: string;
  birthDate: string;
  country: string;
  gender: 'Male' | 'Female';
  phone: string;
  addedDate: string;
  personalId: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface Patient {
  id: number;
  personalInfo: PersonalInfo;
  condition: Condition;
  financialRecords: FinancialRecord[];
}

export interface PatientsResponse {
  total: number;
  page: number;
  limit: number;
  data: Patient[];
}

export interface UsersResponse {
  users: User[];
}

export interface PatientsData {
  patients: Patient[];
}

export enum Role {
  Admin = 'admin',
  Doctor = 'doctor',
  Nurse = 'nurse'
}
