import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addPatient,
  deletePatientApi,
  fetchPatients,
  getDiseases,
  getPatientById,
  loginUser,
  updatePatient
} from './api';
import {
  Disease,
  LoginCredentials,
  LoginResponse,
  Patient,
  PatientsResponse,
  PersonalInfo
} from '../types/apiTypes';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useAuthStore } from '../store/authStore';
import { PatientFormValues } from '../components/patientForm/PatientForm';
import Cookies from 'js-cookie';

const PATIENTS = 'PATIENTS';
const patient = 'PATIENT';
export function useDeletePatient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deletePatientApi(id),
    async onSuccess() {
      queryClient.invalidateQueries({ queryKey: [PATIENTS] });
    },
    async onError(error: Error) {
      console.log(error);
    }
  });
}

export type PatientFilter = Partial<
  Pick<PersonalInfo, 'name' | 'surname' | 'personalId' | 'status'>
> & {
  dateFrom?: string;
  dateTo?: string;
  page?: string;
};

export const usePatientsQuery = (filters: PatientFilter) => {
  return useQuery<PatientsResponse, Error>({
    queryKey: [PATIENTS, filters],
    queryFn: ({ queryKey }) =>
      fetchPatients({ queryKey: queryKey as [string, PatientFilter] })
  });
};

export const useGetPatient = (id: number) => {
  return useQuery<Patient, Error>({
    queryKey: [patient, id],
    queryFn: () => getPatientById(id),
    enabled: Boolean(id)
  });
};

export const useAddPatient = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<Patient, Error, PatientFormValues>({
    mutationFn: addPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PATIENTS] });
      navigate('/');
    }
  });
};

export const useUpdatePatient = (id: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<Patient, Error, PatientFormValues>({
    mutationFn: (data: PatientFormValues) => updatePatient(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [patient, id] });
      queryClient.invalidateQueries({ queryKey: [PATIENTS] });
      navigate('/');
    }
  });
};

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      navigate('/');
      const { token, ...updatedData } = data;
      setUser(updatedData);
      Cookies.set('token', data.token);
    },
    onError: (error) => {
      message.error(error.message || 'Login failed. Please try again.');
    }
  });
};

export const useGetDiseases = () => {
  return useQuery<{ total: number; data: Disease[] }, Error>({
    queryKey: ['diseases'],
    queryFn: getDiseases
  });
};
