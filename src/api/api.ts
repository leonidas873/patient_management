import { PatientFormValues } from '../components/patientForm/PatientForm';
import {
  Disease,
  LoginCredentials,
  LoginResponse,
  Patient,
  PatientsResponse
} from '../types/apiTypes';
import ENDPOINTS from './endpoints';
import httpClient from './httpClient';
import { PatientFilter } from './queries';

export const deletePatientApi = async (id: number): Promise<void> => {
  await httpClient.delete(ENDPOINTS.DELETE_PATIENT(id));
};

export const fetchPatients = async ({
  queryKey
}: {
  queryKey: [string, PatientFilter];
}): Promise<PatientsResponse> => {
  const [, filters] = queryKey;
  const { data } = await httpClient.get<PatientsResponse>(
    `${ENDPOINTS.GET_ALL_PATIENTS}`
  , {
    params:filters
  });
  return data;
};

export const getPatientById = async (id: number): Promise<Patient> => {
  const response = await httpClient.get(ENDPOINTS.GET_PATIENT_BY_ID(id));
  return response.data;
};

export const addPatient = async (
  patientData: PatientFormValues
): Promise<Patient> => {
  const response = await httpClient.post(ENDPOINTS.ADD_PATIENT, patientData);
  return response.data;
};

export const updatePatient = async (
  id: number,
  patientData: PatientFormValues
): Promise<Patient> => {
  const response = await httpClient.put(
    ENDPOINTS.EDIT_PATIENT(id),
    patientData
  );
  return response.data;
};

export const loginUser = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await httpClient.post(ENDPOINTS.LOGIN, credentials);
  return response.data;
};

export const getDiseases = async (): Promise<{
  total: number;
  data: Disease[];
}> => {
  const response = await httpClient.get(ENDPOINTS.DISEASES);
  return response.data;
};
