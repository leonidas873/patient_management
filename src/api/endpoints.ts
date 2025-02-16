export const ENDPOINTS = {
  LOGIN: `/login`,
  GET_ALL_PATIENTS: `/patients`,
  ADD_PATIENT: `/patients-add`,
  EDIT_PATIENT: (id: number) => `/patients-update/${id}`,
  DELETE_PATIENT: (id: number) => `/patients-delete/${id}`,
  GET_PATIENT_BY_ID: (id: number) => `/patients/${id}`,
  DISEASES: '/diseases'
};

export default ENDPOINTS;
